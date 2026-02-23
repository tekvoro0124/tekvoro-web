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

    // Tekvoro content database
    const tekvoroContent = [
      {
        title: 'Enterprise Automation Solutions',
        description: 'Streamline business processes with intelligent automation',
        category: 'Digital Transformation',
        tags: ['automation', 'enterprise', 'RPA', 'workflow', 'AI'],
        url: '/services/enterprise-automation'
      },
      {
        title: 'AI & Machine Learning Solutions',
        description: 'Transform your business with cutting-edge AI technologies',
        category: 'AI & Machine Learning',
        tags: ['AI', 'machine learning', 'neural networks', 'deep learning'],
        url: '/services/ai-solutions'
      },
      {
        title: 'Cloud Computing Solutions',
        description: 'Scalable cloud infrastructure and migration services',
        category: 'Cloud & Infrastructure',
        tags: ['cloud', 'AWS', 'Azure', 'migration', 'scalability'],
        url: '/services/cloud-solutions'
      },
      {
        title: 'Cybersecurity Solutions',
        description: 'Protect your digital assets with advanced security measures',
        category: 'Security',
        tags: ['security', 'cybersecurity', 'threat detection', 'compliance'],
        url: '/services/cybersecurity-solutions'
      },
      {
        title: 'Predictive Analytics',
        description: 'Data-driven insights for better business decisions',
        category: 'Data & Analytics',
        tags: ['analytics', 'prediction', 'data science', 'forecasting'],
        url: '/services/predictive-analytics'
      },
      {
        title: 'Smart Infrastructure Solutions',
        description: 'IoT-enabled smart infrastructure for modern cities',
        category: 'IoT & Smart Cities',
        tags: ['IoT', 'smart cities', 'infrastructure', 'sensors'],
        url: '/services/smart-infrastructure'
      },
      {
        title: 'Telemedicine Solutions',
        description: 'Revolutionary healthcare delivery through technology',
        category: 'Healthcare Technology',
        tags: ['telemedicine', 'healthcare', 'digital health', 'remote care'],
        url: '/services/telemedicine'
      },
      {
        title: 'Custom Web Development',
        description: 'Modern web applications built with cutting-edge technologies',
        category: 'Development',
        tags: ['web development', 'React', 'Node.js', 'full-stack'],
        url: '/services/web-development'
      },
      {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications',
        category: 'Development',
        tags: ['mobile', 'iOS', 'Android', 'React Native', 'Flutter'],
        url: '/services/mobile-apps'
      },
      {
        title: 'UI/UX Design Services',
        description: 'User-centered design for exceptional digital experiences',
        category: 'Design',
        tags: ['UI design', 'UX design', 'user experience', 'interface design'],
        url: '/services/ui-ux-design'
      },
      {
        title: 'The Future of AI in Business',
        description: 'How AI is transforming industries and what to expect in 2025',
        category: 'Blog',
        tags: ['AI', 'business transformation', 'future trends', 'automation'],
        url: '/blog/future-ai-business'
      },
      {
        title: 'Cloud Security Best Practices',
        description: 'Protecting your data in a multi-cloud world',
        category: 'Blog',
        tags: ['cloud security', 'data protection', 'best practices', 'compliance'],
        url: '/blog/cloud-security-best-practices'
      },
      {
        title: 'About Tekvoro Technologies',
        description: 'Leading the future of AI and digital transformation',
        category: 'Company',
        tags: ['about', 'company', 'mission', 'vision', 'values'],
        url: '/about'
      }
    ];

    // Local search function
    function searchContent(searchQuery) {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      
      return tekvoroContent.filter(item => {
        const searchText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.category}`.toLowerCase();
        return searchTerms.every(term => searchText.includes(term));
      }).slice(0, 5); // Limit to top 5 results
    }

    // Perform local search first
    const localResults = searchContent(query);
    
    // Check for API key
    const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    console.log('API key present:', !!apiKey);
    
    // If no API key, return enhanced local search results
    if (!apiKey) {
      console.log('No OpenAI API key found, returning enhanced local search results');
      
      let answer = `I found several relevant results for "${query}":\n\n`;
      
      if (localResults.length > 0) {
        localResults.forEach((item, index) => {
          answer += `${index + 1}. **${item.title}**\n`;
          answer += `   ${item.description}\n`;
          answer += `   Category: ${item.category}\n`;
          answer += `   Tags: ${item.tags.join(', ')}\n\n`;
        });
      } else {
        answer = `I couldn't find specific results for "${query}". However, Tekvoro Technologies specializes in:\n\n`;
        answer += `• **AI & Machine Learning Solutions** - Transform your business with cutting-edge AI\n`;
        answer += `• **Cloud Computing Solutions** - Scalable cloud infrastructure and migration\n`;
        answer += `• **Enterprise Automation** - Streamline business processes with intelligent automation\n`;
        answer += `• **Cybersecurity Solutions** - Protect your digital assets with advanced security\n`;
        answer += `• **Digital Transformation** - Complete business transformation strategies\n\n`;
        answer += `Would you like more information about any of these services?`;
      }
      
      const suggestions = localResults.length > 0 
        ? localResults.map(item => item.title).slice(0, 3)
        : ['AI Solutions', 'Cloud Computing', 'Enterprise Automation'];
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          answer, 
          suggestions,
          localResults: localResults.map(item => ({
            title: item.title,
            description: item.description,
            url: item.url,
            category: item.category
          }))
        })
      };
    }

    // Make OpenAI API request with enhanced context
    console.log('Making OpenAI API request');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      // Create context from local search results
      const contextText = localResults.length > 0 
        ? localResults.map(item => 
            `${item.title}: ${item.description}. Category: ${item.category}. Tags: ${item.tags.join(', ')}`
          ).join('\n')
        : 'No specific matches found. General information about Tekvoro Technologies services.';

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
              content: `You are a helpful AI assistant for Tekvoro Technologies. You have access to the following information about Tekvoro:\n\n${contextText}\n\nProvide helpful, concise answers about Tekvoro's services and suggest 3 relevant search terms. Always include specific service names and URLs when relevant. If you find exact matches, mention them prominently.` 
            },
            { role: 'user', content: query }
          ],
          max_tokens: 400,
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
      const suggestions = localResults.length > 0 
        ? localResults.map(item => item.title).slice(0, 3)
        : ['AI Solutions', 'Cloud Computing', 'Enterprise Automation'];

      console.log('Returning successful response');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          answer, 
          suggestions,
          localResults: localResults.map(item => ({
            title: item.title,
            description: item.description,
            url: item.url,
            category: item.category
          }))
        });

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