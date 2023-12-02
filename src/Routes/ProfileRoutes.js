import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from '../pages/UserProfile';
import BookedAppointments from '../components/BookedAppointments';
import BlogForm from '../pages/BlogForm';
import BookAppointment from '../pages/BookAppointment';
import ShowDoctors from '../pages/ShowDoctors';
import EachDoctor from '../components/EachDoctor';

const LandingRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/bookedappointments" element={<BookedAppointments/>}/>
        </Routes>
    </Router>
  )
}

export default LandingRoutes