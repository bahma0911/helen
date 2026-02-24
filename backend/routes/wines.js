const express = require('express');
const router = express.Router();
const Wine = require('../models/Wine');

// GET /api/wines - list all wines
router.get('/', async (req, res) => {
  try {
    const wines = await Wine.find();
    res.json(wines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wines' });
  }
});

// GET /api/wines/:id - single wine
router.get('/:id', async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine) return res.status(404).json({ error: 'Wine not found' });
    res.json(wine);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wine' });
  }
});

module.exports = router;
