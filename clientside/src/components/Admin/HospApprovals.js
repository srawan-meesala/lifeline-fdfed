import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';

const HospApproval = ({registeredHosps, appHosp, decHosp}) => {
  const username = Cookies.get('username');
  const [userDetails,setUserDetails] = useState()
  console.log(registeredHosps)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAdminDetails/${username}`);
        if (response.status === 200) {
          setUserDetails(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [username])  

    const viewFile = (filepath) => {
        const certificate = `http://localhost:8000/${filepath}`
        window.open(certificate, '_blank');
      };
 
    return (
        <div className='UserProfile-right'>
            <div className='UserProfile-top'>
            <div className='HospitalProfile-dashboard'>
                <div>Welcome, <span>{username}</span></div>
            </div>
            </div>
            <div className='UserProfile-appointments'>
                <div className="UserProfile-appointments-title">Registered Hospitals</div>
                <div className="UserProfile-appointments-cards">

                {registeredHosps.length === 0 ? (
                    <p>No Hospitals Registered.</p>
                ) : (
                    registeredHosps.map((doctor) => (
                        <div key={doctor.hospID} className="UserProfile-appointments-card">
                            <div className='UserProfile-appointments-card'>
                                <div className="UserProfile-appointments-card-name">
                                    Hospital Name: <span>Dr. {doctor.hospName}</span>
                                </div>
                                <div className='UserProfile-appointments-card-name'>
                                    Contact Number: <span>{doctor.mobileNumber}</span>
                                </div>
                                <div className='UserProfile-appointments-card-name'>
                                    Email: <span>{(doctor.mailID)}</span>
                                </div>
                                <div className='UserProfile-appointments-card-name'>
                                    City: <span>{(doctor.city)}</span>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    Bloodbanks: <span>Rs. {doctor.bloodBanks}</span>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    Diagnosis Center: <span>Rs. {doctor.diagnosisCenter}</span>
                                </div><div className="UserProfile-appointments-card-name">
                                    Organ Donation: <span>Rs. {doctor.organDonation}</span>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    <button onClick={() => viewFile(doctor.filepath)}>View Certificate</button>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    <span> <button onClick={() => appHosp(doctor.mailID)}>Approve</button></span>
                                    <button onClick={() => decHosp(doctor.mailID)}>Decline</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                </div>
            </div>
        </div>
    )
    }

export default HospApproval