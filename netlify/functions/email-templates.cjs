const EmailTemplateManager = require('../../emails/template-manager.cjs');

// Initialize template manager
const templateManager = new EmailTemplateManager();

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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

        const { httpMethod, body } = event;

        // Load templates if not already loaded
        if (templateManager.templates.size === 0) {
            await templateManager.loadTemplates();
        }

        if (httpMethod === 'GET') {
            // List all templates
            const templates = templateManager.getAvailableTemplates();
            const templateDetails = templates.map(name => ({
                name,
                content: templateManager.getTemplate(name),
                defaultSubject: templateManager.getDefaultSubject(name)
            }));

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    templates: templateDetails,
                    count: templates.length
                })
            };
        } else if (httpMethod === 'POST') {
            const requestBody = JSON.parse(body || '{}');
            const { action, templateName, content } = requestBody;

            if (!action || !templateName) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Action and template name are required' })
                };
            }

            switch (action) {
                case 'create':
                    if (!content) {
                        return {
                            statusCode: 400,
                            headers,
                            body: JSON.stringify({ error: 'Template content is required' })
                        };
                    }

                    const created = await templateManager.createCustomTemplate(templateName, content);
                    if (created) {
                        return {
                            statusCode: 201,
                            headers,
                            body: JSON.stringify({
                                success: true,
                                message: `Template '${templateName}' created successfully`,
                                templateName
                            })
                        };
                    } else {
                        return {
                            statusCode: 500,
                            headers,
                            body: JSON.stringify({ error: 'Failed to create template' })
                        };
                    }

                case 'update':
                    if (!content) {
                        return {
                            statusCode: 400,
                            headers,
                            body: JSON.stringify({ error: 'Template content is required' })
                        };
                    }

                    const updated = await templateManager.updateTemplate(templateName, content);
                    if (updated) {
                        return {
                            statusCode: 200,
                            headers,
                            body: JSON.stringify({
                                success: true,
                                message: `Template '${templateName}' updated successfully`,
                                templateName
                            })
                        };
                    } else {
                        return {
                            statusCode: 500,
                            headers,
                            body: JSON.stringify({ error: 'Failed to update template' })
                        };
                    }

                case 'preview':
                    const sampleData = requestBody.sampleData || {};
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
                            availableActions: ['create', 'update', 'preview']
                        })
                    };
            }
        } else if (httpMethod === 'DELETE') {
            const { templateName } = JSON.parse(body || '{}');
            
            if (!templateName) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Template name is required' })
                };
            }

            const deleted = await templateManager.deleteTemplate(templateName);
            if (deleted) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        message: `Template '${templateName}' deleted successfully`
                    })
                };
            } else {
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'Failed to delete template' })
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
        console.error('Email templates error:', error);
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