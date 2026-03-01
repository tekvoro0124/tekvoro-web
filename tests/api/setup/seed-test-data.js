const bcryptjs = require('bcryptjs');

/**
 * Test data factories for seed data generation
 */

class TestDataFactory {
  /**
   * Create a test user object
   */
  static createUser(overrides = {}) {
    return {
      name: 'Test User',
      email: 'user@tekvoro.test',
      password: 'User@12345',
      role: 'user',
      isVerified: true,
      createdAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Create a test admin user object
   */
  static createAdmin(overrides = {}) {
    return {
      name: 'Test Admin',
      email: 'admin@tekvoro.test',
      password: 'Admin@12345',
      role: 'admin',
      isVerified: true,
      createdAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Create a test news article
   */
  static createArticle(overrides = {}) {
    return {
      title: 'Test Article Title',
      description: 'This is a test article description',
      content: 'This is the full content of the test article',
      source: 'TechCrunch',
      sourceUrl: 'https://techcrunch.com/test-article',
      imageUrl: 'https://example.com/image.jpg',
      trustScore: 85.5,
      publishedAt: new Date(),
      category: 'Technology',
      tags: ['test', 'technology'],
      status: 'published',
      createdAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Create a test newsletter alert
   */
  static createAlert(overrides = {}) {
    return {
      title: 'Test Alert',
      description: 'Test alert description',
      keywords: ['technology', 'artificial intelligence'],
      frequency: 'daily',
      email: 'user@tekvoro.test',
      isActive: true,
      createdAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Create a test company
   */
  static createCompany(overrides = {}) {
    return {
      name: 'Test Company',
      ticker: 'TEST',
      description: 'A test company for testing purposes',
      website: 'https://testcompany.com',
      industry: 'Technology',
      employees: 100,
      founded: '2020-01-01',
      createdAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Create a test saved article
   */
  static createSavedArticle(overrides = {}) {
    return {
      userId: 'test-user-id',
      articleId: 'test-article-id',
      savedAt: new Date(),
      collection: 'default',
      notes: 'Test notes',
      ...overrides,
    };
  }

  /**
   * Create a test user preference
   */
  static createUserPreference(overrides = {}) {
    return {
      userId: 'test-user-id',
      theme: 'light',
      language: 'en',
      emailNotifications: true,
      pushNotifications: false,
      newsletterFrequency: 'daily',
      preferredSources: ['TechCrunch', 'Forbes'],
      preferredCategories: ['Technology', 'Business'],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Hash password for storage
   */
  static async hashPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  /**
   * Create user with hashed password for database insertion
   */
  static async createUserWithHashedPassword(overrides = {}) {
    const user = this.createUser(overrides);
    const hashedPassword = await this.hashPassword(user.password);
    return {
      ...user,
      password: hashedPassword,
    };
  }

  /**
   * Create admin with hashed password for database insertion
   */
  static async createAdminWithHashedPassword(overrides = {}) {
    const admin = this.createAdmin(overrides);
    const hashedPassword = await this.hashPassword(admin.password);
    return {
      ...admin,
      password: hashedPassword,
    };
  }
}

/**
 * Seeding helpers
 */

const seedHelpers = {
  /**
   * Create multiple test items
   */
  createMany: (factory, count, overrides = {}) => {
    return Array.from({ length: count }, (_, i) => 
      factory({
        ...overrides,
        // Make each unique by index
        _id: undefined,
      })
    );
  },

  /**
   * Generate JWT token for testing
   */
  generateJWT: (userId, role = 'user') => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(
      JSON.stringify({
        id: userId,
        email: `${userId}@tekvoro.test`,
        role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
      })
    ).toString('base64');
    
    // Note: This is a mock JWT without proper signature
    // Just for testing purposes
    return `${header}.${payload}.mock-signature`;
  },

  /**
   * Generate random email
   */
  generateEmail: (prefix = 'test') => {
    const random = Math.random().toString(36).substring(7);
    return `${prefix}_${random}@tekvoro.test`;
  },

  /**
   * Generate random string
   */
  generateString: (length = 10) => {
    return Math.random().toString(36).substring(2, length + 2);
  },

  /**
   * Generate random number
   */
  generateNumber: (min = 0, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

module.exports = {
  TestDataFactory,
  seedHelpers,
};
