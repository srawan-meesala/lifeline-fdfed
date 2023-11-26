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


function UserProfile() {
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
    <div className='UserProfile-whole'>
      <div className='UserProfile-left'>
        <div className='UserProfile-logo'>
          <div>Lifeline<span>.</span></div>
        </div>
        <div className='UserProfile-functions'>
          <div className='UserProfile-fuctions-int-div'>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><AiFillDashboard/></div>
              <div className='UserProfile-func'>Dashboard</div>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><BsFillStickiesFill/></div>
              <div className='UserProfile-func'>appointments</div>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><FaUserDoctor/></div>
              <div className='UserProfile-func'>Doctors</div>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><MdLocalPharmacy/></div>
              <div className='UserProfile-func'>Pharmacy</div>
            </div>
            <div className='UserProfile-func-parts'>
              <div className='UserProfile-icon'><BiRupee/></div>
              <div className='UserProfile-func'>Transactions</div>
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
          <div>Welcome {userDetails.firstName}</div>
        </div>
        <div className='UserProfile-user-logo'>
          <div className='UserProfile-user-logo-pic'><FaUserCircle/></div>
          <div></div>
        </div>
      </div>
      <div className='UserProfile-cards'>
        <div className='UserProfile-card-1'>
          <div className='UserProfile-card-1-int-div'></div>
        </div>
        <div className='UserProfile-card-2'>
          <div className='UserProfile-card-2-int-div'></div>
        </div>
        <div className='UserProfile-card-3'>
          <div className='UserProfile-card-3-int-div'></div>
        </div>
        <div className='UserProfile-card-4'>
          <div className='UserProfile-card-4-int-div'></div>
        </div>
      </div>
      <div className='UserProfile-bottom-right'>
        <div className='UserProfile-booked-appointments'>
          <div className='UserProfile-booked-appointments-int-div'></div>
        </div>
            <div className='UserProfile-remaining'>
                <div className='UserProfile-part-1'>
                  <div className='UserProfile-part-1-int-div'>

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