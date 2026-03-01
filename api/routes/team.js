const express = require('express');
const { body, validationResult } = require('express-validator');
const { TeamMember } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all team members (public)
router.get('/', async (req, res) => {
  try {
    const { department, featured } = req.query;
    const filter = { status: 'active' };
    
    if (department) filter.department = department;
    if (featured === 'true') filter.featured = true;

    const members = await TeamMember.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: members.length,
      members
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

// Create team member (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('role').trim().isLength({ min: 2, max: 100 }).withMessage('Role must be 2-100 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { name, role, bio, image, email, linkedin, twitter, featured, order, department } = req.body;

    const member = new TeamMember({
      name,
      role,
      bio,
      image,
      email,
      linkedin,
      twitter,
      featured: featured || false,
      order: order || 0,
      department: department || 'leadership'
    });

    await member.save();

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      member
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Update team member (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json({
      success: true,
      message: 'Team member updated successfully',
      member
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Delete team member (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

module.exports = router;
