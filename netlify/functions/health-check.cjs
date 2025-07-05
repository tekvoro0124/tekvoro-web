exports.handler = async function(event, context) {
  console.log('Health check function called:', {
    method: event.httpMethod,
    path: event.path,
    timestamp: new Date().toISOString()
  });

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'healthy',
      message: 'Netlify function is working!',
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      path: event.path,
      environment: process.env.NODE_ENV || 'production'
    })
  };
}; 