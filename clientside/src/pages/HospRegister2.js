import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function RegisterHospUsernamePassword() {
  const navigate = useNavigate();
  const {verificationToken} = useParams()
  const [hospID, setHospID] = useState('');
  const [password, setPassword] = useState('');

  async function submitHospRegister2(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/hospRegister2', {
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

  return (
    <div>
      <form method='POST' action='/hospRegister2'>
        <label>Hospital ID</label>
        <input type="text" onChange={(e) => setHospID(e.target.value)} name="HospID" placeholder=" Hospital ID" required />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} name="Password" placeholder="Password" required />
        <input type="submit" onClick={submitHospRegister2} />
      </form>
    </div>
  );
}

export default RegisterHospUsernamePassword;
