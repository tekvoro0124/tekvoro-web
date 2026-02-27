const express = require('express');
const { Investor } = require('../models');
const router = express.Router();

// Get all investors (public)
router.get('/', async (req, res) => {
  try {
    const { featured, status = 'active', sort = 'order' } = req.query;

    let query = { status };
    if (featured === 'true') {
      query.featured = true;
    }

    const sortOrder = sort === 'recent' ? { createdAt: -1 } : { order: 1, createdAt: -1 };

    const investors = await Investor.find(query)
      .sort(sortOrder)
      .lean();

    res.json({
      success: true,
      data: investors,
      count: investors.length
    });
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch investors',
      message: error.message
    });
  }
});

// Get single investor by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id).lean();

    if (!investor) {
      return res.status(404).json({
        success: false,
        error: 'Investor not found'
      });
    }

    res.json({
      success: true,
      data: investor
    });
  } catch (error) {
    console.error('Error fetching investor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch investor',
      message: error.message
    });
  }
});

module.exports = router;
