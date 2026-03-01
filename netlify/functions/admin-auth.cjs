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
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }

    // Get admin credentials from environment variables
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tekvoro.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'demo123';
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'tekvoro-admin-secret-2024';

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a secure session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const timestamp = Date.now();
      
      // Create session data
      const sessionData = {
        id: '1',
        email: ADMIN_EMAIL,
        role: 'admin',
        sessionToken,
        timestamp,
        expiresAt: timestamp + (24 * 60 * 60 * 1000) // 24 hours
      };

      // In production, you'd store this in a database
      // For now, we'll use a simple hash for demo purposes
      const sessionHash = crypto
        .createHmac('sha256', ADMIN_SECRET)
        .update(JSON.stringify(sessionData))
        .digest('hex');

      console.log('Admin login successful:', { email, timestamp });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Login successful',
          user: {
            id: sessionData.id,
            email: sessionData.email,
            role: sessionData.role
          },
          sessionToken,
          sessionHash
        })
      };
    } else {
      console.log('Admin login failed:', { email, timestamp: Date.now() });
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid credentials',
          message: 'Please check your email and password'
        })
      };
    }

  } catch (error) {
    console.error('Admin auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Authentication service unavailable'
      })
    };
  }
}; 