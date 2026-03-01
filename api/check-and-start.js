#!/usr/bin/env node

/**
 * Simple API startup test
 * Checks if all dependencies are available and starts the server
 */

console.log('🔍 Checking API dependencies...\n');

const deps = [
  'express',
  'mongoose',
  'cors',
  'helmet',
  'morgan',
  'dotenv',
  'compression',
  'express-rate-limit'
];

let allAvailable = true;

deps.forEach(dep => {
  try {
    require(dep);
    console.log(`✅ ${dep}`);
  } catch (e) {
    console.log(`❌ ${dep} - MISSING`);
    allAvailable = false;
  }
});

if (!allAvailable) {
  console.log('\n⚠️  Missing dependencies. Installing...\n');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
  } catch (e) {
    console.error('Failed to install deps:', e.message);
    process.exit(1);
  }
}

console.log('\n✅ All dependencies available\n');
console.log('Starting API server...\n');

// Now require and start the server
require('./server.js');
