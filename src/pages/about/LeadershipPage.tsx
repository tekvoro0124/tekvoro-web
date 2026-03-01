import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const leaders = [
  {
    name: 'Sarah Johnson',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    bio: 'Visionary leader with 15+ years of experience in technology and business transformation.',
    linkedin: '#',
    email: 'sarah@tekvoro.com'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Technology expert specializing in AI, cloud computing, and digital innovation.',
    linkedin: '#',
    email: 'michael@tekvoro.com'
  }
];

const LeadershipPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Leadership | Tekvoro Technologies"
        description="Meet our leadership team of experienced professionals driving innovation and growth. Learn about our executives and their vision for the future of technology."
        keywords="leadership, executives, management team, company leadership, executive profiles, leadership bios, management"
        ogImage="/images/leadership-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Leadership",
          "description": "Meet our leadership team of experienced professionals driving innovation",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32 px-4">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Leadership
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Meet the visionary leaders driving innovation and success at Tekvoro.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leaders.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-yellow-400/30"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                      <p className="text-yellow-400 font-semibold mb-3">{leader.role}</p>
                      <p className="text-gray-300 mb-4 leading-relaxed">{leader.bio}</p>
                      <div className="flex gap-3">
                        <a href={leader.linkedin} className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300">
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a href={`mailto:${leader.email}`} className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300">
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LeadershipPage;
