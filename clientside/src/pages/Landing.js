import React from 'react'
import logo from '../images/logo.png'
import '../styles/Style.css'

const Landing = () => {
  return (
    <div className='Landing-body'>
        <div className="Landing-overlay">
            <div className="Landing-one"></div>
            <div className="Landing-two"></div>
        </div>
        <div className="Landing-containerr">
            <div className="Landing-header-1">
                <nav className='Landing-nav'>
                    <a href="/" className="Landing-logo-brand">Lifeline<span>.</span></a>
                    <ul>
                        <li><a href="/patientRegister" target="_self">Join Lifeline</a></li>
                        <li><a href="/login" target="_self">Login</a></li>
                        <li><a href="/">Contact Us</a></li>
                        <li><a href="/">About Us</a></li>
                    </ul>
                </nav>
            </div>
            <div className="Landing-container-1">
                <div className="Landing-c1">
                    <div className="Landing-c1-img">
                        <img src={logo} alt="home" />
                    </div>
                    <div className="Landing-c1-side">
                        <h4>Make your life <span>healthier</span> and <span>Safe </span> with</h4>
                        <h2>Lifeline.</h2>
                        <p>Best hospitals. Highly qualified doctors. Online appointments. Blood banks. Organ donations. Research blogs. </p>
                        <button><a href="/home" target="_self">Explore Lifeline</a></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing