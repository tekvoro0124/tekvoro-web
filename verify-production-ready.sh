#!/bin/bash

# Tekvoro Production Deployment Verification Script
# This script verifies all systems are ready for production deployment

echo "🚀 Tekvoro Production Deployment Verification"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

CHECKS_PASSED=0
CHECKS_FAILED=0

check_command() {
  if eval "$1" > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC} $2"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}❌${NC} $2"
    ((CHECKS_FAILED++))
  fi
}

# 1. Build Check
echo ""
echo "📦 BUILD VERIFICATION"
echo "-------------------"
if [ -d "dist" ]; then
  echo -e "${GREEN}✅${NC} Production build folder exists"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}❌${NC} Production build folder missing (run 'npm run build')"
  ((CHECKS_FAILED++))
fi

# Check TypeScript
check_command "which tsc" "TypeScript compiler installed"

# 2. Backend Check
echo ""
echo "🔌 BACKEND VERIFICATION"
echo "-------------------"
check_command "curl -s http://localhost:5002/api/content/stats | grep -q 'blogPosts'" "Backend API responding with data"

# Check server process
if pgrep -f "node api/server.js" > /dev/null; then
  echo -e "${GREEN}✅${NC} Backend server running (node api/server.js)"
  ((CHECKS_PASSED++))
else
  echo -e "${YELLOW}⚠️${NC} Backend server not running (expected in prod environment)"
  ((CHECKS_FAILED++))
fi

# 3. Frontend Check
echo ""
echo "🎨 FRONTEND VERIFICATION"
echo "-------------------"
if [ -f "src/App.tsx" ]; then
  echo -e "${GREEN}✅${NC} Frontend source files present"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}❌${NC} Frontend source files missing"
  ((CHECKS_FAILED++))
fi

check_command "grep -q 'BlogDetailPage' src/App.tsx" "BlogDetailPage route configured"
check_command "grep -q 'ServiceDetailPage' src/App.tsx" "ServiceDetailPage route configured"
check_command "grep -q 'CaseStudyDetailPage' src/App.tsx" "CaseStudyDetailPage route configured"

# 4. Configuration Check
echo ""
echo "⚙️  CONFIGURATION VERIFICATION"
echo "-------------------"
if [ -f ".env.production" ]; then
  if grep -q "MONGODB_URI" .env.production; then
    echo -e "${GREEN}✅${NC} Production environment variables configured"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}❌${NC} MONGODB_URI not configured in .env.production"
    ((CHECKS_FAILED++))
  fi
else
  echo -e "${YELLOW}⚠️${NC} .env.production file not found"
  ((CHECKS_FAILED++))
fi

check_command "[ -f 'railway.json' ]" "Railway configuration present"
check_command "[ -f 'Dockerfile' ]" "Docker configuration present"

# 5. Dependencies Check
echo ""
echo "📚 DEPENDENCIES VERIFICATION"
echo "-------------------"
if grep -q '"dependencies"' package.json; then
  echo -e "${GREEN}✅${NC} package.json dependencies defined"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}❌${NC} package.json malformed"
  ((CHECKS_FAILED++))
fi

if [ -d "node_modules" ]; then
  echo -e "${GREEN}✅${NC} node_modules installed"
  ((CHECKS_PASSED++))
else
  echo -e "${YELLOW}⚠️${NC} node_modules not found (will be installed during deployment)"
  ((CHECKS_FAILED++))
fi

# 6. Database Check
echo ""
echo "🗄️  DATABASE VERIFICATION"
echo "-------------------"
if grep -q "mongodb" package-lock.json > /dev/null 2>&1; then
  echo -e "${GREEN}✅${NC} MongoDB driver in dependencies"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}❌${NC} MongoDB driver not found"
  ((CHECKS_FAILED++))
fi

# 7. API Routes Check
echo ""
echo "🛣️  API ROUTES VERIFICATION"
echo "-------------------"
if [ -f "api/routes/content.js" ]; then
  ROUTE_COUNT=$(grep -c "router\." api/routes/content.js || echo "0")
  echo -e "${GREEN}✅${NC} Content API routes defined (~$ROUTE_COUNT routes)"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}❌${NC} API routes file missing"
  ((CHECKS_FAILED++))
fi

# 8. Static Files Check
echo ""
echo "📄 STATIC FILES VERIFICATION"
echo "-------------------"
if [ -f "public/robots.txt" ] || [ -f "public/sitemap.xml" ]; then
  echo -e "${GREEN}✅${NC} SEO config files present (robots.txt, sitemap.xml)"
  ((CHECKS_PASSED++))
else
  echo -e "${YELLOW}⚠️${NC} SEO config files should be added (robots.txt, sitemap.xml)"
  ((CHECKS_FAILED++))
fi

# Summary
echo ""
echo "=================================================="
echo "📊 VERIFICATION SUMMARY"
echo "=================================================="
echo -e "${GREEN}✅ Passed: $CHECKS_PASSED${NC}"
echo -e "${RED}❌ Failed: $CHECKS_FAILED${NC}"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 All systems ready for production deployment!${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️  Some items need attention before production deployment${NC}"
  exit 1
fi
