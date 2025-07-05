import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Twitter, Mail, Phone } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  longBio: string;
  image: string;
  linkedin: string;
  twitter: string;
  featured?: boolean;
  videoUrl?: string;
  funFacts?: string[];
  testimonials?: string[];
  contact?: { email?: string; phone?: string };
};

type TeamData = {
  [key: string]: TeamMember[];
};

const TEAM_DATA: TeamData = {
  Leadership: [
    {
      name: 'Dr. Priya Nair',
      role: 'Chief AI Officer – AI 2025 Featured',
      expertise: ['AI', 'Ethics', 'Innovation'],
      bio: 'Visionary in AI and ethics, leading Tekvoro\'s AI 2025 initiative. 20+ years in research, innovation, and global leadership.',
      longBio: 'Dr. Priya Nair is a global thought leader in artificial intelligence, ethics, and innovation. She has led groundbreaking research teams, published over 50 papers, and is a frequent keynote speaker at international AI conferences. As Chief AI Officer, she is driving Tekvoro\'s AI 2025 vision, focusing on responsible AI, diversity in tech, and next-gen intelligent systems.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      linkedin: '#',
      twitter: '#',
      featured: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      funFacts: [
        'Named Top 10 Women in AI 2024',
        'Published 50+ research papers',
        'Keynote at World AI Summit 2023',
      ],
      testimonials: [
        '"Priya is a true pioneer in responsible AI." – Forbes',
        '"Her leadership inspires our entire team." – Ananya Rao',
      ],
      contact: { email: 'priya@tekvoro.com', phone: '+1 555-1234' },
    },
    {
      name: 'Ananya Rao',
      role: 'CEO & Co-Founder',
      expertise: ['Strategy', 'Leadership', 'Business'],
      bio: 'Visionary leader with 15+ years in tech innovation and business strategy.',
      longBio: 'Ananya Rao has steered Tekvoro from a startup to a global tech leader. She is passionate about empowering teams, building inclusive cultures, and driving digital transformation for clients worldwide.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['Forbes 30 Under 30', 'Founded 2 startups', 'Loves hiking'],
      testimonials: ['"Ananya is a force of nature in tech." – TechCrunch'],
      contact: { email: 'ananya@tekvoro.com' },
    },
    {
      name: 'David Kim',
      role: 'CTO',
      expertise: ['AI', 'Cloud', 'Engineering'],
      bio: 'Expert in AI, cloud, and scalable systems. Driving Tekvoro\'s tech vision.',
      longBio: 'David Kim is a technology visionary with deep expertise in AI, cloud, and scalable architectures. He leads Tekvoro\'s engineering teams, focusing on innovation, security, and performance.',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['Open source contributor', 'Chess master', 'Cloud evangelist'],
      testimonials: ['"David is the architect behind our most scalable systems." – Priya Nair'],
      contact: { email: 'david@tekvoro.com' },
    },
    {
      name: 'Alex Chen',
      role: 'Head of Security',
      expertise: ['Security', 'Compliance', 'Risk'],
      bio: 'Cybersecurity architect with a passion for safe, resilient systems.',
      longBio: 'Alex Chen has 12+ years of experience in cybersecurity, risk management, and compliance. He is dedicated to building secure, resilient systems and fostering a culture of security at Tekvoro.',
      image: 'https://randomuser.me/api/portraits/men/34.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['Black belt in Judo', 'CISSP certified', 'Speaks 4 languages'],
      testimonials: ['"Alex keeps us safe and ahead of threats." – Board Review'],
      contact: { email: 'alex@tekvoro.com' },
    },
  ],
  Advisors: [
    {
      name: 'Prof. Linda Zhang',
      role: 'AI Ethics Advisor',
      expertise: ['AI Ethics', 'Policy'],
      bio: 'Professor at MIT, global expert in AI ethics and policy.',
      longBio: 'Prof. Zhang has advised governments and Fortune 500s on AI policy and ethics. She is a published author and frequent speaker at global forums.',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['TEDx Speaker', 'UN AI Ethics Panelist'],
      testimonials: ['"Linda is a guiding light in AI ethics." – UN Panel'],
      contact: { email: 'linda@mit.edu' },
    },
    {
      name: 'Rajiv Menon',
      role: 'Cloud Strategy Advisor',
      expertise: ['Cloud', 'Strategy'],
      bio: 'Cloud transformation leader, ex-Google Cloud.',
      longBio: 'Rajiv has led cloud strategy for top tech firms and is passionate about scalable, sustainable infrastructure.',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['Marathon runner', 'Writes tech columns'],
      testimonials: ['"Rajiv brings vision and clarity to every project." – Google Cloud'],
      contact: { email: 'rajiv@cloud.com' },
    },
  ],
  Board: [
    {
      name: 'Samantha Lee',
      role: 'Board Chair',
      expertise: ['Governance', 'Finance'],
      bio: 'Board leader with 20+ years in tech governance and finance.',
      longBio: 'Samantha has served on the boards of several Fortune 500 companies and is a champion for diversity in tech leadership.',
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['Harvard MBA', 'Angel investor'],
      testimonials: ['"Samantha\'s leadership is second to none." – Board Member'],
      contact: { email: 'samantha@tekvoro.com' },
    },
  ],
  Alumni: [
    {
      name: 'Carlos Rivera',
      role: 'Former Head of Product',
      expertise: ['Product', 'UX'],
      bio: 'Led Tekvoro\'s product team from 2018-2022.',
      longBio: 'Carlos now leads product at a top Silicon Valley startup and remains an advisor to Tekvoro.',
      image: 'https://randomuser.me/api/portraits/men/60.jpg',
      linkedin: '#',
      twitter: '#',
      funFacts: ['Invented 3 patents', 'Triathlete'],
      testimonials: ['"Carlos set the bar for product innovation." – Ananya Rao'],
      contact: { email: 'carlos@alumni.com' },
    },
  ],
};

const TABS = Object.keys(TEAM_DATA);

const leaders = [
  {
    name: 'Michael Rodriguez',
    title: 'Chief Executive Officer',
    bio: 'Visionary leader with 20+ years in tech, driving innovation and growth at Tekvoro.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    linkedin: '#',
    twitter: '#',
    email: 'michael@tekvoro.com',
  },
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Technology Officer',
    bio: "Expert in AI and cloud, leading the company's technology strategy and R&D.",
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    linkedin: '#',
    twitter: '#',
    email: 'sarah@tekvoro.com',
  },
  {
    name: 'Lisa Park',
    title: 'Chief Innovation Officer',
    bio: 'Champion of sustainable innovation and digital transformation.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    linkedin: '#',
    twitter: '#',
    email: 'lisa@tekvoro.com',
  },
  {
    name: 'Dr. Emily Watson',
    title: 'Chief Ethics Officer',
    bio: 'Advocate for responsible AI and digital ethics in technology.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    linkedin: '#',
    twitter: '#',
    email: 'emily@tekvoro.com',
  },
  {
    name: 'James Thompson',
    title: 'Chief People Officer',
    bio: 'Building a culture of excellence and growth for all employees.',
    image: 'https://randomuser.me/api/portraits/men/43.jpg',
    linkedin: '#',
    twitter: '#',
    email: 'james@tekvoro.com',
  },
  {
    name: 'Dr. David Kim',
    title: 'Chief Research Officer',
    bio: 'Pushing the boundaries of research in quantum computing and emerging tech.',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    linkedin: '#',
    twitter: '#',
    email: 'david@tekvoro.com',
  },
];

const LeadershipTeamPage = () => {
  const [tab, setTab] = useState<string>(TABS[0]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMember, setModalMember] = useState<TeamMember | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Collect all expertise for filter chips
  const allExpertise = Array.from(new Set(Object.values(TEAM_DATA).flat().flatMap((m: TeamMember) => m.expertise)));

  // Filtered members for current tab
  let members = TEAM_DATA[tab];
  if (search) {
    members = members.filter((m: TeamMember) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      (m.expertise && m.expertise.some((e: string) => e.toLowerCase().includes(search.toLowerCase())))
    );
  }
  if (filter !== 'All') {
    members = members.filter((m: TeamMember) => m.expertise && m.expertise.includes(filter));
  }

  function openModal(member: TeamMember) {
    setModalMember(member);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setModalMember(null);
  }
  function handleModalKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') closeModal();
    if (modalRef.current) {
      const focusable = (modalRef.current.querySelectorAll(
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
        title="Leadership Team | Tekvoro Technologies"
        description="Meet our leadership team of experienced professionals driving innovation and growth at Tekvoro Technologies. Learn about our executives and their vision for the future."
        keywords="leadership team, executives, management team, company leadership, executive profiles, leadership bios, management"
        ogImage="/images/leadership-team-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Leadership Team",
          "description": "Meet our leadership team of experienced professionals driving innovation",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-indigo-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Leadership Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Meet the visionaries and experts leading Tekvoro into the future.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {leaders.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 shadow-xl border border-white/10 backdrop-blur-xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-indigo-400 shadow-lg"
                />
                <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                <p className="text-indigo-400 font-semibold mb-2">{leader.title}</p>
                <p className="text-gray-300 mb-4 text-sm">{leader.bio}</p>
                <div className="flex gap-4 justify-center mt-2">
                  <a href={leader.linkedin} aria-label="LinkedIn" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href={leader.twitter} aria-label="Twitter" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                  <a href={`mailto:${leader.email}`} aria-label="Email" className="hover:text-pink-400 transition-colors"><Mail className="w-5 h-5" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Tabs, Search, Filter, and Grid */}
      <section className="py-8 bg-black">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center mb-8 gap-4">
            {TABS.map((t) => (
              <motion.button
                key={t}
                onClick={() => { setTab(t); setSearch(''); setFilter('All'); }}
                className={`px-6 py-2 rounded-full font-semibold text-lg transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${tab === t ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg' : 'bg-black text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {t}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by name, role, or expertise..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg bg-neutral-800 border border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 min-w-[220px]"
            />
            <motion.button
              key="All"
              onClick={() => setFilter('All')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${filter === 'All' ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg' : 'bg-black text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
              whileTap={{ scale: 0.97 }}
              layout
            >
              All
            </motion.button>
            {allExpertise.map((exp) => (
              <motion.button
                key={exp}
                onClick={() => setFilter(exp)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${filter === exp ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg' : 'bg-black text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {exp}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab + search + filter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl mx-auto"
            >
              {members.filter(m => !m.featured).length === 0 && (
                <div className="col-span-full text-center text-gray-400 text-lg py-20">No team members found.</div>
              )}
              {members.filter(m => !m.featured).map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ rotateY: 8, scale: 1.04 }}
                  className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => openModal(member)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Learn more about ${member.name}`}
                >
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mb-4 border-2 border-yellow-400 shadow" />
                  <h3 className="text-lg font-bold text-white mb-1 tracking-wide">{member.name}</h3>
                  <div className="text-yellow-400 font-semibold mb-2">{member.role}</div>
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {member.expertise && member.expertise.map((exp, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-yellow-400 text-xs font-semibold">{exp}</span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
                  <div className="flex gap-3 justify-center">
                    <a href={member.linkedin} className="text-yellow-400 hover:text-white" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></a>
                    <a href={member.twitter} className="text-yellow-400 hover:text-white" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5" /></a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* Modal for member details */}
      <AnimatePresence>
        {modalOpen && modalMember && (
          <motion.div
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
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
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <img src={modalMember.image} alt={modalMember.name} className="w-24 h-24 rounded-full mb-4 border-2 border-yellow-400 shadow" />
                <h3 className="text-2xl font-bold text-yellow-400 mb-1 tracking-wide">{modalMember.name}</h3>
                <div className="font-semibold mb-2">{modalMember.role}</div>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {modalMember.expertise && modalMember.expertise.map((exp, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-yellow-400 text-xs font-semibold">{exp}</span>
                  ))}
                </div>
                <p className="text-gray-300 text-base mb-4 text-center">{modalMember.longBio || modalMember.bio}</p>
                {modalMember.videoUrl && (
                  <div className="w-full mb-4">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={modalMember.videoUrl}
                        title={`Video intro for ${modalMember.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-56 rounded-xl border-2 border-yellow-400 shadow"
                      />
                    </div>
                  </div>
                )}
                {modalMember.funFacts && modalMember.funFacts.length > 0 && (
                  <div className="w-full mb-2">
                    <h4 className="text-yellow-400 font-bold mb-2">Fun Facts & Achievements</h4>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                      {modalMember.funFacts.map((fact, i) => (
                        <li key={i}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalMember.testimonials && modalMember.testimonials.length > 0 && (
                  <div className="w-full mb-2">
                    <h4 className="text-yellow-400 font-bold mb-2">Testimonials & Endorsements</h4>
                    <ul className="list-disc list-inside text-gray-200 text-sm">
                      {modalMember.testimonials.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex gap-4 mt-2">
                  <a href={modalMember.linkedin} className="text-yellow-400 hover:text-white" target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6" /></a>
                  <a href={modalMember.twitter} className="text-yellow-400 hover:text-white" target="_blank" rel="noopener noreferrer"><Twitter className="w-6 h-6" /></a>
                  {modalMember.contact && modalMember.contact.email && (
                    <a href={`mailto:${modalMember.contact.email}`} className="text-yellow-400 hover:text-white" title="Email"><Mail className="w-6 h-6" /></a>
                  )}
                  {modalMember.contact && modalMember.contact.phone && (
                    <a href={`tel:${modalMember.contact.phone}`} className="text-yellow-400 hover:text-white" title="Call"><Phone className="w-6 h-6" /></a>
                  )}
                </div>
                <button
                  className="mt-6 px-6 py-2 rounded-lg bg-yellow-400 text-black font-bold shadow hover:bg-white hover:text-black transition text-base"
                  onClick={() => alert('Booking a call coming soon!')}
                >
                  Book a Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default LeadershipTeamPage; 