import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { Mail, Users, BarChart3, FileText, Settings, Shield, LogOut, Edit, Image, MessageSquare, Award, TrendingUp, Eye, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminSections = [
  {
    title: 'Analytics',
    description: 'Monitor website performance, user behavior, and traffic insights.',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500',
    path: '/admin/analytics',
  },
  {
    title: 'Blog Subscriptions',
    description: 'View and manage all blog subscribers and export email lists.',
    icon: <Mail className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    path: '/admin/blog-subscribers',
  },
  {
    title: 'Email Analytics',
    description: 'Track email performance, opens, clicks, and engagement metrics.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    path: '/admin/email-analytics',
  },
  {
    title: 'Email Templates',
    description: 'Create, edit, and manage beautiful email templates with tracking.',
    icon: <Mail className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    path: '/admin/email-templates',
  },
  {
    title: 'Email Campaigns',
    description: 'Send newsletters, announcements, and manage email campaigns.',
    icon: <Users className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    path: '/admin/email-campaigns',
  },
  {
    title: 'SEO Tools',
    description: 'Manage meta tags, sitemaps, and improve search engine visibility.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    path: '/admin/seo-tools',
  },
  {
    title: 'Pages & Content',
    description: 'Edit, add, or remove website pages and featured content.',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    path: '/admin/pages-content',
  },
  {
    title: 'Site Settings',
    description: 'Configure site-wide settings, integrations, and security.',
    icon: <Settings className="w-8 h-8" />,
    color: 'from-red-500 to-yellow-500',
    path: '/admin/site-settings',
  },
  {
    title: 'Security',
    description: 'Manage admin users, roles, and security logs.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-gray-700 to-gray-900',
    path: '/admin/security',
  },
  {
    title: 'Content Editor',
    description: 'Rich text editor for creating and editing content blocks.',
    icon: <Edit className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500',
    path: '/admin/content',
  },
  {
    title: 'Blog Manager',
    description: 'Create, edit, and manage blog posts and categories.',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-teal-500 to-cyan-500',
    path: '/admin/blog',
  },
  {
    title: 'Portfolio Manager',
    description: 'Manage project portfolio, case studies, and client work.',
    icon: <Image className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500',
    path: '/admin/portfolio',
  },
  {
    title: 'Contact Submissions',
    description: 'View and manage contact form submissions and inquiries.',
    icon: <MessageSquare className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    path: '/admin/contacts',
  },
  {
    title: 'Testimonials',
    description: 'Manage client testimonials and reviews.',
    icon: <Award className="w-8 h-8" />,
    color: 'from-emerald-500 to-green-500',
    path: '/admin/testimonials',
  },
];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">Loading...</div>
    );
  }

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Tekvoro Technologies Admin Dashboard"
        noIndex={true}
      />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-24 px-4">
          <div className="container-custom relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-black tracking-tight mb-10 text-center"
            >
              Admin Dashboard
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {adminSections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${section.color} bg-clip-padding backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden shadow-xl`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-white/10 text-white group-hover:scale-110 transition-transform duration-300">
                        {section.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-100 leading-relaxed mb-6">
                      {section.description}
                    </p>
                    <button
                      className="inline-flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
                      onClick={() => navigate(section.path)}
                    >
                      Manage
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-16">
              <button onClick={handleLogout} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold hover:bg-gray-700 transition-all">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;