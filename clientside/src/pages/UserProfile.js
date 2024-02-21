import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { BsFillStickiesFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import UserDashboard from "../components/UserProfile/UserDashboard";
import UserAppointments from "../components/UserProfile/UserAppointments";
import UserProfileShow from "../components/UserProfile/UserProfileShow";
import UserSettings from "../components/UserProfile/UserSettings";
import Cookies from 'js-cookie';

function UserProfile() {
  const [choose, setChoose] = useState(1)
  const { username } = Cookies.get('username');
  const [userDetails, setUserDetails] = useState({})
  const [appointments, setAppointments] = useState([])
  const [totalExpenditure, setTotalExpenditure] = useState(0)
  const navigate = useNavigate();

  const DashboardOpener = () => setChoose(1)
  const AppointmentsOpener = () => setChoose(2)
  const ProfileOpener = () => setChoose(3)
  const SettingsOpener = () => setChoose(4)

  const handleLogout = () => {
    Cookies.remove('username')
    Cookies.remove('type')
    Cookies.remove('loggedIn')
    navigate('/');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const username = Cookies.get('username');

        const responseUser = await axios.get(`http://localhost:8000/getUserDetails/${username}`);
        setUserDetails(responseUser.data);

        const responseAppointments = await axios.get(`http://localhost:8000/AppointmentsAPI3/${username}`);
        setAppointments(Array.isArray(responseAppointments.data) ? responseAppointments.data : []);
        
        const responseTotalExpenditure = await axios.get(`http://localhost:8000/getTotalExpenditure/${username}`);
        setTotalExpenditure(responseTotalExpenditure.status === 200 ? responseTotalExpenditure.data.totalExpenditure : 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='UserProfile-whole'>
      <div className='UserProfile-left'>
        <div className='UserProfile-logo'>
          <div>Lifeline<span className='UserProfile-logo-dot'>.</span><span className='UserProfile-logo-dahboard'>Dashboard</span></div>
        </div>
        <div className='UserProfile-functions'>
          <div className='UserProfile-fuctions-int-div'>
            <div className='UserProfile-func-parts' onClick={DashboardOpener}>
              <div className='UserProfile-icon'><AiFillDashboard /></div>
              <div className='UserProfile-func'>Dashboard</div>
            </div>
            <div className='UserProfile-func-parts' onClick={AppointmentsOpener}>
              <div className='UserProfile-icon'><BsFillStickiesFill /></div>
              <div className='UserProfile-func'>Appointments</div>
            </div>
            <div className='UserProfile-func-parts' onClick={ProfileOpener}>
              <div className='UserProfile-icon'><FaUserCircle /></div>
              <div className='UserProfile-func'>Profile</div>
            </div>
            <div className='UserProfile-func-parts'>
              <Link to={`/pharmacy/${username}`} className="UserProfile-func-parts-link">
                <div className='UserProfile-icon'><MdLocalPharmacy /></div>
                <div className='UserProfile-func'>Pharmacy</div>
              </Link>
            </div>
            <div className='UserProfile-func-parts' onClick={SettingsOpener}>
              <div className='UserProfile-icon'><IoSettingsSharp /></div>
              <div className='UserProfile-func'>Settings</div>
            </div>
          </div>
        </div>
        <div className='UserProfile-logout'>
          <div className='UserProfile-logout-part' onClick={handleLogout}>
            <div className='UserProfile-logout-icon'><BiLogOut /></div>
            <div className='UserProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>
      {choose === 1 && (
        <UserDashboard userDetails={userDetails} appointments={appointments} appointmentsLength={appointments.length} totalExpenditure={totalExpenditure} />
      )}
      {choose === 2 && (
        <UserAppointments userDetails={userDetails} appointments={appointments} />
      )}
      {choose === 3 && (
        <UserProfileShow userDetails={userDetails} />
      )}
      {choose === 4 && (
        <UserSettings userDetails={userDetails} />
      )}
    </div>
  )
}

export default UserProfile