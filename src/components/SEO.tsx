import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  ogImage?: string;
  url?: string;
  type?: string;
  ogType?: string;
  noIndex?: boolean;
  canonical?: string;
  structuredData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Tekvoro Technologies - AI, Cloud & Digital Solutions',
  description = 'Transform your business with Tekvoro\'s innovative AI, cloud, and digital solutions. Expert consulting, development, and implementation services.',
  keywords = 'AI, artificial intelligence, cloud computing, digital transformation, software development, machine learning, cybersecurity, healthcare technology',
  image,
  ogImage,
  url = 'https://www.tekvoro.com',
  type,
  ogType,
  noIndex = false,
  canonical,
  structuredData
}) => {
  const fullTitle = title.includes('Tekvoro') ? title : `${title} | Tekvoro Technologies`;
  const fullUrl = canonical || url;
  const finalImage = ogImage || image || '/og-image.jpg';
  const finalType = ogType || type || 'website';

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tekvoro Technologies",
    "url": "https://www.tekvoro.com",
    "logo": "https://www.tekvoro.com/logo.png",
    "description": "Transform your business with innovative AI, cloud, and digital solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@tekvoro.com"
    },
    "sameAs": [
      "https://linkedin.com/company/tekvoro",
      "https://twitter.com/tekvoro"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {fullUrl && <link rel="canonical" href={fullUrl} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={finalType} />
      <meta property="og:site_name" content="Tekvoro Technologies" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Tekvoro Technologies" />
      <meta name="theme-color" content="#000000" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 