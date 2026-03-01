import { NavLink } from 'react-router-dom';
import { 
  Home, Settings, Users, FileText, Image, Mail, X, LayoutDashboard, 
  Edit, TrendingUp, Calendar, Newspaper, Globe, Building, MessageSquare,
  Star, Shield, Send, BarChart2
} from 'lucide-react';
import Logo from '../layout/Logo';

interface AdminSidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const AdminSidebar = ({ isOpen, closeSidebar }: AdminSidebarProps) => {
  const navGroups = [
    {
      label: 'Overview',
      items: [
        { name: 'CMS Hub', path: '/admin/cms', icon: LayoutDashboard },
        { name: 'Dashboard', path: '/admin', icon: Home },
        { name: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
      ],
    },
    {
      label: 'Content',
      items: [
        { name: 'Blog Posts', path: '/admin/blog', icon: Edit },
        { name: 'Pages & Content', path: '/admin/pages-content', icon: FileText },
        { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
        { name: 'Portfolio', path: '/admin/portfolio', icon: Image },
      ],
    },
    {
      label: 'Communications',
      items: [
        { name: 'Contact Submissions', path: '/admin/contacts', icon: MessageSquare },
        { name: 'Email Campaigns', path: '/admin/email-campaigns', icon: Send },
        { name: 'Blog Subscribers', path: '/admin/blog-subscribers', icon: Mail },
        { name: 'Community Hub', path: '/admin/community', icon: Users },
      ],
    },
    {
      label: 'Events & News',
      items: [
        { name: 'Events Manager', path: '/admin/events', icon: Calendar },
        { name: 'News Articles', path: '/admin/news', icon: Newspaper },
        { name: 'Leadership Team', path: '/admin/team', icon: Users },
      ],
    },
    {
      label: 'Business',
      items: [
        { name: 'Investors', path: '/admin/investors', icon: Building },
      ],
    },
    {
      label: 'Settings',
      items: [
        { name: 'SEO Tools', path: '/admin/seo-tools', icon: Globe },
        { name: 'Security', path: '/admin/security', icon: Shield },
        { name: 'Site Settings', path: '/admin/site-settings', icon: Settings },
      ],
    },
  ];
  
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <Logo />
        <button 
          onClick={closeSidebar} 
          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="px-4 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.label}
            </p>
            <nav className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 mr-2.5" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Website
          </p>
          <nav className="space-y-0.5">
            <NavLink
              to="/"
              className="flex items-center px-2 py-1.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Globe className="h-4 w-4 mr-2.5" />
              View Website
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;