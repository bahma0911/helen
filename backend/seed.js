const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Wine = require('./models/Wine');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/helen_winery_dev';

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  // Clear collection
  await Wine.deleteMany({});

  const wines = [
    {
      name: 'Acasia Reserve Red',
      brand: 'Acasia',
      type: 'Red',
      description: 'A bold red with deep fruit and cedar notes.',
      tastingNotes: 'Blackberry, leather, vanilla',
      foodPairing: 'Red meat, stews, aged cheese',
      price: 25,
      imageUrl: 'https://via.placeholder.com/600x400?text=Acasia+Reserve+Red'
    },
    {
      name: 'Acasia Crisp White',
      brand: 'Acasia',
      type: 'White',
      description: 'Fresh citrus and mineral finish.',
      tastingNotes: 'Lemon, green apple, mineral',
      foodPairing: 'Seafood, salads, goat cheese',
      price: 20,
      imageUrl: 'https://via.placeholder.com/600x400?text=Acasia+Crisp+White'
    },
    {
      name: 'Acasia Rosé Blush',
      brand: 'Acasia',
      type: 'Rosé',
      description: 'Delicate strawberry and floral notes.',
      tastingNotes: 'Strawberry, rose petal',
      foodPairing: 'Light appetizers, fruit desserts',
      price: 22,
      imageUrl: 'https://via.placeholder.com/600x400?text=Acasia+Ros%C3%A9+Blush'
    },
    {
      name: 'Rift Valley Cabernet',
      brand: 'Rift Valley',
      type: 'Red',
      description: 'Structured cabernet with dark fruit intensity.',
      tastingNotes: 'Blackcurrant, tobacco, oak',
      foodPairing: 'Grilled red meats, hearty dishes',
      price: 30,
      imageUrl: 'https://via.placeholder.com/600x400?text=Rift+Valley+Cabernet'
    },
    {
      name: 'Rift Valley Chardonnay',
      brand: 'Rift Valley',
      type: 'White',
      description: 'Buttery with tropical fruit undertones.',
      tastingNotes: 'Pineapple, butter, vanilla',
      foodPairing: 'Poultry, creamy pastas',
      price: 28,
      imageUrl: 'https://via.placeholder.com/600x400?text=Rift+Valley+Chardonnay'
    },
    {
      name: 'Rift Valley Rose',
      brand: 'Rift Valley',
      type: 'Rosé',
      description: 'Dry rosé with crisp acidity.',
      tastingNotes: 'Cranberry, citrus',
      foodPairing: 'Tapas, sushi',
      price: 24,
      imageUrl: 'https://via.placeholder.com/600x400?text=Rift+Valley+Rose'
    },
    {
      name: 'Acasia Late Harvest',
      brand: 'Acasia',
      type: 'White',
      description: 'Sweet finish and honeyed aromas.',
      tastingNotes: 'Honey, apricot',
      foodPairing: 'Desserts, blue cheese',
      price: 27,
      imageUrl: 'https://via.placeholder.com/600x400?text=Acasia+Late+Harvest'
    },
    {
      name: 'Rift Valley Merlot',
      brand: 'Rift Valley',
      type: 'Red',
      description: 'Soft tannins and plum flavors.',
      tastingNotes: 'Plum, mocha',
      foodPairing: 'Roasted poultry, pasta',
      price: 26,
      imageUrl: 'https://via.placeholder.com/600x400?text=Rift+Valley+Merlot'
    }
  ];

  await Wine.insertMany(wines);
  console.log('Seeded wines');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
