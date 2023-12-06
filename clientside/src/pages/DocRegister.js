import React, { useState } from "react"
import axios from "axios"
import {  Link } from "react-router-dom"
import { ReactComponent as Logo } from '../images/undraw_remotely_2j6y.svg';


function DocRegister() {
    const [name,setName] = useState('')
    const [mobileNumber,setMobileNumber] = useState('')
    const [mailID,setMailID] = useState('')
    const [hospName,setHospName] = useState('available')
    const [specialization,setSpecialization] = useState('')
    const [fee,setFee] = useState('')
    const [verificationToken,setVerificationToken] = useState('')

    async function submitDocRegister(e) {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/docRegister', {
            name, mobileNumber, mailID, hospName, specialization,fee
          });
          if (response.data === 'exist') {
            alert('Doctor already registered');
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
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Doctor Registration</span></div>
                <Logo className="PatientLogin-image"/>
            </div>
            <div className="PatientLogin-right">
              <div className="PatientRegister-right-content">
                <form method="POST" action="/docRegister"  className="DocRegister-form">
                  <div className="PatientRegister-form-input">
                    <label >Name</label><b/>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} name="Name" placeholder="Name" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label >Mobile Number</label><b/>
                    <input type="number" onChange={(e) => { setMobileNumber(e.target.value) }} name="mobileNumber" placeholder="Mobile Number" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label >Email ID</label><b/>
                    <input type="email" onChange={(e) => { setMailID(e.target.value) }} name="Email ID" placeholder="mailID" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label htmlFor="hospName">Hospital</label><b/>
                    <select name="hospName" value={hospName} onChange={(e) => { setHospName(e.target.value) }} required>
                        <option value="available"  >Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div className="PatientRegister-form-input">
                    <label >Specialization</label><b/>
                    <input type="text" onChange={(e) => { setSpecialization(e.target.value) }} name="specialization" placeholder="Specialization" required  />
                  </div>
                  <div className="PatientRegister-form-input">
                    <label >Appointment Fee</label><b/>
                    <input type="text" onChange={(e) => { setFee(e.target.value) }} name="fee" placeholder="Appointment Fee" required  />
                  </div>
                  <div className="PatientRegister-form-submit">
                    <input type="submit" onClick={submitDocRegister} className='PatientRegister-form-btn'/>
                  </div>
                </form>
                <div className="HospRegister-links">
                  <div className="Patientregister-link">
                    Already a member?&nbsp;<Link to="/login">Login Here</Link>
                  </div>
                  <div className="Patientregister-link">
                    Here as a Hospital?&nbsp;<Link to='/hospRegister'>Register as Hospital</Link>
                  </div>
                  <div className="Patientregister-link">
                    Here as a Patient?&nbsp;<Link to='/patientRegister'>Register as Patient</Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default DocRegister