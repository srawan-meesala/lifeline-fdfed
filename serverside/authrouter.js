const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const multer = require('multer')
const uuid = require('uuid')
const nodemailer = require('nodemailer')
const PatientRegisters = require('./models/patientRegister');
const DocRegisters = require('./models/docRegister');
const HospRegisters = require('./models/hospRegister');
const AdminRegisters = require('./models/admin');

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

const upload = multer({ storage: filetoStorageEngine })

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

      const verificationLink = `http://localhost:3000/verifydoctor/${verificationToken}`;
      sendVerificationEmail(mailID, verificationLink);
      res.status(200).json({ message: 'Registration successful. Please Wait for response mail from the respective Hospital.', verificationToken });
  } catch (error) {
      next(error);
  }
});
 
router.post('/hospRegister', async (req, res, next) => {
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
        hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation, verificationToken
      });
  
      await data.save();
  
      const verificationLink = `http://localhost:3000/verifyhospital/${verificationToken}`;
      sendVerificationEmail(mailID, verificationLink);
      res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
    }
    catch(error){
      next(error)
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
    text: `Registration Pending.Please wait for the response mail from the hospital`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending verification email:', error);
    }
  });
}

module.exports = router;