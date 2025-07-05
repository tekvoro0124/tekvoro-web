import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Send, Users, BarChart3, Calendar, Mail, Target, TrendingUp } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import SEO from '../../components/SEO';

interface Campaign {
  id: string;
  name: string;
  template: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
}

const EmailCampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    template: '',
    subject: '',
    recipients: '',
    scheduledAt: '',
    message: ''
  });

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      setAuthenticated(true);
      loadData();
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load templates
      const templatesResponse = await fetch('/api/email-templates', {
        headers: {
          'Authorization': 'Bearer admin-token'
        }
      });
      
      if (templatesResponse.ok) {
        const templatesData = await templatesResponse.json();
        setTemplates(templatesData.templates?.map((t: any) => t.name) || []);
      }

      // Load campaigns (mock data for now)
      const mockCampaigns: Campaign[] = [
        {
          id: '1',
          name: 'Welcome Newsletter',
          template: 'welcome',
          subject: 'Welcome to Tekvoro! 🎉',
          status: 'sent',
          recipients: 150,
          sent: 150,
          opened: 89,
          clicked: 45,
          sentAt: '2024-01-15T10:00:00Z',
          createdAt: '2024-01-15T09:00:00Z'
        },
        {
          id: '2',
          name: 'AI Solutions Update',
          template: 'newsletter',
          subject: 'Latest AI Innovations at Tekvoro',
          status: 'scheduled',
          recipients: 300,
          sent: 0,
          opened: 0,
          clicked: 0,
          scheduledAt: '2024-01-20T14:00:00Z',
          createdAt: '2024-01-16T11:00:00Z'
        },
        {
          id: '3',
          name: 'Q1 Newsletter',
          template: 'newsletter',
          subject: 'Tekvoro Q1 2024 Newsletter',
          status: 'draft',
          recipients: 0,
          sent: 0,
          opened: 0,
          clicked: 0,
          createdAt: '2024-01-17T15:00:00Z'
        }
      ];
      
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token'
        },
        body: JSON.stringify({
          templateName: formData.template,
          subject: formData.subject,
          data: {
            message: formData.message,
            campaign_name: formData.name
          },
          scheduledAt: formData.scheduledAt || undefined
        })
      });

      if (response.ok) {
        setShowCreateForm(false);
        setFormData({
          name: '',
          template: '',
          subject: '',
          recipients: '',
          scheduledAt: '',
          message: ''
        });
        await loadData();
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    try {
      const campaign = campaigns.find(c => c.id === campaignId);
      if (!campaign) return;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token'
        },
        body: JSON.stringify({
          templateName: campaign.template,
          subject: campaign.subject,
          data: {
            campaign_name: campaign.name
          }
        })
      });

      if (response.ok) {
        await loadData();
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Mail className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'sending': return <Send className="w-4 h-4" />;
      case 'sent': return <TrendingUp className="w-4 h-4" />;
      case 'cancelled': return <Target className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <SEO
        title="Email Campaigns - Admin Dashboard"
        description="Send newsletters, announcements, and manage email campaigns"
        noIndex={true}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/admin')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Email Campaigns</h1>
                  <p className="text-sm text-gray-500">Send newsletters and manage campaigns</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showCreateForm ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Create New Campaign</h2>
              
              <form onSubmit={handleCreateCampaign} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template
                    </label>
                    <select
                      value={formData.template}
                      onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a template</option>
                      {templates.map((template) => (
                        <option key={template} value={template}>{template}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients
                    </label>
                    <input
                      type="number"
                      value={formData.recipients}
                      onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Number of recipients"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a custom message to your campaign..."
                  />
                </div>
                
                <div className="flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Campaigns List */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Campaigns</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${getStatusColor(campaign.status)}`}>
                            {getStatusIcon(campaign.status)}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                            <p className="text-sm text-gray-500">{campaign.subject}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-400">
                                Template: {campaign.template}
                              </span>
                              <span className="text-xs text-gray-400">
                                Created: {new Date(campaign.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {campaign.sent}/{campaign.recipients} sent
                            </div>
                            <div className="text-xs text-gray-500">
                              {campaign.opened} opened • {campaign.clicked} clicked
                            </div>
                          </div>
                          
                          {campaign.status === 'draft' && (
                            <button
                              onClick={() => handleSendCampaign(campaign.id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send
                            </button>
                          )}
                          
                          {campaign.status === 'sent' && (
                            <button
                              onClick={() => setSelectedCampaign(campaign)}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Analytics
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty State */}
              {campaigns.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new email campaign.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Campaign
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailCampaignsPage; 