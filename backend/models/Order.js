const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  wine: { type: mongoose.Schema.Types.ObjectId, ref: 'Wine', required: true },
  quantity: { type: Number, default: 1 }
});

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryArea: String,
  notes: String,
  items: [OrderItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
