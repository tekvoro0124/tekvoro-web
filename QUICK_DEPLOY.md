# Quick Deployment Reference

## 🚀 Deploy to Railway (Recommended - 5 minutes)

### Prerequisites
- Railway account: https://railway.app
- GitHub repository connected
- Environment variables ready

### Steps

```bash
# 1. Push latest code to GitHub
cd ~/Desktop/tekvoro-latest-website/tekvoro-web
git add -A
git commit -m "Phase 7: Ready for production deployment"
git push origin main

# 2. On Railway Dashboard:
# - Log in to railway.app
# - Click "New Project"
# - Select "Deploy from GitHub"
# - Choose tekvoro-web repository
# - Select main branch
# - Wait for deployment to complete

# 3. Set Environment Variables in Railway Dashboard:
# Node -> Variables -> Add new
NODE_ENV=production
PORT=5002
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/tekvoro
JWT_SECRET=<paste-your-secret>
SENDGRID_API_KEY=<your-sendgrid-key>

# 4. Test deployment
./DEPLOYMENT_VERIFICATION.sh https://your-railway-domain.railway.app
```

---

## 🚀 Deploy to Heroku (10 minutes)

### Prerequisites
```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku auth:login
```

### Steps

```bash
# 1. Create Heroku app
heroku create tekvoro-app

# 2. Add buildpacks
heroku buildpacks:add heroku/nodejs

# 3. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/tekvoro"
heroku config:set JWT_SECRET="$(openssl rand -base64 32)"
heroku config:set SENDGRID_API_KEY="your-key"

# 4. Deploy
git push heroku main

# 5. Check logs
heroku logs --tail

# 6. Test
./DEPLOYMENT_VERIFICATION.sh https://tekvoro-app.herokuapp.com
```

---

## 🚀 Deploy to DigitalOcean VPS (Manual - 45 minutes)

### Prerequisites
- DigitalOcean account
- $5-20/month Ubuntu VPS
- SSH access to server
- Domain name

### Steps

```bash
# 1. SSH into VPS
ssh root@your.vps.ip.address

# 2. Setup Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx

# 3. Clone repository
mkdir -p /var/www/tekvoro
cd /var/www/tekvoro
git clone https://github.com/YOUR_USERNAME/tekvoro-web.git .

# 4. Install dependencies
npm ci
cd api && npm ci && cd ..

# 5. Create .env file
cat > .env <<EOF
NODE_ENV=production
PORT=5002
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tekvoro
JWT_SECRET=$(openssl rand -base64 32)
SENDGRID_API_KEY=your-key
EOF

# 6. Build frontend
npm run build

# 7. Setup PM2
sudo npm install -g pm2
pm2 start api/server.js --name "tekvoro-api"
pm2 save && pm2 startup

# 8. Setup Nginx (see PRODUCTION_DEPLOYMENT.md for full config)
# [Create Nginx config file and enable SSL with Let's Encrypt]

# 9. Setup SSL with Let's Encrypt
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d tekvoro.com -d www.tekvoro.com

# 10. Test
curl http://localhost:5002/api/health
```

---

## 📋 Pre-Deployment Checklist

```bash
# 1. Verify build works
npm run build
ls -la dist/ | head -10

# 2. Verify all code is committed
git status

# 3. Generate secure JWT secret
openssl rand -base64 32

# 4. Verify MongoDB connection string format
# Should be: mongodb+srv://username:password@cluster.mongodb.net/dbname

# 5. Have SendGrid API key ready
# From SendGrid dashboard: Settings > API Keys

# 6. Verify Dockerfile builds locally (optional)
docker build -t tekvoro:latest .
```

---

## ✅ Post-Deployment Verification

```bash
# Run after deployment is complete
./DEPLOYMENT_VERIFICATION.sh https://your-production-domain.com

# Or test manually:

# Test health
curl https://your-domain.com/api/health

# Test analytics
curl -X POST https://your-domain.com/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{"event":"pageview","page":"/"}'

# Test contact form
curl -X POST https://your-domain.com/api/contact/simple \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'

# Test frontend
curl https://your-domain.com/

# Test admin login page
curl https://your-domain.com/admin/login
```

---

## 🆘 Troubleshooting

### MongoDB Connection Fails
```bash
# Check MongoDB Atlas:
# 1. Verify IP whitelist includes 0.0.0.0/0 (or your deployment IP)
# 2. Check username/password in connection string
# 3. Verify database name matches connection string
```

### Port Already in Use
```bash
# Find what's using port 5002
lsof -i :5002

# Kill process
kill -9 <PID>
```

### Static Files Not Serving
```bash
# Verify dist/ folder exists
ls -la dist/

# Rebuild frontend
npm run build

# Check server.js has static file serving configured
grep "express.static" api/server.js
```

### Can't Connect to API
```bash
# Check if server is running
curl http://localhost:5002/api/health

# Check logs (Railway/Heroku)
heroku logs --tail
railway logs

# Check environment variables are set
echo $MONGODB_URI
echo $JWT_SECRET
```

---

## 📝 Important Notes

- **JWT_SECRET**: Generate with `openssl rand -base64 32` - must be secure
- **First Admin**: Create admin@tekvoro.com user after deployment (see ADMIN_SETUP_GUIDE.md)
- **Domain Setup**: Update DNS CNAME to point to your deployment domain
- **Backups**: Enable automated backups in MongoDB Atlas
- **Monitoring**: Setup error tracking (optional: Sentry)
- **Email**: Verify SendGrid is working for form submissions

---

## 🔗 Quick Links

- **Railway**: https://railway.app
- **Heroku**: https://dashboard.heroku.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **SendGrid**: https://sendgrid.com
- **DigitalOcean**: https://www.digitalocean.com

---

## 📞 Need Help?

Detailed guides available:
- `PRODUCTION_DEPLOYMENT.md` - Complete deployment procedures
- `ADMIN_SETUP_GUIDE.md` - Admin user creation and management
- `TESTING_GUIDE.md` - Full test procedures
- `DEBUG_GUIDE.md` - Database troubleshooting

---

**Good luck with your deployment! 🚀**
