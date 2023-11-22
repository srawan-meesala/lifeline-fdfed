import { Router } from 'express';
import './App.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import UserProfile from './pages/UserProfile';
// import Blogs from './pages/Blogs';
import UserProfile from './pages/UserProfile';
// import BlogComplete from './components/BlogComplete'; 
import './styles/Style.css';
import { Route, Routes } from 'react-router-dom';
import Blogs from './pages/Blogs';
import PatientRegister from './pages/PatientRegister';
import PatientLogin from './pages/PatientLogin';

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
      <UserProfile/>
    </div>
  );
}

export default App;