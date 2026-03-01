// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Users,
  Briefcase,
  AlertCircle,
  CheckCircle,
  X,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface Investor {
  _id?: string;
  name: string;
  logo: string;
  photo: string;
  location: string;
  website: string;
  description: string;
  bio: string;
  investmentFocus: string;
  portfolio: string[];
  social?: { linkedin?: string; twitter?: string };
  featured: boolean;
  testimonial?: { quote: string; author: string };
}

interface PortfolioProject {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  status: string;
  client: string;
  industry: string;
  technologies: string[];
  features: string[];
  metrics?: { users?: string; transactions?: string; revenue?: string };
  timeline: string;
  website?: string;
  image: string;
  featured: boolean;
  challenge: string;
  solution: string;
  results: string[];
}

function AdminCMSPageComponent() {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'investors' | 'portfolio'>('investors');
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [showInvestorForm, setShowInvestorForm] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<Investor | null>(null);
  const [investorForm, setInvestorForm] = useState<Investor>({
    name: '',
    logo: '',
    photo: '',
    location: '',
    website: '',
    description: '',
    bio: '',
    investmentFocus: '',
    portfolio: [],
    featured: false,
  });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [projectForm, setProjectForm] = useState<PortfolioProject>({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    category: 'marketplace',
    status: 'live',
    client: '',
    industry: '',
    technologies: [],
    features: [],
    timeline: '',
    image: '',
    featured: false,
    challenge: '',
    solution: '',
    results: [],
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  // Fetch investors
  useEffect(() => {
    fetchInvestors();
    fetchProjects();
  }, []);

  const fetchInvestors = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/investors`);
      if (!response.ok) throw new Error('Failed to fetch investors');
      const data = await response.json();
      setInvestors(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/portfolio`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data.data || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Save investor
  const saveInvestor = async () => {
    if (!investorForm.name || !investorForm.logo) {
      setError('Name and logo are required');
      return;
    }

    try {
      const method = editingInvestor ? 'PUT' : 'POST';
      const url = editingInvestor
        ? `${apiUrl}/api/admin/investors/${editingInvestor._id}`
        : `${apiUrl}/api/admin/investors`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(investorForm),
      });

      if (!response.ok) throw new Error('Failed to save investor');
      
      setSuccess('Investor saved successfully!');
      setShowInvestorForm(false);
      setEditingInvestor(null);
      setInvestorForm({
        name: '',
        logo: '',
        photo: '',
        location: '',
        website: '',
        description: '',
        bio: '',
        investmentFocus: '',
        portfolio: [],
        featured: false,
      });
      fetchInvestors();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete investor
  const deleteInvestor = async (id?: string) => {
    if (!id || !window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${apiUrl}/api/admin/investors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete investor');
      setSuccess('Investor deleted successfully!');
      fetchInvestors();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Save project
  const saveProject = async () => {
    if (!projectForm.title || !projectForm.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject
        ? `${apiUrl}/api/admin/portfolio/${editingProject._id}`
        : `${apiUrl}/api/admin/portfolio`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectForm),
      });

      if (!response.ok) throw new Error('Failed to save project');
      
      setSuccess('Project saved successfully!');
      setShowProjectForm(false);
      setEditingProject(null);
      setProjectForm({
        title: '',
        slug: '',
        description: '',
        longDescription: '',
        category: 'marketplace',
        status: 'live',
        client: '',
        industry: '',
        technologies: [],
        features: [],
        timeline: '',
        image: '',
        featured: false,
        challenge: '',
        solution: '',
        results: [],
      });
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete project
  const deleteProject = async (id?: string) => {
    if (!id || !window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${apiUrl}/api/admin/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete project');
      setSuccess('Project deleted successfully!');
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Admin CMS | Tekvoro"
        description="Admin content management system for Tekvoro"
        keywords="admin, cms, content management"
      />

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="container-custom flex items-center justify-between h-16">
            <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Admin CMS
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400">{error}</p>
                </div>
                <button
                  onClick={() => setError('')}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-green-400">{success}</p>
                </div>
                <button
                  onClick={() => setSuccess('')}
                  className="text-green-400 hover:text-green-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('investors')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                activeTab === 'investors'
                  ? 'border-yellow-400 text-yellow-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              Investors
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                activeTab === 'portfolio'
                  ? 'border-yellow-400 text-yellow-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Portfolio
            </button>
          </div>

          {/* Investors Tab */}
          {activeTab === 'investors' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Investors</h2>
                <motion.button
                  onClick={() => {
                    setEditingInvestor(null);
                    setShowInvestorForm(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Investor
                </motion.button>
              </div>

              {/* Investors List */}
              <div className="grid gap-4">
                {investors.map((investor) => (
                  <div
                    key={investor._id}
                    className="p-4 rounded-lg bg-neutral-900/50 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {investor.logo && (
                        <img
                          src={investor.logo}
                          alt={investor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{investor.name}</h3>
                        <p className="text-sm text-gray-400">{investor.location}</p>
                        {investor.featured && (
                          <span className="inline-block mt-1 px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => {
                          setEditingInvestor(investor);
                          setInvestorForm(investor);
                          setShowInvestorForm(true);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteInvestor(investor._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Portfolio</h2>
                <motion.button
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </motion.button>
              </div>

              {/* Projects List */}
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="p-4 rounded-lg bg-neutral-900/50 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-gray-400">{project.client}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-1 rounded-full bg-blue-400/20 text-blue-300 text-xs font-semibold">
                            {project.category}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              project.status === 'live'
                                ? 'bg-green-400/20 text-green-300'
                                : project.status === 'completed'
                                ? 'bg-purple-400/20 text-purple-300'
                                : 'bg-yellow-400/20 text-yellow-300'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => {
                          setEditingProject(project);
                          setProjectForm(project);
                          setShowProjectForm(true);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteProject(project._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Forms Modal - Investor */}
      <AnimatePresence>
        {showInvestorForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInvestorForm(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold mb-6">
                {editingInvestor ? 'Edit Investor' : 'Add New Investor'}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={investorForm.name}
                  onChange={(e) =>
                    setInvestorForm({ ...investorForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <input
                  type="url"
                  placeholder="Logo URL"
                  value={investorForm.logo}
                  onChange={(e) =>
                    setInvestorForm({ ...investorForm, logo: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <input
                  type="url"
                  placeholder="Photo URL"
                  value={investorForm.photo}
                  onChange={(e) =>
                    setInvestorForm({ ...investorForm, photo: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={investorForm.location}
                  onChange={(e) =>
                    setInvestorForm({ ...investorForm, location: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <input
                  type="url"
                  placeholder="Website"
                  value={investorForm.website}
                  onChange={(e) =>
                    setInvestorForm({ ...investorForm, website: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={investorForm.description}
                  onChange={(e) =>
                    setInvestorForm({
                      ...investorForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                  rows={3}
                />
                <textarea
                  placeholder="Bio"
                  value={investorForm.bio}
                  onChange={(e) =>
                    setInvestorForm({ ...investorForm, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Investment Focus (e.g., AI, SaaS, Robotics)"
                  value={investorForm.investmentFocus}
                  onChange={(e) =>
                    setInvestorForm({
                      ...investorForm,
                      investmentFocus: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={investorForm.featured}
                    onChange={(e) =>
                      setInvestorForm({
                        ...investorForm,
                        featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span>Featured Investor</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={saveInvestor}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </motion.button>
                  <motion.button
                    onClick={() => setShowInvestorForm(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forms Modal - Project */}
      <AnimatePresence>
        {showProjectForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProjectForm(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold mb-6">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Slug (URL-friendly)"
                  value={projectForm.slug}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Client Name"
                  value={projectForm.client}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, client: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <select
                  value={projectForm.category}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, category: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="marketplace">Marketplace</option>
                  <option value="platform">Platform</option>
                  <option value="automation">Automation</option>
                  <option value="mobile">Mobile</option>
                  <option value="web">Web</option>
                </select>
                <select
                  value={projectForm.status}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, status: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                  <option value="in-development">In Development</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                  rows={2}
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={projectForm.image}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, image: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                />
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span>Featured Project</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={saveProject}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </motion.button>
                  <motion.button
                    onClick={() => setShowProjectForm(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdminCMSPageComponent;
