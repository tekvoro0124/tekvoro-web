import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Mail, Plus, Users, Send, BarChart3, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  scheduledDate?: string;
  sentDate?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q2 Product Launch',
    subject: 'Introducing Our New AI Solutions',
    status: 'sent',
    recipients: 2500,
    sent: 2487,
    opened: 1243,
    clicked: 312,
    sentDate: '2024-04-15'
  },
  {
    id: '2',
    name: 'Monthly Newsletter',
    subject: 'Tekvoro Tech Insights - May 2024',
    status: 'scheduled',
    recipients: 3200,
    sent: 0,
    opened: 0,
    clicked: 0,
    scheduledDate: '2024-05-01'
  },
  {
    id: '3',
    name: 'Client Success Story',
    subject: 'How We Helped XYZ Corp Save 60%',
    status: 'draft',
    recipients: 0,
    sent: 0,
    opened: 0,
    clicked: 0
  }
];

export default function EmailCampaignsAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'Sent';
      case 'scheduled': return 'Scheduled';
      case 'draft': return 'Draft';
      case 'paused': return 'Paused';
      default: return status;
    }
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
                  <Mail className="w-8 h-8 text-yellow-400" />
                  Email Campaigns
                </h1>
                <p className="text-gray-400">Manage and track your email marketing campaigns</p>
              </div>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Campaign
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Campaigns', value: campaigns.length, icon: Mail, color: 'from-blue-500 to-cyan-500' },
                { label: 'Active Subscribers', value: '12,847', icon: Users, color: 'from-green-500 to-emerald-500' },
                { label: 'Avg Open Rate', value: '24.8%', icon: Eye, color: 'from-purple-500 to-pink-500' },
                { label: 'Avg Click Rate', value: '3.2%', icon: BarChart3, color: 'from-yellow-400 to-orange-500' }
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

          {/* Campaigns Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-semibold">Campaign</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Recipients</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Opened</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Clicked</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Date</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, idx) => (
                    <motion.tr
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-white">{campaign.name}</div>
                          <div className="text-sm text-gray-400">{campaign.subject}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)} text-white`}>
                          {getStatusText(campaign.status)}
                        </span>
                      </td>
                      <td className="p-4 text-white">{campaign.recipients.toLocaleString()}</td>
                      <td className="p-4 text-white">{campaign.opened.toLocaleString()}</td>
                      <td className="p-4 text-white">{campaign.clicked.toLocaleString()}</td>
                      <td className="p-4 text-gray-400">
                        {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString() : 
                         campaign.scheduledDate ? new Date(campaign.scheduledDate).toLocaleDateString() : '-'}
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