import React from 'react'

const HospitalProfileShow = ({ userDetails }) => {
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
                    Name: <span>{userDetails.hospName}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Hospital ID: <span>{userDetails.hospID}</span>
                </div>
                <div className="UserProfile-profile-name">
                    City: <span>{userDetails.city}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Diagnosis Center:&nbsp; 
                    {userDetails.diagnosisCenter==='available' && (
                        <span>Available</span>
                    )}
                    {userDetails.diagnosisCenter==='unavailable' && (
                        <span>Not Available</span>
                    )}
                </div>
                <div className="UserProfile-profile-name">
                    Blood Bank:&nbsp; 
                    {userDetails.bloodBanks==='available' && (
                        <span>Available</span>
                    )}
                    {userDetails.bloodBanks==='unavailable' && (
                        <span>Not Available</span>
                    )}
                </div>
                <div className="UserProfile-profile-name">
                    Organ Donation Camp:&nbsp; 
                    {userDetails.organDonation==='available' && (
                        <span>Available</span>
                    )}
                    {userDetails.organDonation==='unavailable' && (
                        <span>Not Available</span>
                    )}
                </div>
                <div className="UserProfile-profile-name">
                    Mobile Number: <span>{userDetails.mobileNumber}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Email ID: <span>{userDetails.mailID}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HospitalProfileShow