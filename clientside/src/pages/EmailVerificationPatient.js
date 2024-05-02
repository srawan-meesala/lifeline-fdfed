import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationPatient() {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('https://lifeline-fdfed-api.onrender.com/verifyEmailPatient', {
          verificationToken,
        });
        if (response.data === 'verified') {
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
    <div></div>
  );
}

export default EmailVerificationPatient;
