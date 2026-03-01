import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterData {
  category: string[];
  source: string[];
  companies: string[];
  minTrustScore: number;
}

interface NewsFilterSidebarProps {
  filters: FilterData;
  onFilterChange: (filters: FilterData) => void;
}

const NewsFilterSidebar: React.FC<NewsFilterSidebarProps> = ({
  filters,
  onFilterChange
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    category: true,
    trustScore: true,
    source: true,
    companies: false
  });

  const categories = [
    { id: 'technology', label: 'Technology', icon: '🖥️' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'finance', label: 'Finance', icon: '📈' },
    { id: 'startup', label: 'Startups', icon: '🚀' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'policy', label: 'Policy', icon: '📋' },
    { id: 'ai-ml', label: 'AI & ML', icon: '🤖' },
    { id: 'cloud', label: 'Cloud', icon: '☁️' }
  ];

  const sources = [
    'Economic Times',
    'Business Standard',
    'TechCrunch',
    'YourStory',
    'Inc42',
    'HackerNews'
  ];

  const companies = [
    'Google',
    'Apple',
    'Microsoft',
    'Amazon',
    'Tesla',
    'Meta',
    'OpenAI',
    'IBM',
    'Oracle',
    'Salesforce'
  ];

  const trustScores = [
    { value: 40, label: 'All (40+)' },
    { value: 60, label: 'Trusted (60+)' },
    { value: 75, label: 'High Trust (75+)' },
    { value: 85, label: 'Verified (85+)' }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = (categId: string) => {
    const updated = filters.category.includes(categId)
      ? filters.category.filter(c => c !== categId)
      : [...filters.category, categId];

    onFilterChange({ ...filters, category: updated });
  };

  const toggleSource = (source: string) => {
    const updated = filters.source.includes(source)
      ? filters.source.filter(s => s !== source)
      : [...filters.source, source];

    onFilterChange({ ...filters, source: updated });
  };

  const toggleCompany = (company: string) => {
    const updated = filters.companies.includes(company)
      ? filters.companies.filter(c => c !== company)
      : [...filters.companies, company];

    onFilterChange({ ...filters, companies: updated });
  };

  const handleTrustScoreChange = (score: number) => {
    onFilterChange({ ...filters, minTrustScore: score });
  };

  const handleReset = () => {
    onFilterChange({
      category: [],
      source: [],
      companies: [],
      minTrustScore: 40
    });
  };

  const activeFiltersCount =
    filters.category.length +
    filters.source.length +
    filters.companies.length +
    (filters.minTrustScore > 40 ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-20 bg-white rounded-xl border border-gray-200 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg flex items-center gap-2 text-gray-900">
          <Filter className="w-5 h-5 text-teal-600" />
          Filters
        </h2>
        {activeFiltersCount > 0 && (
          <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleReset}
          className="w-full text-xs text-teal-600 hover:text-teal-700 font-semibold mb-4 py-2 px-3 rounded-lg hover:bg-teal-50 transition"
        >
          Reset Filters
        </button>
      )}

      {/* Categories Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Categories</span>
          <motion.div
            animate={{ rotate: expandedSections.category ? 180 : 0 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSections.category ? 'auto' : 0,
            opacity: expandedSections.category ? 1 : 0
          }}
          className="overflow-hidden space-y-2 mt-2"
        >
          {categories.map(cat => (
            <label
              key={cat.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition group"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="w-4 h-4 rounded border-gray-300 text-teal-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {cat.icon} {cat.label}
              </span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* Trust Score Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('trustScore')}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Trust Score</span>
          <motion.div
            animate={{ rotate: expandedSections.trustScore ? 180 : 0 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSections.trustScore ? 'auto' : 0,
            opacity: expandedSections.trustScore ? 1 : 0
          }}
          className="overflow-hidden space-y-2 mt-2"
        >
          {trustScores.map(score => (
            <label
              key={score.value}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition group"
            >
              <input
                type="radio"
                name="trustScore"
                checked={filters.minTrustScore === score.value}
                onChange={() => handleTrustScoreChange(score.value)}
                className="w-4 h-4 text-teal-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {score.label}
              </span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* Sources Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('source')}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">News Sources</span>
          <motion.div
            animate={{ rotate: expandedSections.source ? 180 : 0 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSections.source ? 'auto' : 0,
            opacity: expandedSections.source ? 1 : 0
          }}
          className="overflow-hidden space-y-2 mt-2"
        >
          {sources.map(source => (
            <label
              key={source}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition group"
            >
              <input
                type="checkbox"
                checked={filters.source.includes(source)}
                onChange={() => toggleSource(source)}
                className="w-4 h-4 rounded border-gray-300 text-teal-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {source}
              </span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* Companies Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('companies')}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Companies</span>
          <motion.div
            animate={{ rotate: expandedSections.companies ? 180 : 0 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSections.companies ? 'auto' : 0,
            opacity: expandedSections.companies ? 1 : 0
          }}
          className="overflow-hidden space-y-2 mt-2"
        >
          {companies.map(company => (
            <label
              key={company}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition group"
            >
              <input
                type="checkbox"
                checked={filters.companies.includes(company)}
                onChange={() => toggleCompany(company)}
                className="w-4 h-4 rounded border-gray-300 text-teal-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {company}
              </span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="text-xs text-teal-900 leading-relaxed">
          📊 <span className="font-semibold">Trust Scoring:</span> Our AI evaluates source reputation, content quality, and author expertise to rank results by credibility.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsFilterSidebar;
