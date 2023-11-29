import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from '../pages/UserProfile';

const LandingRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/userProfile/:username" element={<UserProfile/>}/>
        </Routes>
    </Router>
  )
}

export default LandingRoutes