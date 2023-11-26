import React, { useEffect,useState } from "react";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';
import { ReactComponent as Logo } from "../images/undraw_remotely_2j6y.svg";

function PatientLogin(){
    const navigate = useNavigate()
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [type,setType] = useState('')

    async function submit_login(e){
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/patientLogin',{
                username,password
            })
            .then(res =>{
                if(res.data == 'exist'){
                    navigate('/userProfile')
                }
                else if(res.data === 'doesnot exist'){
                    alert('User is not registered')
                }
                else if(res.data === 'invalid credentials'){
                    alert('Invalid Credentials')
                }
            })
        }
        catch(e){
            alert('Error While Logging In')
        }
    }


    return(
        <div className="PatientLogin-whole" >
            <div className="PatientLogin-left">
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Login</span></div>
                <Logo className="PatientLogin-image"/>
            </div>
            <div className="PatientLogin-right">
                <form method="POST" action="/patientLogin" className="PatientLogin-form">
                    <div className="PatientLogin-username PatientLogin-input">
                        <label htmlFor="username">Username</label><b/>
                        <input type="text" placeholder="Username" name="username" onChange={(e) => { setusername(e.target.value) }} required /><br/>
                    </div>
                    <div className="PatientLogin-password PatientLogin-input">
                        <label htmlFor="password">Password</label><b/>
                        <input type="password" placeholder="Password" name="password" onChange={(e) => { setpassword(e.target.value) }} required/><br/>
                    </div>
                    <div className="PatientLogin-type PatientLogin-input">
                        <label htmlFor="password">Type of User</label><b/>
                        <select name="type" onChange={(e) => { setType(e.target.value) }} required>
                            <option value="patient" selected>Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="hospital">Hospital</option>
                            <option value="admin">Admin</option>
                        </select><br/>
                    </div>
                    <button type="submit" onClick={submit_login} >Log In</button>
                </form>
                <Link className="PatientLogin-right-register" to="/PatientRegister">Haven't Registered yet?</Link>
            </div>
            
        </div>
    )
}

export default PatientLogin