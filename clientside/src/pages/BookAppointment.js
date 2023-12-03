import React, { useState } from 'react'
import Navbar from '../components/Navbar'


function BookAppointment() {
    const [patientName,setPatientName] = useState('')
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [mobileNumber,setMobileNumber] = useState('')
    const [note,setNote] = useState('')

    async function BookAppointment(){
        
    }


   return (
    <div className='BookAppointment-whole'>
    <Navbar/>
    <div className='BokkAppointment-Headline'>Book Your Appointment</div>
        <div className='BookAppointment-form-div'>
            <form className='BookAppointment-form'>
                <div className='BookAppointment-form-main'>
                <label className='BookAppointment-label'>Patient Name</label>
                <input type='text' className='BookAppointment-input-name' placeholder='Patient Name' onChange={(e)=>setPatientName(e.target.value)} required />
                <label className='BookAppointment-label' >Date</label>
                <input type='date' className='BookAppointment-input-date' onChange={(e)=>setDate(e.target.value)} required />
                <label className='BookAppointment-label'>Time</label>
                <select name='time'value={time} onChange={(e)=>setTime(e.target.value)} required className='BookAppointment-select'>
                    <option selected>10AM-11AM</option>
                    <option>11AM-12PM</option>
                    <option>1PM-2PM</option>
                    <option>2AM-3PM</option>
                    <option>3PM-4PM</option>
                </select>
                <label className='BookAppointment-label'> Mobile Number</label>
                <input type='tel' name='mobileNumber' className='BookAppointment-input-mobileNumber' onChange={(e)=>setMobileNumber(e.target.value)} required/>
                <label className='BookAppointment-label'>Note</label>
                <textarea placeholder='something you want to say to the Doctor' className='BookAppointment-textarea' onChange={(e)=>{setNote(e.target.value)}}></textarea>
                <div className='BookAppointment-Cost'><p>Doctor fee:<span>&nbsp;400</span></p><p>Online Charges:&nbsp;10%</p><p>Total Amount to be paid:<span>&nbsp;440</span></p></div>
                </div>
                <div className='BookAppointment-button-div'><button className='BookAppointment-button'>Book Appointment</button></div>
            </form>
        </div>
    </div>
  )
}

export default BookAppointment