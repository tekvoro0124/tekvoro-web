import { useEffect, useState } from 'react';
import type { ZoneKey } from '../Scene';

const ZONES: { key: ZoneKey; label: string }[] = [
  { key: 'office', label: 'Home' },
  { key: 'conference', label: 'About' },
  { key: 'audience', label: 'Projects' },
  { key: 'data-room', label: 'Blog' },
];

const ZONE_HEIGHT = 700;

const VerticalNav = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const idx = Math.min(
        ZONES.length - 1,
        Math.floor(scrollY / ZONE_HEIGHT)
      );
      setActiveIdx(idx);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (idx: number) => {
    window.scrollTo({
      top: idx * ZONE_HEIGHT,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="hidden md:fixed md:right-6 md:top-1/2 md:-translate-y-1/2 md:z-50 md:flex md:flex-col md:items-center">
      {ZONES.map((zone, idx) => (
        <div key={zone.key} className="w-full flex flex-col items-center">
          <button
            className="flex items-center focus:outline-none px-2 py-2 w-full bg-transparent"
            onClick={() => handleClick(idx)}
            aria-label={zone.label}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span className="mr-3 text-base font-semibold text-secondary select-none" style={{ minWidth: 60, textAlign: 'right' }}>{zone.label}</span>
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${activeIdx === idx ? 'border-white' : 'border-secondary'}
              `}
              style={{ boxShadow: activeIdx === idx ? '0 0 0 2px #ff3c3c' : undefined }}
            >
              <span
                className={`block rounded-full transition-all duration-300
                  ${activeIdx === idx ? 'bg-white w-3.5 h-3.5' : 'bg-transparent w-2.5 h-2.5'}`}
              />
            </span>
          </button>
          {idx < ZONES.length - 1 && (
            <div className="w-10 border-b border-gray-700 opacity-40 mx-auto my-1"></div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default VerticalNav; 