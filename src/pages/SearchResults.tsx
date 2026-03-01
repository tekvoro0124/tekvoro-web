// @ts-nocheck
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Loader, Filter } from 'lucide-react';
import contentService from '../services/contentService';
import AdvancedSearch from '../components/search/AdvancedSearch';

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  views?: number;
  createdAt?: string;
  type: 'blog' | 'service' | 'case-study';
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';
  const type = searchParams.get('type') || 'all';
  const sortBy = searchParams.get('sortBy') || 'date';
  const order = searchParams.get('order') || 'desc';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [searchParams]);

  const fetchResults = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await contentService.searchAdvanced(query, {
        category: category || undefined,
        tag: tag || undefined,
        type: type !== 'all' ? type : undefined,
        sortBy,
        order: order as 'asc' | 'desc',
        page,
        limit: 12,
      });

      // Transform results to include type
      const transformedResults = (response?.data || []).map((item: any) => ({
        ...item,
        type: item.type || detectType(item),
      }));

      setResults(transformedResults);
      setResultCount(response?.total || 0);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to fetch search results. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const detectType = (item: any): 'blog' | 'service' | 'case-study' => {
    if (item.author) return 'blog';
    if (item.features) return 'service';
    if (item.results || item.client) return 'case-study';
    return 'blog';
  };

  const handleResultClick = (result: SearchResult) => {
    const baseRoute = result.type === 'blog' 
      ? '/blog' 
      : result.type === 'service' 
      ? '/services' 
      : '/case-studies';
    navigate(`${baseRoute}/${result.slug}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'service':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'case-study':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog':
        return 'Blog Post';
      case 'service':
        return 'Service';
      case 'case-study':
        return 'Case Study';
      default:
        return 'Content';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Search className="text-blue-600" size={28} />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Search Results
                </h1>
              </div>
              {query && (
                <p className="text-gray-600 dark:text-gray-400">
                  {resultCount === 0
                    ? `No results found for "${query}"`
                    : `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "${query}"`}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsAdvancedOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Active Filters */}
        {(category || tag || type !== 'all') && (
          <div className="mb-8 flex flex-wrap gap-2">
            {category && (
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                <span>Category: {category}</span>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('category');
                    navigate(`?${params.toString()}`);
                  }}
                  className="ml-1 font-bold hover:text-blue-600 dark:hover:text-blue-100"
                >
                  ×
                </button>
              </div>
            )}
            {tag && (
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                <span>Tag: {tag}</span>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('tag');
                    navigate(`?${params.toString()}`);
                  }}
                  className="ml-1 font-bold hover:text-green-600 dark:hover:text-green-100"
                >
                  ×
                </button>
              </div>
            )}
            {type !== 'all' && (
              <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                <span>Type: {getTypeLabel(type)}</span>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('type');
                    navigate(`?${params.toString()}`);
                  }}
                  className="ml-1 font-bold hover:text-purple-600 dark:hover:text-purple-100"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">Searching...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && results.length === 0 && query && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
            <Search className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => setIsAdvancedOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Filter size={18} />
              Advanced Search
            </button>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div
                key={result._id}
                onClick={() => handleResultClick(result)}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
              >
                {/* Type Badge */}
                <div className="px-6 pt-4 flex items-start justify-between">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                      result.type
                    )}`}
                  >
                    {getTypeLabel(result.type)}
                  </span>
                  {result.views && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {result.views} views
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 line-clamp-2">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {result.description || result.excerpt || 'No description available'}
                  </p>

                  {/* Tags */}
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {result.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          #{t}
                        </span>
                      ))}
                      {result.tags.length > 3 && (
                        <span className="inline-block px-2 py-1 text-gray-600 dark:text-gray-400 text-xs">
                          +{result.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    {result.category && <span>{result.category}</span>}
                    {result.createdAt && (
                      <span>
                        {new Date(result.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Read More
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !query && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-12 text-center border border-blue-200 dark:border-gray-700">
            <Search className="mx-auto mb-4 text-blue-400" size={48} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Start Searching
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Use the search bar to find blog posts, services, and case studies. You can also use
              advanced filters for more specific results.
            </p>
          </div>
        )}
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearch isOpen={isAdvancedOpen} onClose={() => setIsAdvancedOpen(false)} />
    </div>
  );
};

export default SearchResults;
