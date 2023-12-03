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
import { useLocation, useParams } from 'react-router-dom';


function DoctorProfile() {
  const {username} = useParams()
  const location = useLocation()
  const [userDetails,setUserDetails]=useState({})

  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get(`http://localhost:8000/getUserDetails/${username}`);
        if(response.status == 200){
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
            <div className='DoctorProfile-func-parts'>
              <div className='DoctorProfile-icon'><AiFillDashboard/></div>
              <div className='DoctorProfile-func'>Dashboard</div>
            </div>
            <div className='DoctorProfile-func-parts'>
              <div className='DoctorProfile-icon'><BsFillStickiesFill/></div>
              <div className='DoctorProfile-func'>appointments</div>
            </div>
            <div className='DoctorProfile-func-parts'>
              <div className='DoctorProfile-icon'><MdLocalPharmacy/></div>
              <div className='DoctorProfile-func'>Pharmacy</div>
            </div>
            <div className='DoctorProfile-func-parts'>
              <div className='DoctorProfile-icon'><BiRupee/></div>
              <div className='DoctorProfile-func'>Transactions</div>
            </div>
            <div className='DoctorProfile-func-parts'>
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
      <div className='DoctorProfile-right'>
      <div className='DoctorProfile-top'>
        <div className='DoctorProfile-dashboard'>
          <div></div>
          <div>Welcome {userDetails.firstName}</div>
        </div>
        <div className='DoctorProfile-user-logo'>
          <div className='DoctorProfile-user-logo-pic'><FaUserCircle/></div>
          <div></div>
        </div>
      </div>
      <div className='DoctorProfile-cards'>
        <div className='DoctorProfile-card-1'>
          <div className='DoctorProfile-card-1-int-div'>
            <div className='DoctorProfile-card-1-int-div-head'>Total number of Appointments:</div>
            <div className='DoctorProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
        <div className='DoctorProfile-card-2'>
          <div className='DoctorProfile-card-2-int-div'>
            <div className='DoctorProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
            <div className='DoctorProfile-card-1-int-div-body'>15</div>
          </div>
        </div>
        <div className='DoctorProfile-card-3'>
          <div className='DoctorProfile-card-3-int-div'>
            <div className='DoctorProfile-card-1-int-div-head'>Total number of patients booked:</div>
            <div className='DoctorProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
        <div className='DoctorProfile-card-4'>
          <div className='DoctorProfile-card-4-int-div'>
            <div className='DoctorProfile-card-1-int-div-head'>Total number of medicines ordered:</div>
            <div className='DoctorProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
      </div>
      <div className='DoctorProfile-bottom-right'>
        <div className='DoctorProfile-booked-appointments'>
          <div className='DoctorProfile-booked-appointments-int-div'>
            <div className='DoctorProfile-booked-appointments-int-div-head'><span className='DoctorProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='DoctorProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
            <div className='DoctorProfile-booked-appointments-int-div-body'>
              <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                <div className='DoctorProfile-booked-appointments-int-div-body-date'>26/11/23</div>
                <div className='DoctorProfile-booked-appointments-int-div-body-time'>5:00 PM</div>
                <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>mukesh</div>
              </div>
              <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                <div className='DoctorProfile-booked-appointments-int-div-body-date'>2/10/23</div>
                <div className='DoctorProfile-booked-appointments-int-div-body-time'>1:00 PM</div>
                <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>Lavanya</div>
              </div>
              <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                <div className='DoctorProfile-booked-appointments-int-div-body-date'>13/9/23</div>
                <div className='DoctorProfile-booked-appointments-int-div-body-time'>10:00 AM</div>
                <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>Kaleja</div>
              </div>
            </div>
          </div>
        </div>
            <div className='DoctorProfile-remaining'>
                <div className='DoctorProfile-part-1'>
                  <div className='DoctorProfile-part-1-int-div'>
                    <div className="DoctorProfile-part-1-int-div-head">Total Income</div>
                    <div className="DoctorProfile-part-1-int-div-body"><div className='DoctorProfile-part-1-int-div-body-icon'><BiRupee/></div><span>100000</span></div>
                  </div>
                </div>
                <div className='DoctorProfile-part-2'>
                  <div className='DoctorProfile-part-2-int-div'>
                  </div>
                </div>
            </div>
      </div>
    </div>
</div>
  )
}

export default DoctorProfile