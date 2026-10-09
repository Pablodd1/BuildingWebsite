"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowLeft, Printer } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
    return (
        <main className="w-full min-h-screen bg-gray-50 relative overflow-hidden">
            <section className="relative z-10 bg-green-600/90 backdrop-blur-md py-20 text-white min-h-screen flex items-center justify-center">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                    >
                        <Check className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Payment Successful</h1>
                    <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
                        Thank you for your order! Your shipping and items have been confirmed. We will contact you shortly with tracking information.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center justify-center gap-3 px-10 py-5 bg-green-100 text-green-800 rounded-2xl font-bold text-lg hover:bg-white transition-all hover:scale-105 shadow-xl"
                        >
                            <Printer size={24} />
                            Print Receipt
                        </button>
                        <Link
                            href="/colecciones"
                            className="flex items-center justify-center gap-3 px-10 py-5 bg-green-800 text-white rounded-2xl font-bold text-lg hover:bg-green-900 transition-all hover:scale-105 shadow-xl"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
