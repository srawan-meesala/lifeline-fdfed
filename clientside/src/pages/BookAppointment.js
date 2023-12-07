import React, { useState } from 'react'
import {useParams,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

function BookAppointment() {
  const {state} = useLocation()
  const fee = state ? state.fee : null
  const fees = parseInt((1.1)*fee)
  const navigate = useNavigate()
    const [patientName,setPatientName] = useState('')
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [mobileNumber,setMobileNumber] = useState('')
    const [note,setNote] = useState('')
    const {docID} = useParams()

    async function Appointment(e){
        e.preventDefault();

        try {
          const response = await axios.post('http://localhost:8000/bookAppointment', {
            docID,patientName, date, time, mobileNumber, note
          });
          if (response.data.status === 'created') {
            const username = response.data.username
            navigate(`/thankyou/${username}`)
          } else {
            alert('Error while Bookking Appointment');
          }
        } catch (error) {
          alert('Wrong details');
          console.error(error);
        }
    }

    const [appointments, setAppointments] = useState([])

    const dateChangeHandler = async (e) => {
      setDate(e.target.value)
      try{
        console.log(date);
        const response = await axios.get(`http://localhost:8000/AppointmentsAPI/dateanddocid`,{
          params: {docID, date}
        });
        if(response.status === 200){
          setAppointments(response.data)
          console.log('success');
        } else {
          console.error('Failed to fetch user details')
        }
      }
      catch(e) {
        console.log(e)
      }
    }

    console.log(appointments);
    var times = []
    for (let a in appointments) {
      times.push(a.Timeslot)
    }

    var timeslots = [
      '10AM-11AM',
      '11AM-12PM',
      '1PM-2PM',
      '2AM-3PM',
      '3PM-4PM',
    ]
    
    var timeslotsNew = timeslots.filter(n => !times.includes(n))
   return (
    <div className='BookAppointment-whole'>
    <Navbar/>
    <div className='BookAppointment-Headline'>Book Your Appointment</div>
        <div className='BookAppointment-form-div'>
            <form className='BookAppointment-form' action='/bookAppointment' method='POST' onSubmit={Appointment}>
                <div className='BookAppointment-form-main'>
                <label className='BookAppointment-label'>Patient Name</label>
                <input type='text' className='BookAppointment-input-name' placeholder='Patient Name' onChange={(e)=>setPatientName(e.target.value)} required />
                <label className='BookAppointment-label' >Date</label>
                <input type='date' className='BookAppointment-input-date' onChange={dateChangeHandler} required />
                <label className='BookAppointment-label'>Time</label>
                <select name='time' value={time} onChange={(e)=>setTime(e.target.value)} required className='BookAppointment-select'>
                  <option value=''>Select Timeslot</option>
                  {timeslotsNew.map((t, index)=>{
                    return <option key={index}>{t}</option>
                  })}
                </select>
                <label className='BookAppointment-label'> Mobile Number</label>
                <input type='tel' name='mobileNumber' className='BookAppointment-input-mobileNumber' onChange={(e)=>setMobileNumber(e.target.value)} required/>
                <label className='BookAppointment-label'>Note</label>
                <textarea placeholder='something you want to say to the Doctor' className='BookAppointment-textarea' onChange={(e)=>{setNote(e.target.value)}}></textarea>
                <div className='BookAppointment-Cost'><p>Doctor fee:<span>&nbsp;{fee}</span></p><p>Online Charges:&nbsp;10%</p><p>Total Amount to be paid:<span>&nbsp;{fees}</span></p></div>
                </div>
                <div className='BookAppointment-button-div'><button className='BookAppointment-button'>Book Appointment</button></div>
            </form>
        </div>
    </div>
  )
}

export default BookAppointment