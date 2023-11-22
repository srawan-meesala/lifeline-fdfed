// import { Router } from 'express';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import UserProfile from './pages/UserProfile';
import './styles/Style.css';
import Blogs from './pages/Blogs';
import PatientRegister from './pages/PatientRegister';
import PatientLogin from './pages/PatientLogin';

// const Router = express.Router();

function App() {
  return (
    <div className='app'>
       <Router>
        <Routes>
          <Route path="/" element={<Blogs/>}/>
          <Route path="/patientLogin" element={<PatientLogin/>}/>
          <Route path="/patientRegister" element={<PatientRegister/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;