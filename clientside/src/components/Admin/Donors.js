import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import RegistrationForm from '../DoctorRegistration';

function Donors({donors}) {
  const { username } = useParams()
  const [userDetails, setUserDetails] = useState({});
  const [isListVisible, setListVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/getAdminDetails/${username}`);
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

  const handleAddClick = () => {
    setFormVisible(!isFormVisible);
    setListVisible(!isListVisible)
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setFormVisible(false);
  };

  return (
    <div>
      <br />
      <div className='DoctorProfile-top'>
        <div className='DoctorProfile-dashboard'>
          <div>Welcome {userDetails.name}</div>
        </div>
      </div>
      <div className="Doctors-right">
        <div id="viewDoc" className="Doctors-right-table">
          <div className="ViewDoc"><h5>Donor Details</h5>
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
                  <th>Username</th>
                  <th>Name</th>
                  <th>Aadhaar Number</th>
                  <th>Gender</th>
                  <th>Donation</th>
                  <th>Particular</th>
                  <th>Past</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.username}>
                    <td>{donor.username}</td>
                    <td>{donor.name}</td>
                    <td>{donor.aadhaar}</td>
                    <td>{donor.gender}</td>
                    <td>{donor.donation}</td>
                    <td>{donor.particular}</td>
                    <td>{donor.past}</td>
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

export default Donors
