const dotenvResult = require('dotenv').config();
if (dotenvResult.error) {
  console.warn('.env not found or not loaded; create .env or .env.local with MONGODB_USER and MONGODB_PASSWORD');
} else {
  console.log(`Loaded ${Object.keys(dotenvResult.parsed || {}).length} vars from ${dotenvResult.path}`);
}
const { MongoClient } = require('mongodb');

(async () => {
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASSWORD;
  if (!user || !pass) { console.error('Missing MONGODB_USER or MONGODB_PASSWORD'); process.exit(1); }
  const uri = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@cluster0.1iblrle.mongodb.net/?authSource=admin`;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('connected');
  } catch (err) {
    console.error('connect error:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
})();