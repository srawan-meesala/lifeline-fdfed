const express = require('express')
const collection1 = require('./mongo') 
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.post('/patientLogin',async(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    try{
        const check = await collection1.findOne({username:username})
        if(check){
            if(password == check.password){
                res.status(200).json(user);
            }
            else{
                res.json('invalid credentials')
            }
            
        }
        else{
            res.json('doesnot exist')
        }
    }
    catch(e){
        res.json('error')
    }
})

app.post('/patientRegister',async(req,res)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const mobileNumber = req.body.mobileNumber
    const mailID = req.body.mailID
    const dob = req.body.dob
    const occupation = req.body.occupation
    const bloodGroup = req.body.bloodGroup
    const maritalStatus = req.body.maritalStatus
    const gender = req.body.gender
    const username = req.body.username
    const password = req.body.password
    const data = {
        firstName:firstName,
        lastName:lastName,
        mobileNumber:mobileNumber,
        mailID:mailID,
        dob:dob,
        occupation:occupation,
        bloodGroup:bloodGroup,
        maritalStatus:maritalStatus,
        gender:gender,
        username:username,
        password:password
    }
    console.log(username)
    try{
        const check = await collection1.findOne({username:username})
        if(check){
            console.log(check.username)
            res.json('exist')
        }
        else{
            res.json('not exist')
            await collection1.insertMany([data])

            const user = await collection1.findOne({username:username });
            res.status(200).json(user);
        }
    }
    catch(e){
        res.json('error')
    }
})

app.get('/getUserDetails/:username', async (req, res) => {
    const username = req.params.username;

    try{
        const user = await collection1.findOne({ username:username });
        if(!user){
            return res.json('User not found');
        }
        res.status(200).json(user);
    } 
    catch(e){
        console.error(e);
        res.json('Internal Server Error');
    }
});


app.listen(8000,()=>{
    console.log("port connected");
})