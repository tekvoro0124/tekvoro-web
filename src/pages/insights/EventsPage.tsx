import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Mic, Code2, Sparkles, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type EventLink = {
  to: string;
  icon: JSX.Element;
  title: string;
  desc: string;
};

const eventLinks: EventLink[] = [
  {
    to: '/events/upcoming-webinars',
    icon: <Mic className="w-10 h-10 text-yellow-400 mb-4" />, 
    title: 'Upcoming Webinars',
    desc: 'Join our live webinars and stay ahead with the latest insights.'
  },
  {
    to: '/events/leadership-team',
    icon: <Users className="w-10 h-10 text-blue-400 mb-4" />, 
    title: 'Leadership Team',
    desc: 'Meet the visionaries and experts leading Tekvoro.'
  },
  {
    to: '/events/tech-meetups',
    icon: <Calendar className="w-10 h-10 text-green-400 mb-4" />, 
    title: 'Tech Meetups',
    desc: 'Connect with the community at our tech meetups.'
  },
  {
    to: '/events/hackathons-challenges',
    icon: <Code2 className="w-10 h-10 text-pink-400 mb-4" />, 
    title: 'Hackathons & Challenges',
    desc: 'Compete, innovate, and win in our hackathons and challenges.'
  },
];

const featuredEvent = {
  image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  title: 'AI & Cloud Innovation Summit 2025',
  desc: 'Join global leaders and innovators for a day of immersive talks, live demos, and networking. Discover the future of AI, cloud, and digital transformation.',
  date: 'August 15, 2025',
  location: 'San Francisco, CA & Virtual',
  cta: '/events/upcoming-webinars',
};

export default function EventsPage() {
  const [modalEvent, setModalEvent] = useState<EventLink | null>(null);
  // Parallax state for cards
  const [parallax, setParallax] = useState({});

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col">
        {/* Parallax Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img src={featuredEvent.image} alt="Featured Event" className="w-full h-full object-cover object-center opacity-60 scale-105" style={{ willChange: 'transform' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-pink-900/30" />
            {/* Animated Sparkles */}
            <Sparkles className="absolute top-10 left-10 text-pink-400 opacity-30 animate-pulse" size={80} />
            <Sparkles className="absolute bottom-10 right-10 text-yellow-400 opacity-20 animate-pulse" size={60} />
            <Star className="absolute top-1/2 left-1/2 text-white opacity-10 animate-spin-slow" size={120} style={{ transform: 'translate(-50%, -50%)' }} />
            {/* Extra floating icons */}
            <Mic className="absolute top-1/4 right-20 text-yellow-400 opacity-10 animate-bounce-slow" size={60} />
            <Code2 className="absolute bottom-1/4 left-20 text-pink-400 opacity-10 animate-bounce-slow" size={60} />
          </div>
          <div className="relative z-10 flex flex-col items-center px-4">
            <span className="inline-flex items-center px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg animate-glow text-xs tracking-widest uppercase">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              Featured Event
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {featuredEvent.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl text-center mb-6">
              {featuredEvent.desc}
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 text-yellow-400 font-bold shadow backdrop-blur-md"><Calendar className="w-5 h-5" /> {featuredEvent.date}</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 text-pink-400 font-bold shadow backdrop-blur-md"><Users className="w-5 h-5" /> {featuredEvent.location}</span>
            </div>
            <motion.a href={featuredEvent.cta} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow text-lg mt-2">
              Register Now <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>
        <section className="relative w-full bg-gradient-to-br from-black via-purple-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
          <div className="container-custom flex flex-col items-center text-center gap-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Explore More Events & Community
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Discover, connect, and grow with Tekvoro's events, webinars, and community programs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
              {eventLinks.map((ev, idx) => (
                <motion.div
                  key={ev.to}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-gradient-to-r from-pink-500 via-yellow-400 to-red-500 hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer group overflow-hidden flex flex-col items-center text-center"
                  tabIndex={0}
                  role="button"
                  aria-label={`Open details for ${ev.title}`}
                  onClick={() => setModalEvent(ev)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalEvent(ev); }}
                  onMouseMove={e => {
                    const card = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - card.left;
                    const y = e.clientY - card.top;
                    e.currentTarget.style.transform = `perspective(800px) rotateY(${(x - card.width / 2) / 20}deg) rotateX(${-(y - card.height / 2) / 20}deg) scale(1.05)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                  }}
                >
                  {ev.icon}
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif' }}>{ev.title}</h3>
                  <p className="text-gray-300 mb-4">{ev.desc}</p>
                  <Link to={ev.to} className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow hover:bg-white hover:text-black transition text-base mt-2 animate-glow">
                    Explore <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Modal Quick View for Event */}
        {modalEvent && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalEvent(null)} aria-modal="true" role="dialog">
            <motion.div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl p-0 shadow-2xl w-[95vw] max-w-2xl border-2 border-pink-400/40 flex flex-col items-stretch max-h-[90vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                <motion.img src={featuredEvent.image} alt={modalEvent.title} className="w-full h-full object-cover object-center opacity-90 scale-105" style={{ willChange: 'transform' }} initial={{ scale: 1.1 }} whileHover={{ scale: 1.15 }} transition={{ duration: 1 }} />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-pink-900/30" />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-10" onClick={() => setModalEvent(null)} aria-label="Close"><ArrowRight className="w-5 h-5 rotate-180" /></button>
              </div>
              <div className="p-8 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{modalEvent.title}</h2>
                <p className="text-gray-300 text-base mb-3">{modalEvent.desc}</p>
                <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 text-yellow-400 font-bold shadow backdrop-blur-md"><Calendar className="w-5 h-5" /> {featuredEvent.date}</span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 text-pink-400 font-bold shadow backdrop-blur-md"><Users className="w-5 h-5" /> {featuredEvent.location}</span>
                </div>
                <motion.a href={modalEvent.to} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow text-lg mt-2">
                  Go to Event <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}