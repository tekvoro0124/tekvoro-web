import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Sparkles, Layers, UserCheck, Globe2, Rocket, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Workflow Automation',
    description: 'Streamline repetitive tasks and processes with intelligent automation tools, reducing manual effort and errors.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'AI-Driven Insights',
    description: 'Leverage artificial intelligence to analyze data, predict trends, and make smarter business decisions.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Integration Services',
    description: 'Connect your enterprise systems for seamless data flow and unified operations across platforms.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Robotic Process Automation',
    description: 'Deploy bots to handle high-volume, rule-based tasks, freeing up your team for higher-value work.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
];

const futures = [
  {
    title: 'Hyperautomation',
    desc: 'Combine AI, RPA, and advanced analytics for end-to-end process automation.',
    icon: '🤖',
  },
  {
    title: 'Smart Workflows',
    desc: 'Orchestrate complex business processes with intelligent, adaptive workflows.',
    icon: '🔗',
  },
  {
    title: 'Predictive Operations',
    desc: 'Use real-time data and AI to anticipate and resolve issues before they impact business.',
    icon: '📈',
  },
  {
    title: 'Seamless Integrations',
    desc: 'Connect all your enterprise tools and platforms for unified, automated operations.',
    icon: '🌐',
  },
];

const EnterpriseAutomationPage = () => {
  return (
    <>
      <SEO
        title="Enterprise Automation Solutions & Services"
        description="Transform your business operations with Tekvoro's enterprise automation solutions. Streamline workflows, reduce costs, and increase efficiency with intelligent automation technology."
        keywords="enterprise automation, business process automation, workflow automation, RPA, intelligent automation, process optimization, digital transformation, business efficiency"
        canonical="https://www.tekvoro.com/services/enterprise-automation"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Enterprise Automation Solutions",
          "description": "Intelligent automation solutions for enterprise business processes",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies"
          },
          "serviceType": "Enterprise Automation",
          "areaServed": "Worldwide"
        }}
      />
      <div className="bg-black min-h-screen flex flex-col">
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
              Enterprise Automation
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-light">
              Empower your business with next-gen automation. Optimize workflows, boost productivity, and drive innovation through intelligent enterprise automation.
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
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" alt="Automation Banner" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
        </section>

        {/* Features Section */}
        <section id="features" className="section bg-neutral-950 py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Why Enterprise Automation?
              </h2>
              <p className="text-lg text-gray-400">
                Transform your organization with automation that scales. From workflow automation to AI-driven insights, we help you unlock efficiency and innovation at every level.
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
                The Future of Automation
              </h2>
              <p className="text-lg text-gray-400">
                Discover how tomorrow's enterprise will run—powered by AI, hyperautomation, and seamless digital experiences.
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
              Ready to Automate Your Enterprise?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's build the future together. Book a demo or talk to our experts today.
            </p>
            <a href="/book-demo" className="inline-block px-10 py-4 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg">
              Book a Demo
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
    </>
  );
};

export default EnterpriseAutomationPage; 