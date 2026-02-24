const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/helen_winery_dev';

// Routes
const winesRouter = require('./routes/wines');
const ordersRouter = require('./routes/orders');

app.use('/api/wines', winesRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => res.send({ status: 'Helen Wine Shop API' }));

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
