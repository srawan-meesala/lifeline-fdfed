import React from 'react'

function Navbar({title}) {
  return (
    <div className='Navbar-whole'>
      <div className='Navbar-left-side'>
        <div className='Navbar-logo'>Lifeline<span className='Navbar-logo-span'>.</span>&nbsp;<span className='Navbar-logo-title'>{title}</span></div>
      </div>
      <div className='Navbar-right-side'>
        <ul>
        <li><a href='/Home'>Home</a></li>
        <li><a href='/UserProfile'>Dashboard</a></li>
        <li><a href='/Blogs'>Blogs</a></li>
        <li><a href='/AboutUs'>About us</a></li>
        <li><a href='/Logout'>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar