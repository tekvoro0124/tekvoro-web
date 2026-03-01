# Tekvoro Testing Guide

Complete End-to-End, API, and Security testing framework for the Tekvoro website.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Test Layers](#test-layers)
- [Running Tests](#running-tests)
- [Environment Setup](#environment-setup)
- [Test Structure](#test-structure)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Overview

The testing framework covers three layers:

1. **E2E Tests (Playwright)** - Browser automation testing across Chromium, Firefox, and WebKit
2. **API Tests (Jest + Supertest)** - Backend endpoint testing with authentication and validation
3. **Security Tests (Jest)** - SQL injection, XSS, CSRF, authentication, authorization, rate limiting

### Test Coverage

- **Authentication**: Login, signup, logout, session persistence, token validation
- **API Endpoints**: News search, filtering, saving articles, user profiles
- **Admin Dashboard**: User management, content moderation, analytics
- **News Search**: Search, filtering, sorting, trending articles
- **Security**: Injection attacks, XSS prevention, CSRF protection, rate limiting
- **Database**: Data persistence, validation, relationships
- **Real-time Features**: Live updates, notifications, alerts

## Quick Start

### Prerequisites

```bash
# Install Node.js 20+
node --version

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install dev dependencies for API tests
npm install --save-dev jest supertest jest-junit babel-jest @babel/preset-env bcryptjs dotenv node-fetch
```

### Run All Tests

```bash
# Run all tests (E2E + API + Security)
npm run test:all

# Or run individual test suites
npm run test:e2e        # E2E tests only
npm run test:api        # API tests only
npm run test:security   # Security tests only
```

### View Test Reports

```bash
# E2E test report
npm run test:e2e
# Open playwright-report/index.html

# API test coverage
npm run test:api:coverage
# Open test-results/api-coverage/index.html
```

## Test Layers

### 1. E2E Tests (Playwright)

**Location**: `tests/e2e/`

**Structure**:
```
tests/e2e/
├── playwright.config.ts      # Playwright configuration
├── fixtures/
│   └── auth.fixture.ts       # Authentication fixtures
├── utils/
│   └── page-objects.ts       # Page Object Model classes
└── specs/
    ├── auth.spec.ts          # Authentication tests
    ├── admin-dashboard.spec.ts
    ├── news-search.spec.ts
    └── security.spec.ts
```

**Key Classes**:
- `LoginPage` - Login form interactions
- `AdminDashboardPage` - Admin dashboard interactions
- `NewsSearchPage` - News search interactions
- `AlertsPage` - Alert management interactions

**Features**:
- Fixtures for authenticated users (regular + admin)
- Multi-browser testing (Chromium, Firefox, WebKit)
- Screenshot/video on failure
- HTML test report

### 2. API Tests (Jest + Supertest)

**Location**: `tests/api/`

**Structure**:
```
tests/api/
├── jest.config.js            # Jest configuration
├── setup/
│   ├── jest.setup.js         # Test environment setup
│   └── seed-test-data.js     # Test data factories
├── fixtures/
│   └── (reserved for fixtures)
└── tests/
    ├── auth.test.js          # Authentication API tests
    ├── news.test.js          # News API tests
    └── security.test.js      # Security tests
```

**Test Data Factory**:
```javascript
const { TestDataFactory, seedHelpers } = require('../setup/seed-test-data');

// Create test users
const user = TestDataFactory.createUser({ email: 'test@example.com' });
const admin = TestDataFactory.createAdmin({ email: 'admin@example.com' });

// Hash passwords
const hashedPassword = await TestDataFactory.hashPassword('password');

// Generate test data
const article = TestDataFactory.createArticle({ title: 'Test Article' });
const alert = TestDataFactory.createAlert({ keywords: ['tech'] });

// Helper functions
seedHelpers.generateEmail('prefix'); // prefix_random@tekvoro.test
seedHelpers.generateJWT('userId', 'admin'); // Mock JWT token
seedHelpers.generateNumber(0, 100); // Random number
```

**Test Coverage**:
- Authentication (12 tests)
- News API (12 tests)
- Security (15 tests)

### 3. Security Tests

**Included in API tests** - Dedicated security.test.js with:
- SQL/NoSQL injection prevention
- XSS prevention
- CSRF protection
- Input validation
- Rate limiting
- Token security
- Data exposure prevention

## Running Tests

### Development

```bash
# Start dev server
npm run dev

# In another terminal, run tests

# Watch mode for E2E
npm run test:e2e:watch

# Watch mode for API
npm run test:api:watch

# Debug mode
npm run test:e2e:debug

# UI mode (interactive)
npm run test:e2e:ui
```

### Production/CI

```bash
# All tests with coverage
npm run test:all

# Security tests only
npm run test:security

# With coverage report
npm run test:coverage
```

### Specific Test Files

```bash
# Run specific E2E test
npx playwright test tests/e2e/specs/auth.spec.ts

# Run specific API test
npm run test:api tests/api/tests/auth.test.js

# Run specific test by name
npx playwright test -g "should display login form"
```

## Environment Setup

### Test Environment Variables

Create `.env.test` in the root directory:

```env
# API Configuration
NODE_ENV=test
VITE_API_URL=http://localhost:5002
VITE_APP_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/tekvoro-test

# JWT Configuration
JWT_SECRET=test-secret-key-12345

# Test Credentials - Regular User
TEST_USER_EMAIL=user@tekvoro.test
TEST_USER_PASSWORD=User@12345

# Test Credentials - Admin User
TEST_ADMIN_EMAIL=admin@tekvoro.test
TEST_ADMIN_PASSWORD=Admin@12345
```

### Database Setup

```bash
# Start MongoDB (if using local MongoDB)
mongod --dbpath ./data/test-db

# Or use Docker
docker run -d -p 27017:27017 --name tekvoro-test-mongodb mongo:latest

# Create test database and users
# Run setup scripts if available
node api/setup-admin.js
```

### Backend Server

```bash
# Start backend API server (must be running for tests)
cd api
npm install
node server.js

# Server should be running on http://localhost:5002
```

### Frontend Development Server

```bash
# Start Vite dev server (for E2E tests)
npm run dev

# Server should be running on http://localhost:5173
```

## Test Structure

### E2E Test Example

```typescript
import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../utils/page-objects';

test.describe('Authentication', () => {
  test('should login successfully', async ({ authenticatedPage, page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('user@tekvoro.test', 'User@12345');
    
    // Check redirect
    await expect(page).toHaveURL('/dashboard');
    
    // Check token storage
    const token = await page.evaluate(() => 
      localStorage.getItem('tekvoro_auth_token')
    );
    expect(token).toBeTruthy();
  });
});
```

### API Test Example

```javascript
const request = require('supertest');
const { TestDataFactory } = require('../setup/seed-test-data');

describe('Authentication API', () => {
  test('should register new user', async () => {
    const response = await request(API_URL)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@tekvoro.test',
        password: 'SecurePassword@123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('test@tekvoro.test');
  });
});
```

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Workflow**: `.github/workflows/tests.yml`

**Jobs**:
1. **API Tests** - Runs with MongoDB service
2. **Security Tests** - Focuses on security vulnerabilities
3. **E2E Tests** - Full browser automation
4. **Build** - TypeScript compilation and build verification
5. **Test Report** - Summary and PR comments

### Manual CI Run

```bash
# Run workflow locally (with act)
act -j api-tests
act -j e2e-tests
act -j security-tests
```

### Artifact Download

Test results are uploaded as artifacts:
- `api-test-results/` - JUnit XML reports
- `api-coverage/` - Code coverage HTML
- `e2e-test-results/` - Playwright HTML report
- `e2e-test-videos/` - Failed test videos

## Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB
mongod --dbpath ./data/test-db

# Or use Docker
docker start tekvoro-test-mongodb
```

#### Server Not Running
```bash
# Ensure backend is running
curl http://localhost:5002/api/health

# Ensure frontend is running
curl http://localhost:5173
```

#### Port Already in Use
```bash
# Kill process on port 5002
lsof -ti:5002 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

#### Test Timeout
```bash
# Increase test timeout in playwright.config.ts
timeout: 60000, // 60 seconds

# Or for specific test
test.setTimeout(120000);
```

#### Missing Dependencies
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Debug Mode

```bash
# E2E debug mode (opens inspector)
npm run test:e2e:debug

# With UI mode
npm run test:e2e:ui

# API tests with logging
DEBUG=* npm run test:api

# Verbose output
npm run test:e2e -- --reporter=verbose
```

### View Logs

```bash
# Playwright trace viewer
npx playwright show-trace test-results/trace.zip

# API test output
npm run test:api -- --verbose

# Coverage report
open test-results/api-coverage/index.html
```

## Best Practices

### Writing Tests

1. **Use Page Object Model** - Encapsulate selectors in page classes
2. **Descriptive Names** - Test names should describe what is being tested
3. **Single Responsibility** - Each test should test one thing
4. **Use Fixtures** - Leverage Playwright fixtures for setup/teardown
5. **Handle Errors** - Gracefully handle missing elements or unavailable endpoints

### Test Data

```javascript
// ✅ Good - Use factories
const user = TestDataFactory.createUser({ email: 'unique@test.com' });

// ❌ Avoid - Hardcoded data
const user = { email: 'hardcoded@test.com' };
```

### Assertions

```typescript
// ✅ Good - Specific assertions
expect(response.body.user.email).toBe('test@example.com');

// ❌ Avoid - Too generic
expect(response.body).toBeTruthy();
```

### Cleanup

```typescript
// ✅ Good - Use fixtures for cleanup
test('should save article', async ({ authenticatedPage, page }) => {
  // Setup and teardown handled automatically
});

// ❌ Avoid - Manual cleanup
test.afterEach(async () => {
  // Remember to clean up
});
```

### Error Handling

```typescript
// ✅ Good - Graceful fallback
const element = page.locator('[data-testid="element"]');
const isVisible = await element.isVisible().catch(() => false);

// ❌ Avoid - Failing hard
const element = page.locator('[data-testid="element"]');
await element.isVisible(); // Fails if element doesn't exist
```

## Maintenance

### Running Tests Regularly

```bash
# Weekly security audit
npm run test:security

# Daily E2E regression
npm run test:e2e

# PR checks (automated via GitHub Actions)
```

### Keeping Tests Updated

- Update selectors when UI changes
- Update API endpoints when backend changes
- Review and update test data factories
- Monitor test coverage trends

### Managing Test Data

```bash
# Seed test database
node tests/api/setup/seed-test-data.js

# Cleanup test data
npm run test:api -- --clearCache
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Testing Best Practices](https://testingjavascript.com/)

## Support

For issues or questions:
1. Check the `.github/workflows/tests.yml` for CI configuration
2. Review test logs in GitHub Actions
3. Run tests locally with debug mode: `npm run test:e2e:debug`
4. Check `.env.test` for environment configuration

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready
