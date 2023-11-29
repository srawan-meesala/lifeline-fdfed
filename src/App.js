// import { Router } from 'express';
import './App.css';
import React from 'react'
import './styles/Style.css';
import LandingRoutes from './Routes/LandingRoutes';
import ProfileRoutes from './Routes/ProfileRoutes';

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