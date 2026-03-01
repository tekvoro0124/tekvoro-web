import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Search } from 'lucide-react';

const categories = ['All', 'AI', 'Cloud', 'IoT'];

type Meetup = {
  id: number;
  title: string;
  date: string;
  location: string;
  desc: string;
  rsvp: boolean;
  category: string;
  featured?: boolean;
  image?: string;
  speaker?: string;
  status: string;
  attendees: number;
  time: string;
  description: string;
  tags: string[];
};

const meetups: Meetup[] = [
  {
    id: 1,
    title: 'Hyderabad AI & ML Meetup',
    description: 'Connect with AI and ML enthusiasts, share ideas, and learn about the latest trends in artificial intelligence.',
    desc: 'Connect with AI and ML enthusiasts, share ideas, and learn about the latest trends in artificial intelligence.',
    date: '2024-12-27',
    time: '06:00 PM - 08:00 PM',
    location: 'Tekvoro Innovation Center, Hyderabad',
    attendees: 60,
    rsvp: true,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'ML', 'Meetup'],
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Cloud Native Hyderabad',
    description: 'A meetup for cloud engineers and developers to discuss cloud-native technologies and best practices.',
    desc: 'A meetup for cloud engineers and developers to discuss cloud-native technologies and best practices.',
    date: '2024-12-15',
    time: '05:00 PM - 07:00 PM',
    location: 'Cloud Cafe, Hyderabad',
    attendees: 40,
    rsvp: true,
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Cloud', 'DevOps', 'Meetup'],
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Past: IoT & Embedded Systems Meetup',
    description: 'A recap of our last IoT meetup with hands-on demos and networking.',
    desc: 'A recap of our last IoT meetup with hands-on demos and networking.',
    date: '2024-11-20',
    time: '06:00 PM - 08:00 PM',
    location: 'Tekvoro Innovation Center, Hyderabad',
    attendees: 35,
    rsvp: false,
    category: 'IoT',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    tags: ['IoT', 'Embedded', 'Meetup'],
    status: 'past',
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

const TechMeetupsPage = () => {
  const [selectedCategory] = useState<string>('All');
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
  const [suggestOpen, setSuggestOpen] = useState<boolean>(false);
  const [suggestForm, setSuggestForm] = useState<{ name: string; email: string; idea: string; company?: string; role?: string }>({ name: '', email: '', idea: '', company: '', role: '' });
  const [suggestSubmitting, setSuggestSubmitting] = useState<boolean>(false);
  const [suggestSubmitted, setSuggestSubmitted] = useState<boolean>(false);
  const suggestRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(true);

  const featured = meetups.find(m => m.featured) || meetups[0];
  const filtered = selectedCategory === 'All' ? meetups : meetups.filter(m => m.category === selectedCategory);

  const filteredMeetups = meetups.filter(meetup =>
    meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meetup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meetup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const upcomingMeetups = filteredMeetups.filter(m => m.status === 'upcoming');
  const pastMeetups = filteredMeetups.filter(m => m.status === 'past');

  useEffect(() => {
    function updateCountdown() {
      const eventDate = new Date(featured.date + 'T18:00:00Z');
      const now = new Date();
      const diff = Math.max(0, eventDate.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      // Countdown state is used for display purposes
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Tech Meetups | Tekvoro Technologies"
        description="Join our tech meetups and networking events. Connect with fellow developers, share knowledge, and stay updated with the latest technology trends in a collaborative environment."
        keywords="tech meetups, networking events, developer meetups, technology meetups, community events, tech networking, developer community"
        ogImage="/images/tech-meetups-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Tech Meetups",
          "description": "Join our tech meetups and networking events",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-green-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-green-400 to-teal-500 bg-clip-text text-transparent">
              Tech Meetups
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Join our tech meetups to connect, learn, and grow with the community.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meetups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${showUpcoming ? 'bg-green-400 text-black border-green-400 shadow-lg' : 'bg-black/50 text-green-400 border-neutral-800 hover:bg-neutral-900 hover:border-green-400'}`}
                onClick={() => setShowUpcoming(true)}
              >
                Upcoming
              </button>
              <button
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-gray-400 ${!showUpcoming ? 'bg-gray-400 text-black border-gray-400 shadow-lg' : 'bg-black/50 text-gray-400 border-neutral-800 hover:bg-neutral-900 hover:border-gray-400'}`}
                onClick={() => setShowUpcoming(false)}
              >
                Past
              </button>
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
            {showUpcoming ? 'Upcoming Meetups' : 'Past Meetups'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showUpcoming ? upcomingMeetups : pastMeetups).map((meetup, idx) => (
              <motion.article
                key={meetup.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={meetup.image}
                    alt={meetup.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-400 text-black text-sm font-semibold rounded-full">
                      Meetup
                    </span>
                  </div>
                  {meetup.status === 'past' && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-gray-600/80 text-white text-sm font-semibold rounded-full">
                        Past
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(meetup.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {meetup.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {meetup.location}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                  {meetup.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {meetup.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {meetup.attendees}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {meetup.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {meetup.rsvp && (
                  <motion.button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    RSVP
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                )}
              </motion.article>
            ))}
          </div>
        </div>
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
};

export default TechMeetupsPage; 