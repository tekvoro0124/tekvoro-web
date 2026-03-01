import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, Users, Award, ArrowRight, Search } from 'lucide-react';

const hackathons = [
  {
    id: 1,
    title: 'AI Innovation Hackathon 2025',
    description: 'Compete to build the next generation of AI-powered solutions. Open to students, professionals, and startups.',
    date: '2025-02-15',
    time: '09:00 AM - 09:00 PM',
    participants: 120,
    registration: true,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Hackathon', 'Innovation'],
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Cloud Automation Challenge',
    description: 'Showcase your skills in cloud automation and win exciting prizes. Open to all cloud enthusiasts.',
    date: '2024-12-30',
    time: '10:00 AM - 06:00 PM',
    participants: 80,
    registration: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Cloud', 'Automation', 'Challenge'],
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Past: IoT Smart Devices Hackathon',
    description: 'Teams built innovative IoT solutions for smart homes and cities. See the winners and project highlights.',
    date: '2024-10-10',
    time: '09:00 AM - 08:00 PM',
    participants: 60,
    registration: false,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    tags: ['IoT', 'Hackathon', 'Smart Devices'],
    status: 'past',
    winners: ['Team InnovateX', 'SmartHome Pros', 'CityTech Crew'],
  },
];

const HackathonsChallengesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(true);

  const filteredHackathons = hackathons.filter(hackathon =>
    hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hackathon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const upcomingHackathons = filteredHackathons.filter(h => h.status === 'upcoming');
  const pastHackathons = filteredHackathons.filter(h => h.status === 'past');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Hackathons & Challenges | Tekvoro Technologies"
        description="Participate in our hackathons, coding challenges, and innovation competitions. Showcase your skills, collaborate with peers, and win exciting prizes while solving real-world problems."
        keywords="hackathons, coding challenges, innovation competitions, programming contests, tech challenges, developer competitions, innovation events"
        ogImage="/images/hackathons-challenges-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Hackathons & Challenges",
          "description": "Participate in hackathons, coding challenges, and innovation competitions",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-pink-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Hackathons & Challenges
          </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Compete, innovate, and win in our hackathons and tech challenges.
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
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-pink-400 ${showUpcoming ? 'bg-pink-400 text-black border-pink-400 shadow-lg' : 'bg-black/50 text-pink-400 border-neutral-800 hover:bg-neutral-900 hover:border-pink-400'}`}
                onClick={() => setShowUpcoming(true)}
              >
                Upcoming
              </button>
              <button
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${!showUpcoming ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg' : 'bg-black/50 text-yellow-400 border-neutral-800 hover:bg-neutral-900 hover:border-yellow-400'}`}
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
            {showUpcoming ? 'Upcoming Hackathons' : 'Past Hackathons'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showUpcoming ? upcomingHackathons : pastHackathons).map((hackathon, idx) => (
              <motion.article
                key={hackathon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-pink-400 text-black text-sm font-semibold rounded-full">
                      Hackathon
                    </span>
                  </div>
                  {hackathon.status === 'past' && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-yellow-400/80 text-black text-sm font-semibold rounded-full">
                        Past
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(hackathon.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {hackathon.time}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors">
                  {hackathon.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {hackathon.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {hackathon.participants}
                  </div>
                  {hackathon.status === 'past' && hackathon.winners && (
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400">Winners</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {hackathon.registration && (
                  <motion.button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                )}
                {hackathon.status === 'past' && hackathon.winners && (
                  <div className="mt-4">
                    <span className="block text-xs text-gray-400 mb-1">Top Winners:</span>
                    <ul className="list-disc list-inside text-sm text-yellow-300">
                      {hackathon.winners.map((winner) => (
                        <li key={winner}>{winner}</li>
                      ))}
                    </ul>
                </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HackathonsChallengesPage; 