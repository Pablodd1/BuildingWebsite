import { Suspense } from 'react';
import { getAllCatalogProducts, getCatalogCountsByLine } from '../../utils/catalogHelpers';
import CatalogClient from '../../components/bi/CatalogClient';

export const metadata = {
  title: 'Catálogo de Productos | PVC, WPC y SPC',
  description:
    'Explora más de 500 referencias en láminas mármol PVC, paneles WPC, pisos SPC, decks y cubiertas UPVC. Descarga fichas técnicas y cotiza directo con asesor.',
  alternates: {
    canonical: '/catalogo/',
  },
};

export default function CatalogPage() {
  const products = getAllCatalogProducts();
  const lineCounts = getCatalogCountsByLine();

  return (
    <Suspense
      fallback={
        <div className="bi-wrap py-24 text-center text-sm text-[#66737c]">
          Cargando catálogo de Building Innovation...
        </div>
      }
    >
      <CatalogClient products={products} lineCounts={lineCounts} />
    </Suspense>
  );
}
