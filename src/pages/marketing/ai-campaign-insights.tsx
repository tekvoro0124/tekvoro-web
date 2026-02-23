/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Download, FileText, Mail, User, LogOut, Plus, X, Edit, Trash2, CalendarIcon, Send, Eye, BarChart3, Share2, TrendingUp, Twitter, Linkedin, Facebook, Instagram, Clock, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { campaigns } from '../../data/campaigns';
import { useAuth } from '../../context/AuthContext';

// --- ANALYTICS UTILITY ---
const trackEvent = (eventName: string, data?: any) => {
  // Simple analytics tracking - can be replaced with Google Analytics, Mixpanel, etc.
  console.log(`[Analytics] ${eventName}:`, data);
  
  // Example: Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data);
  }
  
  // Example: Send to custom endpoint
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event: eventName, data }) });
};

// --- COMPONENTS ---

// Note: These components are defined but not currently used in the main page layout
// They can be used for future campaign page templates or specific campaign types

// 1. Page Header
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PageHeader({ title }: { title: string }) {
  return (
    <header className="bg-[#0E2F44] py-8 px-4 text-white text-center rounded-b-3xl shadow-lg">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
    </header>
  );
}

// 2. Campaign Summary
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CampaignSummary({ summary, date }: { summary: string; date?: string }) {
  return (
    <section className="py-6 px-4 max-w-2xl mx-auto">
      <p className="text-lg text-gray-800 font-medium mb-2">{summary}</p>
      {date && <span className="text-xs text-gray-500">{date}</span>}
    </section>
  );
}

// 3. Results Block
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ResultsBlock({ results }: { results: { label: string; value: string }[] }) {
  return (
    <section className="py-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {results.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-[#0E2F44]/10 rounded-2xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <span className="text-2xl font-bold text-[#0E2F44] mb-1">{r.value}</span>
            <span className="text-gray-600 text-sm">{r.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. Embedded Video or Demo Link
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function VideoBlock({ youtubeId, demoUrl }: { youtubeId?: string; demoUrl?: string }) {
  if (!youtubeId && !demoUrl) return null;
  return (
    <section className="py-6 px-4 flex flex-col items-center">
      {youtubeId ? (
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Campaign Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#00C6AE] text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#0E2F44] transition"
        >
          View Live Demo
        </a>
      )}
    </section>
  );
}

// 5. Downloadables / Assets
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DownloadCard({ label, href, icon }: { label: string; href: string; icon?: React.ReactNode }) {
  const handleDownload = () => {
    trackEvent('asset_download', { asset: label, url: href });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white border border-[#0E2F44]/10 rounded-xl px-5 py-4 shadow hover:bg-[#00C6AE]/10 transition"
      download
      onClick={handleDownload}
    >
      <span className="text-[#00C6AE]">{icon || <Download />}</span>
      <span className="font-medium text-[#0E2F44]">{label}</span>
    </a>
  );
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Downloadables({ assets }: { assets: { label: string; href: string; icon?: React.ReactNode }[] }) {
  if (!assets.length) return null;
  return (
    <section className="py-6 px-4 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-[#0E2F44] mb-3">Downloadables & Assets</h3>
      <div className="flex flex-col gap-3">
        {assets.map((a, i) => (
          <DownloadCard key={i} {...a} />
        ))}
      </div>
    </section>
  );
}

// 6. Contact Team Section
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ContactTeam({ team }: { team: { name: string; role: string; email: string }[] }) {
  return (
    <section className="py-6 px-4 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-[#0E2F44] mb-3">Marketing Team Contacts</h3>
      <ul className="space-y-3">
        {team.map((member, i) => (
          <li
            key={i}
            className="flex items-center gap-4 bg-white border border-[#0E2F44]/10 rounded-xl px-5 py-4 shadow"
          >
            <User className="text-[#00C6AE] w-5 h-5" />
            <div className="flex-1">
              <div className="font-medium text-[#0E2F44]">{member.name}</div>
              <div className="text-xs text-gray-500">{member.role}</div>
            </div>
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-1 text-[#00C6AE] hover:underline text-sm"
            >
              <Mail className="w-4 h-4" /> {member.email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// 7. Internal CTA
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InternalCTA({ label, href }: { label: string; href: string }) {
  const handleCTAClick = () => {
    trackEvent('cta_click', { cta: label, url: href });
  };

  return (
    <section className="py-6 px-4 flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#00C6AE] text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-[#0E2F44] transition text-lg"
        onClick={handleCTAClick}
      >
        {label}
      </a>
    </section>
  );
}

// 8. Feedback Button
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FeedbackButton() {
  const handleFeedback = () => {
    trackEvent('feedback_click');
    window.open('mailto:marketing@tekvoro.com?subject=AI Campaign Insights Feedback', '_blank');
  };

  return (
    <section className="py-4 px-4 flex justify-center">
      <button
        onClick={handleFeedback}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#0E2F44] transition-colors"
      >
        <span>💬</span>
        Suggest an Edit
      </button>
    </section>
  );
}

// --- MAIN PAGE ---

interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  publishedDate?: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
  imageUrl?: string;
  hashtags?: string[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  publishedDate?: string;
  views: number;
  readTime: string;
  author: string;
  tags: string[];
}

interface PostFormData {
  platform: string;
  content: string;
  scheduledDate: string;
  imageUrl: string;
  hashtags: string;
}

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string;
  status: 'draft' | 'published';
}

export default function AiCampaignInsightsPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialMediaPost | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPost, setDeletingPost] = useState<SocialMediaPost | null>(null);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    tags: '',
    status: 'draft'
  });
  const [postFormData, setPostFormData] = useState<PostFormData>({
    platform: 'twitter',
    content: '',
    scheduledDate: '',
    imageUrl: '',
    hashtags: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Debug function to log form data changes
  const updatePostFormData = (updates: Partial<PostFormData>) => {
    setPostFormData(prev => {
      const newData = { ...prev, ...updates };
      return newData;
    });
  };

  // Find campaign data
  const campaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  // Social media posts data
  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPost[]>([
    {
      id: '1',
      platform: 'twitter',
      content: '🚀 Exciting news! Tekvoro Technologies is revolutionizing AI solutions in Hyderabad. Our cutting-edge machine learning algorithms are helping businesses achieve 300% efficiency gains. #AI #Innovation #Hyderabad #Tech',
      status: 'published',
      publishedDate: '2024-04-20 10:30',
      engagement: { likes: 45, shares: 12, comments: 8, clicks: 23 },
      hashtags: ['AI', 'Innovation', 'Hyderabad', 'Tech']
    },
    {
      id: '2',
      platform: 'linkedin',
      content: 'We\'re proud to announce that Tekvoro Technologies has been recognized as a leading AI solutions provider in Hyderabad. Our commitment to innovation and excellence continues to drive digital transformation across industries. #AI #Innovation #DigitalTransformation #Hyderabad',
      status: 'published',
      publishedDate: '2024-04-19 14:15',
      engagement: { likes: 89, shares: 34, comments: 15, clicks: 67 },
      hashtags: ['AI', 'Innovation', 'DigitalTransformation', 'Hyderabad']
    },
    {
      id: '3',
      platform: 'facebook',
      content: '🌟 Innovation meets excellence! At Tekvoro Technologies, we\'re not just building AI solutions - we\'re creating the future of business technology. Our team of experts is here to help your business thrive in the digital age. #Innovation #AI #Business #Technology',
      status: 'scheduled',
      scheduledDate: '2024-04-22 09:00',
      engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 },
      hashtags: ['Innovation', 'AI', 'Business', 'Technology']
    },
    {
      id: '4',
      platform: 'instagram',
      content: '🚀 The future is here! Swipe to see how our AI solutions are transforming businesses across Hyderabad. From predictive analytics to intelligent automation - we\'re making technology work smarter, not harder. #AI #Innovation #Hyderabad #Tech #Future',
      status: 'draft',
      engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 },
      hashtags: ['AI', 'Innovation', 'Hyderabad', 'Tech', 'Future']
    }
  ]);

  // Blog posts data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Future of AI in Business: 2024 Trends',
      excerpt: 'As we move into 2024, artificial intelligence continues to reshape the business landscape. At Tekvoro Technologies, we\'re at the forefront of this transformation...',
      content: 'Full blog content here...',
      status: 'published',
      publishedDate: '2024-04-15',
      views: 1240,
      readTime: '5 min read',
      author: 'Marketing Team',
      tags: ['AI', 'Business', 'Trends', '2024']
    },
    {
      id: '2',
      title: 'How AI is Revolutionizing Customer Experience',
      excerpt: 'Customer experience has become the cornerstone of business success. Our AI solutions are helping companies create personalized, intelligent customer interactions...',
      content: 'Full blog content here...',
      status: 'published',
      publishedDate: '2024-04-12',
      views: 890,
      readTime: '4 min read',
      author: 'Content Team',
      tags: ['AI', 'Customer Experience', 'Personalization']
    },
    {
      id: '3',
      title: '5 Ways AI Can Transform Your Manufacturing Process',
      excerpt: 'Manufacturing companies are discovering the incredible potential of AI to optimize operations, reduce costs, and improve quality. Here are five key ways...',
      content: 'Full blog content here...',
      status: 'draft',
      views: 0,
      readTime: '6 min read',
      author: 'Technical Team',
      tags: ['AI', 'Manufacturing', 'Automation', 'Optimization']
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'facebook': return Facebook;
      case 'instagram': return Instagram;
      default: return Share2;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-400';
      case 'linkedin': return 'text-blue-600';
      case 'facebook': return 'text-blue-500';
      case 'instagram': return 'text-pink-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'scheduled': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPosts = selectedPlatform === 'all' 
    ? socialMediaPosts 
    : socialMediaPosts.filter(post => post.platform === selectedPlatform);

  // Post management functions
  const handleCreatePost = () => {
    const newPost: SocialMediaPost = {
      id: Date.now().toString(),
      platform: postFormData.platform as 'twitter' | 'linkedin' | 'facebook' | 'instagram',
      content: postFormData.content,
      status: postFormData.scheduledDate ? 'scheduled' : 'draft',
      scheduledDate: postFormData.scheduledDate || undefined,
      engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 },
      hashtags: postFormData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: postFormData.imageUrl || undefined
    };

    setSocialMediaPosts(prevPosts => [...prevPosts, newPost]);
    
    setShowCreatePost(false);
    setPostFormData({
      platform: 'twitter',
      content: '',
      scheduledDate: '',
      imageUrl: '',
      hashtags: ''
    });
  };

  const handleEditPost = (post: SocialMediaPost) => {
    setEditingPost(post);
    setPostFormData({
      platform: post.platform,
      content: post.content,
      scheduledDate: post.scheduledDate || '',
      imageUrl: post.imageUrl || '',
      hashtags: post.hashtags?.join(', ') || ''
    });
    setShowEditPost(true);
  };

  const handleUpdatePost = () => {
    if (!editingPost) return;

    setSocialMediaPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              platform: postFormData.platform as 'twitter' | 'linkedin' | 'facebook' | 'instagram',
              content: postFormData.content,
              status: (postFormData.scheduledDate ? 'scheduled' : 'draft') as 'draft' | 'scheduled' | 'published',
              scheduledDate: postFormData.scheduledDate || undefined,
              hashtags: postFormData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag),
              imageUrl: postFormData.imageUrl || undefined
            }
          : post
      );
      return updatedPosts;
    });

    setShowEditPost(false);
    setEditingPost(null);
    setPostFormData({
      platform: 'twitter',
      content: '',
      scheduledDate: '',
      imageUrl: '',
      hashtags: ''
    });
  };

  const handleDeletePost = (post: SocialMediaPost) => {
    setDeletingPost(post);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePost = () => {
    if (!deletingPost) return;

    setSocialMediaPosts(prevPosts => {
      const updatedPosts = prevPosts.filter(post => post.id !== deletingPost.id);
      return updatedPosts;
    });
    
    setShowDeleteConfirm(false);
    setDeletingPost(null);
  };

  const handlePublishPost = (post: SocialMediaPost) => {
    setSocialMediaPosts(prevPosts => {
      const updatedPosts = prevPosts.map(p => 
        p.id === post.id 
          ? { ...p, status: 'published' as const, publishedDate: new Date().toLocaleString() }
          : p
      );
      return updatedPosts;
    });
  };

  const handleSchedulePost = (post: SocialMediaPost) => {
    setSocialMediaPosts(prevPosts => {
      const updatedPosts = prevPosts.map(p => 
        p.id === post.id 
          ? { ...p, status: 'scheduled' as const, scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString() }
          : p
      );
      return updatedPosts;
    });
  };

  // Social media integration functions
  const publishToSocialMedia = async (post: SocialMediaPost) => {
    // Simulate API calls to social media platforms
    console.log(`Publishing to ${post.platform}:`, post.content);
    
    // Here you would integrate with actual social media APIs
    // Twitter API, LinkedIn API, Facebook API, Instagram API
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update post status
      handlePublishPost(post);
      
      alert(`Successfully published to ${post.platform}!`);
    } catch (error) {
      alert(`Failed to publish to ${post.platform}. Please try again.`);
    }
  };

  // Blog editor functions
  const handleCreateBlog = () => {
    setBlogFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      tags: '',
      status: 'draft'
    });
    setEditingBlog(null);
    setShowBlogEditor(true);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setBlogFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      tags: blog.tags.join(', '),
      status: blog.status
    });
    setEditingBlog(blog);
    setShowBlogEditor(true);
  };

  const handleSaveBlog = () => {
    if (!blogFormData.title.trim() || !blogFormData.content.trim()) {
      alert('Please fill in the title and content fields.');
      return;
    }

    const newBlog: BlogPost = {
      id: editingBlog?.id || Date.now().toString(),
      title: blogFormData.title,
      excerpt: blogFormData.excerpt,
      content: blogFormData.content,
      author: blogFormData.author || 'Admin User',
      tags: blogFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: blogFormData.status,
      publishedDate: blogFormData.status === 'published' ? new Date().toISOString() : undefined,
      views: editingBlog?.views || 0,
      readTime: `${Math.ceil(blogFormData.content.split(' ').length / 200)} min read`
    };

    if (editingBlog) {
      setBlogPosts(prev => prev.map(blog => blog.id === editingBlog.id ? newBlog : blog));
    } else {
      setBlogPosts(prev => [...prev, newBlog]);
    }

    setShowBlogEditor(false);
    setEditingBlog(null);
    setBlogFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      tags: '',
      status: 'draft'
    });
  };

  const handleDeleteBlog = (blog: BlogPost) => {
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      setBlogPosts(prev => prev.filter(b => b.id !== blog.id));
    }
  };

  const updateBlogFormData = (updates: Partial<BlogFormData>) => {
    setBlogFormData(prev => ({ ...prev, ...updates }));
  };

  // Track page visit on component mount
  useEffect(() => {
    trackEvent('page_view', { page: 'ai-campaign-insights' });
  }, []);

  return (
    <>
      <SEO
        title="AI Campaign Insights - Internal"
        description="Internal AI campaign insights and analytics dashboard"
        noIndex={true}
      />
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        
        {/* Floating Logout Button */}
        <div className="fixed top-24 right-4 z-50">
          <button 
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 border-2 border-red-400 shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
        
        <main className="flex-1 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-yellow-400" />
                    {campaign.title} - Marketing Campaign
                  </h1>
                  <p className="text-gray-400">Internal marketing campaign insights and content management</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowCreatePost(true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Post
                  </button>
                  <button 
                    onClick={handleCreateBlog}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    New Blog
                  </button>
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Reach', value: '45.2K', icon: Eye, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Engagement Rate', value: '8.7%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                  { label: 'Social Posts', value: socialMediaPosts.length.toString(), icon: Share2, color: 'from-purple-500 to-pink-500' },
                  { label: 'Blog Posts', value: blogPosts.length.toString(), icon: FileText, color: 'from-orange-500 to-red-500' }
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg p-1.5 text-white`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'social', label: 'Social Media', icon: Share2 },
                  { id: 'blog', label: 'Blog Content', icon: FileText },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-yellow-400 text-black' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 overflow-hidden"
            >
              {activeTab === 'overview' && (
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Campaign Overview</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-4">Campaign Performance</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Total Reach</span>
                          <span className="text-white font-semibold">45.2K</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Engagement Rate</span>
                          <span className="text-white font-semibold">8.7%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-4">Content Summary</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Social Media Posts</span>
                          <span className="text-white font-semibold">{socialMediaPosts.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Blog Posts</span>
                          <span className="text-white font-semibold">{blogPosts.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Published</span>
                          <span className="text-white font-semibold">{socialMediaPosts.filter(p => p.status === 'published').length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Scheduled</span>
                          <span className="text-white font-semibold">{socialMediaPosts.filter(p => p.status === 'scheduled').length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Social Media Posts</h3>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="all">All Platforms</option>
                      <option value="twitter">Twitter/X</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    {filteredPosts.map((post, idx) => {
                      const PlatformIcon = getPlatformIcon(post.platform);
                      return (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="bg-white/5 rounded-xl p-6 border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <PlatformIcon className={`w-6 h-6 ${getPlatformColor(post.platform)}`} />
                              <span className="text-white font-semibold capitalize">{post.platform}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)} text-white`}>
                                {post.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEditPost(post)}
                                className="p-2 text-blue-400 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {post.status === 'draft' && (
                                <button 
                                  onClick={() => handleSchedulePost(post)}
                                  className="p-2 text-yellow-400 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <CalendarIcon className="w-4 h-4" />
                                </button>
                              )}
                              {post.status === 'draft' && (
                                <button 
                                  onClick={() => publishToSocialMedia(post)}
                                  className="p-2 text-green-400 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeletePost(post)}
                                className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                          {post.hashtags && post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.hashtags.map((tag) => (
                                <span key={tag} className="text-blue-400 text-sm">#{tag}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              <span>❤️ {post.engagement.likes}</span>
                              <span>🔄 {post.engagement.shares}</span>
                              <span>💬 {post.engagement.comments}</span>
                              <span>👆 {post.engagement.clicks}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {post.status === 'scheduled' && (
                                <>
                                  <Clock className="w-4 h-4" />
                                  <span>{post.scheduledDate}</span>
                                </>
                              )}
                              {post.status === 'published' && (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span>{post.publishedDate}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'blog' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Blog Content</h3>
                    <button 
                      onClick={handleCreateBlog}
                      className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      New Blog Post
                    </button>
                  </div>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-white font-semibold mb-2">{post.title}</h4>
                            <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📖 {post.readTime}</span>
                              <span>👁️ {post.views} views</span>
                              <span>✍️ {post.author}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)} text-white`}>
                                {post.status}
                              </span>
                            </div>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {post.tags.map((tag) => (
                                  <span key={tag} className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded-full">#{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleEditBlog(post)}
                              className="p-2 text-blue-400 hover:bg-white/10 rounded-lg transition-colors"
                              title="Edit Blog Post"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                              className="p-2 text-green-400 hover:bg-white/10 rounded-lg transition-colors"
                              title="View Blog Post"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteBlog(post)}
                              className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                              title="Delete Blog Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {blogPosts.length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Blog Posts Yet</h3>
                        <p className="text-gray-500 mb-4">Create your first blog post to get started</p>
                        <button 
                          onClick={handleCreateBlog}
                          className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          Create First Blog Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Campaign Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-4">Platform Performance</h4>
                      <div className="space-y-4">
                        {['twitter', 'linkedin', 'facebook', 'instagram'].map((platform) => {
                          const PlatformIcon = getPlatformIcon(platform);
                          const posts = socialMediaPosts.filter(p => p.platform === platform);
                          const totalEngagement = posts.reduce((sum, post) => 
                            sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
                          );
                          return (
                            <div key={platform} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <PlatformIcon className={`w-5 h-5 ${getPlatformColor(platform)}`} />
                                <span className="text-gray-400 capitalize">{platform}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-white font-semibold">{posts.length} posts</div>
                                <div className="text-sm text-gray-500">{totalEngagement} engagement</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-4">Content Performance</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Best Performing Post</span>
                          <span className="text-white font-semibold">LinkedIn - 89 likes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Average Engagement</span>
                          <span className="text-white font-semibold">8.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Total Reach</span>
                          <span className="text-white font-semibold">45.2K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Click-through Rate</span>
                          <span className="text-white font-semibold">3.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Create New Post</h3>
                <button 
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                  <select
                    value={postFormData.platform}
                    onChange={(e) => updatePostFormData({ platform: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="twitter">Twitter/X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                  <textarea
                    value={postFormData.content}
                    onChange={(e) => updatePostFormData({ content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 h-32 resize-none"
                    placeholder="Write your post content here..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hashtags (comma separated)</label>
                  <input
                    type="text"
                    value={postFormData.hashtags}
                    onChange={(e) => updatePostFormData({ hashtags: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                    placeholder="AI, Innovation, Technology"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Schedule Date (optional)</label>
                  <input
                    type="datetime-local"
                    value={postFormData.scheduledDate}
                    onChange={(e) => updatePostFormData({ scheduledDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={postFormData.imageUrl}
                    onChange={(e) => updatePostFormData({ imageUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Create Post
                </button>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Post Modal */}
        {showEditPost && editingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Edit Post</h3>
                <button 
                  onClick={() => setShowEditPost(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                  <select
                    value={postFormData.platform}
                    onChange={(e) => updatePostFormData({ platform: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="twitter">Twitter/X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                  <textarea
                    value={postFormData.content}
                    onChange={(e) => updatePostFormData({ content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 h-32 resize-none"
                    placeholder="Write your post content here..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hashtags (comma separated)</label>
                  <input
                    type="text"
                    value={postFormData.hashtags}
                    onChange={(e) => updatePostFormData({ hashtags: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                    placeholder="AI, Innovation, Technology"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Schedule Date (optional)</label>
                  <input
                    type="datetime-local"
                    value={postFormData.scheduledDate}
                    onChange={(e) => updatePostFormData({ scheduledDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={postFormData.imageUrl}
                    onChange={(e) => updatePostFormData({ imageUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdatePost}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Update Post
                </button>
                <button
                  onClick={() => setShowEditPost(false)}
                  className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && deletingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Delete Post</h3>
                <p className="text-gray-400 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                
                <div className="flex gap-4">
                  <button
                    onClick={confirmDeletePost}
                    className="flex-1 bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Blog Editor Modal */}
        {showBlogEditor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Blog Editor</h3>
                <button 
                  onClick={() => setShowBlogEditor(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={blogFormData.title}
                    onChange={(e) => updateBlogFormData({ title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                  <textarea
                    value={blogFormData.excerpt}
                    onChange={(e) => updateBlogFormData({ excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 h-32 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                  <textarea
                    value={blogFormData.content}
                    onChange={(e) => updateBlogFormData({ content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 h-32 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={blogFormData.author}
                    onChange={(e) => updateBlogFormData({ author: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={blogFormData.tags}
                    onChange={(e) => updateBlogFormData({ tags: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                    placeholder="AI, Innovation, Technology"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={blogFormData.status}
                    onChange={(e) => updateBlogFormData({ status: e.target.value as 'draft' | 'published' })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveBlog}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Save Blog
                </button>
                <button
                  onClick={() => setShowBlogEditor(false)}
                  className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
} 