import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Scene from '../Scene';
import type { ZoneKey } from '../Scene';
import { ArrowRight, Award, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const ZONES: { key: ZoneKey; title: string; desc: string }[] = [
  { key: 'office', title: 'Office Zone', desc: 'Desks, PCs, Tekvoro intro stats' },
  { key: 'conference', title: 'Conference Zone', desc: 'Talk about partnerships, AI tools' },
  { key: 'audience', title: 'Projects Zone', desc: 'Testimonials, companies served' },
  { key: 'data-room', title: 'Blog Zone', desc: 'Floating charts, AI dashboards' },
  { key: 'outdoor', title: 'Contact Zone', desc: 'Sustainability, remote dev culture' },
];

const ZONE_HEIGHT = typeof window !== 'undefined' && window.innerWidth < 640 ? 420 : 700; // px per zone section, smaller for mobile

function getZoneOverlay(zone: ZoneKey) {
  const arrow = (
    <motion.span
      className="ml-2 inline-block"
      initial={{ x: 0 }}
      animate={{ x: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    >
      <ArrowRight className="w-5 h-5" />
    </motion.span>
  );
  switch (zone) {
    case 'office':
      return (
        <div className="max-w-full sm:max-w-xl px-4 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-white drop-shadow-lg">
            Building the Future with AI & Innovation
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 font-normal">
            Tekvoro delivers next-gen digital transformation, AI, and cloud solutions for global innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full">
            <a href="/see-our-solutions" className="w-full sm:w-auto min-w-0 sm:min-w-[220px] px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-bold shadow-lg hover:bg-red-500 hover:text-white transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              See Our Solutions {arrow}
            </a>
            <a href="/book-demo" className="w-full sm:w-auto min-w-0 sm:min-w-[220px] px-6 sm:px-8 py-3 rounded-lg border border-white text-white font-bold hover:bg-white hover:text-black transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              Book a Demo {arrow}
            </a>
          </div>
          <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
            <span className="px-2 sm:px-3 py-1 border border-white rounded text-xs text-white">AI</span>
            <span className="px-2 sm:px-3 py-1 border border-white rounded text-xs text-white">Cloud</span>
            <span className="px-2 sm:px-3 py-1 border border-white rounded text-xs text-white">IoT</span>
          </div>
          <Link
            to="/about/best-investors"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-black font-extrabold text-base sm:text-lg shadow-xl hover:scale-110 hover:from-pink-500 hover:to-yellow-400 transition-transform duration-300 animate-glow border-4 border-white/20"
            style={{ letterSpacing: '0.04em' }}
          >
            <Award className="w-5 h-5 text-yellow-500 animate-bounce" />
            Meet Our Investors
          </Link>
        </div>
      );
    case 'conference':
      return (
        <div className="max-w-full sm:max-w-xl px-4 sm:px-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-white drop-shadow-lg">
            About Tekvoro
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 font-normal">
            Discover our story, vision, and the passionate team driving digital transformation worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full">
            <a href="/read-insights" className="w-full sm:w-auto min-w-0 sm:min-w-[200px] px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-bold shadow-lg hover:bg-red-500 hover:text-white transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              Read Insights {arrow}
            </a>
            <a href="/subscribe" className="w-full sm:w-auto min-w-0 sm:min-w-[200px] px-6 sm:px-8 py-3 rounded-lg border border-white text-white font-bold hover:bg-white hover:text-black transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              Subscribe {arrow}
            </a>
          </div>
        </div>
      );
    case 'audience':
      return (
        <div className="max-w-full sm:max-w-xl px-4 sm:px-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-white drop-shadow-lg">
            Our Projects & Impact
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 font-normal">
            Explore our portfolio of innovative solutions and the success stories of our global clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full">
            <a href="/view-portfolio" className="w-full sm:w-auto min-w-0 sm:min-w-[200px] px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-bold shadow-lg hover:bg-red-500 hover:text-white transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              View Portfolio {arrow}
            </a>
            <a href="/see-case-studies" className="w-full sm:w-auto min-w-0 sm:min-w-[200px] px-6 sm:px-8 py-3 rounded-lg border border-white text-white font-bold hover:bg-white hover:text-black transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              See Case Studies {arrow}
            </a>
          </div>
        </div>
      );
    case 'data-room':
      return (
        <div className="max-w-full sm:max-w-xl px-4 sm:px-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-white drop-shadow-lg">
            Insights & Blog
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 font-normal">
            Stay ahead with our latest insights, technology trends, and industry best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full">
            <a href="#blog" className="w-full sm:w-auto min-w-0 sm:min-w-[200px] px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-bold shadow-lg hover:bg-red-500 hover:text-white transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              Read Insights {arrow}
            </a>
            <a href="#newsletter" className="w-full sm:w-auto min-w-0 sm:min-w-[200px] px-6 sm:px-8 py-3 rounded-lg border border-white text-white font-bold hover:bg-white hover:text-black transition text-base sm:text-lg flex items-center justify-center whitespace-nowrap">
              Subscribe {arrow}
            </a>
          </div>
        </div>
      );
    case 'outdoor':
      return (
        <div className="px-4 sm:px-0">
          <div className="text-lg sm:text-2xl font-bold mb-2">Sustainable & Remote</div>
          <div className="text-xs sm:text-base text-secondary mb-2">We build with sustainability in mind and support remote teams worldwide.</div>
          <a href="/meet-the-team" className="mt-3 border-2 border-white text-white px-4 sm:px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition inline-block">Meet Our Team</a>
        </div>
      );
    default:
      return null;
  }
}

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoneIdx, setZoneIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Scroll event: update zoneIdx based on scroll position
  useEffect(() => {
    const onScroll = () => {
      if (isScrollingRef.current) return; // ignore if programmatically scrolling
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const idx = Math.min(
        ZONES.length - 1,
        Math.floor(scrollY / ZONE_HEIGHT)
      );
      setZoneIdx(idx);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu click: scroll to the selected zone
  const handleZoneSelect = (zone: ZoneKey) => {
    const idx = ZONES.findIndex(z => z.key === zone);
    if (idx === -1) return;
    isScrollingRef.current = true;
    window.scrollTo({
      top: idx * ZONE_HEIGHT,
      behavior: 'smooth',
    });
    setZoneIdx(idx);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700); // allow scroll to finish
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center bg-background text-primary font-sans overflow-hidden"
      style={{ height: `${ZONES.length * ZONE_HEIGHT}px` }}
    >
      {/* 3D Scene as background, zone changes on scroll */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Scene zone={ZONES[zoneIdx].key} />
      </div>
      {/* Navbar with right-side menu button, controlled by local state */}
      <Navbar />
      {/* Overlay for current zone */}
      <div className="fixed left-0 bottom-24 md:bottom-32 pl-8 md:pl-16 z-10 w-full max-w-lg flex flex-col items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={zoneIdx}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {getZoneOverlay(ZONES[zoneIdx].key)}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Footer */}
      <footer className="fixed bottom-4 left-0 w-full flex justify-center z-10">
        <span className="text-xs uppercase tracking-widest text-secondary text-center">
          © {new Date().getFullYear()} Tekvoro. All Rights Reserved.
        </span>
      </footer>
      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-16 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 