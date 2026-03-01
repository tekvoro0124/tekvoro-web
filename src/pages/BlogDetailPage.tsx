// @ts-nocheck
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Loader } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import contentService from '../services/contentService';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  author?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  readTime?: number;
  views?: number;
  featured?: boolean;
  imageUrl?: string;
}

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('Invalid blog post');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch the blog post by slug
        const response = await contentService.getBlogPosts();
        const foundPost = response.find((p: any) => p.slug === slug || p.slug.includes(slug));

        if (!foundPost) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }

        setPost(foundPost);

        // Find related posts (same category or shared tags)
        const related = response
          .filter(
            (p: any) =>
              p.slug !== slug &&
              (p.category === foundPost.category ||
                (p.tags && foundPost.tags && p.tags.some((t: string) => foundPost.tags?.includes(t))))
          )
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin text-blue-600" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No date';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>{post.title} | Tekvoro Blog</title>
        <meta name="description" content={post.description || post.content?.substring(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.content?.substring(0, 160)} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Navbar />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Badge */}
        {post.category && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400 text-sm">
          {post.author && (
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formattedDate}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.readTime} min read</span>
            </div>
          )}
          {post.views !== undefined && (
            <div className="flex items-center gap-2">
              <span>👁️ {post.views} views</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-12"
            />
          )}

          {/* Description */}
          {post.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic border-l-4 border-blue-500 pl-4">
              {post.description}
            </p>
          )}

          {/* Content */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag size={20} />
            Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Share2 size={20} />
          Share This Post
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(window.location.href)}`,
                '_blank'
              )
            }
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Twitter
          </button>
          <button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`,
                '_blank'
              )
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            LinkedIn
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <Link
                key={relPost._id}
                to={`/blog/${relPost.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {relPost.category && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded mb-2">
                      {relPost.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {relPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {relPost.description || relPost.content?.substring(0, 100)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{relPost.readTime || 5} min read</span>
                    <span>{new Date(relPost.createdAt || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
