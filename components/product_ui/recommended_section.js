'use client'
import EmblaCarousel from "My_UI/slides/main";
import Stylish_H2 from "My_UI/stylish_h2";
import { useEffect, useState } from "react";
import { useLanguage } from "lib/LanguageContext";

const OPTIONS = { slidesToScroll: 'auto' };

export default function RecommendationsSection({ itemID, title }) {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    // Determine title to display. If no title passed, or if it matches the legacy default, uses translation.
    const displayTitle = title && title !== "Best Selling Products" ? title : t('recommendations.title');

    // Fetch products
    useEffect(() => {
        const fetchRecommendations = () => {
            setLoading(true);
            setError(false);
            fetch(`/api/products/recommended/?current=${itemID || ''}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch');
                    return res.json();
                })
                .then(data => {
                    setProducts(data.items || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching recommendations:", err);
                    setError(true);
                    setLoading(false);
                });
        };
        fetchRecommendations()
    }, [itemID]);


    return (
        <section className="my-16 w-full mx-auto flex flex-col items-center">
            <div className="flex items-center justify-center gap-6 mb-12 w-full max-w-6xl px-4">
                <div className="h-px bg-gray-300 flex-grow max-w-[200px] hidden sm:block"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-gray-900 text-center">
                    {displayTitle}
                </h2>
                <div className="h-px bg-gray-300 flex-grow max-w-[200px] hidden sm:block"></div>
            </div>
            {
                loading
                    ? <div className="text-center col-span-full min-h-24 w-full min-w-96 py-20 text-gray-500">{t("recommendations.loading")}</div>
                    : error || !products.length
                        ? <div className="text-center col-span-full py-10 text-gray-400">{t("recommendations.loading")}</div>
                        : <div className="w-full"><EmblaCarousel slides={products} options={OPTIONS} /></div>
            }
        </section>
    );
}
