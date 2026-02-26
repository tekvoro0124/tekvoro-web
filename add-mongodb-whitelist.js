#!/usr/bin/env node

import https from 'https';

// Your MongoDB Atlas API credentials
const API_KEY = 'al-McJZmehaM1BzQzEcx8rMEOt4sOxB0tIlQGqhZSo4DHa';

// This script adds 0.0.0.0/0 to MongoDB Atlas Network Access

async function getOrgId() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'cloud.mongodb.com',
      path: '/api/atlas/v2/orgs',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.atlas.2025-01-01+json'
      },
      auth: `:${API_KEY}`
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0].id);
          } else {
            reject(new Error('No organizations found'));
          }
        } catch (e) {
          reject(new Error(`Failed to parse org response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function getProjectId(orgId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'cloud.mongodb.com',
      path: `/api/atlas/v2/orgs/${orgId}/groups`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.atlas.2025-01-01+json'
      },
      auth: `:${API_KEY}`
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0].id);
          } else {
            reject(new Error('No projects found'));
          }
        } catch (e) {
          reject(new Error(`Failed to parse project response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function addIpWhitelist(projectId) {
  return new Promise((resolve, reject) => {
    const payload = {
      cidrBlock: '0.0.0.0/0',
      description: 'Allow all IPs for Railway deployment'
    };

    const options = {
      hostname: 'cloud.mongodb.com',
      path: `/api/atlas/v2/groups/${projectId}/accessList`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.atlas.2025-01-01+json',
        'Content-Length': Buffer.byteLength(JSON.stringify(payload))
      },
      auth: `:${API_KEY}`
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}

async function main() {
  console.log('🔐 MongoDB Atlas IP Whitelist Setup\n');
  console.log('Fetching your organization...');

  try {
    const orgId = await getOrgId();
    console.log(`✅ Organization ID: ${orgId}\n`);

    console.log('Fetching your project...');
    const projectId = await getProjectId(orgId);
    console.log(`✅ Project ID: ${projectId}\n`);

    console.log('Adding IP whitelist 0.0.0.0/0...');
    const result = await addIpWhitelist(projectId);
    
    console.log('\n✅ SUCCESS! IP whitelist added:\n');
    console.log(`   CIDR Block: ${result.cidrBlock}`);
    console.log(`   Description: ${result.description}`);
    console.log(`   Status: ${result.status}\n`);

    console.log('⏳ Waiting for MongoDB to activate whitelist (1-2 minutes)...');
    console.log('🚀 Railway API will auto-reconnect when ready!\n');
    console.log('After ~2 minutes, test with:');
    console.log('   curl https://www.tekvoro.com/api/health\n');

  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}\n`);
    console.error('Alternative: Add whitelist manually at:');
    console.error('   https://cloud.mongodb.com → Security → Network Access\n');
    process.exit(1);
  }
}

main();
