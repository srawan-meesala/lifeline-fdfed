import React, { useEffect,useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillStickiesFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { BiLogOut } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import DoctorAppointments from "../components/DoctorProfile/DoctorAppointments";
import DoctorDashboard from "../components/DoctorProfile/DoctorDashboard";
import DoctorSettings from "../components/DoctorProfile/DoctorSettings";
import DoctorProfileShow from "../components/DoctorProfile/DoctorProfileShow";
import DoctorBlogs from "../components/DoctorProfile/DoctorBlogs";


function DoctorProfile() {
  const {username} = useParams()
  const [choose, setChoose] = useState(1)
  const [userDetails,setUserDetails]=useState({})
  const [totalExpenditure, setTotalExpenditure] = useState(0)
  const navigate = useNavigate()

  const DashboardOpener = () => setChoose(1)
  const AppointmentsOpener = () => setChoose(2)
  const BlogsOpener = () => setChoose(5)
  const ProfileOpener = () => setChoose(3)
  const SettingsOpener = () => setChoose(4)

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/AppointmentsAPI/${userDetails.docID}`);
        setAppointments(Array.isArray(response.data) ? response.data : []);
        console.log(appointments);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchAppointments();
  }, [userDetails.docID]);

  useEffect(() => {
    const fetchTotalExpenditure = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getTotalExpenditure2/${userDetails.docID}`);
        if (response.status === 200) {
          setTotalExpenditure(response.data.totalExpenditure);
        } else {
          console.error('Failed to fetch total expenditure');
        }
      } catch (error) {
        console.error('Error fetching total expenditure:', error);
      }
    };
  
    fetchTotalExpenditure();
  }, [userDetails.docID]);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/blogsAPI/${userDetails.docID}`);
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [userDetails.docID]);

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
            <div className='DoctorProfile-func-parts' onClick={BlogsOpener}>
              <div className='DoctorProfile-icon'><TfiWrite/></div>
              <div className='DoctorProfile-func'>Your Blogs</div>
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
          <div className='DoctorProfile-logout-part' onClick={()=>navigate('/')}>
            <div className='DoctorProfile-logout-icon'><BiLogOut/></div>
            <div className='DoctorProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>
      {choose===1 && (
        <DoctorDashboard 
          userDetails={userDetails}
          appointments={appointments}
          appointmentsLength={appointments.length}
          blogsLength={blogs.length}
          totalExpenditure={totalExpenditure}
        />
      )}
      {choose===2 && (
        <DoctorAppointments userDetails={userDetails} appointments={appointments}/>
      )}
      {choose===3 && (
        <DoctorProfileShow userDetails={userDetails} />
      )}
      {choose===4 && (
        <DoctorSettings userDetails={userDetails} />
      )}
      {choose===5 && (
        <DoctorBlogs userDetails={userDetails} blogs={blogs}/>
      )}
    </div>
  )
}

export default DoctorProfile