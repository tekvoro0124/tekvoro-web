import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Flag, CheckCircle, Clock, Lightbulb, ChevronDown, ChevronUp, Tag, PlusCircle } from 'lucide-react';

const years = ['All', '2024', '2025'];
const statuses = ['All', 'Upcoming', 'In Progress', 'Released'];

const milestones = [
  {
    id: 1,
    title: 'AI Analytics Suite',
    description: 'Launch of advanced analytics tools for business intelligence, powered by next-gen AI.',
    date: 'Q3 2024',
    year: '2024',
    status: 'Upcoming',
    tags: ['AI', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Mobile App 2.0',
    description: 'Major update with new features and improved UX for mobile users.',
    date: 'Q4 2024',
    year: '2024',
    status: 'In Progress',
    tags: ['Mobile', 'UX'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Global Expansion',
    description: 'Expanding our platform to new regions and languages, with local support.',
    date: '2025',
    year: '2025',
    status: 'Upcoming',
    tags: ['Expansion', 'International'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Cloud Sync for Enterprise',
    description: 'Enterprise-grade cloud sync with advanced security and compliance.',
    date: 'Q2 2024',
    year: '2024',
    status: 'Released',
    tags: ['Cloud', 'Enterprise'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Performance Boost',
    description: 'Infrastructure upgrade for speed and reliability. Up to 50% faster load times.',
    date: 'Q2 2024',
    year: '2024',
    status: 'Released',
    tags: ['Performance'],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Beta Program Launch',
    description: 'Open beta for select users to test and shape upcoming features.',
    date: 'Q1 2024',
    year: '2024',
    status: 'Released',
    tags: ['Beta', 'Community'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  },
];

const visionItems = [
  {
    title: 'AI-Driven Personalization',
    description: 'Hyper-personalized experiences for every user, powered by advanced AI.',
    icon: <Lightbulb className="w-8 h-8 text-yellow-400 mb-2" />,
  },
  {
    title: 'Zero-Carbon Cloud',
    description: 'Sustainable, carbon-neutral cloud infrastructure for all Tekvoro products.',
    icon: <Lightbulb className="w-8 h-8 text-green-400 mb-2" />,
  },
  {
    title: 'Open Innovation Platform',
    description: 'A platform for the community to build, share, and monetize new solutions.',
    icon: <Lightbulb className="w-8 h-8 text-blue-400 mb-2" />,
  },
];

const statusColors = {
  'Upcoming': 'bg-yellow-500 text-black',
  'In Progress': 'bg-blue-500 text-white',
  'Released': 'bg-green-500 text-white',
};

function getStatusIcon(status: string) {
  if (status === 'Upcoming') return <Clock className="w-5 h-5 mr-1" />;
  if (status === 'In Progress') return <Flag className="w-5 h-5 mr-1" />;
  if (status === 'Released') return <CheckCircle className="w-5 h-5 mr-1" />;
  return null;
}

function getProgress() {
  const released = milestones.filter(m => m.status === 'Released').length;
  return Math.round((released / milestones.length) * 100);
}

const ProductRoadmapPage = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', suggestion: '' });
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  let filtered = milestones;
  if (selectedYear !== 'All') filtered = filtered.filter(m => m.year === selectedYear);
  if (selectedStatus !== 'All') filtered = filtered.filter(m => m.status === selectedStatus);

  // Accessibility: focus trap for modal
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

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setForm({ name: '', email: '', suggestion: '' });
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Product Roadmap | Tekvoro Technologies"
        description="Explore our product roadmap and see what's coming next. Discover upcoming features, improvements, and innovations that will enhance your experience with our solutions."
        keywords="product roadmap, upcoming features, product development, technology roadmap, feature planning, product updates, innovation timeline"
        ogImage="/images/product-roadmap-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Product Roadmap",
          "description": "Explore our product roadmap and see what's coming next",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-blue-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
        <div className="container-custom flex flex-col items-center text-center gap-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-blue-300 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
            Product Roadmap
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-6 font-light">
            See what's next for Tekvoro—upcoming features, milestones, and our vision for the future.
          </p>
          {/* Progress Bar */}
          <div className="w-full max-w-xl flex flex-col gap-2 items-center">
            <div className="flex justify-between w-full text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{getProgress()}% Released</span>
            </div>
            <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 1 }}
                style={{ minWidth: 12 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800">
        <div className="container-custom py-4 flex flex-wrap gap-4 justify-center items-center">
          <div className="flex gap-2">
            {years.map((y) => (
              <motion.button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${selectedYear === y
                  ? 'bg-blue-400 text-black border-blue-400 shadow-lg'
                  : 'bg-black text-blue-400 border-neutral-800 hover:bg-neutral-900 hover:border-blue-400'}`}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {y}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-2">
            {statuses.map((s) => (
              <motion.button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${selectedStatus === s
                  ? 'bg-green-400 text-black border-green-400 shadow-lg'
                  : 'bg-black text-green-400 border-neutral-800 hover:bg-neutral-900 hover:border-green-400'}`}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-custom py-16 flex-1">
        <div className="relative border-l-4 border-blue-400 pl-10">
          {filtered.length === 0 && (
            <div className="text-center text-gray-400 text-lg py-20">No milestones found for this filter.</div>
          )}
          <AnimatePresence initial={false}>
            {filtered.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="mb-12 flex items-start gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-black border-4 border-blue-400 rounded-full p-3 mb-2">
                    {getStatusIcon(m.status)}
                  </div>
                  {idx < filtered.length - 1 && <div className="h-16 w-1 bg-blue-400 rounded-full" />}
                </div>
                <motion.div
                  className="flex-1 bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 border border-white/10 hover:shadow-lg transition-all cursor-pointer relative"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                  initial={false}
                  animate={{ boxShadow: expanded === m.id ? '0 8px 32px 0 rgba(0,0,0,0.25)' : undefined }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[m.status as keyof typeof statusColors]}`}>{m.status}</span>
                    <span className="text-xs text-gray-400">{m.date}</span>
                    <div className="flex gap-1 ml-2">
                      {m.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-blue-300 text-xs font-semibold">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-wide">
                      {m.title}
                    </h3>
                    <span>
                      {expanded === m.id ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5 text-blue-400" />}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2 text-sm line-clamp-2 group-hover:line-clamp-none transition-all">
                    {m.description}
                  </p>
                  <AnimatePresence>
                    {expanded === m.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <img
                          src={m.image}
                          alt={m.title}
                          className="w-full h-48 object-cover rounded-lg mb-4 border border-white/10 shadow"
                          loading="lazy"
                        />
                        <div className="text-xs text-gray-400 mb-2">Milestone ID: {m.id}</div>
                        <div className="flex gap-2 mb-2">
                          {m.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-blue-300 text-xs font-semibold">
                              <Tag className="w-3 h-3" /> {tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-300 mb-2">{m.description}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Vision & Feedback Section */}
      <section className="py-16 bg-gradient-to-r from-black via-blue-400 to-neutral-900 text-black text-center relative overflow-hidden">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-white">
            The Future: Our Vision
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {visionItems.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 max-w-xs hover:shadow-lg hover:scale-105 transition-all"
              >
                {v.icon}
                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                  {v.title}
                </h3>
                <p className="text-gray-300">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-white hover:text-blue-600 transition text-lg mt-2"
            whileTap={{ scale: 0.97 }}
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle className="w-6 h-6" /> Suggest a Feature
          </motion.button>
        </div>
        {/* Modal Overlay */}
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
                className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-blue-400 focus:outline-none"
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
                    <h3 className="text-2xl font-bold mb-2 text-blue-400">Suggest a Feature</h3>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name (optional)"
                      className="bg-neutral-800 border border-blue-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={form.name}
                      onChange={handleFormChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email (optional)"
                      className="bg-neutral-800 border border-blue-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={form.email}
                      onChange={handleFormChange}
                    />
                    <textarea
                      name="suggestion"
                      placeholder="Feature Suggestion*"
                      required
                      minLength={5}
                      className="bg-neutral-800 border border-blue-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
                      value={form.suggestion}
                      onChange={handleFormChange}
                    />
                    <div className="flex gap-4 mt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-neutral-700 hover:bg-neutral-800 text-gray-300 font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                    <div className="text-lg font-bold text-green-400 mb-2">Thank you!</div>
                    <div className="text-gray-200">Your suggestion has been received.</div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
};

export default ProductRoadmapPage; 