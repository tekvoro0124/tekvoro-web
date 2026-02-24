const express = require('express');
const { body, validationResult } = require('express-validator');
const { Ticket } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Create a new ticket
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('description').trim().isLength({ min: 20, max: 2000 }).withMessage('Description must be 20-2000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('category').isIn(['technical', 'billing', 'feature-request', 'general']).withMessage('Invalid category'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { title, description, email, category, priority = 'medium' } = req.body;

    const ticket = new Ticket({
      title,
      description,
      email,
      category,
      priority,
      submittedBy: req.user?.id || null
    });

    await ticket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({
      error: 'Failed to create ticket',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all tickets (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, category, priority, assignedTo } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tickets = await Ticket.find(filter)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: tickets.length,
      tickets
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      error: 'Failed to fetch tickets',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single ticket
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('responses.respondent', 'name email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({
      error: 'Failed to fetch ticket',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update ticket (admin only)
router.patch('/:id', authenticateToken, requireAdmin, [
  body('title').optional().trim().isLength({ min: 5, max: 200 }),
  body('description').optional().trim().isLength({ min: 20, max: 2000 }),
  body('status').optional().isIn(['open', 'in-progress', 'resolved', 'closed']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'critical']),
  body('category').optional().isIn(['technical', 'billing', 'feature-request', 'general'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { title, description, status, priority, category, assignedTo, resolution } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) {
      updateData.status = status;
      if (status === 'resolved' || status === 'closed') {
        updateData.resolvedAt = new Date();
      }
    }
    if (priority) updateData.priority = priority;
    if (category) updateData.category = category;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (resolution) updateData.resolution = resolution;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      success: true,
      message: 'Ticket updated successfully',
      ticket
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({
      error: 'Failed to update ticket',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Add response to ticket
router.post('/:id/responses', authenticateToken, [
  body('message').trim().isLength({ min: 5, max: 2000 }).withMessage('Message must be 5-2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { message } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          responses: {
            respondent: req.user.id,
            message,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    )
      .populate('responses.respondent', 'name email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      success: true,
      message: 'Response added successfully',
      ticket
    });
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({
      error: 'Failed to add response',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete ticket (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      success: true,
      message: 'Ticket deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({
      error: 'Failed to delete ticket',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
