const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('✅ Connected to MongoDB successfully');
  return mongoose.connection.close();
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});
