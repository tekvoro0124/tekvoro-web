const express = require('express');
const router = express.Router();
const TekvoroChatbotService = require('../services/TekvoroChatbotService');
const ContactSubmission = require('../models').ContactSubmission;

// Initialize chatbot service
const chatbot = new TekvoroChatbotService();

// Store conversation sessions (in production, use Redis/MongoDB)
const sessions = new Map();

/**
 * POST /api/chat/message
 * Process a chat message and return AI response
 */
router.post('/message', async (req, res) => {
  try {
    const { message, sessionId, userData } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get or create session
    const sid = sessionId || `session_${Date.now()}`;
    let session = sessions.get(sid) || {
      id: sid,
      history: [],
      userData: userData || {},
      createdAt: new Date()
    };
    
    // Add user message to history
    session.history.push({
      type: 'user',
      content: message,
      timestamp: new Date()
    });
    
    // Process message with AI
    const response = await chatbot.processMessage(message, session.history);
    
    // Add assistant response to history
    session.history.push({
      type: 'assistant',
      content: response.message,
      timestamp: new Date()
    });
    
    // Update session
    sessions.set(sid, session);
    
    // Clean up old sessions (older than 24 hours)
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    for (const [key, value] of sessions.entries()) {
      if (new Date(value.createdAt).getTime() < dayAgo) {
        sessions.delete(key);
      }
    }
    
    res.json({
      status: 'success',
      data: {
        message: response.message,
        intent: response.intent,
        suggestedActions: response.suggestedActions,
        collectInfo: response.collectInfo,
        sessionId: sid
      }
    });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      fallback: "I'm having trouble connecting right now. Please try again or contact us at info@tekvoro.com"
    });
  }
});

/**
 * POST /api/chat/submit-request
 * Submit a service request (demo, quote, support) from chatbot
 */
router.post('/submit-request', async (req, res) => {
  try {
    const { type, name, email, company, phone, service, message, sessionId } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Create contact submission
    const submission = new ContactSubmission({
      name,
      email,
      company: company || '',
      phone: phone || '',
      subject: `Chatbot ${type} Request - ${service || 'General'}`,
      message: message || `${type} request via chatbot for ${service || 'Tekvoro services'}`,
      type: type === 'demo' ? 'demo' : type === 'support' ? 'support' : 'inquiry',
      source: 'chatbot',
      metadata: {
        sessionId,
        requestType: type,
        service,
        timestamp: new Date()
      },
      status: 'new'
    });
    
    await submission.save();
    
    // Get response message
    const messages = {
      demo: `Great! Your demo request has been submitted. Our team will contact you at ${email} within 24 hours to schedule your personalized demo.`,
      quote: `Thank you! Your quote request has been received. A sales representative will reach out to ${email} with a custom proposal within 1-2 business days.`,
      support: `Your support ticket has been created. Our support team will respond to ${email} shortly. For urgent issues, call us at +1 (555) 123-4567.`,
      callback: `We've noted your callback request. A team member will call you within 2 hours during business hours (9 AM - 6 PM EST).`,
      default: `Thank you for reaching out! We've received your request and will respond to ${email} soon.`
    };
    
    res.json({
      status: 'success',
      data: {
        message: messages[type] || messages.default,
        requestId: submission._id.toString(),
        nextSteps: type === 'demo' 
          ? 'Meanwhile, feel free to explore our case studies and portfolio!'
          : 'Is there anything else I can help you with?'
      }
    });
  } catch (error) {
    console.error('[Chat API] Submit request error:', error);
    res.status(500).json({ 
      error: 'Failed to submit request',
      fallback: 'Please try again or email us directly at info@tekvoro.com'
    });
  }
});

/**
 * GET /api/chat/services
 * Get list of services for chatbot quick selection
 */
router.get('/services', async (req, res) => {
  res.json({
    status: 'success',
    data: {
      services: [
        { id: 'ai-solutions', name: 'AI Solutions', description: 'Custom AI & Machine Learning' },
        { id: 'web-development', name: 'Web Development', description: 'Full-stack web applications' },
        { id: 'mobile-apps', name: 'Mobile Apps', description: 'iOS & Android development' },
        { id: 'cloud-services', name: 'Cloud Solutions', description: 'AWS, Azure, GCP services' },
        { id: 'healthcare', name: 'Healthcare Tech', description: 'Medical & telemedicine solutions' },
        { id: 'automation', name: 'Enterprise Automation', description: 'RPA & workflow automation' }
      ]
    }
  });
});

/**
 * POST /api/chat/feedback
 * Submit feedback about chatbot response
 */
router.post('/feedback', async (req, res) => {
  try {
    const { sessionId, messageId, rating, comment } = req.body;
    
    // Log feedback (in production, store in database)
    console.log('[Chat Feedback]', { sessionId, messageId, rating, comment });
    
    res.json({
      status: 'success',
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;
