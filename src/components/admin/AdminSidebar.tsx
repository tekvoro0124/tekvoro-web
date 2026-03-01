import { NavLink } from 'react-router-dom';
import { Home, Settings, Users, FileText, Image, Mail, X, LayoutDashboard, Edit, TrendingUp } from 'lucide-react';
import Logo from '../layout/Logo';

interface AdminSidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const AdminSidebar = ({ isOpen, closeSidebar }: AdminSidebarProps) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
    { name: 'Blog Subscriptions', path: '/admin/blog-subscribers', icon: Mail },
    { name: 'Email Campaigns', path: '/admin/email-campaigns', icon: Users },
    { name: 'SEO Tools', path: '/admin/seo-tools', icon: Settings },
    { name: 'Pages & Content', path: '/admin/pages-content', icon: FileText },
    { name: 'Site Settings', path: '/admin/site-settings', icon: Settings },
    { name: 'Security', path: '/admin/security', icon: Settings },
    { name: 'Edit Content', path: '/admin/content', icon: FileText },
    { name: 'Blog Manager', path: '/admin/blog', icon: Edit },
    { name: 'Portfolio', path: '/admin/portfolio', icon: Image },
    { name: 'Contact Submissions', path: '/admin/contacts', icon: Mail },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Users },
  ];
  
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
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
      
      <div className="px-4 py-6">
        <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Admin Panel
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-10">
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Main Website
          </p>
          <nav className="space-y-1">
            <NavLink
              to="/"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              View Website
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;