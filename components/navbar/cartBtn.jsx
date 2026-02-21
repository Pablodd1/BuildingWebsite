'use client'

import { motion, AnimatePresence } from "framer-motion"
import { openCart } from "lib/cart/cart.ui"
import { useCartTotal } from "lib/cart/useCartTotals"
import { ShoppingCart } from "lucide-react"

export function CartButton() {
    const cartCount = useCartTotal()
    return (
        <motion.button
            onClick={openCart}
            aria-label="Open cart"
            className="px-2 hover:bg-white/5 rounded-full transition-all relative group cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                animate={cartCount > 0 ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
            >
                <ShoppingCart fill={cartCount > 0 ? "#ca3500bf" : 'none'} className={`w-fit h-full ${cartCount > 0 ? 'text-orange-700/75' : 'text-inherit'}`} />
            </motion.div>
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-5 -right-px text-3xl font-semibold text-orange-700"
                    >
                        •
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}