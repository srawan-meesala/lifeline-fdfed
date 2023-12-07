import React from 'react'

const DoctorProfileShow = ({ userDetails }) => {
  return (
    <div className='UserProfile-right'>
        <div className='UserProfile-top'>
          <div className='HospitalProfile-dashboard'>
            <div>Welcome, <span>{userDetails.hospName}</span></div>
          </div>
        </div>
        <div className='UserProfile-appointments'>
            <div className="UserProfile-appointments-title">Your Profile</div>
            <div className="UserProfile-profile">
                <div className="UserProfile-profile-name">
                    Name: <span>Dr. {userDetails.name}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Hospital Name: <span>{userDetails.hospName}</span>
                </div>
                <div className="UserProfile-profile-name">
                    City: <span>{userDetails.city}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Specialization: <span>{userDetails.specialization}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Mobile Number: <span>{userDetails.mobileNumber}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Email ID: <span>{userDetails.mailID}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Fee: <span>{userDetails.fee}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorProfileShow