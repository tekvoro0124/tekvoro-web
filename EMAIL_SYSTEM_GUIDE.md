# Email System Guide - Tekvoro Technologies

## 🚀 Quick Start

The email system is now fully integrated and ready to use! Here's how to get started:

### **1. Access the Admin Dashboard**
- Visit: `http://localhost:5175/admin`
- Login with your admin credentials
- Navigate to the email management sections

### **2. Test the System**
- Go to "Email Analytics" → Click "Show Tracking Test"
- Send a test email to verify functionality
- Track opens and clicks to test analytics

### **3. Send Your First Email**
- Use the "Email Campaigns" section
- Create a new campaign with a template
- Send to your test recipients

## 📧 Email Templates Available

### **Demo Booking Template**
- **Purpose**: Notify team of new demo requests
- **Variables**: `name`, `email`, `company`, `solution`, `date`, `time`, `message`
- **Use Case**: Book Demo page submissions

### **Contact Form Template**
- **Purpose**: Notify team of contact form submissions
- **Variables**: `name`, `email`, `company`, `phone`, `subject`, `category`, `message`
- **Use Case**: Contact page submissions

### **Newsletter Template**
- **Purpose**: Send newsletters to subscribers
- **Variables**: `newsletter_title`, `subscriber_name`, `articles[]`, `unsubscribe_url`
- **Use Case**: Newsletter campaigns

### **Welcome Template**
- **Purpose**: Welcome new users/subscribers
- **Variables**: `user_name`, `user_email`, `user_id`
- **Use Case**: User registration, subscription confirmations

## 🔧 Admin Panel Features

### **Email Analytics Dashboard**
- **Location**: `/admin/email-analytics`
- **Features**:
  - Real-time email performance metrics
  - Interactive charts and graphs
  - Template performance comparison
  - Click tracking and URL analysis
  - Browser and device analytics
  - Time-based reporting

### **Email Templates Management**
- **Location**: `/admin/email-templates`
- **Features**:
  - Visual template editor with Monaco Editor
  - Live preview with sample data
  - Template variable help
  - Create, edit, and delete templates
  - Responsive design testing

### **Email Campaigns**
- **Location**: `/admin/email-campaigns`
- **Features**:
  - Create new email campaigns
  - Schedule emails for later
  - Track campaign performance
  - Manage recipient lists
  - A/B testing capabilities

### **Email Tracking Test**
- **Location**: Email Analytics page → "Show Tracking Test"
- **Features**:
  - Send test emails with any template
  - Simulate email opens and clicks
  - Test analytics collection
  - Verify tracking functionality
  - Export test data

## 📊 Analytics & Tracking

### **What Gets Tracked**
- **Email Opens**: 1x1 pixel tracking
- **Link Clicks**: URL redirection with analytics
- **User Agents**: Browser and device information
- **Geographic Data**: IP-based location tracking
- **Time Series**: Email activity over time
- **Template Performance**: Individual template analytics

### **Available Reports**
- **Overview Dashboard**: Overall email performance
- **Template Analytics**: Individual template performance
- **Click Analysis**: Most clicked URLs and content
- **Browser Distribution**: User browser preferences
- **Time-based Analysis**: Email engagement patterns
- **Geographic Reports**: User location data

### **Export Options**
- **JSON Export**: Full analytics data export
- **CSV Reports**: Formatted data for spreadsheets
- **Real-time API**: Access analytics via API endpoints

## 🛠️ Technical Integration

### **Frontend Integration**
```javascript
import emailService from '../services/emailService';

// Send demo booking email
const result = await emailService.sendDemoBooking({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Example Corp',
  solution: 'AI Solutions',
  message: 'Interested in your AI solutions'
});

// Get analytics
const analytics = await emailService.getAnalytics({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
```

### **API Endpoints**
- `POST /api/send-email` - Send emails
- `GET /api/email-analytics` - Get analytics
- `GET /api/email-templates` - Manage templates
- `GET /api/email-track/{id}` - Track email opens
- `GET /api/email-click/{id}` - Track email clicks
- `GET /api/email-health` - Health check

### **Environment Variables**
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM_ADDRESS=info@tekvoro.com
EMAIL_REPLY_TO=info@tekvoro.com
```

## 🎨 Template Customization

### **Template Variables**
All templates support these common variables:
- `{{name}}` - Recipient's name
- `{{email}}` - Recipient's email
- `{{company}}` - Company name
- `{{tracking_url}}` - Email tracking pixel URL
- `{{timestamp}}` - Send timestamp
- `{{message_id}}` - Unique message ID

### **Creating Custom Templates**
1. Go to Email Templates → "New Template"
2. Use the visual editor to create your template
3. Add template variables where needed
4. Preview with sample data
5. Save and test

### **Template Best Practices**
- Use inline CSS for email compatibility
- Keep images under 1MB
- Test on multiple email clients
- Include unsubscribe options for newsletters
- Use clear call-to-action buttons
- Optimize for mobile devices

## 🔒 Security & Privacy

### **GDPR Compliance**
- Unsubscribe options in all newsletters
- Data retention policies
- User consent tracking
- Right to be forgotten implementation

### **Security Features**
- API key authentication
- Rate limiting on endpoints
- Input validation and sanitization
- Secure data transmission
- Audit logging

### **Data Protection**
- Encrypted data storage
- Secure API endpoints
- User data anonymization
- Regular security audits

## 🚀 Deployment

### **Local Development**
```bash
npm run dev
# Visit http://localhost:5175/admin
```

### **Production Deployment**
1. Set environment variables in Netlify
2. Deploy to production
3. Configure SendGrid API key
4. Test email functionality
5. Monitor analytics

### **Environment Setup**
```bash
# Production
SENDGRID_API_KEY=your-production-key
EMAIL_FROM_ADDRESS=info@tekvoro.com

# Development
SENDGRID_API_KEY=your-test-key
EMAIL_FROM_ADDRESS=test@tekvoro.com
```

## 📈 Performance Monitoring

### **Key Metrics to Track**
- **Open Rate**: Percentage of emails opened
- **Click Rate**: Percentage of emails with clicks
- **Bounce Rate**: Failed email deliveries
- **Unsubscribe Rate**: User opt-outs
- **Conversion Rate**: Desired actions taken

### **Optimization Tips**
- A/B test subject lines
- Optimize send times
- Segment your audience
- Personalize content
- Monitor engagement patterns

## 🆘 Troubleshooting

### **Common Issues**

**Emails not sending:**
- Check SendGrid API key configuration
- Verify sender email is verified in SendGrid
- Check function logs in Netlify

**Tracking not working:**
- Verify tracking URLs are accessible
- Check CORS configuration
- Ensure tracking pixel is included

**Analytics not updating:**
- Check database connection
- Verify tracking function is working
- Check for JavaScript errors

### **Debug Mode**
Enable debug logging:
```javascript
process.env.DEBUG = 'email:*';
```

### **Health Check**
Visit `/api/email-health` to check system status.

## 📞 Support

For technical support:
1. Check the troubleshooting section
2. Review function logs in Netlify
3. Test with the tracking test component
4. Contact the development team

## 🎯 Next Steps

1. **Test the System**: Use the tracking test to verify functionality
2. **Customize Templates**: Edit templates to match your brand
3. **Set Up Campaigns**: Create your first email campaign
4. **Monitor Analytics**: Track performance and optimize
5. **Scale Up**: Add more templates and campaigns as needed

The email system is now fully operational and ready to help you engage with your audience effectively! 🎉 