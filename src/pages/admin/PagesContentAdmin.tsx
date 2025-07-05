import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, Eye, Search, Filter, Calendar, User, Globe, Settings } from 'lucide-react';
import { useState } from 'react';

interface Page {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'landing';
  status: 'published' | 'draft' | 'archived';
  author: string;
  lastModified: string;
  views: number;
  seoScore: number;
}

interface Content {
  id: string;
  title: string;
  type: 'hero' | 'section' | 'component';
  page: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

export default function PagesContentAdmin() {
  const [activeTab, setActiveTab] = useState('pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const pages: Page[] = [
    { id: '1', title: 'Home', slug: '/', type: 'page', status: 'published', author: 'Admin', lastModified: '2024-04-20', views: 15420, seoScore: 92 },
    { id: '2', title: 'About Us', slug: '/about', type: 'page', status: 'published', author: 'Admin', lastModified: '2024-04-18', views: 8230, seoScore: 88 },
    { id: '3', title: 'Services', slug: '/services', type: 'page', status: 'published', author: 'Admin', lastModified: '2024-04-15', views: 12450, seoScore: 85 },
    { id: '4', title: 'AI Solutions Landing', slug: '/ai-solutions', type: 'landing', status: 'draft', author: 'Marketing', lastModified: '2024-04-19', views: 0, seoScore: 75 },
    { id: '5', title: 'Contact', slug: '/contact', type: 'page', status: 'published', author: 'Admin', lastModified: '2024-04-10', views: 5670, seoScore: 90 },
    { id: '6', title: 'Blog Post: AI Trends', slug: '/blog/ai-trends-2024', type: 'post', status: 'published', author: 'Content Team', lastModified: '2024-04-16', views: 3420, seoScore: 87 }
  ];

  const content: Content[] = [
    { id: '1', title: 'Hero Section', type: 'hero', page: 'Home', status: 'active', lastUpdated: '2024-04-20' },
    { id: '2', title: 'Services Grid', type: 'section', page: 'Services', status: 'active', lastUpdated: '2024-04-15' },
    { id: '3', title: 'Testimonials Slider', type: 'component', page: 'Home', status: 'active', lastUpdated: '2024-04-18' },
    { id: '4', title: 'Contact Form', type: 'component', page: 'Contact', status: 'active', lastUpdated: '2024-04-10' },
    { id: '5', title: 'About Team Section', type: 'section', page: 'About Us', status: 'inactive', lastUpdated: '2024-04-12' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-500';
      case 'post': return 'bg-purple-500';
      case 'landing': return 'bg-orange-500';
      case 'hero': return 'bg-indigo-500';
      case 'section': return 'bg-teal-500';
      case 'component': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || page.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
                  <FileText className="w-8 h-8 text-yellow-400" />
                  Pages & Content Management
                </h1>
                <p className="text-gray-400">Manage website pages, content sections, and components</p>
              </div>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Pages', value: pages.length, icon: FileText, color: 'from-blue-500 to-cyan-500' },
                { label: 'Published', value: pages.filter(p => p.status === 'published').length, icon: Eye, color: 'from-green-500 to-emerald-500' },
                { label: 'Drafts', value: pages.filter(p => p.status === 'draft').length, icon: Edit, color: 'from-yellow-400 to-orange-500' },
                { label: 'Content Blocks', value: content.length, icon: Settings, color: 'from-purple-500 to-pink-500' }
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
                { id: 'pages', label: 'Pages', icon: FileText },
                { id: 'content', label: 'Content Blocks', icon: Settings }
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

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Types</option>
              <option value="page">Pages</option>
              <option value="post">Posts</option>
              <option value="landing">Landing Pages</option>
            </select>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            {activeTab === 'pages' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Website Pages</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-semibold">Page</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Type</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Views</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">SEO Score</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Last Modified</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.map((page, idx) => (
                        <motion.tr
                          key={page.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-semibold text-white">{page.title}</div>
                              <div className="text-sm text-gray-400">{page.slug}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(page.type)} text-white`}>
                              {page.type}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)} text-white`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="p-4 text-white">{page.views.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="text-white font-semibold">{page.seoScore}</div>
                              <div className="w-16 bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full" 
                                  style={{ width: `${page.seoScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-400">{page.lastModified}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-400 hover:bg-white/10 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-yellow-400 hover:bg-white/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Content Blocks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.map((item, idx) => (
        <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)} text-white`}>
                          {item.type}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} text-white`}>
                          {item.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400 mb-4">Page: {item.page}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Updated: {item.lastUpdated}</span>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-400 hover:bg-white/10 rounded transition-colors">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-yellow-400 hover:bg-white/10 rounded transition-colors">
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
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