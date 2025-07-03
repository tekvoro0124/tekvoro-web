import React from 'react';

interface FullscreenSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FullscreenSection: React.FC<FullscreenSectionProps> = ({ children, className = '', style }) => (
  <section
    className={`min-h-screen w-full flex flex-col justify-center items-center bg-background text-primary font-sans px-4 sm:px-6 md:px-16 max-w-full ${className}`}
    style={style}
  >
    {children}
  </section>
);

export default FullscreenSection; 