import React from 'react'
import { BiRupee } from "react-icons/bi";

const DoctorDashboard = ({ userDetails, appointmentsLength, blogsLength, appointments }) => {
  let patients = []
  for (let i=0; i<appointments.length;i++) {
    patients.push(appointments[i].Username)
  }

  let patientsSet = new Set(patients)
  let patientsArray = Array.from(patientsSet)
  
  var appointmentsThree = []
  if (appointmentsLength >=3) {
    appointmentsThree = appointments.slice(appointmentsLength-3, appointmentsLength)
  } else {
    appointmentsThree = appointments.slice(0, 3)
  }
  return (
    <div className='DoctorProfile-right'>
        <div className='DoctorProfile-top'>
          <div className='DoctorProfile-dashboard'>
            <div>Welcome, <span>{userDetails.name}</span></div>
          </div>
          <div className='DoctorProfile-user-logo'>
            <div className='DoctorProfile-user-logo-pic'></div>
            <div></div>
          </div>
        </div>
        <div className='DoctorProfile-cards'>
          <div className='DoctorProfile-card-1'>
            <div className='DoctorProfile-card-1-int-div'>
              <div className='DoctorProfile-card-1-int-div-head'>Total number of Appointments:</div>
              <div className='DoctorProfile-card-1-int-div-body'>{appointmentsLength}</div>
            </div>
          </div>
          <div className='DoctorProfile-card-2'>
            <div className='DoctorProfile-card-2-int-div'>
              <div className='DoctorProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
              <div className='DoctorProfile-card-1-int-div-body'>{appointmentsLength}</div>
            </div>
          </div>
          <div className='DoctorProfile-card-3'>
            <div className='DoctorProfile-card-3-int-div'>
              <div className='DoctorProfile-card-1-int-div-head'>Total Number of Blogs Uploaded:</div>
              <div className='DoctorProfile-card-1-int-div-body'>{blogsLength}</div>
            </div>
          </div>
          <div className='DoctorProfile-card-4'>
            <div className='DoctorProfile-card-4-int-div'>
              <div className='DoctorProfile-card-1-int-div-head'>Total Number of Patients:</div>
              <div className='DoctorProfile-card-1-int-div-body'>{patientsArray.length}</div>
            </div>
          </div>
        </div>
        <div className='DoctorProfile-bottom-right'>
          <div className='DoctorProfile-booked-appointments'>
            <div className='DoctorProfile-booked-appointments-int-div'>
              <div className='DoctorProfile-booked-appointments-int-div-head'><span className='DoctorProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='DoctorProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
              <div className='DoctorProfile-booked-appointments-int-div-body'>
                {appointmentsLength===0 ? (
                  <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                    <p>No Recent Appointments</p>
                  </div>
                ) : (
                  appointmentsThree.map((a) => (
                    <div key={a.appointmentID} className='DoctorProfile-booked-appointments-int-div-body-part'>
                      <div className='DoctorProfile-booked-appointments-int-div-body-date'>{a.Date}</div>
                      <div className='DoctorProfile-booked-appointments-int-div-body-time'>{a.Timeslot}</div>
                      <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>{a.PatientName}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
              <div className='DoctorProfile-remaining'>
                  <div className='DoctorProfile-part-1'>
                    <div className='DoctorProfile-part-1-int-div'>
                      <div className="DoctorProfile-part-1-int-div-head">Total Income:</div>
                      <div className="DoctorProfile-part-1-int-div-body"><div className='DoctorProfile-part-1-int-div-body-icon'><BiRupee/></div><span>{appointmentsLength * userDetails.fee}</span></div>
                    </div>
                  </div> 
                  <div className='DoctorProfile-part-2'>
                    <div className='DoctorProfile-part-2-int-div'>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default DoctorDashboard