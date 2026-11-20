"use client"

import { motion } from "framer-motion"
import {  ArrowLeft, Package, MapPinX } from "lucide-react"
import Link from "next/link"

export default function NotFoundPage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full text-center"
            >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <MapPinX size={36} />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold">
                    Page not found
                </h1>

                {/* Message */}
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                    If you reached this page from a saved link, it may be outdated.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href="/" aria-label="Go To Home page"
                        className="flex items-center justify-center gap-2 rounded-full bg-black px-6 py-2 text-sm text-white hover:opacity-90"
                    >
                        <ArrowLeft size={16} />
                        Go to Homepage
                    </Link>

                    <Link
                        href="/collections" aria-label="Go To collections page"
                        className="flex items-center justify-center gap-2 rounded-full border px-6 py-2 text-sm hover:bg-gray-50"
                    >
                        <Package size={16} />
                        Browse Products
                    </Link>
                </div>

                {/* Hint */}
                <p className="mt-8 text-xs text-gray-400">
                    If you believe this is an error, please contact our support team.
                </p>
            </motion.div>
        </main>
    )
}
