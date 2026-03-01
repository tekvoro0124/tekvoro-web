const EmailTemplateManager = require('../../emails/template-manager.cjs');

// Initialize template manager
const templateManager = new EmailTemplateManager();

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {}
    };

    // Check template manager
    try {
      await templateManager.loadTemplates();
      const templates = templateManager.getAvailableTemplates();
      healthCheck.services.templateManager = {
        status: 'healthy',
        templates: templates,
        count: templates.length
      };
    } catch (error) {
      healthCheck.services.templateManager = {
        status: 'unhealthy',
        error: error.message
      };
      healthCheck.status = 'degraded';
    }

    // Check SendGrid configuration
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    healthCheck.services.sendgrid = {
      status: sendgridApiKey ? 'configured' : 'not_configured',
      hasApiKey: !!sendgridApiKey
    };

    if (!sendgridApiKey) {
      healthCheck.status = 'degraded';
    }

    // Check environment variables
    healthCheck.services.environment = {
      status: 'healthy',
      variables: {
        hasSendGridApiKey: !!process.env.SENDGRID_API_KEY,
        hasEmailFromAddress: !!process.env.EMAIL_FROM_ADDRESS,
        hasEmailReplyTo: !!process.env.EMAIL_REPLY_TO
      }
    };

    // Check analytics system
    try {
      const analytics = templateManager.getOverallAnalytics();
      healthCheck.services.analytics = {
        status: 'healthy',
        totalEmails: analytics.total,
        openedEmails: analytics.opened,
        clickedEmails: analytics.clicked
      };
    } catch (error) {
      healthCheck.services.analytics = {
        status: 'unhealthy',
        error: error.message
      };
      healthCheck.status = 'degraded';
    }

    // Check tracking system
    try {
      const trackingId = templateManager.analytics.generateTrackingId('health-check', 'test');
      healthCheck.services.tracking = {
        status: 'healthy',
        sampleTrackingId: trackingId
      };
    } catch (error) {
      healthCheck.services.tracking = {
        status: 'unhealthy',
        error: error.message
      };
      healthCheck.status = 'degraded';
    }

    // Determine overall status
    const statusCode = healthCheck.status === 'healthy' ? 200 : 
                      healthCheck.status === 'degraded' ? 200 : 503;

    return {
      statusCode,
      headers,
      body: JSON.stringify(healthCheck)
    };

  } catch (error) {
    console.error('Health check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      })
    };
  }
}; 