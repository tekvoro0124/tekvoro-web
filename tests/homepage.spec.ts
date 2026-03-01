import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page loaded by checking for body
    await expect(page.locator('body')).toBeVisible();

    // Check if title contains Tekvoro
    await expect(page).toHaveTitle(/Tekvoro/);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    // Click on contact link in navigation
    await page.locator('nav').locator('text=Contact').click();

    // Should navigate to contact page
    await expect(page).toHaveURL(/\/contact/);

    // Check if contact form is visible
    await expect(page.locator('form')).toBeVisible();
  });

  test('should navigate to portfolio page', async ({ page }) => {
    await page.goto('/');

    // Click on portfolio link
    await page.locator('nav').locator('text=Portfolio').click();

    // Should navigate to portfolio page
    await expect(page).toHaveURL(/\/portfolio/);
  });

  test('should navigate to resources page', async ({ page }) => {
    await page.goto('/');

    // Click on resources link
    await page.locator('nav').locator('text=Resources').click();

    // Should navigate to resources page
    await expect(page).toHaveURL(/\/resources/);
  });
});
