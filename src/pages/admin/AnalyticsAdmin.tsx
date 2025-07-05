import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Globe, Calendar, Download } from 'lucide-react';
import { useState } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number; change: number }>;
  trafficSources: Array<{ source: string; percentage: number; visitors: number }>;
  deviceTypes: Array<{ device: string; percentage: number; sessions: number }>;
}

export default function AnalyticsAdmin() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const analyticsData: AnalyticsData = {
    pageViews: 45620,
    uniqueVisitors: 12340,
    bounceRate: 42.3,
    avgSessionDuration: 245,
    topPages: [
      { page: '/', views: 15420, change: 12.5 },
      { page: '/services', views: 12450, change: 8.2 },
      { page: '/about', views: 8230, change: -2.1 },
      { page: '/contact', views: 5670, change: 15.7 },
      { page: '/blog', views: 4850, change: 23.4 }
    ],
    trafficSources: [
      { source: 'Organic Search', percentage: 45, visitors: 5553 },
      { source: 'Direct', percentage: 28, visitors: 3455 },
      { source: 'Social Media', percentage: 15, visitors: 1851 },
      { source: 'Referral', percentage: 8, visitors: 988 },
      { source: 'Email', percentage: 4, visitors: 493 }
    ],
    deviceTypes: [
      { device: 'Desktop', percentage: 52, sessions: 6417 },
      { device: 'Mobile', percentage: 41, sessions: 5059 },
      { device: 'Tablet', percentage: 7, sessions: 864 }
    ]
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-yellow-400" />
                  Analytics Dashboard
                </h1>
                <p className="text-gray-400">Monitor website performance and user behavior</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Page Views', value: analyticsData.pageViews.toLocaleString(), icon: Eye, color: 'from-blue-500 to-cyan-500', change: '+12.5%' },
                { label: 'Unique Visitors', value: analyticsData.uniqueVisitors.toLocaleString(), icon: Users, color: 'from-green-500 to-emerald-500', change: '+8.2%' },
                { label: 'Bounce Rate', value: `${analyticsData.bounceRate}%`, icon: TrendingUp, color: 'from-yellow-400 to-orange-500', change: '-2.1%' },
                { label: 'Avg. Session', value: formatDuration(analyticsData.avgSessionDuration), icon: MousePointer, color: 'from-purple-500 to-pink-500', change: '+5.3%' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg p-1.5 text-white`} />
                    <span className="text-sm text-green-400 font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'pages', label: 'Top Pages', icon: Eye },
                { id: 'sources', label: 'Traffic Sources', icon: Globe },
                { id: 'devices', label: 'Devices', icon: MousePointer }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            {activeTab === 'overview' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Analytics Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-4">Traffic Trends</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Page Views</span>
                        <span className="text-white font-semibold">+12.5%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Unique Visitors</span>
                        <span className="text-white font-semibold">+8.2%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-4">Engagement Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Bounce Rate</span>
                        <span className="text-white font-semibold">42.3%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Avg. Session Duration</span>
                        <span className="text-white font-semibold">4m 5s</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Top Pages</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-semibold">Page</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Page Views</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Change</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.topPages.map((page, idx) => (
                        <motion.tr
                          key={page.page}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-semibold text-white">{page.page}</div>
                          </td>
                          <td className="p-4 text-white">{page.views.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`font-semibold ${page.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {page.change >= 0 ? '+' : ''}{page.change}%
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="w-24 bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${(page.views / analyticsData.pageViews) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'sources' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Traffic Sources</h3>
                <div className="space-y-4">
                  {analyticsData.trafficSources.map((source, idx) => (
                    <motion.div
                      key={source.source}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{source.source}</span>
                        <span className="text-gray-400">{source.visitors.toLocaleString()} visitors</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white/10 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400 w-12 text-right">{source.percentage}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Device Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {analyticsData.deviceTypes.map((device, idx) => (
                    <motion.div
                      key={device.device}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white/5 rounded-xl p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-white mb-2">{device.percentage}%</div>
                      <div className="text-gray-400 mb-4">{device.device}</div>
                      <div className="text-sm text-gray-500">{device.sessions.toLocaleString()} sessions</div>
                      <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 