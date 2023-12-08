import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import RegistrationForm from '../DoctorRegistration';

function Doctors({doctors}) {
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

  // State to track the selected hospital for detailed view


  const handleEdit = (DoctorId) => {
    // Handle edit action
    console.log(`Edit Doctor with ID ${DoctorId}`);
  };

  const handleDelete = (DoctorId) => {
    // Handle delete action
    console.log(`Delete hospital with ID ${DoctorId}`);
  };
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
          <div className="ViewDoc"><h5>Doctor Details</h5>
            <div className="AddDoc" onClick={handleAddClick} >Add  <FaPlus />  </div>
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
                  <th>Doctor ID</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Mail ID</th>
                  <th>Hospital</th>
                  <th>Specialization</th>
                  <th>Appointment Fee</th>
                  <th>Number of Blogs</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.docID}>
                    <td>{doctor.docID}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.mobileNumber}</td>
                    <td>{doctor.mailID}</td>
                    <td>{doctor.hospID}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.fee}</td>
                    <td>{doctor.blogs.length}</td>
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

export default Doctors
