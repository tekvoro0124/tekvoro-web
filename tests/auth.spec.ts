import { test, expect } from '@playwright/test';

test.describe('Client Authentication', () => {
  test('should load client login page', async ({ page }) => {
    await page.goto('/portal/login');

    // Check if login form is visible
    await expect(page.locator('text=Client Portal Login')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/portal/login');

    // Try to submit empty form
    await page.locator('button[type="submit"]').click();

    // Should show error messages
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should register new client', async ({ page }) => {
    await page.goto('/portal/login');

    // Click register link (assuming it exists)
    const registerLink = page.locator('text=Register');
    if (await registerLink.isVisible()) {
      await registerLink.click();

      // Fill registration form
      await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
      await page.fill('input[name="password"]', 'password123');
      await page.fill('input[name="name"]', 'Test Client');
      await page.fill('input[name="company"]', 'Test Company');

      // Submit
      await page.locator('button[type="submit"]').click();

      // Should redirect to dashboard or show success
      await expect(page).toHaveURL(/\/portal\/dashboard/);
    }
  });

  test('should login existing client', async ({ page }) => {
    // First register a user via API
    const email = `test${Date.now()}@example.com`;
    const response = await page.request.post('/api/client/register', {
      data: {
        email,
        password: 'password123',
        name: 'Test Client',
        company: 'Test Company'
      }
    });
    expect(response.ok()).toBeTruthy();

    // Now test login
    await page.goto('/portal/login');

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');

    await page.locator('button[type="submit"]').click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/portal\/dashboard/);

    // Should show dashboard content
    await expect(page.locator('text=Welcome to your Dashboard')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/portal/login');

    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    await page.locator('button[type="submit"]').click();

    // Should show error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});
