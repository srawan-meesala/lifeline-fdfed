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

router.get('/getDocDetails/:username', async (req, res) => {
  const docID = req.params.username;
  try {
    const user = await DocRegisters.findOne({ docID: docID });
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

module.exports = router;

