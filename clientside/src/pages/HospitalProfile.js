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


function HospitalProfile() {
  const {username} = useParams()
  const location = useLocation()
  const [userDetails,setUserDetails]=useState({})

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
            <div className='HospitalProfile-func-parts'>
              <div className='HospitalProfile-icon'><AiFillDashboard/></div>
              <div className='HospitalProfile-func'>Dashboard</div>
            </div>
            <div className='HospitalProfile-func-parts'>
              <div className='HospitalProfile-icon'><BsFillStickiesFill/></div>
              <div className='HospitalProfile-func'>Appointments</div>
            </div>
            <div className='HospitalProfile-func-parts'>
              <div className='HospitalProfile-icon'><MdLocalPharmacy/></div>
              <div className='HospitalProfile-func'>Pharmacy</div>
            </div>
            <div className='HospitalProfile-func-parts'>
              <div className='HospitalProfile-icon'><BiRupee/></div>
              <div className='HospitalProfile-func'>Transactions</div>
            </div>
            <div className='HospitalProfile-func-parts'>
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
      <div className='HospitalProfile-right'>
      <div className='HospitalProfile-top'>
        <div className='HospitalProfile-dashboard'>
          <div></div>
          <div>Welcome {userDetails.hospID}</div>
        </div>
        <div className='HospitalProfile-user-logo'>
          <div className='HospitalProfile-user-logo-pic'><FaUserCircle/></div>
          <div></div>
        </div>
      </div>
      <div className='HospitalProfile-cards'>
        <div className='HospitalProfile-card-1'>
          <div className='HospitalProfile-card-1-int-div'>
            <div className='HospitalProfile-card-1-int-div-head'>Total number of Appointments:</div>
            <div className='HospitalProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
        <div className='HospitalProfile-card-2'>
          <div className='HospitalProfile-card-2-int-div'>
            <div className='HospitalProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
            <div className='HospitalProfile-card-1-int-div-body'>15</div>
          </div>
        </div>
        <div className='HospitalProfile-card-3'>
          <div className='HospitalProfile-card-3-int-div'>
            <div className='HospitalProfile-card-1-int-div-head'>Total number of patients booked:</div>
            <div className='HospitalProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
        <div className='HospitalProfile-card-4'>
          <div className='HospitalProfile-card-4-int-div'>
            <div className='HospitalProfile-card-1-int-div-head'>Total number of medicines ordered:</div>
            <div className='HospitalProfile-card-1-int-div-body'>10</div>
          </div>
        </div>
      </div>
      <div className='HospitalProfile-bottom-right'>
        <div className='HospitalProfile-booked-appointments'>
          <div className='HospitalProfile-booked-appointments-int-div'>
            <div className='HospitalProfile-booked-appointments-int-div-head'><span className='HospitalProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='HospitalProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
            <div className='HospitalProfile-booked-appointments-int-div-body'>
              <div className='HospitalProfile-booked-appointments-int-div-body-part'>
                <div className='HospitalProfile-booked-appointments-int-div-body-date'>26/11/23</div>
                <div className='HospitalProfile-booked-appointments-int-div-body-time'>5:00 PM</div>
                <div className='HospitalProfile-booked-appointments-int-div-body-Doctor'>mukesh</div>
              </div>
              <div className='HospitalProfile-booked-appointments-int-div-body-part'>
                <div className='HospitalProfile-booked-appointments-int-div-body-date'>2/10/23</div>
                <div className='HospitalProfile-booked-appointments-int-div-body-time'>1:00 PM</div>
                <div className='HospitalProfile-booked-appointments-int-div-body-Doctor'>Lavanya</div>
              </div>
              <div className='HospitalProfile-booked-appointments-int-div-body-part'>
                <div className='HospitalProfile-booked-appointments-int-div-body-date'>13/9/23</div>
                <div className='HospitalProfile-booked-appointments-int-div-body-time'>10:00 AM</div>
                <div className='HospitalProfile-booked-appointments-int-div-body-Doctor'>Kaleja</div>
              </div>
            </div>
          </div>
        </div>
            <div className='HospitalProfile-remaining'>
                <div className='HospitalProfile-part-1'>
                  <div className='HospitalProfile-part-1-int-div'>
                    <div className="HospitalProfile-part-1-int-div-head">Total Income:</div>
                    <div className="HospitalProfile-part-1-int-div-body"><div className='HospitalProfile-part-1-int-div-body-icon'><BiRupee/></div><span>100000</span></div>
                  </div>
                </div> 
                <div className='HospitalProfile-part-2'>
                  <div className='HospitalProfile-part-2-int-div'>
                  </div>
                </div>
            </div>
      </div>
    </div>
</div>
  )
}

export default HospitalProfile