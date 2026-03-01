// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, LogOut, FileText, Users, Mail, Calendar, Newspaper, 
  Building, Star, Globe, Settings, BarChart2, Shield, Send,
  MessageSquare, Image, TrendingUp, Headphones,
  UserCheck, ArrowRight, Plus, Eye, Edit, CalendarCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

interface ManagementSection {
  title: string;
  description: string;
  icon: any;
  path: string;
  color: string;
}

function AdminCMSPageComponent() {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const managementSections: { category: string; items: ManagementSection[] }[] = [
    {
      category: 'Content Management',
      items: [
        { title: 'Blog Posts', description: 'Create, edit, and publish blog articles with social media sharing', icon: Edit, path: '/admin/blog', color: 'from-blue-500 to-cyan-500' },
        { title: 'Portfolio & Case Studies', description: 'Showcase projects and success stories', icon: Image, path: '/admin/portfolio', color: 'from-purple-500 to-pink-500' },
        { title: 'Pages & Content', description: 'Edit website pages and static content', icon: FileText, path: '/admin/pages-content', color: 'from-indigo-500 to-purple-500' },
        { title: 'Testimonials', description: 'Manage client testimonials and reviews', icon: Star, path: '/admin/testimonials', color: 'from-yellow-500 to-orange-500' },
        { title: 'News Articles', description: 'Manage AI-curated news and industry updates', icon: Newspaper, path: '/admin/news', color: 'from-emerald-500 to-teal-500' },
      ],
    },
    {
      category: 'Communications & Marketing',
      items: [
        { title: 'Contact Submissions', description: 'View and respond to contact form submissions', icon: MessageSquare, path: '/admin/contacts', color: 'from-green-500 to-emerald-500' },
        { title: 'Email Campaigns', description: 'Create and manage email marketing campaigns', icon: Send, path: '/admin/email-campaigns', color: 'from-orange-500 to-red-500' },
        { title: 'Blog Subscribers', description: 'Manage newsletter subscriptions and preferences', icon: Mail, path: '/admin/blog-subscribers', color: 'from-pink-500 to-rose-500' },
        { title: 'Email Templates', description: 'Design and manage email templates', icon: FileText, path: '/admin/email-templates', color: 'from-violet-500 to-purple-500' },
        { title: 'Email Analytics', description: 'Track email open rates, clicks, and engagement', icon: BarChart2, path: '/admin/email-analytics', color: 'from-cyan-500 to-blue-500' },
      ],
    },
    {
      category: 'Events & Community',
      items: [
        { title: 'Events Manager', description: 'Webinars, Tech Meetups, Hackathons & Challenges', icon: Calendar, path: '/admin/events', color: 'from-red-500 to-orange-500' },
        { title: 'Community Hub', description: 'Manage community members and engagement', icon: Users, path: '/admin/community', color: 'from-teal-500 to-cyan-500' },
        { title: 'Leadership Team', description: 'Manage team member profiles and bios', icon: UserCheck, path: '/admin/team', color: 'from-amber-500 to-yellow-500' },
      ],
    },
    {
      category: 'Business & Investors',
      items: [
        { title: 'Investors', description: 'Manage investor profiles and portfolio companies', icon: Building, path: '/admin/investors', color: 'from-emerald-500 to-green-500' },
        { title: 'Demo Bookings', description: 'View and manage demo booking requests', icon: CalendarCheck, path: '/admin/demo-bookings', color: 'from-blue-500 to-indigo-500' },
        { title: 'Support Tickets', description: 'Manage client support requests and tickets', icon: Headphones, path: '/admin/support', color: 'from-rose-500 to-pink-500' },
      ],
    },
    {
      category: 'Analytics & Settings',
      items: [
        { title: 'Analytics Dashboard', description: 'Website traffic, engagement, and performance metrics', icon: TrendingUp, path: '/admin/analytics', color: 'from-sky-500 to-blue-500' },
        { title: 'SEO Tools', description: 'Optimize meta tags, keywords, and search rankings', icon: Globe, path: '/admin/seo-tools', color: 'from-lime-500 to-green-500' },
        { title: 'Security Settings', description: 'Manage admin users and security policies', icon: Shield, path: '/admin/security', color: 'from-red-500 to-rose-500' },
        { title: 'Site Settings', description: 'Configure global site settings and preferences', icon: Settings, path: '/admin/site-settings', color: 'from-gray-500 to-slate-500' },
      ],
    },
  ];

  const quickStats = [
    { label: 'Total Contacts', value: stats?.contacts?.total || 0, change: `+${stats?.contacts?.recent || 0} this week`, trend: 'up' as const },
    { label: 'Subscribers', value: stats?.subscriptions?.total || 0, change: `${stats?.subscriptions?.active || 0} active`, trend: 'up' as const },
    { label: 'Blog Posts', value: stats?.content?.blogPosts?.total || 0, change: `${stats?.content?.blogPosts?.published || 0} published`, trend: 'neutral' as const },
    { label: 'Page Views', value: stats?.activity?.blogViews || 0, change: 'Last 7 days', trend: 'up' as const },
  ];

  const quickActions = [
    { label: 'New Blog Post', icon: Plus, path: '/admin/blog', color: 'bg-blue-500' },
    { label: 'View Contacts', icon: Eye, path: '/admin/contacts', color: 'bg-green-500' },
    { label: 'Email Campaign', icon: Send, path: '/admin/email-campaigns', color: 'bg-orange-500' },
    { label: 'Add Event', icon: Calendar, path: '/admin/events', color: 'bg-purple-500' },
  ];

  return (
    <>
      <SEO title="Admin CMS Hub | Tekvoro" description="Comprehensive content management system for Tekvoro" keywords="admin, cms, content management, dashboard" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Admin CMS Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm text-gray-400">Welcome, {user?.email}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all">
                <LogOut className="w-4 h-4" />Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{loading ? '...' : stat.value}</p>
                <p className={`text-xs mt-2 ${stat.trend === 'up' ? 'text-green-400' : stat.trend === 'down' ? 'text-red-400' : 'text-gray-500'}`}>{stat.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.path} className={`${action.color} hover:opacity-90 px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium transition-all`}>
                  <action.icon className="w-4 h-4" />{action.label}
                </Link>
              ))}
            </div>
          </div>

          {managementSections.map((section, sectionIndex) => (
            <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionIndex * 0.1 }} className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></span>
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <Link key={item.title} to={item.path} className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} rounded-t-xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-500">Tekvoro Admin CMS • Manage all website content from one place</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCMSPageComponent;
