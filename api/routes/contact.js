const express = require('express');
const { body, validationResult } = require('express-validator');
const automationService = require('../services/automationService');
const { ContactSubmission } = require('../models');

const router = express.Router();

// Contact form submission with lead scoring
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('company').trim().isLength({ min: 2, max: 100 }).withMessage('Company name is required'),
  body('phone').trim().isLength({ min: 10, max: 15 }).withMessage('Valid phone number is required'),
  body('projectType').isIn(['AI Marketplace Platform', 'AI Integration / Bot', 'Admin Dashboard', 'White-Label Platform', 'Mobile App', 'Other']).withMessage('Valid project type required'),
  body('budget').isIn(['Under ₹3L', '₹3L - ₹8L', '₹8L - ₹20L', '₹20L+', 'International ($10K+)']).withMessage('Valid budget range required'),
  body('timeline').isIn(['ASAP (< 1 month)', '1-3 months', '3-6 months', 'Flexible']).withMessage('Valid timeline required'),
  body('description').trim().isLength({ min: 20, max: 2000 }).withMessage('Project description must be 20-2000 characters'),
  body('source').isIn(['Google', 'LinkedIn', 'Clutch', 'Referral', 'Other']).withMessage('Valid source required'),
  body('subject').optional().trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be 5-200 characters'),
  body('message').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  body('submittedAt').isISO8601().withMessage('Valid submission timestamp required')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      name, email, company, phone, projectType, budget, timeline,
      description, source, subject, message, submittedAt
    } = req.body;

    // Trigger automation workflow instead of manual processing
    const automationResult = await automationService.triggerWorkflow('leadCaptureToCRM', {
      name, email, company, phone, projectType, budget, timeline,
      description, source, subject, message, submittedAt
    });

    res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
      leadCategory: automationResult.category,
      leadScore: automationResult.leadScore
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    console.error('Error stack:', error.stack);
    console.error('Request body:', req.body);
    res.status(500).json({
      error: 'Failed to process submission',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Demo booking
router.post('/book-demo', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('company').optional().trim().isLength({ min: 0, max: 100 }).withMessage('Company name too long'),
  body('projectType').trim().isLength({ min: 5, max: 200 }).withMessage('Project type must be 5-200 characters'),
  body('timeline').optional().isIn(['asap', '1month', '3months', '6months']).withMessage('Invalid timeline'),
  body('message').optional().trim().isLength({ min: 0, max: 1000 }).withMessage('Message too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, company, phone, projectType, timeline, message } = req.body;

    // Save as contact submission with demo type
    const submission = new ContactSubmission({
      name,
      email,
      company,
      phone,
      subject: `Demo Request: ${projectType}`,
      message: `Project Type: ${projectType}\nTimeline: ${timeline || 'Not specified'}\n\n${message || ''}`,
      type: 'demo',
      source: 'website',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await submission.save();

    res.json({
      success: true,
      message: 'Thank you for your demo request. Our team will contact you within 24 hours to schedule your personalized demo.',
      submissionId: submission._id
    });

  } catch (error) {
    console.error('Error booking demo:', error);
    res.status(500).json({
      error: 'Failed to book demo',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
