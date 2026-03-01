# Railway Deployment Guide - Step by Step

## Prerequisites Checklist
- [x] GitHub account
- [x] Code pushed to GitHub (tekvoro-web repository)
- [x] Build passes locally (npm run build)
- [x] .env.production configured
- [x] railway.json present

---

## Step 1: Create Railway Account & Project

### 1a. Visit Railway
```
https://railway.app
```

### 1b. Sign Up / Login
- Click "Get Started"
- Sign in with GitHub (easiest method)
- Authorize GitHub access

### 1c. Create New Project
- Click "New Project" button
- Select "Deploy from GitHub repo"

---

## Step 2: Connect Your GitHub Repository

### 2a. Select Repository
- Search for: "tekvoro-web"
- Select the repository from your account
- Click "Deploy Now"

Railway will automatically detect:
- Node.js project
- package.json
- Build scripts
- And start the deployment process

### 2b. Deployment Progress
Watch as Railway:
1. Clones your repository
2. Installs dependencies (npm ci)
3. Builds the frontend (npm run build)
4. Starts the backend (node api/server.js)

**This takes 2-5 minutes**

---

## Step 3: Configure Environment Variables

### 3a. Go to Project Settings
- In Railway dashboard, click your project
- Go to "Settings" tab
- Select "Environment Variables"

### 3b. Add Production Variables

**Paste each of these:**

```
MONGODB_URI=mongodb+srv://info_db_sanjeevm:zRh4pYJVkJaqPhyo@cluster0.rstdows.mongodb.net/tekvoro?appName=Cluster0

NODE_ENV=production

JWT_SECRET=your-random-secret-key-here

SENDGRID_API_KEY=<your-sendgrid-api-key>

OPENAI_API_KEY=<your-openai-api-key>

PORT=3000

ADMIN_EMAIL=info@tekvoro.com

CLIENT_URL=https://your-domain.com

ALLOWED_ORIGINS=https://your-domain.com,https://www.tekvoro.com
```

### 3c. Important Notes
- Don't share these values publicly
- MONGODB_URI is already configured for your database
- Generate a new JWT_SECRET for security (or use a secure random string generator)

---

## Step 4: Monitor Deployment

### 4a. View Build Logs
- In Railway, click "Deployments"
- Select latest deployment
- Click "View Logs"

### 4b. Wait for Success
Look for messages like:
```
✓ built in 11.21s
Server running on port 3000
Connected to MongoDB
```

### 4c. If Build Fails
Common issues & solutions:
```
"Module not found" 
→ Run: npm ci --legacy-peer-deps locally

"MONGODB_URI not defined"
→ Add it to environment variables in Railway

"Port already in use"
→ Change PORT in .env.production

See QUICK_DEPLOYMENT_REFERENCE.md for more troubleshooting
```

---

## Step 5: Get Your Production URL

### 5a. View Deployment URL
- In Railway, go to your project
- Click "Deployments" tab
- Latest deployment shows your URL
- Looks like: `tekvoro-web-production-xxxx.railway.app`

### 5b. Test the Backend
```bash
# Should return JSON with content counts
curl https://tekvoro-web-production-xxxx.railway.app/api/content/stats

# Expected output:
{"blogPosts":5,"services":5,"caseStudies":2,"totalViews":0,"totalContent":12}
```

---

## Step 6: Configure Custom Domain (Optional)

### 6a. Point Your Domain
In your domain registrar (GoDaddy, Namecheap, etc.):
1. Add CNAME record:
   - Name: `api`
   - Value: `tekvoro-web-production-xxxx.railway.app`

### 6b. In Railway
- Project Settings → Railway Domain
- Add your custom domain
- Railway auto-provides SSL certificate

---

## Step 7: Test Everything Works

### 7a. Test API Endpoints

```bash
# Test stats endpoint
curl https://your-domain.com/api/content/stats

# Test search
curl "https://your-domain.com/api/content/search?q=AI"

# Test blog endpoint
curl https://your-domain.com/api/content/blog

# All should return JSON data
```

### 7b. Verify in Browser
```
Go to https://your-domain.com/api/content/stats
You should see JSON data with blog posts, services, case studies
```

---

## Step 8: Deploy Frontend (Optional - Separate)

If you want to separate frontend and backend:

### Option A: Keep together (Current)
- Frontend: Served from same Railway app
- Backend API: Same Railway app
- ✅ Simplest approach

### Option B: Deploy frontend to Vercel separately
```
1. Go to https://vercel.com
2. Import your repository
3. Vercel automatically detects Vite config
4. Deploy with one click
5. Update VITE_API_URL to point to your Railway backend
```

---

## Step 9: Setup Monitoring (Recommended)

### 9a. View Logs in Railway
- Your project → "Deployments" → Latest
- Watch logs in real-time
- Set up alerts for crashes

### 9b. Monitor Resource Usage
- Railway dashboard shows:
  - CPU usage
  - Memory usage
  - Network I/O
- Scale if needed

---

## Verification Checklist

After deployment, verify:

- [ ] Backend URL responds: `curl https://your-url/api/content/stats`
- [ ] Returns JSON with 12 content items
- [ ] Search works: `curl "https://your-url/api/content/search?q=platform"`
- [ ] No errors in Railway logs
- [ ] Database connection is active
- [ ] Frontend loads (if deployed with backend)

---

## If Something Goes Wrong

### Check Logs
```bash
# In Railway dashboard:
# Click project → Deployments → View Logs
# Search for "error" or "failed"
```

### Common Issues

**"Cannot find module"**
→ Memory issue or missing dependencies
→ Solution: Redeploy or increase memory in Railway settings

**"ECONNREFUSED" to MongoDB**
→ Check MONGODB_URI in environment variables
→ Verify IP whitelist in MongoDB Atlas: https://account.mongodb.com

**"Port already in use"**
→ Change PORT to 3000 (or auto by Railway)

**"Timeout during build"**
→ Increase build timeout in Railway settings
→ Or rebuild in Railway by clicking "Redeploy"

---

## Success Indicators

Your deployment is successful when:

✅ Build completed in Railway dashboard
✅ No red errors in logs
✅ API responds with JSON data
✅ Your custom domain works (if configured)
✅ Uptime shows active

---

## Next: Monitor Your Deployment

### Daily Checks
- [ ] Check Railway dashboard for any errors
- [ ] Monitor error rate (should be < 1%)
- [ ] Check response times (should be <200ms)

### Weekly Tasks
- [ ] Review logs for patterns
- [ ] Check analytics
- [ ] Monitor database performance

### Monthly Maintenance
- [ ] Review cost
- [ ] Analyze user traffic
- [ ] Plan optimizations
- [ ] Update dependencies

---

## Support & Resources

- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Node.js Best Practices: https://nodejs.org/en/docs/guides/nodejs-web-app-using-expressjs-and-railway/

---

## Useful Railway Commands (CLI Optional)

If you prefer command line:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Connect to your repository
railway init

# Deploy
railway up

# View logs
railway logs

# Get project status
railway status
```

---

**You're ready to deploy! 🚀**

Next step: Go to https://railway.app and create your project
