const express = require('express')
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
 *   - name: Admin
 *     description: Operations related to admin functionalities
 */

/**
 * @swagger
 * /getAdminDetails/{username}:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin details
 *     description: Retrieves admin details by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the admin to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with admin details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/admin'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAdminDetails/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const user = await AdminRegisters.findOne({ username: username });
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
 * /getAllPatients:
 *   get:
 *     tags: [Admin]
 *     summary: Get all patients
 *     description: Retrieves all registered patients.
 *     responses:
 *       200:
 *         description: Successful response with patient details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/patientRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAllPatients', async (req, res) => {
  try {
    const user = await PatientRegisters.find();
    if (!user) {
      return res.json('No User found');
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
 * /getAllHospitals:
 *   get:
 *     tags: [Admin]
 *     summary: Get all hospitals
 *     description: Retrieves a list of all hospitals.
 *     responses:
 *       200:
 *         description: Successful response with list of hospitals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/hospRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAllHospitals', async (req, res) => {
  try {
    const user = await HospRegisters.find();
    if (!user) {
      return res.json('No Hospital found');
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
 * /getAllDoctors:
 *   get:
 *     tags: [Admin]
 *     summary: Get all doctors
 *     description: Retrieves a list of all registered doctors.
 *     responses:
 *       200:
 *         description: Successful response with list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/docRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAllDoctors', async (req, res) => {
  try {
    const user = await DocRegisters.find();
    if (!user) {
      return res.json('No Doctor found');
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
 * /getAllDonors:
 *   get:
 *     tags: [Admin]
 *     summary: Get all organ donors
 *     description: Retrieves a list of all organ donors.
 *     responses:
 *       200:
 *         description: Successful response with list of organ donors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/organdonation'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAllDonors', async (req, res) => {
  try {
    const user = await ODRegisters.find();
    if (!user) {
      return res.json('No Donor found');
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
 * /getAllBloodDonors:
 *   get:
 *     tags: [Admin]
 *     summary: Get all blood donors
 *     description: Retrieves a list of all blood donors.
 *     responses:
 *       200:
 *         description: Successful response with list of blood donors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/bloodbanks'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAllBloodDonors', async (req, res) => {
  try {
    const user = await BBRegisters.find();
    if (!user) {
      return res.json('No Donor found');
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
 * /getAllAppointments:
 *   get:
 *     tags: [Admin]
 *     summary: Get all appointments
 *     description: Retrieves a list of all appointments.
 *     responses:
 *       200:
 *         description: Successful response with list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/appointments'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getAllAppointments', async (req, res) => {
  try {
    const user = await Appointments.find();
    if (!user) {
      return res.json('No Appointment found');
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
 * /hospitalsAPI:
 *   get:
 *     tags: [Admin]
 *     summary: Get all hospitals via API
 *     description: Retrieves a list of all hospitals via API.
 *     responses:
 *       200:
 *         description: Successful response with list of hospitals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/hospRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/hospitalsAPI', async (req, res) => {
  try {
    const hospitals = await HospRegisters.find();
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/doctorsAPI', async (req, res) => {
  try {
    const doctors = await DocRegisters.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /blogAPI:
 *   get:
 *     tags: [Admin]
 *     summary: Get all blogs
 *     description: Retrieves a list of all blogs.
 *     responses:
 *       200:
 *         description: Successful response with list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/blogs'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/blogAPI', async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /blogAPI/{docID}:
 *   get:
 *     tags: [Admin]
 *     summary: Get blogs by doctor ID
 *     description: Retrieves a list of blogs written by a specific doctor based on their ID.
 *     parameters:
 *       - in: path
 *         name: docID
 *         required: true
 *         description: ID of the doctor whose blogs are to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with list of blogs by the specified doctor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/blogs'
 *       404:
 *         description: No blogs found for the specified doctor ID.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/blogsAPI/:docID', async (req, res) => {
  const { docID } = req.params
  try {
    const blogs = await Blogs.find({ docID: docID });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /AppointmentsAPI/{docID}:
 *   parameters:
 *     - in: path
 *       name: docID
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the doctor to retrieve appointments for.
 *   get:
 *     tags: [Admin]
 *     summary: Get appointments by doctor ID
 *     description: Retrieves a list of appointments for the specified doctor ID.
 *     responses:
 *       200:
 *         description: Successful response with list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/appointments'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/AppointmentsAPI/:docID', async (req, res) => {
  const { docID } = req.params
  try {
    const appointments = await Appointments.find({ docID: docID });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /AppointmentsAPI2/{hospID}:
 *   get:
 *     tags: [Admin]
 *     summary: Get appointments by hospital ID
 *     description: Retrieves a list of appointments for a specific hospital based on the hospital ID.
 *     parameters:
 *       - in: path
 *         name: hospID
 *         required: true
 *         description: ID of the hospital to retrieve appointments for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/appointments'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/AppointmentsAPI2/:hospID', async (req, res) => {
  const { hospID } = req.params
  try {
    const appointments = await Appointments.find({ hospID: hospID });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /AppointmentsAPI3/{username}:
 *   get:
 *     tags: [Admin]
 *     summary: Get appointments by username
 *     description: Retrieves appointments for a specific user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose appointments are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with appointments for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/appointments'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/AppointmentsAPI3/:username', async (req, res) => {
  const { username } = req.params
  try {
    const appointments = await Appointments.find({ Username: username });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /AppointmentsAPI4/dateanddocid:
 *   get:
 *     tags: [Admin]
 *     summary: Get appointments by date and doctor ID
 *     description: Retrieves appointments based on a specific date and doctor ID.
 *     parameters:
 *       - in: query
 *         name: docID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the doctor.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date of the appointments (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Successful response with appointments for the specified date and doctor ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/appointments'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/AppointmentsAPI4/dateanddocid', async (req, res) => {
  const { docID, date } = req.query;
  console.log(docID, date);
  try {
    const appointments = await Appointments.find({ docID: docID, Date: date });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /AppointmentsAPIdoc/{docID}:
 *   get:
 *     tags: [Admin]
 *     summary: Get appointments by doctor ID
 *     description: Retrieves appointments based on a specific doctor ID.
 *     parameters:
 *       - in: path
 *         name: docID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the doctor.
 *     responses:
 *       200:
 *         description: Successful response with appointments for the specified doctor ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/appointments'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/AppointmentsAPIdoc/:docID', async (req, res) => {
  const { docID } = req.params
  try {
    const appointments2 = await Appointments.find({ docID: docID });
    res.json(appointments2);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /DoctorsAPI2/{hospID}:
 *   get:
 *     tags: [Admin]
 *     summary: Get doctors by hospital ID
 *     description: Retrieves a list of doctors based on the provided hospital ID.
 *     parameters:
 *       - in: path
 *         name: hospID
 *         required: true
 *         description: ID of the hospital
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/docRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/DoctorsAPI2/:hospID', async (req, res) => {
  const { hospID } = req.params
  try {
    const doctors = await DocRegisters.find({ hospID: hospID });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /getTotalExpenditure/{username}:
 *   get:
 *     tags: [Admin]
 *     summary: Get total expenditure by username
 *     description: Retrieves the total expenditure of appointments made by the provided username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with total expenditure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpenditure:
 *                   type: number
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getTotalExpenditure/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const totalExpenditure = await Appointments.aggregate([
      { $match: { Username: username } },
      { $group: { _id: null, totalExpenditure: { $sum: '$Fee' } } },
    ]);

    res.json({ totalExpenditure: totalExpenditure.length > 0 ? totalExpenditure[0].totalExpenditure : 0 });
  } catch (error) {
    console.error('Error fetching total expenditure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /getTotalExpenditure2/{docID}:
 *   get:
 *     tags: [Admin]
 *     summary: Get total expenditure for a specific doctor
 *     description: Retrieves the total expenditure for appointments with a specific doctor.
 *     parameters:
 *       - in: path
 *         name: docID
 *         description: ID of the doctor
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with total expenditure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpenditure:
 *                   type: number
 *                   description: Total expenditure for appointments with the specified doctor.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getTotalExpenditure2/:docID', async (req, res) => {
  try {
    const docID = req.params.docID;
    const totalExpenditure = await Appointments.aggregate([
      { $match: { docID: docID } },
      { $group: { _id: null, totalExpenditure: { $sum: '$Fee' } } },
    ]);

    res.json({ totalExpenditure: totalExpenditure.length > 0 ? totalExpenditure[0].totalExpenditure : 0 });
  } catch (error) {
    console.error('Error fetching total expenditure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /getTotalExpenditure3/{hospID}:
 *   get:
 *     tags: [Admin]
 *     summary: Get total expenditure for a specific hospital
 *     description: Retrieves the total expenditure for appointments at a specific hospital.
 *     parameters:
 *       - in: path
 *         name: hospID
 *         description: ID of the hospital
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with total expenditure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpenditure:
 *                   type: number
 *                   description: Total expenditure for appointments at the specified hospital.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getTotalExpenditure3/:hospID', async (req, res) => {
  try {
    const hospID = req.params.hospID;
    const totalExpenditure = await Appointments.aggregate([
      { $match: { hospID: hospID } },
      { $group: { _id: null, totalExpenditure: { $sum: '$Fee' } } },
    ]);

    res.json({ totalExpenditure: totalExpenditure.length > 0 ? totalExpenditure[0].totalExpenditure : 0 });
  } catch (error) {
    console.error('Error fetching total expenditure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /registeredHosps:
 *   get:
 *     tags: [Admin]
 *     summary: Get registered hospitals awaiting approval
 *     description: Retrieves a list of registered hospitals that are pending approval.
 *     responses:
 *       200:
 *         description: Successful response with list of registered hospitals awaiting approval.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/hospRegister'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/registeredHosps', async (req, res) => {
  try {
    const hospitals = await HospRegisters.find({ approvalStatus: 'pending' });
    res.json(hospitals);
    console.log(hospitals)
  } catch (error) {
    console.error('Error fetching hospitals:', error);
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

/**
 * @swagger
 * /approveHosp/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Approve hospital registration
 *     description: Approves the registration of a hospital.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hospital's email for approval.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the approved hospital data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/hospRegister'
 *       404:
 *         description: Hospital not found.
 *       500:
 *         description: Internal Server Error.
 */
app.put('/approveHosp/:id', async (req, res) => {
  const mailID = req.params.id
  try {
    const hospital = await HospRegisters.findOne({ mailID: mailID });

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    hospital.approvalStatus = 'Approved';
    await hospital.save();
    const verificationLink = `http://localhost:3000/verifyhospital/${hospital.verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.json(hospital);
  } catch (error) {
    console.error('Error approving/declining hospital:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /admin/declineHosp/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Decline hospital approval
 *     description: Declines approval for a hospital registration request.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Hospital's email ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hospital approval declined successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/hospRegister'
 *       404:
 *         description: Hospital not found.
 *       500:
 *         description: Internal Server Error.
 */
app.put('/declineHosp/:id', async (req, res) => {
  const mailID = req.params.id
  try {
    const hospital = await HospRegisters.findOne({ mailID: mailID });

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    hospital.approvalStatus = 'Declined';
    await hospital.save();
    sendVerificationEmail2(mailID);

    res.json(hospital);
  } catch (error) {
    console.error('Error approving/declining hospital:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @swagger
 * /admin/deleteuser:
 *   post:
 *     tags: [Admin]
 *     summary: Delete user account
 *     description: Deletes a user account from the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enteredUsername:
 *                 type: string
 *               enteredPassword:
 *                 type: string
 *               actualusername:
 *                 type: string
 *               actualpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User account deleted successfully.
 *       400:
 *         description: Incorrect username or password.
 *       500:
 *         description: Internal Server Error.
 */
app.post('/deleteuser', async (req, res) => {
  const { enteredUsername, enteredPassword, actualusername, actualpassword } = req.body
  try {
    if (enteredUsername === actualusername) {
      const passwordCheck = await bcrypt.compare(enteredPassword, actualpassword);
      if (passwordCheck) {
        await PatientRegisters.deleteOne({ username: enteredUsername })
        res.json('deleted')
      } else {
        res.json('mismatched')
      }
    }
    else {
      res.json('mismatched')
    }
  }
  catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

/**
 * @swagger
 * /admin/deletedoc:
 *   post:
 *     tags: [Admin]
 *     summary: Delete doctor account
 *     description: Deletes a doctor account based on the provided doctor ID and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entereddocID:
 *                 type: string
 *               enteredPassword:
 *                 type: string
 *               actualdocID:
 *                 type: string
 *               actualpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor account successfully deleted.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Doctor account not found.
 *       500:
 *         description: Internal Server Error.
 */
app.post('/deletedoc', async (req, res) => {
  const { entereddocID, enteredPassword, actualdocID, actualpassword } = req.body
  try {
    if (entereddocID === actualdocID) {
      const passwordCheck = await bcrypt.compare(enteredPassword, actualpassword);
      if (passwordCheck) {
        await DocRegisters.deleteOne({ docID: entereddocID })
        res.json('deleted')
      } else {
        res.json('mismatched')
      }
    }
    else {
      res.json('mismatched')
    }
  }
  catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

/**
 * @swagger
 * /admin/deletehosp:
 *   post:
 *     tags: [Admin]
 *     summary: Delete hospital account
 *     description: Deletes a hospital account based on the provided hospital ID and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enteredhospID:
 *                 type: string
 *               enteredPassword:
 *                 type: string
 *               actualhospID:
 *                 type: string
 *               actualPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hospital account successfully deleted.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Hospital account not found.
 *       500:
 *         description: Internal Server Error.
 */
app.post('/deletehosp', async (req, res) => {
  const { enteredhospID, enteredPassword, actualhospID, actualPassword } = req.body
  try {
    if (enteredhospID === actualhospID) {
      const passwordCheck = await bcrypt.compare(enteredPassword, actualPassword);
      if (passwordCheck) {
        await HospRegisters.deleteOne({ hospID: enteredhospID })
        res.json('deleted')
      } else {
        res.json('mismatched')
      }
    }
    else {
      res.json('mismatched')
    }
  }
  catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;