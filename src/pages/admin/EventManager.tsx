import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Users, MapPin, Trash2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  date: string;
  time?: string;
  location: {
    isVirtual: boolean;
    meetingLink?: string;
  };
  registered: number;
  capacity: number;
}

export default function EventManager() {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'webinar',
    date: '',
    time: '',
    location: { isVirtual: true, meetingLink: '' },
    capacity: 100
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data.events || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tekvoro_auth_token');
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create event');

      setFormData({
        title: '',
        description: '',
        eventType: 'webinar',
        date: '',
        time: '',
        location: { isVirtual: true, meetingLink: '' },
        capacity: 100
      });
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!window.confirm('Delete this event?')) return;

    try {
      const token = localStorage.getItem('tekvoro_auth_token');
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete event');
      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  const getEventTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      webinar: 'bg-blue-900 text-blue-200',
      meetup: 'bg-green-900 text-green-200',
      hackathon: 'bg-purple-900 text-purple-200',
      workshop: 'bg-orange-900 text-orange-200',
      conference: 'bg-red-900 text-red-200'
    };
    return colors[type] || 'bg-gray-700 text-gray-200';
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
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Events Management</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
            >
              <Plus className="w-5 h-5" />
              New Event
            </button>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                />

                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  >
                    <option value="webinar">Webinar</option>
                    <option value="meetup">Meetup</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                  </select>

                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>

                <input
                  type="number"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.location.isVirtual}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, isVirtual: e.target.checked }
                      })
                    }
                  />
                  <label>Virtual Event</label>
                </div>

                {formData.location.isVirtual && (
                  <input
                    type="text"
                    placeholder="Meeting Link (e.g., Zoom URL)"
                    value={formData.location.meetingLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, meetingLink: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No events found</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-500 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                        {event.eventType}
                      </span>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{event.description.substring(0, 80)}...</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4" />
                        {event.registered}/{event.capacity} registered
                      </div>
                      {event.location.isVirtual && (
                        <div className="flex items-center gap-2 text-blue-300">
                          <MapPin className="w-4 h-4" />
                          Virtual
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
