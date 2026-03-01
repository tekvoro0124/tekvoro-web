// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Edit2, Trash2, Save, X, ArrowLeft,
  Linkedin, Twitter, Mail, Star, AlertCircle, CheckCircle,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  featured: boolean;
  order: number;
}

const defaultMember: TeamMember = {
  name: '',
  role: '',
  bio: '',
  image: '',
  email: '',
  linkedin: '',
  twitter: '',
  featured: false,
  order: 0,
};

// Static team data (to be replaced with API when backend model is created)
const initialTeamData: TeamMember[] = [
  {
    _id: '1',
    name: 'Meera Krishnamurthy',
    role: 'Chief Executive Officer',
    bio: 'Meera leads Tekvoro with 20+ years of experience in enterprise technology transformation. Previously SVP at major tech companies.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    name: 'Rajesh Patel',
    role: 'Chief Technology Officer',
    bio: 'Rajesh oversees all technology initiatives with expertise in AI/ML, cloud architecture, and scalable systems.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
    linkedin: 'https://linkedin.com',
    featured: true,
    order: 2,
  },
  {
    _id: '3',
    name: 'Ananya Rao',
    role: 'VP of Engineering',
    bio: 'Ananya leads our engineering teams, driving technical excellence and innovation across all product lines.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    linkedin: 'https://linkedin.com',
    featured: true,
    order: 3,
  },
];

export default function TeamManager() {
  const { token } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>(initialTeamData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamMember>(defaultMember);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/team`);
      if (response.ok) {
        const data = await response.json();
        if (data.members?.length > 0) {
          setMembers(data.members);
        }
      }
    } catch (err) {
      // Use initial data if API fails
      console.log('Using initial team data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(member);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({ ...defaultMember, order: members.length + 1 });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role) {
      setError('Name and role are required');
      return;
    }

    try {
      setLoading(true);
      const method = editingMember ? 'PUT' : 'POST';
      const url = editingMember
        ? `${apiUrl}/api/admin/team/${editingMember._id}`
        : `${apiUrl}/api/admin/team`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingMember) {
          setMembers(prev => prev.map(m => m._id === editingMember._id ? data.member : m));
        } else {
          setMembers(prev => [...prev, { ...formData, _id: Date.now().toString() }]);
        }
        setSuccess('Team member saved successfully');
      } else {
        // Local update for demo
        if (editingMember) {
          setMembers(prev => prev.map(m => m._id === editingMember._id ? formData : m));
        } else {
          setMembers(prev => [...prev, { ...formData, _id: Date.now().toString() }]);
        }
        setSuccess('Team member saved locally');
      }

      setShowForm(false);
      setFormData(defaultMember);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete this team member?')) return;

    try {
      await fetch(`${apiUrl}/api/admin/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      setMembers(prev => prev.filter(m => m._id !== id));
      setSuccess('Team member deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      // Local delete
      setMembers(prev => prev.filter(m => m._id !== id));
      setSuccess('Team member removed');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const toggleFeatured = (id?: string) => {
    if (!id) return;
    setMembers(prev => prev.map(m => 
      m._id === id ? { ...m, featured: !m.featured } : m
    ));
  };

  return (
    <>
      <SEO title="Team Manager | Tekvoro Admin" />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="text-3xl font-black text-white flex items-center gap-3">
                  <Users className="w-8 h-8 text-yellow-400" />
                  Leadership Team
                </h1>
                <p className="text-gray-400">Manage team members and leadership profiles</p>
              </div>
            </div>
            <motion.button
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </motion.button>
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
                <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.sort((a, b) => a.order - b.order).map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  {member.featured && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded bg-yellow-400 text-black text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-yellow-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{member.bio}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-400 transition">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(member)}
                      className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFeatured(member._id)}
                      className={`p-2 rounded-lg ${member.featured ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-400'}`}
                    >
                      <Star className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(member._id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={() => setShowForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-xl p-6 max-h-[90vh] overflow-y-auto"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Role *</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="e.g., Chief Executive Officer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none resize-none"
                        placeholder="Brief biography..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">LinkedIn</label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Twitter</label>
                        <input
                          type="url"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="email@tekvoro.com"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <label htmlFor="featured" className="text-sm text-white">Featured on homepage</label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={handleSave}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Saving...' : 'Save'}
                    </motion.button>
                    <motion.button
                      onClick={() => setShowForm(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
