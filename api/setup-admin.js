#!/usr/bin/env node

/**
 * ADMIN SETUP SCRIPT - Tekvoro Website
 * 
 * This script creates the initial admin user in MongoDB
 * Usage: node setup-admin.js
 * 
 * Credentials created:
 * - Email: admin@tekvoro.com
 * - Password: AdminPass123!
 * - Role: admin
 * - Status: active
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['admin', 'user', 'moderator'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

async function setupAdmin() {
  try {
    console.log('🔧 Starting Admin Setup...\n');
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tekvoro';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Connected\n');

    const User = mongoose.model('User', userSchema);

    // Check if admin already exists
    console.log('🔍 Checking for existing admin...');
    const existingAdmin = await User.findOne({ email: 'admin@tekvoro.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('   Email: admin@tekvoro.com');
      console.log('   Status: ' + existingAdmin.status);
      console.log('\n   To reset password, delete this user first.');
      process.exit(0);
    }

    // Create admin user
    console.log('🔐 Creating admin user...');
    const hashedPassword = await bcrypt.hash('AdminPass123!', 10);
    
    const adminUser = await User.create({
      email: 'admin@tekvoro.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      createdAt: new Date()
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('━'.repeat(50));
    console.log('   Email:    admin@tekvoro.com');
    console.log('   Password: AdminPass123!');
    console.log('   Role:     admin');
    console.log('   Status:   active');
    console.log('━'.repeat(50));
    console.log('\n🔗 Access at: https://www.tekvoro.com/admin/login\n');
    console.log('⚠️  IMPORTANT: Change this password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Setup Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Verify MongoDB is running');
    console.error('2. Check MONGODB_URI in .env file');
    console.error('3. Ensure IP is whitelisted in MongoDB Atlas');
    console.error('4. Run: npm install mongoose bcryptjs\n');
    process.exit(1);
  }
}

setupAdmin();
