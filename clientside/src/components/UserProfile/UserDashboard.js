import React from 'react'
import { BiRupee } from "react-icons/bi";

const UserDashboard = ({ userDetails, appointmentsLength, appointments, totalExpenditure }) => {
  var appointmentsThree = []
  if (appointmentsLength >= 3) {
    appointmentsThree = appointments.slice(appointmentsLength - 3, appointmentsLength)
  } else {
    appointmentsThree = appointments.slice(0, 3)
  }
  return (
    <div className='UserProfile-right'>
      <div className='UserProfile-top'>
        <div className='UserProfile-dashboard'>
          <div>Welcome, <span>{userDetails.firstName}</span></div>
        </div>
      </div>
      <div className='UserProfile-cards'>
        <div className='UserProfile-card-1'>
          <div className='UserProfile-card-1-int-div'>
            <div className='UserProfile-card-1-int-div-head'>Total number of Appointments:</div>
            <div className='UserProfile-card-1-int-div-body'>{appointmentsLength}</div>
          </div>
        </div>
        <div className='UserProfile-card-2'>
          <div className='UserProfile-card-2-int-div'>
            <div className='UserProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
            <div className='UserProfile-card-1-int-div-body'>{appointmentsLength}</div>
          </div>
        </div>
        <div className='UserProfile-card-3'>
          <div className='UserProfile-card-3-int-div'>
            <div className='UserProfile-card-1-int-div-head'>Total number of Doctors consulted:</div>
            <div className='UserProfile-card-1-int-div-body'>2</div>
          </div>
        </div>
        <div className='UserProfile-card-4'>
          <div className='UserProfile-card-4-int-div'>
            <div className='UserProfile-card-1-int-div-head'>Total number of medicines ordered:</div>
            <div className='UserProfile-card-1-int-div-body'>-</div>
          </div>
        </div>
      </div>
      <div className='UserProfile-bottom-right'>
        <div className='UserProfile-booked-appointments'>
          <div className='UserProfile-booked-appointments-int-div'>
            <div className='UserProfile-booked-appointments-int-div-head'><span className='UserProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='UserProfile-booked-appointments-int-div-head-bottom'>Your recent appointments</span></div>
            <div className='UserProfile-booked-appointments-int-div-body'>
              {appointmentsLength === 0 ? (
                <div className='UserProfile-booked-appointments-int-div-body-part'>
                  <p>No Recent Appointments</p>
                </div>
              ) : (
                appointmentsThree.map((a) => (
                  <div key={a.appointmentID} className='UserProfile-booked-appointments-int-div-body-part'>
                    <div className='UserProfile-booked-appointments-int-div-body-date'>{a.Date}</div>
                    <div className='UserProfile-booked-appointments-int-div-body-time'>{a.Timeslot}</div>
                    <div className='UserProfile-booked-appointments-int-div-body-Doctor'>Dr {a.docName}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className='UserProfile-remaining'>
          <div className='UserProfile-part-1'>
            <div className='UserProfile-part-1-int-div'>
              <div className="UserProfile-part-1-int-div-head">Total Expenditure:</div>
              <div className="UserProfile-part-1-int-div-body"><div className='UserProfile-part-1-int-div-body-icon'><BiRupee /></div><span>{totalExpenditure}</span></div>
            </div>
          </div>
          <div className='DoctorProfile-part-2'>
            <div className='DoctorProfile-part-2-int-div'>
              <div className="DoctorProfile-part-1-int-div-head">You are in Lifeline from:</div>
              <div className="DoctorProfile-part-1-int-div-body"><div className='UserProfile-part-1-int-div-body-icon'></div><span>2024</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard