import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutUs = () => {
  return (
    <div className='AboutUs-whole'>
      <Navbar title={'About'}/>
        <div className='AboutUs-Part-1'>
          <div className='AboutUs-Part-1-img'></div>
          <div className='AboutUs-Part-1-info'><b>Lifeline</b> is an all-in-one Medical platform for small businesses.We
          empower millions of customers around the world to
          help and maintain their health with our smart
          algo technology, health-life support, and
          inspiring content. Founded in 2023 and setup in IIITS
          with additional offices in chennai, pune and surat
          is <b>100%</b> founder-owned and highly profitable.</div>
        </div>
        <div className='AboutUs-Part-2'>
          <div className='AboutUs-Part-2-info'><b>Lifeline</b> is an all-in-one Medical platform for small businesses.We
          empower millions of customers around the world to
          help and maintain their health with our smart
          algo technology, health-life support, and
          inspiring content. Founded in 2023 and setup in IIITS
          with additional offices in chennai, pune and surat
          is <b>100%</b> founder-owned and highly profitable.</div>
          <div className='AboutUs-Part-2-img'></div>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutUs