const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express()

const cors = require('cors')
const helmet = require('helmet')
app.use(cors())
app.use(helmet())

const authRouter = require('./Routes/authrouter');
const adminRouter = require('./Routes/adminrouter');
const docRouter = require('./Routes/docrouter');
const hospRouter = require('./Routes/hosprouter');
const patientRouter = require('./Routes/patientrouter');
const blogsRouter = require('./Routes/blogsrouter');
const pharmacyRouter = require('./Routes/pharmacyrouter');
app.use('/', authRouter);
app.use('/', adminRouter);
app.use('/', patientRouter);
app.use('/', docRouter);
app.use('/', hospRouter);
app.use('/', blogsRouter);
app.use('/', pharmacyRouter);

const swaggerOptions = require('./swaggerOptions');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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