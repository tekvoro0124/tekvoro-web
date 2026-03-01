import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.page.fill('input[name="email"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async submit() {
    await this.page.click('button[type="submit"]');
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async getErrorMessage() {
    return this.page.locator('[data-testid="error-message"]').textContent();
  }

  async isLoginButtonDisabled() {
    const button = this.page.locator('button[type="submit"]');
    return button.isDisabled();
  }
}

export class AdminDashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/admin/dashboard');
  }

  async getMetric(metricName: string) {
    return this.page.locator(`[data-testid="metric-${metricName}"]`).textContent();
  }

  async openUserModal() {
    await this.page.click('[data-testid="add-user-btn"]');
  }

  async fillUserForm(data: { name: string; email: string; role: string }) {
    await this.page.fill('input[name="name"]', data.name);
    await this.page.fill('input[name="email"]', data.email);
    await this.page.selectOption('select[name="role"]', data.role);
  }

  async submitUserForm() {
    await this.page.click('[data-testid="submit-user-form"]');
  }

  async getApprovedCount() {
    const text = await this.page.locator('[data-testid="approved-count"]').textContent();
    return parseInt(text || '0');
  }

  async approveArticle(articleId: string) {
    await this.page.click(`[data-testid="approve-${articleId}"]`);
    await this.page.click('[data-testid="confirm-approve"]');
  }

  async rejectArticle(articleId: string) {
    await this.page.click(`[data-testid="reject-${articleId}"]`);
    await this.page.fill('textarea[name="rejection-reason"]', 'Content violates guidelines');
    await this.page.click('[data-testid="confirm-reject"]');
  }
}

export class NewsSearchPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/news-search');
  }

  async searchNews(query: string) {
    await this.page.fill('input[placeholder*="Search"]', query);
    await this.page.press('input[placeholder*="Search"]', 'Enter');
  }

  async getSearchResults() {
    return this.page.locator('[data-testid="article-card"]');
  }

  async getResultCount() {
    const results = await this.getSearchResults().count();
    return results;
  }

  async clickArticle(index: number) {
    const articles = this.getSearchResults();
    await articles.nth(index).click();
  }

  async filterBySource(source: string) {
    await this.page.click('[data-testid="filter-source"]');
    await this.page.click(`[data-testid="source-${source}"]`);
  }

  async filterByTrustScore(minScore: number) {
    await this.page.fill('input[name="min-trust-score"]', minScore.toString());
    await this.page.click('[data-testid="apply-filters"]');
  }

  async saveArticle(articleId: string) {
    await this.page.click(`[data-testid="save-${articleId}"]`);
  }

  async shareArticle(articleId: string, platform: string) {
    await this.page.click(`[data-testid="share-${articleId}"]`);
    await this.page.click(`[data-testid="share-${platform}"]`);
  }
}

export class AlertsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/alerts');
  }

  async createAlert(name: string, keywords: string[]) {
    await this.page.click('[data-testid="new-alert-btn"]');
    await this.page.fill('input[name="alert-name"]', name);
    
    for (const keyword of keywords) {
      await this.page.fill('input[name="keywords"]', keyword);
      await this.page.press('input[name="keywords"]', 'Enter');
    }

    await this.page.click('[data-testid="create-alert-btn"]');
  }

  async getAlertList() {
    return this.page.locator('[data-testid="alert-item"]');
  }

  async deleteAlert(alertId: string) {
    await this.page.click(`[data-testid="delete-${alertId}"]`);
    await this.page.click('[data-testid="confirm-delete"]');
  }

  async viewAlertMetrics(alertId: string) {
    await this.page.click(`[data-testid="metrics-${alertId}"]`);
  }
}
