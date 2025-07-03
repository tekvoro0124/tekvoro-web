import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const ThoughtLeadershipPage = () => {
  const articles = [
    {
      id: 1,
      title: 'The Future of AI in Business Transformation',
      excerpt: 'Exploring how artificial intelligence is reshaping industries and creating new opportunities for innovation and growth.',
      author: 'Musugu Sanjeev',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI & Technology',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true
    },
    {
      id: 2,
      title: 'Building Scalable Cloud Infrastructure',
      excerpt: 'Best practices for designing and implementing cloud solutions that grow with your business needs.',
      author: 'Priya Sharma',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Cloud Computing',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'The Rise of IoT in Smart Cities',
      excerpt: 'How Internet of Things technology is transforming urban infrastructure and improving quality of life.',
      author: 'Rajesh Kumar',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'IoT',
      image: 'https://images.pexels.com/photos/3912472/pexels-photo-3912472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: 'Cybersecurity in the Digital Age',
      excerpt: 'Essential strategies for protecting your business from evolving cyber threats and maintaining data security.',
      author: 'Priya Sharma',
      date: '2023-12-28',
      readTime: '9 min read',
      category: 'Cybersecurity',
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      title: 'User Experience Design Trends for 2024',
      excerpt: 'Latest trends and best practices in UX design that will shape digital experiences in the coming year.',
      author: 'Musugu Sanjeev',
      date: '2023-12-20',
      readTime: '5 min read',
      category: 'Design',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Thought Leadership"
        description="Insights, trends, and expert perspectives on technology, innovation, and digital transformation."
        bgImage="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section px-4">
        <div className="container-custom">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8">Featured Article</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-auto">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                        {featuredArticle.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {featuredArticle.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(featuredArticle.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {featuredArticle.readTime}
                        </div>
                      </div>
                      <Link 
                        to={`/insights/article/${featuredArticle.id}`}
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline inline-flex items-center"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Regular Articles */}
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <Link 
                      to={`/insights/article/${article.id}`}
                      className="text-primary-600 dark:text-primary-400 font-medium hover:underline inline-flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThoughtLeadershipPage;