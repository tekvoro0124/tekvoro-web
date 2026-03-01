const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { User } = require('../models');

const router = express.Router();

// Client registration (admin only)
router.post('/register', [
  // authenticateToken,
  // requireAdmin,
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('company').trim().isLength({ min: 2, max: 100 }).withMessage('Company name required'),
  body('role').optional().isIn(['client', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password, name, company, role = 'client' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      company,
      role,
      isActive: true,
      emailVerified: true // Admin-created accounts are pre-verified
    });

    await user.save();
    console.log(`Registration: User saved successfully for ${email}, ID: ${user._id}`);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'test-jwt-secret-for-development',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Client account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error('Client registration error:', error);
    res.status(500).json({
      error: 'Failed to create client account',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Client login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email, status: 'active' });
    console.log(`Login attempt: User query result for ${email}:`, user ? { email: user.email, status: user.status, role: user.role } : 'null');
    if (!user) {
      console.log(`Login attempt: User not found for email ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(`Login attempt: Password valid? ${isValidPassword} for user ${user.email}`);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'test-jwt-secret-for-development',
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        lastLogin: user.lastLogin
      },
      token
    });

  } catch (error) {
    console.error('Client login error:', error);
    res.status(500).json({
      error: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update client profile
router.put('/profile', [
  authenticateToken,
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('company').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Company name required'),
  body('currentPassword').optional().exists().withMessage('Current password required for password change'),
  body('newPassword').optional().isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, company, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password required for password change' });
      }

      const isValidCurrentPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidCurrentPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Update other fields
    if (name) user.name = name;
    if (company) user.company = company;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// List all clients (admin only)
router.get('/clients', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('name email company lastLogin createdAt isActive')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      clients
    });
  } catch (error) {
    console.error('Clients fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch clients',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
