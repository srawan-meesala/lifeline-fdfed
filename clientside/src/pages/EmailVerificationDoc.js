import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationDoc() {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://localhost:8000/verifyEmailDoc', {
          verificationToken,
        });
        if (response.data === 'verified') {
          alert('Email verified successfully');
          navigate(`/docRegister2/${verificationToken}`);
        } else {
          alert('Error while verifying');
          navigate('/docRegister');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };
  verifyEmail()
  });

  return (
    <div>
    </div>
  );
}

export default EmailVerificationDoc;
