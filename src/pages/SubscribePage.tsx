import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  CheckCircle,
  Star,
  BarChart3,
  Brain,
  Send,
  Clock,
  Bell,
  BookOpen,
  Shield as ShieldIcon
} from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with our insights',
    features: [
      'Access to basic articles',
      'Weekly newsletter',
      'Community access',
      'Basic analytics'
    ],
    popular: false,
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For professionals who want deeper insights',
    features: [
      'All Free features',
      'Exclusive content',
      'Early access to reports',
      'Priority support',
      'Advanced analytics',
      'Custom insights dashboard'
    ],
    popular: true,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams and organizations',
    features: [
      'All Pro features',
      'Team collaboration tools',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'White-label solutions',
      'Advanced reporting'
    ],
    popular: false,
    color: 'from-purple-500 to-pink-500'
  }
];

const benefits = [
  {
    title: 'Exclusive AI Insights',
    description: 'Get early access to cutting-edge AI research and industry trends',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Weekly Deep Dives',
    description: 'Comprehensive analysis of the latest technology developments',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Expert Interviews',
    description: 'Direct insights from industry leaders and technology pioneers',
    icon: <Users className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Market Analysis',
    description: 'Data-driven insights on market trends and investment opportunities',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500'
  }
];

const stats = [
  { number: '50K+', label: 'Subscribers', icon: <Users className="w-6 h-6" /> },
  { number: '95%', label: 'Satisfaction Rate', icon: <Star className="w-6 h-6" /> },
  { number: '24/7', label: 'Content Updates', icon: <Clock className="w-6 h-6" /> },
  { number: '100%', label: 'Privacy Protected', icon: <ShieldIcon className="w-6 h-6" /> }
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const interestOptions = [
    'Artificial Intelligence',
    'Machine Learning',
    'Cloud Computing',
    'Cybersecurity',
    'IoT & Smart Cities',
    'Healthcare Technology',
    'FinTech',
    'Digital Transformation'
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';
      const subscribeUrl = import.meta.env.DEV
        ? 'http://localhost:5002/api/email/subscribe'
        : `${apiUrl}/api/email/subscribe`;
      
      const response = await fetch(subscribeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          company,
          interests,
          selectedPlan
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        // Reset form
        setEmail('');
        setName('');
        setCompany('');
        setInterests([]);
        setSelectedPlan('pro');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Subscription failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                AI 2025 Subscription
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 text-sm font-semibold">
                <Bell className="w-4 h-4" />
                Stay Updated
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Subscribe
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                to Insights
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Get exclusive access to cutting-edge insights, expert analysis, and the latest trends in AI and technology delivered directly to your inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#plans"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Choose Your Plan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="/read-insights"
                className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Insights
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

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Subscribe</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get exclusive access to insights that will keep you ahead of the competition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${benefit.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section id="plans" className="py-24 bg-gradient-to-b from-black to-neutral-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Plan</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select the perfect subscription plan that fits your needs and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                  plan.popular 
                    ? 'border-yellow-400/50 shadow-2xl shadow-yellow-400/20' 
                    : 'border-white/10 hover:border-yellow-400/30'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-black text-yellow-400">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:shadow-yellow-500/25'
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'
                    }`}
                  >
                    {plan.id === 'free' ? 'Get Started' : 'Subscribe Now'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form Section */}
      <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Subscribe</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of professionals who stay ahead with our exclusive insights
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Company (Optional)</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  placeholder="Enter your company name"
                />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white font-semibold mb-3">Areas of Interest</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        interests.includes(interest)
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                          : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                <ShieldIcon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-white mb-1">Privacy & Security</p>
                  <p>Your information is protected by enterprise-grade security. We never share your data with third parties and you can unsubscribe at any time.</p>
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-400/30 text-green-400">
                  <p className="font-semibold">Success!</p>
                  <p>{submitMessage}</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-red-400">
                  <p className="font-semibold">Error</p>
                  <p>{submitMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full group px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-yellow-500/25'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Subscribe to Insights
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
