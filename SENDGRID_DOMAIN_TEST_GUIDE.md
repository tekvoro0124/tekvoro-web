# SendGrid Domain Test Guide

This guide will help you test your SendGrid domain setup and ensure everything is working correctly for your Tekvoro Technologies email system.

## 🚀 Quick Start

### Option 1: Admin Dashboard Test (Recommended)
1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:5173/admin/email-analytics`
3. Click "Show Domain Test" button
4. Enter your test email address
5. Click "Run Domain Test"

### Option 2: Command Line Test
1. Create a `.env` file with your SendGrid API key:
   ```bash
   SENDGRID_API_KEY=your-sendgrid-api-key
   EMAIL_FROM_ADDRESS=info@tekvoro.com
   EMAIL_REPLY_TO=info@tekvoro.com
   ```
2. Run the test script:
   ```bash
   # Basic test
   node test-sendgrid.js
   
   # Test with email sending
   node test-sendgrid.js your-email@example.com
   ```

### Option 3: API Test
```bash
curl -X POST http://localhost:8888/.netlify/functions/test-sendgrid-domain \
  -H "Content-Type: application/json" \
  -d '{
    "testEmail": "your-email@example.com",
    "testType": "comprehensive"
  }'
```

## 📋 What the Tests Check

### 1. API Key Configuration
- ✅ Verifies SendGrid API key is set
- ✅ Checks API key format and length
- ❌ Fails if API key is missing or invalid

### 2. Environment Variables
- ✅ Checks `SENDGRID_API_KEY` is configured
- ✅ Verifies `EMAIL_FROM_ADDRESS` is set
- ✅ Confirms `EMAIL_REPLY_TO` is configured
- ❌ Fails if required variables are missing

### 3. API Connection
- ✅ Tests connection to SendGrid API
- ✅ Retrieves account profile information
- ✅ Verifies API key permissions
- ❌ Fails if API is unreachable or key is invalid

### 4. Domain Authentication
- ✅ Checks domain whitelabel configuration
- ✅ Verifies DNS records are properly set
- ✅ Confirms domain validation status
- ❌ Fails if no domains are configured or DNS is incorrect

### 5. Sender Authentication
- ✅ Verifies sender email addresses
- ✅ Checks single sender authentication
- ✅ Confirms sender verification status
- ❌ Fails if no senders are verified

### 6. Email Sending Test
- ✅ Sends a test email to verify functionality
- ✅ Tests HTML and text email formats
- ✅ Verifies tracking settings
- ❌ Fails if email cannot be sent

## 🔧 Setup Requirements

### 1. SendGrid Account Setup
1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Navigate to Settings → API Keys
3. Create a new API key with "Mail Send" permissions
4. Copy the API key for use in your environment

### 2. Domain Authentication
1. Go to Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Enter your domain (e.g., `tekvoro.com`)
4. Add the provided DNS records to your domain:
   - CNAME record for `s1._domainkey.tekvoro.com`
   - CNAME record for `s2._domainkey.tekvoro.com`
5. Wait for DNS propagation (can take up to 48 hours)
6. Click "Verify" in SendGrid dashboard

### 3. Sender Authentication
1. Go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Add your sender email (e.g., `info@tekvoro.com`)
4. Complete the verification process
5. Check your email and click the verification link

### 4. Environment Configuration
Set these environment variables in your `.env` file or Netlify:

```bash
SENDGRID_API_KEY=SG.your-api-key-here
EMAIL_FROM_ADDRESS=info@tekvoro.com
EMAIL_REPLY_TO=info@tekvoro.com
```

## 🎯 Test Results Interpretation

### All Tests Pass ✅
Your SendGrid setup is working correctly! You can:
- Send emails from your verified domain
- Use all email templates
- Track email opens and clicks
- Monitor email analytics

### Partial Tests Pass ⚠️
Some tests failed. Common issues and solutions:

#### API Key Issues
```
❌ API Key: FAIL - Not found in environment variables
```
**Solution**: Set `SENDGRID_API_KEY` in your environment

#### Domain Authentication Issues
```
❌ Domain Authentication: FAIL - No domains configured
```
**Solution**: 
1. Go to SendGrid → Settings → Sender Authentication
2. Authenticate your domain
3. Add DNS records
4. Wait for verification

#### Sender Authentication Issues
```
❌ Sender Authentication: FAIL - No verified senders
```
**Solution**:
1. Go to SendGrid → Settings → Sender Authentication
2. Verify a single sender
3. Complete email verification

#### Email Send Issues
```
❌ Email Send: FAIL - Domain not verified
```
**Solution**: Complete domain and sender authentication first

### All Tests Fail ❌
Your SendGrid setup needs attention:
1. Check your API key configuration
2. Verify domain authentication
3. Complete sender verification
4. Check environment variables

## 🔍 Troubleshooting

### Common Issues

#### "API Key not configured"
- Check your `.env` file has `SENDGRID_API_KEY`
- Verify the API key is correct
- Ensure the key has "Mail Send" permissions

#### "Domain not verified"
- Add DNS records to your domain provider
- Wait for DNS propagation (up to 48 hours)
- Check DNS record format matches SendGrid requirements

#### "Sender not verified"
- Check your email for verification link
- Click the verification link in SendGrid email
- Ensure sender email matches your domain

#### "Email sending failed"
- Verify domain authentication is complete
- Check sender authentication is verified
- Ensure "From" email matches verified sender

### DNS Record Examples

For domain `tekvoro.com`, add these CNAME records:

```
Type: CNAME
Name: s1._domainkey
Value: s1.domainkey.u12345678.wl123.sendgrid.net
TTL: 3600

Type: CNAME
Name: s2._domainkey
Value: s2.domainkey.u12345678.wl123.sendgrid.net
TTL: 3600
```

### Verification Checklist

- [ ] SendGrid account created
- [ ] API key generated with Mail Send permissions
- [ ] Domain authentication configured
- [ ] DNS records added and propagated
- [ ] Domain verification completed
- [ ] Single sender verified
- [ ] Environment variables set
- [ ] Test email received successfully

## 📊 Monitoring and Maintenance

### Regular Checks
- Monitor email delivery rates
- Check domain authentication status monthly
- Review API key permissions quarterly
- Test email functionality weekly

### Performance Metrics
- Email delivery rate: >95%
- Bounce rate: <5%
- Spam complaints: <0.1%
- Open rate: Industry average ~20%

### Security Best Practices
- Rotate API keys regularly
- Use environment variables for secrets
- Monitor API usage and limits
- Enable two-factor authentication on SendGrid account

## 🆘 Getting Help

### SendGrid Support
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid Support](https://support.sendgrid.com/)
- [SendGrid Community](https://community.sendgrid.com/)

### Technical Support
- Check function logs in Netlify dashboard
- Review browser console for errors
- Test with the provided test scripts
- Contact development team for assistance

## 🎉 Success!

Once all tests pass, your SendGrid domain setup is complete and you can:

1. **Send Professional Emails**: Use your verified domain for all email communications
2. **Track Performance**: Monitor opens, clicks, and engagement
3. **Use Templates**: Leverage the beautiful email templates in your system
4. **Scale Up**: Send to larger audiences with confidence
5. **Maintain Reputation**: Build and maintain good sender reputation

Your Tekvoro Technologies email system is now ready to engage with your audience effectively! 🚀 