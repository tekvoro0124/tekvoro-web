import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';

type Section = {
  icon: string;
  title: string;
  color: string;
  items: ({ label: string; children?: string[]; to?: string })[];
};
const SECTIONS: Section[] = [
  {
    icon: '🟩',
    title: 'Mega Menu: Solutions',
    color: 'border-green-400',
    items: [
      {
        label: 'Digital Transformation',
        children: [
          'Enterprise Automation',
          'Innovation Strategy',
          'Legacy Modernization',
        ],
      },
      {
        label: 'AI & Machine Learning',
        children: [
          'Predictive Analytics',
          'Intelligent Systems',
          'AI Solutions',
        ],
      },
      {
        label: 'IoT & Smart Solutions',
        children: [
          'Connected Devices',
          'Smart Infrastructure',
        ],
      },
      {
        label: 'Cloud & Cybersecurity',
        children: [
          'Cloud Solutions',
          'Cybersecurity Solutions',
        ],
      },
      {
        label: 'Healthcare Technology',
        children: [
          'Telemedicine',
          'Healthcare AI',
          'Medical Devices',
        ],
      },
    ],
  },
  {
    icon: '🟨',
    title: 'Products',
    color: 'border-yellow-400',
    items: [
      { label: "What's New" },
      { label: 'Product Roadmap' },
      { label: 'Beta Programs' },
    ],
  },
  {
    icon: '🟪',
    title: 'Events',
    color: 'border-purple-400',
    items: [
      { label: 'Upcoming Webinars' },
      { label: 'Leadership Team' },
      { label: 'Tech Meetups' },
      { label: 'Hackathons & Challenges' },
    ],
  },
  {
    icon: '🟫',
    title: 'Tech Community',
    color: 'border-gray-700',
    items: [
      { label: 'Join Our Community' },
      { label: 'Blog & Insights' },
      { label: 'Contribute to Innovation' },
    ],
  },
  {
    icon: '🟥',
    title: 'Insights & Knowledge',
    color: 'border-red-500',
    items: [
      { label: 'Latest News' },
      { label: 'Industry Highlights' },
      { label: 'Press Releases' },
      { label: 'Executive Insights' },
      { label: 'Future Trends' },
      { label: 'Whitepapers' },
      { label: 'Case Studies' },
      { label: 'Events' },
      { label: 'Thought Leadership' },
    ],
  },
  {
    icon: '🟦',
    title: 'Internal',
    color: 'border-blue-400',
    items: [
      { label: 'Marketing Campaigns', to: '/marketing' },
    ],
  },
  {
    icon: '⬛',
    title: 'Footer Menus',
    color: 'border-gray-900',
    items: [
      { label: 'Client Portal' },
      { label: 'Support Center' },
      { label: 'Subscribe' },
    ],
  },
  {
    icon: '🟧',
    title: 'Client Tools',
    color: 'border-orange-400',
    items: [
      { label: 'Client Portal' },
      { label: 'Support Center' },
    ],
  },
  {
    icon: '🟨',
    title: 'Quick Links',
    color: 'border-yellow-400',
    items: [
      { label: 'Book a Demo' },
      { label: 'View Portfolio' },
      { label: 'See Case Studies' },
      { label: 'Read Insights' },
      { label: 'Subscribe' },
      { label: 'Support Center' },
    ],
  },
];

type Contact = {
  locations: string[];
  email: string;
  phone: string;
};
const CONTACT: Contact = {
  locations: [
    'Hyderabad, India',
    'Silicon Valley, USA',
    'London',
    'Berlin',
    'Singapore',
  ],
  email: 'info@tekvoro.com',
  phone: '+91 9709707725',
};

type Social = {
  label: string;
  icon: string;
  link: string;
};
const SOCIALS: Social[] = [
  { label: 'Facebook', icon: '🌐', link: '#' },
  { label: 'Instagram', icon: '🌐', link: '#' },
  { label: 'LinkedIn', icon: '🌐', link: '#' },
  { label: 'YouTube', icon: '🌐', link: '#' },
  { label: 'X (Twitter)', icon: '🌐', link: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localResults, setLocalResults] = useState<Array<{title: string, description: string, url: string, category: string}>>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Accessibility: focus trap and ESC key
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      // Focus trap
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = (overlayRef.current as HTMLElement).querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Close search modal on ESC
  useEffect(() => {
    if (!searchOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  // Overlay click to close
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  // Voice search logic
  function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      setListening(false);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    };
    recognitionRef.current = recognition;
    recognition.start();
  }
  function stopVoiceSearch() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  }

  // Fetch AI suggestions as user types (debounced)
  const fetchSuggestions = useCallback(async (q: string) => {
    if (!q) {
      setAiSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setAiError('');
    setShowSuggestions(true);
    
    // Check if we're in development mode
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      // Mock suggestions for development
      console.log('Development mode: Using mock suggestions');
      setTimeout(() => {
        setAiSuggestions([
          'AI Solutions and Services',
          'Cloud Computing Solutions', 
          'Digital Transformation Consulting'
        ]);
        setShowSuggestions(true);
      }, 400);
    } else {
      // Production: call Netlify function
      try {
        console.log('Production mode: Calling Netlify function');
        const res = await fetch('/.netlify/functions/ai-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `Suggest 3 search queries related to: ${q}` })
        });
        
        console.log('Response status:', res.status);
        console.log('Response headers:', Object.fromEntries(res.headers.entries()));
        
        let data;
        try {
          const responseText = await res.text();
          console.log('Response text:', responseText);
          
          if (!responseText) {
            throw new Error('Empty response from server');
          }
          
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse response:', parseError);
          setAiSuggestions([]);
          return;
        }
        
        if (!res.ok) {
          console.error('AI search failed with status:', res.status, data);
          setAiSuggestions([]);
          return;
        }
        
        if (data && data.error) {
          console.error('AI search returned error:', data.error);
          setAiSuggestions([]);
          return;
        }
        
        setAiSuggestions(data && data.suggestions && data.suggestions.length ? data.suggestions : []);
        setLocalResults(data && data.localResults ? data.localResults : []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('AI suggestions error:', error);
        setAiSuggestions([]);
      }
    }
  }, []);

  // Debounce suggestion fetch
  useEffect(() => {
    if (!searchOpen) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchValue) {
      debounceRef.current = setTimeout(() => fetchSuggestions(searchValue), 400);
    } else {
      setAiSuggestions([]);
      setShowSuggestions(false);
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchValue, searchOpen, fetchSuggestions]);

  // Submit search to AI
  const handleAiSearch = async (q?: string) => {
    setAiLoading(true);
    setAiError('');
    setAiAnswer('');
    setShowSuggestions(false);
    
    const query = q || searchValue;
    
    try {
      // Check if we're in development mode
      const isDevelopment = import.meta.env.DEV;
      
      let data;
      
      if (isDevelopment) {
        // Mock response for development
        console.log('Development mode: Using mock AI response');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        data = {
          answer: `I'm here to help with your query: "${query}". This is a development mode response. In production, this would provide a detailed AI-powered answer about Tekvoro's services, AI solutions, cloud computing, or digital transformation topics.`,
          suggestions: [
            'AI Solutions and Services',
            'Cloud Computing Solutions', 
            'Digital Transformation Consulting'
          ]
        };
      } else {
        // Production: call Netlify function
        try {
          console.log('Production mode: Calling Netlify function');
          const res = await fetch('/.netlify/functions/ai-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          });
          
          console.log('Response status:', res.status);
          console.log('Response headers:', Object.fromEntries(res.headers.entries()));
          
          let data;
          try {
            const responseText = await res.text();
            console.log('Response text:', responseText);
            
            if (!responseText) {
              throw new Error('Empty response from server');
            }
            
            data = JSON.parse(responseText);
          } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            // Fallback to demo response if function fails
            console.log('Falling back to demo response due to parse error');
            data = {
              answer: `I'm here to help with your query: "${query}". This is a fallback response since the AI service encountered an issue. Please try again later or contact support.`,
              suggestions: [
                'AI Solutions and Services',
                'Cloud Computing Solutions', 
                'Digital Transformation Consulting'
              ]
            };
          }
          
          if (!res.ok) {
            console.error('AI search failed with status:', res.status, data);
            // Fallback to demo response if function returns error
            console.log('Falling back to demo response due to HTTP error');
            data = {
              answer: `I'm here to help with your query: "${query}". This is a fallback response since the AI service encountered an issue (HTTP ${res.status}). Please try again later.`,
              suggestions: [
                'AI Solutions and Services',
                'Cloud Computing Solutions', 
                'Digital Transformation Consulting'
              ]
            };
          }
          
          if (data && data.error) {
            console.error('AI search returned error:', data.error);
            // Fallback to demo response if function returns error
            console.log('Falling back to demo response due to function error');
            data = {
              answer: `I'm here to help with your query: "${query}". This is a fallback response since the AI service encountered an issue: ${data.error}. Please try again later.`,
              suggestions: [
                'AI Solutions and Services',
                'Cloud Computing Solutions', 
                'Digital Transformation Consulting'
              ]
            };
          }
          
          setAiAnswer(data?.answer || 'No answer found.');
          setAiSuggestions(data?.suggestions || []);
        } catch (error) {
          console.error('AI search error:', error);
          // Final fallback if everything fails
          setAiAnswer(`I'm here to help with your query: "${query}". This is a fallback response since the AI service is temporarily unavailable. Please try again later.`);
          setAiSuggestions([
            'AI Solutions and Services',
            'Cloud Computing Solutions', 
            'Digital Transformation Consulting'
          ]);
        }
      }
      
      setAiAnswer(data?.answer || 'No answer found.');
      setAiSuggestions(data?.suggestions || []);
    } catch (err: any) {
      console.error('AI search error:', err);
      setAiError(err.message || 'AI search failed. Please try again later.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6 bg-transparent">
      <div className="flex items-center">
            <Logo />
      </div>
      <div className="flex items-center">
        {/* Search Icon */}
        <button
          className="mr-2 bg-white/80 text-black rounded-full border-2 border-gray-300 hover:border-yellow-400 transition focus:outline-none shadow-lg flex items-center justify-center w-12 h-12 group"
          aria-label="Open search"
          onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }}
          style={{ fontFamily: 'Inter, Satoshi, Manrope, sans-serif' }}
        >
          <Search className="w-6 h-6" />
        </button>
        {/* Animated hamburger menu button inside navbar */}
                <button
          className="ml-4 bg-white text-black rounded-full border-2 border-gray-300 hover:border-red-500 transition focus:outline-none shadow-lg flex items-center justify-center w-12 h-12 group"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          style={{ fontFamily: 'Inter, Satoshi, Manrope, sans-serif' }}
        >
          <span className="relative w-6 h-6 flex flex-col items-center justify-center">
            {/* Hamburger icon with animated bars */}
            <span className="absolute left-0 top-1 w-6 h-0.5 bg-black rounded transition-all duration-300 group-hover:rotate-45 group-hover:top-2.5"></span>
            <span className="absolute left-0 top-3 w-6 h-0.5 bg-black rounded transition-all duration-300 group-hover:opacity-0"></span>
            <span className="absolute left-0 top-5 w-6 h-0.5 bg-black rounded transition-all duration-300 group-hover:-rotate-45 group-hover:top-2.5"></span>
          </span>
                </button>
              </div>
      {/* Drawer overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] bg-white/80 dark:bg-neutral-900/90 backdrop-blur-xl flex justify-end"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={handleOverlayClick}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-full w-full sm:w-[80vw] max-w-5xl bg-transparent shadow-2xl flex flex-col relative focus:outline-none transition-colors duration-300 rounded-l-2xl"
              style={{ fontFamily: 'Inter, Satoshi, Manrope, sans-serif' }}
            >
              {/* Close button */}
            <button
                ref={closeBtnRef}
                className="absolute top-6 right-8 flex items-center justify-center w-12 h-12 text-3xl font-bold text-black dark:text-white bg-white dark:bg-neutral-900 border-2 border-gray-300 dark:border-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition z-10 focus:outline-none focus:ring-2 focus:ring-red-400"
                style={{ width: 48, height: 48 }}
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                autoFocus
              >
                &times;
              </button>
              {/* Mega menu content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SECTIONS.map((section: Section, idx) => (
                    <div
                      key={section.title}
                      className={`bg-white/80 dark:bg-neutral-900/80 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 px-5 pt-6 pb-5 flex flex-col transition-all duration-300 hover:shadow-lg ${idx !== 0 ? 'mt-2' : ''}`}
                      tabIndex={0}
                      aria-label={section.title}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-extrabold text-xl tracking-wide text-black dark:text-white hover:underline transition cursor-pointer focus:underline focus:outline-none">{section.title}</span>
                      </div>
                      <ul className="space-y-1">
                        {section.items.map((item: { label: string; children?: string[]; to?: string }) => (
                          <li key={item.label}>
                            {/* If the item is a top-level product, wrap in Link if needed */}
                            {section.title === 'Products' && !item.children ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === "What's New" ? (
                                  <Link to="/products/whats-new">{item.label}</Link>
                                ) : item.label === 'Product Roadmap' ? (
                                  <Link to="/products/product-roadmap">{item.label}</Link>
                                ) : item.label === 'Beta Programs' ? (
                                  <Link to="/products/beta-programs">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
                              </div>
                            ) : section.title === 'Events' && !item.children ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === 'Upcoming Webinars' ? (
                                  <Link to="/events/upcoming-webinars">{item.label}</Link>
                                ) : item.label === 'Leadership Team' ? (
                                  <Link to="/events/leadership-team">{item.label}</Link>
                                ) : item.label === 'Tech Meetups' ? (
                                  <Link to="/events/tech-meetups">{item.label}</Link>
                                ) : item.label === 'Hackathons & Challenges' ? (
                                  <Link to="/events/hackathons-challenges">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
          </div>
                            ) : section.title === 'Quick Links' ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === 'Book a Demo' ? (
                                  <Link to="/book-demo">{item.label}</Link>
                                ) : item.label === 'View Portfolio' ? (
                                  <Link to="/view-portfolio">{item.label}</Link>
                                ) : item.label === 'See Case Studies' ? (
                                  <Link to="/see-case-studies">{item.label}</Link>
                                ) : item.label === 'Read Insights' ? (
                                  <Link to="/read-insights">{item.label}</Link>
                                ) : item.label === 'Subscribe' ? (
                                  <Link to="/subscribe">{item.label}</Link>
                                ) : item.label === 'Support Center' ? (
                                  <Link to="/support-center">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
                              </div>
                            ) : section.title === 'Tech Community' ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === 'Join Our Community' ? (
                                  <Link to="/subscribe">{item.label}</Link>
                                ) : item.label === 'Blog & Insights' ? (
                                  <Link to="/blog">{item.label}</Link>
                                ) : item.label === 'Contribute to Innovation' ? (
                                  <Link to="/contact">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
                              </div>
                            ) : section.title === 'Insights & Knowledge' ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === 'Latest News' ? (
                                  <Link to="/insights/latest-news">{item.label}</Link>
                                ) : item.label === 'Industry Highlights' ? (
                                  <Link to="/insights/industry-highlights">{item.label}</Link>
                                ) : item.label === 'Press Releases' ? (
                                  <Link to="/insights/press-releases">{item.label}</Link>
                                ) : item.label === 'Executive Insights' ? (
                                  <Link to="/insights/executive-insights">{item.label}</Link>
                                ) : item.label === 'Future Trends' ? (
                                  <Link to="/insights/future-trends">{item.label}</Link>
                                ) : item.label === 'Whitepapers' ? (
                                  <Link to="/insights/whitepapers">{item.label}</Link>
                                ) : item.label === 'Case Studies' ? (
                                  <Link to="/insights/case-studies">{item.label}</Link>
                                ) : item.label === 'Events' ? (
                                  <Link to="/insights/events">{item.label}</Link>
                                ) : item.label === 'Thought Leadership' ? (
                                  <Link to="/insights/thought-leadership">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
                              </div>
                            ) : section.title === 'Internal' ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.to ? (
                                  <Link to={item.to} className="flex items-center gap-2">
                                    {item.label}
                                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Internal</span>
                                  </Link>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    {item.label}
                                  </span>
                                )}
                              </div>
                            ) : section.title === 'Footer Menus' ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === 'Client Portal' ? (
                                  <Link to="/client-portal">{item.label}</Link>
                                ) : item.label === 'Support Center' ? (
                                  <Link to="/support-center">{item.label}</Link>
                                ) : item.label === 'Subscribe' ? (
                                  <Link to="/subscribe">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
                              </div>
                            ) : section.title === 'Client Tools' ? (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                              >
                                {item.label === 'Client Portal' ? (
                                  <Link to="/client-portal">{item.label}</Link>
                                ) : item.label === 'Support Center' ? (
                                  <Link to="/support-center">{item.label}</Link>
                                ) : (
                                  item.label
                                )}
                              </div>
                            ) : (
                              <div
                                tabIndex={0}
                                className="font-semibold text-base mb-1 text-gray-900 dark:text-white hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border-l-4 border-transparent hover:border-red-500 focus:border-red-500"
                          >
                            {item.label}
                              </div>
                            )}
                            {item.children && (
                              <ul className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4 mt-1 space-y-1">
                                {item.children.map((child: string) => (
                                  <li
                                    key={child}
                                    tabIndex={0}
                                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 focus:text-red-500 transition cursor-pointer px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400 border-l-2 border-transparent hover:border-red-500 focus:border-red-500"
                                  >
                                    {child === 'Enterprise Automation' ? (
                                      <Link to="/services/enterprise-automation">{child}</Link>
                                    ) : child === 'Innovation Strategy' ? (
                                      <Link to="/services/innovation-strategy">{child}</Link>
                                    ) : child === 'Legacy Modernization' ? (
                                      <Link to="/services/legacy-modernization">{child}</Link>
                                    ) : child === 'Predictive Analytics' ? (
                                      <Link to="/services/predictive-analytics">{child}</Link>
                                    ) : child === 'Intelligent Systems' ? (
                                      <Link to="/services/intelligent-systems">{child}</Link>
                                    ) : child === 'AI Solutions' ? (
                                      <Link to="/services/ai-solutions">{child}</Link>
                                    ) : child === 'Smart Infrastructure' ? (
                                      <Link to="/services/smart-infrastructure">{child}</Link>
                                    ) : child === 'Connected Devices' ? (
                                      <Link to="/services/connected-devices">{child}</Link>
                                    ) : child === 'Cloud Solutions' ? (
                                      <Link to="/services/cloud-solutions">{child}</Link>
                                    ) : child === 'Cybersecurity Solutions' ? (
                                      <Link to="/services/cybersecurity-solutions">{child}</Link>
                                    ) : child === 'Telemedicine' ? (
                                      <Link to="/services/telemedicine">{child}</Link>
                                    ) : child === 'Healthcare AI' ? (
                                      <Link to="/services/healthcare-ai">{child}</Link>
                                    ) : child === 'Medical Devices' ? (
                                      <Link to="/services/medical-devices">{child}</Link>
                                    ) : (
                                      child
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* Contact & Socials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8 mt-8">
                  <div>
                    <div className="font-bold text-lg mb-2 flex items-center gap-2 text-black dark:text-white">Contact Info</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Locations:</div>
                    <ul className="ml-4 mb-2">
                      {CONTACT.locations.map((loc: string) => (
                        <li key={loc} className="text-sm text-gray-600 dark:text-gray-400">{loc}</li>
                      ))}
                    </ul>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Email: <a href="mailto:info@tekvoro.com" className="hover:text-red-500 underline text-gray-900 dark:text-white">{CONTACT.email}</a></div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Phone: <a href="tel:+919709707725" className="hover:text-red-500 underline text-gray-900 dark:text-white">{CONTACT.phone}</a></div>
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-2 flex items-center gap-2 text-black dark:text-white">Social Media</div>
                    <ul className="flex flex-wrap gap-3">
                      {SOCIALS.map((s: Social) => (
                        <li key={s.label}>
                          <a href={s.link} className="text-sm text-gray-700 dark:text-gray-300 hover:text-red-500 transition px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-full" target="_blank" rel="noopener noreferrer">{s.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl mx-auto p-8 rounded-3xl bg-black/80 shadow-2xl border border-white/10 flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 text-white/80 hover:text-yellow-400 text-3xl focus:outline-none"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
              <form
                className="w-full flex flex-col items-center mb-8"
                onSubmit={e => {
                  e.preventDefault();
                  handleAiSearch();
                }}
                autoComplete="off"
                style={{ position: 'relative' }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search with AI..."
                  className="w-full text-center text-4xl md:text-5xl font-extrabold tracking-tight bg-transparent border-0 outline-none text-white placeholder-gray-500 focus:ring-0 mb-4"
                  style={{ letterSpacing: '0.04em', fontFamily: 'Inter, Satoshi, Manrope, sans-serif' }}
                  autoFocus
                />
                <button
                  type="button"
                  aria-label={listening ? 'Stop voice search' : 'Start voice search'}
                  onClick={listening ? stopVoiceSearch : startVoiceSearch}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2 border-2 border-yellow-400 shadow-lg focus:outline-none transition ${listening ? 'animate-pulse border-red-500' : ''}`}
                  style={{ zIndex: 2 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={listening ? '#FF6B00' : '#FFD600'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic">
                    <circle cx="12" cy="11" r="4" />
                    <path d="M19 11v1a7 7 0 0 1-14 0v-1" />
                    <line x1="12" x2="12" y1="19" y2="23" />
                    <line x1="8" x2="16" y1="23" y2="23" />
                  </svg>
                </button>
                {/* Suggestions dropdown */}
                {showSuggestions && aiSuggestions.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-full max-w-xl bg-black/90 border border-yellow-400/10 rounded-2xl shadow-2xl z-30">
                    {aiSuggestions.map((sugg, idx) => (
                      <button
                        key={sugg + idx}
                        type="button"
                        className="block w-full text-left px-6 py-4 text-lg text-white hover:bg-yellow-400/10 focus:bg-yellow-400/20 transition-all font-semibold border-b border-white/5 last:border-b-0"
                        onClick={() => {
                          setSearchValue(sugg);
                          setShowSuggestions(false);
                          handleAiSearch(sugg);
                        }}
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                )}
              </form>
              {/* AI Results */}
              <div className="w-full flex flex-col gap-6 items-center mt-2 min-h-[120px]">
                {aiLoading && (
                  <div className="flex flex-col items-center justify-center w-full py-8">
                    <svg className="animate-spin mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M22 12a10 10 0 0 1-10 10"/></svg>
                    <div className="text-yellow-400 text-lg font-semibold">Thinking...</div>
                  </div>
                )}
                {aiError && (
                  <div className="text-red-400 text-lg font-semibold text-center">{aiError}</div>
                )}
                {!aiLoading && !aiError && aiAnswer && (
                  <div className="w-full text-left">
                    <div className="text-lg text-yellow-400 font-semibold mb-2">AI Answer</div>
                    <div className="p-5 rounded-xl bg-white/5 border border-yellow-400/10 text-white/90 text-xl font-light shadow-lg whitespace-pre-line">
                      {aiAnswer}
                    </div>
                    
                    {/* Local Search Results */}
                    {localResults.length > 0 && (
                      <div className="mt-6">
                        <div className="text-lg text-yellow-400 font-semibold mb-4">Found Results</div>
                        <div className="space-y-3">
                          {localResults.map((result, idx) => (
                            <a
                              key={idx}
                              href={result.url}
                              className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                              onClick={() => setSearchOpen(false)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-white font-semibold mb-1">{result.title}</h4>
                                  <p className="text-gray-300 text-sm mb-2">{result.description}</p>
                                  <span className="inline-block px-2 py-1 bg-yellow-400/20 text-yellow-300 text-xs rounded-full">
                                    {result.category}
                                  </span>
                                </div>
                                <div className="text-yellow-400 ml-4">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6"/>
                                  </svg>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {aiSuggestions.length > 0 && (
                      <div className="mt-6">
                        <div className="text-lg text-yellow-400 font-semibold mb-2">Related Searches</div>
                        <div className="flex flex-col gap-3">
                          {aiSuggestions.map((sugg, idx) => (
                            <button
                              key={sugg + idx}
                              type="button"
                              className="text-left px-4 py-2 rounded-lg bg-yellow-400/10 text-yellow-200 hover:bg-yellow-400/20 transition-all font-semibold"
                              onClick={() => {
                                setSearchValue(sugg);
                                handleAiSearch(sugg);
                              }}
                            >
                              {sugg}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {!aiLoading && !aiError && !aiAnswer && !searchValue && (
                  <div className="text-gray-400 text-xl font-light text-center mt-8">Start typing to search with AI...</div>
                )}
              </div>
              {/* Position the mic button absolutely inside the form */}
              <style>{`
                form { position: relative; }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}