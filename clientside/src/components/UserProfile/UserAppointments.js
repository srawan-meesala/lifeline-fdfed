import React, { useEffect, useState } from 'react';

const UserAppointments = ({ userDetails, appointments }) => {
    const [appointmentsPresent, setAppointmentsPresent] = useState(appointments);
    const [filter, setFilter] = useState('All');
    const [pastFilter, setPastFilter] = useState('All');

    useEffect(() => {
        filterAppointments();
    }, [filter, pastFilter, appointments]);

    const filterAppointments = () => {
        const today = new Date();
        switch (filter) {   
            case 'All':
                setAppointmentsPresent(appointments);
                break;
            case 'Past':
                const pastAppointments = appointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.Date);
                    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                    return (pastFilter === 'All' && appointmentDate < today) || (pastFilter === 'PastMonth' && appointmentDate >= oneMonthAgo && appointmentDate < today) || (pastFilter === 'PastWeek' && appointmentDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) && appointmentDate < today);
                });
                setAppointmentsPresent(pastAppointments);
                break;
            case 'Future':
                const futureAppointments = appointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.Date);
                    return appointmentDate >= today;
                });
                setAppointmentsPresent(futureAppointments);
                break;
            default:
                setAppointmentsPresent(appointments);
                break;
        }
    };

    const handleFilterChange = e => {
        setFilter(e.target.value);
    };

    const handlePastFilterChange = e => {
        setPastFilter(e.target.value);
    };

    return (
        <div className="UserProfile-right">
            <div className="UserProfile-top">
                <div className="HospitalProfile-dashboard">
                    <div>
                        Welcome, <span>{userDetails.name}</span>
                    </div>
                </div>
            </div>
            <div className="UserProfile-appointments">
                <div className="UserProfile-appointments-title">Your Appointments</div>
                <div className="UserProfile-appointments-title">
                    <select name="filter" onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="Past">Past</option>
                        <option value="Future">Upcoming</option>
                    </select>
                    {filter === 'Past' && (
                        <select name="pastFilter" onChange={handlePastFilterChange}>
                            <option value="All">All</option>
                            <option value="PastMonth">Past Month</option>
                            <option value="PastWeek">Past Week</option>
                        </select>
                    )}
                </div>
                <div className="UserProfile-appointments-cards">
                    {appointmentsPresent.length === 0 ? (
                        <p>No Appointments Found.</p>
                    ) : (
                        appointmentsPresent.map(appointment => (
                            <div key={appointment.appointmentID} className="UserProfile-appointments-card">
                                <div className="UserProfile-appointments-card">
                                    <div className="UserProfile-appointments-card-name">
                                        Doctor Name: <span>{appointment.docName}</span>
                                    </div>
                                    <div className="UserProfile-appointments-card-name">
                                        Date: <span>{appointment.Date}</span>
                                    </div>
                                    <div className="UserProfile-appointments-card-name">
                                        Timeslot: <span>{appointment.Timeslot}</span>
                                    </div>
                                    <div className="UserProfile-appointments-card-name">
                                        Appointment Fees: <span>{appointment.Fee}</span>
                                    </div>
                                    <div className="UserProfile-appointments-card-name">
                                        Hospital Name: <span>{appointment.hospName}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAppointments;