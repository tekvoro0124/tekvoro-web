import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Github, Target, Users, Star, Award, Search } from 'lucide-react';

const categories = ['All', 'AI Solutions', 'Cloud Infrastructure', 'Cybersecurity', 'IoT & Smart Cities', 'Healthcare', 'FinTech', 'E-commerce'];

const projects = [
  {
    id: 1,
    title: 'AI-Powered Customer Analytics Platform',
    category: 'AI Solutions',
    client: 'Global Retail Corp',
    description: 'Built a comprehensive AI platform that analyzes customer behavior and provides real-time insights.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS', 'MongoDB'],
    results: ['40% increase in engagement', 'Real-time analytics', 'Predictive insights'],
    year: '2024',
    featured: true,
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Smart City IoT Infrastructure',
    category: 'IoT & Smart Cities',
    client: 'Metro City Government',
    description: 'Deployed city-wide IoT sensors and AI systems for traffic management and energy optimization.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    technologies: ['IoT Sensors', 'Edge Computing', 'Machine Learning', 'Cloud Platform'],
    results: ['30% traffic reduction', '25% energy savings', 'Enhanced public safety'],
    year: '2024',
    featured: true,
    link: '#',
    github: '#'
  }
];

const stats = [
  { number: '100+', label: 'Projects Delivered', icon: <Target className="w-6 h-6" /> },
  { number: '50+', label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
  { number: '99.9%', label: 'Success Rate', icon: <Star className="w-6 h-6" /> },
  { number: '5+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> }
];

export default function ViewPortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO 
        title="View Portfolio | Tekvoro Technologies"
        description="Explore our portfolio of successful projects and client work. See how we've helped businesses across industries achieve their goals through innovative technology solutions."
        keywords="portfolio, projects, client work, case studies, project examples, work samples, successful projects"
        ogImage="/images/view-portfolio-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "View Portfolio",
          "description": "Explore our portfolio of successful projects and client work",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
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
                AI 2025 Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                View Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Explore our innovative projects that showcase the power of AI, cloud computing, and cutting-edge technology solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#portfolio"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Explore Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="/see-case-studies"
                className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Case Studies
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our innovative solutions that are transforming industries worldwide
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
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden">
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="text-gray-400 text-sm">{project.year}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-yellow-400 font-semibold mb-4">{project.client}</p>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
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
            Ready to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Start</span> Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's create something amazing together. Our team is ready to bring your vision to life.
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
              href="/see-case-studies"
              className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Case Studies
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
