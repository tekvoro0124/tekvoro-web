#!/usr/bin/env node

/**
 * Test MongoDB connection from .env
 */

require('dotenv').config();

console.log('🔍 MongoDB Connection Test\n');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.log('❌ MONGODB_URI not set in /api/.env');
  console.log('   Create /api/.env with MONGODB_URI value');
  process.exit(1);
}

console.log(`✅ MONGODB_URI found`);
console.log(`   URI: ${uri.substring(0, 50)}...\n`);

const mongoose = require('mongoose');

console.log('⏳ Attempting connection...\n');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
})
.then(() => {
  console.log('✅ MongoDB connection successful!');
  console.log('   Status: Connected');
  console.log('   Ready to use the API\n');
  process.exit(0);
})
.catch((err) => {
  console.log('❌ MongoDB connection failed!');
  console.log(`   Error: ${err.message}\n`);
  console.log('📋 Troubleshooting:');
  console.log('   1. Check MongoDB Atlas connection string');
  console.log('   2. Verify IP is whitelisted in MongoDB Atlas');
  console.log('   3. Check network connectivity\n');
  process.exit(1);
});
