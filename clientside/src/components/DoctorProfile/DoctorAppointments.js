import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DoctorAppointments = ({userDetails}) => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/AppointmentssAPI/${userDetails.docID}`);
            setAppointments(Array.isArray(response.data) ? response.data : []);
          } catch (error) {
            console.error('Error fetching blogs:', error);
          }
        };
    
        fetchAppointments();
      }, [userDetails.docID]);

      const ConvertDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
      };

    return (
        <div className='UserProfile-right'>
            <div className='UserProfile-top'>
            <div className='HospitalProfile-dashboard'>
                <div>Welcome, <span>{userDetails.name}</span></div>
            </div>
            </div>
            <div className='UserProfile-appointments'>
                <div className="UserProfile-appointments-title">Your Appointments</div>
                <div className="UserProfile-appointments-cards">
                    
                    {appointments.length === 0 ? (
                        <p>No Appointments Found.</p>
                    ) : (
                        appointments.map((appointment) => (
                            <div className="UserProfile-appointments-card">
                                <div key={appointment.appointmentID} className='UserProfile-appointments-card'>
                                    <div className='UserProfile-appointments-card-name'>
                                        Patient Name: <span>{appointment.PatientName}</span>
                                    </div>
                                    <div className='UserProfile-appointments-card-name'>
                                        Published Date: <span>{ConvertDate(appointment.createdAt)}</span>
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

export default DoctorAppointments