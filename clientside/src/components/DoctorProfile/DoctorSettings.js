import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const HospitalSettings = ({ userDetails }) => {
    const navigate = useNavigate()
    const [entereddocID, setEntereddocID] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const actualdocID = userDetails.docID
    const actualpassword = userDetails.password
    
    const handlesubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8000/deletedoc',{
                entereddocID,enteredPassword,actualdocID,actualpassword
            })
            if(response.data === 'deleted'){
                alert('Deletion successful')
                Cookies.remove('username')
                Cookies.remove('type')
                Cookies.remove('loggedIn')
                navigate('/')
            }
            else if(response.data === 'mismatched'){
                alert('Invalid Credentials')
            }
        }
        catch(error){
            alert('Wrong details');
            console.error(error);
        }
    }
    
    return (
        <div className='UserProfile-right'>
            <div className='UserProfile-top'>
            <div className='HospitalProfile-dashboard'>
                <div>Welcome, <span>{userDetails.Name}</span></div>
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
                                <label htmlFor="username">Enter Your Doctor ID</label>
                                <input type="text" name='username' onChange={(e)=>setEntereddocID(e.target.value)}/>
                            </div>
                            <div className="UserProfile-settings-form-field">
                                <label htmlFor="password">Enter Your Password</label>
                                <input type="password" name='password' onChange={(e)=>setEnteredPassword(e.target.value)}/>
                            </div>
                            <div className="UserProfile-settings-form-submit">
                                <button type="submit" onClick={handlesubmit}>Delete My Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalSettings