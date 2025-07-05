import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Users, Star, Award, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';

const stats = [
  { number: '5+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
  { number: '100+', label: 'Projects Delivered', icon: <Target className="w-6 h-6" /> },
  { number: '50+', label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
  { number: '99.9%', label: 'Success Rate', icon: <Star className="w-6 h-6" /> }
];

export default function AboutUsPage() {
  return (
    <>
      <SEO
        title="About Tekvoro Technologies - Leading AI & Digital Solutions"
        description="Learn about Tekvoro Technologies, a leading IT solutions company in Hyderabad. We deliver innovative AI, cloud computing, and digital transformation services with 5+ years of experience and 100+ successful projects."
        keywords="Tekvoro Technologies, about us, IT solutions Hyderabad, AI company, digital transformation, cloud computing, technology consulting, software development company"
        canonical="https://www.tekvoro.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tekvoro Technologies",
          "url": "https://www.tekvoro.com",
          "logo": "https://www.tekvoro.com/logo.png",
          "description": "Leading IT solutions company delivering innovative AI and digital transformation services",
          "foundingDate": "2019",
          "numberOfEmployees": "50+",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressCountry": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": "https://www.tekvoro.com/contact"
          },
          "sameAs": [
            "https://www.linkedin.com/company/tekvoro-technologies",
            "https://twitter.com/tekvoro"
          ]
        }}
      />
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8 flex flex-wrap justify-center gap-3"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  AI 2025 Company
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-6xl md:text-8xl font-black tracking-tight mb-8"
              >
                <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  About
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Tekvoro
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
              >
                Leading IT solutions in Hyderabad, delivering pure innovation for a digital future. We transform businesses through cutting-edge AI, cloud computing, and digital solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="/contact"
                  className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
                
                <motion.a
                  href="/careers"
                  className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Team
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-black to-neutral-950">
          <div className="container-custom">
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
                      {stat.number}
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

        {/* Mission Section */}
        <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Mission</span>
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  We believe that technology should be a catalyst for positive change, enabling organizations to achieve their full potential through intelligent, scalable, and sustainable solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="group px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      Get in Touch
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                  <a
                    href="/view-portfolio"
                    className="group px-6 py-3 rounded-xl border border-white/30 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                  >
                    View Our Work
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    To be the leading technology partner for businesses worldwide, known for delivering innovative AI-powered solutions that transform industries and create lasting value.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">Global technology leadership</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">Innovation-driven solutions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">Sustainable digital transformation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Partner</span> with Us?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Let's discuss how we can help transform your business with innovative technology solutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <MapPin className="w-6 h-6 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-gray-400 text-sm">Hyderabad, India</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <Phone className="w-6 h-6 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-gray-400 text-sm">+91 9121331813</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <Mail className="w-6 h-6 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-400 text-sm">tekvoro@gmail.com</div>
                  </div>
                </div>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="/contact"
                  className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
                <motion.a
                  href="/careers"
                  className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Team
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
