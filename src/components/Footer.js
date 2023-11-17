import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Feedback submitted:', feedback);
    // You can add your logic to send the feedback data to your server or perform other actions here
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
          <form onSubmit={handleSubmit}>
            <div className='footer-form'>
                <div className='footer-together'>
                    <div className="footer-form-group">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={feedback.name}
                        onChange={handleInputChange}
                        placeholder='Your Name'
                        required
                    />
                    </div>
                    <div className="footer-form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={feedback.email}
                        onChange={handleInputChange}
                        placeholder='Your Email'
                        required
                    />
                    </div>
                </div>
                <div className="footer-form-group-2">
                <textarea
                    id="message"
                    name="message"
                    value={feedback.message}
                    onChange={handleInputChange}
                    placeholder='Message'
                    required
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
