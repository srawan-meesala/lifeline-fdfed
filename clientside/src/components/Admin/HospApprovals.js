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
        const response = await axios.get(`https://lifeline-fdfed-api.onrender.com/getAdminDetails/${username}`);
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

  const viewFile = async (filepath) => {
        try {
            // Format the file path
            const formattedFilepath = encodeURIComponent(filepath.trim());
            console.log(formattedFilepath)
            // Send the request with the formatted file path
            const response = await axios.get(`https://lifeline-fdfed-api.onrender.com/getCertificate?filepath=${formattedFilepath}`, {
                responseType: 'blob' // Specify response type as blob
            });

            // Create a Blob object from the response data
            const file = new Blob([response.data]);

            // Create a URL for the Blob object
            const fileURL = URL.createObjectURL(file);

            // Open the URL in a new tab
            window.open(fileURL, '_blank');
        } catch (error) {
            console.error('Error viewing certificate:', error);
        }
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