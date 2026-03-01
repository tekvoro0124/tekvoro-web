# Quick Test Reference

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run test:e2e` | Run E2E tests (all browsers) |
| `npm run test:e2e:watch` | Watch mode for E2E tests |
| `npm run test:e2e:ui` | Interactive UI mode |
| `npm run test:e2e:debug` | Debug mode with inspector |
| `npm run test:api` | Run API tests |
| `npm run test:api:watch` | Watch mode for API tests |
| `npm run test:api:coverage` | Generate coverage report |
| `npm run test:security` | Run security tests |
| `npm run test:all` | Run all tests |
| `npm run test:coverage` | Full coverage report |

## Prerequisites Checklist

Before running tests, ensure:

- [ ] MongoDB is running (`mongod`)
- [ ] Backend server is running (`cd api && node server.js`)
- [ ] Frontend dev server is running (`npm run dev`) - for E2E tests
- [ ] `.env.test` file exists with test credentials
- [ ] Node.js 20+ is installed
- [ ] Dependencies are installed (`npm install`)
- [ ] Playwright browsers are installed (`npx playwright install`)

## Common Workflows

### Development Workflow

```bash
# Terminal 1: Start backend
cd api
npm install
node server.js

# Terminal 2: Start frontend
npm run dev

# Terminal 3: Run tests
npm run test:e2e:watch
```

### CI/CD Check

```bash
# Same as what runs in GitHub Actions
npm run build      # Verify build
npm run test:all   # All tests
```

### Security Audit

```bash
# Run security tests
npm run test:security

# Run all security + API tests
npm run test:api
```

### Test Specific Feature

```bash
# E2E - specific test
npx playwright test tests/e2e/specs/auth.spec.ts -g "login"

# API - specific test
npm run test:api -- --testNamePattern="should register"
```

## Test File Locations

```
tests/
├── e2e/
│   ├── specs/
│   │   ├── auth.spec.ts              ← Login/signup tests
│   │   ├── admin-dashboard.spec.ts   ← Admin tests
│   │   ├── news-search.spec.ts       ← Search tests
│   │   └── security.spec.ts          ← E2E security
│   ├── fixtures/
│   │   └── auth.fixture.ts           ← Auth fixtures
│   └── utils/
│       └── page-objects.ts           ← Page Object Model
└── api/
    ├── tests/
    │   ├── auth.test.js              ← Auth API tests
    │   ├── news.test.js              ← News API tests
    │   └── security.test.js          ← Security tests
    └── setup/
        ├── seed-test-data.js         ← Test data
        └── jest.setup.js             ← Test setup
```

## Test Coverage

### E2E Tests (39 test cases)
- **Auth**: 12 tests (login, signup, logout, session, tokens)
- **Admin Dashboard**: 5 tests (data loading, access control)
- **News Search**: 10 tests (search, filters, pagination)
- **Security**: 12 tests (XSS, CSRF, token expiry, injection)

### API Tests (39 test cases)
- **Auth**: 12 tests (register, login, profile, token validation)
- **News**: 12 tests (search, filtering, save, share)
- **Security**: 15 tests (injection, XSS, CSRF, rate limiting)

### Total: 78+ test cases

## Environment Variables

### For E2E Tests
```env
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:5002
```

### For API Tests
```env
VITE_API_URL=http://localhost:5002
MONGODB_URI=mongodb://localhost:27017/tekvoro-test
JWT_SECRET=test-secret-key-12345
TEST_USER_EMAIL=user@tekvoro.test
TEST_USER_PASSWORD=User@12345
TEST_ADMIN_EMAIL=admin@tekvoro.test
TEST_ADMIN_PASSWORD=Admin@12345
```

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| `Connection refused: 5002` | Start backend: `cd api && node server.js` |
| `Connection refused: 5173` | Start frontend: `npm run dev` |
| `MongoDB connection failed` | Start MongoDB: `mongod` |
| `Port already in use` | Kill process: `lsof -ti:PORT \| xargs kill -9` |
| `Timeout expired` | Increase timeout in config or reduce test load |
| `Module not found` | Reinstall: `rm -rf node_modules && npm install` |
| `Playwright browsers missing` | Install: `npx playwright install --with-deps` |

## Test Reports

After running tests:

```bash
# E2E Report
open playwright-report/index.html

# API Coverage
open test-results/api-coverage/index.html

# CI Results (in GitHub)
# Actions -> Test Suite -> Test Report artifact
```

## GitHub Actions

Tests run automatically on:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

View results:
1. Go to GitHub repository
2. Click "Actions" tab
3. Click "Test Suite" workflow
4. View job results and artifacts

## Key Test Credentials

```
Regular User:
  Email: user@tekvoro.test
  Password: User@12345

Admin User:
  Email: admin@tekvoro.test
  Password: Admin@12345
```

## API Health Check

```bash
# Check if API is running
curl http://localhost:5002/api/health

# Login to get token
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@tekvoro.test","password":"User@12345"}'

# Get profile with token
curl http://localhost:5002/api/auth/profile \
  -H "Authorization: Bearer <TOKEN>"
```

## Page Object Model Classes

```typescript
// POM for reusable selectors and interactions

LoginPage
  → goto()
  → fillEmail(email)
  → fillPassword(password)
  → submit()
  → login(email, password)
  → getErrorMessage()
  → isLoginButtonDisabled()

AdminDashboardPage
  → goto()
  → getMetric(name)
  → openUserModal()
  → fillUserForm(data)
  → submitUserForm()
  → approveArticle(id)
  → rejectArticle(id)

NewsSearchPage
  → goto()
  → searchNews(query)
  → getSearchResults()
  → filterBySource(source)
  → filterByTrustScore(score)
  → saveArticle(id)
  → shareArticle(id)

AlertsPage
  → goto()
  → createAlert(data)
  → getAlertList()
  → deleteAlert(id)
  → viewAlertMetrics()
```

## Authentication Fixtures

```typescript
// Pre-authenticated test sessions

authenticatedPage
  // Logged in as regular user (user@tekvoro.test)
  // Automatic cleanup after test

adminAuthenticatedPage
  // Logged in as admin (admin@tekvoro.test)
  // Automatic cleanup after test
```

## CI/CD Matrix

**Browsers**: Chromium, Firefox, WebKit
**Node Version**: 20.x
**OS**: Ubuntu Latest
**Database**: MongoDB Latest

## Performance Targets

- Build time: < 15 seconds
- E2E suite: < 5 minutes
- API tests: < 2 minutes
- Total CI/CD: < 10 minutes

## Next Steps

1. **Run tests locally** to verify setup
2. **Review failing tests** in detail
3. **Update selectors** if UI changes
4. **Add new tests** for new features
5. **Monitor coverage** regularly

## Documentation Links

- [Full Testing Guide](./TESTING_COMPREHENSIVE.md)
- [Playwright Docs](https://playwright.dev/)
- [Jest Docs](https://jestjs.io/)
- [GitHub Actions](https://github.com/features/actions)

---

**Last Updated**: 2024
**Test Framework Version**: 1.0.0
