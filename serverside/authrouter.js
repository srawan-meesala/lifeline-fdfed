const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const DocRegisters = require('./models/docRegister')
const PatientRegisters = require('./models/patientRegister')
const HospRegisters = require('./models/hospRegister')
const AdminRegisters = require('./models/admin')
const ODRegisters = require('./models/organdonation')
const BBRegisters = require('./models/bloodbanks')
const Appointments = require('./models/appointments')
const Blogs = require('./models/blogs')
const PharmacyCart = require('./models/pharmacyCart')
const app = express()
require('dotenv').config();
const Feedback = require('./models/feedback')
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

const filetoStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./doc-certificates`);
  },
  filename: async (req, file, cb) => {
    try {
      const doc = await DocRegisters.findOne().sort({ _id: -1 });
      const new_id = doc ? doc.docID + 1 : 1;
      const ext = file.originalname.split('.').pop();
      const filename = `doc_${new_id}_certificate.${ext}`;
      cb(null, filename);
    } catch (err) {
      console.log(err);
      cb(err);
    }
  },
});

const filetoStorageEngine2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./hosp-certificates`);
  },
  filename: async (req, file, cb) => {
    try {
      const hosp = await HospRegisters.findOne().sort({ _id: -1 });
      const new_id = hosp ? hosp.hospID + 1 : 1;
      const ext = file.originalname.split('.').pop();
      const filename = `hosp_${new_id}_certificate.${ext}`;
      cb(null, filename);
    } catch (err) {
      console.log(err);
      cb(err);
    }
  },
});

const upload = multer({ storage: filetoStorageEngine })
const upload2 = multer({ storage: filetoStorageEngine2 })

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('OOPs! Something broke');
  });

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
    catch(error){
      next(error)
    }
});
  
router.post('/patientRegister', async (req, res, next) => {
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
    }
    catch(error){
      next(error)
    }
});
  
router.post('/docRegister', upload.single('file'), async (req, res, next) => {
  const { name, mobileNumber, mailID, hospID, specialization, fee } = req.body;
  const filepath = req.file.path;

  try {
      const check = await DocRegisters.findOne({ mailID });
      const hospital = await HospRegisters.findOne({ hospID: hospID });
      const hospName = hospital.hospName;
      const city = hospital.city;
      
      if (check) {
          return res.json('exist');
      }

      const verificationToken = uuid.v4();
      const data = new DocRegisters({
          name,
          mobileNumber,
          mailID,
          hospName,
          hospID,
          city,
          specialization,
          filepath,
          fee,
          verificationToken
      });

      await data.save();

      const verificationLink = `http://localhost:3000/sent2`;
      sendVerificationEmail(mailID, verificationLink);
      res.status(200).json({ message: 'Registration successful. Please Wait for response mail from the respective Hospital.', verificationToken });
  } catch (error) {
      next(error);
  }
});
 
router.post('/hospRegister',upload2.single('file'), async (req, res, next) => {
    const {
      hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation
    } = req.body;
    const filepath = req.file.path
  
    try {
      const check = await HospRegisters.findOne({ mailID });
  
      if (check) {
        return res.json('exist');
      }
  
      const verificationToken = uuid.v4();
      const data = new HospRegisters({
        hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation,filepath, verificationToken
      });
  
      await data.save();
  
      const verificationLink = `http://localhost:3000/sent2`;
      sendVerificationEmail(mailID, verificationLink);
      res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
    }
    catch(error){
      next(error)
    }
});

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



function sendVerificationEmail(to,link) {
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

module.exports = router;