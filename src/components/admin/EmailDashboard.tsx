import React, { useState, useEffect } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';

interface EmailAnalytics {
    total: number;
    opened: number;
    clicked: number;
    openRate: string;
    clickRate: string;
    byEmailType: Record<string, { total: number; opened: number; clicked: number }>;
    byDate: Record<string, { total: number; opened: number; clicked: number }>;
    topClickedUrls: Record<string, number>;
    userAgents: Record<string, number>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const EmailDashboard: React.FC = () => {
    const [analytics, setAnalytics] = useState<EmailAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('all');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    useEffect(() => {
        fetchAnalytics();
    }, [selectedTemplate, dateRange]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                action: selectedTemplate === 'all' ? 'overview' : 'template',
                ...(selectedTemplate !== 'all' && { template: selectedTemplate }),
                ...(dateRange.from && { dateFrom: dateRange.from }),
                ...(dateRange.to && { dateTo: dateRange.to })
            });

            const response = await fetch(`/api/email-analytics?${params}`, {
                headers: {
                    'Authorization': 'Bearer admin-token' // Replace with actual auth
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analytics');
            }

            const data = await response.json();
            setAnalytics(data.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formatDataForCharts = () => {
        if (!analytics) return {};

        // Email type data for bar chart
        const emailTypeData = Object.entries(analytics.byEmailType).map(([type, data]) => ({
            name: type,
            total: data.total,
            opened: data.opened,
            clicked: data.clicked,
            openRate: data.total > 0 ? ((data.opened / data.total) * 100).toFixed(1) : 0,
            clickRate: data.total > 0 ? ((data.clicked / data.total) * 100).toFixed(1) : 0
        }));

        // Date data for line chart
        const dateData = Object.entries(analytics.byDate)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([date, data]) => ({
                date: new Date(date).toLocaleDateString(),
                total: data.total,
                opened: data.opened,
                clicked: data.clicked
            }));

        // Browser data for pie chart
        const browserData = Object.entries(analytics.userAgents).map(([browser, count]) => ({
            name: browser,
            value: count
        }));

        // Top URLs data
        const urlData = Object.entries(analytics.topClickedUrls).map(([url, count]) => ({
            url: url.length > 50 ? url.substring(0, 50) + '...' : url,
            count
        }));

        return { emailTypeData, dateData, browserData, urlData };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
                        <div className="mt-2 text-sm text-red-700">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    const { emailTypeData, dateData, browserData, urlData } = formatDataForCharts();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Analytics Dashboard</h1>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Template
                        </label>
                        <select
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Templates</option>
                            <option value="demo-booking">Demo Booking</option>
                            <option value="contact-form">Contact Form</option>
                            <option value="newsletter">Newsletter</option>
                            <option value="welcome">Welcome</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date From
                        </label>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date To
                        </label>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-blue-600">Total Emails</p>
                                <p className="text-2xl font-bold text-blue-900">{analytics?.total || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-green-600">Opened</p>
                                <p className="text-2xl font-bold text-green-900">{analytics?.opened || 0}</p>
                                <p className="text-sm text-green-600">{analytics?.openRate || 0}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-purple-600">Clicked</p>
                                <p className="text-2xl font-bold text-purple-900">{analytics?.clicked || 0}</p>
                                <p className="text-sm text-purple-600">{analytics?.clickRate || 0}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-orange-600">Templates</p>
                                <p className="text-2xl font-bold text-orange-900">{Object.keys(analytics?.byEmailType || {}).length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email Type Performance */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Type Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={emailTypeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#3B82F6" name="Total" />
                            <Bar dataKey="opened" fill="#10B981" name="Opened" />
                            <Bar dataKey="clicked" fill="#8B5CF6" name="Clicked" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Browser Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Browser Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={browserData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {browserData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Time Series */}
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Activity Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3B82F6" name="Total" />
                            <Line type="monotone" dataKey="opened" stroke="#10B981" name="Opened" />
                            <Line type="monotone" dataKey="clicked" stroke="#8B5CF6" name="Clicked" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Clicked URLs */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clicked URLs</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    URL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Clicks
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Percentage
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {urlData.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.url}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.count}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {((item.count / (analytics?.clicked || 1)) * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmailDashboard; 