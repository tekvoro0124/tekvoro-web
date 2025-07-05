import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Users, TrendingUp, BarChart3, Download, Eye, Search, RefreshCw, LogOut } from 'lucide-react';
import { getAllCampaigns } from '../../data/campaigns';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';

const CampaignsIndexPage = () => {
  const campaigns = getAllCampaigns();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Track page view
    console.log('CampaignsIndexPage mounted');
  }, []);

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || campaign.date?.includes(filterStatus);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'performance':
          return parseInt(b.results[0]?.value.replace(/[^\d]/g, '') || '0') - 
                 parseInt(a.results[0]?.value.replace(/[^\d]/g, '') || '0');
        default:
          return 0;
      }
    });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleDownloadReport = (campaignId: string) => {
    console.log('Downloading report for campaign:', campaignId);
    // Implement actual download logic
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.date?.includes('2024')).length;
  const totalTeamMembers = campaigns.reduce((sum, c) => sum + c.team.length, 0);

  return (
    <>
      <SEO
        title="Marketing Campaigns - Internal"
        description="Internal marketing campaign management dashboard"
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <Navbar />
        
        {/* Floating Logout Button */}
        <div className="fixed top-24 right-4 z-50">
          <button 
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 border-2 border-red-400 shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
        
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Marketing Campaigns
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Internal marketing campaign management and analytics dashboard for Tekvoro Technologies
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Internal Access Only</span>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Real-time Analytics</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Campaigns</p>
                  <p className="text-3xl font-bold text-white">{totalCampaigns}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Campaigns</p>
                  <p className="text-3xl font-bold text-white">{activeCampaigns}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Team Members</p>
                  <p className="text-3xl font-bold text-white">{totalTeamMembers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Status</option>
                <option value="2024">2024 Campaigns</option>
                <option value="Q1">Q1 2024</option>
                <option value="Q2">Q2 2024</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="performance">Sort by Performance</option>
              </select>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </motion.div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{campaign.summary}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    Active
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{campaign.results[0]?.value || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{campaign.results[0]?.label || 'Metric'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{campaign.results[1]?.value || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{campaign.results[1]?.label || 'Metric'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{campaign.results[2]?.value || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{campaign.results[2]?.label || 'Metric'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{campaign.results[3]?.value || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{campaign.results[3]?.label || 'Metric'}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.date || 'Ongoing'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{campaign.team.length} Team Members</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/marketing/campaign/${campaign.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleDownloadReport(campaign.id)}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-300"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCampaigns.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-lg mb-4">No campaigns found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/marketing/ai-campaign-insights"
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="bg-white/20 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Campaign Insights</h3>
                  <p className="text-sm opacity-90">Advanced analytics and AI-powered insights</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/admin/email-campaigns"
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Campaigns</h3>
                  <p className="text-sm opacity-90">Manage email marketing campaigns</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/admin/analytics"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="bg-white/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Analytics Dashboard</h3>
                  <p className="text-sm opacity-90">Comprehensive performance metrics</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CampaignsIndexPage; 