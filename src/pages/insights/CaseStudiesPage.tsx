import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, User, Award, ArrowRight, Search } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'AI-Powered Healthcare Platform',
    summary: 'How Tekvoro helped a leading hospital group deploy an AI-driven patient care platform, improving outcomes and efficiency.',
    client: 'Apollo Hospitals',
    date: '2024-11-15',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    tags: ['Healthcare', 'AI', 'Platform'],
    impact: 'Reduced patient wait times by 30%, improved diagnostic accuracy.',
  },
  {
    id: 2,
    title: 'Cloud Migration for FinTech Startup',
    summary: 'A fast-growing FinTech startup migrated to the cloud with Tekvoro, achieving 99.99% uptime and scalable growth.',
    client: 'FinEdge',
    date: '2024-10-20',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['FinTech', 'Cloud', 'Migration'],
    impact: 'Enabled 24/7 service, reduced infrastructure costs by 40%.',
  },
  {
    id: 3,
    title: 'IoT Smart City Deployment',
    summary: 'Tekvoro partnered with a city government to deploy IoT sensors and analytics for smarter urban management.',
    client: 'City of Hyderabad',
    date: '2024-09-10',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    tags: ['IoT', 'Smart City', 'Analytics'],
    impact: 'Improved traffic flow, reduced energy usage, and enhanced public safety.',
  },
];

const CaseStudiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCaseStudies = caseStudies.filter(cs =>
    cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Case Studies | Tekvoro Technologies"
        description="Explore real-world success stories and case studies showcasing how our solutions have transformed businesses across industries. Learn from proven implementations and measurable results."
        keywords="case studies, success stories, client testimonials, business transformation, project examples, implementation results, customer success"
        ogImage="/images/case-studies-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Case Studies",
          "description": "Explore real-world success stories and case studies showcasing business transformations",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-yellow-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Real-world success stories and measurable impact from Tekvoro's client projects.
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
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
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
            Client Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((cs, idx) => (
              <motion.article
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(cs.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {cs.client}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {cs.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-semibold">Impact:</span>
                  <span className="text-gray-300 text-xs">{cs.impact}</span>
                </div>
                <motion.button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Story
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

export default CaseStudiesPage;