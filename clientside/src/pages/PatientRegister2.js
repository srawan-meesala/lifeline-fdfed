import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function RegisterUsernamePassword() {
  const navigate = useNavigate();
  const {verificationToken} = useParams()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function submitPatientRegister2(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:8000/patientRegister2', {
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
    <div>
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
              <input type="password" placeholder="Confirm Password" name="password" onChange={(e) => { setConfirmPassword(e.target.value) }} required/><br/>
          </div>
          <input type="submit" onClick={submitPatientRegister2} className="PatientLogin-form-btn"/>
      </form>
    </div>
  );
}

export default RegisterUsernamePassword;
