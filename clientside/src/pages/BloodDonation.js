import {React,useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/OrganDonation.css'

const BloodDonation = () => {
    const [name,setName] = useState('')
    const [aadhar,setAadhar] = useState('')
    const [name,setName] = useState('')
    const [name,setName] = useState('')
    const [age, setAge] = useState("")
    const [isValidAge, setIsValidAge] = useState(true);
  
    const handleAgeChange = (e) => {
      const inputAge = e.target.value;
      setAge(inputAge);
      const isValid = /^\d+$/.test(inputAge) && parseInt(inputAge, 10) >= 18;
      setIsValidAge(isValid);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (isValidAge) {
        alert(`Age ${age} is valid!`);
      } else {
        alert("Invalid age. Please enter a valid age (must be 18 or older).");
      }
    };



  return (
    <div className='OrganDonation-whole'>
        <div className='OrganDonation-whole-int'>
        <Navbar/>
        <div className='OrganDonation-whole-int-title'>Blood Donation Form</div>
        <div className='OrganDonation-whole-int-body'>
            <form className='OrganDonation-whole-int-body-form' onSubmit={handleSubmit}>
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
                <label className='OrganDonation-label'>Blood Group:</label>
                <select>
                    <option value>O+</option>
                    <option value>O-</option>
                    <option value>A+</option>
                    <option value>A-</option>
                    <option value>B+</option>
                    <option value>B-</option>
                    <option value>AB+</option>
                    <option value>AB-</option>
                </select>
                <label className='OrganDonation-label'>Age:</label>
                <input  type='number' className='OrganDonation-input-aadhar' value={age} onChange={handleAgeChange}></input>
                <label className='OrganDonation-label'>Any health issues in the past?</label>
                <textarea className='OrganDonation-Textarea'></textarea>
                </div>
                <div className='OrganDonation-whole-int-body-form-lower' type='submit'><button className='OrganDonation-btn'>Donate</button></div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default BloodDonation