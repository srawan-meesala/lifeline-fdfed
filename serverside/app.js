const express = require('express')
const mongoose = require('mongoose')
const Collection2 = require('./models/docRegister')
const Collection3 = require('./models/patientRegister')
const Collection4 = require('./models/hospRegister')
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
          check = await Collection3.findOne({ username });
      } else if (type === 'doctor') {
          check = await Collection2.findOne({ docID: username });
      } else if (type === 'hospital') {
          check = await Collection4.findOne({ hospID: username });
      }
      console.log(check)
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
    const check = await Collection3.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new Collection3({
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
    name, mobileNumber, mailID, hospName, specialization, fee
  } = req.body;

  try {
    const check = await Collection2.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new Collection2({
      name, mobileNumber, mailID, hospName, specialization, fee, verificationToken
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
    const check = await Collection4.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new Collection4({
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

app.post('/verifyEmailDoc', async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const data = await Collection2.findOne({ verificationToken });

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
    const data = await Collection4.findOne({ verificationToken });

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

app.post('/docRegister2', async (req, res) => {
  const { verificationToken, docID, password } = req.body;  
  try {
    const data = await Collection2.findOne({ verificationToken });
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
    const data = await Collection4.findOne({ verificationToken });
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

app.get('/hospitalsAPI', async (req, res) => {
  try {
    const hospitals = await Collection4.find();
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/doctorsAPI', async (req, res) => {
  try {
    const doctors = await Collection2.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    res.status(500).send('Internal Server Error');
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