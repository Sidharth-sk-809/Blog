export function HomeStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Horizon Journal",
    description:
      "A modern editorial blog with stories about product design, engineering, and digital publishing.",
    url: "https://horizon-journal.example",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  publishedAt,
  author,
  slug,
}: {
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  slug: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    mainEntityOfPage: `https://horizon-journal.example/posts/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Horizon Journal",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
