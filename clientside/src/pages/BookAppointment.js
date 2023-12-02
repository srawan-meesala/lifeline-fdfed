import React from 'react'
import Navbar from '../components/Navbar'

function BookAppointment() {
  return (
    <div className='BookAppointment-whole'>
    <Navbar/>
    <div className='BokkAppointment-Headline'>Book Your Appointment</div>
        <div className='BookAppointment-form-div'>
            <form className='BookAppointment-form'>
                <div className='BookAppointment-form-main'>
                <label className='BookAppointment-label'>Patient Name</label>
                <input type='text' className='BookAppointment-input-name' placeholder='Patient Name'></input>
                <label className='BookAppointment-label'>Hospital</label>
                <select name='type'>
                    <option selected>Hospital</option>
                    <option>Sunshine Hospitals</option>
                    <option>Ramesh Clinic</option>
                    <option>Andhra Saruku</option>
                    <option>Lokesh Hospitals</option>
                </select>
                <label className='BookAppointment-label'>Doctor</label>
                <select name='type'>
                    <option selected>Doctor </option>
                    <option>Ramesh</option>
                    <option>Rakesh</option>
                    <option>Krupesh</option>
                    <option>Suresh</option>
                </select>
                <label className='BookAppointment-label'>Date</label>
                <input type='date'></input>
                <label className='BookAppointment-label'>Time</label>
                <select name='type'>
                    <option selected>10AM-11AM</option>
                    <option>11AM-12PM</option>
                    <option>1PM-2PM</option>
                    <option>2AM-3PM</option>
                    <option>3PM-4PM</option>
                </select>
                <label className='BookAppointment-label'>Note</label>
                <textarea placeholder='something you want to say to the Doctor' className='BookAppointment-textarea'></textarea>
                </div>
                <div className='BookAppointment-button-div'><button className='BookAppointment-button'>Book Appointment</button></div>
            </form>
        </div>
    </div>
  )
}

export default BookAppointment