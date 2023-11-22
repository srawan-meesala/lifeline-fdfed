import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Register_patient() {

    const navigate=useNavigate();

    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [mobileNumber,setmobileNumber] = useState('')
    const [mailID,setmailID] = useState('')
    const [dob,setdob] = useState('')
    const [occupation,setoccupation] = useState('')
    const [bloodGroup,setbloodGroup] = useState('')
    const [maritalStatus,setmaritalStatus] = useState('')
    const [gender,setgender] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword]=useState('')

    async function submit_register(e){
        e.preventDefault();

        try{
            console.log("Request Data:", { firstName, username });
            await axios.post("http://localhost:8000/patientRegister",{
                firstName,lastName,mobileNumber,mailID,dob,occupation,bloodGroup,maritalStatus,gender,username,password
            })
            .then(res=>{
                console.log(res)
                if(res.data === "exist"){
                    alert('Registered already')
                }
                else if(res.data === "not exist"){
                    navigate('/userProfile')
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="patient-register">

            <h1>Register</h1>

            <form method="POST" action="/patientRegister" className="patient-register-form">
                <label >FirstName</label><b/>
                <input type="text" onChange={(e) => { setfirstName(e.target.value) }} name="firstName" placeholder="firstName" required  /><br/>
                <label >lastName</label><b/>
                <input type="text" onChange={(e) => { setlastName(e.target.value) }} name="lastName" placeholder="lastName" required  /><br/>
                <label >Mobile Number</label><b/>
                <input type="number" onChange={(e) => { setmobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  /><br/>
                <label >Email ID</label><b/>
                <input type="email" onChange={(e) => { setmailID(e.target.value) }} name="mailID" placeholder="mailID" required  /><br/>
                <label >Date of Birth</label><b/>
                <input type="date" onChange={(e) => { setdob(e.target.value) }} name="dob" required  /><br/>
                <label >Occupation</label><b/>
                <input type="text" onChange={(e) => { setoccupation(e.target.value) }} name="occupation" placeholder="occupation" required  /><br/>
                <label >Blood Group</label><b/>
                <input type="text" onChange={(e) => { setbloodGroup(e.target.value) }} name="bloodGroup" placeholder="bloodGroup" required  /><br/>
                <label >Marital Status</label><b/>
                <input type="text" onChange={(e) => { setmaritalStatus(e.target.value) }} name="maritalStatus" placeholder="maritalStatus" required  /><br/>
                <label >Gender</label><b/>
                <input type="text" onChange={(e) => { setgender(e.target.value) }} name="gender" placeholder="gender" required  /><br/>
                <label >Username</label><b/>
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} name="Username" placeholder="Username" required  /><br/>
                <label >Password</label><b/>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} name="Password" placeholder="Password" required  /><br/>
                <input type="submit" onClick={submit_register} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/PatientLogin">login </Link>

        </div>
    )
}

export default Register_patient