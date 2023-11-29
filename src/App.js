// import { Router } from 'express';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import UserProfile from './pages/UserProfile';
import './styles/Style.css';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import PatientRegister from './pages/PatientRegister';
import Login from './pages/Login';
import Landing from './pages/Landing';

// const Router = express.Router();

function App() {
  return (
    <div className='app'>
       <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/patientRegister" element={<PatientRegister/>}/>
          <Route path="/userProfile/:username" element={<UserProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;