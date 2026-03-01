# ⚡ Railway Deployment - Step by Step

## Status: Ready to Deploy ✅

Your Tekvoro website is built, tested, and ready for production on Railway.

---

## 🚀 Quick Start (5-10 minutes)

### Step 1: Create Railway Account
- Go to **https://railway.app**
- Click "Start New Project"
- Sign up with GitHub (recommended)

### Step 2: Create New Project
- Click "New Project"
- Select "Deploy from GitHub"
- Authorize Railway to access your repositories

### Step 3: Select Repository
- Find and select: **tekvoro-web**
- Select branch: **main**
- Railway will auto-detect Dockerfile and start building

### Step 4: Configure Environment Variables
In Railway Project Settings → Variables, add:

```
NODE_ENV=production
PORT=5002
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/tekvoro
JWT_SECRET=<generate-with-openssl-rand-base64-32>
SENDGRID_API_KEY=<your-sendgrid-key>
```

**How to get these:**

1. **MONGODB_URI**: From MongoDB Atlas
   - Log in to mongodb.com/cloud/atlas
   - Cluster → Connect → Connection String
   - Copy and paste the full connection string
   - Replace `<password>` with your password

2. **JWT_SECRET**: Generate a random secret
   ```bash
   openssl rand -base64 32
   ```
   - Copy the output and paste into Railway

3. **SENDGRID_API_KEY**: From SendGrid
   - Log in to sendgrid.com
   - Settings → API Keys → Create API Key
   - Copy and paste into Railway

### Step 5: Wait for Deployment
Railway will:
- ✅ Detect Dockerfile
- ✅ Build Docker image (2-3 min)
- ✅ Start Express server
- ✅ Assign public URL

Check deployment status in Railway dashboard:
- Settings → Deployments → View Logs

### Step 6: Verify It Works
Once deployment completes, Railway gives you a live URL like:
```
https://tekvoro-abc123.railway.app
```

Test these endpoints:
```bash
# Health check
curl https://tekvoro-abc123.railway.app/api/health

# Should return:
# {"status":"OK","timestamp":"...","service":"Tekvoro API","version":"1.0.0"}

# Test analytics
curl -X POST https://tekvoro-abc123.railway.app/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{"event":"pageview","page":"/"}'
```

### Step 7: Setup Custom Domain (Optional)
In Railway → Project Settings → Domains:

1. Click "Add Domain"
2. Enter: `www.tekvoro.com` (or your domain)
3. Railway shows a CNAME record
4. Add to your DNS provider
5. Wait 5-10 min for DNS update
6. Site is now accessible at your domain

---

## 📋 Checklist Before Deploying

- [ ] MongoDB Atlas cluster created and running
- [ ] IP whitelist includes ALL IPs (0.0.0.0/0) in MongoDB
- [ ] SendGrid account with API key
- [ ] JWT secret generated (`openssl rand -base64 32`)
- [ ] Code pushed to GitHub with latest Dockerfile fix
- [ ] All three pieces of info ready (MongoDB URI, JWT secret, SendGrid key)

---

## 🎯 Expected Results

After successful deployment:
- ✅ Homepage loads at your URL
- ✅ API responds on `/api/health`
- ✅ Forms submit without CORS errors
- ✅ Admin login works
- ✅ Database queries succeed
- ✅ Emails send via SendGrid
- ✅ Analytics tracking works

---

## ⚠️ Troubleshooting

### "Cannot find module" or "ENOENT" errors
→ Check MongoDB URI is correct, IP whitelist includes 0.0.0.0/0

### "JWT_SECRET not found" error
→ Verify JWT_SECRET environment variable is set in Railway

### CORS errors from frontend
→ Update CORS whitelist in `api/server.js` to include your domain

### 502 Bad Gateway
→ Check application logs in Railway dashboard
→ Usually means Express server failed to start
→ Verify all environment variables are set

### Database connection timeout
→ Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
→ Check username/password in connection string

### Build fails with peer dependency errors
→ Already fixed in Dockerfile with `--legacy-peer-deps`
→ If still issues, check Docker logs

---

## 📊 What Happens During Deployment

1. **GitHub Integration** (< 1 min)
   - Railway detects new push to main branch
   - Clones repository

2. **Docker Build** (2-3 min)
   - Reads Dockerfile
   - Downloads Node 18-alpine base image
   - Installs dependencies from package.json
   - Builds React frontend
   - Creates optimized production image

3. **Container Start** (< 1 min)
   - Express server starts on port 5002
   - Connects to MongoDB Atlas
   - Ready to receive requests

4. **Assignment** (< 1 min)
   - Railway assigns public URL
   - Sets up SSL/TLS certificate
   - Routes traffic to container

**Total time: 3-5 minutes**

---

## 💰 Pricing

Railway free tier includes:
- ✓ $5 free credit
- ✓ 1 GB storage
- ✓ Enough for testing

After free tier (~$5/month):
- Approximately $5-15/month for low traffic
- Scales up only if you use more resources
- Can pause deployment anytime

---

## 🔐 Security Notes

✅ **HTTPS/SSL**: Automatic by Railway
✅ **JWT Tokens**: 7-day expiry, refresh available
✅ **Password Hashing**: bcrypt for all user passwords
✅ **Database**: Credentials in environment variables (not in code)
✅ **API Keys**: SendGrid API key in environment variables

---

## 📝 After Successful Deployment

### 1. Create Admin User
See [ADMIN_SETUP_GUIDE.md](ADMIN_SETUP_GUIDE.md) for:
- Creating first admin account
- Setting up admin dashboard
- Managing content

### 2. Monitor Performance
- Check Railway logs daily for first week
- Monitor error rates
- Track database performance

### 3. Enable Backups
In MongoDB Atlas:
- Settings → Backup → Enable automatic backups
- Set backup frequency to daily

### 4. Setup Monitoring (Optional)
- Add Sentry for error tracking
- Add LogRocket for user sessions
- Setup uptime monitoring

---

## 🆘 Need Help?

| Document | Purpose |
|----------|---------|
| [QUICK_DEPLOY.md](QUICK_DEPLOY.md) | Reference commands |
| [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) | Complete detailed guide |
| [ADMIN_SETUP_GUIDE.md](ADMIN_SETUP_GUIDE.md) | Admin user setup |
| [DEBUG_GUIDE.md](DEBUG_GUIDE.md) | Database troubleshooting |

---

## ✅ Deployment Timeline

| Time | Task |
|------|------|
| Now | Go to railway.app and create project |
| +1 min | Connect GitHub repository |
| +2 min | Add environment variables |
| +5 min | Deployment completes |
| +1 min | Test API endpoints |
| +10 min | Setup custom domain (optional) |

**Total: ~10-15 minutes to have your site live on the internet!**

---

## 🎉 You're Ready!

Your Tekvoro website is production-ready. Deploying to Railway takes just 5-10 minutes.

**Next Step**: Go to https://railway.app and start creating your project!

Good luck! 🚀
