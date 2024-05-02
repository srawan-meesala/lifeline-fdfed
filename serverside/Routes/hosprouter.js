const express = require('express')
const nodemailer = require('nodemailer')
const DocRegisters = require('../models/docRegister')
const HospRegisters = require('../models/hospRegister')
const app = express()
require('dotenv').config();
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
 *   - name: Hospital
 *     description: Operations related to hospitals
 */

/**
 * @swagger
 * /getHospDetails/{username}:
 *   get:
 *     tags: [Hospital]
 *     summary: Retrieve details of a hospital by username
 *     description: Retrieve details of a hospital based on its username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the hospital to retrieve details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with hospital details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './components/schemas/HospDetails'
 *       404:
 *         description: Hospital not found.
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /registeredDoctors/{id}:
 *   get:
 *     tags: [Hospital]
 *     summary: Retrieve list of doctors registered with a hospital
 *     description: Retrieve the list of doctors who are registered with a hospital but pending approval.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hospital.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './components/schemas/Doctor'
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /approveDoctor/{id}:
 *   put:
 *     tags: [Hospital]
 *     summary: Approve a doctor's registration
 *     description: Approve a doctor's registration and send a verification email.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to approve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the approved doctor's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './components/schemas/Doctor'
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/approveDoctor/:id', async (req, res) => {
  const mailID = req.params.id
  try {
    const doctor = await DocRegisters.findOne({ mailID: mailID });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    doctor.approvalStatus = 'Approved';
    await doctor.save();
    const verificationLink = `lifeline-care.vercel.app/verifydoctor/${doctor.verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.json(doctor);
  } catch (error) {
    console.error('Error approving/declining doctor:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /declineDoctor/{id}:
 *   put:
 *     tags: [Hospital]
 *     summary: Decline a doctor's registration
 *     description: Decline a doctor's registration and send a notification email.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to decline.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the declined doctor's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './components/schemas/Doctor'
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal Server Error.
 */
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