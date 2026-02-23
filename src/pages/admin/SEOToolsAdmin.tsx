import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Search, BarChart3, Globe, TrendingUp, FileText, Download, Edit } from 'lucide-react';
import { useState } from 'react';

export default function SEOToolsAdmin() {
  const [activeTab, setActiveTab] = useState('overview');

  const seoData = {
    score: 87,
    pages: 24,
    keywords: 156,
    backlinks: 1247,
    organicTraffic: '12.4K',
    monthlyGrowth: '+8.2%'
  };

  const pages = [
    { url: '/', title: 'Home', score: 92, keywords: 15, traffic: '2.1K' },
    { url: '/services', title: 'Services', score: 88, keywords: 23, traffic: '1.8K' },
    { url: '/about', title: 'About Us', score: 85, keywords: 12, traffic: '1.2K' },
    { url: '/contact', title: 'Contact', score: 90, keywords: 8, traffic: '980' }
  ];

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
                  <Search className="w-8 h-8 text-yellow-400" />
                  SEO Tools
                </h1>
                <p className="text-gray-400">Manage meta tags, sitemaps, and improve search visibility</p>
              </div>
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Generate Sitemap
              </button>
            </div>

            {/* SEO Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">SEO Health Score</h2>
                  <p className="text-gray-400">Overall website SEO performance</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white mb-1">{seoData.score}/100</div>
                  <div className="text-sm text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +5 points this month
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${seoData.score}%` }}
                ></div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Pages Indexed', value: seoData.pages, icon: FileText },
                  { label: 'Keywords', value: seoData.keywords, icon: Search },
                  { label: 'Backlinks', value: seoData.backlinks.toLocaleString(), icon: Globe },
                  { label: 'Organic Traffic', value: seoData.organicTraffic, icon: BarChart3 }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
              {['overview', 'pages', 'keywords', 'sitemap'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                <h3 className="text-xl font-bold text-white mb-4">SEO Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-3">Top Issues</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        3 pages missing meta descriptions
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        2 pages have slow loading times
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        All pages have proper H1 tags
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-3">Recent Improvements</h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-300">✓ Added structured data markup</li>
                      <li className="text-sm text-gray-300">✓ Optimized image alt tags</li>
                      <li className="text-sm text-gray-300">✓ Improved page load speed</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Page Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-semibold">Page</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">SEO Score</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Keywords</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Traffic</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pages.map((page, idx) => (
                        <motion.tr
                          key={page.url}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-semibold text-white">{page.title}</div>
                              <div className="text-sm text-gray-400">{page.url}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                  style={{ width: `${page.score}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm">{page.score}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white">{page.keywords}</td>
                          <td className="p-4 text-white">{page.traffic}</td>
                          <td className="p-4">
                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'keywords' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Keyword Tracking</h3>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 mb-4">Track your target keywords and their rankings</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-lg font-bold text-white mb-1">156</div>
                      <div className="text-sm text-gray-400">Tracked Keywords</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-lg font-bold text-white mb-1">23</div>
                      <div className="text-sm text-gray-400">Top 10 Rankings</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-lg font-bold text-white mb-1">+12</div>
                      <div className="text-sm text-gray-400">New Rankings</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sitemap' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Sitemap Management</h3>
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white mb-1">XML Sitemap</h4>
                      <p className="text-sm text-gray-400">Last updated: 2 days ago</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                      Regenerate
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total URLs:</span>
                      <span className="text-white">24</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Indexed by Google:</span>
                      <span className="text-white">22</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Sitemap URL:</span>
                      <span className="text-blue-400">https://tekvoro.com/sitemap.xml</span>
                    </div>
                  </div>
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