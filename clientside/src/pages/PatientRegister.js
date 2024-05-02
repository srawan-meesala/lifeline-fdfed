import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/undraw_remotely_2j6y.svg';

function PatientRegister() {
  const navigate = useNavigate();
  const mobileRegex = /^\d{10}$/;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mailID, setMailID] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [maritalStatus, setMaritalStatus] = useState('married');
  const [gender, setGender] = useState('male');
  const [verificationToken, setVerificationToken] = useState('');
  const [error, setError] = useState('');

  async function submitRegister(e) {
    e.preventDefault();
    setError('');
    const currentDate = new Date();
    const enteredDate = new Date(dob);
    const minAgeDate = new Date(currentDate.getFullYear() - 12, currentDate.getMonth(), currentDate.getDate());

    if (isNaN(enteredDate.getTime()) || enteredDate >= currentDate || enteredDate > minAgeDate) {
      setError("Please enter a valid Date of Birth. Minimum age must be 12 years.");
      return;
    }

    if (!mobileRegex.test(mobileNumber)) {
      setError("Invalid Mobile number!!");
      return;
    }

    try {
      const patientData = {
        firstName,
        lastName,
        mobileNumber,
        mailID,
        dob,
        occupation,
        bloodGroup,
        maritalStatus,
        gender
      }
      console.log(patientData);
      const response = await axios.post('https://lifeline-fdfed-api.onrender.com/patientRegister', patientData)
      if (response.data === 'exist') {
        setError('User already registered');
      } else {
        navigate('/sent');
        setVerificationToken(response.data.verificationToken);
      }
    } catch (error) {
      setError('Wrong details');
      console.error(error);
    }
  }

  return (
    <div className="PatientLogin-whole">
      <div className="PatientLogin-left">
        <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Patient Registration</span></div>
        <Logo className="PatientLogin-image" />
      </div>
      <div className="PatientLogin-right">
        <div className="PatientRegister-right-content">
          <form method="POST" action='/patientRegister' className="PatientRegister-form" onSubmit={submitRegister}>
            <div className="PatientRegister-form-input">
              <label>First Name</label><b />
              <input type="text" onChange={(e) => { setFirstName(e.target.value) }} name="firstName" placeholder="First Name" required />
            </div>
            <div className="PatientRegister-form-input">
              <label>Last Name</label><b />
              <input type="text" onChange={(e) => { setLastName(e.target.value) }} name="lastName" placeholder="Last Name" required />
            </div>
            <div className="PatientRegister-form-input">
              <label>Mobile Number</label><b />
              <input type="number" onChange={(e) => { setMobileNumber(e.target.value) }} name="mobileNumber" placeholder="Mobile Number" required />
            </div>
            <div className="PatientRegister-form-input">
              <label>Email ID</label><b />
              <input type="email" onChange={(e) => { setMailID(e.target.value) }} name="mailID" placeholder="Email ID" required />
            </div>
            <div className="PatientRegister-form-input">
              <label>Date of Birth</label><b />
              <input type="date" onChange={(e) => { setDob(e.target.value) }} name="dob" required />
            </div>
            <div className="PatientRegister-form-input">
              <label>Occupation</label><b />
              <input type="text" onChange={(e) => { setOccupation(e.target.value) }} name="occupation" placeholder="Occupation" required />
            </div>
            <div className="PatientRegister-form-input">
              <label>Blood Group</label><b />
              <select value={bloodGroup} onChange={(e) => { setBloodGroup(e.target.value) }} name="bloodGroup" required >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="PatientRegister-form-input">
              <label>Marital Status</label><b />
              <select value={maritalStatus} onChange={(e) => { setMaritalStatus(e.target.value) }} name="maritalStatus" required>
                <option value='married'>Married</option>
                <option value='unmarried'>Unmarried</option>
              </select>
            </div>
            <div className="PatientRegister-form-input">
              <label>Gender</label><b />
              <select value={gender} onChange={(e) => { setGender(e.target.value) }} name="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="PatientRegister-form-submit">
              <input type="submit" className='PatientRegister-form-btn' />
            </div>
          </form>
          {error && <div className="error">{error}</div>}
          <div className="Patientregister-links">
            <div className="Patientregister-link">
              Already a member?&nbsp;<Link to="/login">Login Here</Link>
            </div>
            <div className="Patientregister-link">
              Here as a Hospital?&nbsp;<Link to='/hospRegister'>Register as Hospital</Link>
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

export default PatientRegister;