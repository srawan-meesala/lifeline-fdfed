import React,{useState} from 'react';
import {useEffect} from 'react' ;
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { FaHandHoldingWater } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
import { BiRupee } from "react-icons/bi";

function Dashboard (){
    const {username} = useParams()
  const location = useLocation()
    const [userDetails,setUserDetails]= useState({});
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
     
    return(
        <div>
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
      <div className='Admin-cards'>
        <div className='Admin-card-1'>
          <div className='Admin-card-1-int-div'>
            <div className='Admin-card-1-int-div-left'>
            <div className='Admin-card-1-int-div-body'>10</div>
            <div className='Admin-card-1-int-div-head'>Hospitals</div>
            </div>
            <div className='Admin-card-1-int-div-right' ><FaHospital size ={40}  /></div>
          </div>
        </div>
        <div className='Admin-card-2'>
          <div className='Admin-card-2-int-div'>
            <div className ='Admin-card-1-int-div-left'>
            <div className='Admin-card-1-int-div-body'>8</div>
            <div className='Admin-card-1-int-div-head'>Doctors</div>
            </div>
            <div className='Admin-card-1-int-div-right' ><FaUserDoctor size ={40}  /></div>
            
          </div>
        </div>
        <div className='Admin-card-3'>
          <div className='Admin-card-3-int-div'>
          <div className ='Admin-card-1-int-div-left'>
          <div className='Admin-card-1-int-div-body'>10</div>
          <div className='Admin-card-1-int-div-head'>Patients</div>
          </div>
          <div>
          <div className='Admin-card-1-int-div-right' ><FaUsers size ={40}  /></div>
          </div>
          </div>
        </div>
        <div className='Admin-card-4'>
          <div className='Admin-card-4-int-div'>
          <div className ='Admin-card-1-int-div-left'>
          <div className='Admin-card-1-int-div-body'>10</div>
            <div className='Admin-card-1-int-div-head'>Donors</div>
            </div>
            <div>
          <div className='Admin-card-1-int-div-right' ><FaHandHoldingWater size ={40}  /></div>
          </div>
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
    )
}

export default Dashboard
