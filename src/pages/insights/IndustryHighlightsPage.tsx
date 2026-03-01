import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { TrendingUp, BarChart3, Globe, Code, Cloud, Shield, Heart, Zap, Target, Users, DollarSign, ArrowRight, Calendar, Clock, User, Tag, Award } from 'lucide-react';

const industries = [
  'All',
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Energy',
];

const highlights = [
  {
    id: 1,
    title: 'AI Revolution in Healthcare: 2024 Market Analysis',
    summary: 'Comprehensive analysis of how AI is transforming healthcare delivery, diagnosis, and patient care across the globe.',
    content: 'The healthcare industry is experiencing unprecedented transformation through artificial intelligence. From diagnostic imaging to drug discovery, AI is revolutionizing every aspect of healthcare delivery. Our analysis shows that AI adoption in healthcare has increased by 300% since 2020, with significant improvements in patient outcomes and operational efficiency.',
    industry: 'Healthcare',
    date: '2024-12-15',
    author: 'Dr. Sarah Chen',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['AI', 'Healthcare', 'Digital Transformation'],
    stats: {
      marketSize: '$45.2B',
      growthRate: '+23.4%',
      adoptionRate: '67%',
    },
  },
  {
    id: 2,
    title: 'Cloud Computing Market: Enterprise Adoption Trends',
    summary: 'Deep dive into enterprise cloud adoption patterns and the shift towards hybrid and multi-cloud strategies.',
    content: 'Enterprise cloud adoption continues to accelerate, with 89% of organizations now using some form of cloud computing. The shift towards hybrid and multi-cloud strategies is becoming the norm, as businesses seek to optimize costs, improve performance, and maintain flexibility. Our research indicates that multi-cloud adoption has grown by 45% year-over-year.',
    industry: 'Technology',
    date: '2024-12-12',
    author: 'Michael Rodriguez',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Cloud Computing', 'Enterprise', 'Multi-Cloud'],
    stats: {
      marketSize: '$371.4B',
      growthRate: '+17.5%',
      adoptionRate: '89%',
    },
  },
  {
    id: 3,
    title: 'Cybersecurity Landscape: Emerging Threats and Solutions',
    summary: 'Analysis of the latest cybersecurity threats and innovative solutions protecting digital assets.',
    content: 'The cybersecurity landscape is evolving rapidly, with new threats emerging daily. Ransomware attacks have increased by 150% in the past year, while AI-powered security solutions are becoming essential for threat detection and response. Organizations are investing heavily in zero-trust architectures and advanced threat intelligence.',
    industry: 'Technology',
    date: '2024-12-10',
    author: 'Dr. Emily Watson',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Cybersecurity', 'Threat Intelligence', 'Zero Trust'],
    stats: {
      marketSize: '$182.3B',
      growthRate: '+12.8%',
      adoptionRate: '78%',
    },
  },
  {
    id: 4,
    title: 'FinTech Innovation: Digital Banking Transformation',
    summary: 'How digital banking and fintech innovations are reshaping the financial services industry.',
    content: 'The financial services industry is undergoing a digital revolution, with fintech companies leading the charge. Digital banking adoption has reached 73% globally, with mobile payments and blockchain technology driving innovation. Traditional banks are partnering with fintech startups to accelerate their digital transformation efforts.',
    industry: 'Finance',
    date: '2024-12-08',
    author: 'James Thompson',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['FinTech', 'Digital Banking', 'Blockchain'],
    stats: {
      marketSize: '$179.8B',
      growthRate: '+19.2%',
      adoptionRate: '73%',
    },
  },
  {
    id: 5,
    title: 'Manufacturing 4.0: Smart Factory Implementation',
    summary: 'Industry 4.0 technologies are revolutionizing manufacturing with IoT, AI, and automation.',
    content: 'Manufacturing is entering its fourth industrial revolution, with smart factories becoming the standard. IoT sensors, AI-powered predictive maintenance, and robotic process automation are driving efficiency and reducing costs. Our analysis shows that smart factory adoption has increased by 65% in the past two years.',
    industry: 'Manufacturing',
    date: '2024-12-05',
    author: 'Lisa Park',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Industry 4.0', 'IoT', 'Smart Manufacturing'],
    stats: {
      marketSize: '$267.7B',
      growthRate: '+15.6%',
      adoptionRate: '58%',
    },
  },
  {
    id: 6,
    title: 'E-commerce Evolution: Omnichannel Retail Strategies',
    summary: 'How retailers are adapting to changing consumer behavior with omnichannel strategies.',
    content: 'E-commerce continues to grow rapidly, with omnichannel retail becoming essential for success. Consumers expect seamless experiences across online and offline channels. Our research shows that omnichannel customers spend 30% more than single-channel customers, driving retailers to invest heavily in digital transformation.',
    industry: 'Retail',
    date: '2024-12-03',
    author: 'David Kim',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['E-commerce', 'Omnichannel', 'Digital Retail'],
    stats: {
      marketSize: '$5.7T',
      growthRate: '+14.3%',
      adoptionRate: '82%',
    },
  },
];

const industryIcons = {
  'Technology': <Code className="w-4 h-4" />,
  'Healthcare': <Heart className="w-4 h-4" />,
  'Finance': <DollarSign className="w-4 h-4" />,
  'Manufacturing': <Target className="w-4 h-4" />,
  'Retail': <Users className="w-4 h-4" />,
  'Education': <Globe className="w-4 h-4" />,
  'Energy': <Zap className="w-4 h-4" />,
};

const IndustryHighlightsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedHighlight, setSelectedHighlight] = useState<typeof highlights[0] | null>(null);

  const filteredHighlights = highlights.filter(highlight => 
    selectedIndustry === 'All' || highlight.industry === selectedIndustry
  );

  const featuredHighlight = highlights.find(highlight => highlight.featured);
  const regularHighlights = filteredHighlights.filter(highlight => !highlight.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Industry Highlights | Tekvoro Technologies"
        description="Stay informed about the latest developments across industries. Explore industry-specific insights, market trends, and technological advancements shaping various sectors."
        keywords="industry highlights, market trends, industry insights, sector analysis, business trends, industry developments, market analysis"
        ogImage="/images/industry-highlights-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Industry Highlights",
          "description": "Stay informed about the latest developments across industries",
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Industry Highlights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Deep insights into industry trends, market analysis, and transformative technologies shaping the future of business.
            </p>
          </motion.div>

          {/* Industry Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-2 justify-center"
          >
            {industries.map((industry) => (
              <motion.button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  selectedIndustry === industry
                    ? 'bg-blue-400 text-black border-blue-400 shadow-lg'
                    : 'bg-black/50 text-blue-400 border-neutral-800 hover:bg-neutral-900 hover:border-blue-400'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {industryIcons[industry as keyof typeof industryIcons] && (
                  <span className="inline-block mr-2">{industryIcons[industry as keyof typeof industryIcons]}</span>
                )}
                {industry}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Highlight */}
      {featuredHighlight && (
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setSelectedHighlight(featuredHighlight)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-400 text-black text-sm font-bold rounded-full">
                      Featured Analysis
                    </span>
                    <span className="text-gray-400 text-sm">{featuredHighlight.industry}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredHighlight.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredHighlight.summary}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-blue-400">{featuredHighlight.stats.marketSize}</div>
                      <div className="text-xs text-gray-400">Market Size</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-green-400">{featuredHighlight.stats.growthRate}</div>
                      <div className="text-xs text-gray-400">Growth Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-yellow-400">{featuredHighlight.stats.adoptionRate}</div>
                      <div className="text-xs text-gray-400">Adoption Rate</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredHighlight.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredHighlight.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredHighlight.author}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredHighlight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Analysis
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="relative">
                  <img
                    src={featuredHighlight.image}
                    alt={featuredHighlight.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Highlights Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Industry Insights
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularHighlights.map((highlight, idx) => (
              <motion.article
                key={highlight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform duration-300 group"
                onClick={() => setSelectedHighlight(highlight)}
              >
                <div className="relative mb-6">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {highlight.industry}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(highlight.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {highlight.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {highlight.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {highlight.summary}
                </p>
                
                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-sm font-bold text-blue-400">{highlight.stats.marketSize}</div>
                    <div className="text-xs text-gray-400">Market</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-sm font-bold text-green-400">{highlight.stats.growthRate}</div>
                    <div className="text-xs text-gray-400">Growth</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-sm font-bold text-yellow-400">{highlight.stats.adoptionRate}</div>
                    <div className="text-xs text-gray-400">Adoption</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {highlight.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{highlight.author}</span>
                  <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedHighlight(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedHighlight.title}</h2>
                <button
                  onClick={() => setSelectedHighlight(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <img
                src={selectedHighlight.image}
                alt={selectedHighlight.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedHighlight.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedHighlight.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedHighlight.author}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {selectedHighlight.industry}
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">{selectedHighlight.stats.marketSize}</div>
                  <div className="text-sm text-gray-400">Market Size</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-green-400">{selectedHighlight.stats.growthRate}</div>
                  <div className="text-sm text-gray-400">Growth Rate</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-yellow-400">{selectedHighlight.stats.adoptionRate}</div>
                  <div className="text-sm text-gray-400">Adoption Rate</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedHighlight.tags.map((tag) => (
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
                  {selectedHighlight.content}
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

export default IndustryHighlightsPage; 