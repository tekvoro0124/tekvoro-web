import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect } from 'react';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollToTopButton from './components/layout/ScrollToTopButton';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PasswordManager from './components/admin/PasswordManager';
import analyticsService from './services/analyticsService';

const HomePage = lazy(() => import('./pages/HomePage'));
const EnterpriseAutomationPage = lazy(() => import('./pages/services/EnterpriseAutomationPage'));
const InnovationStrategyPage = lazy(() => import('./pages/services/InnovationStrategyPage'));
const LegacyModernizationPage = lazy(() => import('./pages/services/LegacyModernizationPage'));
const PredictiveAnalyticsPage = lazy(() => import('./pages/services/PredictiveAnalyticsPage'));
const IntelligentSystemsPage = lazy(() => import('./pages/services/IntelligentSystemsPage'));
const AiSolutionsPage = lazy(() => import('./pages/services/AiSolutionsPage'));
const SmartInfrastructurePage = lazy(() => import('./pages/services/SmartInfrastructurePage'));
const ConnectedDevicesPage = lazy(() => import('./pages/services/ConnectedDevicesPage'));
const CloudSolutionsPage = lazy(() => import('./pages/services/CloudSolutionsPage'));
const CybersecuritySolutionsPage = lazy(() => import('./pages/services/CybersecuritySolutionsPage'));
const TelemedicinePage = lazy(() => import('./pages/services/TelemedicinePage'));
const HealthcareAiPage = lazy(() => import('./pages/services/HealthcareAiPage'));
const MedicalDevicesPage = lazy(() => import('./pages/services/MedicalDevicesPage'));
const WhatsNewPage = lazy(() => import('./pages/products/WhatsNewPage'));
const ProductRoadmapPage = lazy(() => import('./pages/products/ProductRoadmapPage'));
const BetaProgramsPage = lazy(() => import('./pages/products/BetaProgramsPage'));
const EventsPage = lazy(() => import('./pages/insights/EventsPage'));
const UpcomingWebinarsPage = lazy(() => import('./pages/insights/UpcomingWebinarsPage'));
const LeadershipTeamPage = lazy(() => import('./pages/insights/LeadershipTeamPage'));
const TechMeetupsPage = lazy(() => import('./pages/insights/TechMeetupsPage'));
const HackathonsChallengesPage = lazy(() => import('./pages/insights/HackathonsChallengesPage'));
const SeeOurSolutionsPage = lazy(() => import('./pages/solutions/SeeOurSolutionsPage'));
const BookDemoPage = lazy(() => import('./pages/BookDemoPage'));
const LearnMorePage = lazy(() => import('./pages/LearnMorePage'));
const MeetTheTeamPage = lazy(() => import('./pages/MeetTheTeamPage'));
const ViewPortfolioPage = lazy(() => import('./pages/ViewPortfolioPage'));
const SeeCaseStudiesPage = lazy(() => import('./pages/SeeCaseStudiesPage'));
const ReadInsightsPage = lazy(() => import('./pages/ReadInsightsPage'));
const SubscribePage = lazy(() => import('./pages/SubscribePage'));
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const LeadershipPage = lazy(() => import('./pages/about/LeadershipPage'));
const CulturePage = lazy(() => import('./pages/about/CulturePage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const SupportPage = lazy(() => import('./pages/contact/SupportPage'));
const WhitepapersPage = lazy(() => import('./pages/insights/WhitepapersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const WebDevelopmentPage = lazy(() => import('./pages/services/WebDevelopmentPage'));
const MobileAppsPage = lazy(() => import('./pages/services/MobileAppsPage'));
const UiUxDesignPage = lazy(() => import('./pages/services/UiUxDesignPage'));
const AiMlPage = lazy(() => import('./pages/industries/AiMlPage'));
const CaseStudiesPage = lazy(() => import('./pages/insights/CaseStudiesPage'));
const BestInvestorsPage = lazy(() => import('./pages/about/BestInvestorsPage'));
const SEOToolsAdmin = lazy(() => import('./pages/admin/SEOToolsAdmin'));
const PagesContentAdmin = lazy(() => import('./pages/admin/PagesContentAdmin'));
const SiteSettingsAdmin = lazy(() => import('./pages/admin/SiteSettingsAdmin'));
const SecurityAdmin = lazy(() => import('./pages/admin/SecurityAdmin'));
const BlogSubscribersAdmin = lazy(() => import('./pages/admin/BlogSubscribersAdmin'));
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor'));
const BlogManager = lazy(() => import('./pages/admin/BlogManager'));
const PortfolioManager = lazy(() => import('./pages/admin/PortfolioManager'));
const ContactSubmissions = lazy(() => import('./pages/admin/ContactSubmissions'));
const TestimonialManager = lazy(() => import('./pages/admin/TestimonialManager'));
const AnalyticsAdmin = lazy(() => import('./pages/admin/AnalyticsAdmin'));
const IndustryHighlightsPage = lazy(() => import('./pages/insights/IndustryHighlightsPage'));
const LatestNewsPage = lazy(() => import('./pages/insights/LatestNewsPage'));
const PressReleasesPage = lazy(() => import('./pages/insights/PressReleasesPage'));
const ClientPortalPage = lazy(() => import('./pages/ClientPortalPage'));
const SupportCenterPage = lazy(() => import('./pages/SupportCenterPage'));
const ExecutiveInsightsPage = lazy(() => import('./pages/insights/ExecutiveInsightsPage'));
const FutureTrendsPage = lazy(() => import('./pages/insights/FutureTrendsPage'));
const ThoughtLeadershipPage = lazy(() => import('./pages/insights/ThoughtLeadershipPage'));
const ClientLoginPage = lazy(() => import('./pages/ClientLoginPage'));
const ClientDashboardPage = lazy(() => import('./pages/ClientDashboardPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AiCampaignInsightsPage = lazy(() => import('./pages/marketing/ai-campaign-insights'));
const CampaignsIndexPage = lazy(() => import('./pages/marketing/campaigns-index'));
const EmailAnalyticsPage = lazy(() => import('./pages/admin/EmailAnalyticsPage'));
const EmailTemplatesPage = lazy(() => import('./pages/admin/EmailTemplatesPage'));
const EmailCampaignsPage = lazy(() => import('./pages/admin/EmailCampaignsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const PasswordResetPage = lazy(() => import('./pages/PasswordResetPage'));
const UnsubscribePage = lazy(() => import('./pages/UnsubscribePage'));
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">Page Not Found</div>
);

function App() {
  // Initialize analytics on app start
  useEffect(() => {
    analyticsService.initialize();
  }, []);

  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <HelmetProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/enterprise-automation" element={<EnterpriseAutomationPage />} />
          <Route path="/services/innovation-strategy" element={<InnovationStrategyPage />} />
          <Route path="/services/legacy-modernization" element={<LegacyModernizationPage />} />
          <Route path="/services/predictive-analytics" element={<PredictiveAnalyticsPage />} />
          <Route path="/services/intelligent-systems" element={<IntelligentSystemsPage />} />
          <Route path="/services/ai-solutions" element={<AiSolutionsPage />} />
          <Route path="/services/smart-infrastructure" element={<SmartInfrastructurePage />} />
          <Route path="/services/connected-devices" element={<ConnectedDevicesPage />} />
          <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
          <Route path="/services/cybersecurity-solutions" element={<CybersecuritySolutionsPage />} />
          <Route path="/services/telemedicine" element={<TelemedicinePage />} />
          <Route path="/services/healthcare-ai" element={<HealthcareAiPage />} />
          <Route path="/services/medical-devices" element={<MedicalDevicesPage />} />
          <Route path="/services/web-development" element={<WebDevelopmentPage />} />
          <Route path="/services/mobile-apps" element={<MobileAppsPage />} />
          <Route path="/services/ui-ux-design" element={<UiUxDesignPage />} />
          <Route path="/products/whats-new" element={<WhatsNewPage />} />
          <Route path="/products/product-roadmap" element={<ProductRoadmapPage />} />
          <Route path="/products/beta-programs" element={<BetaProgramsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/upcoming-webinars" element={<UpcomingWebinarsPage />} />
          <Route path="/events/leadership-team" element={<LeadershipTeamPage />} />
          <Route path="/events/tech-meetups" element={<TechMeetupsPage />} />
          <Route path="/events/hackathons-challenges" element={<HackathonsChallengesPage />} />
          <Route path="/see-our-solutions" element={<SeeOurSolutionsPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/meet-the-team" element={<MeetTheTeamPage />} />
          <Route path="/view-portfolio" element={<ViewPortfolioPage />} />
          <Route path="/see-case-studies" element={<SeeCaseStudiesPage />} />
          <Route path="/read-insights" element={<ReadInsightsPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/about/leadership" element={<LeadershipPage />} />
          <Route path="/about/culture" element={<CulturePage />} />
          <Route path="/about/best-investors" element={<BestInvestorsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/support" element={<SupportPage />} />
          <Route path="/insights/whitepapers" element={<WhitepapersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/password-manager" element={<PasswordManager />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/email-analytics" element={<EmailAnalyticsPage />} />
          <Route path="/admin/email-templates" element={<EmailTemplatesPage />} />
          <Route path="/admin/email-campaigns" element={<EmailCampaignsPage />} />
          <Route path="/admin/seo-tools" element={<SEOToolsAdmin />} />
          <Route path="/admin/pages-content" element={<PagesContentAdmin />} />
          <Route path="/admin/site-settings" element={<SiteSettingsAdmin />} />
          <Route path="/admin/security" element={<SecurityAdmin />} />
          <Route path="/admin/blog-subscribers" element={<BlogSubscribersAdmin />} />
          <Route path="/admin/content" element={<ContentEditor />} />
          <Route path="/admin/blog" element={<BlogManager />} />
          <Route path="/admin/portfolio" element={<PortfolioManager />} />
          <Route path="/admin/contacts" element={<ContactSubmissions />} />
          <Route path="/admin/testimonials" element={<TestimonialManager />} />
          <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
          <Route path="/industries/ai-ml" element={<AiMlPage />} />
          <Route path="/insights/case-studies" element={<CaseStudiesPage />} />
          <Route path="/insights/events" element={<EventsPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
          <Route path="/support-center" element={<SupportCenterPage />} />
          <Route path="/insights/industry-highlights" element={<IndustryHighlightsPage />} />
          <Route path="/insights/latest-news" element={<LatestNewsPage />} />
          <Route path="/insights/press-releases" element={<PressReleasesPage />} />
          <Route path="/insights/executive-insights" element={<ExecutiveInsightsPage />} />
          <Route path="/insights/future-trends" element={<FutureTrendsPage />} />
          <Route path="/insights/thought-leadership" element={<ThoughtLeadershipPage />} />
          <Route path="/insights/hackathons-challenges" element={<HackathonsChallengesPage />} />
          <Route path="/insights/tech-meetups" element={<TechMeetupsPage />} />
          <Route path="/insights/leadership-team" element={<LeadershipTeamPage />} />
          <Route path="/insights/upcoming-webinars" element={<UpcomingWebinarsPage />} />
          <Route path="/insights/case-studies" element={<CaseStudiesPage />} />
          <Route path="/client-login" element={<ClientLoginPage />} />
          <Route path="/portal" element={<ClientLoginPage />} />
          <Route path="/portal/dashboard" element={<ClientDashboardPage />} />
          <Route path="/portal/projects" element={<ClientDashboardPage />} />
          <Route path="/portal/files" element={<ClientDashboardPage />} />
          <Route path="/portal/support" element={<ClientDashboardPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/marketing" element={
            <ProtectedRoute>
              <CampaignsIndexPage />
            </ProtectedRoute>
          } />
          <Route path="/marketing-debug" element={<CampaignsIndexPage />} />
          <Route path="/marketing/ai-campaign-insights" element={
            <ProtectedRoute>
              <AiCampaignInsightsPage />
            </ProtectedRoute>
          } />
          <Route path="/marketing/campaign/:campaignId" element={
            <ProtectedRoute>
              <AiCampaignInsightsPage />
            </ProtectedRoute>
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </HelmetProvider>
    </>
  );
}

export default App;