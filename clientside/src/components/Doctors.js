import React,{useState} from 'react';
import {useEffect} from 'react' ;
import axios from 'axios';
import { FaUserCircle, FaEdit, FaTrash,FaPlus} from "react-icons/fa";
import { useParams } from 'react-router-dom';
import RegistrationForm from './DoctorRegistration';

function Doctors (){
    const {username} = useParams()
    const [userDetails,setUserDetails]= useState({});
    const [isListVisible, setListVisible] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);
    

    useEffect(()=>{
        async function fetchData(){
          try{
            const response = await axios.get(`http://localhost:8000/getUserDetails/${username}`);
            if(response.status == 200){
              setUserDetails(response.data)
            }
            else{
              console.error('Failed to fetch user details')
            }
          }
          catch(e){
            console.log(e)
          }
        }
        fetchData()
      },[username])
      const doctors = [
            { id: 1, name: 'Doctor A',mobile: '8956235689' , mail : 'DoctorA@gmail.com' , hospital : 'Hospital A' ,specialization : 'Neurologist' , fee : 'Rs. 600' , docID:'DoctorA@123'},
            { id: 2, name: 'Doctor B',mobile: '8972623569' , mail : 'DoctorB@gmail.com' , hospital : 'Hospital B' , specialization: 'Gynocologist', fee : 'Rs. 600' ,  docID: 'DoctorB@123' },
            { id: 3, name: 'Doctor C',mobile: '8956235279' , mail : 'DoctorC@gmail.com' , hospital : 'Hospital B' , specialization: 'Cardiologist',fee : 'Rs. 650' ,   docID :'DoctorC@123' },
            { id: 4, name: 'Doctor D',mobile: '8972623599' , mail : 'DoctorD@gmail.com' , hospital : 'Hospital D' , specialization: 'General Physician', fee : 'Rs. 450' ,   docID: 'DoctorD@123' },
            { id: 5, name: 'Doctor E',mobile: '8956235249' , mail : 'DoctorE@gmail.com' , hospital : 'Hospital A' , specialization: 'General Physician',fee : 'Rs. 450' ,   docID :'DoctorE@123' },
            // Add more Doctors as needed...
          ];
        
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
     
    return(
      <div>
        <br/>
      <div className='DoctorProfile-top'>
       <div className='DoctorProfile-dashboard'>
         <div></div>
         <div>Welcome {userDetails.firstName}</div>
       </div>
       <div className='DoctorProfile-user-logo'>
         <div className='DoctorProfile-user-logo-pic'><FaUserCircle/></div>
         <div></div>
       </div>
     </div>
     <div className = "Doctors-right">
     <div id="viewDoc" className="Doctors-right-table">
        <div  className ="ViewDoc"><h5>Doctor Details</h5>
        <div className ="AddDoc" onClick={handleAddClick} >Add  <FaPlus/>  </div>
        </div>
        {isFormVisible && (
        <div className="modal-container">
          <RegistrationForm onClose={handleCloseForm} />
        </div>
      )}
                    
                        <div className ="inp-add">
                           <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Mobile Number</th>
                                        <th>Mail ID</th>
                                        <th>Hospital</th> 
                                        <th>Specialization</th> 
                                        <th>Appointment Fee</th>
                                        <th>Doctor ID</th>
                                        <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {doctors.map((doctor) => (
                                  <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.mobile}</td>
                                    <td>{doctor.mail}</td>
                                    <td>{doctor.hospital}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.fee}</td>
                                    <td>{doctor.docID}</td>
                                    <td>
                                      <button className ="Doctors-edit-icon" onClick={() => handleEdit(doctor.id)}><FaEdit /></button>
                                      <button className ="Doctors-delete-icon" onClick={() => handleDelete(doctor.id)}><FaTrash /></button>
                                    </td>
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
