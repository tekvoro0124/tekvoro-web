const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class EmailAnalytics {
    constructor() {
        this.dataFile = path.join(__dirname, 'analytics-data.json');
        this.trackingData = new Map();
        this.emailData = [];
        this.loadData();
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.dataFile, 'utf8');
            const parsed = JSON.parse(data);
            this.emailData = parsed.emailData || [];
            this.trackingData = new Map(parsed.trackingData || []);
        } catch (error) {
            // File doesn't exist or is invalid, start with empty data
            this.emailData = [];
            this.trackingData = new Map();
        }
    }

    async saveData() {
        try {
            const data = {
                emailData: this.emailData,
                trackingData: Array.from(this.trackingData.entries())
            };
            await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving analytics data:', error);
        }
    }

    generateTrackingId(templateName, recipient) {
        const timestamp = Date.now();
        const hash = crypto.createHash('md5')
            .update(`${templateName}-${recipient}-${timestamp}`)
            .digest('hex');
        return `${hash.substring(0, 8)}-${timestamp}`;
    }

    trackEmailSend(data) {
        const record = {
            id: data.trackingId,
            templateName: data.templateName,
            recipient: data.recipient,
            timestamp: data.timestamp,
            subject: data.subject,
            status: 'sent',
            opened: false,
            openedAt: null,
            clicks: [],
            userAgent: null,
            ipAddress: null
        };

        this.emailData.push(record);
        this.trackingData.set(data.trackingId, record);
        this.saveData();
    }

    trackEmailOpen(trackingId, userAgent, ipAddress) {
        const record = this.trackingData.get(trackingId);
        if (record) {
            record.opened = true;
            record.openedAt = new Date().toISOString();
            record.userAgent = userAgent;
            record.ipAddress = ipAddress;

            // Update in emailData array
            const emailRecord = this.emailData.find(e => e.id === trackingId);
            if (emailRecord) {
                Object.assign(emailRecord, {
                    opened: true,
                    openedAt: record.openedAt,
                    userAgent: userAgent,
                    ipAddress: ipAddress
                });
            }

            this.saveData();
            return true;
        }
        return false;
    }

    trackEmailClick(trackingId, url, userAgent, ipAddress) {
        const record = this.trackingData.get(trackingId);
        if (record) {
            const click = {
                url: url,
                timestamp: new Date().toISOString(),
                userAgent: userAgent,
                ipAddress: ipAddress
            };

            record.clicks.push(click);

            // Update in emailData array
            const emailRecord = this.emailData.find(e => e.id === trackingId);
            if (emailRecord) {
                emailRecord.clicks.push(click);
            }

            this.saveData();
            return true;
        }
        return false;
    }

    getTrackingData(trackingId) {
        return this.trackingData.get(trackingId);
    }

    getOverallAnalytics(filters = {}) {
        let filteredData = this.emailData;

        // Apply filters
        if (filters.dateFrom) {
            filteredData = filteredData.filter(e => e.timestamp >= filters.dateFrom);
        }
        if (filters.dateTo) {
            filteredData = filteredData.filter(e => e.timestamp <= filters.dateTo);
        }
        if (filters.emailType) {
            filteredData = filteredData.filter(e => e.templateName === filters.emailType);
        }
        if (filters.recipientId) {
            filteredData = filteredData.filter(e => e.recipient === filters.recipientId);
        }

        const total = filteredData.length;
        const opened = filteredData.filter(e => e.opened).length;
        const clicked = filteredData.filter(e => e.clicks.length > 0).length;

        // Calculate click-through rate
        const totalClicks = filteredData.reduce((sum, e) => sum + e.clicks.length, 0);
        const uniqueClicks = filteredData.filter(e => e.clicks.length > 0).length;

        // Template breakdown
        const templateStats = {};
        filteredData.forEach(email => {
            if (!templateStats[email.templateName]) {
                templateStats[email.templateName] = {
                    sent: 0,
                    opened: 0,
                    clicked: 0
                };
            }
            templateStats[email.templateName].sent++;
            if (email.opened) templateStats[email.templateName].opened++;
            if (email.clicks.length > 0) templateStats[email.templateName].clicked++;
        });

        // Time-based analysis
        const hourlyStats = new Array(24).fill(0);
        const dailyStats = {};
        
        filteredData.forEach(email => {
            const date = new Date(email.timestamp);
            const hour = date.getHours();
            const day = date.toISOString().split('T')[0];
            
            hourlyStats[hour]++;
            dailyStats[day] = (dailyStats[day] || 0) + 1;
        });

        return {
            total,
            opened,
            clicked,
            openRate: total > 0 ? (opened / total * 100).toFixed(2) : 0,
            clickRate: total > 0 ? (clicked / total * 100).toFixed(2) : 0,
            totalClicks,
            uniqueClicks,
            averageClicksPerEmail: total > 0 ? (totalClicks / total).toFixed(2) : 0,
            templateStats,
            hourlyStats,
            dailyStats,
            recentActivity: filteredData
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 10)
        };
    }

    getTemplateAnalytics(templateName, filters = {}) {
        const templateFilters = { ...filters, emailType: templateName };
        const overall = this.getOverallAnalytics(templateFilters);
        
        // Get specific template data
        const templateData = this.emailData.filter(e => e.templateName === templateName);
        
        // Click analysis
        const clickAnalysis = {};
        templateData.forEach(email => {
            email.clicks.forEach(click => {
                const domain = new URL(click.url).hostname;
                clickAnalysis[domain] = (clickAnalysis[domain] || 0) + 1;
            });
        });

        // User agent analysis
        const userAgents = {};
        templateData.forEach(email => {
            if (email.userAgent) {
                const browser = this.parseUserAgent(email.userAgent);
                userAgents[browser] = (userAgents[browser] || 0) + 1;
            }
        });

        return {
            ...overall,
            templateName,
            clickAnalysis,
            userAgents,
            topClickedUrls: Object.entries(clickAnalysis)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([url, count]) => ({ url, count }))
        };
    }

    parseUserAgent(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'Internet Explorer';
        return 'Other';
    }

    exportData() {
        return {
            emailData: this.emailData,
            trackingData: Array.from(this.trackingData.entries()),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importData(data) {
        if (data.emailData && Array.isArray(data.emailData)) {
            this.emailData = data.emailData;
        }
        if (data.trackingData && Array.isArray(data.trackingData)) {
            this.trackingData = new Map(data.trackingData);
        }
        this.saveData();
        return true;
    }

    // Cleanup old data (older than 90 days)
    async cleanupOldData() {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 90);

        this.emailData = this.emailData.filter(email => 
            new Date(email.timestamp) > cutoffDate
        );

        // Clean up tracking data
        for (const [trackingId, record] of this.trackingData.entries()) {
            if (new Date(record.timestamp) <= cutoffDate) {
                this.trackingData.delete(trackingId);
            }
        }

        await this.saveData();
    }
}

module.exports = EmailAnalytics; 