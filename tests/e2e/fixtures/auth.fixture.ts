import { test as base, expect } from '@playwright/test';

export type AuthFixtures = {
  authenticatedPage: void;
  adminAuthenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Login as regular user
    await page.goto('/login');
    await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL!);
    await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD!);
    await page.click('button[type="submit"]');

    // Wait for redirect
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/.*dashboard/);

    // Use the authenticated page
    await use();

    // Cleanup - logout
    try {
      await page.click('[data-testid="user-menu"]');
      await page.click('[data-testid="logout-btn"]');
    } catch (e) {
      // Logout might fail if already logged out
      console.log('Logout failed, continuing cleanup');
    }
  },

  adminAuthenticatedPage: async ({ page }, use) => {
    // Login as admin
    await page.goto('/login');
    await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL!);
    await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD!);
    await page.click('button[type="submit"]');

    // Wait for redirect to admin dashboard
    await page.waitForURL('**/admin/**');
    await expect(page).toHaveURL(/.*admin/);

    // Use the authenticated page
    await use();

    // Cleanup
    try {
      await page.click('[data-testid="user-menu"]');
      await page.click('[data-testid="logout-btn"]');
    } catch (e) {
      // Logout might fail if already logged out
      console.log('Logout failed, continuing cleanup');
    }
  }
});

export { expect };
