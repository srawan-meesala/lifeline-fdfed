import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/OrganDonation.css'

const OrganDonation = () => {
  return (
    <div className='OrganDonation-whole'>
        <div className='OrganDonation-whole-int'>
        <Navbar/>
        <div className='OrganDonation-whole-int-title'>Organ Donation Form</div>
        <div className='OrganDonation-whole-int-body'>
            <form className='OrganDonation-whole-int-body-form'>
                <div className='OrganDonation-whole-int-body-form-upper'>
                <label className='OrganDonation-label'>Name:</label>
                <input type='text' className='OrganDonation-input-name'></input>
                <label className='OrganDonation-label'>Aadhar number:</label>
                <input type='number' className='OrganDonation-input-aadhar'></input>
                <label className='OrganDonation-label'>Gender:</label>
                <select className='OrganDonation-select'>
                    <option value>Male</option>
                    <option value>Female</option>
                    <option value>Others</option>
                </select>
                <label className='OrganDonation-label'>Donation</label>
                <select>
                    <option value>Full body or tissues</option>
                    <option value>Particular Organ</option>
                </select>
                <label className='OrganDonation-label'>If Particular Organ? What is it?</label>
                <input  type='text' className='OrganDonation-input-name'></input>
                <label className='OrganDonation-label'>Any health issues in the past?</label>
                <textarea className='OrganDonation-Textarea'></textarea>
                </div>
                <div className='OrganDonation-whole-int-body-form-lower'><button className='OrganDonation-btn'>Donate</button></div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default OrganDonation