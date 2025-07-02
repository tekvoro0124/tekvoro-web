import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'AI', 'Cloud', 'IoT'];

type Webinar = {
  id: number;
  title: string;
  date: string;
  time: string;
  speaker: string;
  desc: string;
  link?: string;
  image?: string;
  category: string;
  featured?: boolean;
  recording?: string;
};

const webinars: Webinar[] = [
  {
    id: 1,
    title: 'AI 2025: The Future of Intelligence',
    date: '2024-07-01',
    time: '17:00 GMT',
    speaker: 'Dr. Priya Nair',
    desc: 'A deep dive into the next wave of AI breakthroughs, ethics, and opportunities for 2025 and beyond.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    category: 'AI',
    featured: true,
  },
  {
    id: 2,
    title: 'AI in the Real World',
    date: '2024-07-10',
    time: '16:00 GMT',
    speaker: 'Dr. Priya Nair',
    desc: 'Explore practical AI applications and case studies with industry expert Dr. Priya Nair.',
    link: '#',
    category: 'AI',
  },
  {
    id: 3,
    title: 'Cloud Security Best Practices',
    date: '2024-07-22',
    time: '18:00 GMT',
    speaker: 'Alex Chen',
    desc: 'Learn how to secure your cloud infrastructure and data from leading security architect Alex Chen.',
    link: '#',
    category: 'Cloud',
  },
  {
    id: 4,
    title: 'Next-Gen IoT Solutions',
    date: '2024-08-05',
    time: '15:00 GMT',
    speaker: 'Maria Garcia',
    desc: 'Discover the future of connected devices and smart infrastructure with Maria Garcia.',
    link: '#',
    category: 'IoT',
  },
];

const pastWebinars: Webinar[] = [
  {
    id: 101,
    title: 'AI Ethics & Society',
    date: '2024-05-10',
    time: '15:00 GMT',
    speaker: 'Dr. Priya Nair',
    desc: 'A discussion on the ethical implications of AI in society.',
    recording: '#',
    category: 'AI',
  },
  {
    id: 102,
    title: 'Cloud Cost Optimization',
    date: '2024-04-18',
    time: '17:00 GMT',
    speaker: 'Alex Chen',
    desc: 'Tips and strategies for reducing cloud spend.',
    recording: '#',
    category: 'Cloud',
  },
];

function getGoogleCalendarUrl(webinar: Webinar) {
  const start = webinar.date.replace(/-/g, '') + 'T' + webinar.time.replace(':', '') + '00Z';
  const end = start; // For demo, 1hr duration can be calculated if needed
  const details = encodeURIComponent(webinar.desc + '\nSpeaker: ' + webinar.speaker);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(webinar.title)}&dates=${start}/${end}&details=${details}`;
}

export default function UpcomingWebinarsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showPast, setShowPast] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalWebinar, setModalWebinar] = useState<Webinar | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const featured = webinars.find(w => w.featured) || webinars[0];
  const filtered = selectedCategory === 'All' ? webinars : webinars.filter(w => w.category === selectedCategory);
  const rest = filtered.filter(w => w.id !== featured.id);
  const filteredPast = selectedCategory === 'All' ? pastWebinars : pastWebinars.filter(w => w.category === selectedCategory);

  // Modal accessibility
  function handleModalKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') setModalOpen(false);
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
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

  function openModal(webinar: Webinar) {
    setModalWebinar(webinar);
    setModalOpen(true);
    setForm({ name: '', email: '', message: '' });
    setSubmitted(false);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 1800);
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      {/* Toggle Tabs */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800">
        <div className="container-custom py-4 flex flex-wrap gap-3 justify-center items-center">
          <button
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${!showPast ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg' : 'bg-black text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
            onClick={() => setShowPast(false)}
          >
            Upcoming
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${showPast ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg' : 'bg-black text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
            onClick={() => setShowPast(true)}
          >
            Past
          </button>
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

      {/* Featured Webinar Hero (only for Upcoming) */}
      {!showPast && (
        <section className="relative w-full bg-gradient-to-br from-black via-yellow-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
          <div className="container-custom flex flex-col md:flex-row items-center gap-16">
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
                  {featured.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                {featured.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8 font-light">
                {featured.desc}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <span>{featured.date}</span>
                <span>•</span>
                <span>{featured.time}</span>
                <span>•</span>
                <span>Speaker: {featured.speaker}</span>
              </div>
              <div className="flex gap-4 mt-4">
                <motion.button
                  className="inline-block px-10 py-4 rounded-lg bg-yellow-400 text-black font-bold shadow-lg hover:bg-white hover:text-black transition text-lg"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openModal(featured)}
                >
                  Register Now
                </motion.button>
                <a
                  href={getGoogleCalendarUrl(featured)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-4 rounded-lg bg-black text-yellow-400 font-bold shadow hover:bg-yellow-400 hover:text-black transition text-lg border border-yellow-400"
                >
                  Add to Google Calendar
                </a>
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
      )}

      {/* Webinars List */}
      <section className="container-custom py-16 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + (showPast ? '-past' : '-upcoming')}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10"
          >
            {(!showPast ? rest : filteredPast).length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">No webinars in this category yet.</div>
            )}
            {(!showPast ? rest : filteredPast).map((w, idx) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 border border-white/10 hover:shadow-lg hover:scale-105 transition-all text-left"
              >
                <div className="flex flex-col gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-white mb-1">{w.title}</h2>
                  <div className="text-sm text-yellow-400 font-semibold mb-1">{w.date} • {w.time}</div>
                  <div className="text-sm text-gray-400 mb-2">Speaker: {w.speaker}</div>
                </div>
                <p className="text-gray-300 text-base mb-4">{w.desc}</p>
                <div className="flex gap-4 mt-2">
                  {!showPast && (
                    <motion.button
                      className="inline-block px-6 py-2 rounded-lg bg-yellow-400 text-black font-bold shadow hover:bg-white hover:text-black transition text-base"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openModal(w)}
                    >
                      Register
                    </motion.button>
                  )}
                  <a
                    href={getGoogleCalendarUrl(w)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-lg bg-black text-yellow-400 font-bold shadow hover:bg-yellow-400 hover:text-black transition text-base border border-yellow-400"
                  >
                    Add to Google Calendar
                  </a>
                  {showPast && 'recording' in w && w.recording && (
                    <a
                      href={w.recording}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold shadow hover:bg-white hover:text-black transition text-base"
                    >
                      Watch Recording
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-yellow-400 focus:outline-none"
              onKeyDown={handleModalKeyDown}
              tabIndex={0}
              autoFocus
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 focus:outline-none"
                aria-label="Close modal"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>
              {!submitted ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 mt-2">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400">Register for {modalWebinar?.title}</h3>
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
                      onClick={() => setModalOpen(false)}
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
                  <div className="text-gray-200">Your registration has been received.</div>
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