// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Search, Filter, Eye, Trash2, CheckCircle, Clock, AlertCircle, MessageSquare, RefreshCw, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface SupportTicket {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category?: string;
  createdAt: string;
  updatedAt?: string;
  assignedTo?: string;
  responses?: { message: string; author: string; date: string }[];
}

function SupportManager() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [responseText, setResponseText] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/admin/support-tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data.data || []);
      } else {
        // Fallback to contacts filtered by subject containing "support"
        const contactResponse = await fetch(`${apiUrl}/api/admin/contacts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          const supportTickets = (contactData.data || []).filter((c: any) =>
            c.subject?.toLowerCase().includes('support') || 
            c.subject?.toLowerCase().includes('help') ||
            c.type === 'support'
          ).map((c: any) => ({
            ...c,
            priority: 'medium',
            status: c.status || 'open'
          }));
          setTickets(supportTickets);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/support-tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setSuccess(`Ticket marked as ${status}`);
        fetchTickets();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTicket = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try {
      const response = await fetch(`${apiUrl}/api/admin/support-tickets/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccess('Ticket deleted successfully');
        fetchTickets();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusColors = {
    open: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
    closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  const priorityColors = {
    low: 'bg-gray-500/20 text-gray-400',
    medium: 'bg-blue-500/20 text-blue-400',
    high: 'bg-orange-500/20 text-orange-400',
    urgent: 'bg-red-500/20 text-red-400',
  };

  return (
    <>
      <SEO title="Support Center | Admin CMS" description="Manage support tickets and client requests" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Support Center
              </h1>
              <p className="text-gray-400 mt-1">Manage support tickets and client requests</p>
            </div>
            <button
              onClick={fetchTickets}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {(success || error) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-6 p-4 rounded-lg ${success ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}
              >
                {success || error}
                <button onClick={() => { setSuccess(''); setError(''); }} className="float-right">&times;</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-rose-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Tickets', value: tickets.length, color: 'text-white' },
              { label: 'Open', value: tickets.filter(t => t.status === 'open').length, color: 'text-yellow-400' },
              { label: 'In Progress', value: tickets.filter(t => t.status === 'in-progress').length, color: 'text-blue-400' },
              { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, color: 'text-green-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tickets List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Headphones className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No support tickets found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[ticket.status] || statusColors.open}`}>
                          {ticket.status || 'open'}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[ticket.priority] || priorityColors.medium}`}>
                          {ticket.priority || 'medium'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        From: {ticket.name} ({ticket.email})
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-2">{ticket.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Created: {new Date(ticket.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </button>
                      {ticket.status === 'open' && (
                        <button
                          onClick={() => updateTicketStatus(ticket._id, 'in-progress')}
                          className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all"
                          title="Mark In Progress"
                        >
                          <Clock className="w-4 h-4 text-blue-400" />
                        </button>
                      )}
                      {ticket.status === 'in-progress' && (
                        <button
                          onClick={() => updateTicketStatus(ticket._id, 'resolved')}
                          className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all"
                          title="Mark Resolved"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteTicket(ticket._id)}
                        className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedTicket(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{selectedTicket.subject}</h2>
                  <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-white">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[selectedTicket.status]}`}>
                      {selectedTicket.status}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[selectedTicket.priority]}`}>
                      {selectedTicket.priority} priority
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400">From: <span className="text-white">{selectedTicket.name}</span></p>
                    <p className="text-gray-400">Email: <span className="text-white">{selectedTicket.email}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Message:</p>
                    <p className="text-white bg-white/5 p-4 rounded-lg whitespace-pre-wrap">{selectedTicket.message}</p>
                  </div>
                  <p className="text-xs text-gray-500">Submitted: {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedTicket.email}?subject=Re: ${selectedTicket.subject}`}
                    className="px-4 py-2 bg-rose-500 rounded-lg hover:bg-rose-600 transition-all"
                  >
                    Reply via Email
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default SupportManager;
