# API Connection Troubleshooting Guide

## Quick Status Check

Run the health check script:
```bash
node test-api-health.js
```

This will test:
- ✅ Local API (localhost:5002)
- ✅ Railway Production API
- ✅ Netlify Frontend

## Common Issues & Solutions

### 1. Local API Not Responding

**Problem:** Can't connect to `http://localhost:5002/api/health`

**Solution:**
```bash
# Install dependencies
cd api && npm install && cd ..

# Start the API server
npm run dev
# Or directly:
node api/server.js
```

Check the output for:
- `✅ Connected to MongoDB` - Good
- `❌ MongoDB connection error` - See Issue 2
- `🎯 Tekvoro API running on port 5002` - Good

---

### 2. MongoDB Connection Failed

**Problem:** 
```
❌ MongoDB connection error: MongoServerError
```

**Root Cause:** `MONGODB_URI` environment variable not set or invalid

**Solution:**

#### Step 1: Create `.env` file in `/api` directory
```bash
cp api/.env.example api/.env
```

#### Step 2: Add MongoDB Connection String

For **MongoDB Atlas** (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tekvoro?retryWrites=true&w=majority
```

For **Local MongoDB**:
```
MONGODB_URI=mongodb://localhost:27017/tekvoro
```

#### Step 3: Verify Connection
```bash
# Test MongoDB connection
node api/test-db.js
```

---

### 3. Railway API Not Responding

**Problem:** 
```
❌ Railway API gives "Application not found"
```

**Diagnosis:**
1. Go to https://railway.app
2. Find `tekvoro-web` project
3. Check: Build Logs → Did the build succeed?
4. Check: Deployment Logs → Are there runtime errors?

**Common causes:**

#### A) Build Failed
- Missing `npm install` in build command ✅ FIXED
- Dependencies not installed

**Fix:**
```bash
git push origin main  # Trigger rebuild
```

#### B) Environment Variables Not Set
1. In Railway Dashboard: Click Variables tab
2. Add these variables:
   - `MONGODB_URI` = Your MongoDB connection string
   - `NODE_ENV` = `production`
   - `PORT` = `5002` (optional, Railway auto-assigns)

**To verify:**
```bash
curl https://tekvoro-production.up.railway.app/api/health | jq .
```

#### C) Database Connection Failing on Railway
- Fix: Whitelist Railway server IP in MongoDB Atlas
- Run: `node add-mongodb-whitelist.js`

---

### 4. Netlify Build Failing

**Problem:** Build log shows `vite: not found`

**Solution:** ✅ FIXED
- Updated `netlify.toml` to include `npm install` before build
- This ensures vite is installed before building

**To verify:**
```bash
git log --oneline | head -5
# Should show recent commits including "Fix: Add npm install to build command"
```

---

## Testing Endpoints

### Local Testing
```bash
# Health check
curl http://localhost:5002/api/health

# With formatted output
curl http://localhost:5002/api/health | json_pp
# or
node -e "console.log(require('http').get('http://localhost:5002/api/health', r => r.pipe(process.stdout)))"
```

### Production Testing
```bash
# Railway API
curl https://tekvoro-production.up.railway.app/api/health

# Netlify Frontend
curl -I https://www.tekvoro.com
```

---

## Debug Workflow

Run these in order:

```bash
# 1. Check local API
node test-api-health.js

# 2. Check .env file
cat api/.env | grep MONGODB

# 3. Test MongoDB connection
node api/test-db.js

# 4. Test local API manually
curl http://localhost:5002/api/health

# 5. Check Git status before pushing
git status

# 6. Push to trigger Railway rebuild
git push origin main

# 7. Wait 2-3 minutes for Railway rebuild

# 8. Test Railway API
curl https://tekvoro-production.up.railway.app/api/health
```

---

## Environment Setup Checklist

### Local Development
- [ ] `api/.env` file created with `MONGODB_URI`
- [ ] MongoDB running (local or Atlas connection valid)
- [ ] `npm install` completed in root and `/api`
- [ ] `npm run dev` starts API without errors
- [ ] `curl http://localhost:5002/api/health` returns 200

### Railway Production
- [ ] Latest code pushed to `main` branch
- [ ] Railway build succeeded (check Build Logs)
- [ ] Environment variables set in Railway:
  - [ ] `MONGODB_URI`
  - [ ] `NODE_ENV=production` (optional)
- [ ] MongoDB Atlas whitelist includes Railway IP
- [ ] `curl https://tekvoro-production.up.railway.app/api/health` returns 200

### Netlify Frontend
- [ ] Build succeeded (check Netlify Deploy Logs)
- [ ] Frontend loads at https://www.tekvoro.com
- [ ] API proxy configured in `netlify.toml`

---

## Next Steps

Once all health checks pass:

1. **Test API Endpoints**
   ```bash
   curl http://localhost:5002/api/content
   curl http://localhost:5002/api/contact
   ```

2. **Test Frontend Integration**
   - Visit https://www.tekvoro.com
   - Check browser console for API errors
   - Verify data loads from API

3. **Monitor Health**
   - Set up automated health checks
   - Configure alerts for API failures

---

**Need help?** Check:
- Railway Dashboard Logs: https://railway.app
- Local Server: `node test-api-health.js`
- Environment: `cat api/.env`
