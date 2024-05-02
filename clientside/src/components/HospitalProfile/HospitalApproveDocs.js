import React from 'react'
import axios from 'axios';

const HospitalApproveDoc = ({hospName,registeredDoctors, appDoc, decDoc}) => {
    console.log(registeredDoctors);
    
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
                <div>Welcome, <span>{hospName}</span></div>
            </div>
            </div>
            <div className='UserProfile-appointments'>
                <div className="UserProfile-appointments-title">Registered Doctors</div>
                <div className="UserProfile-appointments-cards">

                {registeredDoctors.length === 0 ? (
                    <p>No Doctors Registered.</p>
                ) : (
                    registeredDoctors.map((doctor) => (
                        <div key={doctor._id} className="UserProfile-appointments-card">
                            <div className='UserProfile-appointments-card'>
                                <div className="UserProfile-appointments-card-name">
                                    Doctor Name: <span>Dr. {doctor.name}</span>
                                </div>
                                <div className='UserProfile-appointments-card-name'>
                                    Contact Number: <span>{doctor.mobileNumber}</span>
                                </div>
                                <div className='UserProfile-appointments-card-name'>
                                    Email: <span>{(doctor.mailID)}</span>
                                </div>
                                <div className='UserProfile-appointments-card-name'>
                                    Specialization: <span>{(doctor.specialization)}</span>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    Appointment Fees: <span>Rs. {doctor.fee}</span>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    <button onClick={() => viewFile(doctor.filepath)}>View Certificate</button>
                                </div>
                                <div className="UserProfile-appointments-card-name">
                                    <span> <button onClick={() => appDoc(doctor.mailID)}>Approve</button></span>
                                    <button onClick={() => decDoc(doctor.mailID)}>Decline</button>
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

export default HospitalApproveDoc