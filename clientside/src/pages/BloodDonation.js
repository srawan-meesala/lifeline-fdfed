import {React,useState} from 'react'
import axios from'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/OrganDonation.css'
import Cookies from 'js-cookie';

const BloodDonation = () => {
    const navigate = useNavigate()
    const username = Cookies.get('username');
    const [name,setName] = useState('')
    const [aadhar,setAadhar] = useState('')
    const [gender,setGender] = useState('male')
    const [bloodGroup,setbloodGroup] = useState('O+')
    const [age, setAge] = useState('')
    const [past, setPast] = useState('')
    const [isValidAge, setIsValidAge] = useState(true);
    const [isValidAadhar, setIsValidAadhar] = useState(true);
  
    const handleAgeChange = (e) => {
      const inputAge = e.target.value;
      setAge(inputAge);
      const isValid = /^\d+$/.test(inputAge) && parseInt(inputAge, 10) >= 18;
      setIsValidAge(isValid);
    };

    const handleAadharChange = (e) => {
      const inputAadhar = e.target.value;
      setAadhar(inputAadhar);
      const isValid = /^\d{12}$/.test(inputAadhar);
      setIsValidAadhar(isValid);
    };
  
    async function submitHandler(e) {
      e.preventDefault();
      if (!(isValidAge)){
        alert("Invalid age. Please enter a valid age (must be 18 or older).");
      }
      else if (!isValidAadhar) {
        alert("Invalid Aadhar card. Please enter a valid 12-digit Aadhar card number.");  
      }
      else{
        try {
          const response = await axios.post('http://localhost:8000/bloodBanks', {
            username, name, aadhar, gender, bloodGroup, age, past
          });
    
          if (response.data === 'exist') {
            alert('Registered already.Cannot register again');
          } else if(response.status === 200) {
            navigate(`/odthankyou`)
          }
        } catch (error) {
          alert('Wrong details');
          console.log(error);
        }
    }
  }


  return (
    <div className='OrganDonation-whole'>
        <div className='OrganDonation-whole-int'>
        <Navbar/>
        <div className='OrganDonation-whole-int-title'>Blood Donation Form</div>
        <div className='OrganDonation-whole-int-body'>
            <form className='OrganDonation-whole-int-body-form' onSubmit={submitHandler}>
                <div className='OrganDonation-whole-int-body-form-upper'>
                <label className='OrganDonation-label'>Name:</label>
                <input type='text' className='OrganDonation-input-name' onChange={(e)=>{setName(e.target.value)}} required />
                <label className='OrganDonation-label'>Aadhar number:</label>
                <input type='number' className='OrganDonation-input-aadhar' onChange={handleAadharChange} required/>
                <label className='OrganDonation-label'>Gender:</label>
                <select className='OrganDonation-select' onChange={(e)=>{setGender(e.target.value)}} required>
                    <option value=''>Choose gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='others'>Others</option>
                </select>
                <label className='OrganDonation-label'>Blood Group:</label>
                <select className='OrganDonation-select' onChange={(e)=>{setbloodGroup(e.target.value)}} required>
                    <option value=''>Choose BloodGroup</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                </select>
                <label className='OrganDonation-label'>Age:</label>
                <input  type='number' className='OrganDonation-input-aadhar' value={age} onChange={handleAgeChange} required></input>
                <label className='OrganDonation-label'>Any health issues in the past?</label>
                <textarea className='OrganDonation-Textarea' onChange={(e)=>{setPast(e.target.value)}} required></textarea>
                </div>
                <div className='OrganDonation-whole-int-body-form-lower' type='submit'><button className='OrganDonation-btn'>Donate</button></div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default BloodDonation