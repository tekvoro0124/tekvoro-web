// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Plus, Edit2, Trash2, Save, X, ArrowLeft,
  Linkedin, Twitter, Globe as GlobeIcon, Star, AlertCircle, 
  CheckCircle, MapPin, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface Investor {
  _id?: string;
  name: string;
  logo: string;
  photo?: string;
  location: string;
  website: string;
  description: string;
  bio?: string;
  investmentFocus: string;
  portfolio: string[];
  social?: { linkedin?: string; twitter?: string };
  featured: boolean;
  testimonial?: { quote: string; author: string };
}

const defaultInvestor: Investor = {
  name: '',
  logo: '',
  photo: '',
  location: '',
  website: '',
  description: '',
  bio: '',
  investmentFocus: '',
  portfolio: [],
  social: { linkedin: '', twitter: '' },
  featured: false,
};

export default function InvestorsManager() {
  const { token } = useAuth();
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<Investor | null>(null);
  const [formData, setFormData] = useState<Investor>(defaultInvestor);
  const [portfolioInput, setPortfolioInput] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/investors`);
      if (response.ok) {
        const data = await response.json();
        setInvestors(data.data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (investor: Investor) => {
    setEditingInvestor(investor);
    setFormData(investor);
    setPortfolioInput(investor.portfolio?.join(', ') || '');
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingInvestor(null);
    setFormData(defaultInvestor);
    setPortfolioInput('');
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.logo) {
      setError('Name and logo are required');
      return;
    }

    const investorData = {
      ...formData,
      portfolio: portfolioInput.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      setLoading(true);
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
        body: JSON.stringify(investorData),
      });

      if (!response.ok) throw new Error('Failed to save investor');

      setSuccess('Investor saved successfully');
      setShowForm(false);
      setFormData(defaultInvestor);
      fetchInvestors();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete this investor?')) return;

    try {
      const response = await fetch(`${apiUrl}/api/admin/investors/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      setInvestors(prev => prev.filter(i => i._id !== id));
      setSuccess('Investor deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleFeatured = async (investor: Investor) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/investors/${investor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...investor, featured: !investor.featured }),
      });
      
      if (response.ok) {
        setInvestors(prev => prev.map(i => 
          i._id === investor._id ? { ...i, featured: !i.featured } : i
        ));
      }
    } catch (err) {
      console.error('Toggle featured error:', err);
    }
  };

  return (
    <>
      <SEO title="Investors Manager | Tekvoro Admin" />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="text-3xl font-black text-white flex items-center gap-3">
                  <Building className="w-8 h-8 text-yellow-400" />
                  Investors Manager
                </h1>
                <p className="text-gray-400">Manage investor profiles and relationships</p>
              </div>
            </div>
            <motion.button
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Investor
            </motion.button>
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
                <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{investors.length}</p>
              <p className="text-sm text-gray-400">Total Investors</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-yellow-400">{investors.filter(i => i.featured).length}</p>
              <p className="text-sm text-gray-400">Featured</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-400">{investors.reduce((sum, i) => sum + (i.portfolio?.length || 0), 0)}</p>
              <p className="text-sm text-gray-400">Portfolio Companies</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">{new Set(investors.map(i => i.location).filter(Boolean)).size}</p>
              <p className="text-sm text-gray-400">Locations</p>
            </div>
          </div>

          {/* Investors Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : investors.length === 0 ? (
            <div className="text-center py-20">
              <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No investors added yet</p>
              <motion.button
                onClick={handleAdd}
                whileHover={{ scale: 1.05 }}
                className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
              >
                Add First Investor
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investors.map((investor, index) => (
                <motion.div
                  key={investor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {investor.logo ? (
                          <img 
                            src={investor.logo} 
                            alt={investor.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                            <Building className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-white">{investor.name}</h3>
                          {investor.location && (
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {investor.location}
                            </p>
                          )}
                        </div>
                      </div>
                      {investor.featured && (
                        <span className="px-2 py-1 rounded bg-yellow-400 text-black text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{investor.description}</p>
                    
                    {investor.investmentFocus && (
                      <p className="text-yellow-400 text-sm mb-3">
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        {investor.investmentFocus}
                      </p>
                    )}
                    
                    {investor.portfolio && investor.portfolio.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Portfolio ({investor.portfolio.length})</p>
                        <div className="flex flex-wrap gap-1">
                          {investor.portfolio.slice(0, 3).map((company, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-300">
                              {company}
                            </span>
                          ))}
                          {investor.portfolio.length > 3 && (
                            <span className="text-xs text-gray-500">+{investor.portfolio.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      {investor.website && (
                        <a href={investor.website} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition">
                          <GlobeIcon className="w-4 h-4" />
                        </a>
                      )}
                      {investor.social?.linkedin && (
                        <a href={investor.social.linkedin} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {investor.social?.twitter && (
                        <a href={investor.social.twitter} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-400 transition">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(investor)}
                        className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFeatured(investor)}
                        className={`p-2 rounded-lg ${investor.featured ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-400'}`}
                      >
                        <Star className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(investor._id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={() => setShowForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-xl p-6 max-h-[90vh] overflow-y-auto"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    {editingInvestor ? 'Edit Investor' : 'Add Investor'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="Investor or firm name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Logo URL *</label>
                      <input
                        type="url"
                        value={formData.logo}
                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none resize-none"
                        placeholder="Brief description..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Investment Focus</label>
                      <input
                        type="text"
                        value={formData.investmentFocus}
                        onChange={(e) => setFormData({ ...formData, investmentFocus: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="e.g., Series A, B2B SaaS"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Portfolio Companies (comma-separated)</label>
                      <input
                        type="text"
                        value={portfolioInput}
                        onChange={(e) => setPortfolioInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="Company A, Company B, Company C"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">LinkedIn</label>
                        <input
                          type="url"
                          value={formData.social?.linkedin || ''}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            social: { ...formData.social, linkedin: e.target.value } 
                          })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                          placeholder="https://linkedin.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Twitter</label>
                        <input
                          type="url"
                          value={formData.social?.twitter || ''}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            social: { ...formData.social, twitter: e.target.value } 
                          })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <label htmlFor="featured" className="text-sm text-white">Featured investor</label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={handleSave}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Saving...' : 'Save'}
                    </motion.button>
                    <motion.button
                      onClick={() => setShowForm(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
