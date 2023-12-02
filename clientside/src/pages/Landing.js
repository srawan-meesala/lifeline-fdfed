import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import PatientRegister from './PatientRegister'

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
                    <ul>
                        <Link to='/patientRegister'>Join Lifeline</Link>
                    </ul>
                </nav>
            </div>
            <div className="container-1">
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