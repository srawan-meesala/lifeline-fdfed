import React, { useState } from 'react'

const UserAppointments = ({ userDetails, appointments }) => {

    const [appointmentsPresent, setAppointmentsPresent] = useState(appointments)
    const [filter, setFilter] = useState('All')


    return (
        <div className='UserProfile-right'>
            <div className='UserProfile-top'>
                <div className='HospitalProfile-dashboard'>
                    <div>Welcome, <span>{userDetails.name}</span></div>
                </div>
            </div>
            <div className='UserProfile-appointments'>
                <div className="UserProfile-appointments-title">Your Appointments</div>
                <div className="UserProfile-appointments-title">
                    <select name="filter">
                        <option value="All">All</option>
                        <option value="last">Last Month</option>
                    </select>
                </div>
                <div className="UserProfile-appointments-cards">

                    {appointmentsPresent.length === 0 ? (
                        <p>No Appointments Found.</p>
                    ) : (
                        appointmentsPresent.map((appointment) => (
                            <div key={appointment.appointmentID} className="UserProfile-appointments-card">
                                <div className='UserProfile-appointments-card'>
                                    <div className='UserProfile-appointments-card-name'>
                                        Doctor Name: <span>{appointment.docName}</span>
                                    </div>
                                    <div className='UserProfile-appointments-card-name'>
                                        Date: <span>{(appointment.Date)}</span>
                                    </div>
                                    <div className='UserProfile-appointments-card-name'>
                                        Timeslot: <span>{(appointment.Timeslot)}</span>
                                    </div>
                                    <div className='UserProfile-appointments-card-name'>
                                        Appointment Fees: <span>{(appointment.Fee)}</span>
                                    </div>
                                    <div className='UserProfile-appointments-card-name'>
                                        Hospital Name: <span>{(appointment.hospName)}</span>
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

export default UserAppointments