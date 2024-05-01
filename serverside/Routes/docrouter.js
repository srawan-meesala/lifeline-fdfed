const express = require('express')
const DocRegisters = require('../models/docRegister')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
app.use('/bloguploads', express.static('bloguploads'));
app.use('/doc-certificates', express.static('doc-certificates'));
app.use('/hosp-certificates', express.static('hosp-certificates'));
app.use(morgan('dev'))
app.use(express.json())

const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('OOPs! Something broke');
});

/**
 * @swagger
 * tags:
 *   - name: Doctor
 *     description: Operations related to doctors
 */

/**
 * @swagger
 * /getDocDetails/{username}:
 *   get:
 *     tags: [Doctor]
 *     summary: Retrieve details of a doctor by username
 *     description: Retrieve details of a doctor based on their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the doctor to retrieve details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with doctor details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/docRegister'
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/getDocDetails/:username', async (req, res) => {
  const docID = req.params.username;
  try {
    const user = await DocRegisters.findOne({ docID: docID });
    if (!user) {
      return res.status(404).json('User not found');
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json('Internal Server Error');
  }
});


module.exports = router;