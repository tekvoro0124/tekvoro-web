const EmailTemplateManager = require('../../emails/template-manager.cjs');

// Initialize template manager
const templateManager = new EmailTemplateManager();

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
        // Basic authentication (you can enhance this)
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({ error: 'Unauthorized' })
            };
        }

        const { httpMethod, queryStringParameters } = event;
        const params = queryStringParameters || {};

        if (httpMethod === 'GET') {
            const action = params.action || 'overview';
            
            switch (action) {
                case 'overview':
                    // Get overall analytics
                    const filters = {
                        dateFrom: params.dateFrom,
                        dateTo: params.dateTo,
                        emailType: params.emailType,
                        recipientId: params.recipientId
                    };
                    
                    const analytics = templateManager.getOverallAnalytics(filters);
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            data: analytics,
                            timestamp: new Date().toISOString()
                        })
                    };

                case 'template':
                    // Get analytics for specific template
                    const templateName = params.template;
                    if (!templateName) {
                        return {
                            statusCode: 400,
                            headers,
                            body: JSON.stringify({ error: 'Template name required' })
                        };
                    }
                    
                    const templateAnalytics = templateManager.getTemplateAnalytics(templateName, {
                        dateFrom: params.dateFrom,
                        dateTo: params.dateTo
                    });
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            template: templateName,
                            data: templateAnalytics,
                            timestamp: new Date().toISOString()
                        })
                    };

                case 'templates':
                    // Get list of available templates
                    const templates = templateManager.getAvailableTemplates();
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            templates,
                            count: templates.length
                        })
                    };

                case 'tracking':
                    // Get tracking data for specific ID
                    const trackingId = params.trackingId;
                    if (!trackingId) {
                        return {
                            statusCode: 400,
                            headers,
                            body: JSON.stringify({ error: 'Tracking ID required' })
                        };
                    }
                    
                    const trackingData = templateManager.analytics.getTrackingData(trackingId);
                    
                    if (!trackingData) {
                        return {
                            statusCode: 404,
                            headers,
                            body: JSON.stringify({ error: 'Tracking data not found' })
                        };
                    }
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            trackingId,
                            data: trackingData
                        })
                    };

                case 'export':
                    // Export all analytics data
                    const exportData = templateManager.exportAnalytics();
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            data: exportData,
                            count: exportData.length,
                            timestamp: new Date().toISOString()
                        })
                    };

                default:
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ 
                            error: 'Invalid action',
                            availableActions: ['overview', 'template', 'templates', 'tracking', 'export']
                        })
                    };
            }
        } else if (httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');
            const action = body.action;

            switch (action) {
                case 'import':
                    // Import analytics data
                    const importData = body.data;
                    if (!importData || !Array.isArray(importData)) {
                        return {
                            statusCode: 400,
                            headers,
                            body: JSON.stringify({ error: 'Invalid import data' })
                        };
                    }
                    
                    templateManager.importAnalytics(importData);
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            message: `Imported ${importData.length} records`,
                            count: importData.length
                        })
                    };

                case 'preview':
                    // Get template preview
                    const { templateName, sampleData } = body;
                    if (!templateName) {
                        return {
                            statusCode: 400,
                            headers,
                            body: JSON.stringify({ error: 'Template name required' })
                        };
                    }
                    
                    const preview = templateManager.getTemplatePreview(templateName, sampleData);
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            template: templateName,
                            preview
                        })
                    };

                default:
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ 
                            error: 'Invalid action',
                            availableActions: ['import', 'preview']
                        })
                    };
            }
        } else {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Method not allowed' })
            };
        }

    } catch (error) {
        console.error('Email analytics error:', error);
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