import React, { useEffect,useState } from 'react'

const UserAppointments = ({ userDetails, appointments }) => {

    const [appointmentsPresent, setAppointmentsPresent] = useState(appointments)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        filterAppointments();
    }, [filter]);

    const filterAppointments = () => {
        switch (filter) {
            case 'All':
                setAppointmentsPresent(appointments);
                break;
            case 'lastWeek':
            const lastWeekAppointments = appointments.filter(appointment => {
                const appointmentDate = new Date(appointment.Date);
                const today = new Date();
                const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
                return appointmentDate >= lastWeek;
            });
            setAppointmentsPresent(lastWeekAppointments);
            break;
            case 'lastMonth':
                const lastMonthAppointments = appointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.Date);
                    const today = new Date();
                    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                    return appointmentDate >= lastMonth;
                });
                setAppointmentsPresent(lastMonthAppointments);
                break;
            default:
                setAppointmentsPresent(appointments);
                break;
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
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
                <div className="UserProfile-appointments-title">
                    <select name="filter" onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
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