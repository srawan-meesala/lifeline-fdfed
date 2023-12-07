import React from 'react'

const HospitalAppointments = ({userDetails, appointments}) => {
  return (
    <div className='UserProfile-right'>
        <div className='UserProfile-top'>
          <div className='HospitalProfile-dashboard'>
            <div>Welcome, <span>{userDetails.hospName}</span></div>
          </div>
        </div>
        <div className='UserProfile-appointments'>
            <div className="UserProfile-appointments-title">Your Appointments</div>
            <div className="UserProfile-appointments-cards">

            {appointments.length === 0 ? (
                <p>No Appointments Found.</p>
            ) : (
                appointments.map((appointment) => (
                    <div key={appointment.appointmentID} className="UserProfile-appointments-card">
                        <div className='UserProfile-appointments-card'>
                            <div className="UserProfile-appointments-card-name">
                                Doctor Name: <span>Dr. {appointment.docName}</span>
                            </div>
                            <div className='UserProfile-appointments-card-name'>
                                Patient Name: <span>{appointment.PatientName}</span>
                            </div>
                            <div className='UserProfile-appointments-card-name'>
                                Date: <span>{(appointment.Date)}</span>
                            </div>
                            <div className='UserProfile-appointments-card-name'>
                                Timeslot: <span>{(appointment.Timeslot)}</span>
                            </div>
                            <div className="UserProfile-appointments-card-name">
                                Appointment Fees: <span>Rs. {appointment.Fee}</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
            
            </div>
        </div>
    </div>
  )
}

export default HospitalAppointments