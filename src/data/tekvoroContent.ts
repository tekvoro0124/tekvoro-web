// Comprehensive Tekvoro Content Database
export interface ContentItem {
  id: string;
  type: 'service' | 'blog' | 'about' | 'product' | 'insight' | 'case-study';
  title: string;
  description: string;
  content: string;
  url: string;
  category: string;
  tags: string[];
  keywords: string[];
  featured?: boolean;
  date?: string;
  author?: string;
  readTime?: number;
}

export const tekvoroContent: ContentItem[] = [
  // Services
  {
    id: 'enterprise-automation',
    type: 'service',
    title: 'Enterprise Automation Solutions',
    description: 'Streamline your business processes with intelligent automation',
    content: 'Our enterprise automation solutions help businesses automate repetitive tasks, integrate systems, and optimize workflows using AI and RPA technologies.',
    url: '/services/enterprise-automation',
    category: 'Digital Transformation',
    tags: ['automation', 'enterprise', 'RPA', 'workflow', 'AI'],
    keywords: ['enterprise automation', 'business process automation', 'RPA', 'workflow optimization', 'digital transformation']
  },
  {
    id: 'ai-solutions',
    type: 'service',
    title: 'AI & Machine Learning Solutions',
    description: 'Transform your business with cutting-edge AI technologies',
    content: 'Leverage the power of artificial intelligence and machine learning to gain insights, automate processes, and create intelligent systems.',
    url: '/services/ai-solutions',
    category: 'AI & Machine Learning',
    tags: ['AI', 'machine learning', 'neural networks', 'deep learning', 'automation'],
    keywords: ['artificial intelligence', 'machine learning', 'AI solutions', 'ML', 'neural networks']
  },
  {
    id: 'cloud-solutions',
    type: 'service',
    title: 'Cloud Computing Solutions',
    description: 'Scalable cloud infrastructure and migration services',
    content: 'Comprehensive cloud solutions including migration, optimization, and management of cloud infrastructure for maximum efficiency.',
    url: '/services/cloud-solutions',
    category: 'Cloud & Infrastructure',
    tags: ['cloud', 'AWS', 'Azure', 'migration', 'scalability'],
    keywords: ['cloud computing', 'cloud migration', 'AWS', 'Azure', 'infrastructure']
  },
  {
    id: 'cybersecurity',
    type: 'service',
    title: 'Cybersecurity Solutions',
    description: 'Protect your digital assets with advanced security measures',
    content: 'Enterprise-grade cybersecurity solutions including threat detection, prevention, and response to keep your business secure.',
    url: '/services/cybersecurity-solutions',
    category: 'Security',
    tags: ['security', 'cybersecurity', 'threat detection', 'compliance', 'data protection'],
    keywords: ['cybersecurity', 'data protection', 'threat detection', 'security solutions']
  },
  {
    id: 'predictive-analytics',
    type: 'service',
    title: 'Predictive Analytics',
    description: 'Data-driven insights for better business decisions',
    content: 'Advanced predictive analytics solutions that help you forecast trends, identify opportunities, and make data-driven decisions.',
    url: '/services/predictive-analytics',
    category: 'Data & Analytics',
    tags: ['analytics', 'prediction', 'data science', 'forecasting', 'insights'],
    keywords: ['predictive analytics', 'data science', 'forecasting', 'business intelligence']
  },
  {
    id: 'smart-infrastructure',
    type: 'service',
    title: 'Smart Infrastructure Solutions',
    description: 'IoT-enabled smart infrastructure for modern cities',
    content: 'Transform urban infrastructure with IoT solutions, smart sensors, and connected systems for efficient city management.',
    url: '/services/smart-infrastructure',
    category: 'IoT & Smart Cities',
    tags: ['IoT', 'smart cities', 'infrastructure', 'sensors', 'connected systems'],
    keywords: ['smart infrastructure', 'IoT', 'smart cities', 'connected systems']
  },
  {
    id: 'telemedicine',
    type: 'service',
    title: 'Telemedicine Solutions',
    description: 'Revolutionary healthcare delivery through technology',
    content: 'Comprehensive telemedicine platforms enabling remote consultations, digital health records, and virtual healthcare delivery.',
    url: '/services/telemedicine',
    category: 'Healthcare Technology',
    tags: ['telemedicine', 'healthcare', 'digital health', 'remote care', 'medical'],
    keywords: ['telemedicine', 'digital health', 'remote healthcare', 'virtual consultations']
  },
  {
    id: 'web-development',
    type: 'service',
    title: 'Custom Web Development',
    description: 'Modern web applications built with cutting-edge technologies',
    content: 'Full-stack web development services using React, Node.js, and modern frameworks to build scalable applications.',
    url: '/services/web-development',
    category: 'Development',
    tags: ['web development', 'React', 'Node.js', 'full-stack', 'applications'],
    keywords: ['web development', 'React development', 'Node.js', 'full-stack applications']
  },
  {
    id: 'mobile-apps',
    type: 'service',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    content: 'Custom mobile app development for iOS and Android using React Native, Flutter, and native technologies.',
    url: '/services/mobile-apps',
    category: 'Development',
    tags: ['mobile', 'iOS', 'Android', 'React Native', 'Flutter'],
    keywords: ['mobile app development', 'iOS apps', 'Android apps', 'React Native']
  },
  {
    id: 'ui-ux-design',
    type: 'service',
    title: 'UI/UX Design Services',
    description: 'User-centered design for exceptional digital experiences',
    content: 'Professional UI/UX design services focusing on user experience, interface design, and digital product optimization.',
    url: '/services/ui-ux-design',
    category: 'Design',
    tags: ['UI design', 'UX design', 'user experience', 'interface design', 'prototyping'],
    keywords: ['UI design', 'UX design', 'user experience', 'interface design']
  },

  // Blog Posts & Insights
  {
    id: 'future-ai-business',
    type: 'blog',
    title: 'The Future of AI in Business',
    description: 'How AI is transforming industries and what to expect in 2025',
    content: 'Artificial Intelligence is revolutionizing business operations across all sectors. From automation to predictive analytics, AI is enabling companies to make smarter decisions and operate more efficiently.',
    url: '/blog/future-ai-business',
    category: 'AI Insights',
    tags: ['AI', 'business transformation', 'future trends', 'automation'],
    keywords: ['AI in business', 'artificial intelligence trends', 'business automation'],
    date: '2024-06-01',
    author: 'Priya Sharma',
    readTime: 5,
    featured: true
  },
  {
    id: 'cloud-security-best-practices',
    type: 'blog',
    title: 'Cloud Security Best Practices',
    description: 'Protecting your data in a multi-cloud world',
    content: 'As businesses adopt multi-cloud strategies, security becomes paramount. Learn the best practices for securing your cloud infrastructure and protecting sensitive data.',
    url: '/blog/cloud-security-best-practices',
    category: 'Security',
    tags: ['cloud security', 'data protection', 'best practices', 'compliance'],
    keywords: ['cloud security', 'data protection', 'multi-cloud security'],
    date: '2024-05-20',
    author: 'James Wilson',
    readTime: 7
  },
  {
    id: 'ux-trends-modern-apps',
    type: 'blog',
    title: 'UX Trends for Modern Applications',
    description: 'Designing for delight and accessibility',
    content: 'User experience design continues to evolve with new technologies and user expectations. Explore the latest trends shaping modern application design.',
    url: '/blog/ux-trends-modern-apps',
    category: 'Design',
    tags: ['UX', 'design trends', 'user experience', 'accessibility'],
    keywords: ['UX trends', 'user experience design', 'accessibility'],
    date: '2024-05-10',
    author: 'Elena Martinez',
    readTime: 4
  },
  {
    id: 'digital-transformation-guide',
    type: 'blog',
    title: 'Complete Guide to Digital Transformation',
    description: 'Step-by-step approach to transforming your business digitally',
    content: 'Digital transformation is more than just technology adoption. It\'s about reimagining business processes, customer experiences, and operational models for the digital age.',
    url: '/blog/digital-transformation-guide',
    category: 'Digital Transformation',
    tags: ['digital transformation', 'business strategy', 'innovation', 'technology'],
    keywords: ['digital transformation', 'business innovation', 'technology strategy'],
    date: '2024-04-15',
    author: 'Michael Chen',
    readTime: 8,
    featured: true
  },

  // About Content
  {
    id: 'about-tekvoro',
    type: 'about',
    title: 'About Tekvoro Technologies',
    description: 'Leading the future of AI and digital transformation',
    content: 'Tekvoro Technologies is a leading technology company specializing in AI solutions, cloud computing, and digital transformation. We help businesses innovate and grow with cutting-edge technology.',
    url: '/about',
    category: 'Company',
    tags: ['about', 'company', 'mission', 'vision', 'values'],
    keywords: ['Tekvoro Technologies', 'about us', 'company mission', 'technology company']
  },
  {
    id: 'leadership-team',
    type: 'about',
    title: 'Our Leadership Team',
    description: 'Meet the visionaries behind Tekvoro Technologies',
    content: 'Our leadership team brings decades of experience in technology, business strategy, and innovation. Together, we drive the company\'s vision and growth.',
    url: '/about/leadership',
    category: 'Company',
    tags: ['leadership', 'team', 'executives', 'management'],
    keywords: ['leadership team', 'executives', 'management team']
  },
  {
    id: 'company-culture',
    type: 'about',
    title: 'Our Culture and Values',
    description: 'Innovation, excellence, and integrity drive everything we do',
    content: 'At Tekvoro, we foster a culture of innovation, continuous learning, and collaboration. Our values guide our decisions and actions as we work towards our mission.',
    url: '/about/culture',
    category: 'Company',
    tags: ['culture', 'values', 'workplace', 'team culture'],
    keywords: ['company culture', 'corporate values', 'workplace culture']
  },

  // Products
  {
    id: 'whats-new',
    type: 'product',
    title: 'Latest Product Updates',
    description: 'Discover our newest features and improvements',
    content: 'Stay updated with our latest product releases, new features, and improvements designed to enhance your experience and deliver more value.',
    url: '/products/whats-new',
    category: 'Products',
    tags: ['updates', 'features', 'releases', 'new products'],
    keywords: ['product updates', 'new features', 'latest releases']
  },
  {
    id: 'product-roadmap',
    type: 'product',
    title: 'Product Roadmap',
    description: 'See what\'s coming next from Tekvoro',
    content: 'Explore our product roadmap and see what exciting features and innovations we\'re working on for the coming months.',
    url: '/products/product-roadmap',
    category: 'Products',
    tags: ['roadmap', 'future', 'planning', 'development'],
    keywords: ['product roadmap', 'future features', 'development plans']
  },
  {
    id: 'beta-programs',
    type: 'product',
    title: 'Beta Programs',
    description: 'Be the first to try our new features',
    content: 'Join our beta programs and get early access to new features. Help shape the future of our products with your feedback.',
    url: '/products/beta-programs',
    category: 'Products',
    tags: ['beta', 'early access', 'testing', 'feedback'],
    keywords: ['beta programs', 'early access', 'product testing']
  },

  // Case Studies
  {
    id: 'enterprise-automation-case',
    type: 'case-study',
    title: 'Enterprise Automation Success Story',
    description: 'How a Fortune 500 company transformed operations',
    content: 'Learn how a leading enterprise implemented our automation solutions to reduce operational costs by 40% and improve efficiency by 60%.',
    url: '/insights/case-studies/enterprise-automation',
    category: 'Case Studies',
    tags: ['case study', 'automation', 'success story', 'ROI'],
    keywords: ['automation case study', 'enterprise success', 'ROI improvement']
  },
  {
    id: 'ai-implementation-case',
    type: 'case-study',
    title: 'AI Implementation Case Study',
    description: 'Real-world AI deployment and results',
    content: 'Discover how a mid-sized company successfully implemented AI solutions to transform customer service and achieve 95% satisfaction rates.',
    url: '/insights/case-studies/ai-implementation',
    category: 'Case Studies',
    tags: ['case study', 'AI implementation', 'customer service', 'results'],
    keywords: ['AI case study', 'customer service AI', 'implementation success']
  }
];

// Search functionality
export function searchContent(query: string): ContentItem[] {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return tekvoroContent.filter(item => {
    const searchText = `${item.title} ${item.description} ${item.content} ${item.tags.join(' ')} ${item.keywords.join(' ')}`.toLowerCase();
    
    return searchTerms.every(term => searchText.includes(term));
  }).sort((a, b) => {
    // Prioritize featured items and exact title matches
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (aTitle === queryLower && bTitle !== queryLower) return -1;
    if (bTitle === queryLower && aTitle !== queryLower) return 1;
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    
    return 0;
  });
}

export function getContentByType(type: ContentItem['type']): ContentItem[] {
  return tekvoroContent.filter(item => item.type === type);
}

export function getContentByCategory(category: string): ContentItem[] {
  return tekvoroContent.filter(item => item.category === category);
}

export function getFeaturedContent(): ContentItem[] {
  return tekvoroContent.filter(item => item.featured);
}
