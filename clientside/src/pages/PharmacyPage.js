import React from 'react'
import Medicines from '../components/Pharmacy/Medicines'
import '../styles/Pharmacy.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'

const PharmacyPage = () => {

  const username = useParams()

  return (
    <div className='Pharmacy-whole'>
      <Navbar title={'Pharmacy'} />
      <Medicines />
      <Footer />
    </div>
  )
}

export default PharmacyPage;