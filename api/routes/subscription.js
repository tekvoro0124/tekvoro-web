const express = require('express');
const { body, validationResult } = require('express-validator');
const emailService = require('../services/emailService');
const { EmailSubscription, EmailCampaign } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Email subscription
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('name').optional().trim().isLength({ min: 0, max: 100 }).withMessage('Name too long'),
  body('company').optional().trim().isLength({ min: 0, max: 100 }).withMessage('Company name too long'),
  body('interests').optional().isArray().withMessage('Interests must be an array'),
  body('plan').optional().isIn(['free', 'starter', 'professional', 'enterprise']).withMessage('Invalid plan')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, name, company, interests, plan = 'free' } = req.body;

    // Check if already subscribed
    const existingSubscription = await EmailSubscription.findOne({ email });
    if (existingSubscription && existingSubscription.status === 'active') {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    if (existingSubscription) {
      // Reactivate existing subscription
      existingSubscription.status = 'active';
      existingSubscription.name = name || existingSubscription.name;
      existingSubscription.company = company || existingSubscription.company;
      existingSubscription.interests = interests || existingSubscription.interests;
      existingSubscription.plan = plan;
      existingSubscription.subscribedAt = new Date();
      existingSubscription.unsubscribedAt = null;
      existingSubscription.isVerified = false; // Require re-verification
      await existingSubscription.save();

      // Send welcome email
      if (emailService) {
        try {
          await emailService.sendWelcomeEmail(existingSubscription);
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't fail the request if email fails
        }
      }

      return res.json({
        success: true,
        message: 'Welcome back! Your subscription has been reactivated.'
      });
    }

    // Create new subscription
    const subscription = new EmailSubscription({
      email,
      name,
      company,
      interests: interests || [],
      plan,
      source: 'website',
      isVerified: false
    });

    await subscription.save();

    // Send welcome email
    if (emailService) {
      try {
        await emailService.sendWelcomeEmail(subscription);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
      subscriptionId: subscription._id
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      error: 'Subscription failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Email verification
router.post('/verify/:token', async (req, res) => {
  try {
    const subscription = await EmailSubscription.findOne({
      verificationToken: req.params.token,
      isVerified: false
    });

    if (!subscription) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    subscription.isVerified = true;
    subscription.verificationToken = null;
    await subscription.save();

    res.json({
      success: true,
      message: 'Email verified successfully! You are now subscribed to our newsletter.'
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Unsubscribe
router.post('/unsubscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email } = req.body;

    const subscription = await EmailSubscription.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    subscription.status = 'unsubscribed';
    subscription.unsubscribedAt = new Date();
    await subscription.save();

    res.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Unsubscribe failed' });
  }
});

// Send welcome email function
async function sendWelcomeEmail(subscription) {
  try {
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email/${subscription.verificationToken}`;

    const msg = {
      to: subscription.email,
      from: process.env.EMAIL_FROM_ADDRESS,
      subject: 'Welcome to Tekvoro Technologies - India\'s AI Platform Studio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #FFD600; margin-bottom: 20px;">Welcome to Tekvoro!</h1>
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
              Thank you for subscribing to our newsletter. You're now part of India's AI Platform Studio community.
            </p>

            <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 10px;">What you'll receive:</h3>
              <ul style="text-align: left; color: #555;">
                <li>AI platform development insights</li>
                <li>Case studies from our 90-day delivery projects</li>
                <li>Industry trends and technology updates</li>
                <li>Exclusive invites to webinars and events</li>
              </ul>
            </div>

            <p style="color: #666; font-size: 14px; margin: 20px 0;">
              Before we can start sending you updates, please verify your email address:
            </p>

            <a href="${verificationUrl}"
               style="background: #FFD600; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Verify Your Email
            </a>

            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color: #FFD600;">${verificationUrl}</a>
            </p>

            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Best regards,<br>
              <strong>The Tekvoro Team</strong><br>
              India's AI Platform Studio — From Idea to Live in 90 Days
            </p>
          </div>
        </div>
      `,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_FROM_ADDRESS
    };

    await sgMail.send(msg);
    console.log(`Welcome email sent to ${subscription.email}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error - subscription should still work even if email fails
  }
}

// ================================
// ADMIN EMAIL CAMPAIGN MANAGEMENT
// ================================

// Get all campaigns (Admin only)
router.get('/campaigns', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = {};
    if (status) query.status = status;

    const campaigns = await EmailCampaign.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EmailCampaign.countDocuments(query);

    res.json({
      campaigns,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalCampaigns: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Create new campaign (Admin only)
router.post('/campaigns', authenticateToken, requireAdmin, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Campaign name required'),
  body('subject').trim().isLength({ min: 1, max: 200 }).withMessage('Subject required'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content required'),
  body('template').optional().isIn(['newsletter', 'announcement', 'product-update', 'case-study', 'welcome']).withMessage('Invalid template')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { name, subject, content, template = 'newsletter', scheduledDate, targetAudience } = req.body;

    const campaign = new EmailCampaign({
      name,
      subject,
      content,
      template,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      targetAudience: targetAudience || {},
      createdBy: req.user.id
    });

    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Email campaign created successfully',
      campaign
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Update campaign (Admin only)
router.put('/campaigns/:id', authenticateToken, requireAdmin, [
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Campaign name max 100 chars'),
  body('subject').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Subject max 200 chars'),
  body('content').optional().trim().isLength({ min: 1 }).withMessage('Content required'),
  body('status').optional().isIn(['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const campaign = await EmailCampaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({
      success: true,
      message: 'Campaign updated successfully',
      campaign
    });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// Send campaign (Admin only)
router.post('/campaigns/:id/send', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
      return res.status(400).json({ error: 'Campaign cannot be sent in current status' });
    }

    // Get target subscribers
    let query = { status: 'active', isVerified: true };

    if (campaign.targetAudience.tags && campaign.targetAudience.tags.length > 0) {
      query.tags = { $in: campaign.targetAudience.tags };
    }

    if (campaign.targetAudience.interests && campaign.targetAudience.interests.length > 0) {
      query.interests = { $in: campaign.targetAudience.interests };
    }

    if (campaign.targetAudience.plans && campaign.targetAudience.plans.length > 0) {
      query.plan = { $in: campaign.targetAudience.plans };
    }

    const subscribers = await EmailSubscription.find(query).select('email name');

    if (subscribers.length === 0) {
      return res.status(400).json({ error: 'No subscribers match the target audience' });
    }

    // Update campaign status
    campaign.status = 'sending';
    campaign.sentDate = new Date();
    await campaign.save();

    // Send emails in batches
    const batchSize = 50;
    let sentCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const emailPromises = batch.map(subscriber => {
        return emailService.sendNewsletterEmail(
          subscriber.email,
          campaign,
          subscriber.name
        );
      });

      try {
        await Promise.all(emailPromises);
        sentCount += batch.length;
        campaign.recipients = sentCount;
        await campaign.save();
      } catch (error) {
        console.error(`Failed to send batch ${i / batchSize + 1}:`, error);
      }

      // Small delay between batches to avoid rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update final campaign status
    campaign.status = 'sent';
    campaign.performance.sent = sentCount;
    campaign.performance.delivered = sentCount; // Approximation
    await campaign.save();

    res.json({
      success: true,
      message: `Campaign sent to ${sentCount} subscribers`,
      campaign
    });

  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ error: 'Failed to send campaign' });
  }
});

// Personalize content with subscriber data
function personalizeContent(content, subscriber) {
  return content
    .replace(/\{\{name\}\}/g, subscriber.name || 'there')
    .replace(/\{\{email\}\}/g, subscriber.email);
}

// Delete campaign (Admin only)
router.delete('/campaigns/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const campaign = await EmailCampaign.findByIdAndDelete(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
});

module.exports = router;
