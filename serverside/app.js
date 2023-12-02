const express = require('express')
const mongoose = require('mongoose')
const Collection2 = require('./models/collection2')
const app = express()
const uuid = require('uuid')
const nodemailer = require('nodemailer')
const cors = require('cors')
const Collection3 = require('./models/collection3')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/Lifeline-fdfed')
.then(()=>{
    console.log('MongoDB Connected Successfully')
})
.catch(()=>{
    console.log('Failed to connect to MongoDB')
})



app.post('/login',async(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    try{
        const check = await Collection3.findOne({username:username})
        if(check){
            if(password == check.password){
                res.status(200).json(check);
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

app.post('/patientRegister', async (req, res) => {
  const {
    firstName, lastName, mobileNumber, mailID, dob, occupation, bloodGroup, maritalStatus, gender
  } = req.body;

  try {
    const check = await Collection3.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new Collection3({
      firstName, lastName, mobileNumber, mailID, dob, occupation, bloodGroup, maritalStatus, gender, verificationToken
    });

    await data.save();

    const verificationLink = `http://localhost:3000/verify/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});


app.post('/verifyEmail', async (req, res) => {
    const { verificationToken } = req.body;
    console.log(verificationToken)
    try {
      const data = await Collection3.findOne({ verificationToken });
  
      if (data) {
        data.verificationStatus = true;
        await data.save();
        res.json('verified');
      } else {
        res.json('invalid-token');
      }
    } 
    catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
});

app.post('/patientRegister2', async (req, res) => {
    const { verificationToken, username, password } = req.body;  
    try {
      const data = await Collection3.findOne({ verificationToken });
      if (data) {
        data.username = username;
        data.password = password;
        await data.save();
        res.json('registered');
      } else {
        res.json('invalid-token');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
});

app.post('/docRegister',async(req,res)=>{
    const name = req.body.name
    const mobileNumber = req.body.mobileNumber
    const mailID = req.body.mailID
    const hospital = req.body.hospital
    const specialization = req.body.specialization
    const fee = req.body.fee
    const docID = req.body.docID
    const password = req.body.password
    const data = {
        name:name,
        mobileNumber:mobileNumber,
        mailID:mailID,
        hospname:hospital,
        specialization:specialization,
        fee:fee,
        docID:docID,
        password:password
    }
    try{
        const check = await Collection2.findOne({docID:docID})
        if(check){
            res.json('exist')
        }
        else{
            res.json('not exist')
            await Collection2.insertMany([data])
            const user = await Collection2.findOne({docID:docID });
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
        const user = await Collection3.findOne({ username:username });
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


        


function sendVerificationEmail(to, link) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      },
    });
        
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: ${link}`,
    };
        
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending verification email:', error);
      }
    });
}

app.listen(8000,()=>{
    console.log("port connected to 8000");
})