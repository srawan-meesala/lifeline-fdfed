import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import RegistrationForm from '../HospitalRegistration';

function Hospitals() {
  const { username } = useParams()
  const [userDetails, setUserDetails] = useState({});
  const [isListVisible, setListVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getUserDetails/${username}`);
        if (response.status == 200) {
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
  const hospitals = [
    { id: 1, name: 'Hospital A', mobile: '8956235689', mail: 'hospitalA@gmail.com', diag: 'Yes', city: 'Chennai', Bloodbank: 'No', Approval: 'Yes', userID: 'Hospital@123' },
    { id: 2, name: 'Hospital B', mobile: '8972623569', mail: 'hospitalB@gmail.com', diag: 'Yes', city: 'Bangalore', Bloodbank: 'Yes', Approval: 'Yes', userID: 'HospitalB@123' },
    { id: 3, name: 'Hospital C', mobile: '8956235279', mail: 'hospitalC@gmail.com', diag: 'No', city: 'Bangalore', Bloodbank: 'No', Approval: 'No', userID: 'HospitalC@123' },
    { id: 4, name: 'Hospital D', mobile: '8972623599', mail: 'hospitalD@gmail.com', diag: 'Yes', city: 'Chennai', Bloodbank: 'Yes', Approval: 'Yes', userID: 'HospitalD@123' },
    { id: 5, name: 'Hospital E', mobile: '8956235249', mail: 'hospitalE@gmail.com', diag: 'No', city: 'Chennai', Bloodbank: 'No', Approval: 'No', userID: 'HospitalE@123' },
  ];
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
          <div>Welcome {userDetails.firstName}</div>
        </div>
        <div className='DoctorProfile-user-logo'>
          <div className='DoctorProfile-user-logo-pic'><FaUserCircle /></div>
          <div></div>
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
                  <th>Hospital Name</th>
                  <th>Mobile Number</th>
                  <th>Mail ID</th>
                  <th>If Diag</th>
                  <th>City</th>
                  <th>Blood Bank</th>
                  <th>Approval</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.id}>
                    <td>{hospital.name}</td>
                    <td>{hospital.mobile}</td>
                    <td>{hospital.mail}</td>
                    <td>{hospital.diag}</td>
                    <td>{hospital.city}</td>
                    <td>{hospital.Bloodbank}</td>
                    <td>{hospital.Approval}</td>
                    <td>{hospital.userID}</td>
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
