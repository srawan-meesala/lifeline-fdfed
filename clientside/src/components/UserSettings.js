import React, { useState } from 'react'

const UserSettings = ({ userDetails }) => {

    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const actualUsername = userDetails.username
    const actualPassword = userDetails.password

    return (
        <div className='UserProfile-right'>
            <div className='UserProfile-top'>
            <div className='UserProfile-dashboard'>
                <div>Welcome, <span>{userDetails.firstName}</span></div>
            </div>
            </div>
            <div className='UserProfile-appointments'>
                <div className="UserProfile-appointments-title">Settings</div>
                <div className="UserProfile-settings-cards">
                    <div className="UserProfile-settings">
                        <div className="UserProfile-settings-title">
                            Fill the Details to Delete Your Lifeline Account.
                        </div>
                        <form action="" method="post" className='UserProfile-settings-form'>
                            <div className="UserProfile-settings-form-field">
                                <label htmlFor="username">Enter Your Username</label>
                                <input type="text" name='username' onChange={(e)=>setEnteredUsername(e.target.value)}/>
                            </div>
                            <div className="UserProfile-settings-form-field">
                                <label htmlFor="password">Enter Your Password</label>
                                <input type="password" name='password' onChange={(e)=>setEnteredPassword(e.target.value)}/>
                            </div>
                            <div className="UserProfile-settings-form-submit">
                                <button type="submit">Delete My Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings