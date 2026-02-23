import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Building2, Wifi, Server, Activity, Globe2 } from 'lucide-react';

const features = [
  {
    icon: <Building2 className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Connected Buildings',
    description: 'Transform traditional buildings into smart, energy-efficient, and responsive environments.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Wifi className="w-8 h-8 text-red-500 mb-4" />,
    title: 'IoT Sensor Networks',
    description: 'Deploy scalable sensor networks for real-time monitoring, automation, and control.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Server className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Edge & Cloud Integration',
    description: 'Seamlessly connect edge devices to the cloud for unified data and intelligent operations.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Activity className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Predictive Maintenance',
    description: 'Use AI and IoT to anticipate issues, reduce downtime, and optimize asset performance.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
];

const stats = [
  { label: 'Sensors Deployed', value: '120K+' },
  { label: 'Energy Savings', value: '35%' },
  { label: 'Downtime Reduction', value: '50%' },
  { label: 'Cities Connected', value: '40+' },
];

const SmartInfrastructurePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Smart Infrastructure Solutions | Tekvoro Technologies"
        description="Build intelligent infrastructure that adapts and optimizes automatically. Our smart infrastructure solutions enhance efficiency, security, and sustainability."
        keywords="smart infrastructure, IoT infrastructure, intelligent buildings, smart cities, infrastructure automation, connected systems, IoT solutions"
        ogImage="/images/smart-infrastructure-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Smart Infrastructure Solutions",
          "description": "Build intelligent infrastructure that adapts and optimizes automatically",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "serviceType": "Smart Infrastructure Development"
        }}
      />
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
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
              Smart Infrastructure
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-2xl mb-10 font-light">
              Build the cities and spaces of tomorrow with IoT-powered, intelligent infrastructure solutions.
            </p>
            <motion.a
              href="#features"
              className="inline-block px-12 py-5 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-xl mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Discover Features
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=900&q=80"
              alt="Smart Infrastructure Banner"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover border-4 border-white/10"
            />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-900/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 7 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Alternating Feature Blocks */}
      <section id="features" className="py-24 bg-neutral-950">
        <div className="container-custom flex flex-col gap-16">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-12 bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-10 border border-white/10 hover:shadow-lg hover:scale-[1.02] transition-all`}
            >
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                {feature.icon}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {feature.description}
                </p>
              </div>
              <img
                src={feature.image}
                alt={feature.title}
                className="flex-1 w-full h-56 object-cover rounded-lg border border-white/10 shadow"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="py-20 bg-black/90">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Impact at Scale
            </h2>
            <p className="text-lg text-gray-400">
              See how smart infrastructure is making a difference worldwide.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 min-w-[180px] hover:shadow-lg hover:scale-105 transition-all"
              >
                <div className="text-4xl font-extrabold text-red-500 mb-2">{stat.value}</div>
                <div className="text-lg text-white font-semibold mb-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Build Smart Infrastructure?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your smart city journey with Tekvoro. Book a consultation or talk to our experts.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg">
            Book a Consultation
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

export default SmartInfrastructurePage; 