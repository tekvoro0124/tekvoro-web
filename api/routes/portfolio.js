const express = require('express');
const { PortfolioProject } = require('../models');
const router = express.Router();

// Get all portfolio projects (public)
router.get('/', async (req, res) => {
  try {
    const { category, status, featured, page = 1, limit = 10, sort = 'order' } = req.query;

    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (featured === 'true') query.featured = true;

    const sortOrder = sort === 'recent' ? { createdAt: -1 } : { order: 1, featured: -1 };

    const skip = (page - 1) * limit;
    const projects = await PortfolioProject.find(query)
      .sort(sortOrder)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean();

    const total = await PortfolioProject.countDocuments(query);

    res.json({
      success: true,
      data: projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio projects',
      message: error.message
    });
  }
});

// Get single project by ID or slug (public)
router.get('/:id', async (req, res) => {
  try {
    // Try to find by ID first, then by slug
    let project = await PortfolioProject.findById(req.params.id).lean();
    
    if (!project) {
      project = await PortfolioProject.findOne({ slug: req.params.id }).lean();
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
      message: error.message
    });
  }
});

// Get portfolio statistics (public)
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = {
      totalProjects: await PortfolioProject.countDocuments(),
      liveProjects: await PortfolioProject.countDocuments({ status: 'live' }),
      completedProjects: await PortfolioProject.countDocuments({ status: 'completed' }),
      inDevelopment: await PortfolioProject.countDocuments({ status: 'in-development' }),
      categories: {}
    };

    // Get category breakdown
    const categories = ['marketplace', 'platform', 'automation', 'mobile', 'web'];
    for (const cat of categories) {
      stats.categories[cat] = await PortfolioProject.countDocuments({ category: cat });
    }

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching portfolio stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio statistics',
      message: error.message
    });
  }
});

module.exports = router;
