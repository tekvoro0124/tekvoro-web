const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Enable CORS
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
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { email, name, company, interests, selectedPlan } = body;

    // Validate required fields
    if (!email || !name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Email and name are required',
          success: false 
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Please enter a valid email address',
          success: false 
        })
      };
    }

    // Log subscription for analytics (this always works)
    console.log('New subscription:', {
      email,
      name,
      company,
      interests,
      selectedPlan,
      timestamp: new Date().toISOString()
    });

    // Try to send emails, but don't fail if SendGrid is not configured
    let emailSent = false;
    try {
      // Set SendGrid API key
      const apiKey = process.env.SENDGRID_API_KEY;
      if (!apiKey) {
        console.log('SendGrid API key not configured, skipping email sending');
      } else {
        sgMail.setApiKey(apiKey);

        // Create welcome email content
        const welcomeEmailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #fbbf24; margin: 0; font-size: 28px;">Welcome to Tekvoro Insights!</h1>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #fbbf24; margin-top: 0;">Thank you for subscribing, ${name}!</h2>
              <p style="line-height: 1.6; margin-bottom: 15px;">
                You're now part of our exclusive community of technology professionals and innovators. 
                We're excited to share cutting-edge insights, expert analysis, and the latest trends 
                in AI and technology with you.
              </p>
              
              <div style="background: rgba(251, 191, 36, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 20px 0;">
                <h3 style="color: #fbbf24; margin: 0 0 10px 0;">Your Subscription Details:</h3>
                <p style="margin: 5px 0;"><strong>Plan:</strong> ${selectedPlan || 'Free'}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                ${company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ''}
                ${interests && interests.length > 0 ? `<p style="margin: 5px 0;"><strong>Interests:</strong> ${interests.join(', ')}</p>` : ''}
              </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="color: #fbbf24; margin-top: 0;">What to Expect:</h3>
              <ul style="line-height: 1.8; padding-left: 20px;">
                <li>Weekly insights on AI and technology trends</li>
                <li>Exclusive access to expert interviews and analysis</li>
                <li>Early access to research reports and whitepapers</li>
                <li>Invitations to exclusive webinars and events</li>
                <li>Community access to connect with fellow professionals</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://tekvoro.com/read-insights" style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: black; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px;">
                Read Latest Insights
              </a>
              <a href="https://tekvoro.com/contact" style="display: inline-block; background: rgba(255,255,255,0.1); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px; border: 1px solid rgba(255,255,255,0.2);">
                Contact Us
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                You can unsubscribe at any time by clicking the link in the footer of our emails.
              </p>
              <p style="color: #9ca3af; font-size: 14px; margin: 10px 0 0 0;">
                © 2024 Tekvoro Technologies. All rights reserved.
              </p>
            </div>
          </div>
        `;

        // Send welcome email to subscriber
        const welcomeEmail = {
          to: email,
          from: {
            email: 'noreply@tekvoro.com',
            name: 'Tekvoro Technologies'
          },
          subject: 'Welcome to Tekvoro Insights! 🚀',
          html: welcomeEmailContent
        };

        // Send notification email to admin
        const adminEmailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #fbbf24;">New Newsletter Subscription</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Selected Plan:</strong> ${selectedPlan || 'Free'}</p>
              <p><strong>Interests:</strong> ${interests && interests.length > 0 ? interests.join(', ') : 'None selected'}</p>
              <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `;

        const adminEmail = {
          to: 'admin@tekvoro.com', // Replace with your admin email
          from: {
            email: 'noreply@tekvoro.com',
            name: 'Tekvoro Newsletter System'
          },
          subject: 'New Newsletter Subscription - Tekvoro',
          html: adminEmailContent
        };

        // Send emails
        await Promise.all([
          sgMail.send(welcomeEmail),
          sgMail.send(adminEmail)
        ]);

        emailSent = true;
        console.log('Welcome emails sent successfully');
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the subscription if email sending fails
      emailSent = false;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: emailSent 
          ? 'Thank you for subscribing! Please check your email for confirmation.'
          : 'Thank you for subscribing! Your subscription has been recorded successfully.',
        data: {
          email,
          name,
          company,
          interests,
          selectedPlan,
          emailSent
        }
      })
    };

  } catch (error) {
    console.error('Subscription error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Subscription failed. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}; 