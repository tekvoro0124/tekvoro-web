import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'AI', 'Cloud', 'IoT'];

type Meetup = {
  id: number;
  title: string;
  date: string;
  location: string;
  desc: string;
  rsvp: string;
  category: string;
  featured?: boolean;
  image?: string;
  speaker?: string;
};

const meetups: Meetup[] = [
  {
    id: 1,
    title: 'AI 2025: Community Night',
    date: '2024-07-18',
    location: 'Tekvoro HQ, Hyderabad',
    desc: 'A special AI 2025 meetup with Dr. Priya Nair. Demos, lightning talks, and networking with the future of AI.',
    rsvp: '#',
    category: 'AI',
    featured: true,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    speaker: 'Dr. Priya Nair',
  },
  {
    id: 2,
    title: 'Cloud & DevOps Meetup',
    date: '2024-08-02',
    location: 'Silicon Valley, USA',
    desc: 'Hands-on sessions and expert panels on cloud and DevOps trends.',
    rsvp: '#',
    category: 'Cloud',
  },
  {
    id: 3,
    title: 'IoT & Smart Devices Gathering',
    date: '2024-08-20',
    location: 'Berlin, Germany',
    desc: 'Showcase of IoT projects and networking with industry leaders.',
    rsvp: '#',
    category: 'IoT',
  },
  {
    id: 4,
    title: 'AI & ML Community Night',
    date: '2024-09-10',
    location: 'Bangalore, India',
    desc: 'Network with AI/ML enthusiasts, see demos, and join lightning talks.',
    rsvp: '#',
    category: 'AI',
  },
];

const priya = {
  name: 'Dr. Priya Nair',
  role: 'Chief AI Officer – AI 2025 Featured',
  bio: 'Visionary in AI and ethics, leading Tekvoro\'s AI 2025 initiative. 20+ years in research, innovation, and global leadership.',
  longBio: 'Dr. Priya Nair is a global thought leader in artificial intelligence, ethics, and innovation. She has led groundbreaking research teams, published over 50 papers, and is a frequent keynote speaker at international AI conferences. As Chief AI Officer, she is driving Tekvoro\'s AI 2025 vision, focusing on responsible AI, diversity in tech, and next-gen intelligent systems.',
  image: 'https://randomuser.me/api/portraits/women/65.jpg',
  funFacts: [
    'Named Top 10 Women in AI 2024',
    'Published 50+ research papers',
    'Keynote at World AI Summit 2023',
  ],
};

export default function TechMeetupsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rsvpOpen, setRsvpOpen] = useState<boolean>(false);
  const [rsvpMeetup, setRsvpMeetup] = useState<Meetup | null>(null);
  const [bioOpen, setBioOpen] = useState<boolean>(false);
  const [form, setForm] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const rsvpRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLDivElement | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [detailsMeetup, setDetailsMeetup] = useState<Meetup | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [suggestOpen, setSuggestOpen] = useState<boolean>(false);
  const [suggestForm, setSuggestForm] = useState<{ name: string; email: string; idea: string; company?: string; role?: string }>({ name: '', email: '', idea: '', company: '', role: '' });
  const [suggestSubmitting, setSuggestSubmitting] = useState<boolean>(false);
  const [suggestSubmitted, setSuggestSubmitted] = useState<boolean>(false);
  const suggestRef = useRef<HTMLDivElement | null>(null);

  const featured = meetups.find(m => m.featured) || meetups[0];
  const filtered = selectedCategory === 'All' ? meetups : meetups.filter(m => m.category === selectedCategory);
  const rest = filtered.filter(m => m.id !== featured.id);

  useEffect(() => {
    function updateCountdown() {
      const eventDate = new Date(featured.date + 'T18:00:00Z');
      const now = new Date();
      const diff = Math.max(0, eventDate.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [featured.date]);

  function openRsvp(meetup: Meetup) {
    setRsvpMeetup(meetup);
    setRsvpOpen(true);
    setForm({ name: '', email: '', message: '' });
    setSubmitted(false);
  }
  function closeRsvp() {
    setRsvpOpen(false);
    setRsvpMeetup(null);
  }
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setRsvpOpen(false);
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 1800);
  }
  function handleRsvpKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') closeRsvp();
    if (rsvpRef.current) {
      const focusable = (rsvpRef.current.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  }
  function openBio() { setBioOpen(true); }
  function closeBio() { setBioOpen(false); }
  function handleBioKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') closeBio();
    if (bioRef.current) {
      const focusable = (bioRef.current.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  }
  function openDetails(meetup: Meetup) {
    setDetailsMeetup(meetup);
    setDetailsOpen(true);
    // Analytics
    console.log('Meetup Details Opened:', meetup);
  }
  function closeDetails() {
    setDetailsOpen(false);
    setDetailsMeetup(null);
  }
  function handleDetailsKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') closeDetails();
    if (detailsRef.current) {
      const focusable = (detailsRef.current.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  }
  function handleShare(meetup: Meetup) {
    // Analytics
    console.log('Meetup Shared:', meetup);
    if (navigator.share) {
      navigator.share({
        title: meetup.title,
        text: meetup.desc,
        url: window.location.href,
      });
    } else {
      window.alert('Share this page: ' + window.location.href);
    }
  }
  // Mocked attendee avatars
  const avatars = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/45.jpg',
    'https://randomuser.me/api/portraits/women/46.jpg',
    'https://randomuser.me/api/portraits/men/47.jpg',
    'https://randomuser.me/api/portraits/women/48.jpg',
  ];
  const attendeeCount = 128 + Math.floor(Math.random() * 40);

  function openSuggest() { setSuggestOpen(true); }
  function closeSuggest() { setSuggestOpen(false); setSuggestSubmitted(false); }
  function handleSuggestChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSuggestForm({ ...suggestForm, [e.target.name]: e.target.value });
  }
  async function handleSuggestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuggestSubmitting(true);
    await new Promise(res => setTimeout(res, 1200));
    console.log('Meetup Suggestion Submitted:', suggestForm);
    setSuggestSubmitted(true);
    setSuggestSubmitting(false);
    setTimeout(() => {
      setSuggestOpen(false);
      setSuggestSubmitted(false);
      setSuggestForm({ name: '', email: '', idea: '', company: '', role: '' });
    }, 3000);
  }
  function handleSuggestKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') closeSuggest();
    if (suggestRef.current) {
      const focusable = (suggestRef.current.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      {/* Tabs */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800">
        <div className="container-custom py-4 flex flex-wrap gap-3 justify-center items-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${selectedCategory === cat
                ? 'bg-green-400 text-black border-green-400 shadow-lg'
                : 'bg-black text-green-400 border-neutral-800 hover:bg-neutral-900 hover:border-green-400'}`}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>
      {/* Featured AI 2025 Meetup Hero */}
      {(selectedCategory === 'All' || selectedCategory === 'AI') && (
        <section className="relative w-full bg-gradient-to-br from-black via-yellow-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
          {/* Animated AI orbs */}
          <motion.div
            className="absolute left-10 top-10 w-32 h-32 bg-gradient-to-br from-yellow-400/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-40 animate-pulse z-0"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <motion.div
            className="absolute right-10 bottom-10 w-24 h-24 bg-gradient-to-br from-green-400/30 via-black/0 to-black/0 rounded-full blur-2xl opacity-30 animate-pulse z-0"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 10 }}
          />
          {/* Animated SVG lines/nodes */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="100" r="2.5" fill="#facc15" opacity="0.7">
              <animate attributeName="cy" values="100;120;100" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="60" r="2.5" fill="#4ade80" opacity="0.7">
              <animate attributeName="cy" values="60;80;60" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="1200" cy="180" r="2.5" fill="#facc15" opacity="0.7">
              <animate attributeName="cy" values="180;200;180" dur="5s" repeatCount="indefinite" />
            </circle>
            <polyline points="200,100 600,60 1200,180" stroke="#facc15" strokeWidth="1.5" opacity="0.15">
              <animate attributeName="points" values="200,100 600,60 1200,180;200,120 600,80 1200,200;200,100 600,60 1200,180" dur="6s" repeatCount="indefinite" />
            </polyline>
          </svg>
          <div className="container-custom flex flex-col md:flex-row items-center gap-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-yellow-400 text-xs font-semibold">
                  Featured
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-yellow-400 text-xs font-semibold">
                  AI 2025
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                {featured.title}
              </h1>
              <div className="text-yellow-400 font-semibold mb-2 text-lg">{featured.date} • {featured.location}</div>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8 font-light">
                {featured.desc}
              </p>
              {/* Countdown */}
              <div className="flex items-center gap-4 text-yellow-300 font-mono text-lg mb-6">
                <span>Starts in:</span>
                <span>{countdown.days}d</span>
                <span>{countdown.hours}h</span>
                <span>{countdown.minutes}m</span>
                <span>{countdown.seconds}s</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <span>
                  Speaker: <button className="underline text-yellow-300 hover:text-white transition" onClick={openBio} type="button">{featured.speaker}</button>
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                <motion.button
                  className="inline-block px-10 py-4 rounded-lg bg-yellow-400 text-black font-bold shadow-lg hover:bg-white hover:text-black transition text-lg"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openRsvp(featured)}
                >
                  RSVP Now
                </motion.button>
              </div>
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
                className="rounded-2xl shadow-2xl w-full h-80 md:h-96 object-cover border-4 border-yellow-400"
              />
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-400/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 7 }}
              />
            </motion.div>
          </div>
        </section>
      )}
      {/* Meetups List */}
      <section className="container-custom py-16 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10"
          >
            {rest.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">No meetups in this category yet.</div>
            )}
            {rest.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 border border-white/10 hover:shadow-lg hover:scale-105 transition-all text-left cursor-pointer"
                onClick={() => openDetails(m)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${m.title}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{m.title}</h2>
                    <div className={`text-sm font-semibold mb-1 ${m.category === 'AI' ? 'text-yellow-400' : m.category === 'Cloud' ? 'text-blue-400' : m.category === 'IoT' ? 'text-green-400' : 'text-gray-400'}`}>{m.date} • {m.location}</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); openRsvp(m); }} className={`inline-block px-6 py-2 rounded-lg font-bold shadow hover:bg-white hover:text-black transition text-base mt-2 md:mt-0 ${m.category === 'AI' ? 'bg-yellow-400 text-black' : m.category === 'Cloud' ? 'bg-blue-400 text-black' : m.category === 'IoT' ? 'bg-green-400 text-black' : 'bg-neutral-700 text-white'}`} type="button">
                    RSVP
                  </button>
                </div>
                <p className="text-gray-300 text-base">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
      {/* RSVP Modal */}
      <AnimatePresence>
        {rsvpOpen && rsvpMeetup && (
          <motion.div
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) closeRsvp(); }}
          >
            <motion.div
              ref={rsvpRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-yellow-400 focus:outline-none"
              onKeyDown={handleRsvpKeyDown}
              tabIndex={0}
              autoFocus
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 focus:outline-none"
                aria-label="Close modal"
                onClick={closeRsvp}
              >
                &times;
              </button>
              {!submitted ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 mt-2">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400">RSVP for {rsvpMeetup.title}</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message (optional)"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[80px]"
                    value={form.message}
                    onChange={handleFormChange}
                  />
                  <div className="flex gap-4 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-neutral-700 hover:bg-neutral-800 text-gray-300 font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={closeRsvp}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center min-h-[180px]"
                >
                  <div className="text-3xl mb-4">🎉</div>
                  <div className="text-lg font-bold text-yellow-400 mb-2">Thank you!</div>
                  <div className="text-gray-200">Your RSVP has been received.</div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Speaker Bio Modal */}
      <AnimatePresence>
        {bioOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) closeBio(); }}
          >
            <motion.div
              ref={bioRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-yellow-400 focus:outline-none"
              onKeyDown={handleBioKeyDown}
              tabIndex={0}
              autoFocus
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 focus:outline-none"
                aria-label="Close modal"
                onClick={closeBio}
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <img src={priya.image} alt={priya.name} className="w-24 h-24 rounded-full mb-4 border-2 border-yellow-400 shadow" />
                <h3 className="text-2xl font-bold text-yellow-400 mb-1 tracking-wide">{priya.name}</h3>
                <div className="font-semibold mb-2">{priya.role}</div>
                <p className="text-gray-300 text-base mb-4 text-center">{priya.longBio || priya.bio}</p>
                {priya.funFacts && priya.funFacts.length > 0 && (
                  <div className="w-full mb-2">
                    <h4 className="text-yellow-400 font-bold mb-2">Fun Facts & Achievements</h4>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                      {priya.funFacts.map((fact, i) => (
                        <li key={i}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Meetup Details Modal */}
      <AnimatePresence>
        {detailsOpen && detailsMeetup && (
          <motion.div
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) closeDetails(); }}
          >
            <motion.div
              ref={detailsRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-yellow-400 focus:outline-none"
              onKeyDown={handleDetailsKeyDown}
              tabIndex={0}
              autoFocus
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 focus:outline-none"
                aria-label="Close modal"
                onClick={closeDetails}
              >
                &times;
              </button>
              <div className="flex flex-col items-center mb-4">
                {detailsMeetup.image && (
                  <img src={detailsMeetup.image} alt={detailsMeetup.title} className="w-32 h-32 rounded-2xl mb-4 object-cover border-2 border-yellow-400 shadow" />
                )}
                <h3 className="text-2xl font-bold text-yellow-400 mb-1 tracking-wide">{detailsMeetup.title}</h3>
                <div className="font-semibold mb-2 text-yellow-300">{detailsMeetup.date} • {detailsMeetup.location}</div>
                <p className="text-gray-300 text-base mb-2 text-center">{detailsMeetup.desc}</p>
                {/* Attendees */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {avatars.slice(0, 5).map((a, i) => (
                      <img key={i} src={a} alt="attendee avatar" className="w-8 h-8 rounded-full border-2 border-neutral-800" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 ml-2">+{attendeeCount} attending</span>
                </div>
                {/* Social links */}
                <div className="flex gap-3 mb-2">
                  <a href="#" className="text-green-400 underline hover:text-white" target="_blank" rel="noopener noreferrer">Join WhatsApp</a>
                  <a href="#" className="text-blue-400 underline hover:text-white" target="_blank" rel="noopener noreferrer">Join Discord</a>
                </div>
                {/* Agenda (mocked) */}
                <div className="w-full mb-2 mt-2">
                  <h4 className="text-yellow-400 font-bold mb-1">Agenda</h4>
                  <ul className="list-disc list-inside text-gray-200 text-sm">
                    <li>Welcome & Networking</li>
                    <li>Lightning Talks & Demos</li>
                    <li>Panel Q&A</li>
                    <li>Community Announcements</li>
                  </ul>
                </div>
                {/* AI 2025 video intro */}
                {detailsMeetup.featured && (
                  <div className="w-full mb-2 mt-2">
                    <h4 className="text-yellow-400 font-bold mb-1">AI 2025 Video Intro</h4>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="AI 2025 Video Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-48 rounded-xl border-2 border-yellow-400 shadow"
                      />
                    </div>
                  </div>
                )}
                {/* Share & RSVP */}
                <div className="flex gap-4 mt-4">
                  <button
                    className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={() => openRsvp(detailsMeetup)}
                  >
                    RSVP
                  </button>
                  <button
                    className="flex-1 bg-neutral-700 hover:bg-neutral-800 text-yellow-300 font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={() => handleShare(detailsMeetup)}
                  >
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Suggest a Meetup Button */}
      <button
        className="fixed z-50 bottom-8 right-8 bg-yellow-400 text-black rounded-full shadow-lg p-4 flex items-center gap-2 font-bold text-lg hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        style={{ boxShadow: '0 4px 24px 0 rgba(250,204,21,0.25)' }}
        onClick={openSuggest}
        aria-label="Suggest a Meetup"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Suggest a Meetup
      </button>
      {/* Suggest a Meetup Modal */}
      <AnimatePresence>
        {suggestOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) closeSuggest(); }}
          >
            <motion.div
              ref={suggestRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-yellow-400 focus:outline-none"
              onKeyDown={handleSuggestKeyDown}
              tabIndex={0}
              autoFocus
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 focus:outline-none"
                aria-label="Close modal"
                onClick={closeSuggest}
              >
                &times;
              </button>
              {!suggestSubmitted ? (
                <form onSubmit={handleSuggestSubmit} className="flex flex-col gap-5 mt-2">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400">Suggest a Meetup</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={suggestForm.name}
                    onChange={handleSuggestChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={suggestForm.email}
                    onChange={handleSuggestChange}
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={suggestForm.company}
                    onChange={handleSuggestChange}
                  />
                  <input
                    type="text"
                    name="role"
                    placeholder="Role (optional)"
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={suggestForm.role}
                    onChange={handleSuggestChange}
                  />
                  <textarea
                    name="idea"
                    placeholder="Describe your meetup idea..."
                    className="bg-neutral-800 border border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[80px]"
                    value={suggestForm.idea}
                    onChange={handleSuggestChange}
                    required
                  />
                  <div className="flex gap-4 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
                      disabled={suggestSubmitting}
                    >
                      {suggestSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-neutral-700 hover:bg-neutral-800 text-gray-300 font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={closeSuggest}
                      disabled={suggestSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center min-h-[180px]"
                >
                  <div className="text-3xl mb-4">🚀</div>
                  <div className="text-lg font-bold text-yellow-400 mb-2">Thank you!</div>
                  <div className="text-gray-200">Your suggestion has been received.</div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
} 