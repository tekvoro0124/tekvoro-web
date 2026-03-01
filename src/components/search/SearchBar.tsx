import { useState, useRef, useEffect } from 'react';
import { Filter, X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import contentService from '../../services/contentService';

interface SearchBarProps {
  onAdvancedSearch?: () => void;
  placeholder?: string;
  className?: string;
  centered?: boolean;
}

const SearchBar = ({ onAdvancedSearch, placeholder = 'Search content...', className = '', centered = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const results = await contentService.getSearchSuggestions(query, 8);
        setSuggestions(results || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search failed:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const handleSearch = (searchTerm: string = query) => {
    if (searchTerm.length > 0) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (item: any) => {
    const title = item.title || item.name || '';
    setQuery('');
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(title)}`);
  };

  return (
    <div 
      className={`relative ${centered ? 'w-full max-w-xl mx-auto px-4 sm:px-0' : 'hidden md:block w-[280px]'} ${className}`}
    >
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full bg-white/90 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${centered ? 'px-5 py-3 text-base pr-14 shadow-lg' : 'px-4 py-2 text-sm pr-12'}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isLoading && <Loader size={16} className="animate-spin text-gray-400" />}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {/* Blog Posts */}
          {suggestions.filter((s) => s.type === 'blog').length > 0 && (
            <div className="border-b border-gray-100 last:border-b-0">
              <div className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50">Blog Posts</div>
              {suggestions
                .filter((s) => s.type === 'blog')
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700 truncate"
                  >
                    {item.title}
                  </button>
                ))}
            </div>
          )}

          {/* Services */}
          {suggestions.filter((s) => s.type === 'service').length > 0 && (
            <div className="border-b border-gray-100 last:border-b-0">
              <div className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50">Services</div>
              {suggestions
                .filter((s) => s.type === 'service')
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700 truncate"
                  >
                    {item.title}
                  </button>
                ))}
            </div>
          )}

          {/* Tags */}
          {suggestions.filter((s) => s.type === 'tag').length > 0 && (
            <div className="border-b border-gray-100 last:border-b-0">
              <div className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50">Tags</div>
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {suggestions
                  .filter((s) => s.type === 'tag')
                  .map((tag) => (
                    <button
                      key={tag.value}
                      onClick={() => {
                        setQuery('');
                        setIsOpen(false);
                        navigate(`/search?tag=${encodeURIComponent(tag.value)}`);
                      }}
                      className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                    >
                      #{tag.value}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Search All Button */}
          <div className="border-t border-gray-100 px-4 py-2">
            <button
              onClick={() => handleSearch()}
              className="w-full text-center py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Search All Results
            </button>
          </div>

          {/* Advanced Search Button */}
          {onAdvancedSearch && (
            <div className="border-t border-gray-100 px-4 py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdvancedSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                Advanced Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {isOpen && query.length > 0 && suggestions.length === 0 && !isLoading && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center"
        >
          <p className="text-sm text-gray-600 mb-3">No results found for "{query}"</p>
          {onAdvancedSearch && (
            <button
              onClick={() => {
                setIsOpen(false);
                onAdvancedSearch();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Filter size={16} />
              Advanced Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
