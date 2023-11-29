import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ReactComponent as Logo } from "../images/undraw_remotely_2j6y.svg";


function PatientRegister() {

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
            await axios.post("http://localhost:8000/patientRegister",{
                firstName,lastName,mobileNumber,mailID,dob,occupation,bloodGroup,maritalStatus,gender,username,password
            })
            .then(res=>{
                if(res.data === "exist"){
                    alert('Registered already')
                }
                else if(res.data === "not exist"){
                    navigate('/login')
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
        <div className="PatientLogin-whole">

            <div className="PatientLogin-left">
                <div className="PatientLogin-logo ">Lifeline<span className="PatientLogin-logo-span">.</span>&nbsp;<span className="PatientLogin-logo-side">Registration</span></div>
                <Logo className="PatientLogin-image"/>
            </div>
            <div className="PatientLogin-right">
                <form method="POST" action="/patientRegister" className="patient-register-form">
                    <label >First Name</label><b/>
                    <input type="text" onChange={(e) => { setfirstName(e.target.value) }} name="firstName" placeholder="First Name" required  />
                    <label htmlFor="lastname">Last Name</label><b/>
                    <input type="text" onChange={(e) => { setlastName(e.target.value) }} name="lastName" placeholder="Last Name" required  />
                    <label >Mobile Number</label><b/>
                    <input type="number" onChange={(e) => { setmobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  />
                    <label >Email ID</label><b/>
                    <input type="email" onChange={(e) => { setmailID(e.target.value) }} name="mailID" placeholder="mailID" required  />
                    <label >Date of Birth</label><b/>
                    <input type="date" onChange={(e) => { setdob(e.target.value) }} name="dob" required  />
                    <label >Occupation</label><b/>
                    <input type="text" onChange={(e) => { setoccupation(e.target.value) }} name="occupation" placeholder="occupation" required  />
                    <label >Blood Group</label><b/>
                    <input type="text" onChange={(e) => { setbloodGroup(e.target.value) }} name="bloodGroup" placeholder="bloodGroup" required  />
                    <label >Marital Status</label><b/>
                    <input type="text" onChange={(e) => { setmaritalStatus(e.target.value) }} name="maritalStatus" placeholder="maritalStatus" required  />
                    <label >Gender</label><b/>
                    <input type="text" onChange={(e) => { setgender(e.target.value) }} name="gender" placeholder="gender" required  />
                    <label >Username</label><b/>
                    <input type="text" onChange={(e) => { setUsername(e.target.value) }} name="Username" placeholder="Username" required  />
                    <label >Password</label><b/>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} name="Password" placeholder="Password" required  />
                    <input type="submit" onClick={submit_register} />

                </form>
                <br />
                <p>OR</p>
                <br />

                <Link to="/login">login </Link>
            </div>
        </div>
    )
}

export default PatientRegister