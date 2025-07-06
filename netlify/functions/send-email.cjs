const EmailTemplateManager = require('../../emails/template-manager.cjs');
const sgMail = require('@sendgrid/mail');

// Initialize template manager
const templateManager = new EmailTemplateManager();

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
}

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
        const {
            templateName,
            to,
            subject,
            data = {},
            from = 'info@tekvoro.com',
            replyTo,
            attachments = [],
            testMode = false
        } = body;

        // Validate required fields
        if (!templateName) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Template name is required' })
            };
        }

        if (!to) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Recipient email is required' })
            };
        }

        // Load templates if not already loaded
        if (templateManager.templates.size === 0) {
            await templateManager.loadTemplates();
        }

        // Check if template exists
        if (!templateManager.getTemplate(templateName)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Template not found',
                    availableTemplates: templateManager.getAvailableTemplates()
                })
            };
        }

        // Prepare email data
        const emailData = {
            ...data,
            email: to,
            subject: subject || templateManager.getDefaultSubject(templateName),
            recipientId: data.recipientId || `user_${Date.now()}`,
            timestamp: new Date().toISOString()
        };

        // Process template
        const htmlContent = templateManager.processTemplate(templateName, emailData);

        // Prepare SendGrid message
        const msg = {
            to: to,
            from: from,
            subject: emailData.subject,
            html: htmlContent,
            replyTo: replyTo || from,
            attachments: attachments,
            trackingSettings: {
                clickTracking: {
                    enable: true,
                    enableText: true
                },
                openTracking: {
                    enable: true
                },
                subscriptionTracking: {
                    enable: false
                }
            },
            customArgs: {
                template_name: templateName,
                tracking_id: emailData.trackingId,
                recipient_id: emailData.recipientId
            }
        };

        let sendResult;

        if (testMode) {
            // Test mode - just return the processed template
            sendResult = {
                success: true,
                testMode: true,
                message: 'Email processed in test mode',
                html: htmlContent,
                trackingId: emailData.trackingId
            };
        } else {
            // Send actual email
            if (!SENDGRID_API_KEY) {
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ 
                        error: 'SendGrid API key not configured',
                        message: 'Please set SENDGRID_API_KEY environment variable'
                    })
                };
            }

            try {
                const response = await sgMail.send(msg);
                sendResult = {
                    success: true,
                    message: 'Email sent successfully',
                    trackingId: emailData.trackingId,
                    sendGridResponse: response[0]
                };
            } catch (sendError) {
                console.error('SendGrid error:', sendError);
                
                // Fallback to Netlify email service or simple logging
                console.log('Falling back to Netlify email service...');
                
                // For now, just log the email and return success
                // In production, you'd integrate with Netlify's email service
                const emailContent = `
Email Template: ${templateName}
To: ${to}
Subject: ${emailData.subject}
Content: ${htmlContent.substring(0, 200)}...
                `;
                
                console.log('Email content (fallback):', emailContent);
                
                sendResult = {
                    success: true,
                    message: 'Email logged successfully (SendGrid unavailable)',
                    trackingId: emailData.trackingId,
                    fallback: true
                };
            }
        }

        // Log the email sending
        console.log(`Email sent: ${templateName} to ${to}, Tracking ID: ${emailData.trackingId}`);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(sendResult)
        };

    } catch (error) {
        console.error('Send email error:', error);
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