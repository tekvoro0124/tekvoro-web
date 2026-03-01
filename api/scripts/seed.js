const mongoose = require('mongoose');
const { BlogPost, Service, CaseStudy, User } = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Seed data following Tekvoro's positioning as India's AI Platform Studio
const seedData = {
  services: [
    {
      title: 'AI-Powered Marketplace Development',
      slug: 'ai-marketplace-development',
      description: 'Build complex AI-native marketplaces with fraud detection, real-time bidding, and automated workflows',
      content: `Transform your business with AI-powered marketplace platforms that go beyond traditional development. Our flagship proof: We built QuickMela — a production-grade auction marketplace with Graph Neural Network fraud detection, AI KYC integration, and real-time bidding infrastructure.

## What We Deliver:
- **AI Fraud Detection** - Graph Neural Networks for shill detection and bot fingerprinting
- **Real-time Bidding** - WebSocket-powered auction systems with instant updates
- **AI KYC Integration** - iDfy integration with liveness detection
- **Multi-language Support** - 8 Indian languages via Sarvam AI
- **Admin Command Center** - 22-panel dashboard for complete control

## Our Track Record:
We've done it before — ask us to show you. From idea to live marketplace in 90 days.`,
      category: 'Marketplace Development',
      tags: ['AI', 'marketplace', 'fraud-detection', 'real-time', 'KYC'],
      keywords: ['AI marketplace', 'auction platform', 'fraud detection', 'real-time bidding', 'AI KYC'],
      features: [
        'Graph Neural Network Fraud Detection',
        'Real-time WebSocket Bidding',
        'AI-powered KYC with Liveness Detection',
        'Multi-language Support (8 Indian languages)',
        '22-Panel Admin Command Center',
        'Escrow Payment Management',
        'Live Video Streaming',
        'WhatsApp NLP Bot Integration'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'TensorFlow', 'Graph Neural Networks'],
      pricing: {
        type: 'contact',
        price: 'Custom Quote'
      },
      published: true,
      featured: true,
      order: 1
    },
    {
      title: 'SaaS Platform Development',
      slug: 'saas-platform-development',
      description: 'Build scalable SaaS products with AI integration and automated workflows',
      content: `Launch your SaaS platform faster with our AI-first development approach. We specialize in building complex SaaS products that scale from day one.

## SaaS Development Expertise:
- **AI Integration** - Built-in AI capabilities from the ground up
- **Scalable Architecture** - Microservices, cloud-native design
- **Automated Workflows** - Reduce manual processes by 80%
- **Real-time Analytics** - Built-in business intelligence
- **Multi-tenant Architecture** - Enterprise-grade scalability

## Why Choose Us:
We don't just build SaaS — we build AI-native SaaS that gives you a competitive edge.`,
      category: 'SaaS Development',
      tags: ['SaaS', 'AI', 'scalability', 'automation', 'analytics'],
      keywords: ['SaaS development', 'AI SaaS', 'scalable platforms', 'automated workflows'],
      features: [
        'AI-native Architecture',
        'Microservices Design',
        'Multi-tenant Scalability',
        'Real-time Analytics',
        'Automated Workflows',
        'Cloud-native Deployment'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      pricing: {
        type: 'contact',
        price: 'Custom Quote'
      },
      published: true,
      featured: true,
      order: 2
    },
    {
      title: 'AI Consulting & Strategy',
      slug: 'ai-consulting-strategy',
      description: 'Strategic AI consulting to transform your business operations and decision-making',
      content: `Navigate the AI landscape with confidence. Our strategic consulting helps you identify high-impact AI opportunities and build a roadmap for successful implementation.

## Consulting Services:
- **AI Readiness Assessment** - Evaluate your current capabilities
- **Use Case Identification** - Find high-ROI AI applications
- **Technology Selection** - Choose the right AI tools and platforms
- **Implementation Roadmap** - Step-by-step transformation plan
- **Change Management** - Prepare your team for AI adoption

## Our Approach:
We focus on practical, revenue-generating AI applications that deliver measurable results.`,
      category: 'AI Consulting',
      tags: ['AI consulting', 'strategy', 'transformation', 'assessment'],
      keywords: ['AI strategy', 'AI consulting', 'digital transformation', 'AI roadmap'],
      features: [
        'AI Readiness Assessment',
        'Use Case Prioritization',
        'Technology Stack Recommendations',
        'Implementation Roadmap',
        'ROI Projections',
        'Change Management Support'
      ],
      technologies: ['Strategy Frameworks', 'AI Platforms', 'Data Analysis Tools'],
      pricing: {
        type: 'contact',
        price: 'Custom Quote'
      },
      published: true,
      featured: false,
      order: 3
    },
    {
      title: 'Custom Web Development',
      slug: 'custom-web-development',
      description: 'Modern web applications built with cutting-edge technologies and AI integration',
      content: `Build modern web applications that leverage AI capabilities and deliver exceptional user experiences.

## Development Services:
- **AI-Powered Interfaces** - Intelligent user interactions
- **Progressive Web Apps** - Native app experiences on web
- **Real-time Features** - Live data and instant updates
- **Performance Optimization** - Lightning-fast load times
- **SEO Optimization** - Built for search engines

## Technology Stack:
React, Node.js, TypeScript, GraphQL, and modern AI integrations.`,
      category: 'Web Development',
      tags: ['web development', 'React', 'AI integration', 'PWA'],
      keywords: ['custom web development', 'AI web apps', 'progressive web apps'],
      features: [
        'AI-powered User Interfaces',
        'Progressive Web Apps',
        'Real-time Features',
        'Performance Optimization',
        'SEO Optimization',
        'Modern JavaScript Stack'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB'],
      pricing: {
        type: 'package',
        plans: [
          { name: 'Starter Web App', price: '₹2,50,000', features: ['Basic AI features', 'Responsive design', '1 month support'] },
          { name: 'Professional Web App', price: '₹7,50,000', features: ['Advanced AI integration', 'PWA features', '3 months support', 'Performance optimization'] },
          { name: 'Enterprise Web App', price: 'Custom', features: ['Full AI integration', 'Custom architecture', 'Scalability planning', 'Ongoing support'] }
        ]
      },
      published: true,
      featured: false,
      order: 4
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Native and cross-platform mobile applications with AI capabilities',
      content: `Create mobile experiences that leverage AI to deliver personalized, intelligent interactions.

## Mobile Development Services:
- **AI-Powered Apps** - Intelligent features and personalization
- **Cross-Platform** - Single codebase, multiple platforms
- **Native Performance** - Optimized for each platform
- **Offline Capabilities** - Work without internet connection
- **App Store Optimization** - Maximize visibility and downloads

## Our Mobile Expertise:
We build apps that users love and businesses need.`,
      category: 'Mobile Development',
      tags: ['mobile development', 'iOS', 'Android', 'AI', 'cross-platform'],
      keywords: ['mobile app development', 'AI mobile apps', 'iOS development', 'Android development'],
      features: [
        'AI-powered Features',
        'Cross-platform Development',
        'Native Performance',
        'Offline Capabilities',
        'App Store Optimization',
        'Push Notifications'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      pricing: {
        type: 'package',
        plans: [
          { name: 'Basic Mobile App', price: '₹3,00,000', features: ['Single platform', 'Basic AI features', '1 month support'] },
          { name: 'Advanced Mobile App', price: '₹8,00,000', features: ['Cross-platform', 'Advanced AI', 'Backend included', '3 months support'] },
          { name: 'Enterprise Mobile App', price: 'Custom', features: ['Custom AI features', 'Multi-platform', 'Enterprise integrations', 'Ongoing support'] }
        ]
      },
      published: true,
      featured: false,
      order: 5
    }
  ],

  blogPosts: [
    {
      title: 'From Idea to Live Marketplace in 90 Days: Our QuickMela Success Story',
      slug: 'quickmela-marketplace-success-story',
      excerpt: 'How we built a production-grade AI-powered auction marketplace with fraud detection, KYC integration, and real-time bidding in just 90 days.',
      content: `# From Idea to Live Marketplace in 90 Days

At Tekvoro Technologies, we don't just talk about AI — we build AI-native platforms that work in the real world. Our flagship project, QuickMela, proves that complex marketplace platforms can be built and deployed in record time.

## The Challenge
Our client needed a B2B auction marketplace for industrial equipment with:
- Real-time bidding capabilities
- AI-powered fraud detection
- Automated KYC verification
- Multi-language support for Indian markets
- Escrow payment management

## Our AI-First Approach
We built QuickMela using cutting-edge AI technologies:
- **Graph Neural Networks** for fraud detection
- **Computer Vision** for document verification
- **Natural Language Processing** for multi-language support
- **Real-time Analytics** for business intelligence

## Results
- **90-day development cycle** from concept to live platform
- **99.7% uptime** in the first 6 months
- **40% reduction** in fraudulent activities
- **85% user satisfaction** rate
- **₹2.5 crores** in transactions processed

## Key Learnings
1. Start with AI architecture, not add AI later
2. Focus on core marketplace mechanics first
3. Build fraud detection from day one
4. Prioritize user experience in complex workflows

This success story demonstrates our capability to deliver complex, AI-powered platforms faster than traditional development approaches.`,
      author: 'Saniev Musugu',
      tags: ['case-study', 'marketplace', 'AI', 'success-story', 'QuickMela'],
      category: 'Case Studies',
      featured: true,
      published: true,
      publishedAt: new Date('2024-01-15'),
      readTime: 8,
      seoTitle: 'QuickMela Success Story: AI Marketplace Development in 90 Days',
      seoDescription: 'How Tekvoro built a production-grade AI-powered auction marketplace with fraud detection and real-time bidding in just 90 days.',
      keywords: ['marketplace development', 'AI platform', 'auction platform', 'fraud detection', 'QuickMela']
    },
    {
      title: 'Why Most Agencies Can\'t Build AI Platforms (And We Can)',
      slug: 'why-agencies-cant-build-ai-platforms',
      excerpt: 'The fundamental differences between traditional development agencies and AI-first platform builders, explained.',
      content: `# Why Most Agencies Can't Build AI Platforms

In the world of software development, there's a fundamental difference between agencies that "do AI" and companies that build AI-native platforms from the ground up.

## The Traditional Agency Approach
Most development agencies follow this pattern:
1. Build the basic platform first
2. "Add AI" as a feature later
3. Struggle with integration
4. Deliver sub-optimal results

## Our AI-First Methodology
At Tekvoro, we start with AI architecture:
1. **AI Architecture First** - Design around AI capabilities
2. **Data Pipeline Integration** - Built-in data collection and processing
3. **Scalable ML Infrastructure** - Ready for model training and deployment
4. **Intelligent Workflows** - Automated processes powered by AI

## Real-World Example: Fraud Detection
Traditional approach: Add fraud detection after platform launch
Our approach: Build fraud detection into the core bidding algorithm

**Results:**
- 95% accuracy vs 70% for add-on solutions
- Real-time detection vs batch processing
- Integrated user experience vs clunky overlays

## The Cost of "Adding AI Later"
- Increased development time by 3x
- Higher maintenance costs
- Poor user experience
- Limited scalability

## Why It Matters
AI isn't a feature — it's the foundation of modern platforms. Building AI-native from day one gives you:
- Superior performance
- Better user experience
- Competitive advantage
- Future-proof architecture

We don't just build platforms. We build the AI-native future of software.`,
      author: 'Saniev Musugu',
      tags: ['AI', 'platform-development', 'methodology', 'competitive-advantage'],
      category: 'AI Insights',
      featured: true,
      published: true,
      publishedAt: new Date('2024-01-20'),
      readTime: 6,
      seoTitle: 'Why Most Agencies Can\'t Build AI Platforms',
      seoDescription: 'The fundamental differences between traditional development and AI-first platform building.'
    },
    {
      title: 'The 90-Day Platform Development Framework',
      slug: '90-day-platform-framework',
      excerpt: 'Our proven framework for building and launching complex platforms in just 90 days.',
      content: `# The 90-Day Platform Development Framework

Building complex platforms doesn't have to take 12+ months. Our 90-day framework has proven successful for marketplace platforms, SaaS products, and AI-powered applications.

## Phase 1: Foundation (Days 1-30)
### Core Architecture Design
- Define AI capabilities and data architecture
- Set up scalable infrastructure (AWS/Azure)
- Establish development workflow and CI/CD
- Create basic user authentication

### Key Deliverables:
- Working user registration/login
- Database schema and API foundations
- Basic admin dashboard
- Development environment setup

## Phase 2: Core Features (Days 31-60)
### Build Essential Functionality
- Implement core platform features
- Integrate AI capabilities
- Develop user interfaces
- Set up payment processing

### Key Deliverables:
- Functional core features
- AI integrations working
- User dashboards operational
- Payment flow implemented

## Phase 3: Polish & Launch (Days 61-90)
### Testing & Optimization
- Comprehensive testing (unit, integration, user)
- Performance optimization
- Security audit and hardening
- Content creation and marketing setup

### Key Deliverables:
- Production-ready platform
- Security compliance
- Performance optimized
- Marketing materials ready

## Success Factors
1. **Clear Scope Definition** - Know exactly what to build
2. **AI-First Architecture** - Don't add AI later
3. **MVP Mindset** - Launch with core features
4. **Iterative Development** - Weekly demos and feedback
5. **Quality Assurance** - Testing built into every phase

## Real Results
Using this framework, we've successfully launched:
- QuickMela (auction marketplace) - 90 days
- Multiple SaaS platforms - 60-90 days
- AI-powered applications - 45-75 days

The key is starting with the right foundation and maintaining momentum throughout the development cycle.`,
      author: 'Saniev Musugu',
      tags: ['framework', 'development', 'methodology', 'timeline', 'success'],
      category: 'Development',
      featured: false,
      published: true,
      publishedAt: new Date('2024-01-25'),
      readTime: 7,
      seoTitle: 'The 90-Day Platform Development Framework',
      seoDescription: 'Our proven framework for building complex platforms in just 90 days.'
    },
    {
      title: 'AI Fraud Detection: Beyond Rule-Based Systems',
      slug: 'ai-fraud-detection-beyond-rules',
      excerpt: 'How machine learning and graph neural networks revolutionize fraud detection in marketplaces.',
      content: `# AI Fraud Detection: Beyond Rule-Based Systems

Traditional fraud detection relies on rule-based systems that flag suspicious patterns. Modern AI-powered fraud detection uses machine learning to understand complex fraud patterns and prevent attacks in real-time.

## The Limitations of Rule-Based Systems
Rule-based fraud detection:
- **Static Rules** - Can't adapt to new fraud patterns
- **High False Positives** - Legitimate users get blocked
- **Easy to Circumvent** - Fraudsters learn to avoid rules
- **Manual Maintenance** - Constant rule updates required

## AI-Powered Fraud Detection
Our approach uses multiple AI technologies:
- **Graph Neural Networks** - Understand user relationships and network patterns
- **Behavioral Analysis** - Learn normal vs suspicious user behavior
- **Real-time Scoring** - Continuous risk assessment
- **Adaptive Learning** - Improve detection over time

## Graph Neural Networks for Fraud Detection
GNNs excel at understanding complex relationships:
- User-to-user connections
- Device fingerprinting
- IP address patterns
- Transaction networks

**Example:** Shill bidding detection
- Traditional: Flag multiple bids from same IP
- AI: Understand bidding patterns across the entire network
- Result: 95% accuracy vs 70% for rule-based systems

## Real-World Implementation
In QuickMela, our fraud detection system:
- Processes 1000+ transactions daily
- Maintains 99.7% uptime
- Reduces fraudulent activities by 40%
- Zero false positives for legitimate users

## The Future of Fraud Prevention
AI fraud detection isn't just better — it's essential for modern marketplaces. As fraud patterns evolve, only adaptive AI systems can keep pace.

We don't just prevent fraud. We create trust in digital marketplaces.`,
      author: 'Saniev Musugu',
      tags: ['fraud-detection', 'AI', 'machine-learning', 'security', 'GNN'],
      category: 'AI Technology',
      featured: false,
      published: true,
      publishedAt: new Date('2024-02-01'),
      readTime: 5,
      seoTitle: 'AI Fraud Detection: Beyond Rule-Based Systems',
      seoDescription: 'How machine learning revolutionizes fraud detection in modern marketplaces.'
    },
    {
      title: 'Building for Scale: Architecture Patterns for AI Platforms',
      slug: 'building-scale-ai-platforms',
      excerpt: 'Essential architecture patterns for building AI-powered platforms that scale to millions of users.',
      content: `# Building for Scale: Architecture Patterns for AI Platforms

Scaling AI-powered platforms requires careful architectural decisions. Here's our approach to building platforms that grow from day one.

## Microservices Architecture
Break down complex platforms into manageable services:
- **User Service** - Authentication and user management
- **AI Service** - Machine learning model serving
- **Data Service** - Analytics and reporting
- **Notification Service** - Email and push notifications
- **Payment Service** - Transaction processing

## AI-Specific Scaling Considerations
AI platforms have unique scaling requirements:
- **Model Serving** - Efficient inference at scale
- **Data Pipeline** - Handle large volumes of training data
- **Real-time Processing** - Low-latency AI responses
- **Model Updates** - Continuous learning and deployment

## Database Design for AI
Choose the right database architecture:
- **Time Series Data** - For behavioral analytics
- **Graph Database** - For relationship modeling
- **Vector Database** - For similarity search and recommendations
- **Document Database** - For flexible content storage

## Caching Strategy
Multi-layer caching for optimal performance:
- **CDN** - Static assets and API responses
- **Redis** - Session data and frequently accessed data
- **Application Cache** - Computed results and AI inferences
- **Database Cache** - Query result caching

## Real-World Scaling Success
Our platforms handle:
- **1M+ daily active users**
- **10M+ AI inferences per day**
- **99.9% uptime**
- **<100ms response times**

## Key Takeaways
1. Design for scale from day one
2. Choose the right database for your data type
3. Implement comprehensive caching
4. Use microservices for flexibility
5. Monitor everything and optimize continuously

Building for scale isn't optional — it's essential for AI platform success.`,
      author: 'Saniev Musugu',
      tags: ['scalability', 'architecture', 'AI platforms', 'microservices', 'performance'],
      category: 'Architecture',
      featured: false,
      published: true,
      publishedAt: new Date('2024-02-05'),
      readTime: 6,
      seoTitle: 'Building for Scale: Architecture Patterns for AI Platforms',
      seoDescription: 'Essential architecture patterns for building scalable AI-powered platforms.'
    }
  ],

  caseStudies: [
    {
      title: 'QuickMela: AI-Powered Auction Marketplace',
      slug: 'quickmela-auction-marketplace',
      description: 'Building India\'s first AI-native auction marketplace with fraud detection and real-time bidding.',
      content: `QuickMela represents our flagship achievement in AI-powered marketplace development. This complex platform demonstrates our capability to build production-grade AI systems from the ground up.

## The Challenge
Create a B2B auction marketplace for industrial equipment that combines:
- Real-time bidding mechanics
- AI-powered fraud detection
- Automated KYC verification
- Multi-language support
- Escrow payment management

## Our Solution
We built an AI-first platform using:
- **Graph Neural Networks** for advanced fraud detection
- **Real-time WebSocket architecture** for instant bidding
- **Computer vision** for document verification
- **NLP models** for multi-language support
- **Machine learning** for personalized recommendations

## Technical Implementation
- **Frontend:** React with real-time WebSocket integration
- **Backend:** Node.js microservices architecture
- **AI/ML:** TensorFlow and custom Graph Neural Networks
- **Database:** MongoDB with time-series optimization
- **Infrastructure:** AWS with auto-scaling

## Results
- **90-day development timeline** from concept to launch
- **99.7% platform uptime** in first 6 months
- **40% reduction** in fraudulent activities
- **₹2.5 crores** in successful transactions
- **85% user satisfaction** score

## Key Innovations
1. **AI Fraud Detection:** Graph Neural Networks identify shill bidding patterns
2. **Real-time Bidding:** WebSocket-powered instant updates for all users
3. **Automated KYC:** AI-powered document verification with liveness detection
4. **Multi-language Support:** 8 Indian languages via advanced NLP
5. **Admin Command Center:** 22-panel dashboard for complete platform control

This project proves that complex, AI-powered marketplaces can be built and deployed faster than traditional approaches.`,
      client: 'QuickMela Technologies',
      industry: 'Marketplace Technology',
      category: 'Marketplace Development',
      challenge: 'Build a production-grade auction marketplace with AI fraud detection in 90 days',
      solution: 'AI-first architecture with Graph Neural Networks, real-time bidding, and automated KYC',
      results: [
        { metric: 'Development Time', value: '90 days' },
        { metric: 'Platform Uptime', value: '99.7%' },
        { metric: 'Fraud Reduction', value: '40%' },
        { metric: 'Transaction Volume', value: '₹2.5 crores' },
        { metric: 'User Satisfaction', value: '85%' }
      ],
      duration: '90 days',
      technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'WebSocket', 'AWS'],
      published: true,
      featured: true,
      testimonial: {
        quote: 'Tekvoro delivered what most agencies said was impossible in 90 days. Their AI-first approach gave us a competitive advantage from day one.',
        author: 'Rajesh Kumar',
        position: 'CEO, QuickMela Technologies'
      }
    },
    {
      title: 'FinTech SaaS Platform for SME Lending',
      slug: 'fintech-saas-sme-lending',
      description: 'AI-powered lending platform that reduced approval time by 80% and increased loan volume by 300%.',
      content: `This FinTech SaaS platform transformed SME lending by leveraging AI to automate credit assessment and risk evaluation.

## The Challenge
Traditional SME lending processes were:
- Manual credit assessment (2-3 weeks)
- High default rates (15-20%)
- Limited loan volumes
- Poor customer experience

## Our Solution
We built an AI-powered platform featuring:
- **Automated Credit Scoring** using machine learning
- **Real-time Risk Assessment** with behavioral analytics
- **Document Processing** with computer vision
- **Predictive Default Modeling** to minimize risk
- **API Integration** with banking systems

## Results
- **80% reduction** in approval time
- **300% increase** in loan volume
- **60% decrease** in default rates
- **95% customer satisfaction**
- **₹50 crores** in loans processed monthly

## Technical Architecture
- **AI Models:** Custom credit scoring algorithms
- **Data Processing:** Real-time ETL pipelines
- **API Layer:** RESTful APIs for banking integration
- **Security:** Bank-grade encryption and compliance
- **Scalability:** Auto-scaling infrastructure

This project demonstrates our expertise in building regulated FinTech platforms that balance innovation with compliance.`,
      client: 'Leading NBFC',
      industry: 'Financial Technology',
      category: 'FinTech Development',
      challenge: 'Modernize SME lending process with AI automation',
      solution: 'AI-powered credit scoring platform with real-time risk assessment',
      results: [
        { metric: 'Approval Time', value: '80% faster' },
        { metric: 'Loan Volume', value: '300% increase' },
        { metric: 'Default Rate', value: '60% decrease' },
        { metric: 'Customer Satisfaction', value: '95%' },
        { metric: 'Monthly Volume', value: '₹50 crores' }
      ],
      duration: '120 days',
      technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      published: true,
      featured: true,
      testimonial: {
        quote: 'The AI platform transformed our lending business. We went from manual processes to automated approvals while significantly reducing risk.',
        author: 'Priya Sharma',
        position: 'CTO, Leading NBFC'
      }
    }
  ],

  adminUser: {
    email: 'admin@tekvoro.com',
    name: 'Tekvoro Admin',
    password: 'Tekvoro2024!',
    role: 'admin'
  }
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await BlogPost.deleteMany({});
    await Service.deleteMany({});
    await CaseStudy.deleteMany({});
    await User.deleteMany({ email: { $ne: 'admin@tekvoro.com' } }); // Keep existing admin if exists

    console.log('🧹 Cleared existing data');

    // Seed services
    const services = await Service.insertMany(seedData.services);
    console.log(`✅ Seeded ${services.length} services`);

    // Seed blog posts
    const blogPosts = await BlogPost.insertMany(seedData.blogPosts);
    console.log(`✅ Seeded ${blogPosts.length} blog posts`);

    // Seed case studies
    const caseStudies = await CaseStudy.insertMany(seedData.caseStudies);
    console.log(`✅ Seeded ${caseStudies.length} case studies`);

    // Create admin user
    const existingAdmin = await User.findOne({ email: seedData.adminUser.email });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(seedData.adminUser.password, 12);
      const adminUser = new User({
        ...seedData.adminUser,
        password: hashedPassword
      });
      await adminUser.save();
      console.log('✅ Created admin user');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Services: ${services.length}`);
    console.log(`   Blog Posts: ${blogPosts.length}`);
    console.log(`   Case Studies: ${caseStudies.length}`);
    console.log(`   Admin User: ${existingAdmin ? 'Already exists' : 'Created'}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tekvoro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📡 Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Run seeder if called directly
if (require.main === module) {
  connectDB()
    .then(() => seedDatabase())
    .then(() => {
      console.log('🎯 Seeding completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase, seedData };
