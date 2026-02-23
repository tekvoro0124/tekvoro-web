const express = require('express');
const { BlogPost, Service, CaseStudy } = require('../models');
const { body, validationResult } = require('express-validator');

const router = express.Router();

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

module.exports = router;
