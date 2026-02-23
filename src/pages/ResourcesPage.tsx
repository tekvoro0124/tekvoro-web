import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  BookOpen,
  CheckSquare,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Mail,
  ArrowRight,
  Star,
  Clock,
  Shield
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'guide' | 'checklist' | 'tool';
  category: string;
  downloadUrl: string;
  previewUrl?: string;
  pages?: number;
  format: string;
  size: string;
  featured?: boolean;
}

export default function ResourcesPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resources: Resource[] = [
    {
      id: 'platform-requirements',
      title: 'Platform Development Requirements Checklist',
      description: 'Comprehensive checklist covering all technical and business requirements for marketplace and platform development projects.',
      type: 'checklist',
      category: 'Development',
      downloadUrl: '/downloads/platform-requirements-checklist.pdf',
      pages: 8,
      format: 'PDF',
      size: '2.1 MB',
      featured: true
    },
    {
      id: 'ai-integration-guide',
      title: 'AI Integration Guide for Indian Businesses',
      description: 'Step-by-step guide on integrating AI capabilities into existing business processes, with Indian market considerations.',
      type: 'guide',
      category: 'AI & Automation',
      downloadUrl: '/downloads/ai-integration-guide.pdf',
      pages: 24,
      format: 'PDF',
      size: '5.8 MB'
    },
    {
      id: 'marketplace-blueprint',
      title: 'Marketplace Platform Blueprint',
      description: 'Technical blueprint and architecture guide for building scalable marketplace platforms with real-time features.',
      type: 'template',
      category: 'Architecture',
      downloadUrl: '/downloads/marketplace-blueprint.pdf',
      pages: 16,
      format: 'PDF',
      size: '4.2 MB',
      featured: true
    },
    {
      id: 'budget-calculator',
      title: 'Platform Development Budget Calculator',
      description: 'Interactive Excel template to estimate costs for custom platform development projects with Indian pricing.',
      type: 'tool',
      category: 'Business',
      downloadUrl: '/downloads/budget-calculator.xlsx',
      format: 'Excel',
      size: '1.8 MB'
    },
    {
      id: 'project-timeline',
      title: '90-Day Platform Development Timeline',
      description: 'Detailed project timeline template with milestones, deliverables, and risk management for platform development.',
      type: 'template',
      category: 'Project Management',
      downloadUrl: '/downloads/project-timeline.pdf',
      pages: 12,
      format: 'PDF',
      size: '3.4 MB'
    },
    {
      id: 'whatsapp-bot-guide',
      title: 'WhatsApp Business API Integration Guide',
      description: 'Complete guide for integrating WhatsApp Business API with custom platforms and automation workflows.',
      type: 'guide',
      category: 'Integration',
      downloadUrl: '/downloads/whatsapp-bot-guide.pdf',
      pages: 20,
      format: 'PDF',
      size: '6.1 MB'
    },
    {
      id: 'security-checklist',
      title: 'Platform Security & Compliance Checklist',
      description: 'Essential security requirements and compliance checklist for Indian marketplace and platform projects.',
      type: 'checklist',
      category: 'Security',
      downloadUrl: '/downloads/security-checklist.pdf',
      pages: 10,
      format: 'PDF',
      size: '2.8 MB',
      featured: true
    },
    {
      id: 'startup-playbook',
      title: 'Indian Startup Platform Development Playbook',
      description: 'Comprehensive guide covering market analysis, technical decisions, and scaling strategies for Indian startups.',
      type: 'guide',
      category: 'Strategy',
      downloadUrl: '/downloads/startup-playbook.pdf',
      pages: 32,
      format: 'PDF',
      size: '8.7 MB'
    }
  ];

  const categories = ['All', 'Development', 'AI & Automation', 'Architecture', 'Business', 'Project Management', 'Integration', 'Security', 'Strategy'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'resources_page',
          interests: ['platform_development', 'ai_integration', 'marketplace_strategy']
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (resource: Resource) => {
    // Track download in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resource_download', {
        resource_id: resource.id,
        resource_title: resource.title,
        resource_category: resource.category
      });
    }

    // Open download in new tab
    window.open(resource.downloadUrl, '_blank');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template': return <FileText className="w-5 h-5" />;
      case 'guide': return <BookOpen className="w-5 h-5" />;
      case 'checklist': return <CheckSquare className="w-5 h-5" />;
      case 'tool': return <BarChart3 className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <>
      <SEO
        title="Free Resources - Platform Development Templates & Guides | Tekvoro"
        description="Download free templates, checklists, and guides for platform development, AI integration, and marketplace strategy. Expert resources for Indian startups and businesses."
        keywords="platform development resources, marketplace templates, AI integration guide, startup playbook, development checklist, Tekvoro resources"
        canonical="https://www.tekvoro.com/resources"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white py-20">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
              Free Resources for
              <span className="text-yellow-400"> Platform Builders</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Download expert templates, checklists, and guides to accelerate your platform development journey.
              Everything you need to build successful AI-powered marketplaces and platforms.
            </p>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto mb-12">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    ) : (
                      'Get Resources'
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" />
                    <span className="font-medium">Thanks for subscribing!</span>
                  </div>
                  <p className="text-sm mt-1">Check your email for instant access to all resources.</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">8+</div>
                <div className="text-gray-400 text-sm">Free Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
                <div className="text-gray-400 text-sm">Pages of Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">₹0</div>
                <div className="text-gray-400 text-sm">Cost to Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-neutral-900 border-b border-white/10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border ${
                  resource.featured
                    ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/10'
                    : 'border-white/10'
                } hover:border-yellow-400/30 transition-all duration-300`}
              >
                {resource.featured && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    FEATURED
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    resource.type === 'template' ? 'bg-blue-500/20 text-blue-400' :
                    resource.type === 'guide' ? 'bg-green-500/20 text-green-400' :
                    resource.type === 'checklist' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                  {resource.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  {resource.pages && (
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {resource.pages} pages
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {resource.format}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {resource.size}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(resource)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Download Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
              <p className="text-gray-400">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-900 to-black">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Need Custom Resources?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't see what you need? We create custom templates, guides, and checklists
              tailored to your specific platform development requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
              >
                Request Custom Resource
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/book-demo"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
