import React, { useEffect,useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillStickiesFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { FaHospital } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import HospitalDashboard from "../components/HospitalProfile/HospitalDashboard";
import HospitalSettings from "../components/HospitalProfile/HospitalSettings";
import HospitalAppointments from "../components/HospitalProfile/HospitalAppointments";
import HospitalProfileShow from "../components/HospitalProfile/HospitalProfileShow";
import HospitalDoctors from "../components/HospitalProfile/HospitalDoctors";

function HospitalProfile() {
  const [choose, setChoose] = useState(1)
  const {username} = useParams()
  const [userDetails,setUserDetails]=useState({})

  const DashboardOpener = () => setChoose(1)
  const AppointmentsOpener = () => setChoose(2)
  const DoctorsOpener = () => setChoose(3)
  const ProfileOpener = () => setChoose(4)
  const SettingsOpener = () => setChoose(5)

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/AppointmentsAPI2/${userDetails.hospID}`);
        setAppointments(Array.isArray(response.data) ? response.data : []);
        console.log(appointments);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchAppointments();
  }, [userDetails.hospID]);

  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get(`http://localhost:8000/getHospDetails/${username}`);
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
    <div className='HospitalProfile-whole'>
      <div className='HospitalProfile-left'>
        <div className='HospitalProfile-logo'>
          <div>Lifeline<span className='HospitalProfile-logo-dot'>.</span><span className='HospitalProfile-logo-dahboard'>Dashboard</span></div>
        </div>
        <div className='HospitalProfile-functions'>
          <div className='HospitalProfile-fuctions-int-div'>
            <div className='HospitalProfile-func-parts' onClick={DashboardOpener}>
              <div className='HospitalProfile-icon'><AiFillDashboard/></div>
              <div className='HospitalProfile-func'>Dashboard</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={AppointmentsOpener}>
              <div className='HospitalProfile-icon'><BsFillStickiesFill/></div>
              <div className='HospitalProfile-func'>Appointments</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={DoctorsOpener}>
              <div className='HospitalProfile-icon'><FaUserDoctor/></div>
              <div className='HospitalProfile-func'>Doctors</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={ProfileOpener}>
              <div className='HospitalProfile-icon'><FaHospital/></div>
              <div className='HospitalProfile-func'>Profile</div>
            </div>
            <div className='HospitalProfile-func-parts' onClick={SettingsOpener}>
              <div className='HospitalProfile-icon'><IoSettingsSharp/></div>
              <div className='HospitalProfile-func'>Settings</div>
            </div>
          </div>
        </div>
        <div className='HospitalProfile-logout'>
          <div className='HospitalProfile-logout-part'>
            <div className='HospitalProfile-logout-icon'><BiLogOut/></div>
            <div className='HospitalProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>
      {choose===1 && (
        <HospitalDashboard userDetails={userDetails} />
      )}
      {choose===2 && (
        <HospitalAppointments userDetails={userDetails} />
      )}
      {choose===3 && (
        <HospitalDoctors userDetails={userDetails} />
      )}
      {choose===4 && (
        <HospitalProfileShow userDetails={userDetails} />
      )}
      {choose===5 && (
        <HospitalSettings userDetails={userDetails} />
      )}
    </div>
  )
}

export default HospitalProfile