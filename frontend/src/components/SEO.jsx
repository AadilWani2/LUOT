import { useEffect } from 'react';

const SITE_NAME = 'LUOT — Loyal University Of Technology';
const BASE_URL = 'https://luot.edu.in';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&h=630&q=80';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${BASE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`
    : BASE_URL;

  const metaDesc =
    description ||
    'Loyal University Of Technology (LUOT) is a premier institute offering accredited B.Tech, BCA, MCA, and M.Tech degrees in Computer Science, AI/ML, and Electronics.';

  const metaKeywords =
    keywords ||
    'LUOT, Loyal University Of Technology, engineering college, B.Tech admissions 2026, computer science, technology university';

  useEffect(() => {
    // 1. Document Title
    document.title = fullTitle;

    // Helper to find or create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for link tags (canonical)
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta
    setMetaTag('name', 'description', metaDesc);
    setMetaTag('name', 'keywords', metaKeywords);
    setMetaTag(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setLinkTag('canonical', canonicalUrl);

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // Twitter Card
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', ogImage);

    // Injected Dynamic Structured Data (JSON-LD)
    const scriptId = 'dynamic-seo-jsonld';
    let scriptTag = document.getElementById(scriptId);

    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up dynamic JSON-LD on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [fullTitle, metaDesc, metaKeywords, canonicalUrl, ogType, ogImage, noIndex, jsonLd]);

  // React 19 native document metadata hoisting support
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}

