import { test, expect } from '@playwright/test';

// API Base URL for tests
const API_URL = process.env.VITE_API_URL || 'http://localhost:5002/api';

test.describe('Authentication API Integration Tests', () => {
  let authToken: string;
  let testEmail: string;
  const testPassword = 'TestPass123!';

  test.beforeEach(() => {
    // Generate unique email for each test
    testEmail = `testuser_${Date.now()}@tekvoro.com`;
  });

  test.describe('User Registration', () => {
    test('should successfully register a new user', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'Test User',
          password: testPassword,
          company: 'Test Company'
        }
      });

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.success).toBeTruthy();
      expect(body.message).toContain('registered successfully');
      expect(body.user).toBeDefined();
      expect(body.user.email).toBe(testEmail);
      expect(body.user.name).toBe('Test User');
      expect(body.user.role).toBe('subscriber');
      expect(body.token).toBeDefined();
    });

    test('should return 400 for invalid email', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: 'invalid-email',
          name: 'Test User',
          password: testPassword
        }
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBeDefined();
    });

    test('should return 400 for password too short', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'Test User',
          password: 'short'
        }
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBeDefined();
    });

    test('should return 400 when email already exists', async ({ request }) => {
      // Register first user
      await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'User One',
          password: testPassword
        }
      });

      // Try to register with same email
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'User Two',
          password: testPassword
        }
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toContain('already exists');
    });

    test('should create user with optional company field', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'Test User',
          password: testPassword,
          company: 'Acme Corp'
        }
      });

      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.user.company).toBe('Acme Corp');
    });
  });

  test.describe('User Login', () => {
    test.beforeEach(async ({ request }) => {
      // Create a user before each login test
      await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'Test User',
          password: testPassword,
          company: 'Test Company'
        }
      });
    });

    test('should successfully login with valid credentials', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: testPassword
        }
      });

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.success).toBeTruthy();
      expect(body.message).toContain('successful');
      expect(body.user).toBeDefined();
      expect(body.user.email).toBe(testEmail);
      expect(body.token).toBeDefined();

      // Store token for next tests
      authToken = body.token;
    });

    test('should return 401 for invalid email', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: 'nonexistent@tekvoro.com',
          password: testPassword
        }
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      expect(body.error).toContain('Invalid credentials');
    });

    test('should return 401 for incorrect password', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: 'WrongPassword123'
        }
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      expect(body.error).toContain('Invalid credentials');
    });

    test('should return 400 for missing credentials', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail
          // missing password
        }
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBeDefined();
    });

    test('should update lastLogin timestamp', async ({ request }) => {
      // Login first
      const loginResponse = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: testPassword
        }
      });

      const loginBody = await loginResponse.json();
      const token = loginBody.token;
      const firstLogin = loginBody.user.lastLogin;

      // Wait and login again
      await new Promise(resolve => setTimeout(resolve, 1000));

      const secondLoginResponse = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: testPassword
        }
      });

      const secondLoginBody = await secondLoginResponse.json();
      const secondLogin = secondLoginBody.user.lastLogin;

      expect(new Date(secondLogin).getTime())
        .toBeGreaterThan(new Date(firstLogin).getTime());
    });
  });

  test.describe('Protected Endpoints', () => {
    test.beforeEach(async ({ request }) => {
      // Register and login
      await request.post(`${API_URL}/auth/register`, {
        data: {
          email: testEmail,
          name: 'Test User',
          password: testPassword
        }
      });

      const loginResponse = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: testPassword
        }
      });

      const body = await loginResponse.json();
      authToken = body.token;
    });

    test('should get user profile with valid token', async ({ request }) => {
      const response = await request.get(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.user).toBeDefined();
      expect(body.user.email).toBe(testEmail);
      expect(body.user.id).toBeDefined();
      // Password should never be returned
      expect(body.user.password).toBeUndefined();
    });

    test('should return 401 without token', async ({ request }) => {
      const response = await request.get(`${API_URL}/auth/profile`);

      expect(response.status()).toBe(401);
      const body = await response.json();
      expect(body.error).toContain('token');
    });

    test('should return 403 with invalid token', async ({ request }) => {
      const response = await request.get(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': 'Bearer invalid.token.here'
        }
      });

      expect(response.status()).toBe(403);
      const body = await response.json();
      expect(body.error).toContain('Invalid');
    });

    test('should update user profile', async ({ request }) => {
      const response = await request.put(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        data: {
          name: 'Updated Name',
          company: 'New Company Inc'
        }
      });

      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.success).toBeTruthy();
      expect(body.user.name).toBe('Updated Name');
      expect(body.user.company).toBe('New Company Inc');
    });

    test('should change password', async ({ request }) => {
      const newPassword = 'NewPass456!';

      // Change password
      const response = await request.put(`${API_URL}/auth/change-password`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        data: {
          currentPassword: testPassword,
          newPassword: newPassword
        }
      });

      expect(response.ok()).toBeTruthy();

      // Try to login with old password (should fail)
      const oldPasswordLogin = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: testPassword
        }
      });

      expect(oldPasswordLogin.status()).toBe(401);

      // Try to login with new password (should succeed)
      const newPasswordLogin = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: testEmail,
          password: newPassword
        }
      });

      expect(newPasswordLogin.ok()).toBeTruthy();
    });
  });

  test.describe('Token Management', () => {
    test('should store token in response', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: 'testuser@tekvoro.com',
          password: 'TestPassword123'
        }
      });

      if (response.ok()) {
        const body = await response.json();
        expect(body.token).toBeDefined();
        expect(body.token).toMatch(/^eyJ/); // JWT format check
      }
    });

    test('token should be valid JWT', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: 'testuser@tekvoro.com',
          password: 'TestPassword123'
        }
      });

      if (response.ok()) {
        const body = await response.json();
        const token = body.token;

        // Parse JWT (header.payload.signature)
        const parts = token.split('.');
        expect(parts).toHaveLength(3);

        // Decode payload (without verification, just checking format)
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        expect(payload.id).toBeDefined();
        expect(payload.email).toBeDefined();
        expect(payload.exp).toBeDefined(); // Expiration
      }
    });
  });

  test.describe('Admin Operations', () => {
    let adminToken: string;

    test.beforeEach(async ({ request }) => {
      // Login as admin user (assuming it exists from seed)
      const response = await request.post(`${API_URL}/auth/login`, {
        data: {
          email: 'admin@tekvoro.com',
          password: 'Tekvoro2024!'
        }
      });

      if (response.ok()) {
        const body = await response.json();
        adminToken = body.token;
      }
    });

    test('should list users as admin', async ({ request }) => {
      if (!adminToken) {
        test.skip();
      }

      const response = await request.get(`${API_URL}/auth/users?page=1&limit=10`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.users).toBeDefined();
      expect(Array.isArray(body.users)).toBeTruthy();
      expect(body.pagination).toBeDefined();
    });

    test('should not allow non-admin to list users', async ({ request }) => {
      // Register non-admin user
      const userEmail = `nonadmin_${Date.now()}@tekvoro.com`;
      const userResponse = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: userEmail,
          name: 'Regular User',
          password: 'TestPass123!'
        }
      });

      const userBody = await userResponse.json();
      const userToken = userBody.token;

      // Try to list users
      const response = await request.get(`${API_URL}/auth/users`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      expect(response.status()).toBe(403);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle database errors gracefully', async ({ request }) => {
      // Send malformed data that might cause DB error
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: '',
          name: '',
          password: ''
        }
      });

      // Should return 400 with validation error, not 500
      expect(response.status()).toBeLessThan(500);
    });

    test('should validate email format', async ({ request }) => {
      const response = await request.post(`${API_URL}/auth/register`, {
        data: {
          email: 'notanemail',
          name: 'Test',
          password: 'Password123'
        }
      });

      expect(response.status()).toBe(400);
    });
  });
});

