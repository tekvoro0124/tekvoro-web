import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Target, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Search,
  Star,
  Award,
  Calendar,
  CheckCircle,
  BarChart3,
  DollarSign,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const industries = ['All', 'Healthcare', 'FinTech', 'Retail', 'Manufacturing', 'Education', 'Government', 'Transportation'];

const caseStudies = [
  {
    id: 1,
    title: 'AI-Powered Healthcare Diagnostics',
    client: 'MedTech Innovations',
    industry: 'Healthcare',
    challenge: 'Traditional diagnostic methods were time-consuming and often missed early-stage diseases, leading to delayed treatments and poor patient outcomes.',
    solution: 'Developed an AI-powered diagnostic platform using computer vision and deep learning algorithms to analyze medical images with 95% accuracy.',
    results: [
      { metric: '95%', label: 'Diagnostic Accuracy', icon: <Target className="w-5 h-5" /> },
      { metric: '60%', label: 'Faster Diagnosis', icon: <Clock className="w-5 h-5" /> },
      { metric: '40%', label: 'Cost Reduction', icon: <DollarSign className="w-5 h-5" /> },
      { metric: '1000+', label: 'Lives Saved', icon: <Users className="w-5 h-5" /> }
    ],
    technologies: ['Computer Vision', 'Deep Learning', 'HIPAA Compliant', 'Mobile App'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    featured: true,
    duration: '6 months',
    team: '8 developers',
    testimonial: {
      quote: 'Tekvoro\'s AI solution transformed our diagnostic capabilities. We\'re now detecting diseases earlier and saving more lives.',
      author: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    id: 2,
    title: 'Smart City Traffic Management',
    client: 'Metro City Government',
    industry: 'Government',
    challenge: 'Traffic congestion was causing economic losses of $2M daily, increased pollution, and frustrated citizens.',
    solution: 'Implemented a city-wide IoT sensor network with AI-powered traffic prediction and real-time signal optimization.',
    results: [
      { metric: '30%', label: 'Traffic Reduction', icon: <TrendingUp className="w-5 h-5" /> },
      { metric: '25%', label: 'Energy Savings', icon: <Zap className="w-5 h-5" /> },
      { metric: '$2M', label: 'Daily Savings', icon: <DollarSign className="w-5 h-5" /> },
      { metric: '50%', label: 'Pollution Decrease', icon: <Globe className="w-5 h-5" /> }
    ],
    technologies: ['IoT Sensors', 'Edge Computing', 'Machine Learning', 'Real-time Analytics'],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    featured: true,
    duration: '12 months',
    team: '15 developers',
    testimonial: {
      quote: 'The smart traffic system has revolutionized our city. Citizens are happier, and we\'ve saved millions in operational costs.',
      author: 'Mayor Michael Chen',
      role: 'City Mayor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  }
];

const stats = [
  { number: '50+', label: 'Case Studies', icon: <Target className="w-6 h-6" /> },
  { number: '95%', label: 'Success Rate', icon: <Star className="w-6 h-6" /> },
  { number: '$100M+', label: 'Value Created', icon: <DollarSign className="w-6 h-6" /> },
  { number: '24/7', label: 'Support', icon: <Clock className="w-6 h-6" /> }
];

export default function SeeCaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesIndustry = selectedIndustry === 'All' || study.industry === selectedIndustry;
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.challenge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

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
                AI 2025 Success Stories
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 text-sm font-semibold">
                <Award className="w-4 h-4" />
                Proven Results
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                See Case
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Studies
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Discover how we've helped organizations across industries achieve remarkable results with AI-powered solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#case-studies"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Explore Case Studies
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="/view-portfolio"
                className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
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

      {/* Case Studies Section */}
      <section id="case-studies" className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real results from real clients across diverse industries
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Industry Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedIndustry === industry
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Case Studies Grid */}
          <div className="space-y-12">
            {filteredCaseStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden">
                  {study.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium">
                          {study.industry}
                        </span>
                        <span className="text-gray-400 text-sm">{study.duration}</span>
                        <span className="text-gray-400 text-sm">{study.team}</span>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-yellow-400 font-semibold mb-6">{study.client}</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-3">The Challenge:</h4>
                          <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-3">Our Solution:</h4>
                          <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Results & Image */}
                    <div className="space-y-6">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Results Grid */}
                      <div>
                        <h4 className="text-white font-semibold mb-4">Key Results:</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {study.results.map((result, index) => (
                            <div key={index} className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400">
                                  {result.icon}
                                </div>
                                <div className="text-2xl font-bold text-yellow-400">{result.metric}</div>
                              </div>
                              <div className="text-gray-300 text-sm">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-xl border border-yellow-400/20">
                    <div className="flex items-start gap-4">
                      <img
                        src={study.testimonial.avatar}
                        alt={study.testimonial.author}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400/30"
                      />
                      <div className="flex-1">
                        <p className="text-gray-300 italic text-lg leading-relaxed mb-3">
                          "{study.testimonial.quote}"
                        </p>
                        <div>
                          <div className="font-bold text-white">{study.testimonial.author}</div>
                          <div className="text-yellow-400 text-sm">{study.testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's create your own success story. Our team is ready to help you achieve remarkable results.
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
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="/view-portfolio"
              className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
