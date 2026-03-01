const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  BlogPost,
  Service,
  CaseStudy,
  ContactSubmission,
  EmailSubscription,
  EmailCampaign,
  Analytics,
  User,
  Investor,
  PortfolioProject
} = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// ================================
// CONTENT MANAGEMENT
// ================================

// Blog Posts Management
router.get('/blog-posts', async (req, res) => {
  try {
    const { page = 1, limit = 10, published, category } = req.query;

    let query = {};
    if (published !== undefined) query.published = published === 'true';
    if (category) query.category = category;

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

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

router.post('/blog-posts', [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title required, max 200 chars'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content required'),
  body('excerpt').trim().isLength({ min: 1, max: 300 }).withMessage('Excerpt required, max 300 chars'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category required'),
  body('slug').trim().isLength({ min: 1 }).withMessage('Slug required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { title, slug, content, excerpt, category, tags, author, featured, published } = req.body;

    // Check for duplicate slug
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ error: 'Blog post with this slug already exists' });
    }

    const blogPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      category,
      tags: tags || [],
      author: author || 'Tekvoro Team',
      featured: featured || false,
      published: published || false,
      publishedAt: published ? new Date() : null
    });

    await blogPost.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      post: blogPost
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

router.put('/blog-posts/:id', [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title max 200 chars'),
  body('content').optional().trim().isLength({ min: 1 }).withMessage('Content required'),
  body('excerpt').optional().trim().isLength({ min: 1, max: 300 }).withMessage('Excerpt max 300 chars'),
  body('category').optional().trim().isLength({ min: 1 }).withMessage('Category required'),
  body('slug').optional().trim().isLength({ min: 1 }).withMessage('Slug required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    // Check for duplicate slug if slug is being updated
    if (updates.slug) {
      const existingPost = await BlogPost.findOne({ slug: updates.slug, _id: { $ne: id } });
      if (existingPost) {
        return res.status(400).json({ error: 'Blog post with this slug already exists' });
      }
    }

    // Handle publish/unpublish
    if (updates.published === true && !updates.publishedAt) {
      updates.publishedAt = new Date();
    }

    const blogPost = await BlogPost.findByIdAndUpdate(id, updates, { new: true });

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      post: blogPost
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

router.delete('/blog-posts/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Services Management (similar pattern to blog posts)
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
    res.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Case Studies Management
router.get('/case-studies', async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    res.json({ caseStudies });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// ================================
// CONTACT MANAGEMENT
// ================================

router.get('/contacts', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type } = req.query;

    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const contacts = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('assignedTo', 'name email');

    const total = await ContactSubmission.countDocuments(query);

    res.json({
      contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.put('/contacts/:id', [
  body('status').optional().isIn(['new', 'in-progress', 'responded', 'resolved', 'closed']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('notes').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { status, priority, notes, assignedTo } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (priority) updates.priority = priority;
    if (assignedTo) updates.assignedTo = assignedTo;

    if (notes && notes.length > 0) {
      updates.$push = { notes: { content: notes[0], author: req.user.name, createdAt: new Date() } };
    }

    const contact = await ContactSubmission.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// ================================
// EMAIL SUBSCRIPTION MANAGEMENT
// ================================

router.get('/subscriptions', async (req, res) => {
  try {
    const { page = 1, limit = 50, status, plan } = req.query;

    let query = {};
    if (status) query.status = status;
    if (plan) query.plan = plan;

    const subscriptions = await EmailSubscription.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EmailSubscription.countDocuments(query);

    // Get stats
    const stats = await EmailSubscription.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
          unsubscribed: { $sum: { $cond: [{ $eq: ['$status', 'unsubscribed'] }, 1, 0] } },
          verified: { $sum: { $cond: ['$isVerified', 1, 0] } }
        }
      }
    ]);

    res.json({
      subscriptions,
      stats: stats[0] || { total: 0, active: 0, unsubscribed: 0, verified: 0 },
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalSubscriptions: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// ================================
// ANALYTICS
// ================================

router.get('/analytics', async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    let matchStage = {};

    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    if (type) matchStage.type = type;

    const analytics = await Analytics.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            type: '$type',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
          },
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          data: {
            $push: {
              date: '$_id.date',
              count: '$count',
              uniqueUsers: { $size: '$uniqueUsers' }
            }
          },
          total: { $sum: '$count' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.json({
      analytics: analytics.map(item => ({
        type: item._id,
        total: item.total,
        data: item.data.sort((a, b) => a.date.localeCompare(b.date))
      }))
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// ================================
// INVESTOR MANAGEMENT
// ================================

router.get('/investors', async (req, res) => {
  try {
    const { page = 1, limit = 10, featured } = req.query;
    let query = {};
    if (featured !== undefined) query.featured = featured === 'true';

    const investors = await Investor.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Investor.countDocuments(query);

    res.json({
      investors,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalInvestors: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

router.post('/investors', [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name required'),
  body('logo').trim().isLength({ min: 1 }).withMessage('Logo URL required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location required'),
  body('website').trim().isLength({ min: 1 }).withMessage('Website required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const investor = new Investor(req.body);
    await investor.save();

    res.status(201).json({
      success: true,
      message: 'Investor created successfully',
      investor
    });
  } catch (error) {
    console.error('Error creating investor:', error);
    res.status(500).json({ error: 'Failed to create investor' });
  }
});

router.put('/investors/:id', async (req, res) => {
  try {
    const investor = await Investor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }

    res.json({
      success: true,
      message: 'Investor updated successfully',
      investor
    });
  } catch (error) {
    console.error('Error updating investor:', error);
    res.status(500).json({ error: 'Failed to update investor' });
  }
});

router.delete('/investors/:id', async (req, res) => {
  try {
    const investor = await Investor.findByIdAndDelete(req.params.id);

    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }

    res.json({
      success: true,
      message: 'Investor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting investor:', error);
    res.status(500).json({ error: 'Failed to delete investor' });
  }
});

// ================================
// PORTFOLIO PROJECT MANAGEMENT
// ================================

router.get('/portfolio', async (req, res) => {
  try {
    const { page = 1, limit = 10, featured, category, status } = req.query;
    let query = {};
    if (featured !== undefined) query.featured = featured === 'true';
    if (category) query.category = category;
    if (status) query.status = status;

    const projects = await PortfolioProject.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PortfolioProject.countDocuments(query);

    res.json({
      projects,
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
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

router.post('/portfolio', [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title required'),
  body('slug').trim().isLength({ min: 1 }).withMessage('Slug required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description required'),
  body('client').trim().isLength({ min: 1 }).withMessage('Client required'),
  body('category').isIn(['marketplace', 'platform', 'automation', 'mobile', 'web']).withMessage('Valid category required'),
  body('status').isIn(['live', 'completed', 'in-development']).withMessage('Valid status required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    // Check for duplicate slug
    const existingProject = await PortfolioProject.findOne({ slug: req.body.slug });
    if (existingProject) {
      return res.status(400).json({ error: 'Project with this slug already exists' });
    }

    const project = new PortfolioProject(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    res.status(500).json({ error: 'Failed to create portfolio project' });
  }
});

router.put('/portfolio/:id', async (req, res) => {
  try {
    const project = await PortfolioProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Portfolio project updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    res.status(500).json({ error: 'Failed to update portfolio project' });
  }
});

router.delete('/portfolio/:id', async (req, res) => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Portfolio project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    res.status(500).json({ error: 'Failed to delete portfolio project' });
  }
});

// ================================
// DASHBOARD STATS
// ================================

router.get('/dashboard/stats', async (req, res) => {
  try {
    const [
      totalContacts,
      newContacts,
      totalSubscriptions,
      activeSubscriptions,
      totalBlogPosts,
      publishedBlogPosts,
      totalUsers
    ] = await Promise.all([
      ContactSubmission.countDocuments({}),
      ContactSubmission.countDocuments({ status: 'new' }),
      EmailSubscription.countDocuments({}),
      EmailSubscription.countDocuments({ status: 'active' }),
      BlogPost.countDocuments({}),
      BlogPost.countDocuments({ published: true }),
      User.countDocuments({})
    ]);

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [
      recentContacts,
      recentSubscriptions,
      recentBlogViews
    ] = await Promise.all([
      ContactSubmission.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      EmailSubscription.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Analytics.aggregate([
        { $match: { date: { $gte: sevenDaysAgo }, type: 'page-view' } },
        { $group: { _id: null, total: { $sum: 1 } } }
      ])
    ]);

    res.json({
      stats: {
        contacts: {
          total: totalContacts,
          new: newContacts,
          recent: recentContacts
        },
        subscriptions: {
          total: totalSubscriptions,
          active: activeSubscriptions,
          recent: recentSubscriptions
        },
        content: {
          blogPosts: {
            total: totalBlogPosts,
            published: publishedBlogPosts
          }
        },
        users: {
          total: totalUsers
        },
        activity: {
          blogViews: recentBlogViews[0]?.total || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
