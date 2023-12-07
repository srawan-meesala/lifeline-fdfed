import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/undraw_remotely_2j6y.svg';

function HospitalRegister() {
  const navigate = useNavigate()
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
        navigate('/sent')
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
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Hospital Registration</span></div>
                <Logo className="PatientLogin-image"/>
            </div>
            <div className="PatientLogin-right">
              <div className="PatientRegister-right-content">
                <form method="POST" action="/hospRegister"  className="HospRegister-form">
                  <div className="PatientRegister-form-input">
                    <label htmlFor='hospName'>Hospital Name</label><b/>
                    <input type="text" onChange={(e) => { setHospName(e.target.value) }} name="hospName" placeholder="Hospital Name" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor='mobileNumber'>Mobile Number</label><b/>
                    <input type="number" onChange={(e) => { setMobileNumber(e.target.value) }} name="mobileNumber" placeholder="Mobile Number" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor='mailID'>Email ID</label><b/>
                    <input type="email" onChange={(e) => { setMailID(e.target.value) }} name="mailID" placeholder="Email ID" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor='city'>City</label><b/>
                    <input type="text" onChange={(e) => { setCity(e.target.value) }} name="city" placeholder="City" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor="diagnosisCenter">Diagnosis Center</label><b/>
                    <select name="diagnosisCenter" value={diagnosisCenter} onChange={(e) => { setDiagnosisCenter(e.target.value) }} required>
                        <option value="available"  >Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor="bloodbanks">Bloodbanks</label><b/>
                    <select name="bloodbanks" value={bloodBanks} onChange={(e) => { setBloodBanks(e.target.value) }} required>
                        <option value="available"  >Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor="organDonation">Organ Donation</label><b/>
                    <select name="organDonation" value={organDonation} onChange={(e) => { setOrganDonation(e.target.value) }} required>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div className="PatientRegister-form-submit">
                    <input type="submit" onClick={submithospRegister} className='PatientRegister-form-btn'/>
                  </div>
                </form>

                <div className="HospRegister-links">
                  <div className="Patientregister-link">
                    Already a member?&nbsp;<Link to="/login">Login Here</Link>
                  </div>
                  <div className="Patientregister-link">
                    Here as a Patient?&nbsp;<Link to='/patientRegister'>Register as Patient</Link>
                  </div>
                  <div className="Patientregister-link">
                    Here as a Doctor?&nbsp;<Link to='/docRegister'>Register as Doctor</Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default HospitalRegister