import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, User, Tag, ArrowRight, Search, Filter, TrendingUp, Globe, Code, Cloud, Shield } from 'lucide-react';

const categories = [
  'All',
  'Technology',
  'AI & ML',
  'Cloud',
  'Cybersecurity',
  'Healthcare',
  'IoT',
  'Company',
];

const newsArticles = [
  {
    id: 1,
    title: 'Tekvoro Launches Revolutionary AI-Powered Analytics Platform',
    summary: 'Our new AI analytics platform transforms how businesses process and understand their data, delivering insights 10x faster than traditional methods.',
    content: 'Tekvoro Technologies today announced the launch of its groundbreaking AI-powered analytics platform, designed to revolutionize how enterprises process and derive insights from their data. The platform leverages advanced machine learning algorithms to deliver real-time analytics and predictive insights, enabling businesses to make data-driven decisions with unprecedented speed and accuracy.',
    date: '2024-12-15',
    author: 'Sarah Chen',
    category: 'AI & ML',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['AI', 'Analytics', 'Platform'],
  },
  {
    id: 2,
    title: 'Global Cloud Infrastructure Expansion: New Data Centers in Asia-Pacific',
    summary: 'Tekvoro expands its global cloud infrastructure with new data centers in Singapore, Tokyo, and Sydney to serve growing demand.',
    content: 'In response to increasing demand for cloud services in the Asia-Pacific region, Tekvoro has announced the expansion of its global cloud infrastructure with new data centers in Singapore, Tokyo, and Sydney. This expansion will provide customers with improved performance, reduced latency, and enhanced data sovereignty options.',
    date: '2024-12-12',
    author: 'Michael Rodriguez',
    category: 'Cloud',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Cloud', 'Infrastructure', 'Global'],
  },
  {
    id: 3,
    title: 'Cybersecurity Breakthrough: Zero-Day Threat Detection System',
    summary: 'Our new AI-driven cybersecurity system can detect and neutralize zero-day threats before they impact business operations.',
    content: 'Tekvoro\'s cybersecurity team has developed a revolutionary zero-day threat detection system that uses artificial intelligence to identify and neutralize previously unknown cyber threats. The system analyzes patterns in network traffic, user behavior, and system anomalies to detect potential threats before they can cause damage.',
    date: '2024-12-10',
    author: 'Dr. Emily Watson',
    category: 'Cybersecurity',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Cybersecurity', 'AI', 'Zero-Day'],
  },
  {
    id: 4,
    title: 'Healthcare IoT Revolution: Smart Medical Devices Integration',
    summary: 'Tekvoro partners with leading healthcare providers to integrate IoT devices for improved patient monitoring and care.',
    content: 'Tekvoro has announced strategic partnerships with leading healthcare providers to integrate IoT devices into patient care systems. This integration enables real-time patient monitoring, automated alerts for medical staff, and improved treatment outcomes through data-driven insights.',
    date: '2024-12-08',
    author: 'Dr. James Thompson',
    category: 'Healthcare',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Healthcare', 'IoT', 'Medical Devices'],
  },
  {
    id: 5,
    title: 'Quantum Computing Research Partnership Announced',
    summary: 'Tekvoro joins forces with leading universities to advance quantum computing research and applications.',
    content: 'Tekvoro has announced a groundbreaking partnership with MIT, Stanford, and CalTech to advance quantum computing research. This collaboration will focus on developing quantum algorithms for optimization problems, cryptography, and machine learning applications.',
    date: '2024-12-05',
    author: 'Prof. David Kim',
    category: 'Technology',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Quantum Computing', 'Research', 'Partnership'],
  },
  {
    id: 6,
    title: 'Sustainable Technology Initiative: Carbon-Neutral Cloud Operations',
    summary: 'Tekvoro commits to carbon-neutral cloud operations by 2025, leading the industry in sustainable technology practices.',
    content: 'Tekvoro has announced its commitment to achieve carbon-neutral cloud operations by 2025. This initiative includes investments in renewable energy, energy-efficient data centers, and carbon offset programs to minimize environmental impact.',
    date: '2024-12-03',
    author: 'Lisa Park',
    category: 'Company',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Sustainability', 'Green Tech', 'Carbon Neutral'],
  },
];

const categoryIcons = {
  'Technology': <Code className="w-4 h-4" />,
  'AI & ML': <TrendingUp className="w-4 h-4" />,
  'Cloud': <Cloud className="w-4 h-4" />,
  'Cybersecurity': <Shield className="w-4 h-4" />,
  'Healthcare': <Globe className="w-4 h-4" />,
  'IoT': <Code className="w-4 h-4" />,
  'Company': <Globe className="w-4 h-4" />,
};

const LatestNewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof newsArticles[0] | null>(null);

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Latest News | Tekvoro Technologies"
        description="Stay updated with the latest news, announcements, and developments from Tekvoro Technologies. Get insights into our company updates, product launches, and industry news."
        keywords="latest news, company news, product announcements, industry news, technology news, company updates, press releases"
        ogImage="/images/latest-news-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Latest News",
          "description": "Stay updated with the latest news and announcements from Tekvoro Technologies",
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Latest News
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Stay updated with the latest developments in technology, AI, cloud computing, and industry insights from Tekvoro.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-12"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg'
                      : 'bg-black/50 text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {categoryIcons[category as keyof typeof categoryIcons] && (
                    <span className="inline-block mr-2">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                  )}
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setSelectedArticle(featuredArticle)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full">
                      Featured
                    </span>
                    <span className="text-gray-400 text-sm">{featuredArticle.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredArticle.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredArticle.author}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Latest Articles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform duration-300 group"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{article.author}</span>
                  <ArrowRight className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedArticle.title}</h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedArticle.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedArticle.author}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {selectedArticle.category}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedArticle.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default LatestNewsPage; 