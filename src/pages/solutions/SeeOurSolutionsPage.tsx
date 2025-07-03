import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Cloud, Shield, Globe2, Sparkles, ArrowRight, Zap, Target, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const solutions = [
  {
    icon: <Cpu className="w-12 h-12 text-yellow-400" />,
    title: 'AI Solutions',
    desc: 'Custom AI, ML, and automation for the future.',
    link: '/services/ai-solutions',
    gradient: 'from-yellow-400/20 to-orange-500/20',
    border: 'border-yellow-400/30',
    stats: '120+ Projects',
    features: ['Custom AI Models', 'ML Pipelines', 'Automation']
  },
  {
    icon: <Cloud className="w-12 h-12 text-blue-400" />,
    title: 'Cloud Solutions',
    desc: 'Scalable, secure, and global cloud infrastructure.',
    link: '/services/cloud-solutions',
    gradient: 'from-blue-400/20 to-cyan-500/20',
    border: 'border-blue-400/30',
    stats: '80+ Migrations',
    features: ['Multi-Cloud', 'Serverless', 'Security']
  },
  {
    icon: <Shield className="w-12 h-12 text-red-400" />,
    title: 'Cybersecurity',
    desc: 'Next-gen, AI-powered security for your business.',
    link: '/services/cybersecurity-solutions',
    gradient: 'from-red-400/20 to-pink-500/20',
    border: 'border-red-400/30',
    stats: '500+ Protected',
    features: ['AI Security', 'Threat Detection', 'Compliance']
  },
  {
    icon: <Globe2 className="w-12 h-12 text-green-400" />,
    title: 'IoT & Smart Devices',
    desc: 'Connect, monitor, and optimize with IoT.',
    link: '/services/smart-infrastructure',
    gradient: 'from-green-400/20 to-emerald-500/20',
    border: 'border-green-400/30',
    stats: '1000+ Devices',
    features: ['Smart Cities', 'Industrial IoT', 'Analytics']
  },
];

const stats = [
  { label: 'AI Projects', value: '120+', icon: <Zap className="w-6 h-6" /> },
  { label: 'Cloud Migrations', value: '80+', icon: <Cloud className="w-6 h-6" /> },
  { label: 'Clients', value: '500+', icon: <Users className="w-6 h-6" /> },
  { label: 'Uptime', value: '99.99%', icon: <Target className="w-6 h-6" /> },
];

const endorsements = [
  { 
    name: 'Priya Nair', 
    quote: 'Tekvoro is leading the AI 2025 revolution with their innovative solutions.',
    role: 'CTO, TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  { 
    name: 'Ananya Rao', 
    quote: 'Their solutions are truly next-level. We\'ve seen 40% efficiency gains.',
    role: 'VP Engineering, DataFlow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
];

export default function SeeOurSolutionsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Immersive Hero with Parallax */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8 flex flex-wrap justify-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Featured AI 2025
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                Industry Leading
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                See Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Discover how Tekvoro is shaping the future with cutting-edge AI, cloud, IoT, and cybersecurity solutions—built for 2025 and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#solutions"
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Solutions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              
              <motion.a
                href="/book-demo"
                className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Demo
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Solutions Grid */}
      <section id="solutions" className="py-24 bg-gradient-to-b from-black to-neutral-950 relative px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital transformation solutions designed for the modern enterprise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol, idx) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${sol.gradient} backdrop-blur-xl border ${sol.border} hover:border-opacity-60 transition-all duration-500 overflow-hidden`}>
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                        {sol.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 font-medium">{sol.stats}</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                      {sol.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {sol.desc}
                    </p>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {sol.features.map((feature, featureIdx) => (
                          <span
                            key={feature}
                            className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.a
                      href={sol.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black relative px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Tekvoro</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Trusted by industry leaders worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 bg-gradient-to-b from-black to-neutral-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Leaders</span> Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {endorsements.map((e, idx) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={e.avatar}
                      alt={e.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400/30"
                    />
                    <div>
                      <div className="font-bold text-white text-lg">{e.name}</div>
                      <div className="text-yellow-400 text-sm">{e.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic text-lg leading-relaxed">
                    "{e.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Transform</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start your journey with Tekvoro. Book a demo or talk to our experts today.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/book-demo"
              className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Book a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced Animated Background */}
        <motion.div
          className="absolute left-0 top-0 w-60 h-60 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-full blur-3xl opacity-40"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-tr from-white/10 via-yellow-500/10 to-orange-500/10 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </section>

      <Footer />
    </div>
  );
} 