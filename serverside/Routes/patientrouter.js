const express = require('express')
const DocRegisters = require('../models/docRegister')
const PatientRegisters = require('../models/patientRegister')
const HospRegisters = require('../models/hospRegister')
const ODRegisters = require('../models/organdonation')
const BBRegisters = require('../models/bloodbanks')
const Appointments = require('../models/appointments')
const app = express()
require('dotenv').config();
const Feedback = require('../models/feedback')
const morgan = require('morgan')
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

/**
 * @swagger
 * tags:
 *   - name: Patient
 *     description: Operations related to patients
 */

/**
 * @swagger
 * /getUserDetails/{username}:
 *   get:
 *     tags: [Patient]
 *     summary: Get patient details
 *     description: Retrieves details of a patient by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the patient to retrieve details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with patient details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/patientRegister'
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /searchDoctors/{name}:
 *   post:
 *     tags: [Patient]
 *     summary: Search doctors by name
 *     description: Searches for doctors by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the doctor to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with matching doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/docRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.post('/searchDoctors/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const doctors = await DocRegisters.find({ name: { $regex: name, $options: 'i' } });
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /searchDoctors:
 *   post:
 *     tags: [Patient]
 *     summary: Get all doctors
 *     description: Retrieves details of all registered doctors.
 *     responses:
 *       200:
 *         description: Successful response with all doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/docRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.post('/searchDoctors', async (req, res) => {
  try {
    const doctors = await DocRegisters.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});


/**
 * @swagger
 * /bookAppointment:
 *   post:
 *     tags: [Patient]
 *     summary: Book an appointment
 *     description: Books an appointment with a doctor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/appointments'
 *     responses:
 *       200:
 *         description: Appointment booked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 username:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
router.post('/bookAppointment', async (req, res) => {
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


/**
 * @swagger
 * /organDonation:
 *   post:
 *     tags: [Patient]
 *     summary: Register for organ donation
 *     description: Registers a patient for organ donation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/organdonation'
 *     responses:
 *       200:
 *         description: Registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
router.post('/organDonation', async (req, res) => {
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

/**
 * @swagger
 * /bloodBanks:
 *   post:
 *     tags: [Patient]
 *     summary: Register for blood donation
 *     description: Registers a patient for blood donation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/bloodbanks'
 *     responses:
 *       200:
 *         description: Registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
router.post('/bloodBanks', async (req, res) => {
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

/**
 * @swagger
 * /feedback:
 *   post:
 *     tags: [Patient]
 *     summary: Submit feedback
 *     description: Allows a patient to submit feedback.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/feedback'
 *     responses:
 *       200:
 *         description: Feedback submitted successfully.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/feedback', async (req, res) => {
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

module.exports = router;