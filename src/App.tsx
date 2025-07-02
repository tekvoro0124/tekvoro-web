import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/sections/HeroSection';
import VerticalNav from './components/layout/VerticalNav';
import CookieConsent from './components/ui/CookieConsent';
import EnterpriseAutomationPage from './pages/services/EnterpriseAutomationPage';
import InnovationStrategyPage from './pages/services/InnovationStrategyPage';
import LegacyModernizationPage from './pages/services/LegacyModernizationPage';
import PredictiveAnalyticsPage from './pages/services/PredictiveAnalyticsPage';
import IntelligentSystemsPage from './pages/services/IntelligentSystemsPage';
import AiSolutionsPage from './pages/services/AiSolutionsPage';
import SmartInfrastructurePage from './pages/services/SmartInfrastructurePage';
import ConnectedDevicesPage from './pages/services/ConnectedDevicesPage';
import CloudSolutionsPage from './pages/services/CloudSolutionsPage';
import CybersecuritySolutionsPage from './pages/services/CybersecuritySolutionsPage';
import TelemedicinePage from './pages/services/TelemedicinePage';
import HealthcareAiPage from './pages/services/HealthcareAiPage';
import MedicalDevicesPage from './pages/services/MedicalDevicesPage';
import WhatsNewPage from './pages/products/WhatsNewPage';
import ProductRoadmapPage from './pages/products/ProductRoadmapPage';
import BetaProgramsPage from './pages/products/BetaProgramsPage';
import EventsPage from './pages/insights/EventsPage';
import UpcomingWebinarsPage from './pages/insights/UpcomingWebinarsPage';
import LeadershipTeamPage from './pages/insights/LeadershipTeamPage';
import TechMeetupsPage from './pages/insights/TechMeetupsPage';
import HackathonsChallengesPage from './pages/insights/HackathonsChallengesPage';
import SeeOurSolutionsPage from './pages/solutions/SeeOurSolutionsPage';
import BookDemoPage from './pages/BookDemoPage';
import LearnMorePage from './pages/LearnMorePage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import ViewPortfolioPage from './pages/ViewPortfolioPage';
import SeeCaseStudiesPage from './pages/SeeCaseStudiesPage';
import ReadInsightsPage from './pages/ReadInsightsPage';
import SubscribePage from './pages/SubscribePage';
import AboutUsPage from './pages/about/AboutUsPage';
import LeadershipPage from './pages/about/LeadershipPage';
import CulturePage from './pages/about/CulturePage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/contact/ContactPage';
import SupportPage from './pages/contact/SupportPage';
import WhitepapersPage from './pages/insights/WhitepapersPage';
import BlogPage from './pages/BlogPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import WebDevelopmentPage from './pages/services/WebDevelopmentPage';
import MobileAppsPage from './pages/services/MobileAppsPage';
import UiUxDesignPage from './pages/services/UiUxDesignPage';
import AiMlPage from './pages/industries/AiMlPage';
import CaseStudiesPage from './pages/insights/CaseStudiesPage';
import BestInvestorsPage from './pages/about/BestInvestorsPage';
import EmailCampaignsAdmin from './pages/admin/EmailCampaignsAdmin';
import SEOToolsAdmin from './pages/admin/SEOToolsAdmin';
import PagesContentAdmin from './pages/admin/PagesContentAdmin';
import SiteSettingsAdmin from './pages/admin/SiteSettingsAdmin';
import SecurityAdmin from './pages/admin/SecurityAdmin';

const ImmersiveHome = () => (
  <div className="relative min-h-screen bg-background text-primary font-sans">
    <HeroSection />
    <VerticalNav />
    <CookieConsent />
  </div>
);

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">Page Not Found</div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<ImmersiveHome />} />
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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/email-campaigns" element={<EmailCampaignsAdmin />} />
      <Route path="/admin/seo-tools" element={<SEOToolsAdmin />} />
      <Route path="/admin/pages-content" element={<PagesContentAdmin />} />
      <Route path="/admin/site-settings" element={<SiteSettingsAdmin />} />
      <Route path="/admin/security" element={<SecurityAdmin />} />
      <Route path="/industries/ai-ml" element={<AiMlPage />} />
      <Route path="/insights/case-studies" element={<CaseStudiesPage />} />
      <Route path="/insights/events" element={<EventsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;