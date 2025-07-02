import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';

const hackathons = [
  {
    id: 1,
    title: 'AI Innovation Hackathon',
    date: '2024-09-10',
    location: 'Online',
    desc: 'Build innovative AI solutions and compete for top prizes.',
    prize: '₹1,00,000 + Internship',
    register: '#',
  },
  {
    id: 2,
    title: 'Cloud Automation Challenge',
    date: '2024-10-05',
    location: 'London, UK',
    desc: 'Automate cloud workflows and win exciting rewards.',
    prize: 'MacBook Air + Swag',
    register: '#',
  },
  {
    id: 3,
    title: 'IoT Smart City Hack',
    date: '2024-11-15',
    location: 'Singapore',
    desc: 'Create IoT solutions for smart cities and urban innovation.',
    prize: '₹50,000 + Incubation',
    register: '#',
  },
];

export default function HackathonsChallengesPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-pink-900 to-neutral-900 text-white overflow-hidden py-20 md:py-28">
        <div className="container-custom flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-pink-300 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Hackathons & Challenges
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10 font-light">
            Compete, innovate, and win in Tekvoro's global hackathons and challenges.
          </p>
          <div className="w-full max-w-3xl flex flex-col gap-8">
            {hackathons.map((h, idx) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 border border-white/10 hover:shadow-lg hover:scale-105 transition-all text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{h.title}</h2>
                    <div className="text-sm text-pink-400 font-semibold mb-1">{h.date} • {h.location}</div>
                    <div className="text-xs text-pink-300 mb-2">Prize: {h.prize}</div>
                  </div>
                  <a href={h.register} className="inline-block px-6 py-2 rounded-lg bg-pink-400 text-black font-bold shadow hover:bg-white hover:text-black transition text-base mt-2 md:mt-0">
                    Register
                  </a>
                </div>
                <p className="text-gray-300 text-base">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 