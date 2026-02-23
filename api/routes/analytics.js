const express = require('express');
const { Analytics } = require('../models');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Track page view or other analytics event
router.post('/track', optionalAuth, async (req, res) => {
  try {
    const {
      type,
      path,
      referrer,
      userAgent,
      sessionId,
      metadata = {}
    } = req.body;

    // Validate required fields
    if (!type || !path) {
      return res.status(400).json({ error: 'Type and path are required' });
    }

    // Create analytics entry
    const analyticsEntry = new Analytics({
      date: new Date(),
      type,
      path,
      referrer,
      userAgent,
      sessionId: sessionId || generateSessionId(),
      userId: req.user?.id,
      ipAddress: req.ip,
      metadata
    });

    await analyticsEntry.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ error: 'Failed to track analytics' });
  }
});

// Get analytics data (Admin only - would need auth middleware)
router.get('/summary', async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    let matchStage = {};

    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    if (type) matchStage.type = type;

    const summary = await Analytics.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            type: '$type',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
          },
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' },
          uniqueSessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          dailyData: {
            $push: {
              date: '$_id.date',
              count: '$count',
              uniqueUsers: { $size: { $filter: { input: '$uniqueUsers', cond: { $ne: ['$$this', null] } } } },
              uniqueSessions: { $size: '$uniqueSessions' }
            }
          },
          totalEvents: { $sum: '$count' },
          totalUniqueUsers: { $addToSet: '$uniqueUsers' },
          totalUniqueSessions: { $addToSet: '$uniqueSessions' }
        }
      },
      {
        $project: {
          type: '$_id',
          totalEvents: 1,
          totalUniqueUsers: { $size: { $reduce: { input: '$totalUniqueUsers', initialValue: [], in: { $setUnion: ['$$value', '$$this'] } } } },
          totalUniqueSessions: { $size: { $reduce: { input: '$totalUniqueSessions', initialValue: [], in: { $setUnion: ['$$value', '$$this'] } } },
          dailyData: { $sortArray: { input: '$dailyData', sortBy: { date: 1 } } }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      summary: summary.map(item => ({
        type: item.type,
        totalEvents: item.totalEvents,
        totalUniqueUsers: item.totalUniqueUsers,
        totalUniqueSessions: item.totalUniqueSessions,
        dailyData: item.dailyData
      }))
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({ error: 'Failed to get analytics summary' });
  }
});

// Get popular pages
router.get('/popular-pages', async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;

    let matchStage = { type: 'page-view' };

    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    const popularPages = await Analytics.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$path',
          views: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' },
          uniqueSessions: { $addToSet: '$sessionId' },
          lastViewed: { $max: '$date' }
        }
      },
      {
        $project: {
          path: '$_id',
          views: 1,
          uniqueUsers: { $size: { $filter: { input: '$uniqueUsers', cond: { $ne: ['$$this', null] } } } },
          uniqueSessions: { $size: '$uniqueSessions' },
          lastViewed: 1
        }
      },
      { $sort: { views: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json({ popularPages });
  } catch (error) {
    console.error('Popular pages error:', error);
    res.status(500).json({ error: 'Failed to get popular pages' });
  }
});

// Get user journey/flow analysis
router.get('/user-journey', async (req, res) => {
  try {
    const { sessionId, userId, startDate, endDate } = req.query;

    let matchStage = {};

    if (sessionId) matchStage.sessionId = sessionId;
    if (userId) matchStage.userId = userId;

    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    const journey = await Analytics.find(matchStage)
      .sort({ date: 1 })
      .select('date type path referrer metadata')
      .limit(100); // Limit for performance

    res.json({ journey });
  } catch (error) {
    console.error('User journey error:', error);
    res.status(500).json({ error: 'Failed to get user journey' });
  }
});

// Generate session ID if not provided
function generateSessionId() {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
