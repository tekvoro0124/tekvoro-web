import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Settings, Globe, Shield, Database, Mail, Key, Save, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function SiteSettingsAdmin() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Tekvoro Technologies',
    siteUrl: 'https://tekvoro.com',
    contactEmail: 'info@tekvoro.com',
    analyticsId: 'GA-123456789',
    maintenanceMode: false,
    enableComments: true,
    enableNewsletter: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
                  <Settings className="w-8 h-8 text-yellow-400" />
                  Site Settings
                </h1>
                <p className="text-gray-400">Configure site-wide settings, integrations, and security</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
              {[
                { id: 'general', label: 'General', icon: Globe },
                { id: 'integrations', label: 'Integrations', icon: Database },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'email', label: 'Email', icon: Mail }
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            {activeTab === 'general' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">General Settings</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange('siteName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Site URL</label>
                      <input
                        type="url"
                        value={settings.siteUrl}
                        onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Maintenance Mode</h4>
                        <p className="text-sm text-gray-400">Enable maintenance mode to restrict access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Enable Comments</h4>
                        <p className="text-sm text-gray-400">Allow users to comment on blog posts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.enableComments}
                          onChange={(e) => handleSettingChange('enableComments', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Integrations</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Google Analytics ID</label>
                    <input
                      type="text"
                      value={settings.analyticsId}
                      onChange={(e) => handleSettingChange('analyticsId', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      placeholder="GA-XXXXXXXXX"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-400" />
                        Database
                      </h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div>Status: <span className="text-green-400">Connected</span></div>
                        <div>Type: PostgreSQL</div>
                        <div>Size: 2.4 GB</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-green-400" />
                        Email Service
                      </h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div>Provider: SendGrid</div>
                        <div>Status: <span className="text-green-400">Active</span></div>
                        <div>Monthly: 15K emails</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      Security Status
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">A+</div>
                        <div className="text-sm text-gray-400">SSL Grade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">24/7</div>
                        <div className="text-sm text-gray-400">Monitoring</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
                        <div className="text-sm text-gray-400">Threats</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-400">Require 2FA for admin access</p>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Rate Limiting</h4>
                        <p className="text-sm text-gray-400">Prevent brute force attacks</p>
                      </div>
                      <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Email Configuration</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Newsletter Subscription</h4>
                      <p className="text-sm text-gray-400">Allow users to subscribe to newsletters</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableNewsletter}
                        onChange={(e) => handleSettingChange('enableNewsletter', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-4">SMTP Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Host</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                          placeholder="smtp.sendgrid.net"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Port</label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                          placeholder="587"
                        />
                      </div>
                    </div>
                  </div>
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