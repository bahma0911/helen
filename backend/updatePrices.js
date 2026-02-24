const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Wine = require('./models/Wine');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Wine';

const winesToUpsert = [
  { name: 'Acacia Medium Sweet Red', price: 600 },
  { name: 'Acacia Medium Sweet White', price: 600 },
  { name: 'Acacia Medium Sweet Rose', price: 600 },
  { name: 'Rift Valley Cabernet Sauvignon', price: 650 },
  { name: 'Rift Valley Merlot', price: 650 },
  { name: 'Rift Valley Dry Rose', price: 650 },
  { name: 'Rift Valley Chardonnay', price: 650 },
  { name: 'Rift Valley Cabernet Sauvignon-Merlot', price: 650 },
  { name: 'Rift Valley Syrah', price: 650 }
]

async function upsertPrices() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for price update');

  for (const w of winesToUpsert) {
    const res = await Wine.findOneAndUpdate(
      { name: w.name },
      { $set: { price: w.price } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    console.log(`Upserted: ${res.name} -> ${res.price}`)
  }

  console.log('Price upsert complete');
  process.exit(0);
}

upsertPrices().catch(err => {
  console.error(err);
  process.exit(1);
});
