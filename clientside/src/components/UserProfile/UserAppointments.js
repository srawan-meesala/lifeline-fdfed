import React from 'react'

const UserAppointments = ({userDetails}) => {
  return (
    <div className='UserProfile-right'>
        <div className='UserProfile-top'>
          <div className='UserProfile-dashboard'>
            <div>Welcome, <span>{userDetails.firstName}</span></div>
          </div>
        </div>
        <div className='UserProfile-appointments'>
            <div className="UserProfile-appointments-title">Your Appointments</div>
            <div className="UserProfile-appointments-cards">
                <div className="UserProfile-appointments-card">
                    <div className="UserProfile-appointments-card-name">
                        Doctor Name: <span>Dr. Ram Prasad</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Date: <span>12-08-2020</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Time: <span>8:00 PM </span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Appointment Fees: <span>Rs. 440</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Hospital Name: <span>Ram Prasad Clinic</span>
                    </div>
                </div>

                <div className="UserProfile-appointments-card">
                    <div className="UserProfile-appointments-card-name">
                        Doctor Name: <span>Dr. Ram Prasad</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Date: <span>12-08-2020</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Time: <span>8:00 PM </span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Appointment Fees: <span>Rs. 440</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Hospital Name: <span>Ram Prasad Clinic</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserAppointments