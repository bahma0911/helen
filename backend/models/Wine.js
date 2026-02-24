const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, enum: ['Acasia', 'Rift Valley'], required: true },
  type: { type: String, enum: ['Red', 'White', 'Rosé'], required: true },
  description: String,
  tastingNotes: String,
  foodPairing: String,
  price: { type: Number, required: true },
  imageUrl: String
});

module.exports = mongoose.model('Wine', WineSchema);
