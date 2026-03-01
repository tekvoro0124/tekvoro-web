import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Star,
  ArrowRight,
  Filter,
  Search,
  Eye,
  Code,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Bot,
  ShoppingCart,
  AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'marketplace' | 'platform' | 'automation' | 'mobile' | 'web';
  status: 'live' | 'completed' | 'in-development';
  client: string;
  industry: string;
  technologies: string[];
  features: string[];
  metrics: {
    users?: string;
    transactions?: string;
    revenue?: string;
    performance?: string;
  };
  timeline: string;
  website?: string;
  image: string;
  featured: boolean;
  challenge: string;
  solution: string;
  results: string[];
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';
        const response = await fetch(`${apiUrl}/api/portfolio`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        const portfolioProjects: Project[] = data.data || [];
        setProjects(portfolioProjects);
        setFilteredProjects(portfolioProjects);
      } catch (err: any) {
        console.error('Error fetching portfolio:', err);
        // Fallback to empty array if fetch fails
        setProjects([]);
        setFilteredProjects([]);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm, projects]);

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'marketplace', label: 'Marketplaces', count: projects.filter(p => p.category === 'marketplace').length },
    { id: 'platform', label: 'Platforms', count: projects.filter(p => p.category === 'platform').length },
    { id: 'automation', label: 'Automation', count: projects.filter(p => p.category === 'automation').length },
    { id: 'mobile', label: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marketplace': return <ShoppingCart className="w-5 h-5" />;
      case 'platform': return <Globe className="w-5 h-5" />;
      case 'automation': return <Zap className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'web': return <Code className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-development': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <>
      <SEO
        title="Portfolio - AI Platform Development Case Studies | Tekvoro"
        description="Explore our portfolio of successful AI-powered platforms, marketplaces, and automation solutions. Case studies from QuickMela, DriverBharat, and more."
        keywords="platform development portfolio, AI marketplace case studies, automation projects, Tekvoro portfolio, custom platform development"
        canonical="https://www.tekvoro.com/portfolio"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white py-20">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
              Our <span className="text-yellow-400">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover how we've transformed businesses with AI-powered platforms, automation solutions,
              and cutting-edge technology. Each project represents innovation, scalability, and measurable impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{projects.length}+</div>
                <div className="text-gray-400 text-sm">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">₹50Cr+</div>
                <div className="text-gray-400 text-sm">Transaction Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime Average</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-neutral-900 border-b border-white/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-400 text-black shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {getCategoryIcon(category.id)}
                  {category.label}
                  <span className="text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {filteredProjects.filter(p => p.featured).length > 0 && (
        <section className="py-16 bg-black">
          <div className="container-custom">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our most impactful projects that showcase the full spectrum of our AI platform development capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.filter(p => p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/50 transition-all duration-500"
                >
                  {/* Background Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(project.category)}
                        <span className="text-white text-sm font-medium">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400 text-sm">{project.client}</span>
                      <span className="text-gray-400 text-sm">{project.timeline}</span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-yellow-400 font-semibold text-sm">{value}</div>
                          <div className="text-gray-500 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <Eye className="w-4 h-4" />
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">All Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse through our complete portfolio of successful projects across various industries and technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/50 transition-all duration-500"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(project.category)}
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                      </div>
                    </div>
                    {project.featured && (
                      <Star className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{project.client}</span>
                    <span>{project.timeline}</span>
                  </div>
                </div>

                {/* Metrics Preview */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-white/5 rounded">
                        <div className="text-yellow-400 font-semibold text-xs">{value}</div>
                        <div className="text-gray-500 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </button>

                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {getCategoryIcon(selectedProject.category)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status.replace('-', ' ').toUpperCase()}
                    </span>
                    {selectedProject.featured && <Star className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.client} • {selectedProject.industry}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      Challenge
                    </h4>
                    <p className="text-gray-300">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      Solution
                    </h4>
                    <p className="text-gray-300">{selectedProject.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Results & Impact</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">{value}</div>
                        <div className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-300">
                        <Award className="w-4 h-4 text-yellow-400" />
                        {result}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  {selectedProject.website && (
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Live Project
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Discuss Similar Project
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-black to-neutral-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your next AI-powered platform. From marketplaces to automation systems,
              we build technology that scales and delivers results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/book-demo"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
