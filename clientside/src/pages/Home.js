import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'
import '../styles/Home.css'
import { RiHeartPulseLine, RiChatHeartLine  } from "react-icons/ri";

const Home = () => {
  return (
    <div>
        <Navbar title={'Home'}/>
        <Searchbar/>
        <div className="Home-whole">
          <div className="Home-c1"></div>
          <div className="Home-c2">
            <div className="Home-c2-content">
              <div className="Home-c2-content-title">
                Explore the best in class service from the best in class doctors from your city.
                <br/><span>Only on Lifeline.</span><RiHeartPulseLine/>
              </div>
              <div className="Home-c2-content-body">
                Booking appointments to Ordering Medicines.&nbsp;<span>Everything in your fingertips.</span><br />
                Only service provider to provide all kinds of Healthcare services.<br />
                
              </div>
            </div>
          </div>
          <div className="Home-c3"></div>
          <div className="Home-c4"></div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home