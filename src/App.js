import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import UserProfile from './pages/UserProfile';
import './styles/Style.css';
import Blogs from './pages/Blogs';
import PatientRegister from './pages/PatientRegister';
import Login from './pages/Login';
import DocRegister from './pages/DocRegister';

function App() {
  return (
    <div className='app'>
       <Router>
        <Routes>
          <Route path="/" element={<Blogs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/patientRegister" element={<PatientRegister/>}/>
          <Route path="/docRegister" element={<DocRegister/>}/>
          <Route path="/userProfile/:username" element={<UserProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;