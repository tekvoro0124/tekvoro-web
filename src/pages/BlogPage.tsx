import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, TrendingUp, Users, ArrowRight, BookOpen, Search, Tag, UserCircle, X, Linkedin, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import contentService from '../services/contentService';

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [page, setPage] = useState(1);
  const [authorModal, setAuthorModal] = useState<any>(null);
  const [postModal, setPostModal] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load posts from content service
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = contentService.getBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  const filteredPosts = posts.filter(p =>
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase())) &&
    (selectedTag === '' || p.tags.includes(selectedTag))
  );
  
  const totalPages = Math.ceil(filteredPosts.length / 6);
  const paginatedPosts = filteredPosts.slice((page - 1) * 6, page * 6);

  // Calculate stats dynamically
  const stats = [
    { icon: <TrendingUp className="text-green-400" />, label: 'Posts', value: `${posts.length}+` },
    { icon: <Users className="text-blue-400" />, label: 'Authors', value: `${new Set(posts.map(p => p.author)).size}+` },
    { icon: <Star className="text-yellow-400" />, label: 'Avg. Read Time', value: `${Math.round(posts.reduce((acc, p) => acc + (p.readTime || 5), 0) / posts.length || 5)} min` },
  ];

  // Get unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));
  const trendingTags = allTags.slice(0, 7);

  // Get unique authors
  const authors = Array.from(new Set(posts.map(p => p.author))).map(author => ({
    name: author,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70)}.jpg`,
    bio: 'Expert in technology and digital transformation. Passionate about innovation and sharing insights.',
    linkedin: '#',
    twitter: '#'
  }));

  if (loading) {
    return (
      <>
        <SEO
          title="Blog & Insights - Tekvoro Technologies"
          description="Stay updated with the latest insights on AI, cloud computing, digital transformation, and technology trends."
          keywords="AI blog, technology insights, digital transformation blog"
          canonical="https://www.tekvoro.com/blog"
        />
        <Navbar />
        <div className="relative overflow-hidden bg-black min-h-[40vh] flex flex-col items-center justify-center py-16 px-4">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Blog & Insights - Tekvoro Technologies"
        description="Stay updated with the latest insights on AI, cloud computing, digital transformation, and technology trends. Expert analysis and thought leadership from Tekvoro Technologies."
        keywords="AI blog, technology insights, digital transformation blog, cloud computing articles, tech trends, AI news, innovation blog, technology consulting insights"
        canonical="https://www.tekvoro.com/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Tekvoro Technologies Blog",
          "description": "Insights and analysis on AI, cloud computing, and digital transformation",
          "url": "https://www.tekvoro.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies"
          }
        }}
      />
      <Navbar />
      <div className="relative overflow-hidden bg-black min-h-[40vh] flex flex-col items-center justify-center py-16 px-4">
        <motion.div className="absolute inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-80" />
          <Sparkles className="absolute top-10 left-10 text-pink-400 opacity-30 animate-pulse" size={80} />
          <Sparkles className="absolute bottom-10 right-10 text-blue-400 opacity-20 animate-pulse" size={60} />
        </motion.div>
        <motion.div className="relative z-10 flex flex-col items-center" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg animate-glow">
            <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
            Tekvoro Blog
                </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Insights, Trends & Innovation
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl text-center mb-6">
            Explore the latest in AI, cloud, UX, and digital transformation from our expert team and industry leaders.
          </p>
              </motion.div>
            </div>
      <div className="flex flex-wrap justify-center gap-6 py-8 bg-gradient-to-r from-black via-gray-900 to-gray-800">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} className="flex flex-col items-center bg-white/10 rounded-2xl px-6 py-4 min-w-[120px] shadow-lg backdrop-blur-md border border-white/20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }}>
            <span className="mb-2">{stat.icon}</span>
            <span className="text-2xl font-bold text-white drop-shadow-md">{stat.value}</span>
            <span className="text-xs text-gray-300 mt-1">{stat.label}</span>
          </motion.div>
        ))}
                  </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
          <div className="flex-1 flex items-center bg-white/10 rounded-full px-4 py-2 shadow-inner">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
              placeholder="Search blog posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
                  />
                </div>
          <div className="flex gap-2 mt-2 md:mt-0 overflow-x-auto">
            <span className="text-xs text-gray-400 mr-2">Trending:</span>
            {trendingTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-200 ${selectedTag === tag ? 'bg-gradient-to-r from-pink-500 to-yellow-400 text-black border-yellow-400' : 'bg-white/10 text-white border-white/20 hover:bg-pink-500/30'}`}
              >
                <Tag className="w-3 h-3 mr-1 inline-block" />{tag}
              </button>
            ))}
          </div>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post, i) => (
            <motion.div
              key={post.title}
              className={`relative bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-yellow-400/40 hover:scale-105 transition-transform duration-300 cursor-pointer group ${post.featured ? 'ring-2 ring-pink-400/60' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
              onClick={() => setPostModal(post)}
            >
              {post.featured && <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-pink-400/20 text-pink-300 text-xs font-semibold animate-pulse">Featured</span>}
              {/* Cover image */}
              <img src={post.coverImage} alt={post.title + ' cover'} className="w-full h-36 object-cover rounded-xl mb-3 border border-white/10 group-hover:border-yellow-400/40 transition" />
              <div className="flex items-center gap-3 mb-2">
                <UserCircle className="w-6 h-6 text-yellow-400 cursor-pointer" onClick={e => { e.stopPropagation(); setAuthorModal(post.author); }} />
                <span className="text-sm text-white font-bold cursor-pointer" onClick={e => { e.stopPropagation(); setAuthorModal(post.author); }}>{post.author.name}</span>
                <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full border-2 border-yellow-400 object-cover cursor-pointer" onClick={e => { e.stopPropagation(); setAuthorModal(post.author); }} />
                    </div>
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">{post.title}</h3>
              <span className="text-xs text-gray-300 mb-1 flex items-center gap-1"><Tag className="w-4 h-4" /> {post.tag}</span>
              <p className="text-gray-200 text-xs mb-1 text-center">{post.excerpt}</p>
              <span className="text-xs text-gray-400">{post.date}</span>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-2 text-pink-400 font-semibold hover:text-yellow-400 transition-colors text-sm"
                onClick={e => { e.preventDefault(); setPostModal(post); }}
              >
                Read More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
                  </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded-full bg-white/10 text-white font-bold disabled:opacity-40 hover:bg-pink-500/30 transition"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-white font-bold">Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 rounded-full bg-white/10 text-white font-bold disabled:opacity-40 hover:bg-pink-500/30 transition"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
                      </div>
                    </div>
      <div className="py-10 bg-gradient-to-r from-black via-gray-900 to-gray-800 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Star className="text-yellow-400 animate-pulse" /> What Our Readers Say
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2 w-full max-w-4xl">
          <motion.div className="min-w-[320px] bg-white/10 rounded-2xl p-6 shadow-lg border border-pink-400/20 flex flex-col items-center hover:scale-105 transition-transform duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <p className="text-gray-100 text-base italic mb-2">"Tekvoro's blog keeps me ahead of the curve in AI and tech."</p>
            <span className="text-xs text-pink-300 font-semibold">Ava T., Product Lead</span>
          </motion.div>
          <motion.div className="min-w-[320px] bg-white/10 rounded-2xl p-6 shadow-lg border border-pink-400/20 flex flex-col items-center hover:scale-105 transition-transform duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <p className="text-gray-100 text-base italic mb-2">"The insights and trends are always actionable and inspiring."</p>
            <span className="text-xs text-pink-300 font-semibold">Lucas M., CEO</span>
          </motion.div>
                        </div>
                      </div>
      <div className="py-12 bg-gradient-to-r from-pink-500/10 via-yellow-400/10 to-black flex flex-col items-center">
        <motion.h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center drop-shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          Want more insights? Subscribe to our newsletter!
        </motion.h2>
        <motion.a href="/subscribe" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
          <ArrowRight className="w-5 h-5" /> Subscribe
        </motion.a>
                      </div>
      {/* Author Modal */}
      <AnimatePresence>
        {authorModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAuthorModal(null)} aria-modal="true" role="dialog">
            <motion.div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 shadow-2xl w-[90vw] max-w-md border border-yellow-400/30 flex flex-col items-center" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" onClick={() => setAuthorModal(null)} aria-label="Close profile"><X className="w-5 h-5" /></button>
              <img src={authorModal.avatar} alt={authorModal.name + ' avatar'} className="w-24 h-24 rounded-full mb-3 border-4 border-yellow-400 shadow-lg object-cover" />
              <h3 className="text-2xl font-bold text-white mb-1 tracking-wide flex items-center gap-2">{authorModal.name}</h3>
              <p className="text-gray-200 text-sm mb-2 text-center">{authorModal.bio}</p>
              <div className="flex gap-2 mt-2 mb-2 justify-center">
                {authorModal.linkedin && <a href={authorModal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 text-blue-500 hover:scale-110 transition" /></a>}
                {authorModal.twitter && <a href={authorModal.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5 text-sky-400 hover:scale-110 transition" /></a>}
                    </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Post Modal */}
      <AnimatePresence>
        {postModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPostModal(null)} aria-modal="true" role="dialog">
            <motion.div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 shadow-2xl w-[90vw] max-w-2xl border border-pink-400/30 flex flex-col items-center max-h-[90vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" onClick={() => setPostModal(null)} aria-label="Close post"><X className="w-5 h-5" /></button>
              {/* Cover image */}
              <img src={postModal.coverImage} alt={postModal.title + ' cover'} className="w-full h-48 object-cover rounded-xl mb-4 border border-pink-400/30" />
              <h2 className="text-3xl font-bold text-white mb-2 text-center">{postModal.title}</h2>
              <div className="flex items-center gap-2 mb-2">
                <UserCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-white font-bold">{postModal.author.name}</span>
                <img src={postModal.author.avatar} alt={postModal.author.name} className="w-7 h-7 rounded-full border-2 border-yellow-400 object-cover" />
                <span className="text-xs text-gray-400">{postModal.date}</span>
                <span className="text-xs text-pink-400 ml-2"><Tag className="w-4 h-4 inline-block mr-1" />{postModal.tag}</span>
                    </div>
              <div className="mb-4 text-center">
                <p className="text-gray-300 text-sm mb-2">{postModal.author.bio}</p>
                <div className="flex gap-2 justify-center">
                  {postModal.author.linkedin && <a href={postModal.author.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 text-blue-500 hover:scale-110 transition" /></a>}
                  {postModal.author.twitter && <a href={postModal.author.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5 text-sky-400 hover:scale-110 transition" /></a>}
                </div>
              </div>
              <p className="text-gray-200 text-base mb-4 text-center">{postModal.excerpt}</p>
              <div className="text-gray-300 text-sm mb-4 text-center whitespace-pre-line">{postModal.body}</div>
              <div className="flex justify-between w-full mt-4">
                <button
                  className="px-4 py-2 rounded-full bg-white/10 text-white font-bold hover:bg-pink-500/30 transition"
                  onClick={() => {
                    const idx = posts.findIndex(p => p.title === postModal.title);
                    if (idx > 0) setPostModal(posts[idx - 1]);
                  }}
                  disabled={posts.findIndex(p => p.title === postModal.title) === 0}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-white/10 text-white font-bold hover:bg-pink-500/30 transition"
                  onClick={() => {
                    const idx = posts.findIndex(p => p.title === postModal.title);
                    if (idx < posts.length - 1) setPostModal(posts[idx + 1]);
                  }}
                  disabled={posts.findIndex(p => p.title === postModal.title) === posts.length - 1}
                >
                  Next
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-white/10 text-white font-bold hover:bg-yellow-400/30 transition"
                  onClick={() => { navigator.clipboard.writeText(window.location.href + '#' + postModal.title.replace(/\s+/g, '-').toLowerCase()); }}
                >
                  Share
                </button>
              </div>
              <button className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform duration-300 animate-glow" onClick={() => setPostModal(null)}>
                Back to Blog
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default BlogPage;
