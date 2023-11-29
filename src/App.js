// import { Router } from 'express';
import './App.css';
import {BrowserRouter as Routes,  Route, Router } from 'react-router-dom';
import React from 'react'
import './styles/Style.css';
import Blogs from './pages/Blogs';
import PatientRegister from './pages/PatientRegister';
import Login from './pages/Login';
import BlogOpen from './functions/BlogOpen';
import BlogComplete from './components/BlogComplete';
import BookAppointment from './components/BookAppointment';
import LandingRoutes from './Routes/LandingRoutes';
import ProfileRoutes from './Routes/ProfileRoutes';
import UserProfile from './pages/UserProfile';

// const Router = express.Router();

function App() {
  return (
    <div className='app'>
      <LandingRoutes />
      <ProfileRoutes />
    </div>
  );
}

export default App;