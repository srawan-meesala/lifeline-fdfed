import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as Logo } from "../images/undraw_remotely_2j6y.svg";
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [type, setType] = useState('patient')

    async function submitLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password,
                type,
            });

            if (response.data === 'exist') {

                Cookies.set('loggedIn', true);
                Cookies.set('username', username);
                Cookies.set('type', type);

                if (type === 'patient') {
                    navigate(`/home`);
                } else if (type === 'doctor') {
                    navigate(`/docProfile`);
                } else if (type === 'hospital') {
                    navigate(`/hospProfile`);
                } else if (type === 'admin') {
                    navigate(`/adminProfile`);
                }
            } else if (response.data === 'does not exist') {
                alert('User does not exist');
            } else if (response.data === 'invalid credentials') {
                alert('Invalid Credentials');
            }
        }
        catch (error) {
            console.error('Error logging in:', error);
            alert('Error while logging in');
        }
    }
    return (
        <div className="PatientLogin-whole" >
            <div className="PatientLogin-left">
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Login</span></div>
                <Logo className="PatientLogin-image" />
            </div>
            <div className="PatientLogin-right">
                <form method="POST" action="/login" className="PatientLogin-form">
                    <div className="PatientLogin-username PatientLogin-input">
                        <label htmlFor="username">Username</label><b />
                        <input type="text" placeholder="Username" name="username" onChange={(e) => { setusername(e.target.value) }} required /><br />
                    </div>
                    <div className="PatientLogin-password PatientLogin-input">
                        <label htmlFor="password">Password</label><b />
                        <input type="password" placeholder="Password" name="password" onChange={(e) => { setpassword(e.target.value) }} required /><br />
                    </div>
                    <div className="PatientLogin-type PatientLogin-input">
                        <label htmlFor="type">Type of User</label><b />
                        <select name="type" value={type} onChange={(e) => { setType(e.target.value) }} required>
                            <option value="patient" >Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="hospital">Hospital</option>
                            <option value="admin">Admin</option>
                        </select><br />
                    </div>
                    <input type="submit" onClick={submitLogin} className="PatientLogin-form-btn" />
                </form>
                <Link className="PatientLogin-right-register" to="/PatientRegister">Haven't Registered yet?</Link>
            </div>

        </div>
    )
}

export default Login