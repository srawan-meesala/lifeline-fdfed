const express = require('express')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const DocRegisters = require('../models/docRegister')
const PatientRegisters = require('../models/patientRegister')
const HospRegisters = require('../models/hospRegister')
const AdminRegisters = require('../models/admin')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

require('dotenv').config();
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid')
const { initializeApp } = require('firebase/app')
const { getStorage, ref, uploadBytes } = require('firebase/storage')
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}
app.use('/bloguploads', express.static('bloguploads'));
app.use('/doc-certificates', express.static('doc-certificates'));
app.use('/hosp-certificates', express.static('hosp-certificates'));
app.use(morgan('dev'))
app.use(express.json())

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const filetoStorageEngine = multer.memoryStorage();


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

const upload = multer({ storage: filetoStorageEngine })

const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('OOPs! Something broke');
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login
 *     description: Authenticates a user based on provided username, password, and user type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [patient, doctor, hospital, admin]
 *     responses:
 *       200:
 *         description: User exists and credentials are valid.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: User does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/login', async (req, res, next) => {
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
    } else if (type === 'admin') {
      check = await AdminRegisters.findOne({ username: username });
    }
    if (check) {
      const passwordCheck = await bcrypt.compare(password, check.password);
      if (passwordCheck) {
        res.status(200).json('exist');
      } else {
        res.json('invalid credentials');
      }
    } else {
      res.json('does not exist');
    }
  }
  catch (error) {
    next(error)
  }
});

/**
 * @swagger
 * /patientRegister:
 *   post:
 *     tags: [Authentication]
 *     summary: Register Patient
 *     description: Registers a new patient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientRegisters'
 *     responses:
 *       200:
 *         description: Registration successful.
 *       400:
 *         description: Invalid request body or parameters.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/patientRegister', async (req, res, next) => {
  console.log(req.body);
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

    const verificationLink = `lifeline-care.vercel.app/verifypatient/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  }
  catch (error) {
    next(error)
  }
});

/**
 * @swagger
 * /docRegister:
 *   post:
 *     tags: [Authentication]
 *     summary: Register Doctor
 *     description: Registers a new doctor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/DocRegisters'
 *     responses:
 *       200:
 *         description: Registration successful.
 *       400:
 *         description: Invalid request body or parameters.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/docRegister', upload.single('file'), async (req, res, next) => {
  const { name, mobileNumber, mailID, hospID, specialization, fee } = req.body;

  try {
    const check = await DocRegisters.findOne({ mailID });
    const hospital = await HospRegisters.findOne({ hospID: hospID });
    const hospName = hospital.hospName;
    const city = hospital.city;

    if (check) {
      return res.json('exist');
    }

    // Upload certificate to Firebase Storage
    const file = req.file;
    const certificateRef = ref(storage, `doctor_certificates/${file.originalname}${name}`);
    await uploadBytes(certificateRef, file.buffer);
    const filepath = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/doctor_certificates/${file.originalname}${name}`;

    const verificationToken = uuid.v4();
    const data = new DocRegisters({
      name,
      mobileNumber,
      mailID,
      hospName,
      hospID,
      city,
      specialization,
      filepath, // Save certificate URL to MongoDB
      fee,
      verificationToken
    });

    await data.save();

    const verificationLink = `lifeline-care.vercel.app/sent2`;
    sendVerificationEmail(mailID, verificationLink, );
    res.status(200).json({ message: 'Registration successful. Please Wait for response mail from the respective Hospital.', verificationToken });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /hospRegister:
 *   post:
 *     tags: [Authentication]
 *     summary: Register Hospital
 *     description: Registers a new hospital.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/HospRegisters'
 *     responses:
 *       200:
 *         description: Registration successful.
 *       400:
 *         description: Invalid request body or parameters.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/hospRegister', upload.single('file'), async (req, res, next) => {
  const {
    hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation
  } = req.body;

  try {
    const check = await HospRegisters.findOne({ mailID });

    if (check) {
      return res.json('exist');
    }

    const file = req.file;
    const certificateRef = ref(storage, `hospital_certificates/${file.originalname}${hospName}`);
    await uploadBytes(certificateRef, file.buffer);
    const filepath = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/hospital_certificates/${file.originalname}${hospName}`;

    const verificationToken = uuid.v4();
    const data = new HospRegisters({
      hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation, filepath, verificationToken
    });

    await data.save();

    const verificationLink = `lifeline-care.vercel.app/sent2`;
    sendVerificationEmail(mailID, verificationLink);
    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  }
  catch (error) {
    next(error)
  }
});

/**
 * @swagger
 * /verifyEmailPatient:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify Patient Email
 *     description: Verifies the email of a registered patient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Verification token not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/verifyEmailPatient', async (req, res) => {
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

/**
 * @swagger
 * /verifyEmailDoc:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify Doctor Email
 *     description: Verifies the email of a registered doctor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Verification token not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/verifyEmailDoc', async (req, res) => {
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

/**
 * @swagger
 * /verifyEmailHosp:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify Hospital Email
 *     description: Verifies the email of a registered hospital.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Verification token not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/verifyEmailHosp', async (req, res) => {
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

/**
 * @swagger
 * /patientRegister2:
 *   post:
 *     tags: [Authentication]
 *     summary: Complete Patient Registration
 *     description: Completes the registration process for a patient by setting username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationToken:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration completed successfully.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Verification token not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/patientRegister2', async (req, res) => {
  const { verificationToken, username, password } = req.body;
  try {
    const data = await PatientRegisters.findOne({ verificationToken });
    const data2 = await PatientRegisters.findOne({ username });
    if (data2) {
      res.json('exists');
    } else {
      if (data) {
        const saltrounds = 10
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        data.username = username;
        data.password = hashedPassword;
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

/**
 * @swagger
 * /docRegister2:
 *   post:
 *     tags: [Authentication]
 *     summary: Complete Doctor Registration
 *     description: Completes the registration process for a doctor by setting doctor ID and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationToken:
 *                 type: string
 *               docID:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration completed successfully.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Verification token not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/docRegister2', async (req, res) => {
  const { verificationToken, docID, password } = req.body;
  try {
    const data = await DocRegisters.findOne({ verificationToken });
    if (data) {
      const saltrounds = 10
      const hashedPassword = await bcrypt.hash(password, saltrounds);
      data.docID = docID;
      data.password = hashedPassword;
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

/**
 * @swagger
 * /hospRegister2:
 *   post:
 *     tags: [Authentication]
 *     summary: Complete Hospital Registration
 *     description: Completes the registration process for a hospital by setting hospital ID and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationToken:
 *                 type: string
 *               hospID:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration completed successfully.
 *       400:
 *         description: Invalid request body or parameters.
 *       404:
 *         description: Verification token not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/hospRegister2', async (req, res) => {
  const { verificationToken, hospID, password } = req.body;
  try {
    const data = await HospRegisters.findOne({ verificationToken });
    if (data) {
      const saltrounds = 10
      const hashedPassword = await bcrypt.hash(password, saltrounds);
      data.hospID = hospID;
      data.password = hashedPassword;
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

module.exports = router;