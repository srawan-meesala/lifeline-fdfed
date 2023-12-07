import React, { useState ,useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import axios from 'axios';
const HospitalRegistration = ({ onClose }) => {
    const [hospName, setHospName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mailID, setMailID] = useState('');
    const [city, setCity] = useState('');
    const [diagnosisCenter, setDiagnosisCenter] = useState('available');
    const [bloodBanks, setBloodBanks] = useState('available');
    const [organDonation, setOrganDonation] = useState('available');


    async function submithospRegister(e) {
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
      

    </div>
  );
};

export default HospitalRegistration;
