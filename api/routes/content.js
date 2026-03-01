const express = require('express');
const { BlogPost, Service, CaseStudy } = require('../models');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Get all blog posts
router.get('/blog', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, featured } = req.query;

    let query = { published: true };

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (featured === 'true') query.featured = true;

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get blog post by slug
router.get('/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      published: true
    }).select('-__v');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment view count
    await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Get featured blog posts
router.get('/blog/featured', async (req, res) => {
  try {
    const posts = await BlogPost.find({
      published: true,
      featured: true
    })
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('-__v');

    res.json(posts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    res.status(500).json({ error: 'Failed to fetch featured posts' });
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const { category, featured } = req.query;

    let query = { published: true };

    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get service by slug
router.get('/services/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      published: true
    }).select('-__v');

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Get all case studies
router.get('/case-studies', async (req, res) => {
  try {
    const { industry, featured } = req.query;

    let query = { published: true };

    if (industry) query.industry = industry;
    if (featured === 'true') query.featured = true;

    const caseStudies = await CaseStudy.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// Get case study by slug
router.get('/case-studies/:slug', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({
      slug: req.params.slug,
      published: true
    }).select('-__v');

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
});

// Search content
router.get('/search', async (req, res) => {
  try {
    const { q: query, type, limit = 10 } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');
    let results = [];

    // Search based on type or search all
    if (type === 'blog') {
      results = await BlogPost.find({
        published: true,
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { excerpt: searchRegex },
          { tags: searchRegex },
          { category: searchRegex }
        ]
      }).limit(limit).select('title slug excerpt category tags publishedAt');
    } else if (type === 'services') {
      results = await Service.find({
        published: true,
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { content: searchRegex },
          { tags: searchRegex },
          { category: searchRegex }
        ]
      }).limit(limit).select('title slug description category tags');
    } else {
      // Search all content types
      const [blogResults, serviceResults, caseStudyResults] = await Promise.all([
        BlogPost.find({
          published: true,
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { excerpt: searchRegex },
            { tags: searchRegex }
          ]
        }).limit(5).select('title slug excerpt category type').lean(),
        Service.find({
          published: true,
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { tags: searchRegex }
          ]
        }).limit(5).select('title slug description category type').lean(),
        CaseStudy.find({
          published: true,
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { client: searchRegex }
          ]
        }).limit(5).select('title slug description industry type').lean()
      ]);

      // Add type to results and combine
      blogResults.forEach(item => item.type = 'blog');
      serviceResults.forEach(item => item.type = 'service');
      caseStudyResults.forEach(item => item.type = 'case-study');

      results = [...blogResults, ...serviceResults, ...caseStudyResults];
    }

    res.json({
      query,
      results,
      total: results.length
    });
  } catch (error) {
    console.error('Error searching content:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// ========== ADVANCED SEARCH ==========
router.get('/search/advanced', async (req, res) => {
  try {
    const {
      q: query,
      category,
      tag,
      type = 'all',
      sortBy = 'date',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    let allResults = [];

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');
    const skip = (page - 1) * limit;

    // Build search filters
    const buildFilter = (baseFilter = {}) => ({
      ...baseFilter,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { content: searchRegex },
        { excerpt: searchRegex }
      ]
    });

    // Search blog posts
    if (type === 'all' || type === 'blog') {
      const blogFilter = buildFilter({ published: true });
      if (category) blogFilter.category = category;
      if (tag) blogFilter.tags = tag;

      const blogResults = await BlogPost.find(blogFilter)
        .sort({ [sortBy === 'date' ? 'publishedAt' : sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .select('title slug excerpt category tags publishedAt views likes');

      allResults.push(...blogResults);
    }

    // Search services
    if (type === 'all' || type === 'service') {
      const serviceFilter = buildFilter({ published: true });
      if (category) serviceFilter.category = category;
      if (tag) serviceFilter.tags = tag;

      const serviceResults = await Service.find(serviceFilter)
        .sort({ [sortBy === 'date' ? 'createdAt' : sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .select('title slug description category tags featured');

      allResults.push(...serviceResults);
    }

    // Search case studies
    if (type === 'all' || type === 'case-study') {
      const caseFilter = { published: true };
      if (category) caseFilter.industry = category;

      const caseResults = await CaseStudy.find(caseFilter)
        .find(buildFilter())
        .sort({ [sortBy === 'date' ? 'createdAt' : sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .select('title slug description industry client results');

      allResults.push(...caseResults);
    }

    res.json({
      query,
      filters: { category: category || null, tag: tag || null, type },
      results: allResults,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: allResults.length
      }
    });
  } catch (error) {
    console.error('Error in advanced search:', error);
    res.status(500).json({ error: 'Advanced search failed' });
  }
});

// ========== AUTOCOMPLETE SUGGESTIONS ==========
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q: query, limit = 5 } = req.query;

    if (!query || query.trim().length === 0) {
      return res.json({ suggestions: [] });
    }

    const searchRegex = new RegExp(query, 'i');

    const [blogSuggestions, serviceSuggestions, tagSuggestions] = await Promise.all([
      BlogPost.find({ published: true, title: searchRegex })
        .limit(parseInt(limit))
        .select('title slug')
        .lean(),
      Service.find({ published: true, title: searchRegex })
        .limit(parseInt(limit))
        .select('title slug')
        .lean(),
      BlogPost.find({ published: true, tags: searchRegex })
        .distinct('tags')
    ]);

    const suggestions = [
      ...blogSuggestions.map(item => ({ text: item.title, type: 'blog', slug: item.slug })),
      ...serviceSuggestions.map(item => ({ text: item.title, type: 'service', slug: item.slug })),
      ...tagSuggestions.map(tag => ({ text: tag, type: 'tag', slug: null }))
    ];

    res.json({ query, suggestions: suggestions.slice(0, parseInt(limit)) });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({ error: 'Suggestions failed' });
  }
});

// ========== BLOG POST CRUD ==========
// Create blog post (Admin only)
router.post('/blog', verifyAdmin, [
  body('title').notEmpty().withMessage('Title required'),
  body('slug').notEmpty().withMessage('Slug required'),
  body('content').notEmpty().withMessage('Content required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newPost = new BlogPost({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newPost.save();
    res.status(201).json({ message: 'Blog post created', post: newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post (Admin only)
router.put('/blog/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await BlogPost.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post updated', post: updated });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post (Admin only)
router.delete('/blog/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BlogPost.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted', post: deleted });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// ========== SERVICE CRUD ==========
// Create service (Admin only)
router.post('/services', verifyAdmin, [
  body('title').notEmpty().withMessage('Title required'),
  body('slug').notEmpty().withMessage('Slug required'),
  body('description').notEmpty().withMessage('Description required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newService = new Service({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newService.save();
    res.status(201).json({ message: 'Service created', service: newService });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Update service (Admin only)
router.put('/services/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service updated', service: updated });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service (Admin only)
router.delete('/services/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted', service: deleted });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// ========== CASE STUDY CRUD ==========
// Create case study (Admin only)
router.post('/case-studies', verifyAdmin, [
  body('title').notEmpty().withMessage('Title required'),
  body('slug').notEmpty().withMessage('Slug required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newCaseStudy = new CaseStudy({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newCaseStudy.save();
    res.status(201).json({ message: 'Case study created', caseStudy: newCaseStudy });
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ error: 'Failed to create case study' });
  }
});

// Update case study (Admin only)
router.put('/case-studies/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await CaseStudy.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json({ message: 'Case study updated', caseStudy: updated });
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ error: 'Failed to update case study' });
  }
});

// Delete case study (Admin only)
router.delete('/case-studies/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CaseStudy.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json({ message: 'Case study deleted', caseStudy: deleted });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
});

// ========== CATEGORIES ==========
router.get('/categories', async (req, res) => {
  try {
    const [blogCategories, serviceCategories] = await Promise.all([
      BlogPost.distinct('category', { published: true }),
      Service.distinct('category', { published: true })
    ]);

    const allCategories = [...new Set([...blogCategories, ...serviceCategories])];

    res.json({ categories: allCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ========== TAGS ==========
router.get('/tags', async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { published: true });
    res.json({ tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// ========== CONTENT STATS ==========
router.get('/stats', async (req, res) => {
  try {
    const [blogCount, serviceCount, caseStudyCount, viewStats] = await Promise.all([
      BlogPost.countDocuments({ published: true }),
      Service.countDocuments({ published: true }),
      CaseStudy.countDocuments({ published: true }),
      BlogPost.aggregate([{ $match: { published: true } }, { $group: { _id: null, total: { $sum: '$views' } } }])
    ]);

    res.json({
      blogPosts: blogCount,
      services: serviceCount,
      caseStudies: caseStudyCount,
      totalViews: viewStats[0]?.total || 0,
      totalContent: blogCount + serviceCount + caseStudyCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ========== TRENDING CONTENT ==========
router.get('/trending', async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const trendingPosts = await BlogPost.find({ published: true })
      .sort({ views: -1, likes: -1 })
      .limit(parseInt(limit))
      .select('title slug excerpt views likes category');

    res.json({ trending: trendingPosts });
  } catch (error) {
    console.error('Error fetching trending:', error);
    res.status(500).json({ error: 'Failed to fetch trending content' });
  }
});

module.exports = router;
