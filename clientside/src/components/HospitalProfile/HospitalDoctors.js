import React from 'react'

const HospitalDoctors = ({userDetails, doctors}) => {
  return (
    <div className='UserProfile-right'>
        <div className='UserProfile-top'>
          <div className='HospitalProfile-dashboard'>
            <div>Welcome, <span>{userDetails.hospName}</span></div>
          </div>
        </div>
        <div className='UserProfile-appointments'>
            <div className="UserProfile-appointments-title">Your Doctors</div>
            <div className="UserProfile-appointments-cards">
                {doctors.length === 0 ? (
                    <p>No Appointments Found.</p>
                ) : (
                doctors.map((doctor) => (
                    <div key={doctor.docID} className="UserProfile-appointments-card">
                        <div className='UserProfile-appointments-card'>
                            <div className="UserProfile-appointments-card-name">
                                Doctor Name: <span>Dr. {doctor.name}</span>
                            </div>
                            <div className="UserProfile-appointments-card-name">
                                Specialization: <span>{doctor.specialization}</span>
                            </div>
                            <div className="UserProfile-appointments-card-name">
                                Mobile Number: <span>{doctor.mobileNumber}</span>
                            </div>
                            <div className="UserProfile-appointments-card-name">
                                Email ID: <span>{doctor.mailID}</span>
                            </div>
                            <div className="UserProfile-appointments-card-name">
                                Doctor ID: <span>{doctor.docID}</span>
                            </div>
                            <div className="UserProfile-appointments-card-name">
                                Appointment Fees: <span>Rs. {doctor.fee}</span>
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

export default HospitalDoctors