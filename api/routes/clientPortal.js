const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { ContactSubmission } = require('../models');

const router = express.Router();

// Get client's projects (based on their contact submissions that became projects)
router.get('/projects', authenticateToken, async (req, res) => {
  try {
    // For now, we'll simulate projects based on contact submissions
    // In a real implementation, you'd have a separate Project model
    const submissions = await ContactSubmission.find({
      email: req.user.email,
      leadPriority: { $in: ['HOT', 'WARM'] }
    })
    .select('name email company projectType budget timeline description leadScore leadCategory submittedAt status')
    .sort({ submittedAt: -1 });

    // Transform submissions into project format
    const projects = submissions.map(submission => ({
      id: submission._id,
      name: `${submission.projectType} - ${submission.company}`,
      description: submission.description,
      status: submission.status === 'urgent' ? 'active' : 'pending',
      startDate: submission.submittedAt,
      estimatedCompletion: calculateEstimatedCompletion(submission.timeline, submission.submittedAt),
      budget: submission.budget,
      priority: submission.leadPriority,
      milestones: generateMilestones(submission.projectType, submission.timeline),
      progress: calculateProgress(submission.status, submission.submittedAt)
    }));

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch projects',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get specific project details
router.get('/projects/:projectId', authenticateToken, async (req, res) => {
  try {
    const submission = await ContactSubmission.findOne({
      _id: req.params.projectId,
      email: req.user.email
    });

    if (!submission) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = {
      id: submission._id,
      name: `${submission.projectType} - ${submission.company}`,
      description: submission.description,
      status: submission.status === 'urgent' ? 'active' : 'pending',
      startDate: submission.submittedAt,
      estimatedCompletion: calculateEstimatedCompletion(submission.timeline, submission.submittedAt),
      budget: submission.budget,
      priority: submission.leadPriority,
      milestones: generateMilestones(submission.projectType, submission.timeline),
      progress: calculateProgress(submission.status, submission.submittedAt),
      contactInfo: {
        projectManager: 'Assigned PM will be notified',
        email: 'project@tekvoro.com',
        phone: '+91 9121331813'
      },
      files: [], // Would be populated from file storage
      invoices: [] // Would be populated from invoice system
    };

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch project',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get client's dashboard stats
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find({
      email: req.user.email
    });

    const stats = {
      totalProjects: submissions.length,
      activeProjects: submissions.filter(s => s.status === 'urgent' || s.status === 'in-progress').length,
      completedProjects: submissions.filter(s => s.status === 'resolved').length,
      totalInvested: calculateTotalInvested(submissions),
      nextMilestone: getNextMilestone(submissions),
      recentActivity: getRecentActivity(submissions)
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Raise a support ticket
router.post('/support', authenticateToken, async (req, res) => {
  try {
    const { subject, message, projectId, priority = 'medium' } = req.body;

    // In a real implementation, you'd create a support ticket
    // For now, we'll create a contact submission marked as support
    const ticket = new ContactSubmission({
      name: req.user.name,
      email: req.user.email,
      company: req.user.company,
      subject,
      message,
      type: 'support',
      priority,
      source: 'client-portal',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'new'
    });

    await ticket.save();

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      ticketId: ticket._id
    });
  } catch (error) {
    console.error('Support ticket creation error:', error);
    res.status(500).json({
      error: 'Failed to create support ticket',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helper functions
function calculateEstimatedCompletion(timeline, startDate) {
  const start = new Date(startDate);
  let months = 3; // default

  switch (timeline) {
    case 'ASAP (< 1 month)': months = 1; break;
    case '1-3 months': months = 2; break;
    case '3-6 months': months = 4; break;
    case 'Flexible': months = 6; break;
  }

  start.setMonth(start.getMonth() + months);
  return start;
}

function generateMilestones(projectType, timeline) {
  const baseMilestones = [
    { name: 'Project Kickoff', status: 'completed', dueDate: new Date() },
    { name: 'Requirements Gathering', status: 'in-progress', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { name: 'Design & Planning', status: 'pending', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
    { name: 'Development', status: 'pending', dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    { name: 'Testing & QA', status: 'pending', dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) },
    { name: 'Launch', status: 'pending', dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) }
  ];

  return baseMilestones;
}

function calculateProgress(status, startDate) {
  const daysSinceStart = Math.floor((Date.now() - new Date(startDate)) / (1000 * 60 * 60 * 24));

  switch (status) {
    case 'urgent': return Math.min(daysSinceStart * 2, 80); // Active projects
    case 'in-progress': return Math.min(daysSinceStart * 1.5, 60);
    case 'responded': return 20;
    case 'resolved': return 100;
    default: return 10;
  }
}

function calculateTotalInvested(submissions) {
  // This would integrate with actual invoice/payment system
  return submissions.reduce((total, sub) => {
    switch (sub.budget) {
      case '₹20L+': return total + 2000000;
      case '₹8L - ₹20L': return total + 1400000;
      case '₹3L - ₹8L': return total + 550000;
      case 'Under ₹3L': return total + 150000;
      default: return total + 500000;
    }
  }, 0);
}

function getNextMilestone(submissions) {
  const activeSubmissions = submissions.filter(s => s.status !== 'resolved');
  if (activeSubmissions.length === 0) return null;

  // Return next milestone from most recent active project
  const recent = activeSubmissions[0];
  const milestones = generateMilestones(recent.projectType, recent.timeline);
  const nextMilestone = milestones.find(m => m.status === 'pending');

  return nextMilestone ? {
    name: nextMilestone.name,
    dueDate: nextMilestone.dueDate,
    project: `${recent.projectType} - ${recent.company}`
  } : null;
}

function getRecentActivity(submissions) {
  return submissions.slice(0, 5).map(sub => ({
    type: 'project_update',
    message: `New ${sub.projectType} project inquiry submitted`,
    date: sub.submittedAt,
    project: `${sub.projectType} - ${sub.company}`
  }));
}

module.exports = router;
