const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Wine = require('./models/Wine');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Wine';

const canonical = [
  { id: 1, brand: 'Acacia', name: 'Acacia Medium Sweet Red', type: 'Red', tastingNotes: 'Red fruit, gentle spice.', price: 600, imageUrl: '/image/Acacia-Medium-Sweet-Red.png' },
  { id: 2, brand: 'Acacia', name: 'Acacia Medium Sweet White', type: 'White', tastingNotes: 'Citrus and floral notes.', price: 600, imageUrl: '/image/Acacia-Medium-Sweet-White.png' },
  { id: 3, brand: 'Acacia', name: 'Acacia Medium Sweet Rose', type: 'Rose', tastingNotes: 'Strawberry and rose.', price: 600, imageUrl: '/image/Acacia-Medium-Sweet-Rose.png' },
  { id: 4, brand: 'Rift Valley', name: 'Rift Valley Cabernet Sauvignon', type: 'Red', tastingNotes: 'Blackcurrant and oak.', price: 650, imageUrl: '/image/Rift-Valley-Cabernet-Sauvignon.png' },
  { id: 5, brand: 'Rift Valley', name: 'Rift Valley Merlot', type: 'Red', tastingNotes: 'Plum and soft tannins.', price: 650, imageUrl: '/image/Rift-Valley-Merlot.png' },
  { id: 6, brand: 'Rift Valley', name: 'Rift Valley Dry Rose', type: 'Rose', tastingNotes: 'Cranberry and citrus.', price: 650, imageUrl: '/image/Rift-Valley-Dry-Rose.png' },
  { id: 7, brand: 'Rift Valley', name: 'Rift Valley Chardonnay', type: 'White', tastingNotes: 'Tropical fruit and butter.', price: 650, imageUrl: '/image/Rift-Valley-Chardonnay.png' },
  { id: 8, brand: 'Rift Valley', name: 'Rift Valley Cabernet Sauvignon-Merlot', type: 'Red', tastingNotes: 'Complex dark fruits.', price: 650, imageUrl: '/image/Rift-Valley-Cabernet-Sauvignon-Merlot.png' },
  { id: 9, brand: 'Rift Valley', name: 'Rift Valley Syrah', type: 'Red', tastingNotes: 'Pepper and dark fruit.', price: 650, imageUrl: '/image/Rift-Valley-Syrah.png' }
];

async function sync() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for sync');

  const names = canonical.map(w => w.name);
  const deleteResult = await Wine.deleteMany({ name: { $nin: names } });
  console.log(`Deleted ${deleteResult.deletedCount} non-canonical documents`);

  for (const w of canonical) {
    const doc = {
      name: w.name,
      brand: w.brand,
      type: w.type,
      description: w.description || '',
      tastingNotes: w.tastingNotes,
      foodPairing: w.foodPairing || '',
      price: w.price,
      imageUrl: w.imageUrl
    };
    const res = await Wine.findOneAndUpdate({ name: w.name }, { $set: doc }, { upsert: true, new: true, setDefaultsOnInsert: true });
    console.log(`Upserted: ${res.name} (${res._id}) price=${res.price} imageUrl=${res.imageUrl}`);
  }

  const total = await Wine.countDocuments();
  console.log(`Sync complete — total wines in collection: ${total}`);
  process.exit(0);
}

sync().catch(err => { console.error(err); process.exit(1); });
