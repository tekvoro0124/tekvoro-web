import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, Users, Play, ArrowRight, Search } from 'lucide-react';

const webinars = [
  {
    id: 1,
    title: 'AI for Business Leaders: Trends & Opportunities',
    description: 'Discover how AI is transforming business strategy and operations. Learn from industry experts and get your questions answered live.',
    date: '2024-12-22',
    time: '04:00 PM - 05:30 PM',
    speakers: ['Dr. Sarah Chen', 'Michael Rodriguez'],
    attendees: 120,
    registration: true,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Business', 'Webinar'],
  },
  {
    id: 2,
    title: 'Cloud Security Essentials: Protecting Your Data',
    description: 'A practical webinar on cloud security best practices, compliance, and real-world case studies.',
    date: '2024-12-28',
    time: '11:00 AM - 12:00 PM',
    speakers: ['Dr. Emily Watson'],
    attendees: 80,
    registration: true,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tags: ['Cloud', 'Security', 'Webinar'],
  },
  {
    id: 3,
    title: 'Digital Transformation: Roadmap for 2025',
    description: 'Explore the key steps and strategies for successful digital transformation in the coming year.',
    date: '2025-01-10',
    time: '03:00 PM - 04:30 PM',
    speakers: ['Michael Rodriguez', 'Lisa Park'],
    attendees: 95,
    registration: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    tags: ['Digital Transformation', 'Strategy', 'Webinar'],
  },
];

const UpcomingWebinarsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWebinars = webinars.filter(webinar =>
    webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Upcoming Webinars | Tekvoro Technologies"
        description="Register for our upcoming webinars and virtual events. Learn from industry experts, discover new technologies, and gain valuable insights from the comfort of your home or office."
        keywords="upcoming webinars, virtual events, online seminars, technology webinars, educational webinars, virtual learning, online events"
        ogImage="/images/upcoming-webinars-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Upcoming Webinars",
          "description": "Register for our upcoming webinars and virtual events",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-blue-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Upcoming Webinars
              </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Join our live webinars to learn from industry experts and stay ahead in tech and business.
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
                placeholder="Search webinars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
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
            Live & Upcoming
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebinars.map((webinar, idx) => (
              <motion.article
                key={webinar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-400 text-black text-sm font-semibold rounded-full">
                      Webinar
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(webinar.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {webinar.time}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {webinar.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {webinar.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {webinar.attendees}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Live
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {webinar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
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

export default UpcomingWebinarsPage; 