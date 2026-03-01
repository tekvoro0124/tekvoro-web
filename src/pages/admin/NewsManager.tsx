// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Search, Filter, Eye, Trash2, RefreshCw, 
  TrendingUp, Clock, Shield, ExternalLink, ArrowLeft,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface NewsArticle {
  _id: string;
  title: string;
  source: string;
  url: string;
  publishedDate: string;
  category: string;
  summary?: string;
  trustScore?: number;
  isActive: boolean;
  relevantIndustries?: string[];
  relevantCompanies?: string[];
  views?: number;
}

export default function NewsManager() {
  const { token } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  const categories = [
    'all', 'technology', 'ai-ml', 'cloud', 'cybersecurity', 
    'healthcare', 'fintech', 'enterprise', 'startups'
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/news/trending?limit=50`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleArticleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/news/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      setArticles(prev => prev.map(a => 
        a._id === id ? { ...a, isActive: !currentStatus } : a
      ));
      setSuccess('Article status updated');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!window.confirm('Delete this article?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      setArticles(prev => prev.filter(a => a._id !== id));
      setSuccess('Article deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && article.isActive) ||
                         (filterStatus === 'inactive' && !article.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getTrustColor = (score?: number) => {
    if (!score) return 'text-gray-400';
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <>
      <SEO title="News Manager | Tekvoro Admin" />
      
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
                  <Newspaper className="w-8 h-8 text-yellow-400" />
                  News Manager
                </h1>
                <p className="text-gray-400">Manage AI-curated news articles and corporate updates</p>
              </div>
            </div>
            <motion.button
              onClick={fetchArticles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
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

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-neutral-900">
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="all" className="bg-neutral-900">All Status</option>
              <option value="active" className="bg-neutral-900">Active</option>
              <option value="inactive" className="bg-neutral-900">Inactive</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{articles.length}</p>
              <p className="text-sm text-gray-400">Total Articles</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">{articles.filter(a => a.isActive).length}</p>
              <p className="text-sm text-gray-400">Active</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-yellow-400">{articles.filter(a => (a.trustScore || 0) >= 80).length}</p>
              <p className="text-sm text-gray-400">High Trust</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-400">{articles.reduce((sum, a) => sum + (a.views || 0), 0)}</p>
              <p className="text-sm text-gray-400">Total Views</p>
            </div>
          </div>

          {/* Articles List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No articles found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/5 border rounded-xl p-5 ${article.isActive ? 'border-white/10' : 'border-red-500/30 opacity-60'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                          {article.category || 'General'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {article.source}
                        </span>
                        {article.trustScore && (
                          <span className={`flex items-center gap-1 text-xs ${getTrustColor(article.trustScore)}`}>
                            <Shield className="w-3 h-3" />
                            {article.trustScore}%
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                      {article.summary && (
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">{article.summary}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(article.publishedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views || 0} views
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(article.url, '_blank')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleArticleStatus(article._id, article.isActive)}
                        className={`p-2 rounded-lg ${article.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                      >
                        {article.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteArticle(article._id)}
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
        </div>
      </div>
    </>
  );
}
