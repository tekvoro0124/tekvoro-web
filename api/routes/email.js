const express = require('express');
const { body, validationResult } = require('express-validator');
const automationService = require('../services/automationService');

const router = express.Router();

// Send email (used by frontend for demos and subscriptions)
router.post('/send-email', [
  body('type').isIn(['demo-booking', 'subscription', 'contact']).withMessage('Valid email type required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { type, email, ...data } = req.body;

    // Log the email request
    console.log('📧 Email request received:', {
      type,
      email,
      timestamp: new Date().toISOString(),
      data
    });

    // Trigger automation workflow to send email
    try {
      if (type === 'demo-booking') {
        await automationService.triggerWorkflow('demoBookingEmail', {
          email,
          name: data.name,
          company: data.company,
          solution: data.solution,
          date: data.date,
          time: data.time,
          notes: data.notes
        });
      } else if (type === 'subscription') {
        await automationService.triggerWorkflow('subscriptionEmail', {
          email,
          name: data.name,
          company: data.company,
          interests: data.interests,
          selectedPlan: data.selectedPlan
        });
      }
    } catch (workflowError) {
      console.warn('Automation workflow error (non-critical):', workflowError.message);
      // Don't fail the request, just log it
    }

    // Return success even if automation fails (it may retry in background)
    res.status(200).json({
      success: true,
      message: `${type} request received successfully`,
      trackingId: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    console.error('Email endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process email request',
      message: error.message
    });
  }
});

// Subscribe to newsletter
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('company').optional().trim().isLength({ min: 2, max: 100 }),
  body('interests').optional().isArray().withMessage('Interests must be an array')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, name, company, interests, selectedPlan } = req.body;

    console.log('📨 Newsletter subscription:', {
      email,
      name,
      company,
      interests,
      selectedPlan,
      timestamp: new Date().toISOString()
    });

    // Trigger subscription automation
    try {
      await automationService.triggerWorkflow('subscriptionEmail', {
        email,
        name: name || 'Subscriber',
        company: company || '',
        interests: interests || [],
        selectedPlan: selectedPlan || 'free'
      });
    } catch (workflowError) {
      console.warn('Automation workflow error (non-critical):', workflowError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      email
    });

  } catch (error) {
    console.error('Subscription endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Subscription failed',
      message: error.message
    });
  }
});

// Get email service status
router.get('/status', (req, res) => {
  res.json({
    success: true,
    service: 'email-service',
    status: 'operational',
    timestamp: new Date().toISOString(),
    endpoints: {
      sendEmail: '/api/email/send-email',
      subscribe: '/api/email/subscribe'
    }
  });
});

module.exports = router;
