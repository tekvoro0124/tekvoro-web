import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const apiRequest = test.extend({
    request: async ({}, use) => {
      const request = await test.request.newContext({
        baseURL: 'http://localhost:5002'
      });
      await use(request);
      await request.dispose();
    }
  });

  apiRequest('should submit contact form via API', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '1234567890',
        projectType: 'AI Marketplace Platform',
        budget: '₹8L - ₹20L',
        timeline: '1-3 months',
        description: 'Test project description with more than 20 characters for validation',
        source: 'Google',
        subject: 'Test Subject',
        message: 'Test message with more than 10 characters',
        submittedAt: new Date().toISOString()
      }
    });

    if (!response.ok()) {
      console.log('Contact API failed:', response.status(), await response.text());
    }
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe('Lead submitted successfully');
    expect(data.leadCategory).toBe('WARM');
    expect(data.leadScore).toBe(70);
  });

  apiRequest('should register new client via API', async ({ request }) => {
    const email = `test${Date.now()}@example.com`;
    const response = await request.post('/api/client/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password: 'password123',
        name: 'Test Client',
        company: 'Test Company'
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe('Client account created successfully');
    expect(data.user.email).toBe(email);
    expect(data.token).toBeDefined();
  });

  apiRequest('should login client via API', async ({ request }) => {
    // First register
    const email = `test${Date.now()}@example.com`;
    await request.post('/api/client/register', {
      data: {
        email,
        password: 'password123',
        name: 'Test Client',
        company: 'Test Company'
      }
    });

    // Then login
    const loginResponse = await request.post('/api/client/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password: 'password123'
      }
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    expect(loginData.success).toBe(true);
    expect(loginData.user.email).toBe(email);
    expect(loginData.token).toBeDefined();
  });

  apiRequest('should get client dashboard data via API', async ({ request }) => {
    // Register and login
    const email = `test${Date.now()}@example.com`;
    const registerResponse = await request.post('/api/client/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password: 'password123',
        name: 'Test Client',
        company: 'Test Company'
      }
    });
    const registerData = await registerResponse.json();
    const token = registerData.token;

    // Then login
    const loginResponse = await request.post('/api/client/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password: 'password123'
      }
    });

    const loginData = await loginResponse.json();

    // Get dashboard
    const response = await request.get('/api/portal/dashboard', {
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.stats).toBeDefined();
    expect(data.stats.totalProjects).toBeDefined();
  });

  apiRequest('should handle invalid login', async ({ request }) => {
    const response = await request.post('/api/client/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      }
    });

    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Invalid credentials');
  });
});
