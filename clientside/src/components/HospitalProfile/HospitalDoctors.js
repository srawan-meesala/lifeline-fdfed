import React from 'react'

const HospitalDoctors = ({userDetails}) => {
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
                <div className="UserProfile-appointments-card">
                    <div className="UserProfile-appointments-card-name">
                        Doctor Name: <span>Dr. Ram Prasad</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Doctor Specialization: <span>Cardiologist</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Mobile Number: <span>4561237895</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Email ID: <span>bigmanshere777@gmail.com</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Doctor ID: <span>ramu</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Appointment Fees: <span>Rs. 440</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HospitalDoctors