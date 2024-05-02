import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationHosp() {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('https://lifeline-fdfed-api.onrender.com/verifyEmailHosp', {
          verificationToken,
        });
        if (response.data === 'verified') {
          navigate(`/hospRegister2/${verificationToken}`);
        } else {
          alert('Error while verifying');
          navigate('/hospRegister');
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

export default EmailVerificationHosp;
