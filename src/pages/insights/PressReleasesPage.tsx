import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, User, Tag, ArrowRight, Download, Share2, Globe, TrendingUp, Award, Users, DollarSign } from 'lucide-react';

const categories = [
  'All',
  'Company News',
  'Product Launch',
  'Partnership',
  'Funding',
  'Awards',
  'Leadership',
  'Expansion',
];

const pressReleases = [
  {
    id: 1,
    title: 'Tekvoro Technologies Secures $50M Series B Funding for Global Expansion',
    summary: 'Leading AI and cloud solutions provider raises significant funding to accelerate international growth and product development.',
    content: 'Tekvoro Technologies, a leading provider of AI-powered cloud solutions, today announced the successful completion of its Series B funding round, raising $50 million. The funding will be used to accelerate the company\'s global expansion, enhance its AI platform capabilities, and scale its engineering team across multiple continents.',
    category: 'Funding',
    date: '2024-12-15',
    author: 'Tekvoro Communications',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Funding', 'Series B', 'Global Expansion'],
    pdfUrl: '#',
    contact: 'press@tekvoro.com',
  },
  {
    id: 2,
    title: 'Tekvoro Launches Revolutionary AI Analytics Platform 2.0',
    summary: 'Next-generation AI analytics platform delivers 10x faster insights and enhanced predictive capabilities.',
    content: 'Tekvoro Technologies today announced the launch of AI Analytics Platform 2.0, a revolutionary upgrade that delivers unprecedented speed and accuracy in business intelligence. The new platform features advanced machine learning algorithms, real-time data processing, and enhanced visualization capabilities.',
    category: 'Product Launch',
    date: '2024-12-12',
    author: 'Product Team',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['AI', 'Analytics', 'Platform Launch'],
    pdfUrl: '#',
    contact: 'product@tekvoro.com',
  },
  {
    id: 3,
    title: 'Strategic Partnership Announced with Microsoft Azure',
    summary: 'Tekvoro and Microsoft Azure join forces to deliver enterprise-grade cloud solutions.',
    content: 'Tekvoro Technologies and Microsoft Azure have announced a strategic partnership to deliver enterprise-grade cloud solutions. This collaboration will enable customers to leverage Tekvoro\'s AI capabilities on Microsoft\'s global cloud infrastructure.',
    category: 'Partnership',
    date: '2024-12-10',
    author: 'Partnership Team',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Partnership', 'Microsoft', 'Azure'],
    pdfUrl: '#',
    contact: 'partnerships@tekvoro.com',
  },
  {
    id: 4,
    title: 'Tekvoro Named Top AI Company by TechCrunch',
    summary: 'Recognition as one of the most innovative AI companies in the technology sector.',
    content: 'Tekvoro Technologies has been recognized as one of the top AI companies by TechCrunch in their annual "Best of Tech" awards. This recognition highlights Tekvoro\'s innovative approach to AI solutions and its impact on the industry.',
    category: 'Awards',
    date: '2024-12-08',
    author: 'Marketing Team',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Awards', 'Recognition', 'TechCrunch'],
    pdfUrl: '#',
    contact: 'marketing@tekvoro.com',
  },
  {
    id: 5,
    title: 'New Office Opening in Singapore',
    summary: 'Tekvoro expands its presence in Asia-Pacific with new Singapore office.',
    content: 'Tekvoro Technologies has announced the opening of its new office in Singapore, marking a significant milestone in the company\'s Asia-Pacific expansion strategy. The new office will serve as a regional hub for sales, support, and development.',
    category: 'Expansion',
    date: '2024-12-05',
    author: 'Operations Team',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Expansion', 'Singapore', 'Asia-Pacific'],
    pdfUrl: '#',
    contact: 'operations@tekvoro.com',
  },
  {
    id: 6,
    title: 'New Chief Technology Officer Appointed',
    summary: 'Dr. Sarah Chen joins Tekvoro as Chief Technology Officer to lead innovation initiatives.',
    content: 'Tekvoro Technologies has announced the appointment of Dr. Sarah Chen as Chief Technology Officer. Dr. Chen brings over 15 years of experience in AI and machine learning, having previously led technology teams at major tech companies.',
    category: 'Leadership',
    date: '2024-12-03',
    author: 'HR Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Leadership', 'CTO', 'Appointment'],
    pdfUrl: '#',
    contact: 'hr@tekvoro.com',
  },
];

const categoryIcons = {
  'Company News': <Globe className="w-4 h-4" />,
  'Product Launch': <TrendingUp className="w-4 h-4" />,
  'Partnership': <Users className="w-4 h-4" />,
  'Funding': <DollarSign className="w-4 h-4" />,
  'Awards': <Award className="w-4 h-4" />,
  'Leadership': <Users className="w-4 h-4" />,
  'Expansion': <Globe className="w-4 h-4" />,
};

const PressReleasesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRelease, setSelectedRelease] = useState<typeof pressReleases[0] | null>(null);

  const filteredReleases = pressReleases.filter(release => 
    selectedCategory === 'All' || release.category === selectedCategory
  );

  const featuredRelease = pressReleases.find(release => release.featured);
  const regularReleases = filteredReleases.filter(release => !release.featured);

  return (
    <div className="bg-black min-h-screen flex flex-col">
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Press Releases
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Official announcements, company news, and media coverage from Tekvoro Technologies.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-2 justify-center"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  selectedCategory === category
                    ? 'bg-purple-400 text-black border-purple-400 shadow-lg'
                    : 'bg-black/50 text-purple-400 border-neutral-800 hover:bg-neutral-900 hover:border-purple-400'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {categoryIcons[category as keyof typeof categoryIcons] && (
                  <span className="inline-block mr-2">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                )}
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Release */}
      {featuredRelease && (
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setSelectedRelease(featuredRelease)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-purple-400 text-black text-sm font-bold rounded-full">
                      Featured Release
                    </span>
                    <span className="text-gray-400 text-sm">{featuredRelease.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredRelease.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredRelease.summary}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredRelease.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredRelease.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredRelease.author}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredRelease.tags.map((tag) => (
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
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read Full Release
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </motion.button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={featuredRelease.image}
                    alt={featuredRelease.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Press Releases Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Latest Releases
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularReleases.map((release, idx) => (
              <motion.article
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform duration-300 group"
                onClick={() => setSelectedRelease(release)}
              >
                <div className="relative mb-6">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {release.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(release.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {release.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {release.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {release.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {release.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{release.author}</span>
                  <div className="flex gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Download className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Media Inquiries
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              For press inquiries, media interviews, or additional information about Tekvoro Technologies, please contact our communications team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Press Contact</h3>
                <p className="text-gray-300 mb-4">press@tekvoro.com</p>
                <p className="text-sm text-gray-400">For general media inquiries</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Investor Relations</h3>
                <p className="text-gray-300 mb-4">investors@tekvoro.com</p>
                <p className="text-sm text-gray-400">For investor-related inquiries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Release Modal */}
      <AnimatePresence>
        {selectedRelease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedRelease(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedRelease.title}</h2>
                <button
                  onClick={() => setSelectedRelease(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <img
                src={selectedRelease.image}
                alt={selectedRelease.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedRelease.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedRelease.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedRelease.author}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {selectedRelease.category}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedRelease.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedRelease.content}
                </p>
              </div>
              
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </motion.button>
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  Share Release
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

export default PressReleasesPage; 