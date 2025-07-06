import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, Download, FileText, Search, Filter, ArrowRight, Eye, Users, TrendingUp, BookOpen, Code, Cloud, Shield } from 'lucide-react';

const whitepapers = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise: A Comprehensive Analysis',
    description: 'An in-depth analysis of how artificial intelligence is transforming enterprise operations, with case studies and implementation strategies.',
    category: 'AI & ML',
    date: '2024-12-15',
    author: 'Dr. Sarah Chen',
    readTime: '45 min read',
    downloads: 1250,
    views: 3200,
    featured: true,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Enterprise', 'Digital Transformation'],
    fileSize: '2.4 MB',
    pages: 28,
    abstract: 'This comprehensive whitepaper explores the current state and future trajectory of artificial intelligence in enterprise environments. We examine key trends, challenges, and opportunities that organizations face when implementing AI solutions.',
  },
  {
    id: 2,
    title: 'Cloud Security Best Practices for Modern Organizations',
    description: 'A detailed guide on implementing robust security measures in cloud environments, covering compliance, threat detection, and incident response.',
    category: 'Cybersecurity',
    date: '2024-12-10',
    author: 'Dr. Emily Watson',
    readTime: '35 min read',
    downloads: 890,
    views: 2100,
    featured: false,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tags: ['Security', 'Cloud Computing', 'Compliance'],
    fileSize: '1.8 MB',
    pages: 22,
    abstract: 'As organizations increasingly migrate to cloud environments, security becomes paramount. This whitepaper provides a comprehensive framework for implementing and maintaining robust cloud security practices.',
  },
  {
    id: 3,
    title: 'Digital Transformation Roadmap: From Strategy to Implementation',
    description: 'A strategic guide for organizations embarking on digital transformation journeys, with practical frameworks and real-world examples.',
    category: 'Strategy',
    date: '2024-12-08',
    author: 'Michael Rodriguez',
    readTime: '40 min read',
    downloads: 1100,
    views: 2800,
    featured: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    tags: ['Digital Transformation', 'Strategy', 'Leadership'],
    fileSize: '2.1 MB',
    pages: 25,
    abstract: 'Digital transformation is not just about technology—it\'s about fundamentally changing how organizations operate and deliver value. This whitepaper provides a comprehensive roadmap for successful transformation.',
  },
  {
    id: 4,
    title: 'Quantum Computing: Implications for Business and Technology',
    description: 'An exploration of quantum computing\'s potential impact on various industries and how organizations can prepare for the quantum future.',
    category: 'Emerging Tech',
    date: '2024-12-05',
    author: 'Dr. David Kim',
    readTime: '50 min read',
    downloads: 650,
    views: 1800,
    featured: false,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    tags: ['Quantum Computing', 'Future Tech', 'Innovation'],
    fileSize: '3.2 MB',
    pages: 32,
    abstract: 'Quantum computing represents one of the most significant technological breakthroughs of our time. This whitepaper examines its potential applications and strategic implications for businesses.',
  },
  {
    id: 5,
    title: 'Sustainable Technology: Green Computing for the Future',
    description: 'A comprehensive guide to implementing sustainable technology practices and reducing the environmental impact of digital operations.',
    category: 'Sustainability',
    date: '2024-12-03',
    author: 'Lisa Park',
    readTime: '30 min read',
    downloads: 750,
    views: 1900,
    featured: false,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    tags: ['Sustainability', 'Green Tech', 'Environment'],
    fileSize: '1.6 MB',
    pages: 20,
    abstract: 'As technology becomes more pervasive, its environmental impact becomes increasingly important. This whitepaper explores sustainable technology practices and their implementation.',
  },
  {
    id: 6,
    title: 'Data Privacy in the Age of AI: Regulatory Compliance and Best Practices',
    description: 'A detailed analysis of data privacy regulations and how organizations can ensure compliance while leveraging AI technologies.',
    category: 'Compliance',
    date: '2024-11-30',
    author: 'James Thompson',
    readTime: '38 min read',
    downloads: 920,
    views: 2400,
    featured: false,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    tags: ['Data Privacy', 'AI', 'Compliance'],
    fileSize: '2.0 MB',
    pages: 24,
    abstract: 'Data privacy regulations are evolving rapidly, especially in the context of AI applications. This whitepaper provides guidance on maintaining compliance while leveraging AI capabilities.',
  },
];

const categories = ['All', 'AI & ML', 'Cybersecurity', 'Strategy', 'Emerging Tech', 'Sustainability', 'Compliance'];

const categoryIcons = {
  'AI & ML': <TrendingUp className="w-4 h-4" />,
  'Cybersecurity': <Shield className="w-4 h-4" />,
  'Strategy': <BookOpen className="w-4 h-4" />,
  'Emerging Tech': <Code className="w-4 h-4" />,
  'Sustainability': <Cloud className="w-4 h-4" />,
  'Compliance': <FileText className="w-4 h-4" />,
};

const WhitepapersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWhitepapers = whitepapers.filter(whitepaper => {
    const matchesSearch = whitepaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         whitepaper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         whitepaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || whitepaper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredWhitepaper = whitepapers.find(whitepaper => whitepaper.featured);
  const regularWhitepapers = filteredWhitepapers.filter(whitepaper => !whitepaper.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Whitepapers | Tekvoro Technologies"
        description="Download our comprehensive whitepapers and research reports. Gain in-depth insights into technology trends, industry analysis, and strategic recommendations for your business."
        keywords="whitepapers, research reports, industry analysis, technology reports, business insights, downloadable content, research papers"
        ogImage="/images/whitepapers-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Whitepapers",
          "description": "Download our comprehensive whitepapers and research reports",
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-green-400 to-blue-500 bg-clip-text text-transparent">
              Whitepapers & Research
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              In-depth research papers, technical documents, and industry insights from our experts and thought leaders.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4 mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search whitepapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    selectedCategory === category
                      ? 'bg-green-400 text-black border-green-400 shadow-lg'
                      : 'bg-black/50 text-green-400 border-neutral-800 hover:bg-neutral-900 hover:border-green-400'
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

      {/* Featured Whitepaper */}
      {featuredWhitepaper && (
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-green-400 text-black text-sm font-bold rounded-full">
                      Featured Research
                    </span>
                    <span className="text-gray-400 text-sm">{featuredWhitepaper.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredWhitepaper.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredWhitepaper.description}
                  </p>
                  
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white">Abstract:</strong> {featuredWhitepaper.abstract}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-green-400">{featuredWhitepaper.pages}</div>
                      <div className="text-xs text-gray-400">Pages</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-blue-400">{featuredWhitepaper.downloads}</div>
                      <div className="text-xs text-gray-400">Downloads</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredWhitepaper.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredWhitepaper.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{featuredWhitepaper.author}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredWhitepaper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </motion.button>
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4" />
                      Read Online
                    </motion.button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={featuredWhitepaper.image}
                    alt={featuredWhitepaper.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {featuredWhitepaper.fileSize}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Whitepapers Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            All Whitepapers
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularWhitepapers.map((whitepaper, idx) => (
              <motion.article
                key={whitepaper.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={whitepaper.image}
                    alt={whitepaper.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {whitepaper.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-semibold border border-green-400/30">
                      {whitepaper.fileSize}
                    </span>
                  </div>
                    </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(whitepaper.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {whitepaper.readTime}
                  </div>
                      </div>
                      
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                  {whitepaper.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {whitepaper.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {whitepaper.downloads}
                      </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {whitepaper.views}
                    </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {whitepaper.pages} pages
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {whitepaper.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{whitepaper.author}</span>
                  <motion.button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhitepapersPage;
