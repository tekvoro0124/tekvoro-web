require('dotenv').config({ path: '.env.test' });

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Set API URL for tests
process.env.VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:5002';

// Suppress console logs during tests (optional)
// jest.spyOn(console, 'log').mockImplementation(() => {});
// jest.spyOn(console, 'error').mockImplementation(() => {});

// Global test timeout
jest.setTimeout(30000);

// Setup for MongoDB tests
beforeAll(async () => {
  // Initialize any global test setup
  console.log('Test environment initialized');
  console.log(`API URL: ${process.env.VITE_API_URL}`);
  console.log(`Database: ${process.env.MONGODB_URI}`);
});

afterAll(async () => {
  // Cleanup global resources
  console.log('Test environment cleanup');
});

// Optional: Match Playwright's error handling pattern
global.testConfig = {
  apiUrl: process.env.VITE_API_URL,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  testUser: {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  },
  testAdmin: {
    email: process.env.TEST_ADMIN_EMAIL,
    password: process.env.TEST_ADMIN_PASSWORD,
  },
};

// Polyfill for fetch API if needed
if (!global.fetch) {
  global.fetch = require('node-fetch');
}
