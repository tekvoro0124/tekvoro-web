exports.handler = async function(event, context) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  try {
    // Validate request method
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    // Parse request body safely
    let formData;
    try {
      const body = event.body || '{}';
      console.log('Raw request body:', body);
      formData = JSON.parse(body);
      console.log('Parsed form data:', formData);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body' })
      };
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'solution', 'date', 'time'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      console.log('Received data:', formData);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          receivedData: formData
        })
      };
    }

    // Check for email service configuration
    const emailService = process.env.EMAIL_SERVICE || 'netlify'; // netlify, sendgrid, or custom
    console.log('Using email service:', emailService);
    
    if (emailService === 'netlify') {
      // Use Netlify's built-in email service
      return await handleNetlifyEmail(formData, headers);
    } else if (emailService === 'sendgrid') {
      // Use SendGrid
      return await handleSendGridEmail(formData, headers);
    } else {
      // Custom email service or fallback
      return await handleCustomEmail(formData, headers);
    }

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: err && err.message ? err.message : String(err) })
    };
  }
};

// Handle Netlify's built-in email service
async function handleNetlifyEmail(formData, headers) {
  try {
    // For Netlify, we'll use a simple approach that logs the data
    // In production, you'd integrate with Netlify's email service or a third-party service
    
    const emailContent = `
New Demo Booking Request\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nSolution: ${formData.solution}\nDate: ${formData.date}\nTime: ${formData.time}\nNotes: ${formData.notes || 'No additional notes'}\n\nSubmitted at: ${new Date().toISOString()}
    `;

    console.log('Demo booking request:', emailContent);

    // For now, we'll simulate success
    // In production, integrate with your preferred email service
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Demo booking request received successfully. We will contact you soon!' 
      })
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email', details: error && error.message ? error.message : String(error) })
    };
  }
}

// Handle SendGrid email service
async function handleSendGridEmail(formData, headers) {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  
  if (!sendgridApiKey) {
    console.error('SendGrid API key not configured');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Email service not configured' })
    };
  }

  try {
    const emailData = {
      personalizations: [{
        to: [{ email: 'info@tekvoro.com', name: 'Tekvoro Team' }],
        subject: `New Demo Booking Request - ${formData.name} from ${formData.company}`
      }],
      from: { email: 'noreply@tekvoro.com', name: 'Tekvoro Demo System' },
      content: [{
        type: 'text/html',
        value: `
          <h2>New Demo Booking Request</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Solution:</strong> ${formData.solution}</p>
          <p><strong>Date:</strong> ${formData.date}</p>
          <p><strong>Time:</strong> ${formData.time}</p>
          <p><strong>Notes:</strong> ${formData.notes || 'No additional notes'}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `
      }]
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Demo booking request sent successfully. We will contact you soon!' 
      })
    };
  } catch (error) {
    console.error('SendGrid email failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email via SendGrid', details: error && error.message ? error.message : String(error) })
    };
  }
}

// Handle custom email service or fallback
async function handleCustomEmail(formData, headers) {
  // This is a fallback that logs the data
  // In production, integrate with your preferred email service
  
  const emailContent = `
New Demo Booking Request\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nSolution: ${formData.solution}\nDate: ${formData.date}\nTime: ${formData.time}\nNotes: ${formData.notes || 'No additional notes'}\n\nSubmitted at: ${new Date().toISOString()}
  `;

  console.log('Demo booking request (custom service):', emailContent);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      success: true, 
      message: 'Demo booking request received. We will contact you soon!' 
    })
  };
} 