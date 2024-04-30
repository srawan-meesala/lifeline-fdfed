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
const router = express.Router()

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

router.get('/getUserDetails/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const user = await PatientRegisters.findOne({ username: username });
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

app.post('/searchDoctors/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const doctors = await DocRegisters.find({ name: { $regex: name, $options: 'i' } });
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/searchDoctors', async (req, res) => {
  try {
    const doctors = await DocRegisters.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/bookAppointment', async (req, res) => {
  const { docID, patientName, date, time, mobileNumber, note } = req.body;
  const user = await PatientRegisters.findOne({ username: patientName })
  const doc = await DocRegisters.findOne({ docID: docID })
  const hosp = await HospRegisters.findOne({ hospName: doc.hospName })
  const username = patientName
  const hospID = hosp.hospID
  const hospName = hosp.hospName
  const fee = doc.fee
  try {
    const newAppointment = new Appointments({
      docID: docID,
      docName: doc.name,
      hospID: hospID,
      hospName: hospName,
      Username: username,
      PatientName: user.firstName,
      Date: date,
      Timeslot: time,
      Contact: mobileNumber,
      Fee: fee,
      Note: note
    });
    await newAppointment.save();
    res.status(200).json({ status: 'created', username: username });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/organDonation', async (req, res) => {
  const { username, name, aadhaar, gender, donation, particular, past } = req.body
  try {
    const check = await ODRegisters.findOne({ username });

    if (check) {
      return res.json('exist');
    }
    const data = new ODRegisters({
      username, name, aadhaar, gender, donation, particular, past
    });
    await data.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/bloodBanks', async (req, res) => {
  const { username, name, aadhar, gender, bloodGroup, age, past } = req.body
  try {
    const check = await BBRegisters.findOne({ username });
    if (check) {
      return res.json('exist');
    }
    const data = new BBRegisters({
      username, name, aadhar, gender, bloodGroup, age, past
    });
    await data.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/feedback', async (req, res) => {
  const { name, mailID, message } = req.body
  try {
    const feedback = new Feedback({
      name, mailID, message
    })
    await feedback.save()
    res.json('filled')
  }
  catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})