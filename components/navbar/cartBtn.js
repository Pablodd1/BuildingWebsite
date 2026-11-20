import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartButton({ count }) {
    return (
        <Link 
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Shopping Cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {count}
                </span>
            )}
        </Link>
    );
}
