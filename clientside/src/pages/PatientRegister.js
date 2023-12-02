import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/undraw_remotely_2j6y.svg';

function PatientRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mailID, setMailID] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [gender, setGender] = useState('');
  const [verificationToken, setVerificationToken] = useState('');

  async function submitRegister(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/patientRegister', {
        firstName, lastName, mobileNumber, mailID, dob, occupation, bloodGroup, maritalStatus, gender,verificationToken
      });

      if (response.data === 'exist') {
        alert('User already registered');
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
                <form method="POST" action="/patientRegister"  className="patient-register-form">
                    <label >First Name</label><b/>
                    <input type="text" onChange={(e) => { setFirstName(e.target.value) }} name="firstName" placeholder="First Name" required  />
                    <label >Last Name</label><b/>
                    <input type="text" onChange={(e) => { setLastName(e.target.value) }} name="lastName" placeholder="Last Name" required  />
                    <label >Mobile Number</label><b/>
                    <input type="number" onChange={(e) => { setMobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  />
                    <label >Email ID</label><b/>
                    <input type="email" onChange={(e) => { setMailID(e.target.value) }} name="mailID" placeholder="mailID" required  />
                    <label >Date of Birth</label><b/>
                    <input type="date" onChange={(e) => { setDob(e.target.value) }} name="dob" required  />
                    <label >Occupation</label><b/>
                    <input type="text" onChange={(e) => { setOccupation(e.target.value) }} name="occupation" placeholder="occupation" required  />
                    <label >Blood Group</label><b/>
                    <input type="text" onChange={(e) => { setBloodGroup(e.target.value) }} name="bloodGroup" placeholder="bloodGroup" required  />
                    <label >Marital Status</label><b/>
                    <input type="text" onChange={(e) => { setMaritalStatus(e.target.value) }} name="maritalStatus" placeholder="maritalStatus" required  />
                    <label >Gender</label><b/>
                    <input type="text" onChange={(e) => { setGender(e.target.value) }} name="gender" placeholder="gender" required  />
                    <input type="submit" onClick={submitRegister} />
                </form>
                <br />
                <p>OR</p>
                <br />

                <Link to="/login">login </Link>
            </div>
        </div>
    )
}

export default PatientRegister