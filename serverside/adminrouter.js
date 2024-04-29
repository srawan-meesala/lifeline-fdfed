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

app.get('/getAdminDetails/:username', async (req, res) => {
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

  app.get('/getAllPatients', async (req, res) => {
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

  app.get('/getAllHospitals', async (req, res) => {
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
  
  app.get('/getAllDoctors', async (req, res) => {
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
  
  app.get('/getAllDonors', async (req, res) => {
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
  
  app.get('/getAllBloodDonors', async (req, res) => {
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
  
  app.get('/getAllAppointments', async (req, res) => {
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

  app.get('/hospitalsAPI', async (req, res) => {
    try {
      const hospitals = await HospRegisters.find();
      res.json(hospitals);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/doctorsAPI', async (req, res) => {
    try {
      const doctors = await DocRegisters.find();
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/blogAPI', async (req, res) => {
    try {
      const blogs = await Blogs.find();
      res.json(blogs);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/blogsAPI/:docID', async (req, res) => {
    const { docID } = req.params
    try {
      const blogs = await Blogs.find({ docID: docID });
      res.json(blogs);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/AppointmentsAPI/:docID', async (req, res) => {
    const { docID } = req.params
    try {
      const appointments = await Appointments.find({ docID: docID });
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/AppointmentsAPI2/:hospID', async (req, res) => {
    const { hospID } = req.params
    try {
      const appointments = await Appointments.find({ hospID: hospID });
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/AppointmentsAPI3/:username', async (req, res) => {
    const { username } = req.params
    try {
      const appointments = await Appointments.find({ Username: username });
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/AppointmentsAPI4/dateanddocid', async (req, res) => {
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
  
  app.get('/AppointmentsAPIdoc/:docID', async (req, res) => {
    const { docID } = req.params
    try {
      const appointments2 = await Appointments.find({ docID: docID });
      res.json(appointments2);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/DoctorsAPI2/:hospID', async (req, res) => {
    const { hospID } = req.params
    try {
      const doctors = await DocRegisters.find({ hospID: hospID });
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/getTotalExpenditure/:username', async (req, res) => {
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
  
  app.get('/getTotalExpenditure2/:docID', async (req, res) => {
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
  
  app.get('/getTotalExpenditure3/:hospID', async (req, res) => {
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

  app.get('/registeredHosps', async (req, res) => {
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