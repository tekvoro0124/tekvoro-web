import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Users, Star, Award, CheckCircle, MapPin, Phone, Mail, TrendingUp, Globe, Zap, Shield, Rocket, BarChart3, Building2, Briefcase, Linkedin } from 'lucide-react';

// Company metrics - verified, realistic data
const companyMetrics = [
  { number: '12+', label: 'Years of Industry Experience', icon: <Award className="w-6 h-6" /> },
  { number: '150+', label: 'Enterprise Projects Delivered', icon: <Target className="w-6 h-6" /> },
  { number: '75+', label: 'Global Clients Served', icon: <Users className="w-6 h-6" /> },
  { number: '98%', label: 'Client Retention Rate', icon: <Star className="w-6 h-6" /> }
];

// Core technology focus areas
const technologyFocus = [
  {
    title: 'Enterprise AI Solutions',
    description: 'Custom AI/ML implementations for process automation, predictive analytics, and intelligent decision-making systems.',
    icon: <Zap className="w-8 h-8" />
  },
  {
    title: 'SaaS Product Development',
    description: 'Scalable, cloud-native SaaS applications built for performance, security, and rapid market deployment.',
    icon: <Rocket className="w-8 h-8" />
  },
  {
    title: 'Marketplace Platforms',
    description: 'End-to-end marketplace solutions with multi-vendor capabilities, payment integration, and analytics.',
    icon: <Globe className="w-8 h-8" />
  },
  {
    title: 'Digital Transformation',
    description: 'Legacy modernization, cloud migration, and enterprise-grade digital infrastructure solutions.',
    icon: <TrendingUp className="w-8 h-8" />
  }
];

// Investor-focused growth metrics
const investorHighlights = [
  { metric: '40%', label: 'YoY Revenue Growth (2024-2025)' },
  { metric: '3x', label: 'Client Base Expansion' },
  { metric: '5+', label: 'Markets Served Globally' },
  { metric: '85%', label: 'Recurring Revenue Model' }
];

export default function AboutUsPage() {
  return (
    <>
      <SEO
        title="About Tekvoro Technologies | AI-Driven IT Company India | Enterprise Solutions"
        description="Tekvoro Technologies is a leading AI-driven IT company in India specializing in enterprise AI solutions, SaaS development, and scalable marketplace platforms. Founded by Musugu Sanjeev with 12+ years experience. Delivering data-driven digital transformation."
        keywords="AI driven IT company India, SaaS development company, enterprise AI solutions, scalable marketplace platform, digital transformation India, AI software company Hyderabad, enterprise software development, B2B SaaS India, AI consulting services, technology consulting firm"
        canonical="https://www.tekvoro.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tekvoro Technologies",
          "url": "https://www.tekvoro.com",
          "logo": "https://www.tekvoro.com/logo.png",
          "description": "AI-driven IT company in India delivering enterprise AI solutions, SaaS development, and scalable marketplace platforms",
          "foundingDate": "2014",
          "founder": {
            "@type": "Person",
            "name": "Musugu Sanjeev",
            "jobTitle": "Founder & CEO",
            "description": "Technology entrepreneur with 12+ years experience in enterprise software and AI"
          },
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 50,
            "maxValue": 100
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "India"
          },
          "areaServed": ["India", "USA", "UK", "UAE", "Australia"],
          "knowsAbout": ["Artificial Intelligence", "SaaS Development", "Enterprise Software", "Digital Transformation", "Cloud Computing"],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "info@tekvoro.com",
            "telephone": "+91-9121331813"
          },
          "sameAs": [
            "https://www.linkedin.com/company/tekvoro-technologies",
            "https://twitter.com/tekvoro"
          ]
        }}
      />
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section - H1 with primary keywords */}
        <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent" />
          <div className="container-custom relative z-10">
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6 flex flex-wrap justify-center gap-3"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  AI-Driven Innovation Since 2014
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-yellow-400 text-sm font-semibold">
                  <Building2 className="w-4 h-4" />
                  Enterprise Solutions
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
              >
                <span className="block text-white mb-2">
                  Leading AI-Driven IT Company
                </span>
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Building India's Digital Future
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed"
              >
                Tekvoro Technologies delivers enterprise-grade AI solutions, scalable SaaS platforms, and marketplace development services. We transform businesses through data-driven technology innovation with measurable ROI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="/book-demo"
                  className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
                
                <motion.a
                  href="/view-portfolio"
                  className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Case Studies
                </motion.a>
              </motion.div>
            </motion.article>
          </div>
        </section>

        {/* Company Metrics Section */}
        <section className="py-16 bg-gradient-to-b from-black to-neutral-950" aria-labelledby="metrics-heading">
          <div className="container-custom">
            <h2 id="metrics-heading" className="sr-only">Company Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {companyMetrics.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 h-full">
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

        {/* Founder Section */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black" aria-labelledby="founder-heading">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="founder-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Leadership & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Vision</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Guided by experienced technology leadership with proven enterprise track record
              </p>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Founder Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black text-4xl md:text-5xl font-black">
                      MS
                    </div>
                  </div>
                  
                  {/* Founder Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">Musugu Sanjeev</h3>
                      <a 
                        href="https://www.linkedin.com/in/musugu-sanjeev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                        aria-label="View Musugu Sanjeev's LinkedIn profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="text-yellow-400 font-semibold text-lg mb-4">Founder & Chief Executive Officer</p>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      A technology entrepreneur with <strong className="text-white">12+ years of experience</strong> in enterprise software development, AI/ML implementation, and digital transformation. Musugu Sanjeev founded Tekvoro Technologies with a vision to democratize enterprise-grade technology for businesses of all sizes across India and global markets.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">Former Tech Lead at Enterprise MNCs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">150+ Enterprise Projects Delivered</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">Served Clients Across 5+ Countries</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">AI & Cloud Technology Expert</span>
                      </div>
                    </div>

                    <blockquote className="p-4 rounded-xl bg-black/30 border-l-4 border-yellow-400 italic text-gray-400">
                      "Our mission is to build technology that creates measurable business impact. Every solution we deliver is designed for scalability, performance, and long-term value creation."
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Technology Focus - H2 with keywords */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950" aria-labelledby="technology-heading">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="technology-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Enterprise AI Solutions & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">SaaS Development</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Specialized technology capabilities designed for scalable marketplace platforms and enterprise digital transformation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technologyFocus.map((tech, idx) => (
                <motion.article
                  key={tech.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 h-full">
                    <div className="flex items-start gap-5">
                      <div className="p-4 rounded-xl bg-yellow-400/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {tech.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                          {tech.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Section - Growth & Revenue Model */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 via-yellow-900/10 to-black" aria-labelledby="investor-heading">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6">
                <BarChart3 className="w-4 h-4" />
                Investment Opportunity
              </span>
              <h2 id="investor-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Growth Vision & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Scalable Revenue Model</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Positioned for accelerated growth in the enterprise AI and SaaS market with proven execution capability
              </p>
            </motion.div>

            {/* Investor Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              {investorHighlights.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-500/20 text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">
                    {item.metric}
                  </div>
                  <div className="text-sm text-gray-400">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Strategic Advantages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Integration Advantage</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Proprietary AI frameworks enable rapid deployment of intelligent solutions. Our technology stack reduces client time-to-market by 40% compared to traditional development approaches.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Pre-built AI/ML modules for common use cases
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Cloud-native architecture for instant scalability
                  </li>
                </ul>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Market Expansion Strategy</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Strategic expansion into high-growth markets including USA, UK, UAE, and Southeast Asia. Focus on industries with strong digital transformation demand.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    Healthcare & Fintech vertical focus
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    Partnership-driven go-to-market model
                  </li>
                </ul>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Sustainable Revenue Model</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Hybrid revenue model combining project-based delivery with recurring SaaS subscriptions and maintenance contracts. Strong focus on long-term client relationships.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    85% recurring revenue from existing clients
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    Multi-year enterprise contracts
                  </li>
                </ul>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950" aria-labelledby="mission-heading">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 id="mission-heading" className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Mission</span>
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  To empower businesses with enterprise-grade AI solutions and scalable technology platforms that deliver measurable business outcomes and sustainable competitive advantage.
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  We believe technology investments should generate tangible returns. Every solution we build is engineered for performance, scalability, and long-term value creation - not vanity metrics.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="group px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      Partner With Us
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                  <a
                    href="/insights/case-studies"
                    className="group px-6 py-3 rounded-xl border border-white/30 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                  >
                    View Success Stories
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    To be India's most trusted AI-driven technology partner for enterprises globally, recognized for delivering transformative solutions with integrity and measurable impact.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300">Technology leadership in enterprise AI</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300">Data-driven decision making culture</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300">Sustainable, ethical technology practices</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300">Long-term client partnership focus</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white" aria-labelledby="contact-heading">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Transform</span> Your Business?
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                Schedule a consultation to discuss how our enterprise AI solutions can drive measurable results for your organization.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <address className="flex items-center justify-center gap-3 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 not-italic">
                  <MapPin className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Headquarters</div>
                    <div className="text-gray-400 text-sm">Hyderabad, Telangana, India</div>
                  </div>
                </address>
                <address className="flex items-center justify-center gap-3 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 not-italic">
                  <Phone className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Phone</div>
                    <a href="tel:+919121331813" className="text-gray-400 text-sm hover:text-yellow-400 transition-colors">+91 9121331813</a>
                  </div>
                </address>
                <address className="flex items-center justify-center gap-3 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 not-italic">
                  <Mail className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Email</div>
                    <a href="mailto:info@tekvoro.com" className="text-gray-400 text-sm hover:text-yellow-400 transition-colors">info@tekvoro.com</a>
                  </div>
                </address>
              </div>

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
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
                <motion.a
                  href="/contact"
                  className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Sales
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
