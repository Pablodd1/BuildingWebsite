import rawProducts from '../static_data/products_full.json';

const FICHA_BY_SUBCATEGORY = {
  'CUBIERTA ACANALADA UPVC BLANCA 11.80': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'CUBIERTA ONDULADA ROMA': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'CUBIERTA TERMOACUSTICA UPVC 2.0mm BLANCA ONDA BAJA': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'CUBIERTA TERMOACUSTICA UPVC 2.5mm BLANCA ONDA ALTA': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'CUBIERTA TRASLUCIDA ONDA ALTA OPAL': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'LAMINA ALVEOLAR POLICARBONATO': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'TEJA PVC TERRACOTA COLONIAL': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'TEJA UPVC TIPO ZINC': '/fichas/Cubiertas_UPVC_y_Accesorios.pdf',
  'JARDINES EXTERIOR': '/fichas/Jardines_Artificiales.pdf',
  'JARDINES INTERIOR': '/fichas/Jardines_Artificiales.pdf',
  'JARDINES MOSS': '/fichas/Jardines_Artificiales.pdf',
  'LISTONES WPC EXTERIOR': '/fichas/Listones_PVC_y_WPC.pdf',
  'LISTONES PVC CIELO RASO': '/fichas/Listones_PVC_y_WPC.pdf',
  'LISTONES PVC INTERIOR ESTRUCTURAL': '/fichas/Listones_PVC_y_WPC.pdf',
  'PANELES WPC EXTERIOR': '/fichas/Paneles_WPC_Exterior_y_Angulos.pdf',
  'PANELES WPC INTERIOR': '/fichas/Paneles_WPC_Interior_Platinas_y_Angulos.pdf',
  'PANELES WPC REDONDOS': '/fichas/Paneles_WPC_Redondos.pdf',
  'FACHADA DECK': '/fichas/Fachada_Deck.pdf',
  'FACHADA EXTERIOR PVC': '/fichas/Fachada_PVC_Exterior.pdf',
  'POLIFACHADA': '/fichas/Polifachada.pdf',
  'PISOS DECK': '/fichas/Pisos_Deck.pdf',
  'PISOS SPC': '/fichas/Pisos_SPC.pdf',
  'CIELO RASO PVC': '/fichas/Cielo_Raso_PVC.pdf',
  'CINTA ADHESIVA DE PAPEL': '/fichas/Cintas_Adhesivas_Marmol.pdf',
  'CINTA ADHESIVA METALICA': '/fichas/Cintas_Adhesivas_Marmol.pdf',
  'ILUMINACION': '/fichas/Iluminacion.pdf',
  'FOAM BOARD': '/fichas/Foam_Board.pdf',
  'LAMINAS MARMOL PVC': '/fichas/Laminas_Marmol_PVC.pdf',
  'LAMINAS PVC BOARD': '/fichas/PVC_Board_Blanco_y_Colores.pdf',
  'LAMINAS SINTETICAS': '/fichas/Laminas_Sinteticas.pdf',
  'PANEL PS': '/fichas/Paneles_PS_Interior.pdf',
  'PANELES ACOLCHADOS': '/fichas/Paredes_y_Paneles_Acolchados.pdf',
  'PAREDES ACOLCHADAS': '/fichas/Paredes_y_Paneles_Acolchados.pdf',
  'PANELES ACRILICOS MARMOL': '/fichas/Paneles_Acrilicos_Marmol.pdf',
  'PANELES ACUSTICOS': '/fichas/Paneles_Acusticos.pdf',
  'PAREDES MUROFLEX': '/fichas/Paredes_Muroflex.pdf',
  'PAREDES PU ARQUNITEC': '/fichas/Paredes_PU_ArqUnitec.pdf',
  'PAREDES UNIFLEX': '/fichas/Paredes_Uniflex.pdf',
  'ROLLOS ADHESIVOS DE MARMOL': '/fichas/Rollos_Adhesivos_de_Marmol.pdf',
  'PEGANTES': '/fichas/Pegantes.pdf',
  'ZOCALOS SPC': '/fichas/Zocalos_SPC.pdf',
};

export const CATALOG_COLLECTIONS = [
  {
    slug: 'laminas-marmol',
    scope: 'Interior',
    title_es: 'Láminas y Paneles Mármol',
    title_en: 'Marble PVC & Acrylic Sheets',
    image: '/raster/blog/lamina-marmol-pvc-portada-unitec.webp',
    match: (p) =>
      p.collection === 'INTERIOR' &&
      (p.subcategory?.includes('MARMOL') ||
        p.subcategory?.includes('FOAM BOARD') ||
        p.subcategory?.includes('PVC BOARD') ||
        p.subcategory?.includes('SINTETICAS')),
  },
  {
    slug: 'paneles-wpc',
    scope: 'Interior',
    title_es: 'Paneles WPC Interior',
    title_en: 'Interior WPC Wall Panels',
    image: '/raster/blog/panel-wpc-interior-portada-unitec.webp',
    match: (p) =>
      p.collection === 'INTERIOR' &&
      (p.category === 'PANELES WPC Y ANGULOS' || p.subcategory?.includes('LISTONES PVC')),
  },
  {
    slug: 'paneles-acusticos',
    scope: 'Interior',
    title_es: 'Paneles Acústicos',
    title_en: 'Acoustic Wall Panels',
    image: '/raster/interior.webp',
    match: (p) => p.subcategory === 'PANELES ACUSTICOS',
  },
  {
    slug: 'paneles-3d',
    scope: 'Interior',
    title_es: 'Paneles 3D, PS y Muros',
    title_en: '3D, PS & Decorative Wall Panels',
    image: '/raster/blog/panel-wpc-interior-recepcion-marmol-unitec.webp',
    match: (p) =>
      p.collection === 'INTERIOR' &&
      ['PANEL PS', 'PAREDES MUROFLEX', 'PAREDES PU ARQUNITEC', 'PAREDES UNIFLEX', 'PANELES ACOLCHADOS', 'PAREDES ACOLCHADAS'].includes(
        p.subcategory
      ),
  },
  {
    slug: 'pisos-spc',
    scope: 'Interior',
    title_es: 'Pisos SPC',
    title_en: 'SPC Rigid Flooring',
    image: '/raster/blog/inteligencia-artificial-remodelacion-antes-despues-unitec.webp',
    match: (p) => p.subcategory === 'PISOS SPC',
  },
  {
    slug: 'cielo-raso',
    scope: 'Interior',
    title_es: 'Cielo Raso PVC',
    title_en: 'PVC Ceiling Panels',
    image: '/raster/blog/panel-wpc-interior-cielo-raso-unitec.webp',
    match: (p) => p.subcategory === 'CIELO RASO PVC',
  },
  {
    slug: 'jardines',
    scope: 'Interior',
    title_es: 'Jardines Artificiales',
    title_en: 'Artificial Green Walls',
    image: '/raster/exterior.webp',
    match: (p) => p.category === 'JARDINES ARTIFICIALES',
  },
  {
    slug: 'complementos',
    scope: 'Interior',
    title_es: 'Zócalos, Cintas y Pegantes',
    title_en: 'Baseboards, Tapes & Adhesives',
    image: '/raster/product.jpg',
    match: (p) =>
      p.category === 'ZOCALOS' ||
      p.category === 'CINTAS' ||
      p.category === 'PEGANTES' ||
      p.category === 'ILUMINACION',
  },
  {
    slug: 'paneles-wpc-exterior',
    scope: 'Exterior',
    title_es: 'Paneles y Listones WPC Exterior',
    title_en: 'Exterior WPC Cladding & Battens',
    image: '/raster/exterior.webp',
    match: (p) =>
      p.collection === 'EXTERIOR' &&
      (p.subcategory === 'PANELES WPC EXTERIOR' || p.subcategory === 'LISTONES WPC EXTERIOR'),
  },
  {
    slug: 'pisos-deck',
    scope: 'Exterior',
    title_es: 'Pisos Deck WPC',
    title_en: 'WPC Outdoor Decking',
    image: '/raster/exterior.webp',
    match: (p) => p.subcategory === 'PISOS DECK',
  },
  {
    slug: 'cubiertas-upvc',
    scope: 'Exterior',
    title_es: 'Cubiertas UPVC',
    title_en: 'UPVC Roofing Systems',
    image: '/raster/containers.webp',
    match: (p) => p.category === 'CUBIERTAS UPVC',
  },
  {
    slug: 'fachadas',
    scope: 'Exterior',
    title_es: 'Fachadas y Polifachada',
    title_en: 'Exterior Facades & Cladding',
    image: '/raster/top.jpg',
    match: (p) =>
      p.collection === 'EXTERIOR' &&
      ['FACHADA DECK', 'FACHADA EXTERIOR PVC', 'POLIFACHADA'].includes(p.subcategory),
  },
];

const COLOR_KEYWORDS = [
  { key: 'blanco', labels: ['blanco', 'white', 'ivory', 'marfil', 'perla'] },
  { key: 'gris', labels: ['gris', 'gray', 'grey', 'plata', 'silver', 'cemento'] },
  { key: 'negro', labels: ['negro', 'black', 'carbon', 'oscuro', 'antracita'] },
  { key: 'marmol', labels: ['marmol', 'marble', 'carrara', 'calacatta', 'travertino'] },
  { key: 'madera', labels: ['madera', 'wood', 'roble', 'oak', 'nogal', 'walnut', 'teak', 'teca', 'cedro', 'pino', 'bamboo', 'cafe', 'coffee', 'camel'] },
  { key: 'beige', labels: ['beige', 'arena', 'sand', 'crema', 'champagne', 'dorado', 'gold'] },
  { key: 'verde', labels: ['verde', 'green', 'moss', 'musgo', 'oliva'] },
];

export function detectProductColors(name = '') {
  const lower = name.toLowerCase();
  const found = COLOR_KEYWORDS.filter((c) => c.labels.some((l) => lower.includes(l))).map((c) => c.key);
  return found.length > 0 ? found : ['natural'];
}

export function formatDimensionsSummary(dims) {
  if (!dims?.metric || !dims?.imperial) {
    return { metricLabel: 'Consultar ficha', imperialLabel: 'See spec sheet', metersLabel: '-' };
  }
  const { metric, imperial } = dims;
  const wM = metric.width ? (metric.width / 100).toFixed(2) : null;
  const lM = metric.length ? (metric.length / 100).toFixed(2) : null;
  const metricLabel = `${metric.width} × ${metric.length} cm (${metric.thickness} ${metric.thicknessUnit || 'mm'})`;
  const metersLabel = wM && lM ? `${wM} × ${lM} m (${metric.thickness} ${metric.thicknessUnit || 'mm'})` : metricLabel;
  const imperialLabel = `${imperial.width} ${imperial.widthUnit || 'in'} × ${imperial.length} ${imperial.lengthUnit || 'ft'} × ${imperial.thickness} ${imperial.thicknessUnit || 'in'}`;
  return { metricLabel, metersLabel, imperialLabel };
}

export function getTechnicalSheetUrl(product) {
  if (!product) return '/catalogs/catalogo-building-latam-es.pdf';
  return FICHA_BY_SUBCATEGORY[product.subcategory] || '/catalogs/catalogo-building-latam-es.pdf';
}

export function getLineSlugForProduct(product) {
  const found = CATALOG_COLLECTIONS.find((c) => c.match(product));
  return found ? found.slug : product.collection === 'EXTERIOR' ? 'fachadas' : 'complementos';
}

/**
 * Strip pricing completely per spec 2.1.1 ("sin precios ni carrito").
 */
export function sanitizeCatalogProduct(p) {
  if (!p) return null;
  const scope = p.collection === 'EXTERIOR' ? 'Exterior' : 'Interior';
  const lineSlug = getLineSlugForProduct(p);
  const formattedDims = formatDimensionsSummary(p.dimensions);
  return {
    id: String(p.id),
    name: p.name,
    description: p.description || '',
    category: p.category || '',
    subcategory: p.subcategory || '',
    scope,
    lineSlug,
    unit: p.unit || 'Caja / Box',
    itemsPerBox: p.itemsPerBox || null,
    weight: p.weight || null,
    weightPerSqm: p.weightPerSqm || null,
    dimensions: p.dimensions || null,
    formattedDims,
    colors: detectProductColors(p.name),
    image: p.image || '/raster/interior.webp',
    technicalSheetUrl: getTechnicalSheetUrl(p),
  };
}

let cachedSanitized = null;

export function getAllCatalogProducts() {
  if (!cachedSanitized) {
    cachedSanitized = rawProducts.map(sanitizeCatalogProduct);
  }
  return cachedSanitized;
}

export function getCatalogProductById(id) {
  return getAllCatalogProducts().find((p) => String(p.id) === String(id)) || null;
}

export function getRelatedCatalogProducts(product, limit = 4) {
  const all = getAllCatalogProducts();
  if (!product) return all.slice(0, limit);

  const sameSub = all.filter((p) => p.id !== product.id && p.subcategory === product.subcategory);
  const complements = all.filter(
    (p) =>
      p.id !== product.id &&
      (p.lineSlug === 'complementos' || p.lineSlug === product.lineSlug) &&
      p.subcategory !== product.subcategory
  );

  const combined = [...sameSub.slice(0, 2), ...complements];
  const unique = [];
  const seen = new Set();
  for (const item of combined) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      unique.push(item);
    }
    if (unique.length >= limit) break;
  }
  return unique;
}

export function getCatalogCountsByLine() {
  const all = getAllCatalogProducts();
  return CATALOG_COLLECTIONS.map((c) => ({
    slug: c.slug,
    scope: c.scope,
    title_es: c.title_es,
    title_en: c.title_en,
    image: c.image,
    count: all.filter((p) => p.lineSlug === c.slug).length,
  }));
}
