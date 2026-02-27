const express = require('express');
const router = express.Router();

// Track analytics event
router.post('/track', (req, res) => {
  try {
    const { type, path, metadata } = req.body;
    
    console.log('📊 Analytics Event:', {
      type,
      path,
      metadata,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    res.json({
      success: true,
      message: 'Event tracked successfully',
      eventType: type
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'Failed to track event',
      message: error.message
    });
  }
});

// Get analytics summary
router.get('/summary', (req, res) => {
  res.json({
    status: 'Analytics service operational',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;