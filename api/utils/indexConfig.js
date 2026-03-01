// Database Index Configuration

const createIndexes = async (models) => {
  try {
    // User model indexes
    if (models.User) {
      await models.User.collection.createIndex({ email: 1 }, { unique: true });
      await models.User.collection.createIndex({ createdAt: -1 });
    }

    // Analytics model indexes
    if (models.Analytics) {
      await models.Analytics.collection.createIndex({ userId: 1, createdAt: -1 });
      await models.Analytics.collection.createIndex({ eventType: 1 });
    }

    // ContactSubmission model indexes
    if (models.ContactSubmission) {
      await models.ContactSubmission.collection.createIndex({ email: 1 });
      await models.ContactSubmission.collection.createIndex({ createdAt: -1 });
    }

    // BlogPost model indexes
    if (models.BlogPost) {
      await models.BlogPost.collection.createIndex({ slug: 1 }, { unique: true });
      await models.BlogPost.collection.createIndex({ publishedAt: -1 });
    }

    // EmailSubscription model indexes
    if (models.EmailSubscription) {
      await models.EmailSubscription.collection.createIndex({ email: 1 }, { unique: true });
    }

    // Order model indexes
    if (models.Order) {
      await models.Order.collection.createIndex({ userId: 1, createdAt: -1 });
      await models.Order.collection.createIndex({ status: 1 });
    }

    // Event model indexes
    if (models.Event) {
      await models.Event.collection.createIndex({ startDate: 1 });
      await models.Event.collection.createIndex({ status: 1 });
    }

    console.log('✅ All database indexes created successfully');
  } catch (error) {
    console.warn('⚠️  Error creating indexes:', error.message);
    // Don't throw - indexes are optional, connection should still work
  }
};

module.exports = { createIndexes };
