import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Brain, HeartPulse, Activity, UserCheck, Cloud } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-green-500 mb-4" />,
    title: 'AI Diagnostics',
    description: 'Faster, more accurate diagnoses with AI-powered image and data analysis.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-blue-500 mb-4" />,
    title: 'Remote Patient Monitoring',
    description: 'Continuous, real-time health monitoring and alerts for proactive care.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Activity className="w-8 h-8 text-green-500 mb-4" />,
    title: 'Predictive Analytics',
    description: 'Anticipate health risks and outcomes with advanced AI models.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Cloud className="w-8 h-8 text-blue-500 mb-4" />,
    title: 'Secure Data Exchange',
    description: 'HIPAA-compliant, encrypted data sharing between providers and patients.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
];

const stats = [
  { label: 'AI Diagnoses', value: '1.5M+' },
  { label: 'Patients Monitored', value: '200K+' },
  { label: 'Alerts Sent', value: '500K+' },
  { label: 'Providers Connected', value: '2,000+' },
];

const HealthcareAiPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      {/* Immersive Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden py-24">
        <div className="container-custom flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-green-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Healthcare AI
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-2xl mb-10 font-light">
              Transform care with AI-driven diagnostics, monitoring, and predictive analytics—smarter, safer, and more connected.
            </p>
            <motion.a
              href="#features"
              className="inline-block px-12 py-5 rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-xl mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Explore Features
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
              alt="Healthcare AI Banner"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover border-4 border-white/10"
            />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 7 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-24 bg-neutral-950">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 hover:shadow-lg hover:scale-105 transition-all"
            >
              {feature.icon}
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-32 object-cover rounded-lg mb-4 border border-white/10 shadow"
                loading="lazy"
              />
              <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-20 bg-black/90">
        <div className="container-custom flex flex-wrap justify-center gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 min-w-[180px] hover:shadow-lg hover:scale-105 transition-all"
            >
              <div className="text-4xl font-extrabold text-green-500 mb-2">{stat.value}</div>
              <div className="text-lg text-white font-semibold mb-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-green-900 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready for AI-Driven Healthcare?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your healthcare AI journey with Tekvoro. Book a consultation or talk to our experts.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg">
            Book a Consultation
          </a>
        </motion.div>
        {/* Animated background shapes */}
        <motion.div
          className="absolute left-0 top-0 w-40 h-40 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-black/0 rounded-full blur-2xl opacity-40 animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-tr from-white/10 via-green-700/20 to-black/0 rounded-full blur-2xl opacity-30 animate-pulse"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 9 }}
        />
      </section>

      <Footer />
    </div>
  );
};

export default HealthcareAiPage; 