#!/usr/bin/env node

/**
 * Complete API Setup & Diagnostics
 * Runs all checks and gets your API ready
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiDir = __dirname;
const envFile = path.join(apiDir, '.env');

// Colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(color, text) {
  console.log(`${color}${text}${colors.reset}`);
}

function header(text) {
  console.log('\n' + '═'.repeat(50));
  log(colors.blue, `  ${text}`);
  console.log('═'.repeat(50) + '\n');
}

// 1. Check .env file
header('Step 1: Environment Configuration');

if (!fs.existsSync(envFile)) {
  log(colors.red, '❌ /api/.env file not found');
  process.exit(1);
}

require('dotenv').config({ path: envFile });

const required = ['MONGODB_URI', 'PORT'];
const missing = required.filter(v => !process.env[v]);

if (missing.length > 0) {
  log(colors.red, `❌ Missing variables: ${missing.join(', ')}`);
  process.exit(1);
}

log(colors.green, '✅ .env configured');
log(colors.green, `   PORT: ${process.env.PORT}`);
log(colors.green, `   MONGODB_URI: ${process.env.MONGODB_URI.substring(0, 40)}...`);

// 2. Check dependencies
header('Step 2: Dependencies');

const deps = ['express', 'mongoose', 'cors', 'helmet', 'morgan', 'dotenv'];
let missing_deps = [];

deps.forEach(dep => {
  try {
    require(dep);
    log(colors.green, `✅ ${dep}`);
  } catch (e) {
    log(colors.red, `❌ ${dep}`);
    missing_deps.push(dep);
  }
});

if (missing_deps.length > 0) {
  log(colors.yellow, `\n⏳ Installing missing dependencies...\n`);
  try {
    execSync('npm install', { 
      cwd: apiDir, 
      stdio: 'inherit',
      timeout: 120000 
    });
    log(colors.green, '\n✅ Dependencies installed');
  } catch (e) {
    log(colors.red, '❌ Failed to install dependencies');
    process.exit(1);
  }
}

// 3. Test MongoDB
header('Step 3: Database Connection');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
})
.then(() => {
  log(colors.green, '✅ MongoDB connected');
  log(colors.green, `   URI: ${process.env.MONGODB_URI.substring(0, 60)}...`);
  mongoose.disconnect();
  
  // 4. Ready to start
  header('Ready to Start API');
  log(colors.green, '✅ All systems ready!\n');
  log(colors.blue, '📍 To start the API server, run:\n');
  log(colors.yellow, '   node api/server.js\n');
  log(colors.blue, '🌐 API will be available at:\n');
  log(colors.yellow, `   http://localhost:${process.env.PORT}/api/health\n`);
})
.catch((err) => {
  log(colors.red, `❌ MongoDB connection failed`);
  log(colors.red, `   Error: ${err.message}\n`);
  
  log(colors.yellow, '📋 Common fixes:\n');
  log(colors.yellow, '   1. Check MongoDB URI in /api/.env');
  log(colors.yellow, '   2. Whitelist your IP in MongoDB Atlas');
  log(colors.yellow, '   3. Verify internet connectivity');
  log(colors.yellow, '   4. Check if MongoDB is accessible\n');
  
  process.exit(1);
});
