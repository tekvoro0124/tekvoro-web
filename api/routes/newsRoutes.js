const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');
const HybridSearchService = require('../services/HybridSearchService');
const NewsIngestionService = require('../services/NewsIngestionService');
const AIProcessingService = require('../services/AIProcessingService');

const hybridSearch = new HybridSearchService();
const newsIngestion = new NewsIngestionService();
const aiProcessing = new AIProcessingService();

/**
 * POST /api/news/search
 * Hybrid search for news articles with keyword, semantic, and trust scoring
 */
router.post('/search', async (req, res) => {
  try {
    const {
      query,
      limit = 20,
      skip = 0,
      category,
      source,
      companies,
      industries,
      dateFrom,
      dateTo,
      minTrustScore = 40,
      sentiment
    } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Query is required',
        status: 'error'
      });
    }

    const filters = {
      category: category ? (Array.isArray(category) ? category : [category]) : [],
      source: source ? (Array.isArray(source) ? source : [source]) : [],
      companies: companies ? (Array.isArray(companies) ? companies : [companies]) : [],
      industries: industries ? (Array.isArray(industries) ? industries : [industries]) : [],
      dateFrom,
      dateTo,
      minTrustScore,
      sentiment
    };

    const results = await hybridSearch.search(query, {
      limit,
      skip,
      filters,
      minTrustScore
    });

    res.json({
      status: 'success',
      data: results
    });
  } catch (error) {
    console.error('[NewsAPI] Search error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/trending
 * Get trending articles (most viewed, highest trust, recent)
 */
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10, category, hours = 24 } = req.query;

    const filters = category ? { category: [category] } : {};
    const timeRange = Math.ceil(hours / 24);

    const articles = await hybridSearch.getTrendingArticles({
      limit: parseInt(limit),
      filters,
      timeRange
    });

    res.json({
      status: 'success',
      data: articles
    });
  } catch (error) {
    console.error('[NewsAPI] Trending error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/high-trust
 * Get only highest quality articles (trust score >= 75)
 */
router.get('/high-trust', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;

    const filters = category ? { category: [category] } : {};

    const articles = await hybridSearch.getHighTrustArticles({
      limit: parseInt(limit),
      filters
    });

    res.json({
      status: 'success',
      data: articles
    });
  } catch (error) {
    console.error('[NewsAPI] High-trust error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/company/:company
 * Get articles about a specific company
 */
router.get('/company/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const { limit = 20, skip = 0 } = req.query;

    const result = await hybridSearch.getArticlesByCompany(company, {
      limit: parseInt(limit),
      skip: parseInt(skip)
    });

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('[NewsAPI] Company search error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/category/:category
 * Get articles in a specific category
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20, skip = 0 } = req.query;

    const result = await hybridSearch.getArticlesByCategory(category, {
      limit: parseInt(limit),
      skip: parseInt(skip)
    });

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('[NewsAPI] Category search error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/article/:id
 * Get single article details with related articles
 */
router.get('/article/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const article = await NewsArticle.findById(id).lean();

    if (!article) {
      return res.status(404).json({
        error: 'Article not found',
        status: 'error'
      });
    }

    const related = await hybridSearch.getRelatedArticles(id, 5);

    res.json({
      status: 'success',
      data: {
        article,
        related
      }
    });
  } catch (error) {
    console.error('[NewsAPI] Article fetch error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * POST /api/news/article/:id/view
 * Track article view
 */
router.post('/article/:id/view', async (req, res) => {
  try {
    const { id } = req.params;

    await hybridSearch.updateEngagement(id, 'view');

    res.json({
      status: 'success',
      message: 'View tracked'
    });
  } catch (error) {
    console.error('[NewsAPI] View tracking error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * POST /api/news/article/:id/save
 * Track article save/bookmark
 */
router.post('/article/:id/save', async (req, res) => {
  try {
    const { id } = req.params;

    await hybridSearch.updateEngagement(id, 'save');

    res.json({
      status: 'success',
      message: 'Save tracked'
    });
  } catch (error) {
    console.error('[NewsAPI] Save tracking error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * POST /api/news/article/:id/share
 * Track article share
 */
router.post('/article/:id/share', async (req, res) => {
  try {
    const { id } = req.params;

    await hybridSearch.updateEngagement(id, 'share');

    res.json({
      status: 'success',
      message: 'Share tracked'
    });
  } catch (error) {
    console.error('[NewsAPI] Share tracking error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/suggestions
 * Get search suggestions/autocomplete
 */
router.get('/suggestions', async (req, res) => {
  try {
    const { q = '' } = req.query;

    if (q.length < 2) {
      return res.json({
        status: 'success',
        data: []
      });
    }

    const suggestions = await hybridSearch.getSuggestions(q, 10);

    res.json({
      status: 'success',
      data: suggestions
    });
  } catch (error) {
    console.error('[NewsAPI] Suggestions error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * POST /api/news/query
 * Answer user question using RAG with retrieved articles
 */
router.post('/query', async (req, res) => {
  try {
    const { question, limit = 5 } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        error: 'Question is required',
        status: 'error'
      });
    }

    // Get relevant articles
    const searchResults = await hybridSearch.search(question, {
      limit,
      minTrustScore: 50
    });

    // Generate RAG answer
    const answer = await aiProcessing.answerQuery(question, searchResults.results);

    res.json({
      status: 'success',
      data: {
        answer: answer.answer,
        sourceArticles: searchResults.results.map(a => ({
          title: a.title,
          url: a.url,
          trustScore: a.trustScore.overall,
          summary: a.summary
        }))
      }
    });
  } catch (error) {
    console.error('[NewsAPI] Query error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * POST /api/news/ingest
 * Manually trigger news ingestion (admin only)
 */
router.post('/ingest', async (req, res) => {
  try {
    // Check admin authorization (implement based on your auth system)
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Unauthorized', status: 'error' });
    // }

    console.log('[NewsAPI] Starting manual ingestion...');

    const fetchResults = await newsIngestion.fetchFromAllFeeds();

    let totalProcessed = 0;
    const processingResults = [];

    for (const feedResult of fetchResults) {
      const batchResults = await newsIngestion.processAndStoreBatch(feedResult.articles);
      totalProcessed += batchResults.filter(r => r.success).length;
      processingResults.push({
        source: feedResult.source,
        processed: batchResults.filter(r => r.success).length,
        failed: batchResults.filter(r => !r.success).length
      });
    }

    // Cleanup duplicates and old articles
    await newsIngestion.markDuplicates();
    await newsIngestion.deleteOldArticles(90);

    res.json({
      status: 'success',
      message: `Ingestion complete: ${totalProcessed} articles processed`,
      details: processingResults
    });
  } catch (error) {
    console.error('[NewsAPI] Ingestion error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

/**
 * GET /api/news/stats
 * Get news database statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const [totalArticles, activeArticles, byCategory, highTrust] = await Promise.all([
      NewsArticle.countDocuments(),
      NewsArticle.countDocuments({ isActive: true }),
      NewsArticle.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      NewsArticle.countDocuments({ 'trustScore.overall': { $gte: 75 } })
    ]);

    const categoryStats = Object.fromEntries(
      byCategory.map(c => [c._id, c.count])
    );

    res.json({
      status: 'success',
      data: {
        totalArticles,
        activeArticles,
        highTrustArticles: highTrust,
        byCategory: categoryStats
      }
    });
  } catch (error) {
    console.error('[NewsAPI] Stats error:', error);
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

module.exports = router;
