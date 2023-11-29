import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from '../pages/UserProfile';
import BookedAppointments from '../components/BookedAppointments';
import BlogForm from '../pages/BlogForm';

const LandingRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/bookedappointments" element={<BookedAppointments/>}/>
            <Route path="/blogform" element={<BlogForm/>}/>
        </Routes>
    </Router>
  )
}

export default LandingRoutes