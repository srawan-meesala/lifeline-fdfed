import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function RegisterDocUsernamePassword() {
  const navigate = useNavigate();
  const {verificationToken} = useParams()
  const [docID, setDocID] = useState('');
  const [password, setPassword] = useState('');

  async function submitDocRegister2(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/docRegister2', {
        verificationToken, docID, password,
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
      <form method='POST' action='/docRegister2'>
        <label>Doctor ID</label>
        <input type="text" onChange={(e) => setDocID(e.target.value)} name="docID" placeholder=" Doctor ID" required />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} name="Password" placeholder="Password" required />
        <input type="submit" onClick={submitDocRegister2} />
      </form>
    </div>
  );
}

export default RegisterDocUsernamePassword;
