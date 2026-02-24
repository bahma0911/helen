const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Wine = require('./models/Wine');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Wine';

function normalizeName(s = '') {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

function levenshtein(a, b) {
  if (!a) return b ? b.length : 0;
  if (!b) return a.length;
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for duplicate merge');

  const wines = await Wine.find().lean();
  console.log(`Loaded ${wines.length} wine documents`);

  const normalized = wines.map(w => ({ ...w, _norm: normalizeName(w.name) }));

  const toMergePairs = [];

  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const a = normalized[i], b = normalized[j];
      if (!a._norm || !b._norm) continue;
      if (a._norm === b._norm) {
        toMergePairs.push([a, b]);
        continue;
      }
      // substring match
      if (a._norm.includes(b._norm) || b._norm.includes(a._norm)) {
        toMergePairs.push([a, b]);
        continue;
      }
      const dist = levenshtein(a._norm, b._norm);
      const thresh = Math.max(2, Math.floor(Math.min(a._norm.length, b._norm.length) * 0.25));
      if (dist <= thresh) toMergePairs.push([a, b]);
    }
  }

  if (toMergePairs.length === 0) {
    console.log('No likely duplicates found');
    process.exit(0);
  }

  console.log('Likely duplicate pairs found:');
  toMergePairs.forEach(([a, b], idx) => console.log(`${idx + 1}. '${a.name}' (${a._id})  <-->  '${b.name}' (${b._id})`));

  const merged = [];

  for (const [a, b] of toMergePairs) {
    // Skip if one of them was already deleted in earlier merge
    const existsA = await Wine.findById(a._id).lean();
    const existsB = await Wine.findById(b._id).lean();
    if (!existsA || !existsB) continue;

    // Choose primary: one with more non-empty fields
    const countFields = doc => Object.values(doc).filter(v => v !== undefined && v !== null && v !== '').length;
    const primary = countFields(existsA) >= countFields(existsB) ? existsA : existsB;
    const secondary = primary._id.toString() === existsA._id.toString() ? existsB : existsA;

    const update = {};
    // Merge fields: prefer primary's values, but fill missing from secondary
    ['name', 'brand', 'type', 'description', 'tastingNotes', 'foodPairing', 'imageUrl'].forEach(k => {
      if (!primary[k] && secondary[k]) update[k] = secondary[k];
    });
    // Price: if primary price is missing or not a finite number, take secondary
    if (!Number.isFinite(primary.price) && Number.isFinite(secondary.price)) update.price = secondary.price;
    // If primary.price exists but secondary has a numeric price and primary price is different, prefer the non-zero numeric; keep primary otherwise
    if (Number.isFinite(primary.price) && Number.isFinite(secondary.price) && primary.price !== secondary.price) {
      if ((primary.price === 0 || primary.price == null) && secondary.price) update.price = secondary.price;
    }

    if (Object.keys(update).length > 0) {
      await Wine.findByIdAndUpdate(primary._id, { $set: update });
    }

    // Delete secondary after copying
    await Wine.deleteOne({ _id: secondary._id });
    merged.push({ kept: primary._id, removed: secondary._id, updated: update });
    console.log(`Merged: kept ${primary._id}, removed ${secondary._id}`);
  }

  console.log(`Merge complete — ${merged.length} pairs merged`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
