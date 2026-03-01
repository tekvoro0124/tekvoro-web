import { tekvoroContent, ContentItem } from '../data/tekvoroContent';

export interface BlogPost extends ContentItem {
  type: 'blog';
  author: string;
  readTime: number;
  featured?: boolean;
}

export interface Service extends ContentItem {
  type: 'service';
  features: string[];
  technologies: string[];
  pricing?: {
    type: 'contact' | 'package';
    price?: string;
    plans?: Array<{ name: string; price: string; features: string[] }>;
  };
}

export interface CaseStudy extends ContentItem {
  type: 'case-study';
  client: string;
  industry: string;
  results: {
    metric: string;
    value: string;
  }[];
  duration: string;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Dynamic Content Service
class ContentService {
  private content: ContentItem[] = tekvoroContent; // Fallback to local data
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Generic API request method
  private async apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`API request failed for ${endpoint}:`, error);
      return null; // Return null to trigger fallback
    }
  }

  // Cache management
  private getCached(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCached(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Get all blog posts
  async getBlogPosts(): Promise<BlogPost[]> {
    const cacheKey = 'blog-posts';
    let posts = this.getCached(cacheKey);

    if (!posts) {
      const apiData = await this.apiRequest('/content/blog');
      if (apiData && apiData.posts) {
        posts = apiData.posts.map((post: any) => ({
          ...post,
          type: 'blog',
          author: post.author || 'Tekvoro Team',
          readTime: post.readTime || 5,
          featured: post.featured || false
        }));
        this.setCached(cacheKey, posts);
      } else {
        // Fallback to local data
        posts = this.content
          .filter(item => item.type === 'blog')
          .map(item => ({
            ...item,
            author: item.author || 'Tekvoro Team',
            readTime: item.readTime || 5,
            featured: item.featured || false
          }));
      }
    }

    return posts;
  }

  // Get featured blog posts
  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    const allPosts = await this.getBlogPosts();
    return allPosts.filter(post => post.featured);
  }

  // Get blog post by slug
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `blog-post-${slug}`;
    let post = this.getCached(cacheKey);

    if (!post) {
      const apiData = await this.apiRequest(`/content/blog/${slug}`);
      if (apiData) {
        post = {
          ...apiData,
          type: 'blog',
          author: apiData.author || 'Tekvoro Team',
          readTime: apiData.readTime || 5,
          featured: apiData.featured || false
        };
        this.setCached(cacheKey, post);
      } else {
        // Fallback to local data
        post = this.content
          .filter(item => item.type === 'blog')
          .find(item => item.url === `/blog/${slug}`) || null;
      }
    }

    return post;
  }

  // Get all services
  async getServices(): Promise<Service[]> {
    const cacheKey = 'services';
    let services = this.getCached(cacheKey);

    if (!services) {
      const apiData = await this.apiRequest('/content/services');
      if (apiData) {
        services = apiData.map((service: any) => ({
          ...service,
          type: 'service',
          features: service.features || this.generateServiceFeatures(service.id),
          technologies: service.technologies || this.generateServiceTechnologies(service.id),
          pricing: service.pricing || this.generateServicePricing(service.id)
        }));
        this.setCached(cacheKey, services);
      } else {
        // Fallback to local data
        services = this.content
          .filter(item => item.type === 'service')
          .map(item => ({
            ...item,
            features: this.generateServiceFeatures(item.id),
            technologies: this.generateServiceTechnologies(item.id),
            pricing: this.generateServicePricing(item.id)
          }));
      }
    }

    return services;
  }

  // Get service by slug
  async getServiceBySlug(slug: string): Promise<Service | null> {
    const cacheKey = `service-${slug}`;
    let service = this.getCached(cacheKey);

    if (!service) {
      const apiData = await this.apiRequest(`/content/services/${slug}`);
      if (apiData) {
        service = {
          ...apiData,
          type: 'service',
          features: apiData.features || this.generateServiceFeatures(apiData.id),
          technologies: apiData.technologies || this.generateServiceTechnologies(apiData.id),
          pricing: apiData.pricing || this.generateServicePricing(apiData.id)
        };
        this.setCached(cacheKey, service);
      } else {
        // Fallback to local data
        service = this.content
          .filter(item => item.type === 'service')
          .find(item => item.url === `/services/${slug}`) || null;
      }
    }

    return service;
  }

  // Get all case studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    const cacheKey = 'case-studies';
    let caseStudies = this.getCached(cacheKey);

    if (!caseStudies) {
      const apiData = await this.apiRequest('/content/case-studies');
      if (apiData) {
        caseStudies = apiData.map((cs: any) => ({
          ...cs,
          type: 'case-study',
          client: cs.client || this.generateClientName(cs.id),
          industry: cs.industry || this.generateIndustry(cs.id),
          results: cs.results || this.generateResults(cs.id),
          duration: cs.duration || this.generateDuration(cs.id)
        }));
        this.setCached(cacheKey, caseStudies);
      } else {
        // Fallback to local data
        caseStudies = this.content
          .filter(item => item.type === 'case-study')
          .map(item => ({
            ...item,
            client: this.generateClientName(item.id),
            industry: this.generateIndustry(item.id),
            results: this.generateResults(item.id),
            duration: this.generateDuration(item.id)
          }));
      }
    }

    return caseStudies;
  }

  // Get case study by slug
  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    const cacheKey = `case-study-${slug}`;
    let caseStudy = this.getCached(cacheKey);

    if (!caseStudy) {
      const apiData = await this.apiRequest(`/content/case-studies/${slug}`);
      if (apiData) {
        caseStudy = {
          ...apiData,
          type: 'case-study',
          client: apiData.client || this.generateClientName(apiData.id),
          industry: apiData.industry || this.generateIndustry(apiData.id),
          results: apiData.results || this.generateResults(apiData.id),
          duration: apiData.duration || this.generateDuration(apiData.id)
        };
        this.setCached(cacheKey, caseStudy);
      } else {
        // Fallback to local data
        caseStudy = this.content
          .filter(item => item.type === 'case-study')
          .find(item => item.url === `/insights/case-studies/${slug}`) || null;
      }
    }

    return caseStudy;
  }

  // Search content
  async searchContent(query: string): Promise<ContentItem[]> {
    const cacheKey = `search-${query}`;
    let results = this.getCached(cacheKey);

    if (!results) {
      const apiData = await this.apiRequest(`/content/search?q=${encodeURIComponent(query)}`);
      if (apiData && apiData.results) {
        results = apiData.results;
        this.setCached(cacheKey, results);
      } else {
        // Fallback to local search
        results = this.content.filter(item => {
          const searchText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.keywords.join(' ')}`.toLowerCase();
          const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
          return searchTerms.every(term => searchText.includes(term));
        });
      }
    }

    return results;
  }

  // Advanced search with filters
  async searchAdvanced(
    query: string,
    filters?: {
      category?: string;
      tag?: string;
      type?: 'all' | 'blog' | 'service' | 'case-study';
      sortBy?: 'date' | 'views' | 'featured';
      order?: 'asc' | 'desc';
      page?: number;
      limit?: number;
    }
  ): Promise<{ results: ContentItem[]; total: number; pagination: any }> {
    const params = new URLSearchParams({
      q: query,
      ...(filters?.category && { category: filters.category }),
      ...(filters?.tag && { tag: filters.tag }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.sortBy && { sortBy: filters.sortBy }),
      ...(filters?.order && { order: filters.order }),
      page: String(filters?.page || 1),
      limit: String(filters?.limit || 10),
    });

    const cacheKey = `search-advanced-${params.toString()}`;
    let data = this.getCached(cacheKey);

    if (!data) {
      const apiData = await this.apiRequest(`/content/search/advanced?${params}`);
      if (apiData) {
        data = apiData;
        this.setCached(cacheKey, data);
      } else {
        // Fallback to local search with filtering
        let results = this.content.filter(item => {
          const searchText = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
          const query_lower = query.toLowerCase();
          const matches = searchText.includes(query_lower);
          
          if (!matches) return false;
          if (filters?.category && !('category' in item)) return false;
          if (filters?.tag && !item.tags.includes(filters.tag)) return false;
          if (filters?.type && filters.type !== 'all' && item.type !== filters.type) return false;
          
          return true;
        });

        data = {
          results,
          total: results.length,
          pagination: {
            page: filters?.page || 1,
            limit: filters?.limit || 10,
            total: results.length
          }
        };
      }
    }

    return data;
  }

  // Get search suggestions/autocomplete
  async getSearchSuggestions(query: string, limit: number = 5): Promise<any[]> {
    const cacheKey = `suggestions-${query}`;
    let suggestions = this.getCached(cacheKey);

    if (!suggestions) {
      const apiData = await this.apiRequest(`/content/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (apiData && apiData.suggestions) {
        suggestions = apiData.suggestions;
        this.setCached(cacheKey, suggestions);
      } else {
        // Fallback to local suggestions
        const allTitles = this.content
          .filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
          .slice(0, limit)
          .map(item => ({ text: item.title, type: item.type, slug: item.id }));

        const allTags = Array.from(
          new Set(
            this.content
              .flatMap(item => item.tags)
              .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
          )
        )
          .slice(0, limit)
          .map(tag => ({ text: tag, type: 'tag', slug: null }));

        suggestions = [...allTitles, ...allTags];
      }
    }

    return suggestions;
  }

  // Get content statistics
  async getContentStats(): Promise<{
    blogPosts: number;
    services: number;
    caseStudies: number;
    totalViews: number;
    totalContent: number;
  }> {
    const cacheKey = 'content-stats';
    let stats = this.getCached(cacheKey);

    if (!stats) {
      const apiData = await this.apiRequest('/content/stats');
      if (apiData) {
        stats = apiData;
        this.setCached(cacheKey, stats);
      } else {
        // Fallback to local stats
        const blogPosts = this.content.filter(item => item.type === 'blog').length;
        const services = this.content.filter(item => item.type === 'service').length;
        const caseStudies = this.content.filter(item => item.type === 'case-study').length;

        stats = {
          blogPosts,
          services,
          caseStudies,
          totalViews: 0,
          totalContent: blogPosts + services + caseStudies
        };
      }
    }

    return stats;
  }

  // Get trending content
  async getTrendingContent(limit: number = 5): Promise<ContentItem[]> {
    const cacheKey = `trending-${limit}`;
    let trending = this.getCached(cacheKey);

    if (!trending) {
      const apiData = await this.apiRequest(`/content/trending?limit=${limit}`);
      if (apiData && apiData.trending) {
        trending = apiData.trending;
        this.setCached(cacheKey, trending);
      } else {
        // Fallback: return first items as "trending"
        trending = this.content.slice(0, limit);
      }
    }

    return trending;
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    const cacheKey = 'categories';
    let categories = this.getCached(cacheKey);

    if (!categories) {
      const apiData = await this.apiRequest('/content/categories');
      if (apiData && apiData.categories) {
        categories = apiData.categories;
        this.setCached(cacheKey, categories);
      } else {
        // Fallback to local categories
        categories = Array.from(
          new Set(
            this.content
              .filter(item => 'category' in item)
              .map((item: any) => item.category)
          )
        );
      }
    }

    return categories;
  }

  // Get all tags
  async getTags(): Promise<string[]> {
    const cacheKey = 'tags';
    let tags = this.getCached(cacheKey);

    if (!tags) {
      const apiData = await this.apiRequest('/content/tags');
      if (apiData && apiData.tags) {
        tags = apiData.tags;
        this.setCached(cacheKey, tags);
      } else {
        // Fallback to local tags
        tags = Array.from(new Set(this.content.flatMap(item => item.tags)));
      }
    }

    return tags;
  }

  // Contact form submission
  async submitContact(formData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject: string;
    message: string;
    type?: 'contact' | 'demo' | 'support' | 'partnership';
  }): Promise<{ success: boolean; message: string; submissionId?: string }> {
    try {
      const response = await this.apiRequest('/contact/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response) {
        return response;
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Contact submission failed:', error);
      throw new Error('Failed to submit contact form. Please try again later.');
    }
  }

  // Demo booking
  async bookDemo(formData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    projectType: string;
    timeline?: string;
    message?: string;
  }): Promise<{ success: boolean; message: string; submissionId?: string }> {
    try {
      const response = await this.apiRequest('/contact/book-demo', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response) {
        return response;
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Demo booking failed:', error);
      throw new Error('Failed to book demo. Please try again later.');
    }
  }

  // Email subscription
  async subscribeEmail(formData: {
    email: string;
    name?: string;
    company?: string;
    interests?: string[];
    plan?: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.apiRequest('/subscription/subscribe', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response) {
        return response;
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Email subscription failed:', error);
      throw new Error('Failed to subscribe. Please try again later.');
    }
  }

  // Helper methods for generating dynamic content
  private generateServiceFeatures(serviceId: string): string[] {
    const featuresMap: Record<string, string[]> = {
      'enterprise-automation': [
        'Workflow Automation',
        'Process Optimization',
        'RPA Integration',
        'Real-time Monitoring',
        'Analytics Dashboard'
      ],
      'ai-solutions': [
        'Machine Learning Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'AI Integration'
      ],
      'cloud-solutions': [
        'Cloud Migration',
        'Infrastructure Setup',
        'Security Management',
        'Scalability Planning',
        'Cost Optimization'
      ],
      'cybersecurity': [
        'Threat Detection',
        'Security Audits',
        'Compliance Management',
        'Incident Response',
        'Security Training'
      ],
      'predictive-analytics': [
        'Data Analysis',
        'Forecasting Models',
        'Business Intelligence',
        'Custom Dashboards',
        'Predictive Models'
      ],
      'smart-infrastructure': [
        'IoT Integration',
        'Smart Sensors',
        'Data Collection',
        'Real-time Monitoring',
        'Automation Systems'
      ],
      'telemedicine': [
        'Virtual Consultations',
        'Patient Management',
        'Digital Health Records',
        'Remote Monitoring',
        'HIPAA Compliance'
      ],
      'web-development': [
        'Custom Web Apps',
        'Responsive Design',
        'Performance Optimization',
        'SEO Implementation',
        'Maintenance Support'
      ],
      'mobile-apps': [
        'iOS Development',
        'Android Development',
        'Cross-Platform Apps',
        'App Store Deployment',
        'Maintenance Updates'
      ],
      'ui-ux-design': [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Usability Testing',
        'Design Systems'
      ]
    };
    
    return featuresMap[serviceId] || ['Custom Solutions', 'Expert Support', 'Quality Assurance'];
  }

  private generateServiceTechnologies(serviceId: string): string[] {
    const techMap: Record<string, string[]> = {
      'enterprise-automation': ['RPA', 'Python', 'Node.js', 'Docker', 'Kubernetes'],
      'ai-solutions': ['TensorFlow', 'PyTorch', 'Python', 'AWS SageMaker', 'Azure ML'],
      'cloud-solutions': ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Docker'],
      'cybersecurity': ['SIEM', 'Firewall', 'Encryption', 'IAM', 'Compliance Tools'],
      'predictive-analytics': ['Python', 'R', 'Tableau', 'Power BI', 'SQL'],
      'smart-infrastructure': ['IoT', 'MQTT', 'Arduino', 'Raspberry Pi', 'AWS IoT'],
      'telemedicine': ['HIPAA', 'FHIR', 'WebRTC', 'React', 'Node.js'],
      'web-development': ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Next.js'],
      'mobile-apps': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      'ui-ux-design': ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Principle']
    };
    
    return techMap[serviceId] || ['Modern Technologies', 'Industry Standards'];
  }

  private generateServicePricing(serviceId: string) {
    const pricingMap: Record<string, any> = {
      'enterprise-automation': {
        type: 'package',
        plans: [
          { name: 'Starter', price: '$5,000', features: ['Basic Automation', 'Up to 10 Workflows', 'Email Support'] },
          { name: 'Professional', price: '$15,000', features: ['Advanced Automation', 'Unlimited Workflows', 'Priority Support', 'Analytics'] },
          { name: 'Enterprise', price: 'Custom', features: ['Full Automation Suite', 'Custom Development', 'Dedicated Team', 'SLA Guarantee'] }
        ]
      },
      'ai-solutions': {
        type: 'package',
        plans: [
          { name: 'AI Consultation', price: '$2,500', features: ['AI Strategy', 'Feasibility Study', 'Implementation Plan'] },
          { name: 'AI Implementation', price: '$10,000', features: ['Model Development', 'Integration', 'Training', 'Support'] },
          { name: 'AI Enterprise', price: 'Custom', features: ['Custom AI Solutions', 'Ongoing Support', 'Team Training', 'R&D'] }
        ]
      },
      'cloud-solutions': {
        type: 'package',
        plans: [
          { name: 'Cloud Migration', price: '$3,000', features: ['Migration Planning', 'Data Transfer', 'Basic Setup'] },
          { name: 'Cloud Management', price: '$8,000', features: ['Infrastructure Management', 'Security', 'Monitoring', 'Optimization'] },
          { name: 'Cloud Enterprise', price: 'Custom', features: ['Multi-Cloud Setup', 'Advanced Security', '24/7 Support', 'Custom Solutions'] }
        ]
      }
    };
    
    return pricingMap[serviceId] || { type: 'contact' };
  }

  private generateClientName(caseStudyId: string): string {
    const clients: Record<string, string> = {
      'enterprise-automation-case': 'Fortune 500 Manufacturing Company',
      'ai-implementation-case': 'Mid-Sized Healthcare Provider',
      'cloud-migration-case': 'Global Retail Chain',
      'cybersecurity-case': 'Financial Services Firm'
    };
    
    return clients[caseStudyId] || 'Leading Enterprise';
  }

  private generateIndustry(caseStudyId: string): string {
    const industries: Record<string, string> = {
      'enterprise-automation-case': 'Manufacturing',
      'ai-implementation-case': 'Healthcare',
      'cloud-migration-case': 'Retail',
      'cybersecurity-case': 'Financial Services'
    };
    
    return industries[caseStudyId] || 'Technology';
  }

  private generateResults(caseStudyId: string): Array<{ metric: string; value: string }> {
    const resultsMap: Record<string, Array<{ metric: string; value: string }>> = {
      'enterprise-automation-case': [
        { metric: 'Cost Reduction', value: '40%' },
        { metric: 'Efficiency Improvement', value: '60%' },
        { metric: 'ROI', value: '250%' }
      ],
      'ai-implementation-case': [
        { metric: 'Customer Satisfaction', value: '95%' },
        { metric: 'Response Time', value: '80% faster' },
        { metric: 'Cost Savings', value: '35%' }
      ],
      'cloud-migration-case': [
        { metric: 'Downtime Reduction', value: '99.9%' },
        { metric: 'Scalability', value: '10x' },
        { metric: 'Cost Optimization', value: '30%' }
      ],
      'cybersecurity-case': [
        { metric: 'Threat Detection', value: '95%' },
        { metric: 'Compliance Score', value: '100%' },
        { metric: 'Incident Response', value: '85% faster' }
      ]
    };
    
    return resultsMap[caseStudyId] || [
      { metric: 'Success Rate', value: '95%' },
      { metric: 'Client Satisfaction', value: '4.8/5' }
    ];
  }

  private generateDuration(caseStudyId: string): string {
    const durations: Record<string, string> = {
      'enterprise-automation-case': '6 months',
      'ai-implementation-case': '3 months',
      'cloud-migration-case': '4 months',
      'cybersecurity-case': '2 months'
    };
    
    return durations[caseStudyId] || '3 months';
  }
}

// Create singleton instance
const contentService = new ContentService();

export default contentService;
