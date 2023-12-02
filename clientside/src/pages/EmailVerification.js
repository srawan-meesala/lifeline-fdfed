import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://localhost:8000/verifyEmail', {
          verificationToken,
        });
        console.log(verificationToken)
        if (response.data === 'verified') {
          alert('Email verified successfully');
          navigate(`/patientRegister2/${verificationToken}`);
        } else {
          alert('Error while verifying');
          navigate('/patientRegister');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };
  verifyEmail()
  });

  return (
    <div>
      <p>Verifying email...</p>
    </div>
  );
}

export default EmailVerification;
