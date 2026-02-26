import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  email: string;
  priority: string;
  category: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function TicketManager() {
  const { isAdmin } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterStatus, setFilterStatus] = useState('open');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchTickets();
  }, [filterStatus, filterCategory]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('tekvoro_auth_token');
      const params = new URLSearchParams();
      
      if (filterStatus) params.append('status', filterStatus);
      if (filterCategory) params.append('category', filterCategory);

      const response = await fetch(`/api/tickets?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data = await response.json();
      setTickets(data.tickets || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('tekvoro_auth_token');
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }

      fetchTickets();
      setSelectedTicket(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket');
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const token = localStorage.getItem('tekvoro_auth_token');
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }

      fetchTickets();
      setSelectedTicket(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete ticket');
    }
  };

  const getPriorityColor = (priority: string): string => {
    const colors: Record<string, string> = {
      critical: 'text-red-600 bg-red-100',
      high: 'text-orange-600 bg-orange-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-green-600 bg-green-100'
    };
    return colors[priority] || 'text-gray-600 bg-gray-100';
  };

  const getStatusIcon = (status: string) => {
    return status === 'resolved' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
  };

  if (!isAdmin) {
    return <div className="p-8 text-red-600">Admin access required</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Ticket Management</h1>

          {error && (
            <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="feature-request">Feature Request</option>
              <option value="general">General</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No tickets found</div>
          ) : (
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <motion.div
                  key={ticket._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{ticket.description.substring(0, 100)}...</p>
                      <div className="flex gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                          {ticket.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-200 flex items-center gap-1">
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTicket(ticket._id);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedTicket(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedTicket.title}</h2>
              <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-gray-400">Status</label>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => updateTicketStatus(selectedTicket._id, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg mt-2"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400">Email</label>
                <p className="text-white">{selectedTicket.email}</p>
              </div>

              <div>
                <label className="text-gray-400">Description</label>
                <p className="text-white">{selectedTicket.description}</p>
              </div>

              <div>
                <label className="text-gray-400">Priority</label>
                <p className={`text-white ${getPriorityColor(selectedTicket.priority)}`}>{selectedTicket.priority}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
