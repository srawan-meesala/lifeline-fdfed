const express = require('express');
const DocRegisters = require('../models/docRegister');
const Blogs = require('../models/blogs');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require('firebase/storage');
const app = express();
require('dotenv').config();
const multer = require('multer');
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const filetoStorageEngine = multer.memoryStorage();

const upload = multer({ storage: filetoStorageEngine });

const router = express.Router();

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
 *               $ref: '#/components/schemas/Blogs'
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/blogdata', async (req, res) => {
  const { blogID } = req.query;
  try {
    const data = await Blogs.findOne({ blogID: blogID });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json('Blog not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
});

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
  const { docID, title, blog } = req.body;
  
  // Upload image to Firebase Storage
  const file = req.file;
  const imageRef = ref(storage, `blogs/${file.originalname}`);
  try {
    await uploadBytes(imageRef, file.buffer);
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    return res.status(500).json('Internal Server Error');
  }

  // Get download URL of the uploaded image
  const imageUrl = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${file.originalname}`;

  // Save blog data to MongoDB
  const doc = await DocRegisters.findOne({ docID });
  const docName = doc.name;
  const spec = doc.specialization;
  try {
    const newBlog = new Blogs({
      docID: docID,
      docName: docName,
      specialization: spec,
      title: title,
      blog: blog,
      imageUrl: imageUrl // Save image URL to MongoDB
    });
    await newBlog.save();
    res.status(200).json({ status: 'uploaded' });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;