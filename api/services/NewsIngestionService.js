const axios = require('axios');
const Parser = require('rss-parser');
const cheerio = require('cheerio');
const NewsArticle = require('../models/NewsArticle');
const AIProcessingService = require('./AIProcessingService');

class NewsIngestionService {
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'mediaContent'],
          ['media:thumbnail', 'mediaThumbnail'],
          ['enclosure', 'enclosure']
        ]
      }
    });
    
    // RSS feeds for corporate and industry news
    this.feedSources = [
      {
        name: 'Economic Times',
        url: 'https://economictimes.indiatimes.com/feed.cms',
        logo: 'https://economictimes.indiatimes.com/logo.png',
        type: 'rss-feed'
      },
      {
        name: 'Business Standard',
        url: 'https://www.business-standard.com/rss',
        logo: 'https://www.business-standard.com/logo.png',
        type: 'rss-feed'
      },
      {
        name: 'TechCrunch',
        url: 'http://feeds.techcrunch.com/TechCrunch/',
        logo: 'https://techcrunch.com/logo.png',
        type: 'rss-feed'
      },
      {
        name: 'YourStory',
        url: 'https://yourstory.com/feed',
        logo: 'https://yourstory.com/logo.png',
        type: 'rss-feed'
      },
      {
        name: 'Inc42',
        url: 'https://inc42.com/feed/',
        logo: 'https://inc42.com/logo.png',
        type: 'rss-feed'
      },
      {
        name: 'HackerNews',
        url: 'https://news.ycombinator.com/rss',
        logo: 'https://news.ycombinator.com/logo.png',
        type: 'rss-feed'
      }
    ];
  }

  /**
   * Fetch articles from all RSS feeds
   */
  async fetchFromAllFeeds() {
    console.log('[NewsIngestion] Starting feed fetch...');
    const results = [];
    
    for (const source of this.feedSources) {
      try {
        const articles = await this.fetchFromFeed(source);
        results.push({
          source: source.name,
          count: articles.length,
          articles
        });
        console.log(`[NewsIngestion] Fetched ${articles.length} articles from ${source.name}`);
      } catch (error) {
        console.error(`[NewsIngestion] Error fetching from ${source.name}:`, error.message);
      }
    }
    
    return results;
  }

  /**
   * Fetch articles from a specific RSS feed
   */
  async fetchFromFeed(source) {
    try {
      const feed = await this.parser.parseURL(source.url);
      const articles = [];
      
      for (const item of feed.items || []) {
        const article = {
          title: item.title || 'Untitled',
          url: item.link,
          content: this.extractContent(item.content || item.description || ''),
          author: item.creator || item.author,
          publishedDate: new Date(item.pubDate || item.isoDate || Date.now()),
          source: {
            name: source.name,
            type: 'rss-feed',
            feedUrl: source.url,
            logo: source.logo
          },
          tags: this.extractTags(item.title, item.categories),
          category: this.categorizeArticle(item.title, item.content || ''),
          relevantCompanies: this.extractCompanies(item.title, item.content || ''),
          relevantIndustries: this.extractIndustries(item.title, item.categories)
        };
        
        articles.push(article);
      }
      
      return articles;
    } catch (error) {
      console.error(`Error fetching feed ${source.url}:`, error.message);
      throw error;
    }
  }

  /**
   * Fetch articles from a URL via web scraping
   */
  async fetchFromWebScrape(url, selector) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      
      const $ = cheerio.load(response.data);
      const articles = [];
      
      $(selector).each((index, element) => {
        const titleElem = $(element).find('h2, h3, a').first();
        const descElem = $(element).find('p').first();
        const dateElem = $(element).find('[datetime], .date, .time').first();
        
        if (titleElem.text()) {
          const article = {
            title: titleElem.text().trim(),
            url: titleElem.attr('href') || url,
            content: descElem.text() || '',
            publishedDate: this.parseDate(dateElem.text() || new Date().toISOString()),
            source: {
              name: 'Web Scrape',
              type: 'web-scrape',
              feedUrl: url
            }
          };
          
          articles.push(article);
        }
      });
      
      return articles;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
      throw error;
    }
  }

  /**
   * Process and store article in MongoDB
   */
  async processAndStoreArticle(articleData) {
    try {
      // Check if article already exists
      const existingArticle = await NewsArticle.findOne({ url: articleData.url });
      
      if (existingArticle) {
        console.log(`[NewsIngestion] Article already exists: ${articleData.title}`);
        return existingArticle;
      }
      
      // Generate AI summary and credibility evaluation
      const aiProcessing = new AIProcessingService();
      const aiAnalysis = await aiProcessing.processArticle(articleData.title, articleData.content);
      
      // Calculate initial trust score
      const trustScore = await this.calculateTrustScore(
        articleData.source.name,
        aiAnalysis.credibilityEvaluation,
        articleData.publishedDate
      );
      
      // Generate semantic embedding
      const embedding = await aiProcessing.generateEmbedding(
        `${articleData.title} ${articleData.content.substring(0, 500)}`
      );
      
      // Create article document
      const article = new NewsArticle({
        ...articleData,
        summary: aiAnalysis.summary,
        aiAnalysis: {
          credibilityEvaluation: aiAnalysis.credibilityEvaluation,
          keyInsights: aiAnalysis.keyInsights,
          riskFactors: aiAnalysis.riskFactors,
          opportunities: aiAnalysis.opportunities,
          sentiment: aiAnalysis.sentiment
        },
        trustScore,
        embedding
      });
      
      await article.save();
      console.log(`[NewsIngestion] Stored article: ${article.title}`);
      
      return article;
    } catch (error) {
      console.error(`Error processing article:`, error.message);
      throw error;
    }
  }

  /**
   * Batch process multiple articles
   */
  async processAndStoreBatch(articles) {
    const results = [];
    
    for (const article of articles) {
      try {
        const stored = await this.processAndStoreArticle(article);
        results.push({
          success: true,
          article: stored._id,
          title: stored.title
        });
      } catch (error) {
        results.push({
          success: false,
          title: article.title,
          error: error.message
        });
      }
    }
    
    return results;
  }

  /**
   * Calculate trust score based on multiple factors
   */
  async calculateTrustScore(sourceName, credibilityEvaluation, publishedDate) {
    // Source reputation mapping (0-100)
    const sourceReputation = this.getSourceReputation(sourceName);
    
    // Content quality from AI (0-100)
    const contentQuality = credibilityEvaluation?.quality || 50;
    
    // Author expertise (if available, 0-100)
    const authorExpertise = credibilityEvaluation?.authorExpertise || 50;
    
    // Recency score (newer = higher, within 30 days)
    const daysSincePublish = Math.floor((Date.now() - new Date(publishedDate)) / (1000 * 60 * 60 * 24));
    const recency = Math.max(0, 100 - (daysSincePublish * 3)); // Decays over time
    
    // Consensus & citation references (placeholder - would integrate with external APIs)
    const consensus = 50;
    const citation_references = credibilityEvaluation?.citations || 50;
    
    const scores = {
      sourceReputation,
      contentQuality,
      authorExpertise,
      recency,
      consensus,
      citation_references
    };
    
    // Calculate weighted overall score
    const weights = {
      sourceReputation: 0.30,
      contentQuality: 0.20,
      authorExpertise: 0.15,
      recency: 0.15,
      consensus: 0.10,
      citation_references: 0.10
    };
    
    const overall = Math.round(
      scores.sourceReputation * weights.sourceReputation +
      scores.contentQuality * weights.contentQuality +
      scores.authorExpertise * weights.authorExpertise +
      scores.recency * weights.recency +
      scores.consensus * weights.consensus +
      scores.citation_references * weights.citation_references
    );
    
    return {
      ...scores,
      overall
    };
  }

  /**
   * Get source reputation score
   */
  getSourceReputation(sourceName) {
    const reputationMap = {
      'Economic Times': 85,
      'Business Standard': 82,
      'TechCrunch': 80,
      'YourStory': 78,
      'Inc42': 75,
      'HackerNews': 72,
      'default': 50
    };
    
    return reputationMap[sourceName] || reputationMap['default'];
  }

  /**
   * Extract content from HTML
   */
  extractContent(html) {
    const $ = cheerio.load(html);
    return $.text().substring(0, 2000); // Limit to 2000 chars
  }

  /**
   * Extract tags from title and categories
   */
  extractTags(title, categories = []) {
    const tags = new Set();
    
    // Extract from title
    const keywords = title.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    keywords.forEach(k => tags.add(k));
    
    // Add categories
    if (Array.isArray(categories)) {
      categories.forEach(c => tags.add(c.name || c));
    }
    
    return Array.from(tags).slice(0, 10);
  }

  /**
   * Categorize article
   */
  categorizeArticle(title, content) {
    const titleLower = title.toLowerCase();
    const contentLower = content.toLowerCase();
    
    const categories = {
      'ai-ml': /\b(ai|artificial intelligence|machine learning|neural|deep learning|llm|gpt|transformer|chatbot)\b/gi,
      'security': /\b(security|breach|vulnerability|hack|cyberattack|malware|threat|protection|encryption)\b/gi,
      'cloud': /\b(cloud|aws|azure|gcp|kubernetes|containerization|serverless|devops)\b/gi,
      'startup': /\b(startup|founder|venture|vc|funding|seed|series A|unicorn|entrepreneur)\b/gi,
      'finance': /\b(finance|investment|stock|market|trading|currency|payment|fintech)\b/gi,
      'technology': /\b(tech|software|hardware|platform|api|framework|database|system)\b/gi,
      'policy': /\b(policy|regulation|law|government|compliance|gdpr|legislation)\b/gi,
      'sustainability': /\b(sustainability|green|renewable|carbon|environment|eco|climate)\b/gi
    };
    
    let maxMatches = 0;
    let selectedCategory = 'business';
    
    for (const [category, regex] of Object.entries(categories)) {
      const matches = (titleLower.match(regex) || []).length + 
                     ((contentLower.match(regex) || []).length / 2);
      
      if (matches > maxMatches) {
        maxMatches = matches;
        selectedCategory = category;
      }
    }
    
    return selectedCategory;
  }

  /**
   * Extract company names from content
   */
  extractCompanies(title, content) {
    const companies = new Set();
    const knownCompanies = [
      'Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Meta', 'OpenAI',
      'IBM', 'Oracle', 'Salesforce', 'Adobe', 'Accenture', 'TCS', 'Infosys',
      'Wipro', 'HCL', 'Cognizant', 'Intel', 'AMD', 'NVIDIA', 'Qualcomm'
    ];
    
    const text = `${title} ${content}`;
    
    knownCompanies.forEach(company => {
      if (text.includes(company)) {
        companies.add(company);
      }
    });
    
    return Array.from(companies);
  }

  /**
   * Extract industries from content
   */
  extractIndustries(title, categories = []) {
    const industries = new Set();
    
    categories.forEach(cat => {
      industries.add(cat.name || cat);
    });
    
    return Array.from(industries);
  }

  /**
   * Parse various date formats
   */
  parseDate(dateString) {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  }

  /**
   * Delete old articles (older than 90 days)
   */
  async deleteOldArticles(daysCutoff = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysCutoff);
    
    const result = await NewsArticle.deleteMany({
      publishedDate: { $lt: cutoffDate },
      isFeatured: false
    });
    
    console.log(`[NewsIngestion] Deleted ${result.deletedCount} old articles`);
    return result;
  }

  /**
   * Mark duplicate articles
   */
  async markDuplicates() {
    const articles = await NewsArticle.find({ isActive: true });
    const processed = new Set();
    
    for (let i = 0; i < articles.length; i++) {
      if (processed.has(articles[i]._id.toString())) continue;
      
      for (let j = i + 1; j < articles.length; j++) {
        if (processed.has(articles[j]._id.toString())) continue;
        
        const similarity = this.calculateSimilarity(articles[i].title, articles[j].title);
        if (similarity > 0.85) {
          // Mark newer article as duplicate of older
          if (articles[i].publishedDate >= articles[j].publishedDate) {
            articles[i].duplicateOf = articles[j]._id;
            articles[i].isActive = false;
            await articles[i].save();
            processed.add(articles[i]._id.toString());
          } else {
            articles[j].duplicateOf = articles[i]._id;
            articles[j].isActive = false;
            await articles[j].save();
            processed.add(articles[j]._id.toString());
          }
        }
      }
    }
  }

  /**
   * Calculate string similarity (Levenshtein-like)
   */
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate edit distance between two strings
   */
  getEditDistance(str1, str2) {
    const costs = [];
    
    for (let i = 0; i <= str1.length; i++) {
      let last = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          const newCost = Math.min(
            costs[j] + 1,
            last + 1,
            costs[j - 1] + (str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1)
          );
          costs[j - 1] = last;
          last = newCost;
        }
      }
      if (i > 0) costs[str2.length] = last;
    }
    
    return costs[str2.length];
  }
}

module.exports = NewsIngestionService;
