import { notFound } from 'next/navigation';
import {
  getAllCatalogProducts,
  getCatalogProductById,
  getRelatedCatalogProducts,
} from '../../../utils/catalogHelpers';
import { siteSettings } from '../../../utils/siteSettings';
import ProductDetailClient from '../../../components/bi/ProductDetailClient';

export async function generateStaticParams() {
  return getAllCatalogProducts().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getCatalogProductById(id);
  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  return {
    title: `${product.name} | Catálogo`,
    description: product.description.slice(0, 155),
    alternates: {
      canonical: `/catalogo/${product.id}/`,
    },
    openGraph: {
      title: `${product.name} | Building Innovation`,
      description: product.description.slice(0, 155),
      images: [{ url: `${siteSettings.domain}${product.image}` }],
    },
  };
}

export default async function CatalogProductPage({ params }) {
  const { id } = await params;
  const product = getCatalogProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedCatalogProducts(product, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.id,
    category: `${product.scope} / ${product.subcategory}`,
    description: product.description,
    image: `${siteSettings.domain}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: siteSettings.brand_name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
