import React from 'react';
import { MdCall } from 'react-icons/md';
import Diamond from '../images/6.png';
import {useNavigate} from 'react-router-dom'

function EachDoctor({ name, mobileNumber, hospName, specialization, fee, city,docID }) {
  const navigate = useNavigate();
  
  const handleBookAppointment = () =>{
    navigate(`/BookAppointment/${docID}`,{state:{fee}})
  }

  return (
    <div className="panel-1">
      <div className="ShowDoctors-docimage">
        <img src={Diamond} alt="Doctor" />
      </div>
      <div className="body-panel">
        <div className="head-body">
          <p className="name-dr">Dr. {name}</p>
          <p className="name-hosp">{hospName}</p>
        </div>
        <div className="bio-body">
          <p className="spec">Specialized as <span>{specialization}</span></p>
          <p className="city">Practicing in <span>{city}</span></p>
          <p className="ll-exp">Appointment Fee - <span>Rs. {fee}</span></p>
        </div>
        <div className="contact-body">
          <button className="number-panel">
            <MdCall className='number-panel-icon-phone' /><p>{mobileNumber}</p>
          </button>
          <button className="appoint-panel" onClick={handleBookAppointment}> 
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachDoctor;
