exports.handler = async function(event, context) {
  console.log('AI Search function called:', {
    method: event.httpMethod,
    path: event.path,
    headers: event.headers,
    body: event.body ? 'present' : 'missing'
  });

  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: 'CORS preflight successful' })
    };
  }

  try {
    // Validate request method
    if (event.httpMethod !== 'POST') {
      console.log('Invalid method:', event.httpMethod);
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed', allowed: ['POST'] })
      };
    }

    // Parse request body safely
    let query = '';
    try {
      const body = event.body || '{}';
      console.log('Parsing body:', body);
      const parsed = JSON.parse(body);
      query = parsed.query || '';
      console.log('Extracted query:', query);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body', details: parseError.message })
      };
    }

    // Validate query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      console.log('Invalid query:', query);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid query' })
      };
    }

    // Check for API key
    const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    console.log('API key present:', !!apiKey);
    
    // If no API key, return demo response
    if (!apiKey) {
      console.log('No OpenAI API key found, returning demo response');
      const demoResponse = {
        answer: `I'm here to help with your query: "${query}". This is a demo response since the AI service is not fully configured. In a production environment, this would provide a detailed AI-powered answer about Tekvoro's services, AI solutions, cloud computing, or digital transformation topics.`,
        suggestions: [
          'AI Solutions and Services',
          'Cloud Computing Solutions', 
          'Digital Transformation Consulting'
        ]
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(demoResponse)
      };
    }

    // Make OpenAI API request with timeout
    console.log('Making OpenAI API request');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful AI assistant for Tekvoro Technologies, a tech company specializing in AI solutions, cloud computing, and digital transformation. Provide concise, relevant answers about their services and suggest 3 related search terms.' 
            },
            { role: 'user', content: query }
          ],
          max_tokens: 256,
          temperature: 0.7
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log('OpenAI response status:', response.status);

      // Parse response safely
      let data;
      try {
        data = await response.json();
        console.log('OpenAI response parsed successfully');
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', parseError);
        return {
          statusCode: 502,
          headers,
          body: JSON.stringify({ error: 'Invalid response from OpenAI API', details: parseError.message })
        };
      }

      // Check for API errors
      if (!response.ok) {
        console.error('OpenAI API error:', data);
        return {
          statusCode: 502,
          headers,
          body: JSON.stringify({ 
            error: `OpenAI API error: ${data.error?.message || 'Unknown error'}`,
            status: response.status
          })
        };
      }

      // Extract answer and suggestions
      const answer = data.choices?.[0]?.message?.content || 'No answer found.';
      const suggestions = [
        'AI Solutions and Services',
        'Cloud Computing Solutions', 
        'Digital Transformation Consulting'
      ];

      console.log('Returning successful response');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ answer, suggestions })
      };

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('OpenAI API request timed out');
        return {
          statusCode: 504,
          headers,
          body: JSON.stringify({ error: 'Request timed out. Please try again.' })
        };
      }
      
      console.error('OpenAI API request failed:', fetchError);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'Failed to connect to OpenAI API', details: fetchError.message })
      };
    }

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: err && err.message ? err.message : String(err),
        stack: err && err.stack ? err.stack : undefined
      })
    };
  }
}; 