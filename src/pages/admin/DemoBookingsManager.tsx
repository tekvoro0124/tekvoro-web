// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Building, CheckCircle, XCircle, Eye, Trash2, Search, Filter, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface DemoBooking {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

function DemoBookingsManager() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<DemoBooking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/admin/demo-bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data.data || []);
      } else {
        // Fallback to contact submissions filtered by type
        const contactResponse = await fetch(`${apiUrl}/api/admin/contacts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          const demoRequests = (contactData.data || []).filter((c: any) => 
            c.subject?.toLowerCase().includes('demo') || c.type === 'demo'
          );
          setBookings(demoRequests);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/demo-bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setSuccess(`Booking ${status} successfully`);
        fetchBookings();
        setSelectedBooking(null);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`${apiUrl}/api/admin/demo-bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccess('Booking deleted successfully');
        fetchBookings();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <>
      <SEO title="Demo Bookings | Admin CMS" description="Manage demo booking requests" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Demo Bookings
              </h1>
              <p className="text-gray-400 mt-1">Manage demo booking requests from potential clients</p>
            </div>
            <button
              onClick={fetchBookings}
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
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: bookings.length, color: 'text-white' },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-yellow-400' },
              { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-blue-400' },
              { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: 'text-green-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bookings Table */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No demo bookings found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{booking.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[booking.status] || statusColors.pending}`}>
                          {booking.status || 'pending'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{booking.email}</span>
                        {booking.company && <span className="flex items-center gap-1"><Building className="w-4 h-4" />{booking.company}</span>}
                        {booking.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{booking.phone}</span>}
                      </div>
                      {booking.preferredDate && (
                        <p className="text-sm text-blue-400 mt-2 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.preferredDate} {booking.preferredTime && `at ${booking.preferredTime}`}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </button>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                          className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all"
                          title="Confirm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(booking._id, 'completed')}
                          className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all"
                          title="Mark Complete"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(booking._id)}
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
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-gray-900 rounded-xl p-6 max-w-lg w-full border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold text-white mb-4">Booking Details</h2>
                <div className="space-y-3">
                  <p><span className="text-gray-400">Name:</span> <span className="text-white">{selectedBooking.name}</span></p>
                  <p><span className="text-gray-400">Email:</span> <span className="text-white">{selectedBooking.email}</span></p>
                  {selectedBooking.phone && <p><span className="text-gray-400">Phone:</span> <span className="text-white">{selectedBooking.phone}</span></p>}
                  {selectedBooking.company && <p><span className="text-gray-400">Company:</span> <span className="text-white">{selectedBooking.company}</span></p>}
                  {selectedBooking.jobTitle && <p><span className="text-gray-400">Job Title:</span> <span className="text-white">{selectedBooking.jobTitle}</span></p>}
                  {selectedBooking.preferredDate && <p><span className="text-gray-400">Preferred Date:</span> <span className="text-white">{selectedBooking.preferredDate}</span></p>}
                  {selectedBooking.preferredTime && <p><span className="text-gray-400">Preferred Time:</span> <span className="text-white">{selectedBooking.preferredTime}</span></p>}
                  {selectedBooking.message && (
                    <div>
                      <p className="text-gray-400 mb-1">Message:</p>
                      <p className="text-white bg-white/5 p-3 rounded-lg">{selectedBooking.message}</p>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">Submitted: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedBooking.email}?subject=Re: Demo Booking Request`}
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Send Email
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

export default DemoBookingsManager;
