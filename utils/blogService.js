import blogs from '../static_data/blogs_es.json';

export function getBlogs(lang = 'es') {
  const isEn = lang === 'en';
  return blogs.map((b) => ({
    ...b,
    displayTitle: isEn && b.title_en ? b.title_en : b.title,
    displayExcerpt: isEn && b.excerpt_en ? b.excerpt_en : b.excerpt,
    displayCategory: isEn && b.category_en ? b.category_en : b.category,
  }));
}

export function getBlogBySlug(slug, lang = 'es') {
  const list = getBlogs(lang);
  return list.find((blog) => blog.slug === slug) || null;
}

export function getAllBlogSlugs() {
  return blogs.map((b) => b.slug);
}
