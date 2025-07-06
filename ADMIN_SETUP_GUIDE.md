# 🔐 Secure Admin Authentication Setup Guide

## Overview
This guide will help you set up secure admin authentication for the Tekvoro website using environment variables and secure session management.

## 🚀 Quick Setup

### 1. Environment Variables
Add these variables to your `.env` file:

```bash
# Admin Authentication (SECURE - Change these!)
ADMIN_EMAIL=your_admin_email@tekvoro.com
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SECRET=your_secure_secret_key_here

# Other existing variables...
EMAIL_FROM_ADDRESS=info@tekvoro.com
EMAIL_REPLY_TO=info@tekvoro.com
SENDGRID_API_KEY=your_sendgrid_api_key
```

### 2. Generate Secure Credentials

#### Option A: Use a Password Generator
```bash
# Generate a secure password (16 characters)
openssl rand -base64 12

# Generate a secure secret key (32 characters)
openssl rand -hex 16
```

#### Option B: Use Online Tools
- **Password**: Use a password manager or generator (16+ characters)
- **Secret**: Generate a random 32-character hex string

### 3. Recommended Secure Credentials

```bash
# Example secure configuration
ADMIN_EMAIL=admin@tekvoro.com
ADMIN_PASSWORD=Kj8#mN2$pQ9@vX7!
ADMIN_SECRET=a1b2c3d4e5f678901234567890123456
```

## 🔧 Production Deployment

### 1. Netlify Environment Variables
1. Go to your Netlify dashboard
2. Navigate to Site Settings > Environment Variables
3. Add the admin variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` 
   - `ADMIN_SECRET`

### 2. Security Best Practices
- ✅ Use strong, unique passwords (16+ characters)
- ✅ Include special characters, numbers, uppercase/lowercase
- ✅ Never commit credentials to version control
- ✅ Rotate credentials regularly
- ✅ Use different credentials for dev/staging/production

### 3. Access Control
- 🔒 Admin login: `/admin/login`
- 🔒 Admin dashboard: `/admin`
- 🔒 Session timeout: 24 hours
- 🔒 Secure session validation

## 🧪 Testing

### 1. Local Testing
```bash
# Start development server
npm run dev

# Start Netlify functions
npx netlify dev

# Test admin login
curl -X POST http://localhost:8889/.netlify/functions/admin-auth \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tekvoro.com","password":"your_password"}'
```

### 2. Production Testing
1. Deploy to Netlify
2. Set environment variables
3. Test admin login at `https://tekvoro.com/admin/login`

## 🔍 Security Features

### 1. Session Management
- Secure session tokens (32-byte random)
- HMAC-SHA256 session validation
- 24-hour session timeout
- Automatic session cleanup

### 2. Authentication Flow
1. User submits credentials
2. Server validates against environment variables
3. Generates secure session token
4. Returns encrypted session data
5. Client stores session securely
6. Session validated on each request

### 3. Error Handling
- No credential exposure in error messages
- Rate limiting protection
- Secure error logging
- Graceful failure handling

## 🚨 Security Checklist

- [ ] Changed default admin email
- [ ] Set strong admin password (16+ chars)
- [ ] Generated secure admin secret (32 chars)
- [ ] Set environment variables in production
- [ ] Tested login functionality
- [ ] Verified session management
- [ ] Checked error handling
- [ ] Validated logout functionality

## 🔧 Troubleshooting

### Common Issues

1. **Login Fails**
   - Check environment variables are set
   - Verify email/password match exactly
   - Check Netlify function logs

2. **Session Expires**
   - Sessions timeout after 24 hours
   - Re-login required after timeout
   - Check browser localStorage

3. **Production Issues**
   - Verify environment variables in Netlify
   - Check function deployment status
   - Review Netlify function logs

### Debug Commands
```bash
# Check environment variables
echo $ADMIN_EMAIL
echo $ADMIN_PASSWORD

# Test authentication function
curl -X POST https://tekvoro.com/.netlify/functions/admin-auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Netlify function logs
3. Verify environment variable configuration
4. Test with curl commands above

---

**⚠️ Security Note**: Never share or commit your admin credentials. Keep them secure and rotate them regularly. 