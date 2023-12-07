const express = require('express')
const mongoose = require('mongoose')
const DocRegisters = require('./models/docRegister')
const PatientRegisters = require('./models/patientRegister')
const HospRegisters = require('./models/hospRegister')
const Appointments = require('./models/appointments')
const Blogs = require('./models/blogs')
const app = express()
require('dotenv').config();
const uuid = require('uuid')
const nodemailer = require('nodemailer')
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/Lifeline-fdfed')
.then(()=>{
    console.log('MongoDB Connected Successfully')
})
.catch(()=>{
    console.log('Failed to connect to MongoDB')
})


app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  try {
      let check;
      if (type === 'patient') {
          check = await PatientRegisters.findOne({ username });
      } else if (type === 'doctor') {
          check = await DocRegisters.findOne({ docID: username });
      } else if (type === 'hospital') {
          check = await HospRegisters.findOne({ hospID: username });
      }
      if (check) {
          if (password === check.password) {
              res.status(200).json('exist');
          } else {
              res.json('invalid credentials');
          }
      } else {
          res.json('does not exist');
      }
  } catch (e) {
      res.json('error');
  }
});

app.post('/patientRegister', async (req, res) => {
  const {
    firstName, lastName, mobileNumber, mailID, dob, occupation, bloodGroup, maritalStatus, gender
  } = req.body;

  try {
    const check = await PatientRegisters.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new PatientRegisters({
      firstName, lastName, mobileNumber, mailID, dob, occupation, bloodGroup, maritalStatus, gender, verificationToken
    });

    await data.save();

    const verificationLink = `http://localhost:3000/verifypatient/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/docRegister', async (req, res) => {
  const {
    name, mobileNumber, mailID, hospID, specialization, fee
  } = req.body;

  try {
    const check = await DocRegisters.findOne({ mailID });
    const hospital = await HospRegisters.findOne({hospID:hospID})
    const hospName = hospital.hospName
    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new DocRegisters({
      name, mobileNumber, mailID,hospName, hospID, specialization, fee, verificationToken
    });

    await data.save();

    const verificationLink = `http://localhost:3000/verifydoctor/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/hospRegister', async (req, res) => {
  const {
    hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation
  } = req.body;

  try {
    const check = await HospRegisters.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new HospRegisters({
      hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation,verificationToken
    });

    await data.save();

    const verificationLink = `http://localhost:3000/verifyhospital/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);
    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/verifyEmailPatient', async (req, res) => {
    const { verificationToken } = req.body;
    try {
      const data = await PatientRegisters.findOne({ verificationToken });
  
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

app.post('/verifyEmailDoc', async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const data = await DocRegisters.findOne({ verificationToken });

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

app.post('/verifyEmailHosp', async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const data = await HospRegisters.findOne({ verificationToken });

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
      const data = await PatientRegisters.findOne({ verificationToken });
      const data2 = await PatientRegisters.findOne({ username });
      if(data2) {
        res.json('exists');
      } else {
        if (data) {
          data.username = username;
          data.password = password;
          await data.save();
          res.json('registered');
        } else {
          res.json('invalid-token');
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error.');
    }
});

app.post('/docRegister2', async (req, res) => {
  const { verificationToken, docID, password } = req.body;  
  try {
    const data = await DocRegisters.findOne({ verificationToken });
    if (data) {
      data.docID = docID;
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

app.post('/hospRegister2', async (req, res) => {
  const { verificationToken, hospID, password } = req.body;  
  try {
    const data = await HospRegisters.findOne({ verificationToken });
    if (data) {
      data.hospID = hospID;
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


app.get('/getUserDetails/:username', async (req, res) => {
    const username = req.params.username;
    try{
        const user = await PatientRegisters.findOne({ username:username });
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

app.get('/getDocDetails/:username', async (req, res) => {
  const docID = req.params.username;
  try{
      const user = await DocRegisters.findOne({ docID:docID });
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

app.get('/getHospDetails/:username', async (req, res) => {
  const hospID = req.params.username;
  try{
      const user = await HospRegisters.findOne({ hospID:hospID });
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

app.get('/hospitalsAPI', async (req, res) => {
  try {
    const hospitals = await HospRegisters.find();
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/doctorsAPI', async (req, res) => {
  try {
    const doctors = await DocRegisters.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/searchDoctors', async (req, res) => {
  try {
    const { name } = req.body;
    const doctors = await DocRegisters.find({ name: { $regex: new RegExp(name, 'i') } });
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/bookAppointment', async (req, res) => {
  const {docID,patientName,date,time,mobileNumber,note} = req.body;
  const user = await PatientRegisters.findOne({firstName:patientName})
  const doc = await DocRegisters.findOne({docID:docID})
  const hosp = await HospRegisters.findOne({hospName:doc.hospName})
  const username = user.username
  const hospID = hosp.hospID
  const fee = doc.fee
  try {
    const newAppointment = new Appointments({
      docID:docID,
      hospID:hospID,
      Username:username,
      PatientName:patientName,
      Date:date,
      Timeslot:time,
      Contact:mobileNumber,
      Fee:fee,
      Note:note
    });
    await newAppointment.save();
    res.status(200).json({status: 'created',username:username});
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/uploadBlog',async(req,res)=> {
    const {docID,title,blog} = req.body
    const doc = await DocRegisters.findOne({docID})
    const docName = doc.docName
    const spec = doc.specialization

    try{
      const newBlog = new Blogs({
        docID:docID,
        docName:docName,
        specialization:spec,
        title:title,
        blog:blog
      })
      await newBlog.save();
      res.status(200).json({status: 'uploaded'});
    }
    catch(e){
      console.log(error)
      res.status(500).json('Internal Server Error');
    }
})


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