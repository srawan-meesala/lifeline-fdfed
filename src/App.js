import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import Blogs from './pages/Blogs';
import PatientRegister from './pages/PatientRegister'
import PatientLogin from './pages/PatientLogin';
import BlogComplete from './components/BlogComplete';
import './styles/Style.css';

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