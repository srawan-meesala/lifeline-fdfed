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
import Cookies from 'js-cookie';

function Dashboard ({hospitals, patients, doctors, donors, bloodDonors, appointments, blogs}){
    const username = Cookies.get('username');
    
    const location = useLocation()
    const [userDetails,setUserDetails]= useState({});
    
    var totalIncome = 0

    for (let i=0; i<appointments.length; i++) {
      totalIncome += (appointments[i].Fee * 0.1)
    }

    useEffect(()=>{
        async function fetchData(){
          try{
            const response = await axios.get(`http://localhost:8000/getAdminDetails/${username}`);
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
     
    return(
        <div>
       <div className='DoctorProfile-top'>
        <div className='DoctorProfile-dashboard'>
          <div></div>
          <div>Welcome {userDetails.name}</div>
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
            <div className='Admin-card-1-int-div-body'>{hospitals.length}</div>
            <div className='Admin-card-1-int-div-head'>Hospitals</div>
            </div>
            <div className='Admin-card-1-int-div-right' ><FaHospital size ={40}  /></div>
          </div>
        </div>
        <div className='Admin-card-2'>
          <div className='Admin-card-2-int-div'>
            <div className ='Admin-card-1-int-div-left'>
            <div className='Admin-card-1-int-div-body'>{doctors.length}</div>
            <div className='Admin-card-1-int-div-head'>Doctors</div>
            </div>
            <div className='Admin-card-1-int-div-right' ><FaUserDoctor size ={40}  /></div>  
          </div>
        </div>
        <div className='Admin-card-3'>
          <div className='Admin-card-3-int-div'>
          <div className ='Admin-card-1-int-div-left'>
          <div className='Admin-card-1-int-div-body'>{patients.length}</div>
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
          <div className='Admin-card-1-int-div-body'><BiRupee/>{totalIncome}</div>
            <div className='Admin-card-1-int-div-head'>Total Income</div>
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
            <div className='DoctorProfile-booked-appointments-int-div-head'><span className='DoctorProfile-booked-appointments-int-div-head-top'></span><span className='DoctorProfile-booked-appointments-int-div-head-bottom'></span></div>
            <div className='DoctorProfile-booked-appointments-int-div-body'>
              <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                <div className='AdminProfile-booked-appointments-int-div-body-date'>Total Number of Appointments: </div>
                <div className='AdminProfile-booked-appointments-int-div-body-time'>{appointments.length}</div>
              </div>
              <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                <div className='AdminProfile-booked-appointments-int-div-body-date'>Total Number of Blogs: </div>
                <div className='AdminProfile-booked-appointments-int-div-body-time AdminProfile-new'>{blogs.length}</div>
              </div>
            </div>
          </div>
        </div>
            <div className='DoctorProfile-remaining'>
                <div className='DoctorProfile-part-1'>
                  <div className='DoctorProfile-part-1-int-div'>
                    <div className="DoctorProfile-part-1-int-div-head">Total Organ Donors</div>
                    <div className="DoctorProfile-part-1-int-div-body"><div className='DoctorProfile-part-1-int-div-body-icon'></div><span>{donors.length}</span></div>
                  </div>
                </div>
                <div className='DoctorProfile-part-2'>
                  <div className='DoctorProfile-part-2-int-div'>
                    <div className="DoctorProfile-part-1-int-div-head">Total Blood Donors</div>
                    <div className="DoctorProfile-part-1-int-div-body"><div className='DoctorProfile-part-1-int-div-body-icon'></div><span>{bloodDonors.length}</span></div>
                  </div>
                </div>
            </div>
      </div>
        </div>
    )
}

export default Dashboard
