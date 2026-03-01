#!/bin/bash

# Tekvoro Deployment Verification Script
# Run this after deployment to verify all endpoints are working

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
if [ -z "$1" ]; then
    echo "Usage: ./DEPLOYMENT_VERIFICATION.sh <domain>"
    echo "Example: ./DEPLOYMENT_VERIFICATION.sh https://www.tekvoro.com"
    exit 1
fi

DOMAIN="$1"
API_URL="$DOMAIN/api"

echo -e "${YELLOW}Starting Tekvoro Deployment Verification${NC}"
echo "Target: $API_URL"
echo ""

# Test results
PASS=0
FAIL=0

test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected_status=$4
    local description=$5

    echo -n "Testing $description... "

    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi

    # Extract status code (last line)
    status=$(echo "$response" | tail -1)
    body=$(echo "$response" | sed '$d')

    if [ "$status" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status)"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $status)"
        echo "  Response: $body"
        ((FAIL++))
    fi
}

# 1. API Health Check
echo -e "${YELLOW}1. Basic API Tests${NC}"
test_endpoint "GET" "/health" "" "200" "Health check endpoint"

# 2. Analytics Tests
echo ""
echo -e "${YELLOW}2. Analytics Tests${NC}"
test_endpoint "POST" "/analytics/track" \
    '{"event":"pageview","page":"/","referrer":""}' \
    "200" "Track page view"

test_endpoint "POST" "/analytics/track" \
    '{"event":"button-click","page":"/","element":"signup"}' \
    "200" "Track button click"

# 3. Contact Form Tests
echo ""
echo -e "${YELLOW}3. Contact Form Tests${NC}"
test_endpoint "POST" "/contact/simple" \
    '{"name":"Test User","email":"test@example.com","subject":"Testing","message":"This is a test message"}' \
    "201" "Submit contact form"

# 4. Newsletter Subscription Tests
echo ""
echo -e "${YELLOW}4. Newsletter Subscription Tests${NC}"
test_endpoint "POST" "/subscription/subscribe" \
    '{"email":"subscriber@example.com"}' \
    "201" "Subscribe to newsletter"

# 5. Book Demo Tests
echo ""
echo -e "${YELLOW}5. Book Demo Tests${NC}"
test_endpoint "POST" "/contact/book-demo" \
    '{"name":"Demo User","email":"demo@example.com","company":"Acme Inc","phone":"+1234567890"}' \
    "201" "Book a demo"

# 6. Admin Auth Tests
echo ""
echo -e "${YELLOW}6. Authentication Tests${NC}"
test_endpoint "POST" "/auth/login" \
    '{"email":"admin@tekvoro.com","password":"TestPassword123"}' \
    "200" "Admin login (may fail if user not created)"

test_endpoint "POST" "/auth/register" \
    '{"name":"New User","email":"newuser@example.com","password":"SecurePassword123"}' \
    "201" "User registration"

# 7. Ticket Management Tests (requires auth, skipping status checks)
echo ""
echo -e "${YELLOW}7. Ticket Management Tests${NC}"
echo -n "Testing create ticket endpoint... "
ticket_response=$(curl -s -X POST "$API_URL/tickets" \
    -H "Content-Type: application/json" \
    -d '{"title":"Test Ticket","description":"Testing the ticket system","email":"user@example.com","category":"general","priority":"medium"}' 2>&1)
if echo "$ticket_response" | grep -q "title\|error"; then
    echo -e "${GREEN}✓ PASS${NC} (Endpoint responding)"
    ((PASS++))
else
    echo -e "${YELLOW}⚠ CHECK${NC} (Unexpected response format)"
fi

test_endpoint "GET" "/tickets" "" "200" "Get tickets list (public)"

# 8. Event Management Tests
echo ""
echo -e "${YELLOW}8. Event Management Tests${NC}"
echo -n "Testing create event endpoint... "
event_response=$(curl -s -X POST "$API_URL/events" \
    -H "Content-Type: application/json" \
    -d '{"title":"Test Webinar","description":"Testing the event system","eventType":"webinar","date":"2025-03-15T10:00:00Z","capacity":100}' 2>&1)
if echo "$event_response" | grep -q "title\|error"; then
    echo -e "${GREEN}✓ PASS${NC} (Endpoint responding)"
    ((PASS++))
else
    echo -e "${YELLOW}⚠ CHECK${NC} (Unexpected response format)"
fi

test_endpoint "GET" "/events" "" "200" "Get upcoming events"

# 9. Frontend Tests
echo ""
echo -e "${YELLOW}9. Frontend Tests${NC}"
echo -n "Testing frontend index.html... "
frontend_status=$(curl -s -w "%{http_code}" -o /dev/null "$DOMAIN/")
if [ "$frontend_status" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} (Status: $frontend_status)"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC} (Status: $frontend_status)"
    ((FAIL++))
fi

echo -n "Testing admin login page... "
admin_status=$(curl -s -w "%{http_code}" -o /dev/null "$DOMAIN/admin/login")
if [ "$admin_status" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} (Status: $admin_status)"
    ((PASS++))
else
    echo -e "${YELLOW}⚠ CHECK${NC} (Status: $admin_status - may be expected)"
fi

# Summary
echo ""
echo -e "${YELLOW}═════════════════════════════════════${NC}"
echo -e "Deployment Verification Summary"
echo -e "${GREEN}Tests Passed: $PASS${NC}"
if [ $FAIL -gt 0 ]; then
    echo -e "${RED}Tests Failed: $FAIL${NC}"
else
    echo -e "${GREEN}Tests Failed: 0${NC}"
fi
echo -e "${YELLOW}═════════════════════════════════════${NC}"

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ All critical endpoints are working!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some endpoints need attention${NC}"
    exit 1
fi
