import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function DocRegister() {
    const navigate=useNavigate();

    const [name,setName] = useState('')
    const [mobileNumber,setmobileNumber] = useState('')
    const [mailID,setmailID] = useState('')
    const [hospital,setHospital] = useState('')
    const [specialization,setSpecialization] = useState('')
    const [fee,setFee] = useState('')
    const [docID,setDocID] = useState('')
    const [password,setPassword]=useState('')

    async function submit_register_doc(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/docRegister",{
                name,mobileNumber,mailID,hospital,specialization,fee,docID,password
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
        <div className="doctor-register">
            <h1>Register</h1>
            <form method="POST" action="/docRegister" className="doctor-register-form">
                <label >Name</label><b/>
                <input type="text" onChange={(e) => { setName(e.target.value) }} name="Name" placeholder="Name" required  /><br/>
                <label >Mobile Number</label><b/>
                <input type="number" onChange={(e) => { setmobileNumber(e.target.value) }} name="mobileNumber" placeholder="mobileNumber" required  /><br/>
                <label >Email ID</label><b/>
                <input type="email" onChange={(e) => { setmailID(e.target.value) }} name="mailID" placeholder="mailID" required  /><br/>
                <label >Choose Hospital</label><b/>
                <input type="text" onChange={(e) => { setHospital(e.target.value) }} name="hospital" placeholder="hospital"  required  /><br/>
                <label >Specialization</label><b/>
                <input type="text" onChange={(e) => { setSpecialization(e.target.value) }} name="specialization" placeholder="Specialization" required  /><br/>
                <label >Appointment Fee</label><b/>
                <input type="number" onChange={(e) => { setFee(e.target.value) }} name="fee" placeholder="Appointment Fee" required  /><br/>
                <label >Doctor ID</label><b/>
                <input type="text" onChange={(e) => { setDocID(e.target.value) }} name="docID" placeholder="Doctor ID" required  /><br/>
                <label >Password</label><b/>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} name="password" placeholder="Password" required  /><br/>
                <input type="submit" onClick={submit_register_doc} />
            </form>
            <br />
            <p>OR</p>
            <br />

            <Link to="/login">login </Link>

        </div>
    )
}

export default DocRegister