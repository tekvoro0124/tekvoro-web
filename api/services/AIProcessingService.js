const axios = require('axios');

class AIProcessingService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.openaiBaseUrl = 'https://api.openai.com/v1';
    
    if (!this.openaiApiKey) {
      console.warn('[AIProcessingService] OPENAI_API_KEY not set');
    }
  }

  /**
   * Process article: generate summary, credibility evaluation, and insights
   */
  async processArticle(title, content) {
    try {
      const [summary, credibilityEvaluation, insights] = await Promise.all([
        this.generateSummary(title, content),
        this.evaluateCredibility(title, content),
        this.generateInsights(title, content)
      ]);
      
      return {
        summary,
        credibilityEvaluation,
        keyInsights: insights.keyInsights,
        riskFactors: insights.riskFactors,
        opportunities: insights.opportunities,
        sentiment: insights.sentiment
      };
    } catch (error) {
      console.error('[AIProcessingService] Error processing article:', error.message);
      return {
        summary: content.substring(0, 200),
        credibilityEvaluation: { quality: 50, authorExpertise: 50, citations: 50, warnings: [] },
        keyInsights: [],
        riskFactors: [],
        opportunities: [],
        sentiment: 'neutral'
      };
    }
  }

  /**
   * Generate concise summary of article (2-3 sentences)
   */
  async generateSummary(title, content) {
    try {
      const response = await axios.post(
        `${this.openaiBaseUrl}/chat/completions`,
        {
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a corporate news analyst. Generate a concise 2-3 sentence summary of the article for business professionals.'
            },
            {
              role: 'user',
              content: `Title: ${title}\n\nContent: ${content.substring(0, 1500)}`
            }
          ],
          max_tokens: 150,
          temperature: 0.5
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('[AIProcessingService] Summary generation failed:', error.message);
      return content.substring(0, 200);
    }
  }

  /**
   * Evaluate credibility of article content
   */
  async evaluateCredibility(title, content) {
    try {
      const response = await axios.post(
        `${this.openaiBaseUrl}/chat/completions`,
        {
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a media credibility analyst. Evaluate the article on these metrics (0-100):
              - quality: Overall content quality, accuracy, professionalism
              - authorExpertise: Apparent expertise and authority of author/source
              - citations: Use of sources, references, evidence
              
              Return as JSON: {"quality": X, "authorExpertise": X, "citations": X, "warnings": ["..." ]}`
            },
            {
              role: 'user',
              content: `Title: ${title}\n\nContent: ${content.substring(0, 1500)}`
            }
          ],
          max_tokens: 300,
          temperature: 0.5
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      try {
        const evaluation = JSON.parse(response.data.choices[0].message.content);
        return {
          quality: Math.min(100, Math.max(0, evaluation.quality || 50)),
          authorExpertise: Math.min(100, Math.max(0, evaluation.authorExpertise || 50)),
          citations: Math.min(100, Math.max(0, evaluation.citations || 50)),
          warnings: evaluation.warnings || []
        };
      } catch (parseError) {
        return { quality: 50, authorExpertise: 50, citations: 50, warnings: [] };
      }
    } catch (error) {
      console.error('[AIProcessingService] Credibility evaluation failed:', error.message);
      return { quality: 50, authorExpertise: 50, citations: 50, warnings: [] };
    }
  }

  /**
   * Generate insights: key points, risks, opportunities
   */
  async generateInsights(title, content) {
    try {
      const response = await axios.post(
        `${this.openaiBaseUrl}/chat/completions`,
        {
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a business intelligence analyst. Extract from this article:
              - 3-4 key insights (main points for business professionals)
              - 2-3 risk factors mentioned or implied
              - 2-3 opportunities for businesses
              - sentiment: 'positive', 'neutral', or 'negative'
              
              Return as JSON: {
                "keyInsights": ["...", "...", "..."],
                "riskFactors": ["...", "...", "..."],
                "opportunities": ["...", "...", "..."],
                "sentiment": "neutral"
              }`
            },
            {
              role: 'user',
              content: `Title: ${title}\n\nContent: ${content.substring(0, 1500)}`
            }
          ],
          max_tokens: 400,
          temperature: 0.6
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      try {
        const insights = JSON.parse(response.data.choices[0].message.content);
        return {
          keyInsights: Array.isArray(insights.keyInsights) ? insights.keyInsights.slice(0, 4) : [],
          riskFactors: Array.isArray(insights.riskFactors) ? insights.riskFactors.slice(0, 3) : [],
          opportunities: Array.isArray(insights.opportunities) ? insights.opportunities.slice(0, 3) : [],
          sentiment: ['positive', 'neutral', 'negative'].includes(insights.sentiment) ? insights.sentiment : 'neutral'
        };
      } catch (parseError) {
        return {
          keyInsights: [],
          riskFactors: [],
          opportunities: [],
          sentiment: 'neutral'
        };
      }
    } catch (error) {
      console.error('[AIProcessingService] Insights generation failed:', error.message);
      return {
        keyInsights: [],
        riskFactors: [],
        opportunities: [],
        sentiment: 'neutral'
      };
    }
  }

  /**
   * Generate semantic embedding for article (for similarity search)
   */
  async generateEmbedding(text) {
    try {
      const response = await axios.post(
        `${this.openaiBaseUrl}/embeddings`,
        {
          model: 'text-embedding-3-small',
          input: text.substring(0, 8000),
          encoding_format: 'float'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data.data[0].embedding;
    } catch (error) {
      console.error('[AIProcessingService] Embedding generation failed:', error.message);
      // Return zero vector on error
      return new Array(1536).fill(0);
    }
  }

  /**
   * Answer user query using RAG (Retrieval Augmented Generation)
   * Uses retrieved articles as context
   */
  async answerQuery(query, relevantArticles) {
    try {
      const articleContext = relevantArticles
        .map((article, idx) => 
          `Article ${idx + 1} (Trust Score: ${article.trustScore.overall}/100):\n` +
          `Title: ${article.title}\n` +
          `Summary: ${article.summary}\n` +
          `Key Insights: ${(article.aiAnalysis.keyInsights || []).join('; ')}`
        )
        .join('\n\n');
      
      const response = await axios.post(
        `${this.openaiBaseUrl}/chat/completions`,
        {
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: `You are Tekvoro's AI Corporate Intelligence Assistant. 
              You answer questions about corporate and industry news based on highly credible, trust-scored sources.
              Always cite which articles informed your answer and mention their trust scores.
              Focus on actionable insights for business decision-makers.`
            },
            {
              role: 'user',
              content: `Based on these recent articles:\n\n${articleContext}\n\nAnswer this question: ${query}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return {
        answer: response.data.choices[0].message.content.trim(),
        articlesUsed: relevantArticles.length
      };
    } catch (error) {
      console.error('[AIProcessingService] Query answering failed:', error.message);
      return {
        answer: 'Unable to generate answer at this time.',
        articlesUsed: 0
      };
    }
  }

  /**
   * Batch process multiple articles
   */
  async processArticlesBatch(articles) {
    const results = [];
    
    for (const article of articles) {
      try {
        const processed = await this.processArticle(article.title, article.content);
        results.push({
          url: article.url,
          success: true,
          analysis: processed
        });
      } catch (error) {
        results.push({
          url: article.url,
          success: false,
          error: error.message
        });
      }
    }
    
    return results;
  }

  /**
   * Validate OpenAI API connection
   */
  async validateApiConnection() {
    try {
      const response = await axios.post(
        `${this.openaiBaseUrl}/chat/completions`,
        {
          model: 'gpt-4-turbo',
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 5
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return { status: 'connected', model: 'gpt-4-turbo' };
    } catch (error) {
      return { 
        status: 'error', 
        message: error.response?.data?.error?.message || error.message 
      };
    }
  }
}

module.exports = AIProcessingService;
