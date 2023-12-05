import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import AboutUs from '../pages/AboutUs';
import PatientRegister from '../pages/PatientRegister';
import PatientRegister2 from '../pages/PatientRegister2';
import EmailVerificationPatient from '../pages/EmailVerificationPatient';
import HospRegister from '../pages/HospRegister';
import HospRegister2 from '../pages/HospRegister2';
import EmailVerificationHosp from '../pages/EmailVerificationHosp';
import DocRegister from '../pages/DocRegister';
import EmailVerificationDoc from '../pages/EmailVerificationDoc';
import DocRegister2 from '../pages/DocRegister2'
import Blogs from '../pages/Blogs';
import BlogForm from '../pages/BlogForm';
import BookAppointment from '../pages/BookAppointment';
import ShowDoctors from '../pages/ShowDoctors';
import DoctorProfile from '../pages/DoctorProfile';
import PharmacyPage from '../pages/PharmacyPage';
import HospitalProfile from '../pages/HospitalProfile';

const LandingRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/patientRegister" element={<PatientRegister/>}/>
          <Route path="/verifypatient/:verificationToken" element={<EmailVerificationPatient/>}/>
          <Route path="/patientRegister2/:verificationToken" element={<PatientRegister2/>}/>
          <Route path="/hospRegister" element={<HospRegister/>}/>
          <Route path="/verifyhospital/:verificationToken" element={<EmailVerificationHosp/>}/>
          <Route path="/hospRegister2/:verificationToken" element={<HospRegister2/>}/>
          <Route path="/docRegister" element={<DocRegister/>}/>
          <Route path="/verifydoctor/:verificationToken" element={<EmailVerificationDoc/>}/>
          <Route path="/docRegister2/:verificationToken" element={<DocRegister2/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blogform" element={<BlogForm/>}/>
          <Route path="/BookAppointment" element={<BookAppointment/>}/>
          <Route path="/ShowDoctors" element={<ShowDoctors/>}/>
          <Route path='/docProfile' element={<DoctorProfile/>}/>
          <Route path='/pharmacy' element={<PharmacyPage/>}/>
          <Route path='/HospitalProfile' element={<HospitalProfile/>}/>
        </Routes>
    </Router>
  )
}

export default LandingRoutes