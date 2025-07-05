import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Sparkles, Layers, UserCheck, Globe2, Rocket, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Strategic Roadmapping',
    description: 'Develop clear, actionable roadmaps to guide your digital transformation and innovation journey.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Innovation Workshops',
    description: 'Empower your teams with creative workshops and design thinking sessions to spark breakthrough ideas.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Emerging Tech Scouting',
    description: 'Identify and adopt the latest technologies—AI, IoT, cloud, and more—to stay ahead of the curve.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Culture of Innovation',
    description: 'Foster a culture that rewards experimentation, collaboration, and continuous improvement.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
];

const futures = [
  {
    title: 'Open Innovation',
    desc: 'Collaborate with partners, startups, and academia to accelerate new ideas.',
    icon: '🤝',
  },
  {
    title: 'AI-Driven Creativity',
    desc: 'Leverage artificial intelligence to augment human creativity and ideation.',
    icon: '🧠',
  },
  {
    title: 'Agile Experimentation',
    desc: 'Rapidly test, validate, and scale new concepts with agile methodologies.',
    icon: '⚡',
  },
  {
    title: 'Sustainable Innovation',
    desc: 'Drive growth while prioritizing environmental and social responsibility.',
    icon: '🌱',
  },
];

const InnovationStrategyPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO 
        title="Innovation Strategy Services | Tekvoro Technologies"
        description="Transform your business with cutting-edge innovation strategies. We help organizations drive growth, competitive advantage, and digital transformation through strategic innovation consulting."
        keywords="innovation strategy, digital transformation, business innovation, strategic consulting, technology innovation, competitive advantage, growth strategy"
        ogImage="/images/innovation-strategy-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Innovation Strategy Services",
          "description": "Transform your business with cutting-edge innovation strategies that drive growth and competitive advantage",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "serviceType": "Innovation Strategy Consulting"
        }}
      />
      <Navbar />
      {/* Futuristic Hero Banner */}
      <section className="relative flex flex-col justify-center items-center min-h-[60vh] bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center pt-24 pb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
            Innovation Strategy
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-light">
            Ignite your organization's potential with a bold, future-ready innovation strategy. Transform ideas into impact and lead your industry forward.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#features" className="px-8 py-3 rounded-lg bg-white text-black font-bold shadow-lg hover:bg-red-500 hover:text-white transition text-lg">
              Explore Features
            </a>
            <a href="#futures" className="px-8 py-3 rounded-lg border border-white text-white font-bold hover:bg-white hover:text-black transition text-lg">
              See the Future
            </a>
          </motion.div>
        </motion.div>
        {/* Animated futuristic background shapes */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-red-900/40 via-black/0 to-black/0 rounded-full blur-3xl opacity-60 animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-white/10 via-gray-700/20 to-black/0 rounded-full blur-2xl opacity-40 animate-pulse"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 7 }}
        />
        <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" alt="Innovation Banner" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-neutral-950 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Why Innovation Strategy?
            </h2>
            <p className="text-lg text-gray-400">
              Unlock new value, outpace competitors, and future-proof your business with a strategic approach to innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-neutral-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/10 hover:shadow-red-900/40 transition group"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-xl mb-6 border border-white/20 shadow group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Futures Section - Animated */}
      <section id="futures" className="py-20 bg-gradient-to-b from-black via-neutral-900 to-gray-950">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              The Future of Innovation
            </h2>
            <p className="text-lg text-gray-400">
              See how tomorrow's leaders will innovate—through open collaboration, AI, and sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {futures.map((future, idx) => (
              <motion.div
                key={future.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 hover:shadow-lg hover:scale-105 transition-all"
              >
                <div className="text-5xl mb-4 animate-bounce-slow">{future.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                  {future.title}
                </h3>
                <p className="text-gray-300">
                  {future.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section - Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Innovate?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Let's co-create the future. Book a strategy session or talk to our innovation experts today.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg">
            Book a Strategy Session
          </a>
        </motion.div>
        {/* Animated background shapes */}
        <motion.div
          className="absolute left-0 top-0 w-40 h-40 bg-gradient-to-br from-red-900/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-40 animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-tr from-white/10 via-gray-700/20 to-black/0 rounded-full blur-2xl opacity-30 animate-pulse"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 9 }}
        />
      </section>

      <Footer />
    </div>
  );
};

export default InnovationStrategyPage; 