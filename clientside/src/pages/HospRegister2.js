import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/undraw_remotely_2j6y.svg';

function RegisterHospUsernamePassword() {
  const navigate = useNavigate();
  const {verificationToken} = useParams()
  const [hospID, setHospID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function submitHospRegister2(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await axios.post('https://lifeline-fdfed-api.onrender.com/hospRegister2', {
          verificationToken, hospID, password,
        });

        if (response.data === 'registered') {
          alert('Registration successful!');
          navigate('/login');
        } else {
          alert('Error registering username and password');
        }
      } catch (error) {
        console.error('Error registering username and password:', error);
      }
    }
  }

  return (
    <div className="PatientLogin-whole">
      <div className="PatientLogin-left">
          <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Confirm your Hospital ID and Password</span></div>
          <Logo className="PatientLogin-image"/>
      </div>
      <div className="PatientLogin-right">
        <form method="POST" action="/docRegister2" className="PatientLogin-form">
            <div className="PatientLogin-username PatientLogin-input">
                <label htmlFor="HospID">Hospital ID</label><b/>
                <input type="text" placeholder="Hospital ID" name="HospID " onChange={(e) => { setHospID(e.target.value) }} required /><br/>
            </div>
            <div className="PatientLogin-password PatientLogin-input">
                <label htmlFor="password">Password</label><b/>
                <input type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} required/><br/>
            </div>
            <div className="PatientLogin-password PatientLogin-input">
                <label htmlFor="confirm-password">Confirm Password</label><b/>
                <input type="password" placeholder="Confirm Password" name="confirm-password" onChange={(e) => { setConfirmPassword(e.target.value) }} required/><br/>
            </div>
            <input type="submit" onClick={submitHospRegister2} className="PatientLogin-form-btn"/>
        </form>
      </div>
    </div>
  );
}

export default RegisterHospUsernamePassword;
