import productData from "StaticData/products_full.json";
import matchesSearchQuery from "./handleSearch";
import { matchesSubcategoryFilter } from "lib/applyFilters";
import fs from 'fs';
import path from 'path';

// fields to return (easy to manage / edit)
const FIELDS = [
  "name",
  "basePrice",
  "discountPercent",
  "image",
  "id",
  "dimensions",
  "collection",
  "subcategory",
  "category",
];


export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get("query");
  const onlyDiscounted = searchParams.get("onlyDiscounted") === "true";
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const collection = searchParams.get("collection");
  const category = searchParams.get("category");
  const subcategoriesStr = searchParams.get("subcategories");
  const subcategories = subcategoriesStr ? subcategoriesStr.split(',').filter(Boolean) : [];

  const nopaginate = searchParams.get("nopaginate") === "true";

  const ITEMS_PER_PAGE = 15;

  const normalizeImage = (img) => {
    if (!img || typeof img !== 'string') return img;
    const rel = img.startsWith('/') ? img.slice(1) : img;
    const abs = path.resolve(process.cwd(), 'public', rel);
    if (fs.existsSync(abs)) return img;
    // fallback to a generic placeholder image
    return '/raster/product.jpg';
  };

  // Filter pipeline (order matters)
  const filteredProducts = productData
    .filter((item) =>
      onlyDiscounted ? Number(item.discountPercent) > 0 : true
    )
    .filter((item) => {
      if (collection && collection !== 'All' && item.collection?.toLowerCase() !== collection.toLowerCase()) return false;
      if (category && category !== 'All' && item.category?.toLowerCase() !== category.toLowerCase()) return false;

      if (!matchesSubcategoryFilter(item.subcategory, subcategories)) return false;
      return true;
    })
    .filter((item) =>
      matchesSearchQuery(item, searchQuery)
    );

  const totalItems = filteredProducts.length;

  if (nopaginate) {
    const allItems = filteredProducts.map((item) =>
      FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    ).map((it) => ({ ...it, image: normalizeImage(it.image) }))
    return Response.json({
      currentPage: 1,
      totalItems,
      items: allItems,
    });
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedItems = filteredProducts
    .slice(startIndex, endIndex)
    .map((item) =>
      FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    );

  const safePaginated = paginatedItems.map((it) => ({ ...it, image: normalizeImage(it.image) }))
  return Response.json({
    currentPage,
    totalItems,
    items: safePaginated,
  });
}
