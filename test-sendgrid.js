#!/usr/bin/env node

/**
 * SendGrid Domain Test Script
 * 
 * This script tests your SendGrid domain setup and email functionality.
 * Run with: node test-sendgrid.js
 */

const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, status, details = '') {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  const color = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
  log(`${icon} ${testName}: ${status}`, color);
  if (details) {
    log(`   ${details}`, 'blue');
  }
}

async function testSendGridSetup() {
  log('🚀 SendGrid Domain Test Starting...', 'bold');
  log('=====================================', 'blue');
  
  const results = {
    apiKey: false,
    environment: false,
    apiConnection: false,
    domainAuth: false,
    senderAuth: false,
    emailSend: false
  };

  // Test 1: Check API Key
  log('\n1. Testing API Key Configuration...', 'bold');
  const apiKey = process.env.SENDGRID_API_KEY;
  if (apiKey) {
    results.apiKey = true;
    logTest('API Key', 'PASS', `Configured (length: ${apiKey.length})`);
  } else {
    logTest('API Key', 'FAIL', 'Not found in environment variables');
    log('   Set SENDGRID_API_KEY in your .env file or environment', 'yellow');
    return;
  }

  // Configure SendGrid
  sgMail.setApiKey(apiKey);

  // Test 2: Check Environment Variables
  log('\n2. Testing Environment Variables...', 'bold');
  const envVars = {
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO
  };

  let envPass = true;
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      logTest(key, 'PASS', value);
    } else {
      logTest(key, 'FAIL', 'Not set');
      envPass = false;
    }
  });
  results.environment = envPass;

  // Test 3: Test API Connection
  log('\n3. Testing API Connection...', 'bold');
  try {
    const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const profile = await response.json();
      results.apiConnection = true;
      logTest('API Connection', 'PASS', `Connected as ${profile.email}`);
    } else {
      logTest('API Connection', 'FAIL', `HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    logTest('API Connection', 'FAIL', error.message);
  }

  // Test 4: Check Domain Authentication
  log('\n4. Testing Domain Authentication...', 'bold');
  try {
    const domainResponse = await fetch('https://api.sendgrid.com/v3/whitelabel/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      if (domains.length > 0) {
        results.domainAuth = true;
        logTest('Domain Authentication', 'PASS', `${domains.length} domain(s) configured`);
        domains.forEach(domain => {
          log(`   - ${domain.domain}: ${domain.valid ? 'Valid' : 'Invalid'}`, domain.valid ? 'green' : 'red');
        });
      } else {
        logTest('Domain Authentication', 'FAIL', 'No domains configured');
        log('   Configure domain authentication in SendGrid dashboard', 'yellow');
      }
    } else {
      logTest('Domain Authentication', 'FAIL', `HTTP ${domainResponse.status}: ${domainResponse.statusText}`);
    }
  } catch (error) {
    logTest('Domain Authentication', 'FAIL', error.message);
  }

  // Test 5: Check Sender Authentication
  log('\n5. Testing Sender Authentication...', 'bold');
  try {
    const senderResponse = await fetch('https://api.sendgrid.com/v3/verified_senders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (senderResponse.ok) {
      const senders = await senderResponse.json();
      if (senders.results && senders.results.length > 0) {
        results.senderAuth = true;
        logTest('Sender Authentication', 'PASS', `${senders.results.length} verified sender(s)`);
        senders.results.forEach(sender => {
          log(`   - ${sender.from_email}`, 'green');
        });
      } else {
        logTest('Sender Authentication', 'FAIL', 'No verified senders');
        log('   Verify sender authentication in SendGrid dashboard', 'yellow');
      }
    } else {
      logTest('Sender Authentication', 'FAIL', `HTTP ${senderResponse.status}: ${senderResponse.statusText}`);
    }
  } catch (error) {
    logTest('Sender Authentication', 'FAIL', error.message);
  }

  // Test 6: Test Email Sending (optional)
  const testEmail = process.argv[2]; // Get test email from command line argument
  if (testEmail) {
    log('\n6. Testing Email Sending...', 'bold');
    try {
      const testMsg = {
        to: testEmail,
        from: process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com',
        subject: 'SendGrid Domain Test - Tekvoro Technologies',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #fbbf24;">SendGrid Domain Test</h1>
            <p>This email confirms that your SendGrid domain setup is working correctly.</p>
            <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>From:</strong> ${process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com'}</p>
          </div>
        `,
        text: `
SendGrid Domain Test - Tekvoro Technologies

This email confirms that your SendGrid domain setup is working correctly.

Test Time: ${new Date().toISOString()}
From: ${process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com'}
        `
      };

      const sendResponse = await sgMail.send(testMsg);
      results.emailSend = true;
      logTest('Email Send', 'PASS', `Message ID: ${sendResponse[0]?.headers['x-message-id']}`);
    } catch (error) {
      logTest('Email Send', 'FAIL', error.message);
      if (error.response?.body) {
        log(`   Details: ${JSON.stringify(error.response.body, null, 2)}`, 'red');
      }
    }
  } else {
    log('\n6. Email Send Test (Skipped)', 'bold');
    logTest('Email Send', 'SKIP', 'No test email provided');
    log('   Run with: node test-sendgrid.js your-email@example.com', 'yellow');
  }

  // Summary
  log('\n=====================================', 'blue');
  log('📊 Test Summary', 'bold');
  log('=====================================', 'blue');
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  log(`Tests Passed: ${passedTests}/${totalTests}`, passedTests === totalTests ? 'green' : 'yellow');
  
  Object.entries(results).forEach(([test, passed]) => {
    logTest(test.replace(/([A-Z])/g, ' $1').trim(), passed ? 'PASS' : 'FAIL');
  });

  // Recommendations
  log('\n💡 Recommendations', 'bold');
  if (passedTests === totalTests) {
    log('✅ All tests passed! Your SendGrid setup is working correctly.', 'green');
    log('   You can now send emails from your verified domain.', 'green');
  } else {
    log('⚠️  Some tests failed. Here are the next steps:', 'yellow');
    
    if (!results.apiKey) {
      log('   1. Set SENDGRID_API_KEY in your environment variables', 'yellow');
    }
    if (!results.environment) {
      log('   2. Configure EMAIL_FROM_ADDRESS and EMAIL_REPLY_TO', 'yellow');
    }
    if (!results.domainAuth) {
      log('   3. Set up domain authentication in SendGrid dashboard', 'yellow');
      log('      Visit: https://app.sendgrid.com/settings/whitelabel', 'blue');
    }
    if (!results.senderAuth) {
      log('   4. Verify sender authentication in SendGrid dashboard', 'yellow');
      log('      Visit: https://app.sendgrid.com/settings/sender_auth', 'blue');
    }
    if (!results.emailSend && testEmail) {
      log('   5. Check your domain and sender authentication', 'yellow');
    }
  }

  log('\n🔗 Useful Links', 'bold');
  log('   SendGrid Dashboard: https://app.sendgrid.com', 'blue');
  log('   Domain Whitelabel: https://app.sendgrid.com/settings/whitelabel', 'blue');
  log('   Sender Authentication: https://app.sendgrid.com/settings/sender_auth', 'blue');
  log('   API Keys: https://app.sendgrid.com/settings/api_keys', 'blue');
}

// Run the test
testSendGridSetup().catch(error => {
  log(`\n❌ Test failed with error: ${error.message}`, 'red');
  process.exit(1);
}); 