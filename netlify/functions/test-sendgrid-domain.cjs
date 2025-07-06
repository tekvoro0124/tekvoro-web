const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { testEmail, testType = 'comprehensive' } = body;

    const testResults = {
      timestamp: new Date().toISOString(),
      testType,
      results: {}
    };

    // Test 1: Check SendGrid API Key Configuration
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    console.log('Debug - API Key length:', sendgridApiKey ? sendgridApiKey.length : 'undefined');
    console.log('Debug - API Key first 10 chars:', sendgridApiKey ? sendgridApiKey.substring(0, 10) : 'undefined');
    
    testResults.results.apiKeyCheck = {
      status: sendgridApiKey ? 'configured' : 'not_configured',
      hasApiKey: !!sendgridApiKey,
      keyLength: sendgridApiKey ? sendgridApiKey.length : 0,
      debug: {
        envVarExists: !!process.env.SENDGRID_API_KEY,
        keyStartsWith: sendgridApiKey ? sendgridApiKey.substring(0, 10) : 'undefined'
      }
    };

    if (!sendgridApiKey) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'SendGrid API key not configured',
          testResults
        })
      };
    }

    // Configure SendGrid
    sgMail.setApiKey(sendgridApiKey);

    // Test 2: Check Environment Variables
    testResults.results.environmentCheck = {
      status: 'checking',
      variables: {
        SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
        EMAIL_FROM_ADDRESS: !!process.env.EMAIL_FROM_ADDRESS,
        EMAIL_REPLY_TO: !!process.env.EMAIL_REPLY_TO
      },
      values: {
        EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || 'not_set',
        EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO || 'not_set'
      }
    };

    // Test 3: Test SendGrid API Connection
    try {
      // Test API connection by getting account info
      const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const profile = await response.json();
        testResults.results.apiConnection = {
          status: 'success',
          account: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name
        };
      } else {
        testResults.results.apiConnection = {
          status: 'failed',
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      testResults.results.apiConnection = {
        status: 'error',
        error: error.message
      };
    }

    // Test 4: Test Domain Authentication (if comprehensive test)
    if (testType === 'comprehensive') {
      try {
        const domainResponse = await fetch('https://api.sendgrid.com/v3/whitelabel/domains', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (domainResponse.ok) {
          const domains = await domainResponse.json();
          testResults.results.domainAuthentication = {
            status: 'success',
            domains: domains.map(domain => ({
              domain: domain.domain,
              valid: domain.valid,
              dns: domain.dns
            }))
          };
        } else {
          testResults.results.domainAuthentication = {
            status: 'failed',
            error: `HTTP ${domainResponse.status}: ${domainResponse.statusText}`
          };
        }
      } catch (error) {
        testResults.results.domainAuthentication = {
          status: 'error',
          error: error.message
        };
      }
    }

    // Test 5: Test Email Sending (if test email provided)
    if (testEmail && testType === 'comprehensive') {
      try {
        const testMsg = {
          to: testEmail,
          from: process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com',
          subject: 'SendGrid Domain Test - Tekvoro Technologies',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #fbbf24; margin: 0; font-size: 28px;">SendGrid Domain Test</h1>
              </div>
              
              <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #fbbf24; margin-top: 0;">✅ Domain Setup Verification</h2>
                <p style="line-height: 1.6; margin-bottom: 15px;">
                  This email confirms that your SendGrid domain setup is working correctly for Tekvoro Technologies.
                </p>
                
                <div style="background: rgba(251, 191, 36, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 20px 0;">
                  <h3 style="color: #fbbf24; margin: 0 0 10px 0;">Test Details:</h3>
                  <p style="margin: 5px 0;"><strong>Test Type:</strong> ${testType}</p>
                  <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                  <p style="margin: 5px 0;"><strong>From Address:</strong> ${process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com'}</p>
                  <p style="margin: 5px 0;"><strong>Reply-To:</strong> ${process.env.EMAIL_REPLY_TO || 'info@tekvoro.com'}</p>
                </div>
                
                <p style="line-height: 1.6; margin-bottom: 15px;">
                  If you received this email, your SendGrid domain authentication is working properly. 
                  You can now send emails from your verified domain.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="color: #fbbf24; font-size: 14px; margin: 0;">
                  Tekvoro Technologies - Email System Test
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                  This is an automated test email. Please do not reply.
                </p>
              </div>
            </div>
          `,
          text: `
SendGrid Domain Test - Tekvoro Technologies

✅ Domain Setup Verification

This email confirms that your SendGrid domain setup is working correctly for Tekvoro Technologies.

Test Details:
- Test Type: ${testType}
- Timestamp: ${new Date().toISOString()}
- From Address: ${process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com'}
- Reply-To: ${process.env.EMAIL_REPLY_TO || 'info@tekvoro.com'}

If you received this email, your SendGrid domain authentication is working properly. 
You can now send emails from your verified domain.

---
Tekvoro Technologies - Email System Test
This is an automated test email. Please do not reply.
          `,
          trackingSettings: {
            clickTracking: {
              enable: true,
              enableText: true
            },
            openTracking: {
              enable: true
            },
            subscriptionTracking: {
              enable: false
            }
          }
        };

        const sendResponse = await sgMail.send(testMsg);
        testResults.results.emailSendTest = {
          status: 'success',
          messageId: sendResponse[0]?.headers['x-message-id'],
          response: 'Email sent successfully'
        };
      } catch (error) {
        testResults.results.emailSendTest = {
          status: 'failed',
          error: error.message,
          details: error.response?.body
        };
      }
    }

    // Test 6: Check Sender Authentication
    try {
      const senderResponse = await fetch('https://api.sendgrid.com/v3/verified_senders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (senderResponse.ok) {
        const senders = await senderResponse.json();
        testResults.results.senderAuthentication = {
          status: 'success',
          verifiedSenders: senders.results || []
        };
      } else {
        testResults.results.senderAuthentication = {
          status: 'failed',
          error: `HTTP ${senderResponse.status}: ${senderResponse.statusText}`
        };
      }
    } catch (error) {
      testResults.results.senderAuthentication = {
        status: 'error',
        error: error.message
      };
    }

    // Determine overall test status
    const allTests = Object.values(testResults.results);
    const failedTests = allTests.filter(test => test.status === 'failed' || test.status === 'error');
    const overallStatus = failedTests.length === 0 ? 'success' : 'partial';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        overallStatus,
        testResults,
        summary: {
          totalTests: allTests.length,
          passedTests: allTests.filter(test => test.status === 'success').length,
          failedTests: failedTests.length,
          recommendations: failedTests.length > 0 ? [
            'Check your SendGrid API key configuration',
            'Verify domain authentication in SendGrid dashboard',
            'Ensure sender authentication is completed',
            'Check environment variables in Netlify'
          ] : [
            'All tests passed! Your SendGrid setup is working correctly.',
            'You can now send emails from your verified domain.',
            'Consider setting up additional tracking and analytics.'
          ]
        }
      })
    };

  } catch (error) {
    console.error('SendGrid domain test error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
}; 