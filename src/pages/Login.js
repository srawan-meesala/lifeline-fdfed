import React, { useEffect,useState } from "react";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';

function Login(){
    const navigate = useNavigate()
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')

    async function submit_login(e){
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/Login',{
                username,password
            })
            .then(res =>{
                if(res.status = 200){
                    navigate(`/userProfile/${username}`)
                }
                else if(res.data == 'doesnot exist'){
                    alert('User is not registered')
                }
                else if(res.data == 'invalid credentials'){
                    alert('Invalid Credentials')
                }
            })
        }
        catch(e){
            alert('Error While Logging In')
        }
    }


    return(
        <div className="login" >
            <form method="POST" action="/login" className="patient-login-form">
                <label>Username</label><b/>
                <input type="text" placeholder="Username" name="username" onChange={(e) => { setusername(e.target.value) }} required /><br/>
                <label>Password</label><b/>
                <input type="password" placeholder="Password" name="password" onChange={(e) => { setpassword(e.target.value) }} required/><br/>
                <input type="submit" onClick={submit_login} />
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/PatientRegister">Register here</Link>
        </div>
    )
}

export default Login



