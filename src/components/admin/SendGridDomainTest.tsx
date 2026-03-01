import React, { useState } from 'react';
import { 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Send, 
  RefreshCw, 
  Download,
  Copy,
  ExternalLink
} from 'lucide-react';

interface TestResult {
  status: 'success' | 'failed' | 'error' | 'checking' | 'not_configured';
  [key: string]: any;
}

interface TestResults {
  timestamp: string;
  testType: string;
  results: {
    apiKeyCheck: TestResult;
    environmentCheck: TestResult;
    apiConnection: TestResult;
    domainAuthentication?: TestResult;
    emailSendTest?: TestResult;
    senderAuthentication: TestResult;
  };
}

interface TestResponse {
  success: boolean;
  overallStatus: 'success' | 'partial' | 'failed';
  testResults: TestResults;
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    recommendations: string[];
  };
}

const SendGridDomainTest: React.FC = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testType, setTestType] = useState<'basic' | 'comprehensive'>('comprehensive');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('/.netlify/functions/test-sendgrid-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testEmail,
          testType
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Test error:', error);
      setResults({
        success: false,
        overallStatus: 'failed',
        testResults: {
          timestamp: new Date().toISOString(),
          testType,
          results: {
            apiKeyCheck: { status: 'error', error: 'Network error' },
            environmentCheck: { status: 'error', error: 'Network error' },
            apiConnection: { status: 'error', error: 'Network error' },
            senderAuthentication: { status: 'error', error: 'Network error' }
          }
        },
        summary: {
          totalTests: 0,
          passedTests: 0,
          failedTests: 1,
          recommendations: ['Check your network connection and try again']
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResults = () => {
    if (results) {
      navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'checking':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'not_configured':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'failed':
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'checking':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'not_configured':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SendGrid Domain Test</h3>
            <p className="text-sm text-gray-500">
              Comprehensive test of your SendGrid domain setup and email functionality
            </p>
          </div>
          <TestTube className="w-6 h-6 text-blue-600" />
        </div>

        {/* Test Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Email Address
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter email to test sending"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Required for comprehensive email sending test
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Type
            </label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value as 'basic' | 'comprehensive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="basic">Basic (API & Environment)</option>
              <option value="comprehensive">Comprehensive (All Tests + Email Send)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Comprehensive includes domain verification and email sending
            </p>
          </div>
        </div>

        {/* Test Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={runTest}
            disabled={loading || (testType === 'comprehensive' && !testEmail)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <TestTube className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Running Tests...' : 'Run Domain Test'}
          </button>

          {results && (
            <button
              onClick={copyResults}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Results'}
            </button>
          )}
        </div>
      </div>

      {/* Test Results */}
      {results && (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`bg-white rounded-lg shadow-sm border p-6 ${getStatusColor(results.overallStatus)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(results.overallStatus)}
                <div>
                  <h4 className="text-lg font-semibold">
                    Test Results - {results.overallStatus.toUpperCase()}
                  </h4>
                  <p className="text-sm">
                    {results.summary.passedTests} of {results.summary.totalTests} tests passed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Timestamp</p>
                <p className="text-xs">{new Date(results.testResults.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Individual Test Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Test Details</h4>
            <div className="space-y-4">
              {Object.entries(results.testResults.results).map(([testName, testResult]) => (
                <div key={testName} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(testResult.status)}
                      <h5 className="font-medium text-gray-900 capitalize">
                        {testName.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      testResult.status === 'success' ? 'bg-green-100 text-green-800' :
                      testResult.status === 'failed' || testResult.status === 'error' ? 'bg-red-100 text-red-800' :
                      testResult.status === 'checking' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testResult.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {testResult.status === 'success' && (
                      <div>
                        {testName === 'apiKeyCheck' && (
                          <p>API key is configured (length: {testResult.keyLength})</p>
                        )}
                        {testName === 'environmentCheck' && (
                          <div>
                            <p>Environment variables configured:</p>
                            <ul className="list-disc list-inside ml-4 mt-1">
                              {Object.entries(testResult.variables).map(([key, value]) => (
                                <li key={key} className={value ? 'text-green-600' : 'text-red-600'}>
                                  {key}: {value ? '✓' : '✗'}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {testName === 'apiConnection' && (
                          <p>Connected to SendGrid account: {testResult.account}</p>
                        )}
                        {testName === 'domainAuthentication' && (
                          <div>
                            <p>Domain authentication status:</p>
                            {testResult.domains?.map((domain: any, index: number) => (
                              <div key={index} className="ml-4 mt-1 p-2 bg-gray-50 rounded">
                                <p className="font-medium">{domain.domain}</p>
                                <p className="text-xs">Valid: {domain.valid ? '✓' : '✗'}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {testName === 'emailSendTest' && (
                          <p>Test email sent successfully (Message ID: {testResult.messageId})</p>
                        )}
                        {testName === 'senderAuthentication' && (
                          <div>
                            <p>Verified senders: {testResult.verifiedSenders?.length || 0}</p>
                            {testResult.verifiedSenders?.map((sender: any, index: number) => (
                              <p key={index} className="ml-4 text-xs">{sender.from_email}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(testResult.status === 'failed' || testResult.status === 'error') && (
                      <div>
                        <p className="text-red-600 font-medium">Error: {testResult.error}</p>
                        {testResult.details && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-sm">View Details</summary>
                            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                              {JSON.stringify(testResult.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    )}
                    
                    {testResult.status === 'not_configured' && (
                      <p className="text-yellow-600">Not configured - check your setup</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h4>
            <div className="space-y-2">
              {results.summary.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://app.sendgrid.com/settings/sender_auth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                SendGrid Sender Auth
              </a>
              <a
                href="https://app.sendgrid.com/settings/whitelabel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Domain Whitelabel
              </a>
              <a
                href="https://app.sendgrid.com/settings/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                API Keys
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendGridDomainTest; 