import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Beaker, UserPlus, Star, MessageCircle, CheckCircle, ChevronDown, ChevronUp, Users, Award, Rocket, Lightbulb } from 'lucide-react';

const steps = [
  { icon: <UserPlus className="w-7 h-7 text-purple-400" />, title: 'Apply', desc: 'Submit your interest to join our beta program.' },
  { icon: <Beaker className="w-7 h-7 text-yellow-400" />, title: 'Get Access', desc: 'Receive early access to new features and products.' },
  { icon: <Rocket className="w-7 h-7 text-blue-400" />, title: 'Test & Explore', desc: 'Try out new releases and explore upcoming innovations.' },
  { icon: <MessageCircle className="w-7 h-7 text-green-400" />, title: 'Give Feedback', desc: 'Share your insights and help us improve.' },
  { icon: <Award className="w-7 h-7 text-pink-400" />, title: 'Earn Rewards', desc: 'Get exclusive perks, badges, and recognition.' },
];

const benefits = [
  { icon: <Star className="w-8 h-8 text-yellow-400 mb-2" />, title: 'Early Access', desc: 'Be the first to try new features and products.' },
  { icon: <Lightbulb className="w-8 h-8 text-purple-400 mb-2" />, title: 'Shape the Future', desc: 'Your feedback directly influences our roadmap.' },
  { icon: <Users className="w-8 h-8 text-blue-400 mb-2" />, title: 'Community', desc: 'Join a network of innovators and tech enthusiasts.' },
  { icon: <Award className="w-8 h-8 text-pink-400 mb-2" />, title: 'Exclusive Rewards', desc: 'Earn badges, perks, and recognition for your contributions.' },
];

const betaOpportunities = [
  { id: 1, name: 'AI Assistant 2.0', desc: 'Test our next-gen AI assistant before public release.', status: 'Open', testers: 120, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Cloud Sync', desc: 'Experience seamless, secure data sync across devices.', status: 'Closed', testers: 80, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Mobile App 2.0', desc: 'Help us shape the next generation of our mobile experience.', status: 'Upcoming', testers: 0, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
];

const testimonials = [
  { quote: 'Joining the beta program let me influence features I care about. The team really listens!', name: 'Samantha Lee', role: 'Beta Tester', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { quote: 'I love getting early access and seeing my feedback make a difference. Highly recommend!', name: 'Rajiv Menon', role: 'Beta Tester', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { quote: 'The rewards and recognition make it fun to participate. Great community!', name: 'Elena Petrova', role: 'Beta Tester', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

const faqs = [
  { q: 'Who can join the beta program?', a: 'Anyone passionate about technology and innovation can apply. We welcome users from all backgrounds.' },
  { q: 'Is there a cost to join?', a: 'No, joining our beta program is completely free.' },
  { q: 'How will I know if I am selected?', a: 'You will receive an email with instructions if you are selected for a beta opportunity.' },
  { q: 'What do I need to do as a beta tester?', a: 'Test new features, provide feedback, and help us improve our products.' },
  { q: 'Are there rewards for participating?', a: 'Yes! Active testers can earn badges, perks, and exclusive access to future programs.' },
];

const stats = [
  { label: 'Testers', value: 320 },
  { label: 'Features Tested', value: 18 },
  { label: 'Community Impact', value: '98%' },
];

const BetaProgramsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', interest: '', motivation: '' });
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
      setForm({ name: '', email: '', interest: '', motivation: '' });
    }, 1800);
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-purple-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
        <div className="container-custom flex flex-col items-center text-center gap-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-purple-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
            Join Our Beta Programs
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-6 font-light">
            Get early access, shape the future, and earn exclusive rewards as a Tekvoro beta tester.
          </p>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-purple-600 text-white font-bold shadow-lg hover:bg-white hover:text-purple-600 transition text-lg mt-2"
            whileTap={{ scale: 0.97 }}
            onClick={() => setModalOpen(true)}
          >
            <UserPlus className="w-6 h-6" /> Join Beta
          </motion.button>
          <div className="flex gap-8 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-1">{s.value}</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Beta Works */}
      <section className="py-16 bg-neutral-950">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white text-center">How Beta Works</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 max-w-xs hover:shadow-lg hover:scale-105 transition-all"
              >
                {step.icon}
                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white text-center">Beta Tester Benefits</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {benefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 max-w-xs hover:shadow-lg hover:scale-105 transition-all"
              >
                {b.icon}
                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{b.title}</h3>
                <p className="text-gray-300 text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Beta Opportunities */}
      <section className="py-16 bg-neutral-950">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white text-center">Live Beta Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {betaOpportunities.map((beta, idx) => (
              <motion.div
                key={beta.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-6 flex flex-col border border-white/10 hover:shadow-lg hover:scale-[1.03] transition-all"
              >
                <img src={beta.image} alt={beta.name} className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10 shadow" loading="lazy" />
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${beta.status === 'Open' ? 'bg-green-500 text-white' : beta.status === 'Upcoming' ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}`}>{beta.status}</span>
                  <span className="text-xs text-gray-400">{beta.testers} testers</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 tracking-wide">{beta.name}</h3>
                <p className="text-gray-300 mb-3 text-sm">{beta.desc}</p>
                <motion.button
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-bold shadow transition text-xs mt-auto ${beta.status === 'Open' ? 'bg-purple-600 text-white hover:bg-white hover:text-purple-600' : 'bg-neutral-700 text-gray-400 cursor-not-allowed'}`}
                  whileTap={{ scale: 0.97 }}
                  disabled={beta.status !== 'Open'}
                  onClick={() => setModalOpen(true)}
                >
                  <UserPlus className="w-4 h-4" /> Apply
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white text-center">What Our Beta Testers Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 max-w-xs hover:shadow-lg hover:scale-105 transition-all"
              >
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-purple-600 shadow" />
                <p className="text-gray-200 italic mb-4">“{t.quote}”</p>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-950">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white text-center">Beta Program FAQ</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-xl border border-white/10">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  aria-expanded={faqOpen === idx}
                >
                  <span>{faq.q}</span>
                  {faqOpen === idx ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-6 pb-4 text-gray-300 text-base"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Beta Modal */}
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
              className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-purple-400 focus:outline-none"
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
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">Join Beta Program</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="bg-neutral-800 border border-purple-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={form.name}
                    onChange={handleFormChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="bg-neutral-800 border border-purple-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={form.email}
                    onChange={handleFormChange}
                  />
                  <input
                    type="text"
                    name="interest"
                    placeholder="Area of Interest (e.g. AI, Cloud)"
                    className="bg-neutral-800 border border-purple-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={form.interest}
                    onChange={handleFormChange}
                  />
                  <textarea
                    name="motivation"
                    placeholder="Why do you want to join?*"
                    required
                    minLength={5}
                    className="bg-neutral-800 border border-purple-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px]"
                    value={form.motivation}
                    onChange={handleFormChange}
                  />
                  <div className="flex gap-4 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-neutral-700 hover:bg-neutral-800 text-gray-300 font-bold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  <div className="text-gray-200">Your application has been received.</div>
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

export default BetaProgramsPage; 