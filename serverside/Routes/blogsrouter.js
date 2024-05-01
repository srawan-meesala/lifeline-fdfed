const express = require('express')
const DocRegisters = require('../models/docRegister')
const Blogs = require('../models/blogs')
const redis = require("redis");
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const multer = require('multer')
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

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

redisClient.on("error", function(error) {
  console.error("Error connecting to Redis:", error);
});

redisClient.on("connect", function() {
  console.log("Connected to Redis server");
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




const blogCacheMiddleware = (req, res, next) => {
  const cacheKey = `blog:${req.query.blogID}`; // Added backticks to create a template literal

  redisClient.get(cacheKey, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      console.log('Blog data retrieved from cache');
      res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  });
};

router.get('/blogdata', blogCacheMiddleware, async (req, res) => {
  const { blogID } = req.query;
  try {
    const blog = await Blogs.findOne({ blogID: blogID });
    if (!blog) {
      return res.status(404).json('Blog not found');
    }
    // Cache data using Redis
    const cacheKey = `blog:${blogID}`; // Added backticks to create a template literal
    redisClient.setex(cacheKey, 3600, JSON.stringify(blog)); // Cache for 1 hour
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});






//WITHOUT REDIS

// router.get('/blogdata', async (req, res) => {
//   const { blogID } = req.query;
//   try {
//     const data = await Blogs.findOne({ blogID: blogID })
//     console.log(data)
//     if (data) {
//       res.status(200).json(data)
//     } else {
//       res.status(404).json('Blog not found');
//     }
//   }
//   catch (error) {
//     console.log(error)
//     res.status(500).json('Internal Server Error');
//   }
// })


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
