import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationDoc() {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('https://lifeline-fdfed-api.onrender.com/verifyEmailDoc', {
          verificationToken,
        });
        if (response.data === 'verified') {
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
