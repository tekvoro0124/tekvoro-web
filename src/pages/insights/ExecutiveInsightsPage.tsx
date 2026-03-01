import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, User, Tag, ArrowRight, Search, TrendingUp, Globe, Code, Cloud, Shield, Lightbulb, BookOpen, Share2 } from 'lucide-react';

const categories = [
  'All',
  'Leadership',
  'Technology',
  'Innovation',
  'Strategy',
  'Industry',
  'Future',
];

const insights = [
  {
    id: 1,
    title: 'The Future of AI: Beyond Automation to Augmentation',
    summary: 'How artificial intelligence is evolving from simple automation to true human augmentation, creating new possibilities for collaboration between humans and machines.',
    content: 'As we stand at the precipice of a new era in artificial intelligence, it\'s becoming increasingly clear that the future isn\'t about replacing humans with machines, but rather about creating powerful partnerships that amplify human capabilities. The next generation of AI will focus on augmentation - enhancing our decision-making, creativity, and problem-solving abilities in ways we\'ve never imagined.',
    author: 'Dr. Sarah Chen',
    position: 'Chief Technology Officer',
    date: '2024-12-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    featured: true,
    category: 'Technology',
    tags: ['AI', 'Augmentation', 'Future of Work'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    title: 'Building Resilient Organizations in the Digital Age',
    summary: 'Leadership strategies for creating organizations that can thrive in an era of constant change and disruption.',
    content: 'The digital age has fundamentally changed how organizations operate, compete, and succeed. Building resilience isn\'t just about surviving disruptions - it\'s about creating organizations that can thrive in uncertainty and turn challenges into opportunities. This requires a new approach to leadership, culture, and organizational design.',
    author: 'Michael Rodriguez',
    position: 'Chief Executive Officer',
    date: '2024-12-12',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    category: 'Leadership',
    tags: ['Leadership', 'Resilience', 'Digital Transformation'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    title: 'Sustainable Innovation: The Business Case for Green Technology',
    summary: 'Why sustainable innovation isn\'t just good for the planet - it\'s essential for long-term business success.',
    content: 'Sustainability is no longer a nice-to-have; it\'s a business imperative. Companies that embrace sustainable innovation are not only contributing to a better future but are also positioning themselves for long-term success. The business case for green technology is stronger than ever, with clear benefits for innovation, efficiency, and competitive advantage.',
    author: 'Lisa Park',
    position: 'Chief Innovation Officer',
    date: '2024-12-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    category: 'Innovation',
    tags: ['Sustainability', 'Innovation', 'Green Tech'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    title: 'The Quantum Computing Revolution: What Business Leaders Need to Know',
    summary: 'Understanding the business implications of quantum computing and how to prepare for the quantum future.',
    content: 'Quantum computing represents one of the most significant technological breakthroughs of our time. While still in its early stages, quantum computing will fundamentally transform industries from finance to pharmaceuticals. Business leaders need to understand both the opportunities and challenges that quantum computing presents.',
    author: 'Dr. David Kim',
    position: 'Chief Research Officer',
    date: '2024-12-08',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    category: 'Technology',
    tags: ['Quantum Computing', 'Research', 'Future Tech'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 5,
    title: 'Digital Ethics: Navigating the Moral Landscape of Technology',
    summary: 'The importance of ethical considerations in technology development and how to build responsible AI systems.',
    content: 'As technology becomes more powerful and pervasive, the ethical implications of our digital innovations become increasingly important. Building responsible AI systems requires careful consideration of bias, privacy, transparency, and accountability. This isn\'t just about avoiding harm - it\'s about creating technology that serves humanity.',
    author: 'Dr. Emily Watson',
    position: 'Chief Ethics Officer',
    date: '2024-12-05',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    featured: false,
    category: 'Industry',
    tags: ['Ethics', 'AI', 'Responsible Tech'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 6,
    title: 'The Future of Work: Redefining Success in the Digital Economy',
    summary: 'How the digital economy is changing what it means to work, succeed, and create value.',
    content: 'The digital economy is fundamentally changing the nature of work, success, and value creation. Remote work, automation, and new business models are reshaping how we think about careers, productivity, and organizational success. Leaders need to understand these changes and adapt their strategies accordingly.',
    author: 'James Thompson',
    position: 'Chief People Officer',
    date: '2024-12-03',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    category: 'Future',
    tags: ['Future of Work', 'Digital Economy', 'Leadership'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
];

const categoryIcons = {
  'Leadership': <TrendingUp className="w-4 h-4" />,
  'Technology': <Code className="w-4 h-4" />,
  'Innovation': <Lightbulb className="w-4 h-4" />,
  'Strategy': <Globe className="w-4 h-4" />,
  'Industry': <Shield className="w-4 h-4" />,
  'Future': <BookOpen className="w-4 h-4" />,
};

const ExecutiveInsightsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsight, setSelectedInsight] = useState<typeof insights[0] | null>(null);

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === 'All' || insight.category === selectedCategory;
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredInsight = insights.find(insight => insight.featured);
  const regularInsights = filteredInsights.filter(insight => !insight.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Executive Insights | Tekvoro Technologies"
        description="Gain strategic insights from industry leaders and executives. Discover thought leadership content, industry trends, and strategic perspectives on technology and business transformation."
        keywords="executive insights, thought leadership, industry trends, strategic perspectives, leadership insights, business transformation, technology leadership"
        ogImage="/images/executive-insights-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Executive Insights",
          "description": "Gain strategic insights from industry leaders and executives",
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Executive Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Thought leadership and strategic perspectives from Tekvoro's executive team on technology, innovation, and the future of business.
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
                placeholder="Search executive insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    selectedCategory === category
                      ? 'bg-indigo-400 text-black border-indigo-400 shadow-lg'
                      : 'bg-black/50 text-indigo-400 border-neutral-800 hover:bg-neutral-900 hover:border-indigo-400'
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

      {/* Featured Insight */}
      {featuredInsight && (
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setSelectedInsight(featuredInsight)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-indigo-400 text-black text-sm font-bold rounded-full">
                      Featured Insight
                    </span>
                    <span className="text-gray-400 text-sm">{featuredInsight.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredInsight.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredInsight.summary}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={featuredInsight.avatar}
                      alt={featuredInsight.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{featuredInsight.author}</p>
                      <p className="text-sm text-gray-400">{featuredInsight.position}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredInsight.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredInsight.readTime}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredInsight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Insight
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="relative">
                  <img
                    src={featuredInsight.image}
                    alt={featuredInsight.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Insights Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Latest Insights
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularInsights.map((insight, idx) => (
              <motion.article
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform duration-300 group"
                onClick={() => setSelectedInsight(insight)}
              >
                <div className="relative mb-6">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {insight.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={insight.avatar}
                    alt={insight.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">{insight.author}</p>
                    <p className="text-xs text-gray-400">{insight.position}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(insight.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {insight.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {insight.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <ArrowRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedInsight.title}</h2>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <img
                src={selectedInsight.image}
                alt={selectedInsight.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedInsight.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedInsight.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedInsight.author}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {selectedInsight.category}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedInsight.avatar}
                  alt={selectedInsight.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white text-lg">{selectedInsight.author}</p>
                  <p className="text-gray-400">{selectedInsight.position}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedInsight.tags.map((tag) => (
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
                  {selectedInsight.content}
                </p>
              </div>
              
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  Share Insight
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ExecutiveInsightsPage; 