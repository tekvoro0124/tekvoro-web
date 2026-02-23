import HeroSection from '../components/sections/HeroSection';
import VerticalNav from '../components/layout/VerticalNav';
import CookieConsent from '../components/ui/CookieConsent';
import SEO from '../components/SEO';

const HomePage = () => {
  return (
    <>
      <SEO
        title="AI & Digital Transformation Solutions"
        description="Tekvoro Technologies delivers cutting-edge AI, cloud computing, and digital transformation solutions. Transform your business with our innovative technology services and expert consulting."
        keywords="AI solutions, digital transformation, cloud computing, machine learning, artificial intelligence, technology consulting, software development, IoT, cybersecurity, healthcare AI, enterprise automation"
        canonical="https://www.tekvoro.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tekvoro Technologies",
          "url": "https://www.tekvoro.com",
          "logo": "https://www.tekvoro.com/logo.png",
          "description": "Leading provider of AI and digital transformation solutions",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": "https://www.tekvoro.com/contact"
          },
          "sameAs": [
            "https://www.linkedin.com/company/tekvoro-technologies",
            "https://twitter.com/tekvoro"
          ]
        }}
      />
      <HeroSection />
      <VerticalNav />
      <CookieConsent />
    </>
  );
};

export default HomePage; 