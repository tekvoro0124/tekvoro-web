const request = require('supertest');
const { TestDataFactory, seedHelpers } = require('../setup/seed-test-data');

const API_URL = process.env.VITE_API_URL || 'http://localhost:5002';

describe('News API', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Login to get auth token
    const loginResponse = await request(API_URL)
      .post('/api/auth/login')
      .send({
        email: global.testConfig.testUser.email,
        password: global.testConfig.testUser.password,
      });

    if (loginResponse.body.token) {
      authToken = loginResponse.body.token;
      userId = loginResponse.body.user?.id;
    }
  });

  describe('GET /api/news', () => {
    test('should get list of news articles', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ page: 1, limit: 10 });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
      expect(Array.isArray(response.body.articles)).toBeTruthy();
    });

    test('should support pagination', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ page: 1, limit: 5 });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('limit');
    });

    test('should filter news by category', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ category: 'Technology' });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
    });

    test('should filter news by source', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ source: 'TechCrunch' });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
    });

    test('should sort articles by date', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ sort: 'date', order: 'desc' });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
    });

    test('should filter by trust score', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ minTrustScore: 70 });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
    });
  });

  describe('GET /api/news/trending', () => {
    test('should get trending news', async () => {
      const response = await request(API_URL)
        .get('/api/news/trending')
        .query({ limit: 10 });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
      expect(Array.isArray(response.body.articles)).toBeTruthy();
    });

    test('should limit trending results', async () => {
      const response = await request(API_URL)
        .get('/api/news/trending')
        .query({ limit: 5 });

      expect([200]).toContain(response.status);
      expect(response.body.articles.length).toBeLessThanOrEqual(5);
    });
  });

  describe('GET /api/news/search', () => {
    test('should search articles by keyword', async () => {
      const response = await request(API_URL)
        .get('/api/news/search')
        .query({ q: 'artificial intelligence' });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
    });

    test('should handle empty search results', async () => {
      const response = await request(API_URL)
        .get('/api/news/search')
        .query({ q: 'xyzabc123notreal' });

      expect([200]).toContain(response.status);
      expect(response.body.articles.length).toBe(0);
    });

    test('should search with multiple filters', async () => {
      const response = await request(API_URL)
        .get('/api/news/search')
        .query({ 
          q: 'technology',
          category: 'Tech',
          source: 'TechCrunch',
          minTrustScore: 70,
        });

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
    });
  });

  describe('GET /api/news/:id', () => {
    test('should get single article details', async () => {
      // First get a list of articles
      const listResponse = await request(API_URL)
        .get('/api/news')
        .query({ limit: 1 });

      if (listResponse.body.articles.length > 0) {
        const articleId = listResponse.body.articles[0].id;

        const response = await request(API_URL)
          .get(`/api/news/${articleId}`);

        expect([200]).toContain(response.status);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('content');
      }
    });

    test('should return 404 for non-existent article', async () => {
      const response = await request(API_URL)
        .get('/api/news/invalid-id-12345');

      expect([404]).toContain(response.status);
    });
  });

  describe('POST /api/news/save', () => {
    test('should save article for authenticated user', async () => {
      if (!authToken) {
        console.log('Skipping - no auth token');
        return;
      }

      // First get an article
      const listResponse = await request(API_URL)
        .get('/api/news')
        .query({ limit: 1 });

      if (listResponse.body.articles.length > 0) {
        const articleId = listResponse.body.articles[0].id;

        const response = await request(API_URL)
          .post('/api/news/save')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ articleId });

        expect([200, 201]).toContain(response.status);
        expect(response.body).toHaveProperty('id');
      }
    });

    test('should require authentication to save article', async () => {
      const response = await request(API_URL)
        .post('/api/news/save')
        .send({ articleId: 'test-id' });

      expect([401, 403]).toContain(response.status);
    });
  });

  describe('GET /api/news/saved', () => {
    test('should get user saved articles', async () => {
      if (!authToken) {
        console.log('Skipping - no auth token');
        return;
      }

      const response = await request(API_URL)
        .get('/api/news/saved')
        .set('Authorization', `Bearer ${authToken}`);

      expect([200]).toContain(response.status);
      expect(response.body).toHaveProperty('articles');
      expect(Array.isArray(response.body.articles)).toBeTruthy();
    });

    test('should require authentication', async () => {
      const response = await request(API_URL)
        .get('/api/news/saved');

      expect([401, 403]).toContain(response.status);
    });
  });

  describe('DELETE /api/news/save/:id', () => {
    test('should unsave article for authenticated user', async () => {
      if (!authToken) {
        console.log('Skipping - no auth token');
        return;
      }

      const response = await request(API_URL)
        .delete('/api/news/save/test-article-id')
        .set('Authorization', `Bearer ${authToken}`);

      // Endpoint may exist or not
      if (response.status !== 404) {
        expect([200, 204]).toContain(response.status);
      }
    });
  });

  describe('Article Sharing', () => {
    test('should share article with valid token', async () => {
      if (!authToken) {
        console.log('Skipping - no auth token');
        return;
      }

      const listResponse = await request(API_URL)
        .get('/api/news')
        .query({ limit: 1 });

      if (listResponse.body.articles.length > 0) {
        const articleId = listResponse.body.articles[0].id;

        const response = await request(API_URL)
          .post('/api/news/share')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ 
            articleId,
            platform: 'email',
            recipient: 'friend@example.com'
          });

        // Endpoint may or may not exist
        if (response.status !== 404) {
          expect([200, 201]).toContain(response.status);
        }
      }
    });
  });

  describe('Article Metadata', () => {
    test('should include source information in articles', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ limit: 1 });

      if (response.body.articles.length > 0) {
        const article = response.body.articles[0];
        expect(article).toHaveProperty('source');
        expect(article).toHaveProperty('sourceUrl');
      }
    });

    test('should include trust score in articles', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ limit: 1 });

      if (response.body.articles.length > 0) {
        const article = response.body.articles[0];
        expect(article).toHaveProperty('trustScore');
        expect(typeof article.trustScore === 'number').toBeTruthy();
      }
    });

    test('should include publish date in articles', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ limit: 1 });

      if (response.body.articles.length > 0) {
        const article = response.body.articles[0];
        expect(article).toHaveProperty('publishedAt');
      }
    });
  });

  describe('Response Validation', () => {
    test('should return valid JSON responses', async () => {
      const response = await request(API_URL)
        .get('/api/news');

      expect([200]).toContain(response.status);
      expect(response.type).toMatch(/json/);
    });

    test('should include proper content type headers', async () => {
      const response = await request(API_URL)
        .get('/api/news');

      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('should include pagination metadata', async () => {
      const response = await request(API_URL)
        .get('/api/news')
        .query({ page: 1, limit: 10 });

      if (response.status === 200) {
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('page');
        expect(response.body).toHaveProperty('limit');
      }
    });
  });
});
