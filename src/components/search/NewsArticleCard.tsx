import React, { useState } from 'react';
import { ExternalLink, Share2, Bookmark, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  article: {
    _id: string;
    title: string;
    summary: string;
    url: string;
    source: {
      name: string;
      logo?: string;
    };
    trustScore: {
      overall: number;
    };
    publishedDate: string;
    category: string;
    aiAnalysis?: {
      keyInsights: string[];
      sentiment: string;
    };
    views?: number;
    shares?: number;
  };
  index?: number;
  variant?: 'default' | 'compact';
}

const NewsArticleCard: React.FC<ArticleCardProps> = ({
  article,
  index = 0,
  variant = 'default'
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const getTrustColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-green-50 border border-green-200';
    if (score >= 60) return 'text-blue-700 bg-blue-50 border border-blue-200';
    return 'text-amber-700 bg-amber-50 border border-amber-200';
  };

  const getTrustLabel = (score: number) => {
    if (score >= 80) return 'Highly Trusted';
    if (score >= 60) return 'Trusted';
    return 'Moderate Trust';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'technology': 'bg-blue-100 text-blue-800',
      'business': 'bg-purple-100 text-purple-800',
      'finance': 'bg-green-100 text-green-800',
      'startup': 'bg-orange-100 text-orange-800',
      'security': 'bg-red-100 text-red-800',
      'policy': 'bg-gray-100 text-gray-800',
      'ai-ml': 'bg-indigo-100 text-indigo-800',
      'cloud': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/news/article/${article._id}/save`, { method: 'POST' });
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/news/article/${article._id}/share`, { method: 'POST' });
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);

      if (navigator.share) {
        navigator.share({
          title: article.title,
          text: article.summary,
          url: article.url
        });
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const handleView = async () => {
    try {
      await fetch(`/api/news/article/${article._id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (variant === 'compact') {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleView}
        className="block group"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          className="bg-white rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-lg transition p-4"
        >
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-teal-700 transition">
            {article.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">{article.source.name}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTrustColor(article.trustScore.overall)}`}>
              {article.trustScore.overall}
            </span>
          </div>
        </motion.div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleView}
      className="block group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-xl transition overflow-hidden"
      >
        {/* Main Content */}
        <div className="p-6">
          {/* Header with Category and Trust Badge */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                {article.category.replace('-', ' ')}
              </span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getTrustColor(article.trustScore.overall)}`}>
                <CheckCircle className="w-3 h-3" />
                {article.trustScore.overall} Trust
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-3 group-hover:text-teal-700 transition mb-3">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {article.summary}
          </p>

          {/* Key Insights */}
          {article.aiAnalysis?.keyInsights && article.aiAnalysis.keyInsights.length > 0 && (
            <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="text-xs font-semibold text-teal-900 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Key Insight
              </div>
              <p className="text-xs text-teal-800 line-clamp-2">
                {article.aiAnalysis.keyInsights[0]}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="font-medium">{article.source.name}</span>
              <span>•</span>
              <span>{formatDate(article.publishedDate)}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium group/link"
              onClick={(e) => e.stopPropagation()}
            >
              Read Full Article
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition" />
            </a>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSave(e)}
                className={`p-2 rounded-lg transition ${
                  isSaved
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Save article"
              >
                <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleShare(e)}
                className={`p-2 rounded-lg transition ${
                  isShared
                    ? 'bg-green-50 text-green-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Share article"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  );
};

export default NewsArticleCard;
