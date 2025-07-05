# Email Template System

A comprehensive email template system with tracking, analytics, and beautiful HTML templates for Tekvoro Technologies.

## Features

- 🎨 **Beautiful HTML Templates** - Modern, responsive email templates
- 📊 **Email Tracking** - Track opens, clicks, and user engagement
- 📈 **Analytics Dashboard** - Visual analytics and reporting
- 🔧 **Template Editor** - Visual editor for creating and editing templates
- 📱 **Responsive Design** - Mobile-friendly email templates
- 🎯 **Personalization** - Dynamic content with template variables
- 📧 **Multiple Providers** - Support for SendGrid and other email services

## Template Types

### 1. Demo Booking Template (`demo-booking.html`)
- **Purpose**: Notify team of new demo booking requests
- **Variables**: `name`, `email`, `company`, `phone`, `solution`, `date`, `time`, `message`
- **Features**: Gradient design, booking details card, CTA buttons

### 2. Contact Form Template (`contact-form.html`)
- **Purpose**: Notify team of contact form submissions
- **Variables**: `name`, `email`, `company`, `phone`, `subject`, `category`, `message`
- **Features**: Priority badges, response guidelines, professional design

### 3. Newsletter Template (`newsletter.html`)
- **Purpose**: Send newsletters to subscribers
- **Variables**: `newsletter_title`, `subscriber_name`, `articles[]`, `unsubscribe_url`
- **Features**: Article grid, social links, unsubscribe options

### 4. Welcome Template (`welcome.html`)
- **Purpose**: Welcome new users/subscribers
- **Variables**: `user_name`, `user_email`, `user_id`
- **Features**: Feature cards, next steps, welcome message

## Template Variables

### Common Variables
- `{{name}}` - Recipient's name
- `{{email}}` - Recipient's email
- `{{company}}` - Company name
- `{{phone}}` - Phone number
- `{{message}}` - Custom message
- `{{tracking_url}}` - Email tracking pixel URL
- `{{timestamp}}` - Send timestamp
- `{{message_id}}` - Unique message ID

### Template-Specific Variables
- `{{subject}}` - Email subject
- `{{solution}}` - Requested solution (demo booking)
- `{{date}}` - Preferred date (demo booking)
- `{{time}}` - Preferred time (demo booking)
- `{{newsletter_title}}` - Newsletter title
- `{{subscriber_name}}` - Subscriber name
- `{{user_name}}` - User name (welcome emails)
- `{{user_id}}` - User ID

## Usage

### 1. Sending Emails

```javascript
import EmailTemplateManager from './emails/template-manager';

const templateManager = new EmailTemplateManager();
await templateManager.loadTemplates();

// Send demo booking email
const result = await templateManager.sendEmail('demo-booking', {
    email: 'info@tekvoro.com',
    name: 'John Doe',
    company: 'Example Corp',
    solution: 'AI Solutions',
    message: 'Interested in your AI solutions'
}, sendFunction);
```

### 2. API Endpoints

#### Send Email
```bash
POST /api/send-email
{
    "templateName": "demo-booking",
    "to": "info@tekvoro.com",
    "subject": "New Demo Request",
    "data": {
        "name": "John Doe",
        "company": "Example Corp"
    }
}
```

#### Email Analytics
```bash
GET /api/email-analytics?action=overview
GET /api/email-analytics?action=template&template=demo-booking
GET /api/email-analytics?action=templates
```

#### Email Tracking
```bash
GET /api/email-track/{tracking_id}  # Track email open
GET /api/email-click/{tracking_id}?url={original_url}  # Track click
```

### 3. Template Editor

Use the visual template editor in the admin panel to:
- Create new templates
- Edit existing templates
- Preview templates with sample data
- Test responsive design

## Analytics Features

### Tracking Metrics
- **Email Opens** - Track when emails are opened
- **Link Clicks** - Track which links are clicked
- **User Agents** - Browser and device information
- **Geographic Data** - IP-based location tracking
- **Time Series** - Email activity over time

### Reports Available
- **Overview Dashboard** - Overall email performance
- **Template Performance** - Individual template analytics
- **Click Analysis** - Most clicked URLs and content
- **Browser Distribution** - User browser preferences
- **Time-based Analysis** - Email engagement patterns

## Template Design Guidelines

### 1. Responsive Design
- Use mobile-first approach
- Maximum width: 600px
- Flexible layouts with CSS Grid/Flexbox
- Test on multiple devices

### 2. Branding
- Use Tekvoro brand colors
- Include company logo and branding
- Consistent typography and spacing
- Professional appearance

### 3. Accessibility
- High contrast colors
- Alt text for images
- Semantic HTML structure
- Screen reader friendly

### 4. Performance
- Optimize images
- Minimize CSS
- Use web-safe fonts
- Fast loading times

## Customization

### Adding New Templates
1. Create HTML file in `emails/templates/`
2. Use template variables for dynamic content
3. Include tracking pixel: `<img src="{{tracking_url}}" alt="" class="tracking-pixel" />`
4. Test with sample data
5. Add to template manager

### Custom Variables
```html
<!-- Add custom variables -->
<div class="custom-section">
    <h3>{{custom_title}}</h3>
    <p>{{custom_content}}</p>
</div>
```

### Styling
- Use inline CSS for email compatibility
- Test across email clients
- Use web-safe fonts
- Optimize for dark mode

## Security Considerations

### Data Protection
- Encrypt sensitive data
- Secure API endpoints
- Validate input data
- Rate limiting

### Privacy Compliance
- GDPR compliance
- Unsubscribe options
- Data retention policies
- User consent tracking

## Troubleshooting

### Common Issues
1. **Emails not sending** - Check SendGrid API key
2. **Tracking not working** - Verify tracking URLs
3. **Template not loading** - Check file permissions
4. **Analytics not updating** - Verify database connection

### Debug Mode
Enable debug logging for detailed error information:
```javascript
process.env.DEBUG = 'email:*';
```

## Support

For technical support or questions about the email template system:
- Check the documentation
- Review error logs
- Contact the development team
- Submit issues through the project repository

## Future Enhancements

- [ ] A/B testing capabilities
- [ ] Advanced segmentation
- [ ] Automated email campaigns
- [ ] Integration with CRM systems
- [ ] Advanced analytics and reporting
- [ ] Template versioning
- [ ] Multi-language support 