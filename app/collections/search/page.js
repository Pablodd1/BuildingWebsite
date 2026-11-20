import SearchFrom from "My_UI/navbar/search";
import SearchBody from "./body";
import Link from "next/link";
import { BASE_URL } from "lib/constants";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Buscar Productos | Building Innovation",
        description:
            "Busca materiales de construcción PVC y WPC en Building Innovation. Encuentra productos por aplicación, acabado y categoría.",
        alternates: { canonical: `${BASE_URL}/collections/search` },
        robots: { index: false, follow: true },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Buscar Productos – Building Innovation",
            description:
                "Navega por los resultados de búsqueda en la colección de materiales PVC y WPC de Building Innovation.",
            url: `${BASE_URL}/collections/search`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Buscar Productos – Building Innovation",
            description:
                "Encuentra los materiales de construcción PVC y WPC con el buscador de Building Innovation.",
        },
    };
}

export default async function SearchPage({ searchParams }) {
    const { q: query } = await searchParams;

    return (
        <section className="min-h-screen bg-gray-50">
            {/* Search Hero */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pt-14 pb-20 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                        Building Innovation
                    </p>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                        {query ? (
                            <>
                                Resultados para{" "}
                                <span className="text-blue-400">&ldquo;{query}&rdquo;</span>
                            </>
                        ) : (
                            "Buscar Productos"
                        )}
                    </h1>
                    {!query && (
                        <p className="text-gray-400 text-sm mb-8">
                            Encuentra materiales PVC, WPC, SPC y más para tus proyectos
                        </p>
                    )}
                    <SearchFrom full query={query} />
                </div>
            </div>

            {/* Quick filters */}
            <div className="bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 min-w-max">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mr-2 whitespace-nowrap">
                        Filtros rápidos:
                    </span>
                    {[
                        { label: "Pisos SPC", q: "SPC" },
                        { label: "Paredes", q: "PAREDES" },
                        { label: "Cubiertas", q: "CUBIERTAS" },
                        { label: "WPC", q: "WPC" },
                        { label: "Jardines", q: "JARDINES" },
                        { label: "Listones", q: "LISTONES" },
                        { label: "Laminas", q: "LAMINAS" },
                        { label: "Iluminación", q: "ILUMINACION" },
                        { label: "Zócalos", q: "ZOCALOS" },
                    ].map((f) => (
                        <Link
                            key={f.q}
                            href={`/collections/search?q=${encodeURIComponent(f.q)}`}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                                query?.toUpperCase() === f.q
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                            }`}
                        >
                            {f.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="py-8">
                {query ? (
                    <SearchBody query={query} />
                ) : (
                    <div className="max-w-5xl mx-auto px-4 py-12 text-center text-gray-400 text-sm">
                        Escribe una palabra clave para buscar productos...
                    </div>
                )}
            </div>
        </section>
    );
}
