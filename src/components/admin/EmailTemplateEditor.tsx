import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';

interface EmailTemplateEditorProps {
    templateName?: string;
    onSave?: (templateName: string, content: string) => void;
    onCancel?: () => void;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
    templateName = '',
    onSave,
    onCancel
}) => {
    const [name, setName] = useState(templateName);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');

    useEffect(() => {
        if (templateName) {
            loadTemplate(templateName);
        } else {
            setContent(getDefaultTemplate());
        }
    }, [templateName]);

    const loadTemplate = async (template: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/email-analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token'
                },
                body: JSON.stringify({
                    action: 'preview',
                    templateName: template,
                    sampleData: {}
                })
            });

            if (response.ok) {
                const data = await response.json();
                setContent(data.preview);
            }
        } catch (error) {
            console.error('Error loading template:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDefaultTemplate = () => {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .content {
            padding: 40px 30px;
        }
        .footer {
            background-color: #1e293b;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .tracking-pixel {
            width: 1px;
            height: 1px;
            opacity: 0;
        }
    </style>
</head>
<body>
    <!-- Email Tracking Pixel -->
    <img src="{{tracking_url}}" alt="" class="tracking-pixel" />
    
    <div class="container">
        <div class="header">
            <h1>{{title}}</h1>
            <p>{{subtitle}}</p>
        </div>
        
        <div class="content">
            <h2>Hello {{name}}!</h2>
            <p>{{message}}</p>
            
            <!-- Add your content here -->
            <p>This is a sample email template. You can customize it with your own content.</p>
        </div>
        
        <div class="footer">
            <p><strong>{{company_name}}</strong></p>
            <p>{{company_description}}</p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.6;">
                Message ID: {{message_id}} | Sent: {{timestamp}}
            </p>
        </div>
    </div>
</body>
</html>`;
    };

    const handleSave = async () => {
        if (!name.trim()) {
            alert('Please enter a template name');
            return;
        }

        if (!content.trim()) {
            alert('Please enter template content');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/email-templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token'
                },
                body: JSON.stringify({
                    action: templateName ? 'update' : 'create',
                    templateName: name,
                    content: content
                })
            });

            if (response.ok) {
                onSave?.(name, content);
            } else {
                throw new Error('Failed to save template');
            }
        } catch (error) {
            console.error('Error saving template:', error);
            alert('Error saving template');
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/email-analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token'
                },
                body: JSON.stringify({
                    action: 'preview',
                    templateName: name || 'custom',
                    sampleData: JSON.parse(previewData || '{}')
                })
            });

            if (response.ok) {
                const data = await response.json();
                setPreviewHtml(data.preview);
                setShowPreview(true);
            }
        } catch (error) {
            console.error('Error generating preview:', error);
            alert('Error generating preview');
        } finally {
            setLoading(false);
        }
    };

    const sampleData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Example Corp',
        phone: '+1 (555) 123-4567',
        message: 'This is a sample message for preview purposes.',
        subject: 'Sample Subject',
        title: 'Welcome to Tekvoro',
        subtitle: 'Your journey starts here',
        company_name: 'Tekvoro Technologies',
        company_description: 'Transforming businesses through innovative technology solutions'
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {templateName ? 'Edit Template' : 'Create New Template'}
                    </h2>
                    <div className="flex space-x-3">
                        <button
                            onClick={handlePreview}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {loading ? 'Loading...' : 'Preview'}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {loading ? 'Saving...' : 'Save Template'}
                        </button>
                        {onCancel && (
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Editor Panel */}
                <div className="flex-1 flex flex-col">
                    {/* Template Name */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Template Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter template name (e.g., welcome-email)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* HTML Editor */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="html"
                            value={content}
                            onChange={(value) => setContent(value || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                                lineNumbers: 'on',
                                folding: true,
                                lineDecorationsWidth: 10,
                                lineNumbersMinChars: 3,
                                scrollBeyondLastLine: false,
                                automaticLayout: true
                            }}
                            theme="vs-dark"
                        />
                    </div>
                </div>

                {/* Preview Panel */}
                {showPreview && (
                    <div className="w-1/2 border-l border-gray-200 flex flex-col">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Sample data is used for preview. Customize below:
                            </p>
                        </div>

                        {/* Sample Data Editor */}
                        <div className="flex-1 p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sample Data (JSON)
                            </label>
                            <textarea
                                value={previewData || JSON.stringify(sampleData, null, 2)}
                                onChange={(e) => setPreviewData(e.target.value)}
                                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                placeholder="Enter JSON data for preview"
                            />
                            
                            <button
                                onClick={handlePreview}
                                className="mt-3 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                            >
                                Update Preview
                            </button>
                        </div>

                        {/* Email Preview */}
                        <div className="flex-1 border-t border-gray-200">
                            <iframe
                                srcDoc={previewHtml}
                                className="w-full h-full border-0"
                                title="Email Preview"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Template Variables Help */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Available Template Variables</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{name}}</code>
                        <span className="text-gray-600 ml-1">- Recipient name</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{email}}</code>
                        <span className="text-gray-600 ml-1">- Recipient email</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{company}}</code>
                        <span className="text-gray-600 ml-1">- Company name</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{message}}</code>
                        <span className="text-gray-600 ml-1">- Custom message</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{tracking_url}}</code>
                        <span className="text-gray-600 ml-1">- Tracking pixel URL</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{timestamp}}</code>
                        <span className="text-gray-600 ml-1">- Send timestamp</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{message_id}}</code>
                        <span className="text-gray-600 ml-1">- Unique message ID</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded border">
                        <code className="text-blue-600">{{subject}}</code>
                        <span className="text-gray-600 ml-1">- Email subject</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplateEditor; 