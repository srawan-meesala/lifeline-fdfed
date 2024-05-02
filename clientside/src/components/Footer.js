import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

function Footer() {
  const [name, setName] = useState('');
  const [mailID, setMailID] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://lifeline-fdfed-api.onrender.com/Feedback', {
        name, mailID, message
      });
  
      console.log(response.data);
  
      if (response.data === 'filled') {
        alert('Form submitted successfully');
      } else {
        alert('Error while submitting form');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  
  

  return (
    <div className="footer-whole">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h1>Lifeline<span>.</span></h1>
            <p>Providing exceptional healthcare services since 2023</p>
          </div>
          <hr></hr>
          <div className="footer-contact">
            <h2>Contact Us</h2>
            <p>Address: IIIT SRICITY, CHITTOR</p>
            <p>Email: lifeline@gmail.com</p>
          </div>
        </div>
        <hr></hr>
        <div className='footer-down-part'>
        <div className="footer-social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="footer-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="footer-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="footer-icon" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="footer-icon" />
          </a>
        </div>
        <div className="footer-feedback-form">
          <h2>Send Us Your Feedback</h2>
          <form method='POST' onSubmit={handleSubmit}>
            <div className='footer-form'>
                <div className='footer-together'>
                    <div className="footer-form-group">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e)=>{setName(e.target.value)}}
                        placeholder='Your Name'
                        required
                    />
                    </div>
                    <div className="footer-form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e)=>{setMailID(e.target.value)}}
                        placeholder='Your Email'
                        required
                    />
                    </div>
                </div>
                <div className="footer-form-group-2">
                <textarea
                    id="message"
                    name="message"
                    onChange={(e)=>{setMessage(e.target.value)}}
                    placeholder='Message'
                    required
                    className='footer-textarea'
                ></textarea>
                </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;