import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ArrowRight, TrendingUp, Users, Clock } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import { useState } from 'react';

type CaseStudy = {
  id: number;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  duration: string;
  teamSize: string;
};

const CaseStudiesPage = () => {
  const [modalStudy, setModalStudy] = useState<CaseStudy | null>(null);
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: 'E-commerce Platform Transformation',
      client: 'RetailCorp',
      industry: 'Retail',
      challenge: 'Legacy system modernization and mobile optimization',
      solution: 'Complete platform rebuild with modern architecture',
      results: ['300% increase in mobile conversions', '50% reduction in page load times', '40% increase in customer satisfaction'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '6 months',
      teamSize: '8 developers'
    },
    {
      id: 2,
      title: 'AI-Powered Healthcare Analytics',
      client: 'MedTech Solutions',
      industry: 'Healthcare',
      challenge: 'Inefficient patient data analysis and diagnosis delays',
      solution: 'Custom AI system for predictive analytics and automated reporting',
      results: ['60% faster diagnosis times', '85% accuracy in predictive models', '30% reduction in operational costs'],
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '8 months',
      teamSize: '12 specialists'
    },
    {
      id: 3,
      title: 'Smart Manufacturing IoT Solution',
      client: 'IndustrialTech Inc.',
      industry: 'Manufacturing',
      challenge: 'Equipment monitoring and predictive maintenance',
      solution: 'IoT sensors network with real-time analytics dashboard',
      results: ['45% reduction in downtime', '25% increase in efficiency', '35% cost savings on maintenance'],
      image: 'https://images.pexels.com/photos/3912469/pexels-photo-3912469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '10 months',
      teamSize: '15 engineers'
    },
    {
      id: 4,
      title: 'Financial Services Digital Transformation',
      client: 'SecureBank',
      industry: 'Finance',
      challenge: 'Outdated banking systems and security concerns',
      solution: 'Cloud-native architecture with enhanced security protocols',
      results: ['99.9% uptime achieved', '70% faster transaction processing', '100% compliance with regulations'],
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '12 months',
      teamSize: '20 professionals'
    }
  ];
  const featured = caseStudies[0];
  const others = caseStudies.slice(1);

  return (
    <>
      <Navbar />
      <div className="animate-fade-in">
        {/* Parallax Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Case Studies Hero" className="w-full h-full object-cover object-center opacity-60 scale-105" style={{ willChange: 'transform' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-pink-900/30" />
            {/* Animated Sparkles */}
            <Sparkles className="absolute top-10 left-10 text-pink-400 opacity-30 animate-pulse" size={80} />
            <Sparkles className="absolute bottom-10 right-10 text-yellow-400 opacity-20 animate-pulse" size={60} />
            <Star className="absolute top-1/2 left-1/2 text-white opacity-10 animate-spin-slow" size={120} style={{ transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="relative z-10 flex flex-col items-center px-4">
            <span className="inline-flex items-center px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg animate-glow text-xs tracking-widest uppercase">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              Case Studies
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Real-World Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl text-center mb-8">
              See how Tekvoro transforms businesses with next-gen technology, AI, and digital innovation.
            </p>
            <motion.a href="#featured" whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow text-lg mt-2">
              Explore Featured <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>
        {/* Featured Case Study with Parallax */}
        <section id="featured" className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative w-full max-w-5xl rounded-3xl glassmorphic border-2 border-gradient-to-r from-pink-500 via-yellow-400 to-red-500 shadow-2xl overflow-hidden">
            <div className="relative w-full h-96 overflow-hidden">
              <motion.img src={featured.image} alt={featured.title} className="w-full h-full object-cover object-center opacity-90 scale-105" style={{ willChange: 'transform' }} initial={{ scale: 1.1 }} whileHover={{ scale: 1.15 }} transition={{ duration: 1 }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-pink-900/30" />
            </div>
            <div className="absolute bottom-0 left-0 p-10 z-10 w-full flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg animate-glow text-xs tracking-widest uppercase">Featured Case Study</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{featured.title}</h2>
                <p className="text-lg text-gray-200 max-w-2xl mb-4">{featured.challenge}</p>
                <div className="flex gap-6 mb-4">
                  <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 text-yellow-400 font-bold bg-black/30 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md"><Users className="w-5 h-5" />{featured.teamSize}</motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 text-pink-400 font-bold bg-black/30 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md"><Clock className="w-5 h-5" />{featured.duration}</motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 text-green-400 font-bold bg-black/30 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md"><TrendingUp className="w-5 h-5" />{featured.industry}</motion.div>
                </div>
                <motion.a href={`/insights/case-study/${featured.id}`} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow text-lg mt-2">
                  Read Full Case Study <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
              <motion.ul initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-2 mb-4 md:mb-0 md:ml-10">
                {featured.results.map((result, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    <span className="text-gray-100 text-lg">{result}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </section>
        {/* Animated Divider */}
        <div className="w-full flex justify-center py-8">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} className="h-1 w-2/3 bg-gradient-to-r from-pink-500 via-yellow-400 to-red-500 rounded-full blur-sm animate-pulse" />
        </div>
        {/* Other Case Studies Grid */}
        <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-gray-800">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                More Success Stories
              </h2>
              <p className="text-lg text-gray-400">
                Discover how we've partnered with businesses across various industries to deliver transformative technology solutions that drive growth and innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {others.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gradient-to-r from-pink-500 via-yellow-400 to-red-500 hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => setModalStudy(study)}
                >
                  <img src={study.image} alt={study.title} className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10 group-hover:border-yellow-400/40 transition" />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black text-xs font-bold shadow animate-glow">{study.industry}</span>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{study.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{study.challenge}</p>
                  <div className="flex gap-3 mb-2">
                    <span className="flex items-center gap-1 text-yellow-400 text-xs font-bold"><Users className="w-4 h-4" />{study.teamSize}</span>
                    <span className="flex items-center gap-1 text-pink-400 text-xs font-bold"><Clock className="w-4 h-4" />{study.duration}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.07 }} className="mt-3 inline-flex items-center gap-2 text-pink-400 font-semibold hover:text-yellow-400 transition-colors text-sm bg-white/10 px-4 py-2 rounded-full shadow animate-glow">
                    Quick View <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Modal Quick View with Parallax and Custom Layout */}
        {modalStudy && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalStudy(null)} aria-modal="true" role="dialog">
            <motion.div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl p-0 shadow-2xl w-[95vw] max-w-3xl border-2 border-pink-400/40 flex flex-col items-stretch max-h-[90vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                <motion.img src={modalStudy.image} alt={modalStudy.title} className="w-full h-full object-cover object-center opacity-90 scale-105" style={{ willChange: 'transform' }} initial={{ scale: 1.1 }} whileHover={{ scale: 1.15 }} transition={{ duration: 1 }} />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-pink-900/30" />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-10" onClick={() => setModalStudy(null)} aria-label="Close"><ArrowRight className="w-5 h-5 rotate-180" /></button>
              </div>
              <div className="p-8 flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2 text-left" style={{ fontFamily: 'Orbitron, sans-serif' }}>{modalStudy.title}</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold bg-black/30 px-3 py-1 rounded-xl"><Users className="w-4 h-4" />{modalStudy.teamSize}</span>
                    <span className="flex items-center gap-1 text-pink-400 text-sm font-bold bg-black/30 px-3 py-1 rounded-xl"><Clock className="w-4 h-4" />{modalStudy.duration}</span>
                    <span className="flex items-center gap-1 text-green-400 text-sm font-bold bg-black/30 px-3 py-1 rounded-xl"><TrendingUp className="w-4 h-4" />{modalStudy.industry}</span>
                  </div>
                  <p className="text-gray-300 text-base mb-3">{modalStudy.challenge}</p>
                  <p className="text-gray-400 text-sm mb-4">{modalStudy.solution}</p>
                  <motion.a href={`/insights/case-study/${modalStudy.id}`} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow text-lg mt-2">
                    Read Full Case Study <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
                <motion.ul initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-2 flex-1">
                  {modalStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">•</span>
                      <span className="text-gray-100 text-lg">{result}</span>
                    </li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default CaseStudiesPage;