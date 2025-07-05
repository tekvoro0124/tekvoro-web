import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Shield, Users, Activity, Key, Lock, Eye, Edit, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: string;
  status: 'active' | 'suspended' | 'pending';
}

interface SecurityLog {
  id: string;
  user: string;
  action: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

export default function SecurityAdmin() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin User', email: 'admin@tekvoro.com', role: 'admin', lastLogin: '2024-04-20 14:30', status: 'active' },
    { id: '2', name: 'Content Editor', email: 'editor@tekvoro.com', role: 'editor', lastLogin: '2024-04-19 09:15', status: 'active' },
    { id: '3', name: 'Marketing Team', email: 'marketing@tekvoro.com', role: 'viewer', lastLogin: '2024-04-18 16:45', status: 'active' },
    { id: '4', name: 'Test User', email: 'test@tekvoro.com', role: 'viewer', lastLogin: '2024-04-15 11:20', status: 'suspended' }
  ]);

  const securityLogs: SecurityLog[] = [
    { id: '1', user: 'admin@tekvoro.com', action: 'Login', ip: '192.168.1.100', timestamp: '2024-04-20 14:30', status: 'success' },
    { id: '2', user: 'unknown@email.com', action: 'Failed Login', ip: '203.45.67.89', timestamp: '2024-04-20 13:45', status: 'failed' },
    { id: '3', user: 'editor@tekvoro.com', action: 'Content Update', ip: '192.168.1.101', timestamp: '2024-04-20 12:20', status: 'success' },
    { id: '4', user: 'admin@tekvoro.com', action: 'User Created', ip: '192.168.1.100', timestamp: '2024-04-20 11:15', status: 'success' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'editor': return 'bg-blue-500';
      case 'viewer': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-yellow-400" />
                  Security & Access Control
                </h1>
                <p className="text-gray-400">Manage admin users, roles, and security logs</p>
              </div>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add User
              </button>
            </div>

            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Active Users', value: users.filter(u => u.status === 'active').length, icon: Users, color: 'from-green-500 to-emerald-500' },
                { label: 'Admin Users', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'from-red-500 to-pink-500' },
                { label: 'Failed Logins', value: securityLogs.filter(log => log.status === 'failed').length, icon: AlertTriangle, color: 'from-yellow-400 to-orange-500' },
                { label: 'Security Score', value: 'A+', icon: Lock, color: 'from-blue-500 to-cyan-500' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg p-1.5 text-white`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
              {[
                { id: 'users', label: 'Users', icon: Users },
                { id: 'logs', label: 'Security Logs', icon: Activity },
                { id: 'roles', label: 'Roles', icon: Key }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            {activeTab === 'users' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">User Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-semibold">User</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Role</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Last Login</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, idx) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-semibold text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)} text-white`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)} text-white`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">
                            {new Date(user.lastLogin).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Security Logs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-semibold">User</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Action</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">IP Address</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Timestamp</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {securityLogs.map((log, idx) => (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4 text-white">{log.user}</td>
                          <td className="p-4 text-white">{log.action}</td>
                          <td className="p-4 text-gray-400">{log.ip}</td>
                          <td className="p-4 text-gray-400">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span className={`text-sm font-medium ${getLogStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Role Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Admin',
                      description: 'Full access to all features and settings',
                      permissions: ['All permissions', 'User management', 'System settings'],
                      color: 'from-red-500 to-pink-500',
                      users: users.filter(u => u.role === 'admin').length
                    },
                    {
                      name: 'Editor',
                      description: 'Can edit content and manage blog posts',
                      permissions: ['Content editing', 'Blog management', 'Media upload'],
                      color: 'from-blue-500 to-cyan-500',
                      users: users.filter(u => u.role === 'editor').length
                    },
                    {
                      name: 'Viewer',
                      description: 'Read-only access to content and analytics',
                      permissions: ['View content', 'View analytics', 'Export reports'],
                      color: 'from-green-500 to-emerald-500',
                      users: users.filter(u => u.role === 'viewer').length
                    }
                  ].map((role, idx) => (
        <motion.div
                      key={role.name}
                      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white/5 rounded-xl p-6 border border-white/10"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center mb-4`}>
                        <Key className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">{role.name}</h4>
                      <p className="text-sm text-gray-400 mb-4">{role.description}</p>
                      <div className="mb-4">
                        <div className="text-sm text-gray-300 mb-2">Permissions:</div>
                        <ul className="space-y-1">
                          {role.permissions.map(permission => (
                            <li key={permission} className="text-xs text-gray-400">• {permission}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm text-gray-400">
                        {role.users} user{role.users !== 1 ? 's' : ''} assigned
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
        </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 