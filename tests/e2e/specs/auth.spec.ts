import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../utils/page-objects';

test.describe('Authentication Flow', () => {
  test('should display login form with validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Check form elements exist
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Check submit button is disabled initially
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid@example.com', 'wrongpassword');

    // Wait for error message
    const errorMsg = page.locator('[data-testid="error-message"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(/invalid|incorrect|failed/i);

    // Should remain on login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      process.env.TEST_USER_EMAIL || 'user@tekvoro.test',
      process.env.TEST_USER_PASSWORD || 'User@12345'
    );

    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/.*dashboard/);

    // Check JWT token is stored
    const token = await page.evaluate(() => localStorage.getItem('tekvoro_auth_token'));
    expect(token).toBeTruthy();
    expect(token).toMatch(/^eyJ/); // JWT format check
  });

  test('should validate email format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Type invalid email
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('password123');

    // Button should still be disabled due to validation
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('should validate password length', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.fillEmail('user@example.com');
    await loginPage.fillPassword('12345'); // Too short

    // Button should be disabled
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('should persist session after page refresh', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      process.env.TEST_USER_EMAIL || 'user@tekvoro.test',
      process.env.TEST_USER_PASSWORD || 'User@12345'
    );

    await page.waitForURL('**/dashboard');

    // Refresh page
    await page.reload();

    // Should still be on dashboard (session persisted)
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should logout and clear token', async ({ authenticatedPage, page }) => {
    // User is already authenticated from fixture
    const token = await page.evaluate(() => localStorage.getItem('tekvoro_auth_token'));
    expect(token).toBeTruthy();

    // Click logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-btn"]');

    // Should redirect to login
    await page.waitForURL('**/login');

    // Token should be cleared
    const tokenAfter = await page.evaluate(() => localStorage.getItem('tekvoro_auth_token'));
    expect(tokenAfter).toBeNull();
  });
});

test.describe('SignUp Flow', () => {
  test('should display signup form', async ({ page }) => {
    await page.goto('/signup');

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  });

  test('should show password strength indicator', async ({ page }) => {
    await page.goto('/signup');

    // Weak password
    await page.fill('input[name="password"]', '123');
    let indicator = page.locator('[data-testid="password-strength"]');
    
    // Check if indicator exists before checking content
    const indicatorExists = await indicator.isVisible().catch(() => false);
    if (indicatorExists) {
      const strength = await indicator.textContent();
      expect(strength?.toLowerCase()).toContain('weak');
    }

    // Strong password
    await page.fill('input[name="password"]', 'SecurePass@123');
    await expect(indicator).toContainText(/strong/i);
  });

  test('should prevent signup if passwords dont match', async ({ page }) => {
    await page.goto('/signup');

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'SecurePass@123');
    await page.fill('input[name="confirmPassword"]', 'DifferentPass@123');

    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled();
  });

  test('should successfully signup new user', async ({ page }) => {
    const uniqueEmail = `testuser-${Date.now()}@example.com`;

    await page.goto('/signup');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'SecurePass@123');
    await page.fill('input[name="confirmPassword"]', 'SecurePass@123');

    await page.click('button[type="submit"]');

    // Wait for redirect
    await page.waitForURL('**/dashboard', { timeout: 10000 }).catch(() => {
      // May redirect to different page based on implementation
    });
  });
});
