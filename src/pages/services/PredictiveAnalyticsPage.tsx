import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { BarChart2, Activity, TrendingUp, Brain, Zap } from 'lucide-react';

const features = [
  {
    icon: <BarChart2 className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Data-Driven Forecasts',
    description: 'Leverage advanced analytics to predict trends, demand, and outcomes with high accuracy.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Activity className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Real-Time Insights',
    description: 'Monitor key metrics and get actionable insights in real time to drive smarter decisions.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-red-500 mb-4" />,
    title: 'Business Impact',
    description: 'Turn predictive analytics into business value—improve efficiency, reduce risk, and boost growth.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Brain className="w-8 h-8 text-red-500 mb-4" />,
    title: 'AI-Powered Models',
    description: 'Deploy machine learning models that learn and adapt to your unique business needs.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
];

const PredictiveAnalyticsPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO 
        title="Predictive Analytics Solutions | Tekvoro Technologies"
        description="Leverage data-driven insights to predict trends, optimize operations, and make informed decisions. Our predictive analytics solutions transform raw data into actionable intelligence."
        keywords="predictive analytics, data analytics, business intelligence, machine learning, data science, forecasting, trend analysis, predictive modeling"
        ogImage="/images/predictive-analytics-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Predictive Analytics Solutions",
          "description": "Leverage data-driven insights to predict trends and optimize operations",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "serviceType": "Predictive Analytics"
        }}
      />
      <Navbar />
      {/* Side-by-side Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden py-20">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
              Predictive Analytics
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-xl mb-8 font-light">
              Anticipate what's next. Use AI-powered predictive analytics to unlock new opportunities, mitigate risks, and drive business growth.
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
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=900&q=80"
              alt="Predictive Analytics Banner"
              className="rounded-2xl shadow-2xl w-full h-80 object-cover border-4 border-white/10"
            />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-900/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 7 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Card Grid */}
      <section id="features" className="py-24 bg-neutral-950">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Predict. Act. Win.
            </h2>
            <p className="text-lg text-gray-400">
              See how predictive analytics can transform your business outcomes.
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

      {/* Timeline Section */}
      <section className="py-20 bg-black/90">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Predictive Analytics Journey
            </h2>
            <p className="text-lg text-gray-400">
              From data collection to actionable insights—see the steps to predictive success.
            </p>
          </div>
          <div className="relative border-l-4 border-red-600 pl-10">
            {[
              {
                step: 'Data Collection',
                desc: 'Gather and unify data from all relevant sources.',
                icon: <Zap className="w-6 h-6 text-red-500" />,
              },
              {
                step: 'Model Building',
                desc: 'Develop and train machine learning models tailored to your needs.',
                icon: <Brain className="w-6 h-6 text-red-500" />,
              },
              {
                step: 'Deployment',
                desc: 'Integrate predictive models into your business processes.',
                icon: <Activity className="w-6 h-6 text-red-500" />,
              },
              {
                step: 'Continuous Improvement',
                desc: 'Monitor, retrain, and optimize models for ongoing accuracy.',
                icon: <TrendingUp className="w-6 h-6 text-red-500" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 flex items-start gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-black border-4 border-red-600 rounded-full p-3 mb-2">
                    {item.icon}
                  </div>
                  {idx < 3 && <div className="h-16 w-1 bg-red-600 rounded-full" />}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{item.step}</h4>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
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
            Ready to Predict the Future?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your predictive analytics journey today. Book a consultation or talk to our AI experts.
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

export default PredictiveAnalyticsPage; 