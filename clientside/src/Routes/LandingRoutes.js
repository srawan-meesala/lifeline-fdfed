import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import AboutUs from '../pages/AboutUs';
import DocRegister from '../pages/DocRegister'
import PatientRegister from '../pages/PatientRegister';
import PatientRegister2 from '../pages/PatientRegister2';
import Blogs from '../pages/Blogs';
import BlogForm from '../pages/BlogForm';
import EmailVerification from '../pages/EmailVerification';

const LandingRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/patientRegister" element={<PatientRegister/>}/>
          <Route path="/docRegister" element={<DocRegister/>}/>
          <Route path="/verify/:verificationToken" element={<EmailVerification/>}/>
          <Route path="/patientRegister2/:verificationToken" element={<PatientRegister2/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blogform" element={<BlogForm/>}/>
        </Routes>
    </Router>
  )
}

export default LandingRoutes