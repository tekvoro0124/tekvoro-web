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

  constructor() {
    // Use API URL from environment, fallback to production
    const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';
    this.baseUrl = import.meta.env.DEV 
      ? 'http://localhost:5002'  // Local API
      : apiUrl;  // Production API
  }

  private async makeRequest(endpoint: string, data: any) {
    try {
      const url = `${this.baseUrl}/api/email${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Email service error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Email service request failed:', error);
      throw error;
    }
  }

  async sendDemoBooking(data: any) {
    return this.makeRequest('/send-email', {
      type: 'demo-booking',
      ...data
    });
  }

  async sendSubscription(email: string) {
    return this.makeRequest('/send-email', {
      type: 'subscription',
      email
    });
  }

  async sendEmail(data: EmailData): Promise<EmailResponse> {
    return this.makeRequest('/send-email', data);
  }

  async trackEmailOpen(trackingId: string, userAgent: string): Promise<void> {
    return this.makeRequest('/track/open', { trackingId, userAgent });
  }

  async trackEmailClick(trackingId: string, url: string, userAgent: string): Promise<void> {
    return this.makeRequest('/track/click', { trackingId, url, userAgent });
  }

  async getAnalytics(startDate?: string, endDate?: string): Promise<AnalyticsData> {
    return this.makeRequest('/analytics', { startDate, endDate });
  }

  async exportAnalytics(format: 'csv' | 'json' = 'csv'): Promise<any> {
    return this.makeRequest('/analytics/export', { format });
  }
}

export default new EmailService();