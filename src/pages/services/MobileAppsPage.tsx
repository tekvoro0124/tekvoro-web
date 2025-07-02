import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import React from 'react';
import FullscreenSection from '../../components/layout/FullscreenSection';
import { motion } from 'framer-motion';
import { Sparkles, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';

const stats = [
  { icon: <TrendingUp className="text-green-400" />, label: 'Mobile Projects', value: '80+' },
  { icon: <Users className="text-blue-400" />, label: 'Clients', value: '40+' },
  { icon: <Star className="text-yellow-400" />, label: 'Satisfaction', value: '97%' },
];

const services = [
  { title: 'iOS & Android Apps', desc: 'Native and cross-platform mobile solutions.', icon: <Sparkles className="text-pink-400" /> },
  { title: 'AI-Powered Apps', desc: 'Integrate AI for smarter, more engaging experiences.', icon: <Sparkles className="text-blue-400" /> },
  { title: 'Mobile UI/UX', desc: 'Beautiful, intuitive, and accessible mobile interfaces.', icon: <Sparkles className="text-yellow-400" /> },
  { title: 'App Modernization', desc: 'Upgrade legacy apps for performance and security.', icon: <Sparkles className="text-green-400" /> },
];

const MobileAppsPage = () => (
  <>
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
          Mobile Apps
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Next-Level Mobile Experiences
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl text-center mb-6">
          We design and build mobile apps that delight users and drive business growth, powered by AI and modern tech.
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
        <Sparkles className="text-pink-400 animate-pulse" /> Featured Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((svc, i) => (
          <motion.div key={svc.title} className="relative bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-yellow-400/40 hover:scale-105 transition-transform duration-300 cursor-pointer group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-2">{svc.icon}<span className="text-lg font-bold text-white">{svc.title}</span></div>
            <p className="text-gray-200 text-xs mb-1 text-center">{svc.desc}</p>
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
          <p className="text-gray-100 text-base italic mb-2">"Our mobile app engagement doubled after Tekvoro's redesign."</p>
          <span className="text-xs text-pink-300 font-semibold">Ava T., Product Lead, Shoply</span>
        </motion.div>
        <motion.div className="min-w-[320px] bg-white/10 rounded-2xl p-6 shadow-lg border border-pink-400/20 flex flex-col items-center hover:scale-105 transition-transform duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
          <p className="text-gray-100 text-base italic mb-2">"AI-powered features set our app apart in a crowded market."</p>
          <span className="text-xs text-pink-300 font-semibold">Lucas M., CEO, HealthAI</span>
        </motion.div>
      </div>
    </div>
    <div className="py-12 bg-gradient-to-r from-pink-500/10 via-yellow-400/10 to-black flex flex-col items-center">
      <motion.h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center drop-shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        Ready to launch your next mobile app?
      </motion.h2>
      <motion.a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
        <ArrowRight className="w-5 h-5" /> Get Started
      </motion.a>
    </div>
    <Footer />
  </>
);

export default MobileAppsPage; 