const EmailTemplateManager = require('../../emails/template-manager.cjs');

// Initialize template manager
const templateManager = new EmailTemplateManager();

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
        const { path } = event;
        const pathParts = path.split('/');
        const action = pathParts[pathParts.length - 2]; // 'track' or 'click'
        const trackingId = pathParts[pathParts.length - 1];

        if (!trackingId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing tracking ID' })
            };
        }

        // Get user agent and IP
        const userAgent = event.headers['user-agent'] || '';
        const ipAddress = event.headers['client-ip'] || 
                         event.headers['x-forwarded-for'] || 
                         event.headers['x-real-ip'] || 
                         'unknown';

        let success = false;
        let redirectUrl = null;

        if (action === 'track') {
            // Track email open
            success = templateManager.trackEmailOpen(trackingId, userAgent, ipAddress);
            console.log(`Email open tracked: ${trackingId}, Success: ${success}`);
            
            // Return a 1x1 transparent pixel
            const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
            
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                body: pixel.toString('base64'),
                isBase64Encoded: true
            };
        } else if (action === 'click') {
            // Track email click and get redirect URL
            const queryParams = event.queryStringParameters || {};
            const originalUrl = queryParams.url;
            
            if (!originalUrl) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Missing URL parameter' })
                };
            }

            success = templateManager.trackEmailClick(trackingId, originalUrl, userAgent, ipAddress);
            console.log(`Email click tracked: ${trackingId}, URL: ${originalUrl}, Success: ${success}`);
            
            // Redirect to original URL
            return {
                statusCode: 302,
                headers: {
                    'Location': originalUrl,
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                },
                body: ''
            };
        } else {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid action' })
            };
        }

    } catch (error) {
        console.error('Email tracking error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
}; 