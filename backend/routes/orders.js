const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - create order
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, deliveryArea, notes, items } = req.body;
    if (!customerName || !phone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields or items' });
    }

    const order = new Order({ customerName, phone, deliveryArea, notes, items });
    await order.save();
    res.status(201).json({ message: 'Order saved', orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
