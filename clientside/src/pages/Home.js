import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'
import '../styles/Home.css'
import { RiHeartPulseLine  } from "react-icons/ri";
import envi from '../images/envi.jpg'
import nahwc from '../images/nahwc.png'
import appoint from '../images/appoint.png'
import stays from '../images/stays.png'
import { useParams } from 'react-router-dom'

const Home = () => {
  const {username} = useParams()
  return (
    <div className='Home-page'>
        <Navbar title={'Home'} username={username}/>
        <Searchbar/>
        <div className="Home-whole">
          <div className="Home-c1">
            <div className="Home-c1-box">
              <div className="Home-c1-title">Explore Our All New Pharmacy.</div>
              <div className="Home-c1-features">
                Simple and Easy to Use. <br/>
                <span>Everything In Your Fingertips.</span><br />
                Faster Delivery, Always On-time.
              </div>
              <div className="Home-c1-link">
                <Link to="/pharmacy" target="_self">Explore Pharmacy</Link>
              </div>
            </div>
            
          </div>
          <div className="Home-c2">
            <div className="Home-c2-content">
              <div className="Home-c2-content-title">
                Get the Best In Class Service from the Best In Class Doctors.
                <br/><span>Only on Lifeline.</span><RiHeartPulseLine/>
              </div>
              <div className="Home-c2-content-body">
                <div className="Home-c2-content-body-img">
                  <img src={appoint} className='Home-c2-content-body-img-img' alt='Book Appointments Online'></img>
                </div>
                <div className="Home-c2-content-body-body">
                  <div className="Home-c2-content-body-body-text">
                    Lifeline provides the best price to service ratio when compared to other service providers in the market.
                    Booking appointments to Ordering Medicines.&nbsp;<span>Everything in your fingertips.</span>&nbsp;
                    Only service provider to provide<br /> all types of Healthcare services. Check out the ease in Booking Appointments on Lifeline.
                  </div>
                  <div className="Home-c2-content-body-body-btn">
                    <Link to="/showdoctors">Explore and Book Appointments</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Home-c3">
            <div className="Home-c3-1"> 
              <div className="Home-c3-1-title">
                Tests Provided Include
              </div>
              <div className="Home-c3-1-body">
                <div className="Home-c3-1-body-cards">
                  <div className="Home-c3-1-body-card Home-c3-1-body-card-mri">
                    <div className="Home-c3-1-body-card-name">MRI</div>
                  </div>
                  <div className="Home-c3-1-body-card Home-c3-1-body-card-xray">
                    <div className="Home-c3-1-body-card-name">X-Ray</div>
                  </div>
                  <div className="Home-c3-1-body-card Home-c3-1-body-card-ct">
                    <div className="Home-c3-1-body-card-name">CT</div>
                  </div>
                </div>
                <div className="Home-c3-1-body-cards">
                  <div className="Home-c3-1-body-card Home-c3-1-body-card-pet">
                    <div className="Home-c3-1-body-card-name">PET</div>
                  </div>
                  <div className="Home-c3-1-body-card Home-c3-1-body-card-ultra">
                    <div className="Home-c3-1-body-card-name">Ultrasound</div>
                  </div>
                  <div className="Home-c3-1-body-card Home-c3-1-body-card-blood">
                    <div className="Home-c3-1-body-card-name">Blood Test</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Home-c4">
            <div className="Home-c4-img">
              <img className='Home-c4-img-img' src={envi} alt="Save Planet" />
            </div>
            <div className="Home-c4-content">
              <div className="Home-c4-content-blank"></div>
              <div className="Home-c4-content-title">
                Life is Short.<br/>
                Help the people in Need.<br/>
                Save a life afterlife.<br/>
                You will live on even after you are gone.<br/>
                Organ Donation Camps by <span>Lifeline.</span>
              </div>
              <div className="Home-c4-content-body">
                <a className="Home-c4-content-body-a" href='/'>Register for Lifeline Organ Donation Camp Today.</a>
              </div>
            </div>
            {/* Register for Lifeline Organ Donation Camp and Help the People in Need. */}
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
          <div className="Home-c6">
            <div className="Home-c6-img">
              <img src={stays} alt="" className="Home-c6-img-img" />
            </div>
          <div className="Home-c6-content">
              <div className="Home-c6-content-new">
                <div className="Home-c6-title">Latest and Informative Blogs. From Our Expert Doctors.</div>
                <div className="Home-c6-blogs">
                  <div className="Home-c6-blogs-cards">
                    <div className="Home-c6-blogs-cards-1">
                      <div className="Home-c6-blogs-card">
                        <div className="Home-c6-blogs-card-name">Lung Cancer Screening Demystified</div>
                        <div className="Home-c6-blogs-card-down">
                          <div className="Home-c6-blogs-card-down-doc">By Charan Kumar </div>
                          <div className="Home-c6-blogs-card-down-spec">Heptologist</div>
                        </div>
                      </div>
                      <div className="Home-c6-blogs-card">
                        <div className="Home-c6-blogs-card-name">Lung Cancer Screening Demystified</div>
                        <div className="Home-c6-blogs-card-down">
                          <div className="Home-c6-blogs-card-down-doc">By Charan Kumar </div>
                          <div className="Home-c6-blogs-card-down-spec">Heptologist</div>
                        </div>
                      </div>
                    </div>
                    <div className="Home-c6-blogs-cards-1">
                      <div className="Home-c6-blogs-card">
                        <div className="Home-c6-blogs-card-name">Lung Cancer Screening Demystified</div>
                        <div className="Home-c6-blogs-card-down">
                          <div className="Home-c6-blogs-card-down-doc">By Charan Kumar </div>
                          <div className="Home-c6-blogs-card-down-spec">Heptologist</div>
                        </div>
                      </div>
                      <div className="Home-c6-blogs-card">
                        <div className="Home-c6-blogs-card-name">Lung Cancer Screening Demystified</div>
                        <div className="Home-c6-blogs-card-down">
                          <div className="Home-c6-blogs-card-down-doc">By Charan Kumar </div>
                          <div className="Home-c6-blogs-card-down-spec">Heptologist</div>
                        </div>
                      </div>
                    </div>
                    <div className="Home-c6-blogs-explore">
                      <a href="/blogs">View All Blogs</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home