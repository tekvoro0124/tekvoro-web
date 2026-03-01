// Google Analytics 4 Integration for Tekvoro
// Set VITE_GA_MEASUREMENT_ID in your .env file

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    console.log('Google Analytics not configured');
    return;
  }

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });

  console.log('Google Analytics initialized');
};

// Track page views (call on route change)
export const trackPageView = (path: string, title?: string): void => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string): void => {
  trackEvent('click', 'Button', `${buttonName}${location ? ` - ${location}` : ''}`);
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean): void => {
  trackEvent('submit', 'Form', formName, success ? 1 : 0);
};

// Track demo bookings
export const trackDemoBooking = (service?: string): void => {
  trackEvent('book_demo', 'Conversion', service);
};

// Track contact form
export const trackContactSubmission = (source?: string): void => {
  trackEvent('contact_submit', 'Conversion', source);
};

// Track newsletter subscription
export const trackNewsletterSubscription = (): void => {
  trackEvent('subscribe', 'Conversion', 'Newsletter');
};

// Track service page views
export const trackServiceView = (serviceName: string): void => {
  trackEvent('view_service', 'Engagement', serviceName);
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number): void => {
  trackEvent('search', 'Engagement', query, resultsCount);
};

// Track outbound links
export const trackOutboundLink = (url: string): void => {
  trackEvent('click', 'Outbound Link', url);
};

// Track scroll depth
export const trackScrollDepth = (percentage: number): void => {
  trackEvent('scroll', 'Engagement', `${percentage}%`);
};

// Track time on page (call before page unload)
export const trackTimeOnPage = (seconds: number): void => {
  trackEvent('time_on_page', 'Engagement', window.location.pathname, seconds);
};

// Track chatbot interactions
export const trackChatbotInteraction = (action: string): void => {
  trackEvent(action, 'Chatbot', window.location.pathname);
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackFormSubmission,
  trackDemoBooking,
  trackContactSubmission,
  trackNewsletterSubscription,
  trackServiceView,
  trackSearch,
  trackOutboundLink,
  trackScrollDepth,
  trackTimeOnPage,
  trackChatbotInteraction,
};
