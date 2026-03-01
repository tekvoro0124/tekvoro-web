import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, DollarSign, AlertCircle, Settings, LogOut, Search, Filter, MoreVertical, Check, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';

// Type definitions
interface User {
  id: string;
  name?: string;
  email: string;
  status?: 'active' | 'suspended';
  created_at: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  status: 'pending' | 'published' | 'rejected';
  created_at: string;
}

interface AnalyticsData {
  chartData: Array<{ date: string; events: number; users: number }>;
  totalEvents: number;
  totalUsers: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    chartData: [],
    totalEvents: 0,
    totalUsers: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data for development - replace with API calls when backend is ready
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          status: 'active',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'active',
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          status: 'suspended',
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'AI Breakthrough in Healthcare',
          summary: 'New AI models show promising results in medical diagnosis',
          source: 'TechCrunch',
          status: 'pending',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Cloud Computing Trends 2026',
          summary: 'Enterprise trends in cloud infrastructure and security',
          source: 'Business Standard',
          status: 'pending',
          created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
        }
      ];

      setUsers(mockUsers);
      setArticles(mockArticles);

      // Generate mock analytics data
      const mockAnalyticsData = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        events: Math.floor(Math.random() * 100) + 50,
        users: Math.floor(Math.random() * 30) + 10
      }));

      setAnalytics({
        chartData: mockAnalyticsData,
        totalEvents: mockAnalyticsData.reduce((sum, d) => sum + d.events, 0),
        totalUsers: new Set(mockAnalyticsData.map(d => d.users)).size
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate') => {
    try {
      // Update local state for now - integrate with API when backend is ready
      setUsers(users.map(user =>
        user.id === userId
          ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
          : user
      ));
      console.log(`User ${userId} ${action}d`);
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
    }
  };

  const handleArticleAction = async (articleId: string, action: 'approve' | 'reject') => {
    try {
      // Update local state for now - integrate with API when backend is ready
      setArticles(articles.map(article =>
        article.id === articleId
          ? { ...article, status: action === 'approve' ? 'published' : 'rejected' }
          : article
      ));
      console.log(`Article ${articleId} ${action}d`);
    } catch (error) {
      console.error(`Error ${action}ing article:`, error);
    }
  };

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage users, content, and platform analytics</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'content', label: 'Content Moderation', icon: AlertCircle },
            { id: 'analytics', label: 'Analytics', icon: BarChart },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-slate-400">Loading dashboard...</div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
                >
                  {[
                    { label: 'Total Users', value: users.length, icon: Users, color: 'blue' as const },
                    { label: 'Active Users', value: users.filter(u => u.status === 'active').length, icon: TrendingUp, color: 'green' as const },
                    { label: 'Pending Content', value: articles.length, icon: AlertCircle, color: 'yellow' as const },
                    { label: 'Total Events', value: analytics.totalEvents || 0, icon: DollarSign, color: 'purple' as const }
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    const colorClasses: Record<'blue' | 'green' | 'yellow' | 'purple', string> = {
                      blue: 'bg-blue-500/20 text-blue-400',
                      green: 'bg-green-500/20 text-green-400',
                      yellow: 'bg-yellow-500/20 text-yellow-400',
                      purple: 'bg-purple-500/20 text-purple-400'
                    };
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-slate-800 rounded-lg p-6 border border-slate-700"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                          </div>
                          <div className={`${colorClasses[stat.color]} p-3 rounded-lg`}>
                            <Icon size={24} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                        <Filter size={18} />
                        Filter
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-700 bg-slate-700/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">User</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Joined</th>
                          <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.slice(0, 10).map((user, i) => (
                          <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                            <td className="px-6 py-4 text-white">{user.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-slate-300">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.status === 'active'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {user.status || 'active'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400 text-sm">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-slate-400 hover:text-white transition">
                                <MoreVertical size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Content Moderation Tab */}
              {activeTab === 'content' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {articles.length === 0 ? (
                    <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                      <p className="text-slate-400">No pending content to review</p>
                    </div>
                  ) : (
                    articles.map((article, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -2 }}
                        className="bg-slate-800 rounded-lg border border-slate-700 p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">{article.summary}</p>
                            <div className="flex gap-4 text-sm text-slate-400">
                              <span>Source: {article.source}</span>
                              <span>Submitted: {new Date(article.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleArticleAction(article.id, 'approve')}
                              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => handleArticleAction(article.id, 'reject')}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" title="View">
                              <Eye size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                    <h3 className="text-xl font-bold text-white mb-6">User Activity Over Time</h3>
                    <div className="w-full h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analytics.chartData || []}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="date" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Legend />
                          <Line type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2} name="Events" />
                          <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="Active Users" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                      <h3 className="text-xl font-bold text-white mb-6">User Status Distribution</h3>
                      <div className="space-y-3">
                        {(() => {
                          const statuses = users.reduce<Record<string, number>>((acc, u) => {
                            const status = u.status || 'active';
                            acc[status] = (acc[status] || 0) + 1;
                            return acc;
                          }, {});
                          return Object.entries(statuses).map(([status, count]) => (
                            <div key={status} className="flex justify-between items-center">
                              <span className="text-slate-300 capitalize">{status}</span>
                              <div className="flex items-center gap-3">
                                <div className="w-24 bg-slate-700 rounded-full h-2">
                                  <div
                                    className={`h-full rounded-full ${
                                      status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${(count / users.length) * 100}%` }}
                                  />
                                </div>
                                <span className="text-white font-semibold text-sm">{count}</span>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                      <h3 className="text-xl font-bold text-white mb-6">Top Metrics</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Total User Accounts</p>
                          <p className="text-2xl font-bold text-white">{users.length}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Active Users</p>
                          <p className="text-2xl font-bold text-green-400">
                            {users.filter(u => u.status === 'active').length}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Content Pending Review</p>
                          <p className="text-2xl font-bold text-yellow-400">{articles.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Platform Settings</h2>
                  
                  <div className="space-y-8">
                    {/* News Sources */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">News Source Management</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Economic Times', status: 'active' },
                          { name: 'Business Standard', status: 'active' },
                          { name: 'TechCrunch', status: 'active' },
                          { name: 'YourStory', status: 'active' },
                          { name: 'Inc42', status: 'inactive' },
                          { name: 'HackerNews', status: 'active' }
                        ].map((source, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <span className="text-white">{source.name}</span>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                source.status === 'active'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {source.status}
                              </span>
                              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm">
                                Configure
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feature Flags */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Feature Flags</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Email Notifications', enabled: true },
                          { name: 'Voice Search', enabled: true },
                          { name: 'Trending News', enabled: true },
                          { name: 'AI Analysis', enabled: true },
                          { name: 'Advanced Alerts', enabled: true }
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <span className="text-white">{feature.name}</span>
                            <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                              feature.enabled ? 'bg-green-600' : 'bg-slate-600'
                            }`}>
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                feature.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                        Save Settings
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
