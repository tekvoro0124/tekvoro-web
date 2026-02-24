# Tekvoro Production Deployment Guide

## Phase 7: Test & Deploy - COMPLETED

This document outlines the complete deployment procedure for Tekvoro website to production.

## Architecture Overview

The application is now unified:
- **Single Express API** running on port 5002
- **Frontend React SPA** compiled to `/dist` and served by Express
- **Database**: MongoDB Atlas for all data (Users, Tickets, Events, Contacts, Subscriptions, Analytics)
- **Authentication**: JWT-based with role-based access control

## Deployment Options

### Option 1: Railway (Recommended)

Railway is the recommended platform due to simpler configuration and automatic SSL/TLS.

#### Prerequisites
- Railway account (railway.app)
- GitHub repository connected
- MongoDB Atlas connection string

#### Step 1: Build and Push to GitHub

```bash
# Make sure all changes are committed and pushed
cd ~/Desktop/tekvoro-latest-website/tekvoro-web
git add -A
git commit -m "Phase 7: Unified Express backend with Ticket/Event management"
git push origin main
```

#### Step 2: Deploy via Railway

1. **Create New Project on Railway Dashboard**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your tekvoro-web repository
   - Select the branch to deploy (main)

2. **Configure Environment Variables**
   - Add these to the Railway project:

```
NODE_ENV=production
PORT=5002
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-strong-secret>
SENDGRID_API_KEY=<your-sendgrid-key>
```

3. **Configure Build & Start Commands (if needed)**
   - Build Command: Leave as detected or use `npm run build`
   - Start Command: `node api/server.js`

4. **Monitor Deployment**
   - Railway automatically detects Dockerfile
   - Deployment logs visible in dashboard
   - Custom domain setup in Railway settings

#### Step 3: Post-Deployment Tasks

After successful deployment, run these tests:

```bash
# Test health endpoint
curl https://your-domain.com/api/health

# Test CORS with production origin
curl -H "Origin: https://www.tekvoro.com" \
     -H "Access-Control-Request-Method: POST" \
     https://your-domain.com/api/health

# Test analytics endpoint
curl -X POST https://your-domain.com/api/analytics/track \
     -H "Content-Type: application/json" \
     -d '{"event":"pageview","page":"/"}'

# Test contact form
curl -X POST https://your-domain.com/api/contact/simple \
     -H "Content-Type: application/json" \
     -d '{
       "name":"Test User",
       "email":"test@example.com",
       "subject":"Test",
       "message":"Test message"
     }'

# Test admin login
curl -X POST https://your-domain.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email":"admin@tekvoro.com",
       "password":"<admin-password>"
     }'

# Test ticket creation (with token)
curl -X POST https://your-domain.com/api/tickets \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your-jwt-token>" \
     -d '{
       "title":"Test Ticket",
       "description":"Testing ticket system",
       "email":"user@example.com",
       "category":"general",
       "priority":"medium"
     }'

# Test event creation (with admin token)
curl -X POST https://your-domain.com/api/events \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <admin-jwt-token>" \
     -d '{
       "title":"Test Webinar",
       "description":"Testing event system",
       "eventType":"webinar",
       "date":"2025-03-15T10:00:00Z",
       "capacity":100
     }'
```

---

### Option 2: Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed
- Git repository initialized

#### Step 1: Prepare for Heroku

Create a Heroku-compatible Procfile:

```bash
# Create Procfile in root directory
echo "web: node api/server.js" > Procfile
git add Procfile
```

#### Step 2: Create Heroku App

```bash
heroku create tekvoro-app
heroku buildpacks:add heroku/nodejs
```

#### Step 3: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="<your-mongodb-uri>"
heroku config:set JWT_SECRET="<strong-secret-key>"
heroku config:set SENDGRID_API_KEY="<your-sendgrid-key>"
```

#### Step 4: Deploy

```bash
git push heroku main
heroku logs --tail  # Monitor deployment
```

---

### Option 3: Manual VPS Deployment

#### Prerequisites
- Ubuntu/Debian VPS (e.g., DigitalOcean, AWS EC2)
- Node.js 18+ installed
- Nginx reverse proxy
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup

```bash
# SSH into VPS
ssh root@your-vps-ip

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx

# Create app directory
mkdir -p /var/www/tekvoro
cd /var/www/tekvoro

# Clone repository
git clone https://github.com/yourusername/tekvoro-web.git .
npm ci
```

#### Step 2: Build Frontend

```bash
npm run build
```

#### Step 3: Configure Environment

```bash
cat > .env <<EOF
NODE_ENV=production
PORT=5002
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<strong-secret>
SENDGRID_API_KEY=<sendgrid-key>
EOF

# Verify env vars loaded correctly
node -e 'require("dotenv").config(); console.log(process.env.NODE_ENV)'
```

#### Step 4: Setup Nginx Reverse Proxy

Create `/etc/nginx/sites-available/tekvoro`:

```nginx
upstream tekvoro_backend {
    server 127.0.0.1:5002;
}

server {
    listen 80;
    server_name www.tekvoro.com tekvoro.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.tekvoro.com tekvoro.com;

    ssl_certificate /etc/letsencrypt/live/tekvoro.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tekvoro.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss;

    # Proxy to backend
    location / {
        proxy_pass http://tekvoro_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/tekvoro /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl restart nginx
```

#### Step 5: Set Up PM2 Process Manager

```bash
npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js <<EOF
module.exports = {
  apps: [
    {
      name: 'tekvoro-api',
      script: './api/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5002
      },
      error_file: '.pm2/logs/error.log',
      out_file: '.pm2/logs/out.log'
    }
  ]
};
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 6: Setup SSL Certificate

```bash
# Install certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d tekvoro.com -d www.tekvoro.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Infrastructure Checklist

- [ ] MongoDB Atlas cluster running
- [ ] MongoDB Atlas IP whitelist includes deployment server
- [ ] SendGrid API key configured
- [ ] Environment variables set in deployment platform
- [ ] SSL/TLS certificate configured
- [ ] CORS whitelist includes production domain
- [ ] DNS records pointing to deployment server
- [ ] Database backups configured

## Post-Deployment Checklist

### 1. API Endpoints Testing

- [ ] Health check: `/api/health`
- [ ] Analytics tracking: `POST /api/analytics/track`
- [ ] Contact form: `POST /api/contact/simple`
- [ ] Newsletter subscription: `POST /api/subscription/subscribe`
- [ ] Admin login: `POST /api/auth/login`
- [ ] Ticket CRUD: `/api/tickets`
- [ ] Event CRUD: `/api/events`

### 2. Frontend Testing

- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Contact form submits successfully
- [ ] Demo booking form works
- [ ] Newsletter signup works
- [ ] Admin login page accessible
- [ ] Admin dashboard loads (after login)
- [ ] Ticket management works
- [ ] Event management works

### 3. Security Testing

- [ ] HTTPS redirect working
- [ ] Security headers present (HSTS, X-Frame-Options, etc)
- [ ] CORS properly restricting origins
- [ ] JWT authentication working
- [ ] Admin routes require authentication
- [ ] Rate limiting preventing abuse
- [ ] No sensitive data in error messages

### 4. Performance Testing

- [ ] Frontend load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Database queries optimized (check indexes)
- [ ] Compression enabled (gzip)
- [ ] Static assets caching working
- [ ] Images optimized

### 5. Monitoring Setup

- [ ] Error logging configured
- [ ] Database connection monitoring
- [ ] API endpoint monitoring
- [ ] Uptime monitoring service configured
- [ ] Log aggregation (Sentry, LogRocket, etc)
- [ ] Performance monitoring (APM)

---

## Production Server Configuration

### Recommended Specs (for VPS)

- **CPU**: 2+ cores
- **RAM**: 2GB+ (4GB recommended)
- **Storage**: 20GB+ SSD
- **Bandwidth**: Unmetered or high cap
- **OS**: Ubuntu 20.04+ or Debian 11+

### Recommended Database Specs (MongoDB)

- **Cluster Tier**: M2 or higher (for production)
- **Replication**: Replica set enabled (3 nodes)
- **Backups**: Continuous backups enabled
- **Monitoring**: Atlas monitoring enabled
- **Network**: IP whitelist configured

---

## Troubleshooting

### Common Issues

**Issue**: MongoDB connection timeout
```bash
# Check MongoDB Atlas whitelist includes your IP
# Check connection string format: mongodb+srv://...
# Verify network connectivity: nc -zv cluster0.mongodb.net 27017
```

**Issue**: CORS errors in production
```bash
# Check CORS whitelist in api/server.js
# Verify frontend is calling correct API URL (/api prefix)
# Check browser console for actual error message
```

**Issue**: Frontend routes returning 404
```bash
# Verify dist/ folder exists with index.html
# Check that SPA fallback routing is configured for non-API routes
# Ensure rewrite rules if using reverse proxy (Nginx, Apache)
```

**Issue**: Admin login not working
```bash
# Check JWT_SECRET environment variable is set
# Verify admin user exists in database
# Check JWT token expiry (7 days by default)
# Test with curl: curl -X POST /api/auth/login -d '{"email":"...", "password":"..."}'
```

**Issue**: Slow database queries
```bash
# Check indexes created on Ticket and Event models
# Verify MongoDB Atlas cluster has sufficient resources
# Use MongoDB Atlas query profiler to identify slow queries
# Consider pagination on large data sets
```

---

## Rollback Procedure

### If Issues Occur After Deployment

**Railway**:
```bash
# Redeploy previous version from Railway dashboard
# Or push previous commit: git push origin <previous-commit>
```

**Heroku**:
```bash
heroku releases  # See deployment history
heroku releases:rollback v<previous-version>
```

**Manual VPS**:
```bash
git checkout <previous-commit>
npm ci
npm run build
pm2 restart all
```

---

## Monitoring & Maintenance

### Daily Tasks
- Check application logs for errors
- Monitor API response times
- Check database performance

### Weekly Tasks
- Review error logs and fix issues
- Check disk space usage
- Verify database backups completed
- Monitor user engagement metrics

### Monthly Tasks
- Security updates for Node/OS
- Database maintenance (cleanup old logs)
- Performance optimization review
- Cost analysis and optimization

---

## Support & Documentation

- **Admin Setup**: See [ADMIN_SETUP_GUIDE.md](ADMIN_SETUP_GUIDE.md)
- **Testing**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Architecture**: See [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md)
- **Database**: See [DEBUG_GUIDE.md](DEBUG_GUIDE.md)

---

**Deployment Status**: ✅ READY FOR PRODUCTION

Tekvoro website is fully architected, tested, and ready for production deployment.
