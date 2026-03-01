const axios = require('axios');

class TekvoroChatbotService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.openaiBaseUrl = 'https://api.openai.com/v1';
    
    // Tekvoro company knowledge base
    this.companyKnowledge = {
      services: {
        'ai-solutions': {
          name: 'AI Solutions',
          description: 'Custom AI development, machine learning models, predictive analytics, NLP, and computer vision',
          features: ['Custom AI Development', 'Integrated AI Platforms', 'Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'AI Automation'],
          pricing: 'Custom quotes based on project scope'
        },
        'web-development': {
          name: 'Web Development',
          description: 'Full-stack web applications, responsive design, e-commerce, and enterprise portals',
          features: ['React/Angular/Vue', 'Node.js Backend', 'E-commerce Solutions', 'Enterprise Portals', 'Progressive Web Apps'],
          pricing: 'Starting from $15,000 for small projects'
        },
        'mobile-apps': {
          name: 'Mobile Applications',
          description: 'iOS, Android, and cross-platform mobile app development',
          features: ['Native iOS/Android', 'React Native', 'Flutter', 'App Store Optimization'],
          pricing: 'Starting from $25,000'
        },
        'cloud-services': {
          name: 'Cloud Solutions',
          description: 'AWS, Azure, GCP cloud architecture, migration, and DevOps',
          features: ['Cloud Migration', 'Architecture Design', 'DevOps & CI/CD', 'Kubernetes', 'Serverless'],
          pricing: 'Based on cloud requirements'
        },
        'healthcare': {
          name: 'Healthcare Technology',
          description: 'Telemedicine platforms, healthcare AI, medical device integration, HIPAA compliance',
          features: ['Telemedicine', 'Healthcare AI', 'Medical Devices Integration', 'HIPAA Compliance', 'EHR Systems'],
          pricing: 'Enterprise pricing, contact for quote'
        },
        'automation': {
          name: 'Enterprise Automation',
          description: 'Business process automation, RPA, workflow optimization',
          features: ['RPA Implementation', 'Workflow Automation', 'Process Mining', 'Intelligent Document Processing'],
          pricing: 'Custom quotes available'
        }
      },
      company: {
        name: 'Tekvoro Technologies',
        tagline: 'Engineering the Future',
        founded: '2020',
        headquarters: 'San Francisco, CA',
        team: '100+ engineers globally',
        clients: '60+ enterprise clients',
        industries: ['Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Technology']
      },
      contact: {
        email: 'info@tekvoro.com',
        support: 'support@tekvoro.com',
        sales: 'sales@tekvoro.com',
        phone: '+1 (555) 123-4567',
        demoUrl: '/book-demo',
        contactUrl: '/contact'
      }
    };
    
    this.systemPrompt = `You are Tekvoro's AI Assistant - a helpful, professional, and friendly chatbot for Tekvoro Technologies.

ABOUT TEKVORO:
${JSON.stringify(this.companyKnowledge, null, 2)}

YOUR RESPONSIBILITIES:
1. Answer questions about Tekvoro services, capabilities, and expertise
2. Help users find the right service for their needs
3. Collect contact information for service requests
4. Schedule demo requests
5. Provide support and guidance
6. Route complex inquiries to appropriate teams

RESPONSE GUIDELINES:
- Be concise but helpful (2-4 sentences typically)
- Use a professional yet friendly tone
- If user wants to book a demo, ask for: name, email, company, and which service interests them
- If user needs pricing, explain we provide custom quotes and offer to connect them with sales
- If user has technical issues, offer to create a support ticket
- Always offer next steps or actions

INTENT DETECTION:
Identify user intent from these categories:
- SERVICE_INQUIRY: Questions about what we offer
- PRICING_REQUEST: Questions about costs
- DEMO_REQUEST: Wants to schedule a demo
- SUPPORT_REQUEST: Needs technical help
- CONTACT_REQUEST: Wants to speak to someone
- GENERAL_QUESTION: Other questions
- GREETING: Hello, hi, etc.

Include suggested actions in your response when appropriate.`;
  }

  /**
   * Process a chat message and generate response
   */
  async processMessage(userMessage, conversationHistory = []) {
    try {
      // Detect intent
      const intent = this.detectIntent(userMessage);
      
      // Build messages for OpenAI
      const messages = [
        { role: 'system', content: this.systemPrompt },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await axios.post(
        `${this.openaiBaseUrl}/chat/completions`,
        {
          model: 'gpt-4-turbo',
          messages,
          max_tokens: 500,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      let aiResponse;
      try {
        aiResponse = JSON.parse(response.data.choices[0].message.content);
      } catch {
        aiResponse = {
          message: response.data.choices[0].message.content,
          intent: intent,
          suggestedActions: []
        };
      }

      return {
        message: aiResponse.message || aiResponse.response || response.data.choices[0].message.content,
        intent: aiResponse.intent || intent,
        suggestedActions: aiResponse.suggestedActions || this.getSuggestedActions(intent),
        collectInfo: aiResponse.collectInfo || null
      };
    } catch (error) {
      console.error('[TekvoroChatbotService] Error:', error.message);
      
      // Fallback response based on intent
      return this.getFallbackResponse(userMessage);
    }
  }

  /**
   * Detect user intent from message
   */
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    if (/^(hi|hello|hey|good morning|good afternoon)/.test(lowerMessage)) {
      return 'GREETING';
    }
    if (/demo|schedule|book|meeting|call/.test(lowerMessage)) {
      return 'DEMO_REQUEST';
    }
    if (/price|cost|pricing|quote|budget|how much|rate/.test(lowerMessage)) {
      return 'PRICING_REQUEST';
    }
    if (/help|support|issue|problem|bug|error|not working/.test(lowerMessage)) {
      return 'SUPPORT_REQUEST';
    }
    if (/contact|speak|talk|email|phone|call me/.test(lowerMessage)) {
      return 'CONTACT_REQUEST';
    }
    if (/service|offer|provide|do you|can you|what|how|ai|web|mobile|cloud|healthcare|automation/.test(lowerMessage)) {
      return 'SERVICE_INQUIRY';
    }
    
    return 'GENERAL_QUESTION';
  }

  /**
   * Get suggested actions based on intent
   */
  getSuggestedActions(intent) {
    const actions = {
      GREETING: [
        { label: 'Explore Services', action: 'services' },
        { label: 'Book a Demo', action: 'demo' },
        { label: 'Get Support', action: 'support' }
      ],
      SERVICE_INQUIRY: [
        { label: 'View All Services', action: 'services' },
        { label: 'Get a Quote', action: 'quote' },
        { label: 'Book a Demo', action: 'demo' }
      ],
      PRICING_REQUEST: [
        { label: 'Request Quote', action: 'quote' },
        { label: 'Talk to Sales', action: 'sales' },
        { label: 'Book a Demo', action: 'demo' }
      ],
      DEMO_REQUEST: [
        { label: 'Schedule Now', action: 'demo' },
        { label: 'Call Me Back', action: 'callback' }
      ],
      SUPPORT_REQUEST: [
        { label: 'Create Ticket', action: 'support' },
        { label: 'View FAQ', action: 'faq' },
        { label: 'Live Chat', action: 'livechat' }
      ],
      CONTACT_REQUEST: [
        { label: 'Email Us', action: 'email' },
        { label: 'Call Us', action: 'phone' },
        { label: 'Book a Meeting', action: 'demo' }
      ],
      GENERAL_QUESTION: [
        { label: 'Learn More', action: 'about' },
        { label: 'Our Services', action: 'services' },
        { label: 'Contact Us', action: 'contact' }
      ]
    };
    
    return actions[intent] || actions.GENERAL_QUESTION;
  }

  /**
   * Get fallback response when AI fails
   */
  getFallbackResponse(message) {
    const intent = this.detectIntent(message);
    
    const responses = {
      GREETING: {
        message: "Hello! I'm Tekvoro's AI Assistant. I can help you learn about our services, book a demo, or connect you with our team. What would you like to know?",
        intent: 'GREETING'
      },
      SERVICE_INQUIRY: {
        message: "Tekvoro offers AI Solutions, Web Development, Mobile Apps, Cloud Services, Healthcare Technology, and Enterprise Automation. Which area interests you most?",
        intent: 'SERVICE_INQUIRY'
      },
      PRICING_REQUEST: {
        message: "We provide custom pricing based on your specific needs. I'd be happy to connect you with our sales team for a detailed quote. Would you like me to arrange that?",
        intent: 'PRICING_REQUEST'
      },
      DEMO_REQUEST: {
        message: "Great! I'd love to help you schedule a demo. Please share your name, email, company name, and which service you're interested in.",
        intent: 'DEMO_REQUEST',
        collectInfo: ['name', 'email', 'company', 'service']
      },
      SUPPORT_REQUEST: {
        message: "I'm here to help! Please describe your issue and I'll either assist you directly or create a support ticket for our technical team.",
        intent: 'SUPPORT_REQUEST'
      },
      CONTACT_REQUEST: {
        message: "You can reach us at info@tekvoro.com or +1 (555) 123-4567. Would you prefer I schedule a callback or send you more information?",
        intent: 'CONTACT_REQUEST'
      },
      GENERAL_QUESTION: {
        message: "I'd be happy to help! Tekvoro Technologies specializes in AI solutions, custom software development, and digital transformation. What specific information can I provide?",
        intent: 'GENERAL_QUESTION'
      }
    };
    
    const response = responses[intent] || responses.GENERAL_QUESTION;
    return {
      ...response,
      suggestedActions: this.getSuggestedActions(intent)
    };
  }

  /**
   * Submit a service request (demo, quote, support)
   */
  async submitServiceRequest(type, data) {
    // This would integrate with your existing contact/demo APIs
    const request = {
      type,
      ...data,
      source: 'chatbot',
      timestamp: new Date().toISOString()
    };
    
    // Store in database or forward to appropriate service
    console.log('[TekvoroChatbotService] Service request:', request);
    
    return {
      success: true,
      message: `Your ${type} request has been submitted! Our team will contact you within 24 hours.`,
      requestId: `REQ-${Date.now()}`
    };
  }
}

module.exports = TekvoroChatbotService;
