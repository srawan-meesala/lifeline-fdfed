import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/OrganDonation.css'

const OrganDonation = () => {
    const [name, setName] = useState('')
    const [aadhaar, setAadhaar] = useState('')
    const [gender, setGender] = useState('')
    const [donation, setDonation] = useState('')
    const [particular, setParticular] = useState('')
    const [past, setPast] = useState('')

    return (
        <div className='OrganDonation-whole'>
            <div className='OrganDonation-whole-int'>
            <Navbar title={'Organ Donation'}/>
            <div className='OrganDonation-whole-int-title'>Organ Donation Form</div>
            <div className='OrganDonation-whole-int-body'>
                <form className='OrganDonation-whole-int-body-form' method='post' action='/organdonationform'>
                    <div className='OrganDonation-whole-int-body-form-upper'>
                        <label className='OrganDonation-label'>Name:</label>
                        <input onChange={(e)=>setName(e.target.value)} type='text' className='OrganDonation-input-name'></input>
                        <label className='OrganDonation-label'>Aadhar number:</label>
                        <input onChange={(e)=>setAadhaar(e.target.value)} type='number' className='OrganDonation-input-aadhar'></input>
                        <label className='OrganDonation-label'>Gender:</label>
                        <select onChange={(e)=>setGender(e.target.value)} className='OrganDonation-select'>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Others</option>
                        </select>
                        <label className='OrganDonation-label'>Donation</label>
                        <select onChange={(e)=>setDonation(e.target.value)}>
                            <option value='full body'>Full body or tissues</option>
                            <option value='particular'>Particular Organ</option>
                        </select>
                        <label className='OrganDonation-label'>If Particular Organ? What is it?</label>
                        {donation!=='particular' && (
                            <input type='text' className='OrganDonation-input-name' disabled></input>
                        )}
                        {donation==='particular' && (
                            <input onChange={(e)=>setParticular(e.target.value)} type='text' className='OrganDonation-input-name'></input>
                        )}
                        <label className='OrganDonation-label'>Any health issues in the past?</label>
                        <textarea onChange={(e)=>setPast(e.target.value)} className='OrganDonation-Textarea'></textarea>
                    </div>
                    <div className='OrganDonation-whole-int-body-form-lower'><button className='OrganDonation-btn'>Donate</button></div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default OrganDonation