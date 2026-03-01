import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact');

    // Check if contact form is visible
    await expect(page.locator('form')).toBeVisible();

    // Check required fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('select[name="projectType"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.locator('button[type="submit"]').click();

    // Should show validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });

  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill out the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('input[name="phone"]', '1234567890');
    await page.selectOption('select[name="projectType"]', 'AI Marketplace Platform');
    await page.selectOption('select[name="budget"]', '₹8L - ₹20L');
    await page.selectOption('select[name="timeline"]', '1-3 months');
    await page.fill('textarea[name="description"]', 'Test project description with more than 20 characters for validation');
    await page.selectOption('select[name="source"]', 'Google');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message with more than 10 characters');

    // Submit the form
    await page.locator('button[type="submit"]').click();

    // Should show success message
    await expect(page.locator('text=Thank you for your message')).toBeVisible();
  });

  test('should handle form submission errors', async ({ page }) => {
    await page.goto('/contact');

    // Fill with invalid data
    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="company"]', 'Test');
    await page.fill('input[name="phone"]', '123');
    await page.selectOption('select[name="projectType"]', 'AI Marketplace Platform');
    await page.selectOption('select[name="budget"]', '₹8L - ₹20L');
    await page.selectOption('select[name="timeline"]', '1-3 months');
    await page.fill('textarea[name="description"]', 'Short');
    await page.selectOption('select[name="source"]', 'Google');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Should show validation errors
    await expect(page.locator('text=Description must be at least 20 characters')).toBeVisible();
    await expect(page.locator('text=Please enter a valid email')).toBeVisible();
  });
});
