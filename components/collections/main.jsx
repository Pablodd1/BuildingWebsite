
'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductItem from "My_UI/product/item"
import MyPagination from "My_UI/product/pagination";
import { applyFilters, sortProducts } from "lib/applyFilters";
import CollectionHero from "My_UI/collections/collection_hero";
import FilterUI from "My_UI/collections/filters_UI";
import NoProductsFound from "./noproduct";


export default function Collections_UI({ searchParams, h1, description, productURL, cover, prefilters, currentCollection }) {

    const queryCategory = searchParams.category;
    const querySubcategory = searchParams.subcategory;
    const querySubcategoriesParam = searchParams.subcategories;
    const queryCollection = searchParams.collection;

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState(prefilters);

    // Sync filters with URL params
    useEffect(() => {
        const syncFilters = () => {
            if (queryCategory || querySubcategory || queryCollection || querySubcategoriesParam) {
                setFilters(prev => ({
                    ...prev,
                    category: queryCategory || prev.category,
                    collection: queryCollection || prev.collection,
                    subcategories: querySubcategory ? [querySubcategory] : (querySubcategoriesParam ? querySubcategoriesParam.split(',').filter(Boolean) : prev.subcategories)
                }));
            }
        }
        syncFilters()
    }, [queryCategory, querySubcategory, queryCollection, querySubcategoriesParam]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = (extraParams = {}) => {
            setLoading(true);
            const url = new URL(`${productURL}nopaginate=true`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
            Object.entries(extraParams).forEach(([k, v]) => {
                if (v != null) url.searchParams.set(k, v);
            });
            fetch(url.toString())
                .then(res => res.json())
                .then(data => {
                    if (data?.items) setProducts(data.items);
                    setLoading(false);
                }).catch(() => setLoading(false));
        }
        
        // Get category and collection from URL params
        const searchParams = new URLSearchParams(window?.location?.search || '');
        const categoryFromURL = searchParams.get('category');
        const collectionFromURL = searchParams.get('collection');
        
        // Initial fetch with filters from URL and prefilters
        fetchProducts({
            category: categoryFromURL || prefilters?.category,
            collection: collectionFromURL || prefilters?.collection
        });
    }, [productURL]);

    // Apply filters + sorting
    const filtered = applyFilters(products, filters);
    const sortedProducts = sortProducts(filtered, filters.sort);
    const totalItems = sortedProducts.length;

    // Client-side pagination
    const ITEMS_PER_PAGE = 15;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    return (
        <div className="overflow-visible">
            <CollectionHero
                h1={h1}
                description={description}
                cover={cover}
            />
            <FilterUI filters={filters} products={products} setFilters={handleSetFilters} currentCollection={currentCollection} />
            {
                loading
                    ? <div className="text-center py-20 text-gray-500">Loading products...</div> :
                    displayedProducts?.length > 0 ?
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-8">
                                {displayedProducts.map((p, index) => <ProductItem key={p.id} item={p} index={index} />)}
                            </div>

                            <div className="my-10">
                                <MyPagination
                                    current={currentPage}
                                    total={totalItems}
                                    pageSize={15}
                                    onChange={setCurrentPage}
                                    className="flex justify-center gap-2"
                                />
                            </div>
                        </>
                        : <NoProductsFound />
            }
        </div>
    );
}
