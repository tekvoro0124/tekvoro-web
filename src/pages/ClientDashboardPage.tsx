import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
  BarChart3,
  FolderOpen,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  LogOut,
  Settings
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalInvested: number;
  nextMilestone: {
    name: string;
    dueDate: string;
    project: string;
  } | null;
  recentActivity: Array<{
    type: string;
    message: string;
    date: string;
    project: string;
  }>;
}

export default function ClientDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    if (!token) {
      navigate('/portal');
      return;
    }

    fetchDashboardData(token);
    fetchProjects(token);
  }, [navigate]);

  const fetchDashboardData = async (token: string) => {
    try {
      const response = await fetch('/api/portal/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else if (response.status === 401) {
        localStorage.removeItem('clientToken');
        navigate('/portal');
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      setError('Network error loading dashboard');
    }
  };

  const fetchProjects = async (token: string) => {
    try {
      const response = await fetch('/api/portal/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientUser');
    navigate('/portal');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
          <div className="container-custom relative z-10">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Client Dashboard - Tekvoro Technologies"
        description="Manage your projects, view progress, and access all your client resources in one place."
        keywords="client dashboard, project management, client portal, Tekvoro projects"
        canonical="https://www.tekvoro.com/portal/dashboard"
      />
      <Navbar />

      {/* Header */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white py-20">
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Client Dashboard</h1>
              <p className="text-gray-300">Welcome back! Here's your project overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/portal/settings"
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      {stats && (
        <section className="py-12 bg-neutral-900">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <FolderOpen className="w-8 h-8 text-blue-400" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.totalProjects}</h3>
                <p className="text-gray-400 text-sm">Total Projects</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.activeProjects}</h3>
                <p className="text-gray-400 text-sm">Active Projects</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.totalInvested)}</h3>
                <p className="text-gray-400 text-sm">Total Invested</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.completedProjects}</h3>
                <p className="text-gray-400 text-sm">Completed</p>
              </motion.div>
            </div>

            {/* Next Milestone */}
            {stats.nextMilestone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Next Milestone</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{stats.nextMilestone.name}</p>
                    <p className="text-gray-400 text-sm">{stats.nextMilestone.project}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-medium">{formatDate(stats.nextMilestone.dueDate)}</p>
                    <p className="text-gray-400 text-sm">Due date</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Projects and Activity */}
      <section className="py-12 bg-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Your Projects</h2>
                <Link
                  to="/portal/projects"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
                >
                  View All →
                </Link>
              </div>

              {projects.slice(0, 3).map((project, index) => (
                <div
                  key={project.id}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.priority === 'HOT' ? 'bg-red-500/20 text-red-400' :
                      project.priority === 'WARM' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {project.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>Progress: {project.progress}%</span>
                    <span>{project.status}</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>

                  <Link
                    to={`/portal/project/${project.id}`}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center py-8">
                  <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No projects yet. Your projects will appear here once they're set up.</p>
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>

              {stats?.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm mb-1">{activity.message}</p>
                      <p className="text-gray-400 text-xs">{activity.project}</p>
                      <p className="text-gray-500 text-xs mt-1">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No recent activity. Activity will appear here as your projects progress.</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/portal/support"
                  className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/50 transition-colors text-center"
                >
                  <MessageSquare className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">Get Support</p>
                </Link>

                <Link
                  to="/portal/files"
                  className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/50 transition-colors text-center"
                >
                  <FileText className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">View Files</p>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {error && (
        <div className="fixed bottom-4 right-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-sm">
          {error}
        </div>
      )}

      <Footer />
    </>
  );
}
