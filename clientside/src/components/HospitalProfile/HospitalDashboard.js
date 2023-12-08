import React from "react";
import { BiRupee } from "react-icons/bi";

const HospitalDashboard = ({userDetails, appointments, doctors}) => {
  let totalIncome = 0
  let patients = []

  for (let i=0; i<appointments.length;i++) {
    totalIncome += appointments[i].Fee
    patients.push(appointments[i].Username)
  }

  let patientsSet = new Set(patients)
  let patientsArray = Array.from(patientsSet)
  
  var appointmentsThree = []
  if (appointments.length >=3) {
    appointmentsThree = appointments.slice(appointments.length-3, appointments.length)
  } else {
    appointmentsThree = appointments.slice(0, 3)
  }

  return (
    <div className='HospitalProfile-right'>
        <div className='HospitalProfile-top'>
          <div className='HospitalProfile-dashboard'>
            <div>Welcome, <span>{userDetails.hospName}</span></div>
          </div>
          <div className='HospitalProfile-user-logo'>
            <div className='HospitalProfile-user-logo-pic'></div>
            <div></div>
          </div>
        </div>
        <div className='HospitalProfile-cards'>
          <div className='HospitalProfile-card-1'>
            <div className='HospitalProfile-card-1-int-div'>
              <div className='HospitalProfile-card-1-int-div-head'>Total Number of Appointments:</div>
              <div className='HospitalProfile-card-1-int-div-body'>{appointments.length}</div>
            </div>
          </div>
          <div className='HospitalProfile-card-2'>
            <div className='HospitalProfile-card-2-int-div'>
              <div className='HospitalProfile-card-1-int-div-head-black'>Total Number of Transactions:</div>
              <div className='HospitalProfile-card-1-int-div-body'>{appointments.length}</div>
            </div>
          </div>
          <div className='HospitalProfile-card-3'>
            <div className='HospitalProfile-card-3-int-div'>
              <div className='HospitalProfile-card-1-int-div-head'>Total Number of Doctors:</div>
              <div className='HospitalProfile-card-1-int-div-body'>{doctors.length}</div>
            </div>
          </div>
          <div className='HospitalProfile-card-4'>
            <div className='HospitalProfile-card-4-int-div'>
              <div className='HospitalProfile-card-1-int-div-head'>Total number of Patients:</div>
              <div className='HospitalProfile-card-1-int-div-body'>{patientsArray.length}</div>
            </div>
          </div>
        </div>
        <div className='HospitalProfile-bottom-right'>
          <div className='HospitalProfile-booked-appointments'>
            <div className='HospitalProfile-booked-appointments-int-div'>
              <div className='HospitalProfile-booked-appointments-int-div-head'><span className='HospitalProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='HospitalProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
              <div className='HospitalProfile-booked-appointments-int-div-body'>
                {appointments.length===0 ? (
                  <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                    <p>No Recent Appointments</p>
                  </div>
                ) : (
                  appointmentsThree.map((a) => (
                    <div key={a.appointmentID} className='DoctorProfile-booked-appointments-int-div-body-part'>
                      <div className='DoctorProfile-booked-appointments-int-div-body-date'>Dr. {a.docName}</div>
                      <div className='DoctorProfile-booked-appointments-int-div-body-date'>{a.Date}</div>
                      <div className='DoctorProfile-booked-appointments-int-div-body-time'>{a.Timeslot}</div>
                      <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>{a.PatientName}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
              <div className='HospitalProfile-remaining'>
                  <div className='HospitalProfile-part-1'>
                    <div className='HospitalProfile-part-1-int-div'>
                      <div className="HospitalProfile-part-1-int-div-head">Total Income:</div>
                      <div className="HospitalProfile-part-1-int-div-body"><div className='HospitalProfile-part-1-int-div-body-icon'><BiRupee/></div><span>{totalIncome}</span></div>
                    </div>
                  </div>
                  <div className='HospitalProfile-part-2'>
                    <div className='HospitalProfile-part-2-int-div'>
                    </div>
                  </div>
              </div>
        </div>
      </div>
  )
}

export default HospitalDashboard