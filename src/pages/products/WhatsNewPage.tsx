import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Share2, Tag } from 'lucide-react';

const categories = [
  'All',
  'Product',
  'Company',
  'Event',
  'Press',
];

const newsItems = [
  {
    id: 1,
    title: 'Tekvoro Launches AI Assistant 2.0',
    summary: 'Our next-gen AI assistant is now smarter, faster, and more intuitive than ever before.',
    date: '2024-06-10',
    author: 'Tekvoro Team',
    tags: ['Product', 'AI'],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Cloud Sync Rolls Out Globally',
    summary: 'Seamless, secure data sync is now available for all users across devices and platforms.',
    date: '2024-05-28',
    author: 'Product Team',
    tags: ['Product', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Tekvoro at Tech Innovators Summit',
    summary: 'Join us at the annual summit where we unveil our latest breakthroughs and connect with the tech community.',
    date: '2024-05-15',
    author: 'Events Team',
    tags: ['Event'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Press Release: Series B Funding',
    summary: 'Tekvoro secures $50M in Series B funding to accelerate global expansion and R&D.',
    date: '2024-04-30',
    author: 'PR Team',
    tags: ['Press', 'Company'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Performance Boost Update',
    summary: 'Experience up to 50% faster load times and improved reliability with our latest infrastructure upgrade.',
    date: '2024-04-10',
    author: 'Engineering',
    tags: ['Product'],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Meet the New Leadership Team',
    summary: 'Introducing new faces and roles as Tekvoro grows into new markets.',
    date: '2024-03-22',
    author: 'Company News',
    tags: ['Company'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const WhatsNewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews =
    selectedCategory === 'All'
      ? newsItems
      : newsItems.filter((item) => item.tags.includes(selectedCategory));

  const featured = newsItems.find((n) => n.featured) || newsItems[0];
  const rest = filteredNews.filter((n) => n.id !== featured.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="What's New | Tekvoro Technologies"
        description="Stay updated with the latest features, improvements, and innovations from Tekvoro Technologies. Discover what's new in our products and services."
        keywords="what's new, latest features, product updates, new releases, technology updates, feature announcements, product improvements"
        ogImage="/images/whats-new-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "What's New",
          "description": "Stay updated with the latest features and innovations from Tekvoro Technologies",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      {/* Featured News Hero */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
        <div className="container-custom flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-yellow-400 text-xs font-semibold">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
              {featured.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8 font-light">
              {featured.summary}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
              <span>{formatDate(featured.date)}</span>
              <span>•</span>
              <span>{featured.author}</span>
            </div>
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-400 text-black font-bold shadow-lg hover:bg-white hover:text-black transition text-lg mt-2"
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(featured.title + ' - via Tekvoro'), '_blank')}
            >
              <Share2 className="w-5 h-5" /> Share
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="rounded-2xl shadow-2xl w-full h-80 md:h-96 object-cover border-4 border-white/10"
            />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-400/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 7 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800">
        <div className="container-custom py-4 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${selectedCategory === cat
                ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg'
                : 'bg-black text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* News Feed Grid */}
      <section className="container-custom py-16 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {rest.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">No news in this category yet.</div>
            )}
            {rest.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-6 flex flex-col border border-white/10 hover:shadow-lg hover:scale-[1.03] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10 shadow"
                  loading="lazy"
                />
                <div className="mb-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-yellow-400 text-xs font-semibold">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white mb-1 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-300 mb-3 text-sm">
                  {item.summary}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                  <span>{formatDate(item.date)}</span>
                  <span>•</span>
                  <span>{item.author}</span>
                </div>
                <motion.button
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold shadow hover:bg-white hover:text-black transition text-xs mt-auto"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(item.title + ' - via Tekvoro'), '_blank')}
                >
                  <Share2 className="w-4 h-4" /> Share
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
};

export default WhatsNewPage; 