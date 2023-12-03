import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/undraw_remotely_2j6y.svg';

function HospitalRegister() {

  const [hospName, setHospName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mailID, setMailID] = useState('');
  const [city, setCity] = useState('');
  const [diagnosisCenter, setDiagnosisCenter] = useState('available');
  const [bloodBanks, setBloodBanks] = useState('available');
  const [organDonation, setOrganDonation] = useState('available');
  const [verificationToken, setVerificationToken] = useState('');

  async function submithospRegister(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/hospRegister', {
        hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation
      });

      if (response.data === 'exist') {
        alert('Hospital already registered');
      } else {
        alert('Registration successful! Please check your email for verification.');
        setVerificationToken(response.data.verificationToken);
      }
    } catch (error) {
      alert('Wrong details');
      console.error(error);
    }
  }

    return (
        <div className="PatientLogin-whole">

            <div className="PatientLogin-left">
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Registration</span></div>
                <Logo className="PatientLogin-image"/>
            </div>
            <div className="PatientLogin-right">
                <form method="POST" action="/hospRegister"  className="patient-register-form">
                    <label htmlFor='hospName'>Hospital Name</label><b/>
                    <input type="text" onChange={(e) => { setHospName(e.target.value) }} name="hospName" placeholder="Hospital Name" required  />
                    <label htmlFor='mobileNumber'>Mobile Number</label><b/>
                    <input type="number" onChange={(e) => { setMobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  />
                    <label htmlFor='mailID'>Email ID</label><b/>
                    <input type="email" onChange={(e) => { setMailID(e.target.value) }} name="mailID" placeholder="mailID" required  />
                    <label htmlFor='city'>City</label><b/>
                    <input type="text" onChange={(e) => { setCity(e.target.value) }} name="city" placeholder="city" required  />
                    <label htmlFor="diagnosisCenter">Diagnosis Center</label><b/>
                        <select name="diagnosisCenter" value={diagnosisCenter} onChange={(e) => { setDiagnosisCenter(e.target.value) }} required>
                            <option value="available"  >Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    <label htmlFor="bloodbanks">Bloodbanks</label><b/>
                        <select name="bloodbanks" value={bloodBanks} onChange={(e) => { setBloodBanks(e.target.value) }} required>
                            <option value="available"  >Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    <label htmlFor="organDonation">Organ Donation</label><b/>
                        <select name="organDonation" value={organDonation} onChange={(e) => { setOrganDonation(e.target.value) }} required>
                            <option value="available"  >Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    <input type="submit" onClick={submithospRegister} />
                </form>
                <br />
                <p>OR</p>
                <br />

                <Link to="/login">login </Link>
            </div>
        </div>
    )
}

export default HospitalRegister