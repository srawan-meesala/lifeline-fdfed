import React from 'react'
import axios from 'axios';

const HospitalApproveDoc = ({hospName,registeredDoctors, appDoc, decDoc}) => {
    console.log(registeredDoctors);
    

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