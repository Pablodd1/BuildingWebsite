'use client';

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "lib/LanguageContext";
import Link from "next/link";
import { Package, ArrowRight, LayoutGrid, RefreshCw } from "lucide-react";
import ProductItem from "My_UI/product/item";
import MyPagination from "My_UI/product/pagination";

const POPULAR_CATEGORIES = [
    { label: "Pisos SPC", query: "SPC" },
    { label: "Paredes PVC", query: "PAREDES" },
    { label: "Cubiertas UPVC", query: "CUBIERTAS" },
    { label: "Jardines Artificiales", query: "JARDINES" },
    { label: "Paneles WPC", query: "WPC" },
    { label: "Listones", query: "LISTONES" },
];

function ProductSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="bg-gray-200 aspect-square w-full" />
            <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
            </div>
        </div>
    );
}

export default function SearchBody({ query }) {
    const { t, language } = useLanguage();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProducts = useCallback(() => {
        if (!query) return;
        setLoading(true);
        setError(false);
        fetch(
            `/api/collections?query=${encodeURIComponent(query)}&currentPage=${currentPage}`
        )
            .then((res) => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then((data) => {
                setProducts(Array.isArray(data.items) ? data.items : []);
                setTotalItems(data.totalItems || 0);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [query, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Loading state
    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t("search.loading")}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {[...Array(10)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {language === "es" ? "Error al cargar productos" : "Error loading products"}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                    {language === "es"
                        ? "Ocurrió un error. Por favor intente de nuevo."
                        : "Something went wrong. Please try again."}
                </p>
                <button
                    onClick={fetchProducts}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    {language === "es" ? "Reintentar" : "Try Again"}
                </button>
            </div>
        );
    }

    // No results state
    if (!products || products.length === 0) {
        return (
            <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("search.noResults")}{" "}
                    <span className="text-blue-600">&ldquo;{query}&rdquo;</span>
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                    {t("search.noResultsHint")}
                </p>

                {/* Popular categories */}
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                        {t("search.popularCategories")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {POPULAR_CATEGORIES.map((cat) => (
                            <Link
                                key={cat.query}
                                href={`/collections/search?q=${encodeURIComponent(cat.query)}`}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-700 transition-all text-sm"
                >
                    <LayoutGrid className="w-4 h-4" />
                    {t("search.browseAll")}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    // Results
    return (
        <div className="w-full max-w-7xl mx-auto px-4 pb-16">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">{totalItems}</span>{" "}
                    {t("search.products")}{" "}
                    <span className="text-gray-400">— {t("search.resultsFor")}</span>{" "}
                    <span className="font-semibold text-blue-600">&ldquo;{query}&rdquo;</span>
                </p>
                <Link
                    href="/collections"
                    className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                    <LayoutGrid className="w-3 h-3" />
                    {t("search.browseAll")}
                </Link>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {products.map((p) => (
                    <ProductItem key={p.id || p.ID} item={p} />
                ))}
            </div>

            {/* Pagination */}
            {totalItems > 15 && (
                <div className="mt-10 flex justify-center">
                    <MyPagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={15}
                        onChange={(page) => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex justify-center gap-2"
                    />
                </div>
            )}
        </div>
    );
}
