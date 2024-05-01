const express = require('express')
const mongoose = require('mongoose')
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
const PharmacyCart = require('../models/pharmacyCart')
const app = express()
require('dotenv').config();
const Feedback = require('../models/feedback')
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
    cb(null, `./bloguploads`);
  },
  filename: async (req, file, cb) => {
    try {
      const blog = await Blogs.findOne().sort({ _id: -1 });
      const new_id = blog ? blog.blogID + 1 : 1;
      const ext = file.originalname.split('.').pop();
      const filename = `blog_${new_id}.${ext}`;
      cb(null, filename);
    } catch (err) {
      console.log(err);
      cb(err);
    }
  },
});

const upload = multer({ storage: filetoStorageEngine })

const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('OOPs! Something broke');
});


/**
 * @swagger
 * tags:
 *   - name: Blog
 *     description: Operations related to blogs
 */

/**
 * @swagger
 * /blogdata:
 *   get:
 *     tags: [Blog]
 *     summary: Get blog data
 *     description: Retrieves blog data by blog ID.
 *     parameters:
 *       - in: query
 *         name: blogID
 *         required: true
 *         description: ID of the blog to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with blog data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/blogs'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/blogdata', async (req, res) => {
  const { blogID } = req.query;
  try {
    const data = await Blogs.findOne({ blogID: blogID })
    console.log(data)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json('Blog not found');
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json('Internal Server Error');
  }
})


/**
 * @swagger
 * /uploadBlog:
 *   post:
 *     tags: [Blog]
 *     summary: Upload a blog
 *     description: Uploads a blog with an image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               docID:
 *                 type: string
 *               title:
 *                 type: string
 *               blog:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
router.post('/uploadBlog', upload.single('image'), async (req, res, next) => {
  const { docID, title, blog } = req.body
  const imagepath = req.file.path;
  const doc = await DocRegisters.findOne({ docID })
  const docName = doc.name
  const spec = doc.specialization
  try {
    const newBlog = new Blogs({
      docID: docID,
      docName: docName,
      specialization: spec,
      title: title,
      blog: blog,
      imagepath: imagepath
    })
    await newBlog.save();
    res.status(200).json({ status: 'uploaded' });
  }
  catch (error) {
    console.log(error)
    res.status(500).json('Internal Server Error');
  }
})

module.exports = router;