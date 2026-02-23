// Email Service for Frontend Integration

export interface EmailData {
  templateName: string;
  to: string;
  subject?: string;
  data: Record<string, any>;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
  testMode?: boolean;
}

export interface EmailResponse {
  success: boolean;
  trackingId?: string;
  message?: string;
  error?: string;
}

export interface AnalyticsData {
  total: number;
  opened: number;
  clicked: number;
  openRate: string;
  clickRate: string;
  byEmailType: Record<string, { total: number; opened: number; clicked: number }>;
  byDate: Record<string, { total: number; opened: number; clicked: number }>;
  topClickedUrls: Record<string, number>;
  userAgents: Record<string, number>;
}

export interface Template {
  name: string;
  content: string;
  defaultSubject: string;
  lastModified?: string;
}

class EmailService {
  private baseUrl: string;
  private authToken: string;

  constructor() {
    // Use the correct domain for production (tekvoro.com instead of www.tekvoro.com)
    this.baseUrl = import.meta.env.DEV ? 'http://localhost:8888' : 'https://tekvoro.com';
    this.authToken = 'admin-token'; // In production, get from auth context
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Email service request failed:', error);
      throw error;
    }
  }

  // Send Email
  async sendEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      const response = await this.makeRequest('/.netlify/functions/send-email', {
        method: 'POST',
        body: JSON.stringify(emailData),
      });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  // Get Analytics
  async getAnalytics(filters?: {
    dateFrom?: string;
    dateTo?: string;
    emailType?: string;
    recipientId?: string;
  }): Promise<AnalyticsData | null> {
    try {
      const params = new URLSearchParams();
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) params.append('dateTo', filters.dateTo);
      if (filters?.emailType) params.append('emailType', filters.emailType);
      if (filters?.recipientId) params.append('recipientId', filters.recipientId);

      const response = await this.makeRequest(`/.netlify/functions/email-analytics?action=overview&${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get analytics:', error);
      return null;
    }
  }

  // Get Template Analytics
  async getTemplateAnalytics(templateName: string, filters?: {
    dateFrom?: string;
    dateTo?: string;
  }): Promise<AnalyticsData | null> {
    try {
      const params = new URLSearchParams({
        action: 'template',
        template: templateName,
      });
      
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) params.append('dateTo', filters.dateTo);

      const response = await this.makeRequest(`/.netlify/functions/email-analytics?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get template analytics:', error);
      return null;
    }
  }

  // Get Templates
  async getTemplates(): Promise<Template[]> {
    try {
      const response = await this.makeRequest('/.netlify/functions/email-templates');
      return response.templates || [];
    } catch (error) {
      console.error('Failed to get templates:', error);
      return [];
    }
  }

  // Create Template
  async createTemplate(name: string, content: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('/.netlify/functions/email-templates', {
        method: 'POST',
        body: JSON.stringify({
          action: 'create',
          templateName: name,
          content,
        }),
      });

      return response.success;
    } catch (error) {
      console.error('Failed to create template:', error);
      return false;
    }
  }

  // Update Template
  async updateTemplate(name: string, content: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('/.netlify/functions/email-templates', {
        method: 'POST',
        body: JSON.stringify({
          action: 'update',
          templateName: name,
          content,
        }),
      });

      return response.success;
    } catch (error) {
      console.error('Failed to update template:', error);
      return false;
    }
  }

  // Delete Template
  async deleteTemplate(name: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('/.netlify/functions/email-templates', {
        method: 'DELETE',
        body: JSON.stringify({ templateName: name }),
      });

      return response.success;
    } catch (error) {
      console.error('Failed to delete template:', error);
      return false;
    }
  }

  // Get Template Preview
  async getTemplatePreview(templateName: string, sampleData: Record<string, any> = {}): Promise<string> {
    try {
      const response = await this.makeRequest('/api/email-analytics', {
        method: 'POST',
        body: JSON.stringify({
          action: 'preview',
          templateName,
          sampleData,
        }),
      });

      return response.preview || '';
    } catch (error) {
      console.error('Failed to get template preview:', error);
      return '';
    }
  }

  // Track Email Open (for testing)
  async trackEmailOpen(trackingId: string): Promise<boolean> {
    try {
      await this.makeRequest(`/api/email-track/${trackingId}`);
      return true;
    } catch (error) {
      console.error('Failed to track email open:', error);
      return false;
    }
  }

  // Track Email Click (for testing)
  async trackEmailClick(trackingId: string, url: string): Promise<boolean> {
    try {
      const encodedUrl = encodeURIComponent(url);
      await this.makeRequest(`/api/email-click/${trackingId}?url=${encodedUrl}`);
      return true;
    } catch (error) {
      console.error('Failed to track email click:', error);
      return false;
    }
  }

  // Export Analytics Data
  async exportAnalytics(): Promise<any[]> {
    try {
      const response = await this.makeRequest('/api/email-analytics?action=export');
      return response.data || [];
    } catch (error) {
      console.error('Failed to export analytics:', error);
      return [];
    }
  }

  // Import Analytics Data
  async importAnalytics(data: any[]): Promise<boolean> {
    try {
      const response = await this.makeRequest('/api/email-analytics', {
        method: 'POST',
        body: JSON.stringify({
          action: 'import',
          data,
        }),
      });

      return response.success;
    } catch (error) {
      console.error('Failed to import analytics:', error);
      return false;
    }
  }

  // Send Demo Booking Email
  async sendDemoBooking(data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    solution?: string;
    date?: string;
    time?: string;
    message?: string;
  }): Promise<EmailResponse> {
    return this.sendEmail({
      templateName: 'demo-booking',
      to: 'info@tekvoro.com',
      subject: 'New Demo Booking Request',
      data: {
        ...data,
        recipientId: `demo_${Date.now()}`,
      },
    });
  }

  // Send Contact Form Email
  async sendContactForm(data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject?: string;
    category?: string;
    message?: string;
  }): Promise<EmailResponse> {
    return this.sendEmail({
      templateName: 'contact-form',
      to: 'info@tekvoro.com',
      subject: data.subject || 'New Contact Form Submission',
      data: {
        ...data,
        recipientId: `contact_${Date.now()}`,
      },
    });
  }

  // Send Welcome Email
  async sendWelcomeEmail(data: {
    user_name: string;
    user_email: string;
    user_id: string;
  }): Promise<EmailResponse> {
    return this.sendEmail({
      templateName: 'welcome',
      to: data.user_email,
      subject: 'Welcome to Tekvoro! 🎉',
      data: {
        ...data,
        recipientId: data.user_id,
      },
    });
  }

  // Send Newsletter
  async sendNewsletter(data: {
    newsletter_title: string;
    newsletter_intro: string;
    subscriber_name: string;
    subscriber_email: string;
    subscriber_id: string;
    articles: Array<{
      title: string;
      excerpt: string;
      read_more_url: string;
    }>;
  }): Promise<EmailResponse> {
    return this.sendEmail({
      templateName: 'newsletter',
      to: data.subscriber_email,
      subject: data.newsletter_title,
      data: {
        ...data,
        recipientId: data.subscriber_id,
      },
    });
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService; 