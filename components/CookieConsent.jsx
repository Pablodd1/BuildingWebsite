"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export default function CookieConsent() {
    const [show, setShow] = useState(false)
    const [accepted, setAccepted] = useState(false)

    useEffect(() => {
        const consent = sessionStorage.getItem("cookieConsent")
        if (!consent) {
            setTimeout(() => setShow(true), 2000)
        }
    }, [])

    const accept = () => {
        sessionStorage.setItem("cookieConsent", "accepted")
        setAccepted(true)
        setShow(false)
    }

    const decline = () => {
        sessionStorage.setItem("cookieConsent", "declined")
        setShow(false)
    }

    if (!show) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4"
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Cookie className="w-6 h-6 text-yellow-400" />
                        <p className="text-sm">
                            Usamos cookies para mejorar tu experiencia. 
                            <a href="/policies" className="underline hover:text-gray-300"> Ver política</a>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={decline}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white"
                        >
                            No gracias
                        </button>
                        <button
                            onClick={accept}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                        >
                            Aceptar cookies
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}