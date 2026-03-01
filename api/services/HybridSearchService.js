const NewsArticle = require('../models/NewsArticle');

class HybridSearchService {
  constructor() {
    this.MIN_TRUST_SCORE = 40; // Minimum trust score to be surfaced
  }

  /**
   * Hybrid search: combines keyword search, semantic search, and trust scoring
   */
  async search(query, options = {}) {
    const {
      limit = 20,
      skip = 0,
      filters = {},
      minTrustScore = this.MIN_TRUST_SCORE,
      semanticWeight = 0.4,
      keywordWeight = 0.35,
      trustWeight = 0.25
    } = options;

    try {
      const [keywordResults, semanticResults, trendingResults] = await Promise.all([
        this.keywordSearch(query, { limit: limit * 2, minTrustScore, filters }),
        this.semanticSearch(query, { limit: limit * 2, minTrustScore, filters }),
        this.getTrendingArticles({ limit: 5, filters })
      ]);

      // Merge and rank results
      const merged = this.mergeResults(
        keywordResults,
        semanticResults,
        {
          keywordWeight,
          semanticWeight,
          trustWeight
        }
      );

      // Apply pagination
      const paginated = merged.slice(skip, skip + limit);

      // Add trending articles if within top results
      const trendingIds = trendingResults.map(a => a._id.toString());
      const hasTrending = paginated.some(a => trendingIds.includes(a._id.toString()));

      return {
        results: paginated,
        total: merged.length,
        trending: !hasTrending ? trendingResults.slice(0, 3) : [],
        query,
        executionTime: Date.now()
      };
    } catch (error) {
      console.error('[HybridSearch] Search failed:', error.message);
      throw error;
    }
  }

  /**
   * Keyword search using MongoDB text indexes
   */
  async keywordSearch(query, options = {}) {
    const {
      limit = 50,
      minTrustScore = this.MIN_TRUST_SCORE,
      filters = {}
    } = options;

    try {
      const searchQuery = {
        $text: { $search: query },
        isActive: true,
        'trustScore.overall': { $gte: minTrustScore },
        ...this.buildFilterQuery(filters)
      };

      const results = await NewsArticle.find(
        searchQuery,
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(limit)
        .lean()
        .exec();

      return results.map(article => ({
        ...article,
        _searchType: 'keyword',
        _relevanceScore: 1.0 // Will be adjusted in merging
      }));
    } catch (error) {
      console.error('[HybridSearch] Keyword search failed:', error.message);
      return [];
    }
  }

  /**
   * Semantic search using vector embeddings
   * Searches for similar articles based on semantic meaning
   */
  async semanticSearch(query, options = {}) {
    const {
      limit = 50,
      minTrustScore = this.MIN_TRUST_SCORE,
      filters = {}
    } = options;

    try {
      // Get embedding for query
      const AIProcessingService = require('./AIProcessingService');
      const aiService = new AIProcessingService();
      const queryEmbedding = await aiService.generateEmbedding(query);

      // Fetch all active articles with embeddings
      const articles = await NewsArticle.find({
        isActive: true,
        'trustScore.overall': { $gte: minTrustScore },
        embedding: { $exists: true, $ne: null },
        ...this.buildFilterQuery(filters)
      })
        .lean()
        .exec();

      // Calculate similarity scores
      const scored = articles
        .map(article => ({
          ...article,
          _searchType: 'semantic',
          _relevanceScore: this.cosineSimilarity(queryEmbedding, article.embedding)
        }))
        .sort((a, b) => b._relevanceScore - a._relevanceScore)
        .slice(0, limit);

      return scored;
    } catch (error) {
      console.error('[HybridSearch] Semantic search failed:', error.message);
      return [];
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) {
      return 0;
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      magnitudeA += vecA[i] * vecA[i];
      magnitudeB += vecB[i] * vecB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Get trending articles (most viewed, highest trust)
   */
  async getTrendingArticles(options = {}) {
    const {
      limit = 10,
      filters = {},
      timeRange = 7 // days
    } = options;

    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - timeRange);

      const trendingQuery = {
        isActive: true,
        publishedDate: { $gte: cutoffDate },
        'trustScore.overall': { $gte: 60 },
        ...this.buildFilterQuery(filters)
      };

      const results = await NewsArticle.find(trendingQuery)
        .sort({
          'trustScore.overall': -1,
          views: -1,
          shares: -1,
          publishedDate: -1
        })
        .limit(limit)
        .lean()
        .exec();

      return results;
    } catch (error) {
      console.error('[HybridSearch] Trending search failed:', error.message);
      return [];
    }
  }

  /**
   * Get high-trust articles (quality focus)
   */
  async getHighTrustArticles(options = {}) {
    const {
      limit = 20,
      filters = {}
    } = options;

    try {
      const results = await NewsArticle.find({
        isActive: true,
        'trustScore.overall': { $gte: 75 },
        ...this.buildFilterQuery(filters)
      })
        .sort({ 'trustScore.overall': -1, publishedDate: -1 })
        .limit(limit)
        .lean()
        .exec();

      return results;
    } catch (error) {
      console.error('[HybridSearch] High-trust search failed:', error.message);
      return [];
    }
  }

  /**
   * Merge keyword and semantic results with weighted scoring
   */
  mergeResults(keywordResults, semanticResults, weights) {
    const merged = new Map();

    // Add keyword results
    keywordResults.forEach((article, index) => {
      const id = article._id.toString();
      merged.set(id, {
        ...article,
        _keywordRank: index,
        _keywordScore: (1 - index / keywordResults.length) * weights.keywordWeight
      });
    });

    // Add semantic results
    semanticResults.forEach((article, index) => {
      const id = article._id.toString();
      if (merged.has(id)) {
        const existing = merged.get(id);
        existing._semanticRank = index;
        existing._semanticScore = article._relevanceScore * weights.semanticWeight;
      } else {
        merged.set(id, {
          ...article,
          _semanticRank: index,
          _semanticScore: article._relevanceScore * weights.semanticWeight,
          _keywordScore: 0
        });
      }
    });

    // Calculate final scores
    const results = Array.from(merged.values()).map(article => {
      const trustNormalized = Math.min(article.trustScore.overall / 100, 1);
      const trustScore = trustNormalized * weights.trustWeight;

      return {
        ...article,
        _finalScore:
          (article._keywordScore || 0) +
          (article._semanticScore || 0) +
          trustScore
      };
    });

    // Sort by final score
    return results.sort((a, b) => b._finalScore - a._finalScore);
  }

  /**
   * Build MongoDB filter query from options
   */
  buildFilterQuery(filters) {
    const query = {};

    if (filters.category && filters.category.length > 0) {
      query.category = { $in: filters.category };
    }

    if (filters.source && filters.source.length > 0) {
      query['source.name'] = { $in: filters.source };
    }

    if (filters.companies && filters.companies.length > 0) {
      query.relevantCompanies = { $in: filters.companies };
    }

    if (filters.industries && filters.industries.length > 0) {
      query.relevantIndustries = { $in: filters.industries };
    }

    if (filters.dateFrom || filters.dateTo) {
      query.publishedDate = {};
      if (filters.dateFrom) {
        query.publishedDate.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.publishedDate.$lte = new Date(filters.dateTo);
      }
    }

    if (filters.minTrustScore) {
      query['trustScore.overall'] = {
        ...query['trustScore.overall'],
        $gte: filters.minTrustScore
      };
    }

    if (filters.sentiment) {
      query['aiAnalysis.sentiment'] = filters.sentiment;
    }

    return query;
  }

  /**
   * Get related articles
   */
  async getRelatedArticles(articleId, limit = 5) {
    try {
      const article = await NewsArticle.findById(articleId).lean();

      if (!article) {
        return [];
      }

      // Search by tags, categories, companies
      const relatedQuery = {
        _id: { $ne: articleId },
        isActive: true,
        $or: [
          { tags: { $in: article.tags } },
          { category: article.category },
          { relevantCompanies: { $in: article.relevantCompanies } },
          { relevantIndustries: { $in: article.relevantIndustries } }
        ]
      };

      const related = await NewsArticle.find(relatedQuery)
        .sort({ publishedDate: -1 })
        .limit(limit)
        .lean()
        .exec();

      return related;
    } catch (error) {
      console.error('[HybridSearch] Related articles search failed:', error.message);
      return [];
    }
  }

  /**
   * Get articles by company
   */
  async getArticlesByCompany(company, options = {}) {
    const { limit = 20, skip = 0 } = options;

    try {
      const results = await NewsArticle.find({
        relevantCompanies: company,
        isActive: true
      })
        .sort({ publishedDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

      const total = await NewsArticle.countDocuments({
        relevantCompanies: company,
        isActive: true
      });

      return { results, total };
    } catch (error) {
      console.error('[HybridSearch] Company search failed:', error.message);
      return { results: [], total: 0 };
    }
  }

  /**
   * Get articles by industry/category
   */
  async getArticlesByCategory(category, options = {}) {
    const { limit = 20, skip = 0 } = options;

    try {
      const results = await NewsArticle.find({
        category,
        isActive: true
      })
        .sort({ publishedDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

      const total = await NewsArticle.countDocuments({
        category,
        isActive: true
      });

      return { results, total };
    } catch (error) {
      console.error('[HybridSearch] Category search failed:', error.message);
      return { results: [], total: 0 };
    }
  }

  /**
   * Update article engagement metrics
   */
  async updateEngagement(articleId, type = 'view') {
    try {
      const updateField = type === 'view' ? 'views' : type === 'save' ? 'saves' : 'shares';

      await NewsArticle.findByIdAndUpdate(
        articleId,
        { $inc: { [updateField]: 1 } },
        { new: true }
      );
    } catch (error) {
      console.error('[HybridSearch] Engagement update failed:', error.message);
    }
  }

  /**
   * Get search suggestions/autocomplete
   */
  async getSuggestions(query, limit = 8) {
    try {
      // Get unique tags and companies matching query
      const regex = new RegExp(query, 'i');

      const [tags, companies, categories] = await Promise.all([
        NewsArticle.distinct('tags', { tags: regex, isActive: true }),
        NewsArticle.distinct('relevantCompanies', { relevantCompanies: regex, isActive: true }),
        NewsArticle.distinct('category', { category: regex, isActive: true })
      ]);

      const suggestions = [
        ...tags.slice(0, limit / 3),
        ...companies.slice(0, limit / 3),
        ...categories.slice(0, limit / 3)
      ].slice(0, limit);

      return suggestions;
    } catch (error) {
      console.error('[HybridSearch] Suggestions failed:', error.message);
      return [];
    }
  }
}

module.exports = HybridSearchService;
