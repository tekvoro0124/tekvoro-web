import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import NewsArticleCard from '../components/search/NewsArticleCard';
import NewsFilterSidebar from '../components/search/NewsFilterSidebar';

interface SearchResult {
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
}

interface FilterData {
  category: string[];
  source: string[];
  companies: string[];
  minTrustScore: number;
}

const NewsSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [trending, setTrending] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    category: [],
    source: [],
    companies: [],
    minTrustScore: 40
  });

  const resultsPerPage = 10;

  // Perform search
  useEffect(() => {
    if (query.trim()) {
      performSearch();
    }
  }, [query, page, filters]);

  // Fetch trending on mount
  useEffect(() => {
    if (!query.trim()) {
      fetchTrending();
    }
  }, []);

  const performSearch = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/news/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          limit: resultsPerPage,
          skip: (page - 1) * resultsPerPage,
          ...filters
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setResults(data.data.results);
        setTotalResults(data.data.total);
        setTrending(data.data.trending);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err) {
      setError('Failed to perform search');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrending = async () => {
    try {
      const response = await fetch('/api/news/trending?limit=5');
      const data = await response.json();
      setTrending(data.data || []);
    } catch (error) {
      console.error('Failed to fetch trending:', error);
    }
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <>
      <SEO
        title={query ? `Search: ${query} | Tekvoro News` : 'Corporate News Search | Tekvoro'}
        description="Search trust-first corporate and industry news with AI-powered credibility scoring"
        ogType="website"
      />

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Search Header */}
        <section className="py-12 bg-gradient-to-r from-teal-600 to-teal-700">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Corporate News Intelligence
              </h1>
              <p className="text-teal-100 text-lg">
                Trust-first search across 1000+ credible industry sources
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <NewsFilterSidebar
                  filters={filters}
                  onFilterChange={(newFilters: FilterData) => {
                    setFilters(newFilters);
                    setPage(1);
                  }}
                />
              </div>

              {/* Results */}
              <div className="lg:col-span-3">
                {/* Search Info */}
                {query && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                  >
                    <p className="text-gray-600">
                      {loading ? (
                        'Searching...'
                      ) : (
                        <>
                          Found <span className="font-bold">{totalResults}</span>{' '}
                          results for "<span className="font-bold">{query}</span>"
                        </>
                      )}
                    </p>
                  </motion.div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-teal-600" />
                  </div>
                )}

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900">Search Error</h3>
                      <p className="text-red-700 text-sm mt-1">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                {!loading && !error && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {results.map((article, idx) => (
                      <NewsArticleCard
                        key={article._id}
                        article={article}
                        index={idx}
                      />
                    ))}
                  </motion.div>
                )}

                {/* No Results */}
                {!loading && !error && results.length === 0 && query && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600">
                      Try different keywords or adjust your filters
                    </p>
                  </motion.div>
                )}

                {/* No Query */}
                {!query && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Enter a search query
                    </h3>
                    <p className="text-gray-600">
                      Search for companies, industries, or topics
                    </p>
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center gap-2 mt-12"
                  >
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                      const pageNum = page > 3 ? page - 2 + idx : idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-4 py-2 rounded-lg transition ${
                            page === pageNum
                              ? 'bg-teal-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Trending Section */}
            {!query && trending.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 pt-12 border-t border-gray-200"
              >
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trending.map((article) => (
                    <NewsArticleCard
                      key={article._id}
                      article={article}
                      variant="compact"
                    />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NewsSearchPage;
