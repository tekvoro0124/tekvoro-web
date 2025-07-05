import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Tekvoro Technologies - AI, Cloud & Digital Solutions',
  description = 'Transform your business with Tekvoro\'s innovative AI, cloud, and digital solutions. Expert consulting, development, and implementation services.',
  keywords = 'AI, artificial intelligence, cloud computing, digital transformation, software development, machine learning, cybersecurity, healthcare technology',
  image = '/og-image.jpg',
  url = 'https://www.tekvoro.com',
  type = 'website',
  noIndex = false,
  canonical
}) => {
  const fullTitle = title.includes('Tekvoro') ? title : `${title} | Tekvoro Technologies`;
  const fullUrl = canonical || url;

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
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Tekvoro Technologies" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Tekvoro Technologies" />
      <meta name="theme-color" content="#000000" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
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
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 