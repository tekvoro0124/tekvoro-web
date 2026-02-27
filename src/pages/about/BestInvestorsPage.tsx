import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Users, TrendingUp, ArrowRight, Globe, Sparkles, X, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import SEO from '../../components/SEO';

type Investor = {
  _id?: string;
  name: string;
  logo: string;
  photo: string;
  location: string;
  website: string;
  description: string;
  bio: string;
  investmentFocus: string;
  portfolio: string[];
  social: {
    linkedin?: string;
    twitter?: string;
  };
  featured: boolean;
  testimonial?: {
    quote: string;
    author: string;
  };
};

const BestInvestorsPage = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalInvestor, setModalInvestor] = useState<Investor | null>(null);
  {
    name: 'Visionary Ventures',
    logo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'San Francisco, USA',
    website: 'https://visionaryvc.com',
    description: 'Leading global VC firm investing in transformative technology startups.',
    bio: 'Visionary Ventures has backed over 100 AI and tech startups worldwide, focusing on disruptive innovation and long-term growth.',
    investmentFocus: 'AI, SaaS, Robotics',
    portfolio: ['OpenAI', 'Neuralink', 'SynthAI'],
    social: {
      linkedin: 'https://linkedin.com/company/visionaryvc',
      twitter: 'https://twitter.com/visionaryvc',
    },
    featured: true,
    testimonial: {
      quote: 'Tekvoro is redefining digital transformation. Their team is visionary and execution is flawless.',
      author: 'Alex Chen, Managing Partner',
    },
  },
  {
    name: 'Redline Capital',
    logo: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'London, UK',
    website: 'https://redlinecapital.com',
    description: 'Backing the next generation of global tech leaders.',
    bio: 'Redline Capital specializes in scaling AI and cloud startups, with a focus on global impact and sustainability.',
    investmentFocus: 'Cloud, Fintech, HealthTech',
    portfolio: ['Cloudify', 'MedAI', 'FinEdge'],
    social: {
      linkedin: 'https://linkedin.com/company/redlinecapital',
      twitter: 'https://twitter.com/redlinevc',
    },
    featured: true,
    testimonial: {
      quote: 'Partnering with Tekvoro has been a game-changer for our portfolio companies.',
      author: 'Sophie Dubois, Principal',
    },
  },
  {
    name: 'Global Impact Partners',
    logo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    location: 'Berlin, Germany',
    website: 'https://globalimpact.com',
    description: 'Investing in sustainable, high-impact technology ventures.',
    bio: 'Global Impact Partners drives innovation in AI and sustainability, supporting founders with a global vision.',
    investmentFocus: 'Sustainability, AI, IoT',
    portfolio: ['EcoAI', 'GreenGrid', 'IoTNext'],
    social: {
      linkedin: 'https://linkedin.com/company/globalimpact',
      twitter: 'https://twitter.com/globalimpact',
    },
    featured: false,
    testimonial: {
      quote: "Tekvoro's solutions are at the forefront of AI and sustainability.",
      author: 'Lars Becker, Director',
    },
  },
  {
    name: 'Quantum Leap Ventures',
    logo: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=200&q=80',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    location: 'Tokyo, Japan',
    website: 'https://quantumleapvc.jp',
    description: 'Investing in next-gen quantum and AI startups across Asia.',
    bio: 'Quantum Leap Ventures accelerates the future of quantum computing and AI, supporting bold founders in Asia.',
    investmentFocus: 'Quantum Computing, AI, Robotics',
    portfolio: ['QubitAI', 'NanoBotics', 'DeepAsia'],
    social: {
      linkedin: 'https://linkedin.com/company/quantumleapvc',
      twitter: 'https://twitter.com/quantumleapvc',
    },
    featured: false,
    testimonial: {
      quote: "Tekvoro's AI solutions are years ahead of the market. Their team is world-class.",
      author: 'Kenji Sato, General Partner',
    },
  },
  {
    name: 'Latitude Angels',
    logo: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
    photo: 'https://randomuser.me/api/portraits/women/55.jpg',
    location: 'São Paulo, Brazil',
    website: 'https://latitudeangels.com',
    description: 'Empowering Latin American tech founders with capital and mentorship.',
    bio: 'Latitude Angels bridges the gap for Latin American startups, focusing on fintech and health innovation.',
    investmentFocus: 'Fintech, HealthTech, SaaS',
    portfolio: ['FinLatam', 'SaudeAI', 'CloudBrasil'],
    social: {
      linkedin: 'https://linkedin.com/company/latitudeangels',
      twitter: 'https://twitter.com/latitudeangels',
    },
    featured: false,
    testimonial: {
      quote: "We value Tekvoro's commitment to emerging markets and inclusive innovation.",
      author: 'Maria Oliveira, Managing Director',
    },
  },
  {
    name: 'Northern Lights Capital',
    logo: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=200&q=80',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg',
    location: 'Stockholm, Sweden',
    website: 'https://northernlightscap.se',
    description: 'Backing sustainable tech and AI startups in the Nordics.',
    bio: 'Northern Lights Capital is dedicated to sustainability and AI, investing in startups that make a global impact.',
    investmentFocus: 'Sustainability, AI, CleanTech',
    portfolio: ['GreenAI', 'NordicGrid', 'EcoSense'],
    social: {
      linkedin: 'https://linkedin.com/company/northernlightscap',
      twitter: 'https://twitter.com/northernlightscap',
    },
    featured: false,
    testimonial: {
      quote: "Tekvoro's vision for a sustainable future aligns perfectly with our mission.",
      author: 'Erik Lund, Partner',
    },
  },
];

const testimonials = investors.filter(i => i.testimonial).map(i => ({
  ...i.testimonial,
  photo: i.photo,
  name: i.name,
}));

const stats = [
  { icon: <TrendingUp className="text-green-400" />, label: 'Capital Raised', value: '$1.2B+' },
  { icon: <Users className="text-blue-400" />, label: 'Investors', value: '30+' },
  { icon: <Globe className="text-purple-400" />, label: 'Continents', value: '4' },
  { icon: <Star className="text-yellow-400" />, label: 'Satisfaction', value: '99%' },
];

const featured = investors.filter(i => i.featured);

const BestInvestorsPage = () => {
  const [modalInvestor, setModalInvestor] = useState<Investor | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO 
        title="Best Investors | Tekvoro Technologies"
        description="Meet our distinguished investors and partners who believe in our vision. Learn about the strategic partnerships and investments that fuel our growth and innovation."
        keywords="investors, partners, strategic partnerships, investment, funding, business partners, financial backing"
        ogImage="/images/best-investors-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Investors",
          "description": "Meet our distinguished investors and partners who believe in our vision",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      {/* AI 2025 Hero */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32 flex flex-col items-center justify-center">
        {/* Animated AI/particle background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          style={{ background: 'radial-gradient(ellipse at 60% 40%, #ff3c3c33 0%, #000 80%)' }}
        />
        <div className="container-custom relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 text-black font-bold text-xs tracking-widest shadow-lg animate-pulse border border-yellow-400/30">AI 2025</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 text-red-500 font-semibold text-xs shadow"><Award className="w-4 h-4" /> Featured Investors</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            The Visionaries Fueling Tekvoro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto text-center mb-10"
          >
            Meet the partners shaping the future of AI, technology, and innovation.
          </motion.p>
        </div>
      </section>

      {/* Animated Stats */}
      <div className="flex flex-wrap justify-center gap-6 py-8 bg-gradient-to-r from-black via-gray-900 to-gray-800">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center bg-white/10 rounded-2xl px-6 py-4 min-w-[120px] shadow-lg backdrop-blur-md border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="mb-2">{stat.icon}</span>
            <span className="text-2xl font-bold text-white drop-shadow-md">{stat.value}</span>
            <span className="text-xs text-gray-300 mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Featured Investors Carousel */}
      <section className="relative w-full flex flex-col items-center py-12 bg-gradient-to-b from-black via-neutral-950 to-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            Featured Investors
          </motion.h2>
          <div className="flex items-center justify-center gap-6">
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/30 text-white transition disabled:opacity-30"
              onClick={() => setCarouselIdx(i => (i - 1 + featured.length) % featured.length)}
              aria-label="Previous featured investor"
              disabled={featured.length <= 1}
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <div className="relative w-[320px] md:w-[400px] h-[340px] flex items-center justify-center">
              <AnimatePresence initial={false}>
                <motion.div
                  key={featured[carouselIdx].name}
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white/10 to-red-500/10 rounded-3xl border-2 border-yellow-400/20 shadow-2xl backdrop-blur-xl p-10"
                  style={{ boxShadow: '0 8px 32px 0 rgba(255,0,0,0.10)' }}
                >
                  <img src={featured[carouselIdx].photo} alt={featured[carouselIdx].name + ' photo'} className="w-20 h-20 rounded-full mb-3 border-4 border-yellow-400 shadow-lg object-cover" />
                  <img src={featured[carouselIdx].logo} alt={featured[carouselIdx].name + ' logo'} className="w-14 h-14 rounded-xl mb-2 border-2 border-yellow-400 shadow object-cover" />
                  <h3 className="text-2xl font-bold text-white mb-1 tracking-wide flex items-center gap-2">{featured[carouselIdx].name}<Award className="w-5 h-5 text-yellow-400 animate-bounce" /></h3>
                  <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                    <span className="bg-yellow-400/10 px-2 py-0.5 rounded-full">{featured[carouselIdx].location}</span>
                    <a href={featured[carouselIdx].website} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400 transition">Website</a>
                  </div>
                  <p className="text-gray-200 text-base text-center mb-1 max-w-xs">{featured[carouselIdx].description}</p>
                  <p className="text-gray-400 text-xs text-center mb-2 max-w-xs">{featured[carouselIdx].bio}</p>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-500 font-semibold text-xs mt-2">AI 2025</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/30 text-white transition disabled:opacity-30"
              onClick={() => setCarouselIdx(i => (i + 1) % featured.length)}
              aria-label="Next featured investor"
              disabled={featured.length <= 1}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Investor Testimonials Slider */}
      <div className="py-10 bg-gradient-to-r from-black via-gray-900 to-gray-800 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="text-pink-400 animate-pulse" /> What Our Investors Say
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2 w-full max-w-4xl">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="min-w-[320px] bg-white/10 rounded-2xl p-6 shadow-lg border border-pink-400/20 flex flex-col items-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img src={t.photo} alt={t.name + ' photo'} className="w-14 h-14 rounded-full mb-2 border-2 border-pink-400 object-cover" />
              <p className="text-gray-100 text-base italic mb-2">"{t.quote}"</p>
              <span className="text-xs text-pink-300 font-semibold">{t.author}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Investors Grid */}
      <section className="py-24 bg-gradient-to-b from-black to-neutral-950">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            All Investors
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {investors.map((inv, idx) => (
              <motion.div
                key={inv.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:border-yellow-400/30 transition-all duration-500 relative ${inv.featured ? 'ring-2 ring-yellow-400/60' : ''}`}
              >
                <img src={inv.photo} alt={inv.name + ' photo'} className="w-16 h-16 rounded-full mb-3 border-2 border-yellow-400 shadow object-cover" />
                <img src={inv.logo} alt={inv.name + ' logo'} className="w-10 h-10 rounded-xl mb-2 border border-yellow-400 shadow object-cover" />
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">{inv.name}{inv.featured && <Award className="w-4 h-4 text-yellow-400 animate-bounce" />}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                  <span className="bg-yellow-400/10 px-2 py-0.5 rounded-full">{inv.location}</span>
                  <a href={inv.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400 transition">Website</a>
                </div>
                <p className="text-gray-300 text-xs mb-1">{inv.description}</p>
                <p className="text-gray-400 text-xs mb-2">{inv.bio}</p>
                {inv.featured && (<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-500 font-semibold text-xs absolute top-4 right-4">Featured</span>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for full investor profile */}
      <AnimatePresence>
        {modalInvestor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalInvestor(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 shadow-2xl w-[90vw] max-w-lg border border-yellow-400/30 flex flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setModalInvestor(null)}
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={modalInvestor.photo} alt={modalInvestor.name + ' photo'} className="w-24 h-24 rounded-full mb-3 border-4 border-yellow-400 shadow-lg object-cover" />
              <img src={modalInvestor.logo} alt={modalInvestor.name + ' logo'} className="w-16 h-16 rounded-xl mb-2 border-2 border-yellow-400 shadow object-cover" />
              <h3 className="text-2xl font-bold text-white mb-1 tracking-wide flex items-center gap-2">{modalInvestor.name} {modalInvestor.featured && <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 text-xs font-semibold animate-pulse">Featured</span>}</h3>
              <span className="text-sm text-gray-300 mb-1 flex items-center gap-1"><Globe className="w-4 h-4" /> {modalInvestor.location}</span>
              <a href={modalInvestor.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 underline mb-2 flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Website</a>
              <p className="text-gray-200 text-sm mb-2 text-center">{modalInvestor.description}</p>
              <p className="text-gray-400 text-xs mb-2 text-center">{modalInvestor.bio}</p>
              <div className="flex gap-2 mt-2 mb-2 justify-center">
                {modalInvestor.social?.linkedin && <a href={modalInvestor.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 text-blue-500 hover:scale-110 transition" /></a>}
                {modalInvestor.social?.twitter && <a href={modalInvestor.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5 text-sky-400 hover:scale-110 transition" /></a>}
              </div>
              <div className="w-full flex flex-col items-center mb-2">
                <span className="text-xs text-gray-400 font-semibold">Investment Focus:</span>
                <span className="text-sm text-pink-300 mb-1">{modalInvestor.investmentFocus}</span>
                <span className="text-xs text-gray-400 font-semibold">Portfolio:</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {modalInvestor.portfolio.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs border border-yellow-400/30">{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glowing CTA */}
      <div className="py-12 bg-gradient-to-r from-pink-500/10 via-yellow-400/10 to-black flex flex-col items-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-4 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Ready to join our network of visionary investors?
        </motion.h2>
        <motion.a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ArrowRight className="w-5 h-5" /> Become an Investor
        </motion.a>
      </div>
      <Footer />
    </div>
  );
}

export default BestInvestorsPage; 