import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterUsernamePassword({ verificationToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitPatientRegister2(e) {
    e.preventDefault();
    console.log(verificationToken)
    try {
      const response = await axios.post('http://localhost:8000/patientRegister2', {
        verificationToken, username, password,
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
      <form method='POST' action='/patientRegister2'>
        <label>Username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} name="Username" placeholder="Username" required />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} name="Password" placeholder="Password" required />
        <input type="submit" onClick={submitPatientRegister2} />
      </form>
    </div>
  );
}

export default RegisterUsernamePassword;
