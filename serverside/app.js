const express = require('express')
const mongoose = require('mongoose')
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
const uuid = require('uuid')
const nodemailer = require('nodemailer')
const cors = require('cors')
const Feedback = require('./models/feedback')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/Lifeline-fdfed')
.then(()=>{
    console.log('MongoDB Connected Successfully')
})
.catch(()=>{
    console.log('Failed to connect to MongoDB')
})


app.post('/login', async (req, res) => {
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
          if (password === check.password) {
              res.status(200).json('exist');
          } else {
              res.json('invalid credentials');
          }
      } else {
          res.json('does not exist');
      }
  } catch (e) {
      res.json('error');
  }
});

app.post('/patientRegister', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/docRegister', async (req, res) => {
  const {
    name, mobileNumber, mailID, hospID, specialization, fee
  } = req.body;

  try {
    const check = await DocRegisters.findOne({ mailID });
    const hospital = await HospRegisters.findOne({hospID:hospID})
    const hospName = hospital.hospName
    const city = hospital.city
    if (check) {
      return res.json('exist');
    }

    const verificationToken = uuid.v4();
    const data = new DocRegisters({
      name, mobileNumber, mailID,hospName, hospID,city, specialization, fee, verificationToken
    });

    await data.save();

    const verificationLink = `http://localhost:3000/verifydoctor/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);

    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/hospRegister', async (req, res) => {
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
      hospName, mobileNumber, mailID, city, diagnosisCenter, bloodBanks, organDonation,verificationToken
    });

    await data.save();

    const verificationLink = `http://localhost:3000/verifyhospital/${verificationToken}`;
    sendVerificationEmail(mailID, verificationLink);
    res.status(200).json({ message: 'Registration successful. Please check your email for verification.', verificationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/verifyEmailPatient', async (req, res) => {
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

app.post('/verifyEmailDoc', async (req, res) => {
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

app.post('/verifyEmailHosp', async (req, res) => {
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

app.post('/patientRegister2', async (req, res) => {
    const { verificationToken, username, password } = req.body;  
    try {
      const data = await PatientRegisters.findOne({ verificationToken });
      const data2 = await PatientRegisters.findOne({ username });
      if(data2) {
        res.json('exists');
      } else {
        if (data) {
          data.username = username;
          data.password = password;
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

app.post('/docRegister2', async (req, res) => {
  const { verificationToken, docID, password } = req.body;  
  try {
    const data = await DocRegisters.findOne({ verificationToken });
    if (data) {
      data.docID = docID;
      data.password = password;
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

app.post('/hospRegister2', async (req, res) => {
  const { verificationToken, hospID, password } = req.body;  
  try {
    const data = await HospRegisters.findOne({ verificationToken });
    if (data) {
      data.hospID = hospID;
      data.password = password;
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


app.get('/getUserDetails/:username', async (req, res) => {
    const username = req.params.username;
    try{
        const user = await PatientRegisters.findOne({ username:username });
        if(!user){
            return res.json('User not found');
        }
        res.status(200).json(user);
    } 
    catch(e){
        console.error(e);
        res.json('Internal Server Error');
    }
});

app.get('/getAdminDetails/:username', async (req, res) => {
  const username = req.params.username;
  try{
      const user = await AdminRegisters.findOne({ username:username });
      if(!user){
          return res.json('User not found');
      }
      res.status(200).json(user);
  } 
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getDocDetails/:username', async (req, res) => {
  const docID = req.params.username;
  try{
      const user = await DocRegisters.findOne({ docID:docID });
      if(!user){
          return res.json('User not found');
      }
      res.status(200).json(user);
  } 
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getHospDetails/:username', async (req, res) => {
  const hospID = req.params.username;
  try{
      const user = await HospRegisters.findOne({ hospID:hospID });
      if(!user){
          return res.json('User not found');
      }
      res.status(200).json(user);
  } 
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getAllPatients', async (req, res) => {
  try{
      const user = await PatientRegisters.find();
      if(!user){
          return res.json('No User found');
      }
      res.status(200).json(user);
  } 
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getAllHospitals', async (req, res) => {
  try{
      const user = await HospRegisters.find();
      if(!user){
          return res.json('No Hospital found');
      }
      res.status(200).json(user);
  } 
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getAllDoctors', async (req, res) => {
  try{
      const user = await DocRegisters.find();
      if(!user){
          return res.json('No Doctor found');
      }
      res.status(200).json(user);
  } 
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getAllDonors', async (req, res) => {
  try{
      const user = await ODRegisters.find();
      if(!user){
          return res.json('No Donor found');
      }
      res.status(200).json(user);
  }
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getAllBloodDonors', async (req, res) => {
  try{
      const user = await BBRegisters.find();
      if(!user){
          return res.json('No Donor found');
      }
      res.status(200).json(user);
  }
  catch(e){
      console.error(e);
      res.json('Internal Server Error');
  }
});

app.get('/getAllAppointments', async (req, res) => {
  try{
      const user = await Appointments.find();
      if(!user){
          return res.json('No Appointment found');
      }
      res.status(200).json(user);
  }
  catch(e){
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
  const {docID} = req.params
  try {
    const blogs = await Blogs.find({docID:docID});
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/AppointmentsAPI/:docID', async (req, res) => {
  const {docID} = req.params
  try {
    const appointments = await Appointments.find({docID:docID});
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/AppointmentsAPI2/:hospID', async (req, res) => {
  const {hospID} = req.params
  try {
    const appointments = await Appointments.find({hospID:hospID});
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/AppointmentsAPI3/:username', async (req, res) => {
  const {username} = req.params
  try {
    const appointments = await Appointments.find({Username:username});
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/AppointmentsAPI/dateanddocid', async (req, res) => {
  const {docID, date} = req.params
  try {
    const appointments2 = await Appointments.find({docID:docID});
    const appointments = appointments2.find({Date:date});
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/searchDoctors', async (req, res) => {
  try {
    const { name } = req.body;
    const doctors = await DocRegisters.find({ name: { $regex: new RegExp(name, 'i') } });
    res.json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/bookAppointment', async (req, res) => {
  const {docID,patientName,date,time,mobileNumber,note} = req.body;
  const user = await PatientRegisters.findOne({firstName:patientName})
  const doc = await DocRegisters.findOne({docID:docID})
  const hosp = await HospRegisters.findOne({hospName:doc.hospName})
  const username = user.username
  const hospID = hosp.hospID
  const hospName = hosp.hospName
  const fee = doc.fee
  try {
    const newAppointment = new Appointments({
      docID:docID,
      docName:doc.name,
      hospID:hospID,
      hospName:hospName,
      Username:username,
      PatientName:patientName,
      Date:date,
      Timeslot:time,
      Contact:mobileNumber,
      Fee:fee,
      Note:note
    });
    await newAppointment.save();
    res.status(200).json({status: 'created',username:username});
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});


app.post('/uploadBlog',async(req,res)=> {
    const {docID,title,blog} = req.body
    const doc = await DocRegisters.findOne({docID})
    const docName = doc.name
    const spec = doc.specialization

    try{
      const newBlog = new Blogs({
        docID:docID,
        docName:docName,
        specialization:spec,
        title:title,
        blog:blog
      })
      await newBlog.save();
      res.status(200).json({status: 'uploaded'});
    }
    catch(error){
      console.log(error)
      res.status(500).json('Internal Server Error');
    }
})

app.get('/blogdata',async(req,res)=>{
  const {blogID} = req.query;
  try{
  const data = await Blogs.findOne({blogID:blogID})
  console.log(data)
  if(data){
  res.status(200).json(data)
    }
  }
  catch(error){
    console.log(error)
    res.status(500).json('Internal Server Error');
  }
})

app.get('/DoctorsAPI2/:hospID', async (req, res) => {
  const {hospID} = req.params
  try {
    const doctors = await DocRegisters.find({hospID:hospID});
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

app.post('/organDonation', async (req, res) => {
  const {username, name, aadhaar, gender, donation, particular, past} = req.body
  try {
    const check = await ODRegisters.findOne({ username });

    if (check) {
      return res.json('exist');
    }
    const data = new ODRegisters({
      username, name, aadhaar, gender, donation, particular, past
    });
    await data.save();
    res.status(200).json({ message: 'Registration successful'});
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/bloodBanks', async (req, res) => {
  const {username, name, aadhar, gender, bloodGroup, age, past} = req.body
  try {
    const check = await BBRegisters.findOne({ username });
    if (check) {
      return res.json('exist');
    }
    const data = new BBRegisters({
      username, name, aadhar, gender, bloodGroup, age, past
    });
    await data.save();
    res.status(200).json({ message: 'Registration successful'});
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/checkout', async (req, res) => {
  const { username, cartItems, totalPrice } = req.body;

  try {
    const newCart = new PharmacyCart({
      username,
      items: cartItems.map((item) => ({
        _id: mongoose.Types.ObjectId(),
        title: item.title,
        quantity: item.quantity,
        priceEach: item.priceEach,
      })),
    });

    await newCart.save();

    let cart = await PharmacyCart.findOne({ username });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: 'Checkout successful', cart: newCart });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/updateCartItemQuantity', async (req, res) => {
  const { username, itemId, newQuantity } = req.body;

  try {
    let cart = await PharmacyCart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for the user' });
    }

    const existingItem = cart.items.find((item) => item._id.toString() === itemId);

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    existingItem.quantity = newQuantity;

    await cart.save();

    res.json({ message: 'Item quantity updated successfully', cart });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/addToCart', async (req, res) => {
  const { username, item } = req.body;

  try {
    let cart = await PharmacyCart.findOne({ username });

    if (!cart) {
      cart = new PharmacyCart({
        username,
        items: [item],
      });
    } else {
      const existingItemIndex = cart.items.findIndex((i) => i.title === item.title);

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += 1;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();

    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to the cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/cartData', async (req, res) => {
  const { username } = req.query;

  try {
    const cart = await PharmacyCart.findOne({ username });

    if (!cart) {
      return res.json([]);
    }
    res.json(cart.items);
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/deleteuser',async(req,res)=>{
  const {enteredUsername,enteredPassword,actualusername,actualpassword} = req.body
  try{
    if(enteredUsername === actualusername && enteredPassword === actualpassword){
       await PatientRegisters.deleteOne({username : enteredUsername})
      res.json('deleted')
    }
    else{
      res.json('mismatched')
    }
  }
  catch(error){
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

app.post('/deletedoc',async(req,res)=>{
  const {entereddocID,enteredPassword,actualdocID,actualpassword} = req.body
  try{
    if(entereddocID === actualdocID && enteredPassword === actualpassword){
       await DocRegisters.deleteOne({docID : entereddocID})
      res.json('deleted')
    }
    else{
      res.json('mismatched')
    }
  }
  catch(error){
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

app.post('/deletehosp',async(req,res)=>{
  const {enteredhospID,enteredPassword,actualhospID,actualPassword} = req.body
  try{
    if(enteredhospID === actualhospID && enteredPassword === actualPassword){
       await HospRegisters.deleteOne({hospID : enteredhospID})
      res.json('deleted')
    }
    else{
      res.json('mismatched')
    }
  }
  catch(error){
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

app.post('/feedback',async(req,res)=>{
  const {name,mailID,message} = req.body
  try{
    const feedback = new Feedback({
      name,mailID,message
  })
    await feedback.save()
    res.json('filled')
  }
  catch(error){{
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

  }
})

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
    text: `Click the following link to verify your email: ${link}`,
    };
        
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending verification email:', error);
      }
    });
}

app.post('/api/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;

  const newFeedback = new Feedback({
    name,
    email,
    message,
  });

  newFeedback.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving feedback');
    } else {
      res.status(200).send('Feedback submitted successfully');
    }
  });
});


app.listen(8000,()=>{
    console.log("port connected to 8000");
})