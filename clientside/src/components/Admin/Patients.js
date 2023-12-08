import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegistrationForm from '../HospitalRegistration';

function Patients({patients}) {
  const { username } = useParams()
  const [userDetails, setUserDetails] = useState({});
  const [isListVisible, setListVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getUserDetails/${username}`);
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
          <div className="ViewHosp"> <h5>User Details</h5>

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
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Mail ID</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Blood Group</th>
                  <th>Marital Status</th>
                  <th>Occupation</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.username}>
                    <td>{patient.firstName} {patient.lastName}</td>
                    <td>{patient.mobileNumber}</td>
                    <td>{patient.mailID}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.bloodGroup}</td>
                    <td>{patient.maritalStatus}</td>
                    <td>{patient.occupation}</td>
                    <td>{patient.username}</td>
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

export default Patients
