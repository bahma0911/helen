const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Wine = require('./models/Wine');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Wine';

async function list() {
  await mongoose.connect(MONGODB_URI);
  const wines = await Wine.find().lean();
  wines.forEach(w => {
    console.log(`${w._id} | ${w.name} | price=${w.price} | imageUrl=${w.imageUrl || '<missing>'}`);
  });
  console.log(`Total: ${wines.length}`);
  process.exit(0);
}

list().catch(err => { console.error(err); process.exit(1); });
