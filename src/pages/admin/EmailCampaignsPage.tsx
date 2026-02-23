import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  EnvelopeIcon, 
  ChartBarIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  template: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  scheduledDate?: string;
  sentDate?: string;
  recipients: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  updatedAt: string;
}

const EmailCampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Welcome Series - New Subscribers',
        subject: 'Welcome to Tekvoro Technologies!',
        template: 'welcome',
        status: 'sent',
        sentDate: '2024-01-10T10:00:00Z',
        recipients: 1250,
        opened: 875,
        clicked: 312,
        unsubscribed: 8,
        openRate: 70.0,
        clickRate: 25.0,
        createdAt: '2024-01-08T09:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z'
      },
      {
        id: '2',
        name: 'Q1 Newsletter - AI Trends',
        subject: 'Latest AI Trends and Tekvoro Updates',
        template: 'newsletter',
        status: 'scheduled',
        scheduledDate: '2024-01-15T14:00:00Z',
        recipients: 2100,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        openRate: 0,
        clickRate: 0,
        createdAt: '2024-01-12T11:00:00Z',
        updatedAt: '2024-01-12T11:00:00Z'
      },
      {
        id: '3',
        name: 'Product Launch - Cloud Solutions',
        subject: 'Introducing Our New Cloud Solutions Platform',
        template: 'newsletter',
        status: 'draft',
        recipients: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        openRate: 0,
        clickRate: 0,
        createdAt: '2024-01-13T15:00:00Z',
        updatedAt: '2024-01-13T15:00:00Z'
      }
    ];
    setCampaigns(mockCampaigns);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <PencilIcon className="w-4 h-4" />;
      case 'scheduled': return <ClockIcon className="w-4 h-4" />;
      case 'sending': return <EnvelopeIcon className="w-4 h-4" />;
      case 'sent': return <CheckCircleIcon className="w-4 h-4" />;
      case 'paused': return <XCircleIcon className="w-4 h-4" />;
      default: return <PencilIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateCampaign = () => {
    setShowCreateModal(true);
  };

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    // Navigate to campaign editor
    console.log('Edit campaign:', campaign.id);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
              <p className="mt-2 text-gray-600">
                Create, manage, and track your email marketing campaigns
              </p>
            </div>
            <button
              onClick={handleCreateCampaign}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Campaigns
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {campaigns.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Avg Open Rate
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {campaigns.length > 0 
                        ? (campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length).toFixed(1)
                        : '0'}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Sent Today
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {campaigns.filter(c => 
                        c.status === 'sent' && 
                        new Date(c.sentDate || '').toDateString() === new Date().toDateString()
                      ).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Scheduled
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {campaigns.filter(c => c.status === 'scheduled').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Campaign List
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <li key={campaign.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-lg font-medium text-gray-900">
                          {campaign.name}
                        </h4>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">{campaign.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{campaign.subject}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>Template: {campaign.template}</span>
                        <span className="mx-2">•</span>
                        <span>Recipients: {campaign.recipients.toLocaleString()}</span>
                        {campaign.status === 'sent' && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Opens: {campaign.opened.toLocaleString()} ({campaign.openRate}%)</span>
                            <span className="mx-2">•</span>
                            <span>Clicks: {campaign.clicked.toLocaleString()} ({campaign.clickRate}%)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewCampaign(campaign)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEditCampaign(campaign)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Created: {formatDate(campaign.createdAt)}
                  {campaign.scheduledDate && (
                    <>
                      <span className="mx-2">•</span>
                      Scheduled: {formatDate(campaign.scheduledDate)}
                    </>
                  )}
                  {campaign.sentDate && (
                    <>
                      <span className="mx-2">•</span>
                      Sent: {formatDate(campaign.sentDate)}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Create Campaign Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Create New Campaign
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter campaign name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Template
                    </label>
                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select a template</option>
                      <option value="welcome">Welcome Email</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="demo-booking">Demo Booking</option>
                      <option value="contact-form">Contact Form</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Create Campaign
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Campaign Details Modal */}
        {selectedCampaign && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Campaign Details: {selectedCampaign.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Campaign Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Subject</dt>
                        <dd className="text-sm text-gray-900">{selectedCampaign.subject}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Template</dt>
                        <dd className="text-sm text-gray-900">{selectedCampaign.template}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCampaign.status)}`}>
                            {getStatusIcon(selectedCampaign.status)}
                            <span className="ml-1">{selectedCampaign.status}</span>
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                        <dd className="text-sm text-gray-900">{formatDate(selectedCampaign.createdAt)}</dd>
                      </div>
                      {selectedCampaign.scheduledDate && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Scheduled</dt>
                          <dd className="text-sm text-gray-900">{formatDate(selectedCampaign.scheduledDate)}</dd>
                        </div>
                      )}
                      {selectedCampaign.sentDate && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Sent</dt>
                          <dd className="text-sm text-gray-900">{formatDate(selectedCampaign.sentDate)}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Recipients</dt>
                        <dd className="text-sm text-gray-900">{selectedCampaign.recipients.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Opened</dt>
                        <dd className="text-sm text-gray-900">{selectedCampaign.opened.toLocaleString()} ({selectedCampaign.openRate}%)</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Clicked</dt>
                        <dd className="text-sm text-gray-900">{selectedCampaign.clicked.toLocaleString()} ({selectedCampaign.clickRate}%)</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Unsubscribed</dt>
                        <dd className="text-sm text-gray-900">{selectedCampaign.unsubscribed.toLocaleString()}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailCampaignsPage; 