import React from 'react'
import {Link} from 'react-router-dom'

function Navbar({title, username}) {
  return (
    <div className='Navbar-whole'>
      <div className='Navbar-left-side'>
        <div className='Navbar-logo'>Lifeline<span className='Navbar-logo-span'>.</span>&nbsp;<span className='Navbar-logo-title'>{title}</span></div>
      </div>
      <div className='Navbar-right-side'>
        <ul>
          <li><Link to={`/home/${username}`}>Home</Link></li>
          <li><Link to={`/userProfile/${username}`}>Dashboard</Link></li>
          <li><Link to='/blogs'>Blogs</Link></li>
          <li><Link to='/about'>About us</Link></li>
          <li><Link to='/'>Logout</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar