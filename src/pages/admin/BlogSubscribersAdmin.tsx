import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Users, Download, Search, Mail, Calendar, Trash2, Edit, Eye } from 'lucide-react';
import { useState } from 'react';

export default function BlogSubscribersAdmin() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockSubscribers = [
    { id: '1', email: 'john.doe@example.com', name: 'John Doe', status: 'active', subscribedDate: '2024-01-15', tags: ['tech', 'ai'] },
    { id: '2', email: 'jane.smith@company.com', name: 'Jane Smith', status: 'active', subscribedDate: '2024-02-03', tags: ['cloud', 'enterprise'] },
    { id: '3', email: 'bob.wilson@startup.io', name: 'Bob Wilson', status: 'unsubscribed', subscribedDate: '2024-01-20', tags: ['startup'] },
  ];

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Name', 'Status', 'Subscribed Date', 'Tags'].join(','),
      ...mockSubscribers.map(sub => [
        sub.email,
        sub.name,
        sub.status,
        sub.subscribedDate,
        sub.tags.join(';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
                  <Users className="w-8 h-8 text-yellow-400" />
                  Blog Subscribers
                </h1>
                <p className="text-gray-400">Manage your blog subscribers and email lists</p>
              </div>
                <button
                onClick={exportSubscribers}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Subscribers', value: mockSubscribers.length, icon: Users, color: 'from-blue-500 to-cyan-500' },
                { label: 'Active', value: mockSubscribers.filter(s => s.status === 'active').length, icon: Mail, color: 'from-green-500 to-emerald-500' },
                { label: 'Unsubscribed', value: mockSubscribers.filter(s => s.status === 'unsubscribed').length, icon: Trash2, color: 'from-red-500 to-pink-500' },
                { label: 'This Month', value: 5, icon: Calendar, color: 'from-purple-500 to-pink-500' }
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

          {/* Subscribers Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Subscribers ({mockSubscribers.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-semibold">Subscriber</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Subscribed</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Tags</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSubscribers.map((subscriber, idx) => (
                    <motion.tr
                      key={subscriber.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-white">{subscriber.name}</div>
                          <div className="text-sm text-gray-400">{subscriber.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          subscriber.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">
                        {new Date(subscriber.subscribedDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {subscriber.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      </div>
  );
} 