const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
  // Core Content
  title: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: null
  },
  
  // Metadata
  source: {
    name: String,
    type: {
      type: String,
      enum: ['rss-feed', 'web-scrape', 'api'],
      default: 'rss-feed'
    },
    feedUrl: String,
    logo: String
  },
  author: String,
  publishedDate: {
    type: Date,
    required: true,
    index: true
  },
  ingestedDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  
  // Categorization
  category: {
    type: String,
    enum: [
      'technology',
      'business',
      'finance',
      'startup',
      'security',
      'policy',
      'market-analysis',
      'enterprise',
      'cloud',
      'ai-ml',
      'sustainability',
      'other'
    ],
    default: 'other',
    index: true
  },
  tags: [
    {
      type: String,
      lowercase: true
    }
  ],
  
  // Trust & Credibility Scoring
  trustScore: {
    overall: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    sourceReputation: Number,      // 0-100 (30% weight)
    contentQuality: Number,         // 0-100 (20% weight)
    authorExpertise: Number,        // 0-100 (15% weight)
    recency: Number,                // 0-100 (15% weight)
    consensus: Number,              // 0-100 (10% weight)
    citation_references: Number     // 0-100 (10% weight)
  },
  
  // AI Processing
  aiAnalysis: {
    credibilityEvaluation: {
      quality: { type: Number, default: 50 },
      authorExpertise: { type: Number, default: 50 },
      citations: { type: Number, default: 50 },
      warnings: { type: [String], default: [] }
    },
    keyInsights: [String],
    riskFactors: [String],
    opportunities: [String],
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral'
    }
  },
  
  // Semantic Search
  embedding: {
    type: [Number],
    default: null,
    index: false
  },
  relevantCompanies: [String],
  relevantIndustries: [String],
  
  // Engagement
  views: {
    type: Number,
    default: 0
  },
  saves: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  duplicateOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewsArticle',
    default: null
  }
}, { 
  timestamps: true 
});

// Indexes for optimal query performance
newsArticleSchema.index({ title: 'text', content: 'text', tags: 'text' });
newsArticleSchema.index({ publishedDate: -1, trustScore: -1 });
newsArticleSchema.index({ category: 1, isActive: 1 });
newsArticleSchema.index({ source: 1, ingestedDate: -1 });
newsArticleSchema.index({ trustScore: -1, isActive: 1 });
newsArticleSchema.index({ relevantCompanies: 1 });
newsArticleSchema.index({ relevantIndustries: 1 });

// Virtual for formatted date
newsArticleSchema.virtual('formattedDate').get(function() {
  return this.publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});

// Methods
newsArticleSchema.methods.updateTrustScore = function(scores) {
  const weights = {
    sourceReputation: 0.30,
    contentQuality: 0.20,
    authorExpertise: 0.15,
    recency: 0.15,
    consensus: 0.10,
    citation_references: 0.10
  };
  
  this.trustScore = {
    ...scores,
    overall: Math.round(
      (scores.sourceReputation || 0) * weights.sourceReputation +
      (scores.contentQuality || 0) * weights.contentQuality +
      (scores.authorExpertise || 0) * weights.authorExpertise +
      (scores.recency || 0) * weights.recency +
      (scores.consensus || 0) * weights.consensus +
      (scores.citation_references || 0) * weights.citation_references
    )
  };
};

module.exports = mongoose.model('NewsArticle', newsArticleSchema);
