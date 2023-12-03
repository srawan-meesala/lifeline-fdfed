import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'
import '../styles/Home.css'
import { RiHeartPulseLine  } from "react-icons/ri";
import envi from '../images/envi.jpg'
import nahwc from '../images/nahwc.png'

const Home = () => {
  return (
    <div>
        <Navbar title={'Home'}/>
        <Searchbar/>
        <div className="Home-whole">
          <div className="Home-c1">
            <div className="Home-c1-box">
              <div className="Home-c1-title">Explore Our All New Pharmacy Now.</div>
              <div className="Home-c1-features">
                Simple and Easy to Use. <br/>
                <span>Everything In Your Fingertips.</span><br />
                Faster Delivery, Always On-time.
              </div>
              <div className="Home-c1-link">
                <a href="/" target="_self">Explore Pharmacy</a>
              </div>
            </div>
            
          </div>
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
          <div className="Home-c4">
            <div className="Home-c4-img">
              <img className='Home-c4-img-img' src={envi} alt="Save Planet" />
            </div>
            <div className="Home-c4-content"></div>
          </div>
          <div className="Home-c5">
            <div className="Home-c5-content">
              <div className="Home-c5-content-new">
                <div className="Home-c5-title">Get An Appointment From Our Best Doctors Today.</div>
                <div className="Home-c5-docs">
                  <div className="Home-c5-docs-title">
                    Our Doctors with High Demand
                  </div>
                  <div className="Home-c5-docs-cards">
                    <div className="Home-c5-docs-card">
                      <div className="Home-c5-docs-card-name">Dr. Anand Chakrobarthy</div>
                      <div className="Home-c5-docs-card-down">
                        <div className="Home-c5-docs-card-down-spec">Cardiologist</div>
                        <a className="Home-c5-docs-card-down-book" href="/">Click to Book an Appointment</a>
                      </div>
                    </div>
                    <div className="Home-c5-docs-card">
                      <div className="Home-c5-docs-card-name">Dr. Anitha Chaudhary</div>
                      <div className="Home-c5-docs-card-down">
                        <div className="Home-c5-docs-card-down-spec">Cardiologist</div>
                        <a className="Home-c5-docs-card-down-book" href="/">Click to Book an Appointment</a>
                      </div>
                    </div>
                    <div className="Home-c5-docs-card">
                      <div className="Home-c5-docs-card-name">Dr. Pavan Pandey</div>
                      <div className="Home-c5-docs-card-down">
                        <div className="Home-c5-docs-card-down-spec">Cardiologist</div>
                        <a className="Home-c5-docs-card-down-book" href="/">Click to Book an Appointment</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Home-c5-img">
              <img src={nahwc} alt="" className="Home-c5-img-img" />
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home