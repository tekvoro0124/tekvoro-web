import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Phone, Mail, Send, HelpCircle, MessageCircle, FileText, Users } from 'lucide-react';

export default function SupportPage() {
  return (
    <>
      <SEO
        title="Support & Help Center - Tekvoro Technologies"
        description="Get technical support and help for Tekvoro Technologies services. Contact our support team for assistance with AI solutions, cloud computing, and digital transformation services."
        keywords="technical support, help center, customer support, AI support, cloud support, IT support, customer service, troubleshooting"
        canonical="https://www.tekvoro.com/contact/support"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Support & Help Center",
          "description": "Technical support and customer service for Tekvoro Technologies",
          "url": "https://www.tekvoro.com/contact/support"
        }}
      />
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        
        <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
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
                  Support
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Center
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
              >
                We're here to help. Get the support you need for all your Tekvoro services.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="section px-4">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="p-4 rounded-2xl bg-yellow-400/20 text-yellow-400 mb-6">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Help Center</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Find answers to common questions and learn how to use our services effectively.
                  </p>
                  <a href="#" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">
                    Browse Articles
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="p-4 rounded-2xl bg-blue-400/20 text-blue-400 mb-6">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Live Chat</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Chat with our support team in real-time for immediate assistance.
                  </p>
                  <a href="#" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                    Start Chat
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="p-4 rounded-2xl bg-green-400/20 text-green-400 mb-6">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Phone Support</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Call us directly for personalized support and technical assistance.
                  </p>
                  <a href="tel:+919121331813" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
                    Call Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
