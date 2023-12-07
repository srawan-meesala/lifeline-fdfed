import React, { useEffect,useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillStickiesFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import DoctorAppointments from "../components/DoctorProfile/DoctorAppointments";
import DoctorDashboard from "../components/DoctorProfile/DoctorDashboard";
import DoctorSettings from "../components/DoctorProfile/DoctorSettings";
import DoctorProfileShow from "../components/DoctorProfile/DoctorProfileShow";


function DoctorProfile() {
  const {username} = useParams()
  const [choose, setChoose] = useState(1)
  const [userDetails,setUserDetails]=useState({})

  const DashboardOpener = () => setChoose(1)
  const AppointmentsOpener = () => setChoose(2)
  const ProfileOpener = () => setChoose(3)
  const SettingsOpener = () => setChoose(4)

  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get(`http://localhost:8000/getDocDetails/${username}`);
        if(response.status === 200){
          setUserDetails(response.data)
        }
        else{
          console.error('Failed to fetch user details')
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[username])

  return (
    <div className='DoctorProfile-whole'>
      <div className='DoctorProfile-left'>
        <div className='DoctorProfile-logo'>
          <div>Lifeline<span className='DoctorProfile-logo-dot'>.</span><span className='DoctorProfile-logo-dahboard'>Dashboard</span></div>
        </div>
        <div className='DoctorProfile-functions'>
          <div className='DoctorProfile-fuctions-int-div'>
            <div className='DoctorProfile-func-parts' onClick={DashboardOpener}>
              <div className='DoctorProfile-icon'><AiFillDashboard/></div>
              <div className='DoctorProfile-func'>Dashboard</div>
            </div>
            <div className='DoctorProfile-func-parts' onClick={AppointmentsOpener}>
              <div className='DoctorProfile-icon'><BsFillStickiesFill/></div>
              <div className='DoctorProfile-func'>Appointments</div>
            </div>
            <div className='DoctorProfile-func-parts' onClick={ProfileOpener}>
              <div className='DoctorProfile-icon'><FaUserDoctor/></div>
              <div className='DoctorProfile-func'>Profile</div>
            </div>
            <div className='DoctorProfile-func-parts' onClick={SettingsOpener}>
              <div className='DoctorProfile-icon'><IoSettingsSharp/></div>
              <div className='DoctorProfile-func'>Settings</div>
            </div>
            </div>
        </div>
        <div className='DoctorProfile-logout'>
          <div className='DoctorProfile-logout-part'>
            <div className='DoctorProfile-logout-icon'><BiLogOut/></div>
            <div className='DoctorProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>
      {choose===1 && (
        <DoctorDashboard userDetails={userDetails} />
      )}
      {choose===2 && (
        <DoctorAppointments userDetails={userDetails} />
      )}
      {choose===3 && (
        <DoctorProfileShow userDetails={userDetails} />
      )}
      {choose===4 && (
        <DoctorSettings userDetails={userDetails} />
      )}
    </div>
  )
}

export default DoctorProfile