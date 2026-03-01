import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Leading with Purpose in the Digital Age',
    summary: 'How visionary leadership is reshaping organizations for a rapidly changing world.',
    author: 'Michael Rodriguez',
    date: '2024-12-10',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tags: ['Leadership', 'Strategy'],
  },
  {
    id: 2,
    title: 'The Ethics of Artificial Intelligence',
    summary: 'Why responsible AI is essential for building trust and driving innovation.',
    author: 'Dr. Emily Watson',
    date: '2024-12-05',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Ethics'],
  },
  {
    id: 3,
    title: 'Innovation as a Core Value',
    summary: 'How to foster a culture of innovation and continuous improvement.',
    author: 'Lisa Park',
    date: '2024-12-01',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    tags: ['Innovation', 'Culture'],
  },
  {
    id: 4,
    title: 'The Future of Work: Human + Machine Collaboration',
    summary: 'Exploring the new frontier of productivity and creativity in the digital workplace.',
    author: 'James Thompson',
    date: '2024-11-28',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    tags: ['Future of Work', 'Collaboration'],
  },
];

const ThoughtLeadershipPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Thought Leadership | Tekvoro Technologies"
        description="Explore thought leadership content from our experts. Gain insights into industry trends, strategic perspectives, and innovative approaches to technology and business challenges."
        keywords="thought leadership, expert insights, industry perspectives, strategic thinking, innovation insights, expert opinions, leadership content"
        ogImage="/images/thought-leadership-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Thought Leadership",
          "description": "Explore thought leadership content from our experts",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-purple-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Thought Leadership
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Expert opinions, strategic insights, and leadership perspectives from Tekvoro's top minds.
            </p>
          </motion.div>
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
                placeholder="Search thought leadership..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50"
              />
            </div>
          </motion.div>
        </div>
      </section>
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
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ThoughtLeadershipPage;