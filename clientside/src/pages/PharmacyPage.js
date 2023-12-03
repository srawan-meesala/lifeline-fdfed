import React from 'react'
import Medicines from '../pages/Medicines'
import '../styles/Pharmacy.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PharmacyPage = () => {
  return (
    
    <div className='Pharmacy-whole'>
      <Navbar title={'Pharmacy'}/>
      <Medicines />
      <Footer/>
    </div>
  )
}

export default PharmacyPage;