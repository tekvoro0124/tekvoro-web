import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, Bookmark, Eye, Tag } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams();
  
  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: 1,
    title: 'The Future of Artificial Intelligence in Enterprise Solutions',
    content: `
      <p>Artificial Intelligence has moved from science fiction to business reality, transforming how enterprises operate, make decisions, and serve their customers. As we stand at the threshold of a new era, it's crucial to understand how AI will continue to reshape the business landscape.</p>

      <h2>The Current State of Enterprise AI</h2>
      <p>Today's enterprises are already leveraging AI in various forms - from chatbots handling customer service to machine learning algorithms optimizing supply chains. However, we're only scratching the surface of what's possible.</p>

      <h3>Key Areas of AI Implementation</h3>
      <ul>
        <li><strong>Customer Experience:</strong> Personalized recommendations, intelligent chatbots, and predictive customer service</li>
        <li><strong>Operations:</strong> Process automation, predictive maintenance, and resource optimization</li>
        <li><strong>Decision Making:</strong> Data-driven insights, risk assessment, and strategic planning</li>
        <li><strong>Security:</strong> Threat detection, fraud prevention, and cybersecurity enhancement</li>
      </ul>

      <h2>Emerging Trends and Technologies</h2>
      <p>The next wave of AI innovation will bring even more sophisticated capabilities to enterprises:</p>

      <h3>1. Generative AI and Large Language Models</h3>
      <p>Tools like GPT and similar models are revolutionizing content creation, code generation, and complex problem-solving. Enterprises are beginning to integrate these technologies into their workflows for enhanced productivity.</p>

      <h3>2. Edge AI and Real-time Processing</h3>
      <p>Moving AI processing closer to data sources enables real-time decision making and reduces latency, crucial for applications like autonomous vehicles and industrial IoT.</p>

      <h3>3. Explainable AI (XAI)</h3>
      <p>As AI systems become more complex, the need for transparency and explainability grows, especially in regulated industries like healthcare and finance.</p>

      <h2>Challenges and Considerations</h2>
      <p>While the potential is enormous, enterprises must navigate several challenges:</p>

      <h3>Data Quality and Governance</h3>
      <p>AI systems are only as good as the data they're trained on. Ensuring data quality, privacy, and compliance remains a critical challenge.</p>

      <h3>Skills Gap</h3>
      <p>The demand for AI talent far exceeds supply. Organizations must invest in training and development to build internal capabilities.</p>

      <h3>Ethical Considerations</h3>
      <p>As AI systems make more decisions that affect people's lives, ensuring fairness, transparency, and accountability becomes paramount.</p>

      <h2>The Road Ahead</h2>
      <p>The future of enterprise AI will be characterized by:</p>
      <ul>
        <li>More sophisticated human-AI collaboration</li>
        <li>Industry-specific AI solutions</li>
        <li>Improved AI governance and ethics frameworks</li>
        <li>Greater democratization of AI tools</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The AI revolution in enterprise is not a distant future - it's happening now. Organizations that embrace AI thoughtfully and strategically will gain significant competitive advantages. The key is to start with clear business objectives, invest in the right talent and infrastructure, and maintain a focus on ethical AI practices.</p>

      <p>At Tekvoro Technologies, we're committed to helping enterprises navigate this AI transformation journey, providing the expertise and solutions needed to harness the full potential of artificial intelligence.</p>
    `,
    author: 'Musugu Sanjeev',
    authorRole: 'CEO & Founder',
    authorBio: 'Musugu Sanjeev is the CEO and Founder of Tekvoro Technologies with over 12 years of experience in UI/UX design and software development. He is passionate about leveraging technology to solve complex business challenges.',
    authorImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Artificial Intelligence',
    tags: ['AI', 'Enterprise', 'Innovation', 'Technology', 'Machine Learning'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    views: 2450,
    likes: 89,
    bookmarks: 34
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Building Scalable Cloud Infrastructure',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '6 min read'
    },
    {
      id: 3,
      title: 'IoT Revolution in Smart Cities',
      image: 'https://images.pexels.com/photos/3912472/pexels-photo-3912472.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '10 min read'
    },
    {
      id: 4,
      title: 'Cybersecurity Best Practices',
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '12 min read'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-8">
        <div className="container-custom">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-300 hover:text-primary-200 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <img 
                  src={blogPost.authorImage} 
                  alt={blogPost.author}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium text-white">{blogPost.author}</p>
                  <p className="text-sm">{blogPost.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(blogPost.publishDate).toLocaleDateString()}
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {blogPost.readTime}
              </div>
              
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                {blogPost.views.toLocaleString()} views
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img 
          src={blogPost.image} 
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                />
              </motion.article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-6">About the Author</h3>
                <div className="flex items-start space-x-4">
                  <img 
                    src={blogPost.authorImage} 
                    alt={blogPost.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">{blogPost.author}</h4>
                    <p className="text-primary-600 dark:text-primary-400 mb-3">{blogPost.authorRole}</p>
                    <p className="text-gray-700 dark:text-gray-300">{blogPost.authorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Social Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Share & Save</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Article
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Heart className="mr-2 h-4 w-4" />
                      Like ({blogPost.likes})
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Bookmark ({blogPost.bookmarks})
                    </button>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(post => (
                      <Link 
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                  <p className="text-primary-100 text-sm mb-4">Get the latest insights delivered to your inbox.</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;