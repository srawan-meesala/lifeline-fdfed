import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import AboutUs from '../pages/AboutUs';
import PatientRegister from '../pages/PatientRegister';
import Blogs from '../pages/Blogs';

const LandingRoutes = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/patientRegister" element={<PatientRegister/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        </Routes>
    </Router>
  )
}

export default LandingRoutes