import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
}

interface CorporateNewsSearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSubmit?: (query: string) => void;
}

const CorporateNewsSearchPopup: React.FC<CorporateNewsSearchPopupProps> = ({
  isOpen,
  onClose,
  onSearchSubmit
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [trending, setTrending] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Fetch suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimer.current);
    setLoading(true);

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/news/suggestions?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setSuggestions(data.data || []);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [searchQuery]);

  // Fetch trending articles on open
  useEffect(() => {
    if (isOpen && trending.length === 0) {
      fetchTrending();
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const fetchTrending = async () => {
    try {
      const response = await fetch('/api/news/trending?limit=6');
      if (!response.ok) throw new Error('Failed to fetch trending');
      const data = await response.json();
      setTrending(data.data || []);
    } catch (error) {
      console.error('Failed to fetch trending:', error);
      setTrending([]);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      onSearchSubmit?.(query);
      // Navigate to search results
      window.location.href = `/news-search?q=${encodeURIComponent(query)}`;
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSearch(suggestions[selectedIndex]);
      } else {
        handleSearch(searchQuery);
      }
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* Search Modal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-x-0 top-[15%] sm:top-1/4 flex justify-center items-start z-50 px-4 sm:px-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 w-full max-w-2xl">
          {/* Search Input */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3">
              <Search className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search news, companies, industries..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 text-base sm:text-lg outline-none bg-transparent text-gray-700 placeholder:text-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Results or Trending */}
          <div className="max-h-[50vh] sm:max-h-96 overflow-y-auto">
            {searchQuery ? (
              <>
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-3 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(suggestion)}
                        className={`w-full text-left px-6 py-3 flex items-center gap-3 transition ${
                          idx === selectedIndex
                            ? 'bg-teal-50 text-teal-900'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="p-6 flex justify-center">
                    <Loader className="w-5 h-5 animate-spin text-teal-600" />
                  </div>
                )}

                {/* No results */}
                {!loading && suggestions.length === 0 && searchQuery && (
                  <div className="p-6 text-center text-gray-500">
                    <p>No suggestions found. Press Enter to search.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Trending Articles */}
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2 flex items-center gap-2 uppercase">
                    <TrendingUp className="w-4 h-4" />
                    Trending Now
                  </div>
                  {trending.map(article => (
                    <a
                      key={article._id}
                      href={`/article/${article._id}`}
                      className="block px-3 py-3 hover:bg-gray-50 transition rounded-lg group"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {article.source.name}
                            </span>
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                              Trust: {article.trustScore.overall}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
            <div className="flex justify-between items-center gap-2">
              <span className="truncate">🔓 Trust-First Intelligence • AI-Powered Analysis</span>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                ESC to close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CorporateNewsSearchPopup;
