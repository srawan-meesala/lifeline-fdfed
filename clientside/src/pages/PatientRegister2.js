import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { ReactComponent as Logo } from "../images/undraw_remotely_2j6y.svg";


function RegisterUsernamePassword() {
  var regularExpression  = new RegExp(/^[A-Za-z]\w{8,15}$/);
  const navigate = useNavigate();
  const {verificationToken} = useParams()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function submitPatientRegister2(e) {
    e.preventDefault();
    alert('Verified Successfully')
    if(username.length < 5 || username.length > 25 )
    {
       alert("Username should be between 5 to 25 characters!!")
        return false;
    }
    else if(regularExpression.test(password)) 
    {
       alert("password should contain atleast one number and one special character");
        return false;
    }
    else if(password.length < 8 || password.length > 15) 
    {  
        alert("Password should be between 8 to 15 characters!!")
        return false;
    }


    if (password === confirmPassword) {
      try {
        const response = await axios.post('https://lifeline-fdfed-api.onrender.com/patientRegister2', {
          verificationToken, username, password,
        });

        if (response.data === 'registered') {
          alert('Registration successful!');
          navigate('/login');
        }else if (response.data === 'exists'){
          alert('Username already exists');
        } else {
          alert('Error registering username and password');
        }
      } catch (error) {
        console.error('Error registering username and password:', error);
      }
    }
    else {
      alert('Passwords Mismatch.')
    }
  }

  return (
    <div className="PatientLogin-whole">
      <div className="PatientLogin-left">
          <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Confirm your Username and Password</span></div>
          <Logo className="PatientLogin-image"/>
      </div>
      <div className="PatientLogin-right">
        <form method="POST" action="/login" className="PatientLogin-form">
            <div className="PatientLogin-username PatientLogin-input">
                <label htmlFor="username">Username</label><b/>
                <input type="text" placeholder="Username" name="username" onChange={(e) => { setUsername(e.target.value) }} required /><br/>
            </div>
            <div className="PatientLogin-password PatientLogin-input">
                <label htmlFor="password">Password</label><b/>
                <input type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} required/><br/>
            </div>
            <div className="PatientLogin-password PatientLogin-input">
                <label htmlFor="confirm-password">Confirm Password</label><b/>
                <input type="password" placeholder="Confirm Password" name="confirm-password" onChange={(e) => { setConfirmPassword(e.target.value) }} required/><br/>
            </div>
            <input type="submit" onClick={submitPatientRegister2} className="PatientLogin-form-btn"/>
        </form>
      </div>
    </div>
  );
}

export default RegisterUsernamePassword;
