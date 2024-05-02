import React, { useState ,useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import axios from 'axios';
const DoctorRegistration = ({ onClose }) => {
  
  const [name,setName] = useState('')
  const [mobileNumber,setmobileNumber] = useState('')
  const [mailID,setmailID] = useState('')
  const [hospName,setHospName] = useState('')
  const [specialization,setSpecialization] = useState('')
  const [fee,setFee] = useState('')
 
  async function submit_register_doc(e) {
        e.preventDefault();
        alert('Registration successful!');
        onClose();    
    }



const handleSubmit = (e) => {
  e.preventDefault();

   onClose();
  };

  return (
    <div className="modal">
      <div className="Registration-close">
      <h2>Registration Form</h2> <div className="closeButton" onClick={onClose}><VscChromeClose /></div>
      </div><br /><hr style={{ borderColor: 'rgb(2, 119, 139)' }}/><br />
      <form onSubmit={handleSubmit}>
      <div className ="PatientRegister-form-input">
        <label >Name</label><b/>
        <input  type="text" onChange={(e) => { setName(e.target.value) }} name="Name" placeholder="Name" required  /><br/>
      </div>
      <div className ="PatientRegister-form-input">
      <label className="DoctorRegistration-label" >Mobile Number</label><b/>
        <input  type="number" onChange={(e) => { setmobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  /><br/>
       </div> 
       
       <div className ="PatientRegister-form-input"><label className="DoctorRegistration-label" >Email ID</label><b/>
        <input  type="email" onChange={(e) => { setmailID(e.target.value) }} name="mailID" placeholder="mailID" required  /><br/>
       </div>
       <div className ="PatientRegister-form-input"> <label className="DoctorRegistration-label" >Choose Hospital</label><b/>
        <input  type="text" onChange={(e) => { setHospName(e.target.value) }} name="hospital" placeholder="hospital"  required  /><br/>
        </div>
        <div className ="PatientRegister-form-input"><label className="DoctorRegistration-label" >Specialization</label><b/>
        <input  type="text" onChange={(e) => { setSpecialization(e.target.value) }} name="specialization" placeholder="Specialization" required  /><br/>
        </div>
        <div className ="PatientRegister-form-input"><label className="DoctorRegistration-label" >Appointment Fee</label><b/>
        <input  type="number" onChange={(e) => { setFee(e.target.value) }} name="fee" placeholder="Appointment Fee" required  /><br/>
        </div>
        <div className="DoctorRegistration-form-submit">
        <input type="submit" onClick={submit_register_doc} className='DoctorRegistration-form-btn'/>
        </div>
      </form>
      

    </div>
  );
};

export default DoctorRegistration;
