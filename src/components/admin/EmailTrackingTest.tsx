// @ts-nocheck
import React, { useState } from 'react';
import { Send, Eye, MousePointer, BarChart3, Download, Upload } from 'lucide-react';
import emailService from '../../services/emailService';

const EmailTrackingTest: React.FC = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testTemplate, setTestTemplate] = useState('demo-booking');
  const [testData, setTestData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    solution: 'AI Solutions',
    message: 'This is a test message for tracking purposes.'
  });
  const [trackingId, setTrackingId] = useState('');
  const [trackingResults, setTrackingResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const templates = [
    { value: 'demo-booking', label: 'Demo Booking' },
    { value: 'contact-form', label: 'Contact Form' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'welcome', label: 'Welcome' }
  ];

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      alert('Please enter a test email address');
      return;
    }

    setLoading(true);
    try {
      let response;
      
      switch (testTemplate) {
        case 'demo-booking':
          response = await emailService.sendEmail({
            templateName: 'demo-booking',
            to: testEmail,
            subject: 'Test Demo Booking Email',
            data: {
              ...testData,
              recipientId: `test_${Date.now()}`
            },
            testMode: true
          });
          break;
        case 'contact-form':
          response = await emailService.sendEmail({
            templateName: 'contact-form',
            to: testEmail,
            subject: 'Test Contact Form Email',
            data: {
              ...testData,
              recipientId: `test_${Date.now()}`
            },
            testMode: true
          });
          break;
        case 'newsletter':
          response = await emailService.sendEmail({
            templateName: 'newsletter',
            to: testEmail,
            subject: 'Test Newsletter Email',
            data: {
              newsletter_title: 'Test Newsletter',
              newsletter_intro: 'This is a test newsletter for tracking purposes.',
              subscriber_name: testData.name,
              subscriber_email: testEmail,
              subscriber_id: `test_${Date.now()}`,
              articles: [
                {
                  title: 'Test Article 1',
                  excerpt: 'This is a test article excerpt.',
                  read_more_url: 'https://example.com/article1'
                },
                {
                  title: 'Test Article 2',
                  excerpt: 'This is another test article excerpt.',
                  read_more_url: 'https://example.com/article2'
                }
              ]
            },
            testMode: true
          });
          break;
        case 'welcome':
          response = await emailService.sendEmail({
            templateName: 'welcome',
            to: testEmail,
            subject: 'Test Welcome Email',
            data: {
              user_name: testData.name,
              user_email: testEmail,
              user_id: `test_${Date.now()}`
            },
            testMode: true
          });
          break;
        default:
          throw new Error('Invalid template');
      }

      if (response.success) {
        setTrackingId(response.trackingId || '');
        alert(`Test email sent successfully! Tracking ID: ${response.trackingId}`);
      } else {
        alert(`Failed to send test email: ${response.error}`);
      }
    } catch (error) {
      console.error('Test email error:', error);
      alert('Failed to send test email');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOpen = async () => {
    if (!trackingId) {
      alert('Please send a test email first to get a tracking ID');
      return;
    }

    try {
      const success = await emailService.trackEmailOpen(trackingId);
      if (success) {
        alert('Email open tracked successfully!');
      } else {
        alert('Failed to track email open');
      }
    } catch (error) {
      console.error('Track open error:', error);
      alert('Failed to track email open');
    }
  };

  const handleTrackClick = async () => {
    if (!trackingId) {
      alert('Please send a test email first to get a tracking ID');
      return;
    }

    try {
      const testUrl = 'https://www.tekvoro.com/test-click';
      const success = await emailService.trackEmailClick(trackingId, testUrl);
      if (success) {
        alert('Email click tracked successfully!');
      } else {
        alert('Failed to track email click');
      }
    } catch (error) {
      console.error('Track click error:', error);
      alert('Failed to track email click');
    }
  };

  const handleGetAnalytics = async () => {
    setLoading(true);
    try {
      const analytics = await emailService.getAnalytics();
      setTrackingResults(analytics);
    } catch (error) {
      console.error('Get analytics error:', error);
      alert('Failed to get analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleExportAnalytics = async () => {
    try {
      const data = await emailService.exportAnalytics();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'email-analytics.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export analytics');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Tracking Test</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Email Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Email Address
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter test email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <select
                value={testTemplate}
                onChange={(e) => setTestTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {templates.map((template) => (
                  <option key={template.value} value={template.value}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSendTestEmail}
              disabled={loading || !testEmail}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>

          {/* Tracking Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking ID
              </label>
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Will be populated after sending test email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleTrackOpen}
                disabled={!trackingId}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye className="w-4 h-4 mr-2" />
                Track Open
              </button>

              <button
                onClick={handleTrackClick}
                disabled={!trackingId}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MousePointer className="w-4 h-4 mr-2" />
                Track Click
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
        
        <div className="flex space-x-4">
          <button
            onClick={handleGetAnalytics}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Get Analytics
          </button>

          <button
            onClick={handleExportAnalytics}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>

        {/* Analytics Results */}
        {trackingResults && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Analytics Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Emails:</span>
                <div className="font-semibold">{trackingResults.total}</div>
              </div>
              <div>
                <span className="text-gray-500">Opened:</span>
                <div className="font-semibold">{trackingResults.opened}</div>
              </div>
              <div>
                <span className="text-gray-500">Clicked:</span>
                <div className="font-semibold">{trackingResults.clicked}</div>
              </div>
              <div>
                <span className="text-gray-500">Open Rate:</span>
                <div className="font-semibold">{trackingResults.openRate}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Test Data Editor */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Data</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={testData.name}
              onChange={(e) => setTestData({ ...testData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              value={testData.company}
              onChange={(e) => setTestData({ ...testData, company: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Solution</label>
            <input
              type="text"
              value={testData.solution}
              onChange={(e) => setTestData({ ...testData, solution: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={testData.message}
              onChange={(e) => setTestData({ ...testData, message: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTrackingTest; 