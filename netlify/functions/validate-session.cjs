const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { sessionToken, sessionHash } = body;

    // Validate input
    if (!sessionToken || !sessionHash) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Session token and hash are required' })
      };
    }

    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'tekvoro-admin-secret-2024';
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tekvoro.com';

    // Recreate session data to validate hash
    const sessionData = {
      id: '1',
      email: ADMIN_EMAIL,
      role: 'admin',
      sessionToken,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };

    // Validate session hash
    const expectedHash = crypto
      .createHmac('sha256', ADMIN_SECRET)
      .update(JSON.stringify(sessionData))
      .digest('hex');

    if (sessionHash === expectedHash) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Session valid',
          user: {
            id: sessionData.id,
            email: sessionData.email,
            role: sessionData.role
          }
        })
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid session',
          message: 'Session has expired or is invalid'
        })
      };
    }

  } catch (error) {
    console.error('Session validation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Session validation service unavailable'
      })
    };
  }
}; 