import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillStickiesFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { FaHospital } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import HospitalDashboard from "../components/HospitalProfile/HospitalDashboard";
import HospitalSettings from "../components/HospitalProfile/HospitalSettings";
import HospitalApproveDoc from "../components/HospitalProfile/HospitalApproveDocs";
import HospitalAppointments from "../components/HospitalProfile/HospitalAppointments";
import HospitalProfileShow from "../components/HospitalProfile/HospitalProfileShow";
import HospitalDoctors from "../components/HospitalProfile/HospitalDoctors";
import Cookies from 'js-cookie';

function HospitalProfile() {
  const [choose, setChoose] = useState(1)
  const username = Cookies.get('username');
  const [hospID,setHospID] = useState('')
  const [userDetails, setUserDetails] = useState({})
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [registeredDoctors,setRegisteredDoctors] = useState([])
  const navigate = useNavigate()

  const DashboardOpener = () => setChoose(1)
  const AppointmentsOpener = () => setChoose(2)
  const DocApprovalOpener = () => setChoose(3)
  const DoctorsOpener = () => setChoose(4)
  const ProfileOpener = () => setChoose(5)
  const SettingsOpener = () => setChoose(6)

useEffect(()=>{
  if(username){
    setHospID(username);
    fetchRegisteredDoctors(username);
  }
},[])
  

  const handleLogout = () => {
    Cookies.remove('username')
    Cookies.remove('loggedIn')
    Cookies.remove('type')
    navigate('/')
  }

const fetchRegisteredDoctors = async (hospID) => {
    try {
        const response = await axios.get(`http://localhost:8000/registeredDoctors/${hospID}`);
        setRegisteredDoctors(response.data);
    } catch (error) {
        console.error('Error fetching registered doctors:', error);
    }
};

const handleApproveDoctor = async (mailID) => {
    try {
        await axios.put(`http://localhost:8000/approveDoctor/${mailID}`, { approvalStatus: 'approved' });
        fetchRegisteredDoctors(hospID);
    } catch (error) {
        console.error('Error approving doctor:', error);
    }
};

const handleDeclineDoctor = async (mailID) => {
    try {
        await axios.put(`http://localhost:8000/approveDoctor/${mailID}`, { approvalStatus: 'declined' });
        fetchRegisteredDoctors(hospID);
    } catch (error) {
        console.error('Error declining doctor:', error);
    }
};

  useEffect(() => {
    async function fetchData() {
      try {
        if (username) {
          const [
            userDetailsResponse,
            appointmentsResponse,
            doctorsResponse
          ] = await Promise.all([
            axios.get(`http://localhost:8000/getHospDetails/${username}`),
            axios.get(`http://localhost:8000/AppointmentsAPI2/${username}`),
            axios.get(`http://localhost:8000/DoctorsAPI2/${username}`)
          ]);

          if (userDetailsResponse.status === 200) {
            setUserDetails(userDetailsResponse.data);
          }

          if (appointmentsResponse.status === 200) {
            setAppointments(Array.isArray(appointmentsResponse.data) ? appointmentsResponse.data : []);
          }

          if (doctorsResponse.status === 200) {
            setDoctors(Array.isArray(doctorsResponse.data) ? doctorsResponse.data : []);
          }
        }
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    }
    fetchData();
  }, [username]);

  return (
    <div className='HospitalProfile-whole'>
      <div className='HospitalProfile-left'>
        <div className='HospitalProfile-logo'>
          <div>Lifeline<span className='HospitalProfile-logo-dot'>.</span><span className='HospitalProfile-logo-dahboard'>Dashboard</span></div>
        </div>
        <div className='HospitalProfile-functions'>
          <div className='HospitalProfile-fuctions-int-div'>
            <div className='HospitalProfile-func-parts' onClick={DashboardOpener}>
              <div className='HospitalProfile-icon'><AiFillDashboard /></div>
              <div className='HospitalProfile-func'>Dashboard</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={AppointmentsOpener}>
              <div className='HospitalProfile-icon'><BsFillStickiesFill /></div>
              <div className='HospitalProfile-func'>Appointments</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={DocApprovalOpener}>
              <div className='HospitalProfile-icon'><BsFillStickiesFill /></div>
              <div className='HospitalProfile-func'>Approvals</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={DoctorsOpener}>
              <div className='HospitalProfile-icon'><FaUserDoctor /></div>
              <div className='HospitalProfile-func'>Doctors</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={ProfileOpener}>
              <div className='HospitalProfile-icon'><FaHospital /></div>
              <div className='HospitalProfile-func'>Profile</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={SettingsOpener}>
              <div className='HospitalProfile-icon'><IoSettingsSharp /></div>
              <div className='HospitalProfile-func'>Settings</div>
            </div>
          </div>
        </div>
        <div className='HospitalProfile-logout'>
          <div className='HospitalProfile-logout-part' onClick={handleLogout}>
            <div className='HospitalProfile-logout-icon'><BiLogOut /></div>
            <div className='HospitalProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>
      {choose === 1 && (
        <HospitalDashboard userDetails={userDetails} appointments={appointments} doctors={doctors} />
      )}
      {choose === 2 && (
        <HospitalAppointments userDetails={userDetails} appointments={appointments} />
      )}
      {choose === 3 && (
        <HospitalApproveDoc hospName={userDetails.hospName} registeredDoctors={registeredDoctors} appDoc={handleApproveDoctor} decDoc={handleDeclineDoctor}/>
      )}
      {choose === 4 && (
        <HospitalDoctors userDetails={userDetails} doctors={doctors} />
      )}
      {choose === 5 && (
        <HospitalProfileShow userDetails={userDetails} />
      )}
      {choose === 6 && (
        <HospitalSettings userDetails={userDetails} />
      )}
    </div>
  )
}

export default HospitalProfile