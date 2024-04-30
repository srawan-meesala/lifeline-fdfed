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
const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('OOPs! Something broke');
});

router.post('/checkout', async (req, res) => {
  const { username, cartItems, totalPrice } = req.body;

  try {
    const newCart = new PharmacyCart({
      username,
      items: cartItems.map((item) => ({
        _id: new mongoose.Types.ObjectId(),
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

router.put('/updateCartItemQuantity', async (req, res) => {
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

router.post('/addToCart', async (req, res) => {
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

router.get('/cartData', async (req, res) => {
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

module.exports = router;
