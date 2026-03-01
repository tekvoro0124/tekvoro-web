# Quick Deployment Reference 🚀

## Current System Status

```bash
# Check backend API (should see JSON with blog/service/case study counts)
curl http://localhost:5002/api/content/stats

# Check frontend (should see HTML response)
curl -I http://localhost:5173

# Check build (should be in dist/ folder)
ls -la dist/ | head -10
```

---

## Pre-Deployment Commands

```bash
# Verify TypeScript compiles
npm run build

# Should output: "✓ built in ~11s" with no errors

# Optional: Run tests before deployment
npm test

# Optional: Run E2E tests if available
npm run test:e2e
```

---

## Deployment Platforms Quick Links

### Railway (Recommended)
```
📍 https://railway.app
✅ Easiest setup
✅ Automatic HTTPS
✅ GitHub integration
⏱️ Setup time: 30 minutes
💰 Cost: $5-20/month
```

### Vercel (Frontend) + Railway (Backend)
```
Frontend:
📍 https://vercel.com → Import project → Deploy
⏱️ Setup time: 15 minutes
💰 Free tier available

Backend:
📍 https://railway.app → Create service → Deploy
⏱️ Setup time: 15 minutes
```

### Manual VPS Deployment
```
📍 DigitalOcean, Linode, AWS, etc.
⏱️ Setup time: 2-3 hours
💰 Cost: $5-30/month
🔧 Manual management required
```

---

## Environment Variables for Production

Copy these to your deployment platform's environment variable settings:

```env
# Database
MONGODB_URI=mongodb+srv://[user]:[password]@cluster.mongodb.net/tekvoro

# App
NODE_ENV=production
PORT=5002
VITE_API_URL=https://api.your-domain.com

# API Keys
JWT_SECRET=generate-random-secret-here
SENDGRID_API_KEY=SG.xxxxx
OPENAI_API_KEY=sk-xxxxx

# Domain
CLIENT_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Admin
ADMIN_EMAIL=admin@your-domain.com
```

---

## Railway Deployment (Step-by-Step)

### 1. Create Railway Project
```bash
# Option A: Via Railway CLI
npm install -g @railway/cli
railway login
railway init

# Option B: Via https://railway.app Dashboard
# Click "New Project" → "Deploy from GitHub repo"
```

### 2. Configure Environment Variables
```bash
# In Railway Dashboard:
# → Settings → Environment Variables
# Paste all environment variables from above
```

### 3. Deploy
```bash
# Via Railway CLI
railway up

# Via Dashboard
# → Deploy button (automatic on GitHub push)
```

### 4. Check Status
```bash
# View logs
railway logs

# View deployments
railway status

# Get public URL
railway env
```

---

## Testing Deployment

```bash
# Test API is responding
curl https://api.your-domain.com/api/content/stats

# Test frontend loads
curl https://your-domain.com | head -c 500

# Test search endpoint
curl "https://api.your-domain.com/api/content/search?q=AI"

# Test blog detail page (needs valid blog ID/slug)
curl https://api.your-domain.com/api/content/blog/123456789
```

---

## If Deployment Fails

### Check Common Issues

```bash
# 1. Check environment variables are set
railway env

# 2. Check logs for errors
railway logs -t

# 3. Check build output
railway logs | grep -i "error"

# 4. Verify database connection
curl https://api.your-domain.com/api/content/stats
# Should return JSON (not error)

# 5. Check port is listening
railway env | grep PORT
```

### Rollback to Previous Version

```bash
# Via Railway Dashboard
# → Deployments → Select previous version → Redeploy

# Via CLI
railway rollback [deployment-id]
```

---

## Domain Configuration

### DNS Records to Add (for Railway)

```
Type  | Name        | Value
------|-------------|------------------------------
A     | @           | [Railway IP from dashboard]
CNAME | www         | [Railway domain]
CNAME | api         | [Railway API domain]
```

### SSL Certificate (Automatic)

- Railway provides free SSL via Let's Encrypt
- Automatically renews every 90 days
- No manual configuration needed

---

## Post-Deployment Tasks

### 1. Verify Everything Works

```bash
# Test homepage loads
curl -I https://your-domain.com

# Test API responds
curl https://api.your-domain.com/api/content/stats

# Test search works
curl "https://api.your-domain.com/api/content/search?q=platform"

# Test detail page routing
curl "https://api.your-domain.com/api/content/blog" | head -20
```

### 2. Setup Monitoring

```bash
# Console logging is built-in
# Check Railway dashboard for error tracking

# Optional: Add Sentry for error tracking
# Visit https://sentry.io → Create project
# Add SENTRY_DSN to environment variables
```

### 3. Setup Analytics

```bash
# Google Analytics is optional
# Add GA tracking code if needed
# Already prepared for integration in frontend
```

---

## Useful Commands

```bash
# View all deployment files
ls -la ./dist/

# Check file sizes
du -sh ./dist/*

# View git status (if using GitHub)
git status
git log --oneline | head -5

# Check Node version
node --version

# Check npm version
npm --version

# View package list
npm list --prod (production dependencies only)
```

---

## Important File Locations

| File | Purpose |
|------|---------|
| `dist/` | Production build (deploy this) |
| `.env.production` | Production environment variables |
| `railway.json` | Railway deployment config |
| `Dockerfile` | Docker container config |
| `package.json` | Dependencies & scripts |
| `vite.config.ts` | Frontend build config |
| `api/server.js` | Backend entry point |
| `src/` | Frontend source code |

---

## Troubleshooting Reference

### "API not responding"
```bash
# Check backend is running
curl http://localhost:5002/health

# Check CORS configuration
curl -H "Origin: https://your-domain.com" \
  http://localhost:5002/api/content/stats
```

### "Database connection failed"
```bash
# Check MongoDB URI in .env.production
echo $MONGODB_URI

# Verify IP whitelisting in MongoDB Atlas
# → Security → Network Access → Add IP address
```

### "Frontend shows blank page"
```bash
# Check if dist/ folder exists
ls -la dist/

# Check if index.html is there
cat dist/index.html | head -5

# Check browser console for errors
# → Open DevTools → Console tab
```

### "Build taking too long"
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build

# Check for large dependencies
npm list --all | grep -i "large-package"
```

---

## Quick Checklist Before Clicking Deploy

- [ ] `npm run build` passes (0 errors)
- [ ] `.env.production` has all required variables
- [ ] Backend server tested locally on 5002
- [ ] Frontend tested locally on 5173
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Database backup created
- [ ] Domain DNS records pointing to platform
- [ ] SSL certificate auto-renewal checked
- [ ] Monitoring/logging configured
- [ ] Team notified of deployment

---

## Support Resources

```
Railway Docs:       https://docs.railway.app
Vercel Docs:        https://vercel.com/docs
MongoDB Atlas:      https://docs.atlas.mongodb.com
Express.js Docs:    https://expressjs.com
React Docs:         https://react.dev
Vite Docs:          https://vitejs.dev
```

---

## Contact & Documentation

- **API Documentation**: See `API_QUICK_REFERENCE.md`
- **Deployment Guide**: See `PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Testing Guide**: See `TESTING_GUIDE.md`
- **Troubleshooting**: See `API_TROUBLESHOOTING.md`

---

**Last Updated**: March 1, 2026
**Status**: Ready for Production
**Estimated Deploy Time**: 30 minutes - 2 hours

*For detailed information, see FINAL_DEPLOYMENT_SUMMARY.md*
