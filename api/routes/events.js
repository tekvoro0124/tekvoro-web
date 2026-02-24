const express = require('express');
const { body, validationResult } = require('express-validator');
const { Event } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Create a new event (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('description').trim().isLength({ min: 20, max: 5000 }).withMessage('Description must be 20-5000 characters'),
  body('eventType').isIn(['webinar', 'meetup', 'hackathon', 'workshop', 'conference']).withMessage('Invalid event type'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('location.isVirtual').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      title,
      description,
      eventType,
      date,
      endDate,
      time,
      duration,
      location,
      capacity,
      speaker,
      agenda,
      image,
      tags = []
    } = req.body;

    const event = new Event({
      title,
      description,
      eventType,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : null,
      time,
      duration,
      location,
      capacity,
      speaker,
      agenda,
      image,
      tags,
      status: 'draft',
      createdBy: req.user.id
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      error: 'Failed to create event',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const { eventType, status = 'published', upcoming = false } = req.query;
    const filter = {};

    if (eventType) filter.eventType = eventType;
    if (status) filter.status = status;

    let query = Event.find(filter);

    if (upcoming === 'true') {
      filter.date = { $gte: new Date() };
      query = Event.find(filter);
    }

    const events = await query
      .populate('createdBy', 'name email')
      .sort({ date: -1 })
      .limit(100);

    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      error: 'Failed to fetch events',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      error: 'Failed to fetch event',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update event (admin only)
router.patch('/:id', authenticateToken, requireAdmin, [
  body('title').optional().trim().isLength({ min: 5, max: 200 }),
  body('description').optional().trim().isLength({ min: 20, max: 5000 }),
  body('eventType').optional().isIn(['webinar', 'meetup', 'hackathon', 'workshop', 'conference']),
  body('status').optional().isIn(['draft', 'published', 'ongoing', 'completed', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      title,
      description,
      eventType,
      date,
      endDate,
      time,
      duration,
      location,
      capacity,
      speaker,
      agenda,
      materials,
      image,
      status,
      tags
    } = req.body;

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (eventType) updateData.eventType = eventType;
    if (date) updateData.date = new Date(date);
    if (endDate) updateData.endDate = new Date(endDate);
    if (time) updateData.time = time;
    if (duration) updateData.duration = duration;
    if (location) updateData.location = location;
    if (capacity) updateData.capacity = capacity;
    if (speaker) updateData.speaker = speaker;
    if (agenda) updateData.agenda = agenda;
    if (materials) updateData.materials = materials;
    if (image) updateData.image = image;
    if (status) updateData.status = status;
    if (tags) updateData.tags = tags;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      error: 'Failed to update event',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Register for event
router.post('/:id/register', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name required'),
  body('company').optional().trim().isLength({ min: 0, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, name, company } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if already registered
    const alreadyRegistered = event.registrations.some(r => r.email === email);
    if (alreadyRegistered) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Check capacity
    if (event.capacity && event.registered >= event.capacity) {
      return res.status(400).json({ error: 'Event is at full capacity' });
    }

    event.registrations.push({
      email,
      name,
      company,
      registeredAt: new Date()
    });
    event.registered = event.registrations.length;

    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for event',
      event
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({
      error: 'Failed to register for event',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete event (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      error: 'Failed to delete event',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
