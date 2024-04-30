const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const DocRegisters = require('../models/docRegister')
const PatientRegisters = require('../models/patientRegister')
const HospRegisters = require('../models/hospRegister')
const AdminRegisters = require('../models/admin')
const ODRegisters = require('../models/organdonation')
const BBRegisters = require('../models/bloodbanks')
const Appointments = require('../models/appointments')
const Blogs = require('../models/blogs')
const PharmacyCart = require('../models/pharmacyCart')
const app = express()
require('dotenv').config();
const Feedback = require('../models/feedback')
const cors = require('cors')
const morgan = require('morgan')
const multer = require('multer')
const helmet = require('helmet')
const authRouter = require('./authrouter');
const adminRouter = require('./adminrouter');
const patientRouter = require('./patientrouter');
const docRouter = require('./docrouter');
const hospRouter = require('./hosprouter');
app.use('/bloguploads', express.static('bloguploads'));
app.use('/doc-certificates', express.static('doc-certificates'));
app.use('/hosp-certificates', express.static('hosp-certificates'));
app.use(morgan('dev'))
app.use(express.json())

const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('OOPs! Something broke');
});

router.get('/getHospDetails/:username', async (req, res) => {
  const hospID = req.params.username;
  try {
    const user = await HospRegisters.findOne({ hospID: hospID });
    if (!user) {
      return res.json('User not found');
    }
    res.status(200).json(user);
  }
  catch (e) {
    console.error(e);
    res.json('Internal Server Error');
  }
});

router.get('/registeredDoctors/:id', async (req, res) => {
  const hospID = req.params.id
  try {
    const doctors = await DocRegisters.find({ hospID: hospID, approvalStatus: 'pending' });
    console.log(doctors)
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/approveDoctor/:id', async (req, res) => {
  const mailID = req.params.id
  try {
    const doctor = await DocRegisters.findOne({ mailID: mailID });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    doctor.approvalStatus = 'Approved';
    await doctor.save();
    const verificationLink = `http://localhost:3000/verifydoctor/${doctor.verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.json(doctor);
  } catch (error) {
    console.error('Error approving/declining doctor:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/declineDoctor/:id', async (req, res) => {
  const mailID = req.params.id
  try {
    const doctor = await DocRegisters.findOne({ mailID: mailID });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    doctor.approvalStatus = 'Declined';
    await doctor.save();
    sendVerificationEmail2(mailID);

    res.json(doctor);
  } catch (error) {
    console.error('Error approving/declining doctor:', error);
    res.status(500).json({ message: 'Server Error' });
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
    text: `Your Approval Has been successful.
          Please Click the following link to continue: ${link}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending verification email:', error);
    }
  });
}

function sendVerificationEmail2(to) {
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
    text: `Your Request to join Lifeline Has been Declined by the admin.
            `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending verification email:', error);
    }
  });
}

module.exports = router;
