import { getBlogs } from '../utils/blogService';
import HomeClient from '../components/bi/HomeClient';

export const metadata = {
  title: 'Building Innovation | Materiales de Construcción y Tecnología IA',
  description:
    'Compañía americana en Doral, Miami, con presencia en 10 países. Materiales arquitectónicos (PVC, WPC, SPC) y soluciones con inteligencia artificial (Building Tech).',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const blogs = getBlogs('es');
  return <HomeClient blogs={blogs} />;
}
