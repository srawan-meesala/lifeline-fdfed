const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
app.use(cors())
app.use(helmet())
app.use('/', authRouter);
app.use('/', adminRouter);
app.use('/', patientRouter);
app.use('/', docRouter);
app.use('/', hospRouter);

mongoose.connect('mongodb://127.0.0.1:27017/Lifeline-fdfed')
  .then(() => {
    console.log('MongoDB Connected Successfully')
  })
  .catch(() => {
    console.log('Failed to connect to MongoDB')
  })

morgan.token('custom', (req, res) => {
  if (req.url === '/login' && req.method === 'POST') {
    const type = req.body.type || '';
    if (type === 'patient') {
      return 'Patient login request';
    } else if (type === 'doctor') {
      return 'Doctor login request';
    } else if (type === 'hospital') {
      return 'Hospital login request';
    } else if (type === 'admin') {
      return 'Admin login request';
    }
  }
  return null;
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :custom'));

app.listen(8000, () => {
  console.log("port connected to 8000");
})