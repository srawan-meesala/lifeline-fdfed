import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaHandHoldingWater } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { BiRupee } from "react-icons/bi";

import { BiLogOut } from "react-icons/bi";
import { useLocation, useParams } from 'react-router-dom';
import Hospitals from './Admin/Hospitals'
import Dashboard from "./Dashboard";
import Doctors from "./Admin/Doctors";
import Patients from "./Admin/Patients";
import Donors from "./Donors";
import Transactions from "./Transactions";
import Settings from "./Settings";
import Pharmacy from "./Pharmacy";
import Logout from "./Logout";


function AdminDashboard() {
  const { username } = useParams()
  const location = useLocation()
  //   const [currentView, setCurrentView] = useState('dashboard');
  const [userDetails, setUserDetails] = useState({});

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

  const componentMap = {
    dashboard: <Dashboard />,
    Hospitals: <Hospitals />,
    Doctors: <Doctors />,
    Patients: <Patients patients={patients}/>,
    Pharmacy: < Pharmacy />,
    Donors: <Donors />,
    Transactions: <Transactions />,
    Settings: <Settings />,
    Logout: < Logout />
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
            <div className='Admin-func-parts' onClick={() => toggleComponent('Pharmacy')}>
              <div className='Admin-icon'><MdLocalPharmacy /></div>
              <div className='DoctorProfile-func'>Pharmacy</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Donors')}>
              <div className='Admin-icon'><FaHandHoldingWater /></div>
              <div className='DoctorProfile-func'>Donors</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Transactions')}>
              <div className='Admin-icon'><BiRupee /></div>
              <div className='DoctorProfile-func'>Transactions</div>
            </div>
            <div className='Admin-func-parts' onClick={() => toggleComponent('Settings')}>
              <div className='Admin-icon'><IoSettingsSharp /></div>
              <div className='DoctorProfile-func'>Settings</div>
            </div>
          </div>
        </div>
        <div className='DoctorProfile-logout' onClick={() => toggleComponent('Logout')}>
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