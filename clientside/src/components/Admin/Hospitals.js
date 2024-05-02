import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegistrationForm from '../HospitalRegistration';
import Cookies from 'js-cookie';

function Hospitals({hospitals}) {
  const username = Cookies.get('username');
  const [userDetails, setUserDetails] = useState({});
  const [isListVisible, setListVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://lifeline-fdfed-api.onrender.com/getAdminDetails/${username}`);
        if (response.status === 200) {
          setUserDetails(response.data)
        }
        else {
          console.error('Failed to fetch user details')
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [username])
  
  const handleCloseForm = () => {
    setFormVisible(false);
    setFormVisible(false);
  };
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);

  };

  return (
    <div>
      <br />
      <div className='DoctorProfile-top'>
        <div className='DoctorProfile-dashboard'>
          <div></div>
          <div>Welcome {userDetails.name}</div>
        </div>
      </div>
      <div className="Hospitals-right" >
        <div id="viewHosp" className="Hospitals-right-table">
          <div className="ViewHosp"> <h5>Hospital Details</h5>

          </div>

          {isFormVisible && (
            <div className="modal-container">
              <RegistrationForm onClose={handleCloseForm} />
            </div>
          )}

          <div className="inp-add">
            <table>
              <thead>
                <tr>
                  <th>Hospital ID</th>
                  <th>Hospital Name</th>
                  <th>Mobile Number</th>
                  <th>Mail ID</th>
                  <th>City</th>
                  <th>Diagnosis Center</th>
                  <th>Blood Bank</th>
                  <th>Organ Donation</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.hospID}>
                    <td>{hospital.hospID}</td>
                    <td>{hospital.hospName}</td>
                    <td>{hospital.mobileNumber}</td>
                    <td>{hospital.mailID}</td>
                    <td>{hospital.city}</td>
                    <td>{hospital.diagnosisCenter}</td>
                    <td>{hospital.bloodBanks}</td>
                    <td>{hospital.organDonation}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Hospitals
