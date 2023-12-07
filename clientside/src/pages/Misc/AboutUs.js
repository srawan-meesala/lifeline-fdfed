import React from 'react'
import Navbar from '../../components/Navbar'
import about1 from '../images/about1.jpg'
import about2 from '../images/about2.jpeg'
import Footer from '../../components/Footer'

const AboutUs = () => {
  return (
    <div className='AboutUs-whole'>
      <Navbar title={'About'} />
      <div className='AboutUs-Part-1'>
        <div className='AboutUs-Part-1-img'><img src={about1} alt="♥" className="AboutUs-Part-1-img-int" /></div>
        <div className='AboutUs-Part-1-info'>
          <div className='AboutUs-Part-1-info-data'><b>Lifeline</b> is an all-in-one Medical platform for small businesses.We
            empower millions of customers around the world to
            help and maintain their health with our smart
            algo technology, health-life support, and
            inspiring content. Founded in 2023 and setup in IIITS
            with additional offices in chennai, pune and surat
            is <b>100%</b> founder-owned and highly profitable.Driven by a passion for making a positive impact, Lifeline not only addresses immediate health concerns but also inspires and educates through engaging content. Our platform is a dynamic hub where users find not only solutions but also a community that encourages and uplift</div>
        </div>
      </div>
      <div className='AboutUs-Part-2'>
        <div className='AboutUs-Part-2-info'>
          <div className='AboutUs-Part-2-info-data'>
            Our innovative approach, powered by cutting-edge smart algorithm technology, enables millions of users worldwide to proactively manage their health. Through Lifeline, users gain access to personalized health-life support, utilizing intelligent algorithms to guide them on their unique health journeys. Our platform not only serves as a repository of invaluable health resources but also offers inspiring content, motivating users to make informed choices for a healthier lifestyle. Whether it's real-time health monitoring, personalized health plans, or expert advice, Lifeline is committed to providing a seamless and empowering experience.
          </div>
        </div>
        <div className='AboutUs-Part-2-img'><img src={about2} alt="♥" className="AboutUs-Part-2-img-int" /></div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs