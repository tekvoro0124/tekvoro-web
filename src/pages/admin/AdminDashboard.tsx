import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Mail, Users, BarChart3, FileText, Settings, Shield, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import BlogSubscribersAdmin from './BlogSubscribersAdmin';

const adminSections = [
  {
    title: 'Blog Subscriptions',
    description: 'View and manage all blog subscribers and export email lists.',
    icon: <Mail className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    path: '/admin/blog-subscribers',
  },
  {
    title: 'Email Campaigns',
    description: 'Send newsletters, announcements, and manage email templates.',
    icon: <Users className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
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
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setLoading(false);
      }
    });
    // Listen for logout/login in other tabs
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate('/admin/login');
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">Loading...</div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-24">
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
          <BlogSubscribersAdmin />
          <div className="flex justify-center mt-16">
            <button onClick={handleLogout} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold hover:bg-gray-700 transition-all">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}