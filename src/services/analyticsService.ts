// Analytics Service for tracking user interactions
// Integrates with backend API and Google Analytics 4

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class AnalyticsService {
  private apiBaseUrl: string;
  private sessionId: string;
  private isInitialized = false;
  private gaMeasurementId: string | undefined;

  constructor() {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';
    this.apiBaseUrl = import.meta.env.DEV ? 'http://localhost:5002' : baseUrl;
    this.sessionId = this.generateSessionId();
    this.gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  }

  // Initialize Google Analytics
  private initGoogleAnalytics(): void {
    if (!this.gaMeasurementId || typeof window === 'undefined') return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaMeasurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.gaMeasurementId, {
      page_path: window.location.pathname,
      send_page_view: true,
    });
  }

  // Send event to Google Analytics
  private sendToGA(eventName: string, params: Record<string, any> = {}): void {
    if (!this.gaMeasurementId || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', eventName, params);
  }

  // Initialize analytics tracking
  initialize(): void {
    if (this.isInitialized) return;

    // Initialize Google Analytics
    this.initGoogleAnalytics();

    this.trackPageView(window.location.pathname);

    // Track page changes (for SPAs)
    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });

    // Track clicks on important elements
    this.trackUserInteractions();

    this.isInitialized = true;
  }

  // Generate unique session ID
  private generateSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track page view
  trackPageView(path: string, metadata: Record<string, any> = {}): void {
    // Send to Google Analytics
    this.sendToGA('page_view', {
      page_path: path,
      page_title: document.title,
    });

    // Send to backend
    this.trackEvent('page-view', path, {
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      ...metadata
    });
  }

  // Track contact form submission
  trackContactSubmission(type: string = 'contact'): void {
    this.sendToGA('generate_lead', {
      event_category: 'Contact',
      event_label: type,
    });
    this.trackEvent('contact-form', window.location.pathname, {
      formType: type,
      timestamp: new Date().toISOString()
    });
  }

  // Track subscription
  trackSubscription(plan: string = 'free'): void {
    this.sendToGA('sign_up', {
      event_category: 'Subscription',
      event_label: plan,
    });
    this.trackEvent('subscription', window.location.pathname, {
      plan,
      timestamp: new Date().toISOString()
    });
  }

  // Track demo request
  trackDemoRequest(): void {
    this.sendToGA('generate_lead', {
      event_category: 'Conversion',
      event_label: 'Demo Request',
    });
    this.trackEvent('demo-request', window.location.pathname, {
      timestamp: new Date().toISOString()
    });
  }

  // Track campaign open (when user opens newsletter)
  trackCampaignOpen(campaignId: string): void {
    this.sendToGA('campaign_open', {
      campaign_id: campaignId,
    });
    this.trackEvent('campaign-open', window.location.pathname, {
      campaignId,
      timestamp: new Date().toISOString()
    });
  }

  // Track campaign click (when user clicks link in newsletter)
  trackCampaignClick(campaignId: string, linkUrl: string): void {
    this.sendToGA('campaign_click', {
      campaign_id: campaignId,
      link_url: linkUrl,
    });
    this.trackEvent('campaign-click', linkUrl, {
      campaignId,
      timestamp: new Date().toISOString()
    });
  }

  // Generic event tracking
  trackEvent(type: string, path: string, metadata: Record<string, any> = {}): void {
    // Send to backend (fire and forget)
    fetch(`${this.apiBaseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        path,
        referrer: metadata.referrer || document.referrer,
        userAgent: metadata.userAgent || navigator.userAgent,
        sessionId: this.sessionId,
        metadata
      }),
    }).catch((error) => {
      // Silently fail - analytics shouldn't break the app
      console.warn('Analytics tracking failed:', error);
    });

    // Also track locally for development/debugging
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', { type, path, metadata });
    }
  }

  // Track user interactions (clicks, scrolls, etc.)
  private trackUserInteractions(): void {
    // Track important button clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Track CTA button clicks
      if (target.closest('[data-track="cta"]')) {
        this.trackEvent('cta-click', window.location.pathname, {
          buttonText: target.textContent?.trim(),
          buttonId: target.id || target.closest('[id]')?.id
        });
      }

      // Track service link clicks
      if (target.closest('[data-track="service"]')) {
        const serviceElement = target.closest('[data-service]') as HTMLElement;
        const serviceId = serviceElement?.dataset.service;
        this.trackEvent('service-click', window.location.pathname, {
          serviceId,
          serviceName: target.textContent?.trim()
        });
      }

      // Track blog post clicks
      if (target.closest('[data-track="blog"]')) {
        const blogElement = target.closest('[data-blog]') as HTMLElement;
        const blogId = blogElement?.dataset.blog;
        this.trackEvent('blog-click', window.location.pathname, {
          blogId,
          blogTitle: target.textContent?.trim()
        });
      }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth && scrollPercent >= 25) {
        maxScrollDepth = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments
        this.trackEvent('scroll-depth', window.location.pathname, {
          depth: maxScrollDepth,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Track time spent on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) { // Only track if spent more than 10 seconds
        this.trackEvent('time-spent', window.location.pathname, {
          seconds: timeSpent,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  // Get analytics summary (for admin dashboard)
  async getAnalyticsSummary(startDate?: string, endDate?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`${this.apiBaseUrl}/analytics/summary?${params}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');

      return await response.json();
    } catch (error) {
      console.error('Failed to get analytics summary:', error);
      return null;
    }
  }

  // Get popular pages
  async getPopularPages(limit: number = 10): Promise<any> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/analytics/popular-pages?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch popular pages');

      return await response.json();
    } catch (error) {
      console.error('Failed to get popular pages:', error);
      return null;
    }
  }

  // Get user journey
  async getUserJourney(sessionId?: string, userId?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (sessionId) params.append('sessionId', sessionId);
      if (userId) params.append('userId', userId);

      const response = await fetch(`${this.apiBaseUrl}/analytics/user-journey?${params}`);
      if (!response.ok) throw new Error('Failed to fetch user journey');

      return await response.json();
    } catch (error) {
      console.error('Failed to get user journey:', error);
      return null;
    }
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

export default analyticsService;
