import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, RefreshCw, Filter, Calendar, TestTube } from 'lucide-react';
import EmailDashboard from '../../components/admin/EmailDashboard';
import EmailTrackingTest from '../../components/admin/EmailTrackingTest';
import SendGridDomainTest from '../../components/admin/SendGridDomainTest';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';

const EmailAnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showTrackingTest, setShowTrackingTest] = useState(false);
  const [showDomainTest, setShowDomainTest] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO
        title="Email Analytics - Admin Dashboard"
        description="Track email performance, opens, clicks, and engagement metrics"
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
                  <h1 className="text-xl font-semibold text-gray-900">Email Analytics</h1>
                  <p className="text-sm text-gray-500">Track email performance and engagement</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowDomainTest(!showDomainTest)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {showDomainTest ? 'Hide' : 'Show'} Domain Test
                </button>
                <button
                  onClick={() => setShowTrackingTest(!showTrackingTest)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {showTrackingTest ? 'Hide' : 'Show'} Tracking Test
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showDomainTest && (
            <div className="mb-8">
              <SendGridDomainTest />
            </div>
          )}
          
          {showTrackingTest && (
            <div className="mb-8">
              <EmailTrackingTest />
            </div>
          )}
          
          <EmailDashboard />
        </div>
      </div>
    </>
  );
};

export default EmailAnalyticsPage; 