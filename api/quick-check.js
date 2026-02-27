#!/usr/bin/env node

/**
 * Quick API Status Check
 */

console.log('🔍 Quick API Diagnostics\n');

// Check .env
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
console.log('1. Checking .env file...');
if (fs.existsSync(envPath)) {
  console.log('   ✅ .env exists');
  const content = fs.readFileSync(envPath, 'utf8');
  if (content.includes('MONGODB_URI')) {
    console.log('   ✅ MONGODB_URI configured');
  } else {
    console.log('   ❌ MONGODB_URI missing');
  }
  if (content.includes('PORT')) {
    console.log('   ✅ PORT configured');
  }
} else {
  console.log('   ❌ .env missing');
}

// Check node_modules
console.log('\n2. Checking dependencies...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  const dirs = fs.readdirSync(nodeModulesPath);
  console.log(`   ✅ node_modules exists (${dirs.length} packages)`);
  
  const critical = ['express', 'mongoose', 'cors'];
  const missing = [];
  critical.forEach(pkg => {
    if (!fs.existsSync(path.join(nodeModulesPath, pkg))) {
      missing.push(pkg);
    }
  });
  
  if (missing.length === 0) {
    console.log('   ✅ Critical packages present');
  } else {
    console.log(`   ⚠️  Missing: ${missing.join(', ')}`);
  }
} else {
  console.log('   ❌ node_modules missing - run: npm install');
}

// Check server.js
console.log('\n3. Checking server.js...');
if (fs.existsSync(path.join(__dirname, 'server.js'))) {
  console.log('   ✅ server.js exists');
} else {
  console.log('   ❌ server.js missing');
}

console.log('\n✅ Quick check complete\n');
