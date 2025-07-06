const fs = require('fs').promises;
const path = require('path');
const EmailAnalytics = require('./analytics.cjs');

class EmailTemplateManager {
    constructor() {
        this.templates = new Map();
        // Use process.cwd() for Netlify functions compatibility
        this.templatesDir = path.join(process.cwd(), 'emails', 'templates');
        this.analytics = new EmailAnalytics();
        this.customTemplatesDir = path.join(process.cwd(), 'emails', 'custom-templates');
    }

    async loadTemplates() {
        try {
            // Load built-in templates
            const templateFiles = await fs.readdir(this.templatesDir);
            
            for (const file of templateFiles) {
                if (file.endsWith('.html')) {
                    const templateName = path.basename(file, '.html');
                    const templatePath = path.join(this.templatesDir, file);
                    const content = await fs.readFile(templatePath, 'utf8');
                    this.templates.set(templateName, content);
                }
            }

            // Load custom templates if directory exists
            try {
                await fs.access(this.customTemplatesDir);
                const customTemplateFiles = await fs.readdir(this.customTemplatesDir);
                
                for (const file of customTemplateFiles) {
                    if (file.endsWith('.html')) {
                        const templateName = path.basename(file, '.html');
                        const templatePath = path.join(this.customTemplatesDir, file);
                        const content = await fs.readFile(templatePath, 'utf8');
                        this.templates.set(templateName, content);
                    }
                }
            } catch (error) {
                // Custom templates directory doesn't exist, that's okay
                console.log('Custom templates directory not found, skipping...');
            }

            console.log(`Loaded ${this.templates.size} templates`);
            return true;
        } catch (error) {
            console.error('Error loading templates:', error);
            return false;
        }
    }

    getAvailableTemplates() {
        return Array.from(this.templates.keys());
    }

    getTemplate(templateName) {
        return this.templates.get(templateName);
    }

    getDefaultSubject(templateName) {
        const subjects = {
            'demo-booking': 'New Demo Request - Tekvoro Technologies',
            'contact-form': 'New Contact Form Submission - Tekvoro Technologies',
            'newsletter': 'Tekvoro Technologies Newsletter',
            'welcome': 'Welcome to Tekvoro Technologies'
        };
        return subjects[templateName] || 'Email from Tekvoro Technologies';
    }

    processTemplate(templateName, data = {}) {
        const template = this.getTemplate(templateName);
        if (!template) {
            throw new Error(`Template '${templateName}' not found`);
        }

        let processedTemplate = template;

        // Add common variables
        const commonData = {
            ...data,
            timestamp: new Date().toISOString(),
            message_id: this.analytics.generateTrackingId(templateName, data.email || 'unknown'),
            tracking_url: `${process.env.NETLIFY_URL || 'http://localhost:8888'}/.netlify/functions/email-track?id={{message_id}}`
        };

        // Replace variables in template
        for (const [key, value] of Object.entries(commonData)) {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            processedTemplate = processedTemplate.replace(placeholder, value || '');
        }

        // Replace tracking URL with actual message ID
        processedTemplate = processedTemplate.replace(/{{message_id}}/g, commonData.message_id);

        return processedTemplate;
    }

    async sendEmail(templateName, data, sendFunction) {
        try {
            const processedTemplate = this.processTemplate(templateName, data);
            const subject = data.subject || this.getDefaultSubject(templateName);
            
            const emailData = {
                to: data.email,
                from: process.env.EMAIL_FROM_ADDRESS || 'noreply@tekvoro.com',
                replyTo: process.env.EMAIL_REPLY_TO || 'info@tekvoro.com',
                subject: subject,
                html: processedTemplate,
                trackingId: data.message_id
            };

            const result = await sendFunction(emailData);
            
            // Track email send
            this.analytics.trackEmailSend({
                templateName,
                recipient: data.email,
                trackingId: emailData.trackingId,
                timestamp: new Date().toISOString(),
                subject: subject
            });

            return {
                success: true,
                trackingId: emailData.trackingId,
                messageId: result.messageId || emailData.trackingId
            };
        } catch (error) {
            console.error('Error sending email:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    getTemplatePreview(templateName, sampleData = {}) {
        try {
            return this.processTemplate(templateName, sampleData);
        } catch (error) {
            console.error('Error generating preview:', error);
            return null;
        }
    }

    async createCustomTemplate(templateName, content) {
        try {
            // Ensure custom templates directory exists
            await fs.mkdir(this.customTemplatesDir, { recursive: true });
            
            const templatePath = path.join(this.customTemplatesDir, `${templateName}.html`);
            await fs.writeFile(templatePath, content, 'utf8');
            
            // Add to loaded templates
            this.templates.set(templateName, content);
            
            return true;
        } catch (error) {
            console.error('Error creating custom template:', error);
            return false;
        }
    }

    async updateTemplate(templateName, content) {
        try {
            // Check if it's a custom template
            const customTemplatePath = path.join(this.customTemplatesDir, `${templateName}.html`);
            
            try {
                await fs.access(customTemplatePath);
                // It's a custom template, update it
                await fs.writeFile(customTemplatePath, content, 'utf8');
            } catch (error) {
                // It's a built-in template, create as custom
                await this.createCustomTemplate(templateName, content);
            }
            
            // Update in memory
            this.templates.set(templateName, content);
            
            return true;
        } catch (error) {
            console.error('Error updating template:', error);
            return false;
        }
    }

    async deleteTemplate(templateName) {
        try {
            // Check if it's a custom template
            const customTemplatePath = path.join(this.customTemplatesDir, `${templateName}.html`);
            
            try {
                await fs.access(customTemplatePath);
                // It's a custom template, delete it
                await fs.unlink(customTemplatePath);
            } catch (error) {
                // It's a built-in template, cannot delete
                return false;
            }
            
            // Remove from memory
            this.templates.delete(templateName);
            
            return true;
        } catch (error) {
            console.error('Error deleting template:', error);
            return false;
        }
    }

    getOverallAnalytics(filters = {}) {
        return this.analytics.getOverallAnalytics(filters);
    }

    getTemplateAnalytics(templateName, filters = {}) {
        return this.analytics.getTemplateAnalytics(templateName, filters);
    }

    exportAnalytics() {
        return this.analytics.exportData();
    }

    importAnalytics(data) {
        return this.analytics.importData(data);
    }
}

module.exports = EmailTemplateManager; 