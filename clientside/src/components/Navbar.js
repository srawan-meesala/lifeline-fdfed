import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar({ title }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('username');
    Cookies.remove('type');
    Cookies.remove('loggedIn');
    navigate('/');
  };

  return (
    <div className='Navbar-whole'>
      <div className='Navbar-left-side'>
        <div className='Navbar-logo'>Lifeline<span className='Navbar-logo-span'>.</span>&nbsp;<span className='Navbar-logo-title'>{title}</span></div>
      </div>
      <div className='Navbar-right-side'>
        <ul>
          <li><Link to={`/home`}>Home</Link></li>
          <li><Link to={`/userProfile`}>Dashboard</Link></li>
          <li><Link to='/blogs'>Blogs</Link></li>
          <li><Link to='/about'>About us</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar