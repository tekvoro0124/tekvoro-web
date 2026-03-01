const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'subscriber'],
    default: 'subscriber'
  },
  company: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  author: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  readTime: {
    type: Number,
    default: 5
  },
  coverImage: String,
  seoTitle: String,
  seoDescription: String,
  keywords: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  socialShares: {
    linkedin: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    facebook: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  keywords: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  pricing: {
    type: {
      type: String,
      enum: ['contact', 'package'],
      default: 'contact'
    },
    price: String,
    plans: [{
      name: String,
      price: String,
      features: [String]
    }]
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  icon: String,
  coverImage: String,
  seoTitle: String,
  seoDescription: String
}, {
  timestamps: true
});

// Case Study Schema
const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  challenge: String,
  solution: String,
  results: [{
    metric: String,
    value: String,
    description: String
  }],
  duration: String,
  technologies: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  logo: String,
  website: String,
  testimonial: {
    quote: String,
    author: String,
    position: String
  },
  seoTitle: String,
  seoDescription: String,
  keywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Contact Submission Schema (Enhanced for Lead Scoring)
const contactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true,
    enum: ['AI Marketplace Platform', 'AI Integration / Bot', 'Admin Dashboard', 'White-Label Platform', 'Mobile App', 'Other']
  },
  budget: {
    type: String,
    required: true,
    enum: ['Under ₹3L', '₹3L - ₹8L', '₹8L - ₹20L', '₹20L+', 'International ($10K+)']
  },
  timeline: {
    type: String,
    required: true,
    enum: ['ASAP (< 1 month)', '1-3 months', '3-6 months', 'Flexible']
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 2000
  },
  source: {
    type: String,
    required: true,
    enum: ['Google', 'LinkedIn', 'Clutch', 'Referral', 'Other']
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  leadScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  leadCategory: {
    type: String,
    required: true,
    enum: ['HOT', 'WARM', 'COLD', 'UNFIT']
  },
  leadPriority: {
    type: String,
    required: true,
    enum: ['HOT', 'WARM', 'COLD', 'UNFIT']
  },
  submittedAt: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['contact', 'demo', 'support', 'partnership', 'lead'],
    default: 'lead'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: function() {
      // Set priority based on lead priority
      switch (this.leadPriority) {
        case 'HOT': return 'urgent';
        case 'WARM': return 'high';
        case 'COLD': return 'medium';
        default: return 'low';
      }
    }
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'responded', 'resolved', 'closed'],
    default: function() {
      // Set initial status based on lead priority
      return this.leadPriority === 'HOT' ? 'urgent' : 'new';
    }
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ipAddress: String,
  userAgent: String,
  followUpSent: {
    type: Boolean,
    default: false
  },
  followUpCount: {
    type: Number,
    default: 0
  },
  lastFollowUpDate: Date,
  notes: [{
    content: String,
    author: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Email Subscription Schema
const emailSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  interests: [{
    type: String,
    trim: true
  }],
  plan: {
    type: String,
    enum: ['free', 'starter', 'professional', 'enterprise'],
    default: 'free'
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: Date,
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }],
  engagement: {
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    lastActivity: Date
  }
}, {
  timestamps: true
});

// Email Campaign Schema
const emailCampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  template: {
    type: String,
    enum: ['newsletter', 'announcement', 'product-update', 'case-study', 'welcome'],
    default: 'newsletter'
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled'],
    default: 'draft'
  },
  scheduledDate: Date,
  sentDate: Date,
  recipients: {
    type: Number,
    default: 0
  },
  targetAudience: {
    tags: [String],
    interests: [String],
    plans: [String]
  },
  performance: {
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 },
    unsubscribed: { type: Number, default: 0 },
    bounced: { type: Number, default: 0 },
    complained: { type: Number, default: 0 },
    openRate: { type: Number, default: 0 },
    clickRate: { type: Number, default: 0 },
    bounceRate: { type: Number, default: 0 }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  automation: {
    autoSend: { type: Boolean, default: false },
    trigger: String, // 'new-subscriber', 'blog-published', etc.
    delay: Number // minutes to wait before sending
  }
}, {
  timestamps: true
});

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['page-view', 'contact-form', 'subscription', 'demo-request', 'campaign-open', 'campaign-click'],
    required: true
  },
  path: String,
  userAgent: String,
  ipAddress: String,
  referrer: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: mongoose.Schema.Types.Mixed,
  sessionId: String
}, {
  timestamps: true
});

// Create indexes
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ published: 1, publishedAt: -1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ category: 1 });

serviceSchema.index({ slug: 1 });
serviceSchema.index({ published: 1 });
serviceSchema.index({ category: 1 });

caseStudySchema.index({ slug: 1 });
caseStudySchema.index({ published: 1 });
caseStudySchema.index({ industry: 1 });

contactSubmissionSchema.index({ status: 1, createdAt: -1 });
contactSubmissionSchema.index({ email: 1 });

emailSubscriptionSchema.index({ email: 1 });
emailSubscriptionSchema.index({ status: 1 });
emailSubscriptionSchema.index({ tags: 1 });

emailCampaignSchema.index({ status: 1, scheduledDate: 1 });

analyticsSchema.index({ date: -1, type: 1 });
analyticsSchema.index({ path: 1, date: -1 });

// Investor Schema
const investorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  investmentFocus: {
    type: String,
    required: true,
    trim: true
  },
  portfolio: [{
    type: String,
    trim: true
  }],
  social: {
    linkedin: String,
    twitter: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  testimonial: {
    quote: String,
    author: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Portfolio Project Schema
const portfolioProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  longDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['marketplace', 'platform', 'automation', 'mobile', 'web']
  },
  status: {
    type: String,
    required: true,
    enum: ['live', 'completed', 'in-development']
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  metrics: {
    users: String,
    transactions: String,
    revenue: String,
    performance: String
  },
  timeline: {
    type: String,
    required: true,
    trim: true
  },
  website: String,
  image: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  challenge: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  results: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  },
  seoTitle: String,
  seoDescription: String,
  keywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Create indexes
investorSchema.index({ featured: 1, order: 1 });
investorSchema.index({ status: 1 });
portfolioProjectSchema.index({ slug: 1 });
portfolioProjectSchema.index({ category: 1, featured: 1 });
portfolioProjectSchema.index({ status: 1 });

// Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['webinar', 'meetup', 'hackathon', 'workshop', 'conference'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  endDate: Date,
  time: String,
  duration: String,
  location: {
    isVirtual: { type: Boolean, default: true },
    address: String,
    city: String,
    meetingLink: String,
    platform: String
  },
  capacity: {
    type: Number,
    default: 100
  },
  registered: {
    type: Number,
    default: 0
  },
  speaker: {
    name: String,
    title: String,
    bio: String,
    avatar: String
  },
  agenda: [{
    time: String,
    title: String,
    description: String
  }],
  image: String,
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  registrations: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: String,
    name: String,
    registeredAt: { type: Date, default: Date.now }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

eventSchema.index({ eventType: 1, date: 1 });
eventSchema.index({ status: 1, date: 1 });

// Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  image: String,
  email: String,
  linkedin: String,
  twitter: String,
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    enum: ['leadership', 'engineering', 'design', 'marketing', 'sales', 'support'],
    default: 'leadership'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

teamMemberSchema.index({ featured: 1, order: 1 });
teamMemberSchema.index({ department: 1, status: 1 });

// Create models
const User = mongoose.model('User', userSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Service = mongoose.model('Service', serviceSchema);
const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);
const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
const EmailSubscription = mongoose.model('EmailSubscription', emailSubscriptionSchema);
const EmailCampaign = mongoose.model('EmailCampaign', emailCampaignSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);
const Investor = mongoose.model('Investor', investorSchema);
const PortfolioProject = mongoose.model('PortfolioProject', portfolioProjectSchema);
const Event = mongoose.model('Event', eventSchema);
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = {
  User,
  BlogPost,
  Service,
  CaseStudy,
  ContactSubmission,
  EmailSubscription,
  EmailCampaign,
  Analytics,
  Investor,
  PortfolioProject,
  Event,
  TeamMember
};
