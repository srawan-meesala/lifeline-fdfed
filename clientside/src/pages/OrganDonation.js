import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/OrganDonation.css'
import Cookies from 'js-cookie';

const OrganDonation = () => {
  const navigate = useNavigate()
  const username = Cookies.get('username');
  const [name, setName] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [gender, setGender] = useState('male')
  const [donation, setDonation] = useState('full body')
  const [particular, setParticular] = useState('Invalid')
  const [past, setPast] = useState('')
  const [isValidAadhaar, setIsValidAadhaar] = useState(true);



  const handleAadhaarChange = (e) => {
    const inputAadhaar = e.target.value;
    setAadhaar(inputAadhaar);
    const isValid = /^\d{12}$/.test(inputAadhaar);
    setIsValidAadhaar(isValid);
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (!isValidAadhaar) {
      alert("Invalid Aadhar card. Please enter a valid 12-digit Aadhar card number.");
    }
    else {
      try {
        const response = await axios.post('http://localhost:8000/organDonation', {
          username, name, aadhaar, gender, donation, particular, past
        });

        if (response.data === 'exist') {
          alert('Registered already.Cannot register again');
        } else if (response.status === 200) {
          navigate(`/odthankyou`)
        }
      } catch (error) {
        alert('Wrong details');
        console.error(error);
      }
    }
  }

  return (
    <div className='OrganDonation-whole'>
      <div className='OrganDonation-whole-int'>
        <Navbar title={'Organ Donation'} />
        <div className='OrganDonation-whole-int-title'>Organ Donation Form</div>
        <div className='OrganDonation-whole-int-body'>
          <form onSubmit={submitHandler} className='OrganDonation-whole-int-body-form' method='post' action='/organDonation'>
            <div className='OrganDonation-whole-int-body-form-upper'>
              <label className='OrganDonation-label' required>Name:</label>
              <input onChange={(e) => setName(e.target.value)} type='text' className='OrganDonation-input-name' required></input>
              <label className='OrganDonation-label'>Aadhar number:</label>
              <input type='number' className='OrganDonation-input-aadhar' value={aadhaar} onChange={handleAadhaarChange} required></input>
              <label className='OrganDonation-label'>Gender:</label>
              <select onChange={(e) => setGender(e.target.value)} className='OrganDonation-select' required>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Others</option>
              </select>
              <label className='OrganDonation-label'>Donation</label>
              <select onChange={(e) => setDonation(e.target.value)} required>
                <option value='full body'>Full body or tissues</option>
                <option value='particular'>Particular Organ</option>
              </select>
              <label className='OrganDonation-label'>If Particular Organ? What is it?</label>
              {donation !== 'particular' && (
                <input type='text' className='OrganDonation-input-name' disabled></input>
              )}
              {donation === 'particular' && (
                <input onChange={(e) => setParticular(e.target.value)} type='text' className='OrganDonation-input-name'></input>
              )}
              <label className='OrganDonation-label'>Any health issues in the past?</label>
              <textarea onChange={(e) => setPast(e.target.value)} className='OrganDonation-Textarea' required></textarea>
            </div>
            <div className='OrganDonation-whole-int-body-form-lower'><button className='OrganDonation-btn'>Donate</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OrganDonation