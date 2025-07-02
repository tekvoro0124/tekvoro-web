import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { Save, AlertCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const ContentEditor = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  
  // Dummy content data
  const [content, setContent] = useState({
    home: {
      heroTitle: 'Success by Innovation',
      heroSubtitle: 'We transform your digital presence with cutting-edge technologies and exceptional user experiences.',
      aboutTitle: 'About Tekvoro',
      aboutText: 'Tekvoro Technologies is an IT services company specializing in AI, web development, mobile apps, and custom software solutions. We believe in innovation that drives success for our clients.\n\nWith over a decade of experience, our team of experts delivers cutting-edge solutions that help businesses transform digitally and stay ahead in today\'s competitive market.'
    },
    about: {
      pageTitle: 'About Us',
      pageDescription: 'Learn more about our company, our mission, and the dedicated team behind Tekvoro Technologies.',
      storyTitle: 'Our Story',
      storyText: 'Founded with a vision to bridge the gap between technology and business needs, Tekvoro Technologies has been at the forefront of digital innovation since our inception.\n\nOur journey began with a small team of passionate developers and has grown into a comprehensive IT solutions provider with expertise across multiple domains including AI, web and mobile development, cloud services, and UI/UX design.\n\nToday, we pride ourselves on delivering innovative, scalable, and reliable solutions that help businesses of all sizes achieve their digital transformation goals.'
    },
    services: {
      pageTitle: 'Our Services',
      pageDescription: 'Discover our comprehensive range of technology solutions designed to drive innovation and growth for your business.',
      introTitle: 'Comprehensive IT Solutions',
      introText: 'At Tekvoro Technologies, we offer a wide range of IT services designed to help businesses thrive in the digital era. From cutting-edge AI solutions to robust web and mobile applications, we have the expertise to bring your vision to life.'
    }
  });
  
  const handleInputChange = (page: string, field: string, value: string) => {
    setContent(prevContent => ({
      ...prevContent,
      [page]: {
        ...prevContent[page as keyof typeof prevContent],
        [field]: value
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Content saved:', content);
      setIsSubmitting(false);
      setIsSuccessful(true);
      
      setTimeout(() => {
        setIsSuccessful(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Editor
          </h1>
          <Button 
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
        
        {isSuccessful && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Content updated successfully
                </h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <p>Your changes have been saved and published to the website.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'home'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('home')}
              >
                Homepage
              </button>
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About Us
              </button>
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'home' && (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={content.home.heroTitle}
                    onChange={(e) => handleInputChange('home', 'heroTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={content.home.heroSubtitle}
                    onChange={(e) => handleInputChange('home', 'heroSubtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    About Section Title
                  </label>
                  <input
                    type="text"
                    value={content.home.aboutTitle}
                    onChange={(e) => handleInputChange('home', 'aboutTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    About Section Text
                  </label>
                  <textarea
                    rows={5}
                    value={content.home.aboutText}
                    onChange={(e) => handleInputChange('home', 'aboutText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </form>
            )}
            
            {activeTab === 'about' && (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={content.about.pageTitle}
                    onChange={(e) => handleInputChange('about', 'pageTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Page Description
                  </label>
                  <input
                    type="text"
                    value={content.about.pageDescription}
                    onChange={(e) => handleInputChange('about', 'pageDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Story Section Title
                  </label>
                  <input
                    type="text"
                    value={content.about.storyTitle}
                    onChange={(e) => handleInputChange('about', 'storyTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Story Content
                  </label>
                  <textarea
                    rows={8}
                    value={content.about.storyText}
                    onChange={(e) => handleInputChange('about', 'storyText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </form>
            )}
            
            {activeTab === 'services' && (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={content.services.pageTitle}
                    onChange={(e) => handleInputChange('services', 'pageTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Page Description
                  </label>
                  <input
                    type="text"
                    value={content.services.pageDescription}
                    onChange={(e) => handleInputChange('services', 'pageDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Introduction Title
                  </label>
                  <input
                    type="text"
                    value={content.services.introTitle}
                    onChange={(e) => handleInputChange('services', 'introTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Introduction Text
                  </label>
                  <textarea
                    rows={4}
                    value={content.services.introText}
                    onChange={(e) => handleInputChange('services', 'introText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Note
                      </h3>
                      <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                        <p>
                          Service details (names, descriptions, features) can be edited in the individual service editor below.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ContentEditor;