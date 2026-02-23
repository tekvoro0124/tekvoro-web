import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Clock,
  User,
  Tag,
  Plus,
  Send
} from 'lucide-react';

const categories = [
  'All',
  'Getting Started',
  'Account & Billing',
  'Technical Support',
  'API Documentation',
  'Troubleshooting',
];

const helpArticles = [
  {
    id: 1,
    title: 'How to Get Started with Tekvoro Platform',
    category: 'Getting Started',
    content: 'Learn the basics of setting up your account, configuring your first project, and understanding the platform features.',
    readTime: '5 min read',
    views: 1247,
    helpful: 89,
  },
  {
    id: 2,
    title: 'Understanding Your Billing and Subscription',
    category: 'Account & Billing',
    content: 'Everything you need to know about billing cycles, payment methods, subscription changes, and invoice management.',
    readTime: '3 min read',
    views: 892,
    helpful: 67,
  },
  {
    id: 3,
    title: 'API Integration Guide',
    category: 'API Documentation',
    content: 'Step-by-step guide to integrate Tekvoro APIs into your applications with code examples and best practices.',
    readTime: '8 min read',
    views: 2156,
    helpful: 156,
  },
  {
    id: 4,
    title: 'Troubleshooting Common Issues',
    category: 'Troubleshooting',
    content: 'Solutions for the most common problems users encounter, including error messages and performance issues.',
    readTime: '6 min read',
    views: 1893,
    helpful: 134,
  },
  {
    id: 5,
    title: 'Security Best Practices',
    category: 'Technical Support',
    content: 'Essential security guidelines to protect your data and ensure safe usage of the Tekvoro platform.',
    readTime: '7 min read',
    views: 1456,
    helpful: 98,
  },
  {
    id: 6,
    title: 'Performance Optimization Tips',
    category: 'Technical Support',
    content: 'Learn how to optimize your applications for better performance and efficiency on the Tekvoro platform.',
    readTime: '4 min read',
    views: 1123,
    helpful: 76,
  },
];

const contactOptions = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    responseTime: 'Usually responds in minutes',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our technical experts',
    responseTime: 'Available 24/7',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message',
    responseTime: 'Usually responds within 4 hours',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Video,
    title: 'Video Call',
    description: 'Schedule a screen sharing session',
    responseTime: 'Available during business hours',
    color: 'from-yellow-500 to-orange-500',
  },
];

const SupportCenterPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general',
  });

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    setShowTicketForm(false);
    setTicketForm({ subject: '', description: '', priority: 'medium', category: 'general' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Support Center | Tekvoro Technologies"
        description="Get the help you need with our comprehensive support center. Find answers to frequently asked questions, contact our support team, and access helpful resources."
        keywords="support center, help, customer support, technical support, FAQ, contact support, support resources"
        ogImage="/images/support-center-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Support Center",
          "description": "Get the help you need with our comprehensive support center",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-green-400 to-emerald-500 bg-clip-text text-transparent">
              Support Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Get help, find answers, and connect with our support team. We're here to help you succeed.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            How Can We Help You?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, idx) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 cursor-pointer group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{option.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                <p className="text-green-400 text-xs font-medium">{option.responseTime}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.button
              onClick={() => setShowTicketForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Create Support Ticket
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Help Articles */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white"
            >
              Help Articles
            </motion.h2>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    selectedCategory === category
                      ? 'bg-green-500 text-black border-green-500 shadow-lg'
                      : 'bg-black/50 text-green-400 border-neutral-800 hover:bg-neutral-900 hover:border-green-400'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          {article.category}
                        </span>
                        <span className="text-gray-400 text-sm">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                      <p className="text-gray-300 text-sm">{article.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <span>{article.views} views</span>
                        <span>{article.helpful} found helpful</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedArticle === article.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedArticle === article.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 p-6 bg-white/5"
                    >
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed">
                          {article.content} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="flex gap-2 mt-4">
                          <motion.button
                            className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            This helped
                          </motion.button>
                          <motion.button
                            className="px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Contact Support
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Ticket Modal */}
      <AnimatePresence>
        {showTicketForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowTicketForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 max-w-2xl w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Create Support Ticket</h2>
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 resize-none"
                    placeholder="Please provide detailed information about your issue..."
                    required
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    Submit Ticket
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowTicketForm(false)}
                    className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default SupportCenterPage; 