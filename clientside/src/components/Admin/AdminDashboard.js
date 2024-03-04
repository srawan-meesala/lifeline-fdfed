import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";
import { BiRupee } from "react-icons/bi";

import { BiLogOut } from "react-icons/bi";
import { useLocation, useParams } from 'react-router-dom';
import Hospitals from './Hospitals'
import Dashboard from "./Dashboard";
import HospApprovals from "./HospApprovals";
import Doctors from "./Doctors";
import Patients from "./Patients";
import Donors from "./Donors";
import Transactions from "../Transactions";
import Pharmacy from "../Pharmacy";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const username = Cookies.get('username');
  const location = useLocation()
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate()
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAdminDetails/${username}`);
        if (response.status === 200) {
          setUserDetails(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [username])

  const [patients, setPatients] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAllPatients`);
        if (response.status === 200) {
          setPatients(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const [registeredHosps,setRegisteredHosps] = useState([])

  const fetchRegisteredHosps = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/registeredHosps`);
      setRegisteredHosps(response.data);
    } catch (error) {
      console.error('Error fetching registered hospitals:', error);
    }
  };

  useEffect(() => {
    fetchRegisteredHosps();
  }, []);

  const handleApproveHosp = async (mailID) => {
    try {
      await axios.put(`http://localhost:8000/approveHosp/${mailID}`);
      alert('Approval Successful.');
      fetchRegisteredHosps();
    } catch (error) {
      console.error('Error approving hospital:', error);
    }
  };

  const handleDeclineHosp = async (mailID) => {
    try {
      await axios.put(`http://localhost:8000/declineHosp/${mailID}`);
      fetchRegisteredHosps();
    } catch (error) {
      console.error('Error declining hospital:', error);
    }
  };

  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAllHospitals`);
        if (response.status === 200) {
          setHospitals(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAllDoctors`);
        if (response.status === 200) {
          setDoctors(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const [donors, setDonors] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAllDonors`);
        if (response.status === 200) {
          setDonors(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAllAppointments`);
        if (response.status === 200) {
          console.log(response);
          setAppointments(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const [bloodDonors, setBloodDonors] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/getAllBloodDonors');
        if (response.status === 200) {
          setBloodDonors(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/blogAPI`);
        if (response.status === 200) {
          setBlogs(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const componentMap = {
    dashboard: <Dashboard
      hospitals={hospitals}
      doctors={doctors}
      patients={patients}
      donors={donors}
      appointments={appointments}
      bloodDonors={bloodDonors}
      blogs={blogs}
    />,
    ApproveHosp:<HospApprovals registeredHosps={registeredHosps} appHosp={handleApproveHosp} decHosp={handleDeclineHosp}/>,
    Hospitals: <Hospitals hospitals={hospitals} />,
    Doctors: <Doctors doctors={doctors} />,
    Patients: <Patients patients={patients} />,
    Pharmacy: <Pharmacy />,
    Donors: <Donors donors={donors} />,
    Transactions: <Transactions />
  }

  const handleLogout = () => {
    Cookies.remove("username")
    Cookies.remove("loggedIn")
    Cookies.remove("type")
    navigate('/')
  }

  return (
    <div className='Admin-whole'>

      <div className='Admin-left'>
        <div className='DoctorProfile-logo'>
          <div>Lifeline<span className='DoctorProfile-logo-dot'>.</span></div>
        </div>
        <div className='DoctorProfile-functions'>
          <div className='DoctorProfile-fuctions-int-div'>
            <div className='Admin-func-parts' onClick={() => toggleComponent('dashboard')}>
              <div className='Admin-icon'><AiFillDashboard /></div>
              <div className='DoctorProfile-func'>Dashboard</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('ApproveHosp')}>
              <div className='Admin-icon'><AiFillDashboard /></div>
              <div className='DoctorProfile-func'>Approvals</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Hospitals')} >
              <div className='Admin-icon'><FaHospital /></div>
              <div className='DoctorProfile-func'>Hospitals</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Doctors')}>
              <div className='Admin-icon'><FaUserDoctor /></div>
              <div className='DoctorProfile-func'>Doctors</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Patients')}>
              <div className='Admin-icon'><FaUserGroup /></div>
              <div className='DoctorProfile-func'>Patients</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Donors')}>
              <div className='Admin-icon'><FaHandHoldingWater /></div>
              <div className='DoctorProfile-func'>Donors</div>
            </div>
          </div>
        </div>
        <div className='DoctorProfile-logout' onClick={handleLogout}>
          <div className='DoctorProfile-logout-part'>
            <div className='DoctorProfile-logout-icon'><BiLogOut /></div>
            <div className='DoctorProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>

      <div className='DoctorProfile-right'>

        {componentMap[activeComponent]}
      </div>

    </div>
  );
};

export default AdminDashboard