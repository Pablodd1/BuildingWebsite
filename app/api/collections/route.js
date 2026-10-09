import productData from "static_data/products_full.json";
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

// Asynchronous non-blocking image validation
function normalizeImage(img) {
  return img || '/raster/product.jpg';
}

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
    const rawItems = filteredProducts.map((item) =>
      FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    );
    const allItems = await Promise.all(
      rawItems.map(async (it) => ({ ...it, image: normalizeImage(it.image) }))
    );
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

  const safePaginated = await Promise.all(
    paginatedItems.map(async (it) => ({ ...it, image: normalizeImage(it.image) }))
  );
  
  return Response.json({
    currentPage,
    totalItems,
    items: safePaginated,
  });
}

