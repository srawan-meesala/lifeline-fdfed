import React, { useEffect,useState } from "react";
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillStickiesFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useParams } from 'react-router-dom';


function UserProfile() {
  const {username} = useParams()
  const [userDetails,setUserDetails]=useState({})

  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get(`http://localhost:8000/getUserDetails/${username}`);
        if(response.status === 200){
          setUserDetails(response.data)
          console.log(userDetails)
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
    <div className='UserProfile-whole'>
      <div className='UserProfile-left'>
        <div className='UserProfile-logo'>
          <div>Lifeline<span className='UserProfile-logo-dot'>.</span><span className='UserProfile-logo-dahboard'>Dashboard</span></div>
        </div>
        <div className='UserProfile-functions'>
          <div className='UserProfile-fuctions-int-div'>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><AiFillDashboard/></div>
              <div className='UserProfile-func'>Dashboard</div>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><BsFillStickiesFill/></div>
              <div className='UserProfile-func'>Appointments</div>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><FaUserCircle/></div>
              <div className='UserProfile-func'>Profile</div>
            </div>
            <div className='UserProfile-func-parts'>
              <Link to='/pharmacy' className="UserProfile-func-parts-link">
                <div className='UserProfile-icon'><MdLocalPharmacy/></div>
                <div className='UserProfile-func'>Pharmacy</div>
              </Link>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><IoSettingsSharp/></div>
              <div className='UserProfile-func'>Settings</div>
            </div>
            </div>
        </div>
        <div className='UserProfile-logout'>
          <div className='UserProfile-logout-part'>
            <div className='UserProfile-logout-icon'><BiLogOut/></div>
            <div className='UserProfile-logout-func'>Logout</div>
          </div>
        </div>
      </div>
      <div className='UserProfile-right'>
      <div className='UserProfile-top'>
        <div className='UserProfile-dashboard'>
          <div>Welcome, <span>{userDetails.firstName}</span></div>
        </div>
      </div>
      <div className='UserProfile-cards'>
        <div className='UserProfile-card-1'>
          <div className='UserProfile-card-1-int-div'>
            <div className='UserProfile-card-1-int-div-head'>Total number of Appointments:</div>
            <div className='UserProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
        <div className='UserProfile-card-2'>
          <div className='UserProfile-card-2-int-div'>
            <div className='UserProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
            <div className='UserProfile-card-1-int-div-body'>15</div>
          </div>
        </div>
        <div className='UserProfile-card-3'>
          <div className='UserProfile-card-3-int-div'>
            <div className='UserProfile-card-1-int-div-head'>Total number of Doctors consulted:</div>
            <div className='UserProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
        <div className='UserProfile-card-4'>
          <div className='UserProfile-card-4-int-div'>
            <div className='UserProfile-card-1-int-div-head'>Total number of medicines ordered:</div>
            <div className='UserProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
      </div>
      <div className='UserProfile-bottom-right'>
        <div className='UserProfile-booked-appointments'>
          <div className='UserProfile-booked-appointments-int-div'>
            <div className='UserProfile-booked-appointments-int-div-head'><span className='UserProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='UserProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
            <div className='UserProfile-booked-appointments-int-div-body'>
              <div className='UserProfile-booked-appointments-int-div-body-part'>
                <div className='UserProfile-booked-appointments-int-div-body-date'>26/11/23</div>
                <div className='UserProfile-booked-appointments-int-div-body-time'>5:00 PM</div>
                <div className='UserProfile-booked-appointments-int-div-body-Doctor'>Dr.Rajesh</div>
              </div>
              <div className='UserProfile-booked-appointments-int-div-body-part'>
                <div className='UserProfile-booked-appointments-int-div-body-date'>2/10/23</div>
                <div className='UserProfile-booked-appointments-int-div-body-time'>1:00 PM</div>
                <div className='UserProfile-booked-appointments-int-div-body-Doctor'>Dr.Lavanya</div>
              </div>
              <div className='UserProfile-booked-appointments-int-div-body-part'>
                <div className='UserProfile-booked-appointments-int-div-body-date'>13/9/23</div>
                <div className='UserProfile-booked-appointments-int-div-body-time'>10:00 AM</div>
                <div className='UserProfile-booked-appointments-int-div-body-Doctor'>Dr.Kaleja</div>
              </div>
            </div>
          </div>
        </div>
            <div className='UserProfile-remaining'>
                <div className='UserProfile-part-1'>
                  <div className='UserProfile-part-1-int-div'>
                  <div className="UserProfile-part-1-int-div-head">Total Expenditure:</div>
                  <div className="UserProfile-part-1-int-div-body"><div className='UserProfile-part-1-int-div-body-icon'><BiRupee/></div><span>100000</span></div>
                  </div>
                </div>
                <div className='UserProfile-part-2'>
                  <div className='UserProfile-part-2-int-div'>
                  </div>
                </div>
            </div>
      </div>
    </div>
</div>
  )
}

export default UserProfile