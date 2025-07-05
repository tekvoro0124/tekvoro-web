import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Sparkles, Layers, UserCheck, Globe2, Rocket, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Custom AI Development',
    description: 'Tailored AI models and solutions for your unique business needs, from vision to deployment.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Layers className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Integrated AI Platforms',
    description: 'Seamlessly integrate AI into your existing systems and workflows for maximum impact.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <UserCheck className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Human-Centric Design',
    description: 'AI solutions designed for usability, transparency, and trust, putting people first.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Globe2 className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Scalable & Global',
    description: 'Deploy AI at scale—on-premises, in the cloud, or at the edge—anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
];

const testimonials = [
  {
    quote: 'Tekvoro delivered an AI solution that transformed our customer experience and increased our efficiency by 40%.',
    name: 'Priya Sharma',
    role: 'Chief Digital Officer, FinTechX',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote: 'Their team built a custom AI platform that scaled with our global operations—seamless and powerful.',
    name: 'James Lee',
    role: 'VP of Technology, HealthSync',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote: 'We trusted Tekvoro with our most ambitious AI project, and they exceeded every expectation.',
    name: 'Anita Desai',
    role: 'CEO, RetailNext',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const stats = [
  { icon: <TrendingUp className="text-green-400" />, label: 'AI Projects', value: '120+' },
  { icon: <Users className="text-blue-400" />, label: 'Clients', value: '60+' },
  { icon: <Star className="text-yellow-400" />, label: 'Satisfaction', value: '98%' },
];

const solutions = [
  { title: 'Predictive Analytics', desc: 'Unlock insights and forecast trends with advanced AI models.', icon: <Sparkles className="text-pink-400" /> },
  { title: 'Natural Language Processing', desc: 'Automate understanding and generation of human language.', icon: <Sparkles className="text-blue-400" /> },
  { title: 'Computer Vision', desc: 'Enable machines to see, interpret, and act on visual data.', icon: <Sparkles className="text-yellow-400" /> },
  { title: 'AI Automation', desc: 'Streamline business processes with intelligent automation.', icon: <Sparkles className="text-green-400" /> },
];

const AiSolutionsPage = () => {
  return (
    <>
      <SEO
        title="AI Solutions & Artificial Intelligence Services"
        description="Transform your business with Tekvoro's cutting-edge AI solutions. Custom AI development, machine learning, predictive analytics, and intelligent automation for enterprises."
        keywords="AI solutions, artificial intelligence, machine learning, predictive analytics, natural language processing, computer vision, AI automation, custom AI development, enterprise AI"
        canonical="https://www.tekvoro.com/services/ai-solutions"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AI Solutions",
          "description": "Custom AI development and artificial intelligence solutions for enterprises",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies"
          },
          "serviceType": "Artificial Intelligence Solutions",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom AI Development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Predictive Analytics"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Natural Language Processing"
                }
              }
            ]
          }
        }}
      />
      <Navbar />
      <div className="relative overflow-hidden bg-black min-h-[40vh] flex flex-col items-center justify-center py-16">
        <motion.div className="absolute inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-80" />
          <Sparkles className="absolute top-10 left-10 text-pink-400 opacity-30 animate-pulse" size={80} />
          <Sparkles className="absolute bottom-10 right-10 text-blue-400 opacity-20 animate-pulse" size={60} />
        </motion.div>
        <motion.div className="relative z-10 flex flex-col items-center" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg animate-glow">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
            AI Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Transform Your Business with AI
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl text-center mb-6">
            Discover how our cutting-edge AI solutions drive innovation, efficiency, and growth for leading enterprises.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 py-8 bg-gradient-to-r from-black via-gray-900 to-gray-800">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} className="flex flex-col items-center bg-white/10 rounded-2xl px-6 py-4 min-w-[120px] shadow-lg backdrop-blur-md border border-white/20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }}>
            <span className="mb-2">{stat.icon}</span>
            <span className="text-2xl font-bold text-white drop-shadow-md">{stat.value}</span>
            <span className="text-xs text-gray-300 mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="py-12 bg-black/95">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <Sparkles className="text-pink-400 animate-pulse" /> Featured Solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {solutions.map((sol, i) => (
            <motion.div key={sol.title} className="relative bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-yellow-400/40 hover:scale-105 transition-transform duration-300 cursor-pointer group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-2">{sol.icon}<span className="text-lg font-bold text-white">{sol.title}</span></div>
              <p className="text-gray-200 text-xs mb-1 text-center">{sol.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="py-10 bg-gradient-to-r from-black via-gray-900 to-gray-800 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Star className="text-yellow-400 animate-pulse" /> What Our Clients Say
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2 w-full max-w-4xl">
          <motion.div className="min-w-[320px] bg-white/10 rounded-2xl p-6 shadow-lg border border-pink-400/20 flex flex-col items-center hover:scale-105 transition-transform duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <p className="text-gray-100 text-base italic mb-2">"Tekvoro's AI transformed our operations and gave us a competitive edge."</p>
            <span className="text-xs text-pink-300 font-semibold">Priya S., CTO, FinEdge</span>
          </motion.div>
          <motion.div className="min-w-[320px] bg-white/10 rounded-2xl p-6 shadow-lg border border-pink-400/20 flex flex-col items-center hover:scale-105 transition-transform duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <p className="text-gray-100 text-base italic mb-2">"The predictive analytics solution delivered ROI in months, not years."</p>
            <span className="text-xs text-pink-300 font-semibold">James L., COO, HealthAI</span>
          </motion.div>
        </div>
      </div>
      <div className="py-12 bg-gradient-to-r from-pink-500/10 via-yellow-400/10 to-black flex flex-col items-center">
        <motion.h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center drop-shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          Ready to unlock the power of AI for your business?
        </motion.h2>
        <motion.a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
          <ArrowRight className="w-5 h-5" /> Get Started
        </motion.a>
      </div>
      <Footer />
    </>
  );
};

export default AiSolutionsPage; 