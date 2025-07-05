import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Search, Clock, Eye, Heart, Share2, BookOpen, Lightbulb } from 'lucide-react';

const categories = ['All', 'AI & ML', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Healthcare', 'FinTech', 'Digital Transformation', 'Innovation'];

const insights = [
  {
    id: 1,
    title: 'The Future of AI in 2025: Transformative Trends and Opportunities',
    category: 'AI & ML',
    author: 'Dr. Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    publishDate: '2024-12-15',
    readTime: '8 min read',
    excerpt: 'Explore the cutting-edge developments in artificial intelligence that will reshape industries and create unprecedented opportunities for innovation.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    featured: true,
    views: 15420,
    likes: 892,
    tags: ['Artificial Intelligence', 'Machine Learning', 'Future Tech', 'Innovation']
  },
  {
    id: 2,
    title: 'Building Scalable Cloud Infrastructure for AI Workloads',
    category: 'Cloud Computing',
    author: 'Michael Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    publishDate: '2024-12-12',
    readTime: '12 min read',
    excerpt: 'Learn how to design and implement cloud-native architectures that can handle the computational demands of modern AI applications.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    featured: true,
    views: 12340,
    likes: 756,
    tags: ['Cloud Computing', 'Infrastructure', 'AI', 'Scalability']
  }
];

const stats = [
  { number: '500+', label: 'Articles Published', icon: <BookOpen className="w-6 h-6" /> },
  { number: '50K+', label: 'Monthly Readers', icon: <Eye className="w-6 h-6" /> },
  { number: '95%', label: 'Engagement Rate', icon: <Heart className="w-6 h-6" /> },
  { number: '24/7', label: 'Fresh Content', icon: <Clock className="w-6 h-6" /> }
];

const ReadInsightsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === 'All' || insight.category === selectedCategory;
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Read Insights | Tekvoro Technologies"
        description="Explore our comprehensive collection of insights, articles, and thought leadership content. Stay informed about technology trends, industry developments, and strategic perspectives."
        keywords="insights, articles, thought leadership, technology insights, industry insights, business insights, knowledge base"
        ogImage="/images/read-insights-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Read Insights",
          "description": "Explore our comprehensive collection of insights and articles",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8 flex flex-wrap justify-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI 2025 Insights
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 text-sm font-semibold">
                <Lightbulb className="w-4 h-4" />
                Thought Leadership
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Read
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Insights
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Stay ahead of the curve with our expert analysis, industry insights, and cutting-edge perspectives on AI, technology, and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#insights"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Explore Insights
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="/subscribe"
                className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-black to-neutral-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Latest <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Insights</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover thought-provoking articles and expert analysis on the latest technology trends
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden">
                  {insight.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium">
                        {insight.category}
                      </span>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {insight.readTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {insight.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {insight.excerpt}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src={insight.authorAvatar}
                      alt={insight.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400/30"
                    />
                    <div>
                      <div className="text-white font-semibold">{insight.author}</div>
                      <div className="text-gray-400 text-sm">Author</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {insight.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {insight.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {insight.likes}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stay <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Informed</span> with Our Insights
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get the latest insights delivered directly to your inbox. Never miss out on cutting-edge technology trends.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/subscribe"
              className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Subscribe Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="/view-portfolio"
              className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default ReadInsightsPage;
