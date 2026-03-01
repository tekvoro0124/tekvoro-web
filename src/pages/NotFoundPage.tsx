import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Page Not Found | Tekvoro Technologies"
        description="The page you're looking for doesn't exist. Navigate back to our homepage or explore our services and solutions."
        keywords="404, page not found, error page, broken link, missing page"
        ogImage="/images/404-og.jpg"
        ogType="website"
        noIndex={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Page Not Found",
          "description": "The page you're looking for doesn't exist",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 flex flex-col items-center justify-center px-4"
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-secondary-900 dark:text-white">Page Not Found</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link to="/">
              <Button>
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;