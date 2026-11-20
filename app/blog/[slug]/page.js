import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogBySlug } from '../../../utils/blogService';
import { getAllCatalogProducts } from '../../../utils/catalogHelpers';
import { siteSettings } from '../../../utils/siteSettings';
import BlogPostClient from '../../../components/bi/BlogPostClient';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug, 'es');
  if (!blog) return { title: 'Artículo no encontrado' };

  return {
    title: `${blog.title} | Blog`,
    description: blog.excerpt.slice(0, 155),
    alternates: {
      canonical: `/blog/${blog.slug}/`,
    },
    openGraph: {
      type: 'article',
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: `${siteSettings.domain}${blog.image}` }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug, 'es');

  if (!blog) {
    notFound();
  }

  const allProducts = getAllCatalogProducts();
  const relatedProducts = allProducts
    .filter((p) => (blog.relatedLine ? p.lineSlug === blog.relatedLine : true))
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: `${siteSettings.domain}${blog.image}`,
    datePublished: blog.date,
    author: {
      '@type': 'Organization',
      name: blog.author || siteSettings.brand_name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings.brand_name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteSettings.domain}/logo.png`,
      },
    },
  };

  const faqSchema =
    Array.isArray(blog.faqs) && blog.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: blog.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPostClient blog={blog} relatedProducts={relatedProducts} />
    </>
  );
}
