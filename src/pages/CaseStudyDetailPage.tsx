// @ts-nocheck
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, TrendingUp, Loader, Tag, Award } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import contentService from '../services/contentService';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  client?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  imageUrl?: string;
  tags?: string[];
  createdAt?: string;
  views?: number;
  featured?: boolean;
}

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        setError('Invalid case study');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch all case studies
        const response = await contentService.getCaseStudies();
        const foundCaseStudy = response.find((cs: any) => cs.slug === slug || cs.slug.includes(slug));

        if (!foundCaseStudy) {
          setError('Case study not found');
          setLoading(false);
          return;
        }

        setCaseStudy(foundCaseStudy);

        // Find related case studies (same industry or shared tags)
        const related = response
          .filter(
            (cs: any) =>
              cs.slug !== slug &&
              (cs.industry === foundCaseStudy.industry ||
                (cs.tags && foundCaseStudy.tags && cs.tags.some((t: string) => foundCaseStudy.tags?.includes(t))))
          )
          .slice(0, 3);
        setRelatedCaseStudies(related);
      } catch (err) {
        console.error('Failed to fetch case study:', err);
        setError('Failed to load case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
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

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Case Study Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'The case study you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/see-case-studies')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Case Studies
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>{caseStudy.title} | Tekvoro Case Studies</title>
        <meta name="description" content={caseStudy.description} />
        <meta property="og:title" content={caseStudy.title} />
        <meta property="og:description" content={caseStudy.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/see-case-studies')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Case Studies
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Industry Badge */}
        {caseStudy.industry && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold flex items-center gap-2">
              <Award size={16} />
              {caseStudy.industry}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {caseStudy.title}
        </h1>

        {/* Client Info */}
        {caseStudy.client && (
          <div className="flex items-center gap-2 mb-8 text-lg text-gray-600 dark:text-gray-400">
            <Briefcase size={20} />
            <span className="font-semibold">{caseStudy.client}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{caseStudy.description}</p>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {caseStudy.imageUrl && (
          <img
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            className="w-full h-96 object-cover rounded-lg mb-12"
          />
        )}

        {caseStudy.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {caseStudy.content}
            </div>
          </div>
        )}
      </div>

      {/* Challenge Section */}
      {caseStudy.challenge && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Challenge</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {caseStudy.challenge}
            </p>
          </div>
        </div>
      )}

      {/* Solution Section */}
      {caseStudy.solution && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Solution</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {caseStudy.solution}
            </p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <TrendingUp size={28} className="text-green-600" />
            Results & Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.results.map((result, index) => (
              <div key={index} className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-gray-900 dark:text-white font-semibold text-lg">{result}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags Section */}
      {caseStudy.tags && caseStudy.tags.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag size={20} />
            Technologies & Topics
          </h3>
          <div className="flex flex-wrap gap-3">
            {caseStudy.tags.map((tag) => (
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

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-900 dark:to-purple-800 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Achieve Similar Results?</h2>
          <p className="text-purple-100 mb-8">Let's discuss how we can help your organization succeed</p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">More Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCaseStudies.map((relCS) => (
              <Link
                key={relCS._id}
                to={`/case-studies/${relCS.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {relCS.industry && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded mb-2">
                      {relCS.industry}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {relCS.title}
                  </h3>
                  {relCS.client && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">
                      {relCS.client}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relCS.description}
                  </p>
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

export default CaseStudyDetailPage;
