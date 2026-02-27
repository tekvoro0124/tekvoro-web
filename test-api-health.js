#!/usr/bin/env node

/**
 * API Health Check & Diagnostic Script
 * Tests all endpoints and provides detailed diagnostic information
 */

import http from 'http';
import https from 'https';

const endpoints = [
  {
    name: 'Local API (Port 5002)',
    url: 'http://localhost:5002/api/health',
    timeout: 5000
  },
  {
    name: 'Railway Production API',
    url: 'https://tekvoro-production.up.railway.app/api/health',
    timeout: 10000
  },
  {
    name: 'Netlify Frontend',
    url: 'https://www.tekvoro.com',
    timeout: 10000
  }
];

// Color codes for output
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

async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const protocol = endpoint.url.startsWith('https') ? https : http;
    
    log(colors.blue, `\n🔍 Testing: ${endpoint.name}`);
    log(colors.blue, `   URL: ${endpoint.url}`);
    
    const startTime = Date.now();
    const req = protocol.get(endpoint.url, { 
      timeout: endpoint.timeout,
      headers: { 'User-Agent': 'Tekvoro-Health-Check' }
    }, (res) => {
      const responseTime = Date.now() - startTime;
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          const status = res.statusCode === 200 ? '✅ OK' : `⚠️  ${res.statusCode}`;
          
          log(colors.green, `${status} | Response: ${responseTime}ms`);
          log(colors.green, `   Status Code: ${res.statusCode}`);
          
          if (parsedData.status) {
            log(colors.green, `   Service Status: ${parsedData.status}`);
          }
          
          if (parsedData.database) {
            log(colors.yellow, `   Database: ${parsedData.database.status}`);
            if (parsedData.database.connected === false) {
              log(colors.red, `   ❌ Database NOT connected!`);
            }
          }
          
          resolve({ 
            success: true, 
            statusCode: res.statusCode, 
            responseTime,
            data: parsedData 
          });
        } catch (e) {
          log(colors.yellow, `⚠️  Parsed as HTML/text (${responseTime}ms)`);
          log(colors.yellow, `   Status: ${res.statusCode}`);
          log(colors.yellow, `   First 200 chars: ${data.substring(0, 200)}`);
          resolve({ 
            success: true, 
            statusCode: res.statusCode, 
            responseTime,
            data: data.substring(0, 200)
          });
        }
      });
    });
    
    req.on('error', (err) => {
      const responseTime = Date.now() - startTime;
      log(colors.red, `❌ ERROR | ${err.code || err.message} (${responseTime}ms)`);
      resolve({ 
        success: false, 
        error: err.code || err.message,
        responseTime
      });
    });
    
    req.on('timeout', () => {
      log(colors.red, `❌ TIMEOUT (${endpoint.timeout}ms exceeded)`);
      req.destroy();
      resolve({ 
        success: false, 
        error: 'TIMEOUT',
        responseTime: endpoint.timeout
      });
    });
  });
}

async function runDiagnostics() {
  log(colors.blue, '═══════════════════════════════════════════════');
  log(colors.blue, '  Tekvoro API Health Check & Diagnostics');
  log(colors.blue, '═══════════════════════════════════════════════');
  log(colors.blue, `  Started at: ${new Date().toISOString()}`);
  log(colors.blue, '═══════════════════════════════════════════════\n');
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push({ ...endpoint, ...result });
  }
  
  // Summary
  log(colors.blue, '\n═══════════════════════════════════════════════');
  log(colors.blue, '  Summary');
  log(colors.blue, '═══════════════════════════════════════════════');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  log(colors.green, `✅ Successful: ${successful}/${results.length}`);
  if (failed > 0) {
    log(colors.red, `❌ Failed: ${failed}/${results.length}`);
  }
  
  // Recommendation
  log(colors.blue, '\n📋 Recommendations:');
  
  if (!results[0].success) {
    log(colors.yellow, '   1. Local API not responding - start with: npm run dev');
  }
  
  if (!results[1].success) {
    log(colors.yellow, '   2. Railway API not responding:');
    log(colors.yellow, '      - Check Railway dashboard for build/deployment errors');
    log(colors.yellow, '      - Verify MONGODB_URI environment variable is set');
    log(colors.yellow, '      - Check Railway logs for runtime errors');
  }
  
  if (results[1].data && results[1].data.database === false) {
    log(colors.red, '   3. ⚠️  Database not connected on Railway');
    log(colors.red, '      - Verify MongoDB Atlas connection string');
    log(colors.red, '      - Check IP whitelist in MongoDB Atlas');
  }
  
  log(colors.blue, '\n═══════════════════════════════════════════════\n');
}

runDiagnostics().catch(err => {
  log(colors.red, `Fatal Error: ${err.message}`);
  process.exit(1);
});
