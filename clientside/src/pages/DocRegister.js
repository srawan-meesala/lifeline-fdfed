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
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Registration</span></div>
                <Logo className="PatientLogin-image"/>
            </div>
            <div className="PatientLogin-right">
                <form method="POST" action="/docRegister"  className="patient-register-form">
                    <label >Name</label><b/>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} name="Name" placeholder="Name" required  />
                    <label >Mobile Number</label><b/>
                    <input type="number" onChange={(e) => { setMobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  />
                    <label >Email ID</label><b/>
                    <input type="email" onChange={(e) => { setMailID(e.target.value) }} name="mailID" placeholder="mailID" required  />
                    <label htmlFor="hospName">Hospital</label><b/>
                        <select name="hospName" value={hospName} onChange={(e) => { setHospName(e.target.value) }} required>
                            <option value="available"  >Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    <label >Specialization</label><b/>
                    <input type="text" onChange={(e) => { setSpecialization(e.target.value) }} name="specialization" placeholder="Specialization" required  />
                    <label >Appointment Fee</label><b/>
                    <input type="text" onChange={(e) => { setFee(e.target.value) }} name="fee" placeholder="fee" required  />
                    <input type="submit" onClick={submitDocRegister} />
                </form>
                <br />
                <p>OR</p>
                <br />
                <Link to="/login">login </Link>
            </div>
        </div>
    )
}

export default DocRegister