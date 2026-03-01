import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      setVisible(false);
      return;
    }
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname === '/' || !visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-black shadow-lg hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 animate-fade-in"
      aria-label="Scroll to top"
      style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
} 