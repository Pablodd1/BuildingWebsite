import { getBlogs } from '../../utils/blogService';
import BlogListClient from '../../components/bi/BlogListClient';

export const metadata = {
  title: 'Blog | Tendencias, Productos y Building Tech',
  description:
    'Noticias, avances de Building Tech (IA), tendencias de diseño interior, guías de PVC/WPC/SPC y proyectos de Building Innovation.',
  alternates: {
    canonical: '/blog/',
  },
};

export default function BlogPage() {
  const blogs = getBlogs('es');
  return <BlogListClient blogs={blogs} />;
}
