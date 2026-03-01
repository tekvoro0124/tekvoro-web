# Production Deployment Guide - Tekvoro

## Overview
This guide provides step-by-step instructions for deploying the Tekvoro corporate intelligence platform to production.

## Pre-Deployment Checklist

### Frontend
- [ ] All TypeScript errors resolved
- [ ] Build passes successfully (`npm run build`)
- [ ] Environment variables configured
- [ ] 3rd party API keys added (.env)
- [ ] SEO metadata verified
- [ ] Analytics implemented
- [ ] Error tracking enabled

### Backend
- [ ] Database indexes created
- [ ] MongoDB connection pooling configured
- [ ] Email service credentials added
- [ ] Payment service (Stripe) configured
- [ ] API routes tested
- [ ] Rate limiting configured
- [ ] CORS origins whitelisted
- [ ] JWT secrets configured

### Infrastructure
- [ ] Domain registered
- [ ] SSL certificate obtained
- [ ] CDN configured (optional)
- [ ] Database backups automated
- [ ] Monitoring alerts set up
- [ ] Log aggregation configured

---

## Deployment Options

### Option 1: Railway.app (Recommended for Beginners)

**Advantages:**
- Simple one-click deployment
- Automatic HTTPS
- Environment variable management UI
- GitHub integration
- Built-in PostgreSQL/MongoDB

**Steps:**

1. **Connect GitHub Repository**
   ```bash
   # Railway will auto-detect from GitHub
   # No local setup needed
   ```

2. **Set Environment Variables in Railway Dashboard**
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tekvoro
   JWT_SECRET=your-secure-random-key-here
   SENDGRID_API_KEY=SG.xxxxx
   OPENAI_API_KEY=sk-xxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxx
   CLIENT_URL=https://your-domain.com
   API_URL=https://api.your-domain.com
   ```

3. **Deploy Frontend**
   ```bash
   # Create new service in Railway
   # Select "Docker"
   # Add Dockerfile for frontend
   ```

4. **Deploy Backend API**
   ```bash
   # Create new service in Railway
   # Point to /api directory
   # Set start command: node server.js
   ```

5. **Configure Domain**
   ```bash
   # In Railway project settings:
   # Frontend domain: your-domain.com
   # API domain: api.your-domain.com
   ```

### Option 2: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   brew install heroku/brew/heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=mongodb+srv://...
   heroku config:set JWT_SECRET=your-secure-key
   # ... add other variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: AWS (Advanced)

**Services to use:**
- EC2 or Lightsail for backend
- S3 + CloudFront for frontend
- RDS for database (if not MongoDB Atlas)
- Route53 for DNS

**Steps:**

1. **Launch EC2 Instance**
   ```bash
   # 2GB RAM minimum, Ubuntu 20.04 LTS
   # Security group: Allow 80, 443, 22
   ```

2. **Connect and Install Dependencies**
   ```bash
   ssh -i key.pem ubuntu@your-instance-ip
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   git clone your-repo
   cd your-repo/api
   npm install
   ```

3. **Set Up PM2 Process Manager**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "tekvoro-api"
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx Reverse Proxy**
   ```bash
   sudo apt-get install nginx
   # Create /etc/nginx/sites-available/default
   ```

   ```nginx
   server {
       listen 80;
       server_name api.your-domain.com;
       
       location / {
           proxy_pass http://localhost:5002;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Set Up SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.your-domain.com
   ```

---

## Post-Deployment Configuration

### 1. Database Setup

**MongoDB Atlas (Recommended)**

```bash
# Create cluster on MongoDB Atlas
# Get connection string
# Add IP whitelist: 0.0.0.0/0 (update for production)
# Set environment variable in deployment platform

export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/tekvoro?retryWrites=true&w=majority"
```

### 2. Email Service Setup

**SendGrid Configuration**

```bash
# Sign up at sendgrid.com
# Create API key
# Add verified sender email
# Set environment variable

SENDGRID_API_KEY=SG.your-api-key-here
EMAIL_FROM_ADDRESS=noreply@tekvoro.com
```

### 3. Payment Processing Setup

**Stripe Configuration**

```bash
# Sign up at stripe.com  
# Get Secret Key and Publishable Key
# Create webhook endpoint

# Webhook URL: https://your-domain.com/api/payment/webhook
# Events to listen for:
#   - customer.subscription.updated
#   - customer.subscription.deleted
#   - invoice.payment_succeeded
#   - invoice.payment_failed

STRIPE_SECRET_KEY=sk_live_your-key-here
STRIPE_PUBLISHABLE_KEY=pk_live_your-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-key-here
```

### 4. AI Services Setup

**OpenAI Integration**

```bash
# Sign up at openai.com
# Create API key with billing set up
# Set organization if applicable

OPENAI_API_KEY=sk-your-key-here
```

---

## Monitoring & Maintenance

### 1. Set Up Error Tracking

**Sentry (Recommended)**

```bash
# Sign up at sentry.io
# Create new project for Tekvoro
# Get DSN (Data Source Name)

# Backend setup
npm install @sentry/node
# In server.js
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

# Frontend setup
npm install @sentry/react
# In main.tsx
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: process.env.VITE_SENTRY_DSN });
```

### 2. Set Up Log Aggregation

**CloudWatch (AWS) or Papertrail (Any Platform)**

```bash
# AWS CloudWatch - logs stored in /var/log
# Use CloudWatch agent to collect logs

# Papertrail - simpler option
# Install remote_syslog2
# Logs are centralized and searchable
```

### 3. Monitor Performance

**Uptime Monitoring**

```bash
# Set up monitoring service to ping:
# - /api/health (backend)
# - / (frontend)
# 
# Tools: UptimeRobot, StatusPage.io
# Alert on: 
#   - Response time > 2s
#   - HTTP status != 200
#   - Downtime > 5 minutes
```

---

## Database Backup Strategy

### Automated Backups

**MongoDB Atlas**
```bash
# Automated backups every 12 hours (Free tier)
# 7-day retention (Free tier)
# Reach out to support for more retention
```

**Manual Backups**
```bash
# Monthly full backup using mongodump
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/tekvoro" --out=./backup-$(date +%Y%m%d)

# Store in S3
aws s3 cp ./backup-* s3://your-bucket/mongo-backups/
```

---

## Performance Optimization

### 1. CDN Setup (CloudFlare - Recommended)

```bash
# Sign up at cloudflare.com
# Add your domain
# Change nameservers at domain registrar
# Configure caching rules:
#   - Static assets: 30 days
#   - API responses: No cache
#   - Pages: 1 hour
```

### 2. Frontend Optimization

```bash
# Ensure Vite build optimizations:
✓ Code splitting enabled
✓ Lazy loading for routes
✓ Image optimization
✓ Compression enabled

# In vite.config.ts
build: {
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks: {
        'recharts': ['recharts'],
        'framer': ['framer-motion']
      }
    }
  }
}
```

### 3. Backend Optimization

```bash
# Enable compression
app.use(compression());

# Cache middleware
app.use(cacheMiddleware);

# Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

# Database indexing (already configured in indexConfig.js)
```

---

## Scaling Guide

### When to Scale

1. **Vertical Scaling** (increase server resources)
   - Single server handling < 100 req/s
   - RAM usage > 80%
   - CPU usage > 75% consistently

2. **Horizontal Scaling** (multiple servers)
   - Single server at capacity
   - Database becoming bottleneck
   - Need zero-downtime deployments

### Implementation

**Use Docker + Kubernetes for scaling**

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5002
CMD ["node", "server.js"]
```

```bash
# Build and push to Docker Hub
docker build -t your-registry/tekvoro-api:latest .
docker push your-registry/tekvoro-api:latest

# Deploy to Kubernetes
kubectl create deployment tekvoro-api --image=your-registry/tekvoro-api:latest
kubectl scale deployment tekvoro-api --replicas=3
```

---

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables not in code
- [ ] Database credentials rotated
- [ ] API keys rotated quarterly
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection protections (mongoose/mongoDB protects by default)
- [ ] CSRF protection if using sessions
- [ ] Security headers enabled (Helmet.js)
- [ ] Regular security updates for dependencies

---

## Rollback Procedures

### Railway/Heroku
```bash
# View deployment history
# Click "Redeploy" on previous version
# Takes 2-5 minutes
```

### AWS
```bash
# Use GitHub actions for auto-rollback
# Or manually:
git revert HEAD
git push
# CI/CD pipeline redeploys
```

---

## Testing Production Deployment

```bash
# 1. Test API endpoints
curl https://api.your-domain.com/api/health

# 2. Test frontend
open https://your-domain.com

# 3. Test user flows
# - Sign up
# - Login
# - News search
# - Create alerts
# - Payment (test mode)

# 4. Check performance
# - PageSpeed Insights: https://pagespeed.web.dev
# - Check Core Web Vitals
# - Monitor API response times
```

---

## Support & Monitoring Links

- **Sentry Dashboard**: https://sentry.io/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/
- **Stripe Dashboard**: https://dashboard.stripe.com/
- **SendGrid Console**: https://app.sendgrid.com/
- **Railway Dashboard**: https://railway.app/dashboard
- **Heroku Dashboard**: https://dashboard.heroku.com/
- **CloudFlare Dashboard**: https://dash.cloudflare.com/

---

## Deployment Troubleshooting

### API not connecting to database
```bash
# Check MONGODB_URI in environment
# Whitelist your IP in MongoDB Atlas
# Check network connectivity
```

### Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 502 Bad Gateway errors
```bash
# Check if backend is running
# Check logs: journalctl -u pm2-root
# Verify port forwarding
# Check memory/CPU usage
```

### Email not sending
```bash
# Verify SendGrid API key
# Check email domain verification
# Review SendGrid logs
# Check rate limits
```

---

This guide covers all major deployment scenarios. For your specific setup, refer to the relevant section above.
