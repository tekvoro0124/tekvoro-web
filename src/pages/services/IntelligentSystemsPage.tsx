import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Cpu, Bot, ShieldCheck, CloudLightning, Settings2 } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Autonomous Decision-Making',
    description: 'Empower your business with systems that sense, analyze, and act independently in real time.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Bot className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Conversational AI',
    description: 'Deploy intelligent chatbots and virtual assistants that understand and interact naturally.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Secure & Trusted',
    description: 'Build robust, secure systems with explainable AI and compliance at the core.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <CloudLightning className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Edge & Cloud Intelligence',
    description: 'Run AI at the edge or in the cloud for scalable, real-time intelligence everywhere.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
];

const tabs = [
  {
    label: 'Overview',
    content: (
      <div className="text-lg text-gray-200 max-w-xl mx-auto">
        <p>
          Intelligent Systems combine AI, automation, and real-time data to create solutions that think, learn, and act. From autonomous vehicles to smart factories, these systems are transforming industries and unlocking new possibilities.
        </p>
      </div>
    ),
  },
  {
    label: 'Applications',
    content: (
      <ul className="text-gray-200 space-y-3 max-w-xl mx-auto">
        <li>• Smart Manufacturing & Industry 4.0</li>
        <li>• Autonomous Vehicles & Robotics</li>
        <li>• Conversational AI & Virtual Agents</li>
        <li>• Predictive Maintenance & IoT</li>
        <li>• Healthcare Diagnostics & Automation</li>
      </ul>
    ),
  },
  {
    label: 'Benefits',
    content: (
      <ul className="text-gray-200 space-y-3 max-w-xl mx-auto">
        <li>• Increased efficiency and reduced costs</li>
        <li>• Enhanced decision-making and accuracy</li>
        <li>• 24/7 operation and scalability</li>
        <li>• Improved customer experiences</li>
        <li>• Greater safety and compliance</li>
      </ul>
    ),
  },
];

const IntelligentSystemsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Intelligent Systems Solutions | Tekvoro Technologies"
        description="Build intelligent systems that learn, adapt, and optimize. Our AI-powered solutions automate processes, enhance decision-making, and drive operational excellence."
        keywords="intelligent systems, AI automation, machine learning, smart systems, process automation, decision intelligence, operational excellence"
        ogImage="/images/intelligent-systems-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Intelligent Systems Solutions",
          "description": "Build intelligent systems that learn, adapt, and optimize with AI-powered automation",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "serviceType": "Intelligent Systems Development"
        }}
      />
      <Navbar />
      {/* Split Hero Section with Animation */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden py-20">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
              Intelligent Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-xl mb-8 font-light">
              Build the future with AI-powered systems that sense, learn, and act—autonomously and securely.
            </p>
            <motion.a
              href="#features"
              className="inline-block px-10 py-4 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg mt-4"
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
            className="relative flex justify-center"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
              alt="Intelligent Systems Banner"
              className="rounded-2xl shadow-2xl w-full h-80 object-cover border-4 border-white/10"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-900/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 7 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 bg-neutral-950">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              What Makes a System Intelligent?
            </h2>
            <p className="text-lg text-gray-400">
              Explore the core concepts, applications, and benefits of intelligent systems.
            </p>
          </div>
          <div className="flex justify-center mb-8 gap-4">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-2 rounded-full font-semibold text-lg transition-all border-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${activeTab === idx ? 'bg-red-600 text-white border-red-600' : 'bg-neutral-900 text-gray-300 border-gray-700 hover:bg-red-900/30 hover:text-white'}`}
                aria-selected={activeTab === idx}
                aria-controls={`tabpanel-${idx}`}
                id={`tab-${idx}`}
                tabIndex={0}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                id={`tabpanel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl"
              >
                {tabs[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature Carousel Section */}
      <section id="features" className="py-24 bg-black/90">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Intelligent System Features
            </h2>
            <p className="text-lg text-gray-400">
              Discover the building blocks of next-gen intelligent systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
            Ready to Build Intelligent Systems?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your journey with Tekvoro. Book a consultation or talk to our AI experts.
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

export default IntelligentSystemsPage; 