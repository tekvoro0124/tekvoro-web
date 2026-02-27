#!/usr/bin/env node

/**
 * Minimal test server
 * Tests basic Express setup without MongoDB
 */

console.log('Starting minimal test server...\n');

try {
  console.log('1. Loading dependencies...');
  const express = require('express');
  const cors = require('cors');
  const path = require('path');
  console.log('   ✅ Dependencies loaded\n');
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  console.log('2. Setting up routes...');
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });
  
  app.get('/', (req, res) => {
    res.json({ message: 'Tekvoro API - Minimal Test' });
  });
  console.log('   ✅ Routes ready\n');
  
  console.log('3. Starting server...\n');
  const PORT = process.env.PORT || 5002;
  
  app.listen(PORT, () => {
    console.log(`🎯 Test server running on port ${PORT}`);
    console.log(`📍 Test URL: http://localhost:${PORT}/api/health\n`);
  });
  
} catch (err) {
  console.error('❌ Error:', err.message);
  console.error('\nStack:', err.stack);
  process.exit(1);
}
