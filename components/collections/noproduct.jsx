"use client"

import { motion } from "framer-motion"
import { PackageSearch, SlidersHorizontal, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function NoProductsFound({
    onResetFilters,
    title = "No products match your selection",
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center justify-center py-20 px-4 text-center"
        >
            {/* Icon */}
            <div className="mb-6 rounded-full bg-gray-100 p-6">
                <PackageSearch size={40} className="text-gray-700" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold">
                {title}
            </h2>

            {/* Message */}
            <p className="mt-4 max-w-xl text-sm text-gray-600 leading-relaxed">
                We couldn’t find any products that fit your current filters or selection.
                This usually happens when filters are too specific or inventory is limited.
            </p>

            {/* Suggestions */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-xl w-full">
                <Suggestion
                    icon={SlidersHorizontal}
                    title="Adjust filters"
                    desc="Broaden your selection to see more available products."
                />
                <Suggestion
                    icon={RotateCcw}
                    title="Reset search"
                    desc="Clear all filters and explore our full catalog."
                />
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
                {onResetFilters && (
                    <button
                        aria-label="Reset filters"
                        onClick={onResetFilters}
                        className="rounded-full bg-black px-6 py-2 text-sm text-white hover:opacity-90"
                    >
                        Reset Filters
                    </button>
                )}

                <Link
                    href="/collections" aria-label={`Go To collections page`}
                    className="rounded-full border px-6 py-2 text-sm hover:bg-gray-50"
                >
                    Browse All Products
                </Link>
            </div>
        </motion.section>
    )
}

function Suggestion({ icon: Icon, title, desc }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border p-4 text-left">
            <Icon size={18} className="mt-1" />
            <div>
                <p className="font-medium text-sm">{title}</p>
                <p className="text-xs text-gray-600">{desc}</p>
            </div>
        </div>
    )
}
