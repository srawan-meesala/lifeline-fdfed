import React from 'react'

const UserProfileShow = ({ userDetails }) => {
  return (
    <div className='UserProfile-right'>
        <div className='UserProfile-top'>
          <div className='UserProfile-dashboard'>
            <div>Welcome, <span>{userDetails.firstName}</span></div>
          </div>
        </div>
        <div className='UserProfile-appointments'>
            <div className="UserProfile-appointments-title">Your Profile</div>
            <div className="UserProfile-profile">
                <div className="UserProfile-profile-name">
                    Name: <span>{userDetails.firstName} {userDetails.lastName}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Username: <span>{userDetails.username}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Date Of Birth: <span>{userDetails.dob}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Gender:&nbsp;
                    {userDetails.gender==='male' && (
                        <span>Male</span>
                    )}
                    {userDetails.gender==='female' && (
                        <span>Female</span>
                    )}
                    {userDetails.gender==='other' && (
                        <span>Other</span>
                    )}
                </div>
                <div className="UserProfile-profile-name">
                    Marital Status:&nbsp; 
                    {userDetails.maritalStatus==='married' && (
                        <span>Married</span>
                    )}
                    {userDetails.maritalStatus==='unmarried' && (
                        <span>Unmarried</span>
                    )}
                </div>
                <div className="UserProfile-profile-name">
                    Mobile Number: <span>{userDetails.mobileNumber}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Email ID: <span>{userDetails.mailID}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Occupation: <span>{userDetails.occupation}</span>
                </div>
                <div className="UserProfile-profile-name">
                    Blood Group: <span>{userDetails.bloodGroup}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfileShow