# 🚀 Railway Deployment Checklist

Use this checklist to gather everything you need before deploying.

---

## ✅ Prerequisites

### GitHub
- [ ] Repository: tekvoro-web is pushed to main branch
- [ ] Dockerfile is updated with multi-stage build
- [ ] All code changes are committed

**GitHub URL**: https://github.com/YOUR_USERNAME/tekvoro-web

---

## ✅ MongoDB Atlas Setup

### Account & Cluster
- [ ] Created MongoDB Atlas account (mongodb.com/cloud/atlas)
- [ ] Created a cluster (M0 free tier is fine for testing)
- [ ] Cluster is running and accessible

### Database Credentials
- [ ] Database username: `_____________________`
- [ ] Database password: `_____________________`

### Connection String
Get this from MongoDB Atlas → Cluster → Connect → Drivers

- [ ] Connection string template: 
  ```
  mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/tekvoro?retryWrites=true&w=majority
  ```

### Replace placeholders:
```
mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster.mongodb.net/tekvoro?retryWrites=true&w=majority
```

- [ ] Full connection string copied: `_____________________`

### IP Whitelist
- [ ] Added 0.0.0.0/0 to IP whitelist (allows all IPs)
  - OR specific Railway IP (get from Railway dashboard)

---

## ✅ JWT Secret

Generate a secure random string:

```bash
openssl rand -base64 32
```

**Example output:**
```
abc123def456ghi789jkl012mno345pqr678stu901vwx
```

- [ ] JWT Secret: `_____________________`

---

## ✅ SendGrid Setup

### Account
- [ ] Created SendGrid account (sendgrid.com)
- [ ] Verified sender email address

### API Key
Get from SendGrid → Settings → API Keys → Create API Key

- [ ] API Key: `_____________________`

**Note**: Make sure it's a "Full Access" or "Mail Send" key

---

## ✅ Railway Account

- [ ] Created Railway account (railway.app)
- [ ] Verified email address
- [ ] Added payment method (even if using free tier)

---

## ✅ Summary of Information Needed

Before going to Railway dashboard, collect:

| Variable | Value | Example |
|----------|-------|---------|
| NODE_ENV | production | production |
| PORT | 5002 | 5002 |
| MONGODB_URI | From MongoDB Atlas | mongodb+srv://user:pass@... |
| JWT_SECRET | `openssl rand -base64 32` | abc123def456ghi... |
| SENDGRID_API_KEY | From SendGrid | SG.abc123def456... |

---

## ✅ Domain (Optional but Recommended)

### If using custom domain:
- [ ] Domain registered (godaddy.com, namecheap.com, etc.)
- [ ] Domain ownership verified
- [ ] Domain: `_____________________`

### After Railway deployment:
- [ ] Get CNAME record from Railway
- [ ] Add CNAME to DNS provider
- [ ] Wait for DNS propagation (5-10 min)

---

## 🎯 Step-by-Step Deployment

### 1. Go to Railway
- [ ] Open https://railway.app
- [ ] Sign in with GitHub

### 2. Create New Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub"
- [ ] Authorize Railway app
- [ ] Select tekvoro-web repository
- [ ] Select main branch

### 3. Add Environment Variables
In Railway Project Settings → Variables:

- [ ] Add: NODE_ENV = production
- [ ] Add: PORT = 5002
- [ ] Add: MONGODB_URI = (your MongoDB connection string)
- [ ] Add: JWT_SECRET = (your generated secret)
- [ ] Add: SENDGRID_API_KEY = (your SendGrid API key)

### 4. Wait for Build & Deployment
- [ ] Watch logs in Railway dashboard
- [ ] Deployment should complete in 3-5 minutes
- [ ] Note the generated URL (e.g., tekvoro-abc123.railway.app)

### 5. Test Deployment
```bash
# Replace with your actual Railway URL
curl https://tekvoro-abc123.railway.app/api/health

# Should return: {"status":"OK",...}
```

- [ ] API health endpoint responds
- [ ] Homepage loads without errors
- [ ] No CORS errors in browser console

### 6. Setup Custom Domain (Optional)
- [ ] Go to Railway → Project → Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter your domain
- [ ] Get CNAME record from Railway
- [ ] Add CNAME to your DNS provider
- [ ] Wait for DNS propagation

---

## 📊 Deployment Verification

After deployment, verify:

### API Endpoints
```bash
# Health
curl https://YOUR-DOMAIN/api/health

# Analytics
curl -X POST https://YOUR-DOMAIN/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{"event":"pageview"}'

# Contact form
curl -X POST https://YOUR-DOMAIN/api/contact/simple \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "email":"test@example.com",
    "subject":"Test",
    "message":"Test"
  }'
```

### Frontend
- [ ] Homepage loads at https://YOUR-DOMAIN
- [ ] No console errors in DevTools
- [ ] Mobile version responsive
- [ ] Navigation works

### Admin
- [ ] Admin login page accessible at /admin/login
- [ ] Can't access /admin without login (redirects)
- [ ] Admin dashboard loads after login

---

## 🔧 Troubleshooting Prep

### If MongoDB connection fails:
- [ ] Check username/password in connection string
- [ ] Check IP whitelist includes 0.0.0.0/0
- [ ] Check database name is correct (tekvoro)

### If JWT errors occur:
- [ ] Verify JWT_SECRET environment variable is set in Railway
- [ ] Make sure secret contains no spaces or special characters

### If CORS errors:
- [ ] Check your domain is in CORS whitelist in api/server.js
- [ ] Or contact admin to update whitelist

### If build fails:
- [ ] Check Docker logs in Railway
- [ ] Verify package.json is valid
- [ ] Check Dockerfile multi-stage build syntax

---

## 📝 After Successful Deployment

- [ ] Create admin user (see ADMIN_SETUP_GUIDE.md)
- [ ] Test all features on production
- [ ] Enable MongoDB backups
- [ ] Setup error tracking (optional: Sentry)
- [ ] Configure monitoring (optional: Uptime Robot)
- [ ] Document any custom tweaks made

---

## 💾 Keep This Information Safe

You'll need these credentials for:
- Database maintenance
- Backup recovery
- API scaling
- Emergency access

**Store securely**:
- [ ] Password manager (1Password, Bitwarden, etc.)
- [ ] Secure notes
- [ ] NOT plain text files or email

---

## 🎉 Ready to Deploy?

Once all items are checked off, you're ready to:
1. Go to railway.app
2. Create your project
3. Add environment variables
4. Deploy!

**Estimated time: 5-10 minutes total**

---

**Questions?** See RAILWAY_DEPLOYMENT.md for detailed step-by-step guide.
