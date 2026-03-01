import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Target, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Search,
  Star,
  Award,
  Calendar,
  CheckCircle,
  BarChart3,
  DollarSign,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import contentService from '../services/contentService';

const industries = ['All', 'Healthcare', 'FinTech', 'Retail', 'Manufacturing', 'Education', 'Government', 'Transportation'];

const SeeCaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const fetchedCaseStudies = await contentService.getCaseStudies();
        setCaseStudies(fetchedCaseStudies);
      } catch (err) {
        console.error('Failed to load case studies:', err);
        setCaseStudies([]);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    loadCaseStudies();
  }, []);

  const filteredCaseStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="relative overflow-hidden bg-black min-h-[40vh] flex flex-col items-center justify-center py-16 px-4">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading case studies...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black min-h-[40vh] flex flex-col items-center justify-center py-16 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Success Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8"
          >
            Real-world transformations powered by innovative technology solutions
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-950 py-16 px-4">
        <div className="container mx-auto">
          {/* Industry Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Filter by Industry
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedIndustry === industry
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Case Studies Grid */}
          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy._id || caseStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {caseStudy.image && (
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                      <img 
                        src={caseStudy.image} 
                        alt={caseStudy.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {caseStudy.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {caseStudy.client}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                        {caseStudy.industry}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {caseStudy.description || caseStudy.challenge}
                    </p>

                    {/* Results */}
                    {caseStudy.results && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Results
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {(Array.isArray(caseStudy.results) ? caseStudy.results : []).map((result: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {result.value} {result.metric}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    {caseStudy.technologies && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.technologies.map((tech: string, idx: number) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No case studies found for {selectedIndustry === 'All' ? 'this' : 'the selected'} category.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SeeCaseStudiesPage;
