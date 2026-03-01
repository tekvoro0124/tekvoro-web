// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Search, Users, Mail, Download, Filter, 
  ArrowLeft, TrendingUp, Star, Calendar, AlertCircle,
  CheckCircle, Eye, Send, UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  company?: string;
  interests: string[];
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'unsubscribed' | 'bounced';
  isVerified: boolean;
  engagement: {
    opens: number;
    clicks: number;
    lastOpen?: string;
  };
  createdAt: string;
}

export default function CommunityManager() {
  const { token } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  const plans = ['all', 'free', 'starter', 'professional', 'enterprise'];
  const statuses = ['all', 'active', 'unsubscribed', 'bounced'];

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/subscriptions`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscriptions || []);
      } else {
        // Mock data for demo
        setSubscribers([
          {
            _id: '1',
            email: 'john.doe@example.com',
            name: 'John Doe',
            company: 'Tech Corp',
            interests: ['AI/ML', 'Cloud'],
            plan: 'professional',
            status: 'active',
            isVerified: true,
            engagement: { opens: 45, clicks: 12 },
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: '2',
            email: 'jane.smith@startup.io',
            name: 'Jane Smith',
            company: 'Startup.io',
            interests: ['Growth', 'Marketing'],
            plan: 'enterprise',
            status: 'active',
            isVerified: true,
            engagement: { opens: 78, clicks: 34 },
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: '3',
            email: 'mike@freelance.dev',
            name: 'Mike Wilson',
            interests: ['Development', 'DevOps'],
            plan: 'free',
            status: 'active',
            isVerified: true,
            engagement: { opens: 12, clicks: 3 },
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportSubscribers = () => {
    const filtered = getFilteredSubscribers();
    const csv = [
      ['Email', 'Name', 'Company', 'Plan', 'Status', 'Verified', 'Opens', 'Clicks', 'Joined'],
      ...filtered.map(s => [
        s.email,
        s.name || '',
        s.company || '',
        s.plan,
        s.status,
        s.isVerified ? 'Yes' : 'No',
        s.engagement.opens,
        s.engagement.clicks,
        new Date(s.createdAt).toLocaleDateString(),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setSuccess('Export completed');
    setTimeout(() => setSuccess(''), 3000);
  };

  const sendBulkEmail = async () => {
    if (selectedSubscribers.length === 0) {
      setError('Please select subscribers first');
      return;
    }
    // Navigate to email campaigns with selected subscribers
    window.location.href = `/admin/email-campaigns?subscribers=${selectedSubscribers.join(',')}`;
  };

  const getFilteredSubscribers = () => {
    return subscribers.filter(sub => {
      const matchesSearch = 
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sub.company?.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPlan = filterPlan === 'all' || sub.plan === filterPlan;
      const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
      return matchesSearch && matchesPlan && matchesStatus;
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filtered = getFilteredSubscribers();
    if (selectedSubscribers.length === filtered.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filtered.map(s => s._id));
    }
  };

  const filteredSubscribers = getFilteredSubscribers();

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.status === 'active').length,
    verified: subscribers.filter(s => s.isVerified).length,
    enterprise: subscribers.filter(s => s.plan === 'enterprise').length,
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-500/20 text-purple-400';
      case 'professional': return 'bg-blue-500/20 text-blue-400';
      case 'starter': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <>
      <SEO title="Community Manager | Tekvoro Admin" />
      
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
                  <Globe className="w-8 h-8 text-yellow-400" />
                  Community Hub
                </h1>
                <p className="text-gray-400">Manage subscribers, engagement, and community growth</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={exportSubscribers}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </motion.button>
              {selectedSubscribers.length > 0 && (
                <motion.button
                  onClick={sendBulkEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
                >
                  <Send className="w-4 h-4" />
                  Email Selected ({selectedSubscribers.length})
                </motion.button>
              )}
            </div>
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-xs text-gray-400">Total Subscribers</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{stats.active}</p>
                  <p className="text-xs text-gray-400">Active</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <CheckCircle className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{stats.verified}</p>
                  <p className="text-xs text-gray-400">Verified</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Star className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">{stats.enterprise}</p>
                  <p className="text-xs text-gray-400">Enterprise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email, name, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
            >
              {plans.map(plan => (
                <option key={plan} value={plan} className="bg-neutral-900">
                  {plan === 'all' ? 'All Plans' : plan.charAt(0).toUpperCase() + plan.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-neutral-900">
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Subscriber</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Company</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Plan</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Engagement</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center">
                        <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </td>
                    </tr>
                  ) : filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                        No subscribers found
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <tr key={sub._id} className="hover:bg-white/5 transition">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.includes(sub._id)}
                            onChange={() => toggleSelect(sub._id)}
                            className="w-4 h-4 rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white font-medium flex items-center gap-2">
                              {sub.name || 'Unknown'}
                              {sub.isVerified && <CheckCircle className="w-3 h-3 text-green-400" />}
                            </p>
                            <p className="text-sm text-gray-400">{sub.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{sub.company || '-'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPlanColor(sub.plan)}`}>
                            {sub.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            sub.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            sub.status === 'bounced' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-blue-400">
                              <Eye className="w-3 h-3" />
                              {sub.engagement.opens}
                            </span>
                            <span className="flex items-center gap-1 text-green-400">
                              <TrendingUp className="w-3 h-3" />
                              {sub.engagement.clicks}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
