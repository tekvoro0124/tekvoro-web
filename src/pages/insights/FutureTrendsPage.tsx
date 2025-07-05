import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, TrendingUp, Globe, Code, ArrowRight, Search } from 'lucide-react';

const trends = [
  {
    id: 1,
    title: 'AI Agents: The Next Evolution of Digital Assistants',
    summary: 'AI agents are evolving from simple chatbots to autonomous digital workers that can handle complex tasks and make decisions.',
    category: 'AI & ML',
    date: '2024-12-15',
    author: 'Dr. Sarah Chen',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['AI Agents', 'Automation', 'Digital Workers'],
    impact: 'High',
    timeline: '2025-2027',
  },
  {
    id: 2,
    title: 'Quantum Internet: The Future of Secure Communication',
    summary: 'Quantum internet will enable ultra-secure communication and revolutionize how we share information globally.',
    category: 'Quantum Computing',
    date: '2024-12-12',
    author: 'Dr. David Kim',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Quantum Internet', 'Security', 'Communication'],
    impact: 'Very High',
    timeline: '2026-2030',
  },
  {
    id: 3,
    title: 'Carbon-Neutral Computing: The Green Tech Revolution',
    summary: 'Sustainable computing technologies are emerging to reduce the environmental impact of our digital infrastructure.',
    category: 'Sustainability',
    date: '2024-12-10',
    author: 'Lisa Park',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Green Tech', 'Sustainability', 'Cloud Computing'],
    impact: 'High',
    timeline: '2024-2026',
  },
];

const FutureTrendsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrends = trends.filter(trend => 
    trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trend.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredTrend = trends.find(trend => trend.featured);
  const regularTrends = filteredTrends.filter(trend => !trend.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Future Technology Trends | Tekvoro Technologies"
        description="Explore emerging technology trends and future predictions. Stay ahead of the curve with insights into AI, IoT, cloud computing, and other transformative technologies."
        keywords="future trends, technology trends, emerging technologies, AI trends, IoT trends, cloud trends, technology predictions, innovation trends"
        ogImage="/images/future-trends-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Future Technology Trends",
          "description": "Explore emerging technology trends and future predictions",
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Future Trends
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Explore emerging technologies and industry predictions that will shape the future of business and society.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search future trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Trend */}
      {featuredTrend && (
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
                    <span className="px-3 py-1 bg-cyan-400 text-black text-sm font-bold rounded-full">
                      Featured Trend
                    </span>
                    <span className="text-gray-400 text-sm">{featuredTrend.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredTrend.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredTrend.summary}
                  </p>
                  
                  {/* Trend Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-cyan-400">{featuredTrend.impact}</div>
                      <div className="text-xs text-gray-400">Impact</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-blue-400">{featuredTrend.timeline}</div>
                      <div className="text-xs text-gray-400">Timeline</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredTrend.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredTrend.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{featuredTrend.author}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredTrend.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Analysis
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="relative">
                  <img
                    src={featuredTrend.image}
                    alt={featuredTrend.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Trends Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Emerging Trends
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularTrends.map((trend, idx) => (
              <motion.article
                key={trend.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={trend.image}
                    alt={trend.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {trend.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs font-semibold border border-cyan-400/30">
                      {trend.impact}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(trend.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {trend.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {trend.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {trend.summary}
                </p>
                
                {/* Mini Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-sm font-bold text-cyan-400">{trend.impact}</div>
                    <div className="text-xs text-gray-400">Impact</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-sm font-bold text-blue-400">{trend.timeline}</div>
                    <div className="text-xs text-gray-400">Timeline</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {trend.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{trend.author}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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

export default FutureTrendsPage; 