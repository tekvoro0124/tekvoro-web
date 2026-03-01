// @ts-nocheck
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Users, Briefcase, Loader, Tag, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import contentService from '../services/contentService';

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category?: string;
  tags?: string[];
  features?: string[];
  benefits?: string[];
  pricing?: string;
  imageUrl?: string;
  createdAt?: string;
  views?: number;
  featured?: boolean;
}

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) {
        setError('Invalid service');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch all services
        const response = await contentService.getServices();
        const foundService = response.find((s: any) => s.slug === slug || s.slug.includes(slug));

        if (!foundService) {
          setError('Service not found');
          setLoading(false);
          return;
        }

        setService(foundService);

        // Find related services (same category or shared tags)
        const related = response
          .filter(
            (s: any) =>
              s.slug !== slug &&
              (s.category === foundService.category || (s.tags && foundService.tags && s.tags.some((t: string) => foundService.tags?.includes(t))))
          )
          .slice(0, 3);
        setRelatedServices(related);
      } catch (err) {
        console.error('Failed to fetch service:', err);
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin text-blue-600" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'The service you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Services
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>{service.title} | Tekvoro Services</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Services
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Badge */}
        {service.category && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold flex items-center gap-2">
              <Briefcase size={16} />
              {service.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {service.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{service.description}</p>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {service.imageUrl && (
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-96 object-cover rounded-lg mb-12"
          />
        )}

        {service.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {service.content}
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Us</h2>
          <div className="space-y-4">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags Section */}
      {service.tags && service.tags.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag size={20} />
            Related Topics
          </h3>
          <div className="flex flex-wrap gap-3">
            {service.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">Let's discuss how we can help your business with {service.title}</p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((relService) => (
              <Link
                key={relService._id}
                to={`/services/${relService.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {relService.category && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded mb-2">
                      {relService.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {relService.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relService.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
