const express = require('express')
const mongoose = require('mongoose')
const PharmacyCart = require('../models/pharmacyCart')
const app = express()
const morgan = require('morgan')
require('dotenv').config();
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
 *   - name: Pharmacy
 *     description: Operations related to pharmacy cart and items
 */

/**
 * @swagger
 * /checkout:
 *   post:
 *     tags: [Pharmacy]
 *     summary: Checkout pharmacy cart
 *     description: Adds cart items to the database and clears the cart after successful checkout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful checkout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: './models/pharmacyCart'
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /updateCartItemQuantity:
 *   put:
 *     tags: [Pharmacy]
 *     summary: Update quantity of an item in the pharmacy cart
 *     description: Updates the quantity of a specific item in the pharmacy cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               itemId:
 *                 type: string
 *               newQuantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item quantity updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: './models/pharmacyCart'
 *       404:
 *         description: Cart or item not found.
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /addToCart:
 *   post:
 *     tags: [Pharmacy]
 *     summary: Add item to pharmacy cart
 *     description: Adds an item to the pharmacy cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               item:
 *                 type: object
 *     responses:
 *       200:
 *         description: Item added to cart successfully.
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /cartData:
 *   get:
 *     tags: [Pharmacy]
 *     summary: Get pharmacy cart data
 *     description: Fetches the pharmacy cart data for a given username.
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: Username of the user whose cart data is to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with pharmacy cart data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/pharmacyCart'
 *       500:
 *         description: Internal Server Error.
 */
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
