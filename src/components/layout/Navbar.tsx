import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Link } from 'react-router-dom';

type Section = {
  icon: string;
  title: string;
  color: string;
  items: ({ label: string; children?: string[] })[];
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
      { label: 'Strategic Innovation' },
      { label: 'Success Stories' },
      { label: 'Client Results' },
      { label: 'Industry Impact' },
      { label: 'In-Depth Analysis' },
      { label: 'Technical Research' },
      { label: 'Market Insights' },
      { label: 'Upcoming Events' },
      { label: 'Past Webinars' },
      { label: 'Event Highlights' },
    ],
  },
  {
    icon: '⬛',
    title: 'Footer Menus',
    color: 'border-gray-900',
    items: [
      { label: 'Products' },
      { label: 'Programs' },
      { label: 'Client Portal' },
      { label: 'Beta Signup' },
    ],
  },
  {
    icon: '🟧',
    title: 'Client Tools',
    color: 'border-orange-400',
    items: [
      { label: 'Client Login' },
      { label: 'Knowledge Base' },
      { label: 'Raise a Ticket' },
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
      { label: 'Request a Callback' },
      { label: 'Get a Quote' },
      { label: 'Support Center' },
      { label: 'Investors' },
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

  // Overlay click to close
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6 bg-transparent">
      <div className="flex items-center">
            <Logo />
      </div>
      <div className="flex items-center">
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
                        {section.items.map((item: { label: string; children?: string[] }) => (
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
                                ) : item.label === 'Investors' ? (
                                  <Link to="/about/best-investors">{item.label}</Link>
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
    </nav>
  );
}