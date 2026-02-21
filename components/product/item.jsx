"use client";

import { motion } from "framer-motion";
import { addOne } from "lib/cart/cart.actions";
import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import Image from "next/image";
import Link from "next/link";


export default function ProductItem({ item, isSlides = false, index = 0 }) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -8 }}
            className={`${isSlides ? 'embla__slide' : ''} overflow-hidden grid grid-rows-[17rem_auto_4rem_auto] gap-y-2 rounded-xl shadow-md shadow-gray-400 hover:shadow-xl m-5 cursor-pointer`}
        >
            <Link href={`/products/${item.id}`} className='relative h-full w-full overflow-hidden'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="relative h-full w-full"
                >
                    <Image
                        fill
                        aria-label={`Go To product with ID ${item.id}`}
                        src={item.image || '/raster/product.jpg'}
                        alt={item.name || 'Product image '}
                        className="object-contain object-center"
                    />
                </motion.div>
            </Link>
            <div className="text-lg font-bold w-11/12 mx-auto">
                <GetFinalPrice
                    basePrice={item.basePrice}
                    discountPercent={item.discountPercent}
                    className='text-black bg-primary shadow shadow-secondary/75 px-2 rounded-md tracking-wide font-mono'
                />
            </div>
            <Link href={`/products/${item.id}`} aria-label={`Go To product with ID ${item.id}`}>
                <motion.p
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-md text-gray-800 font-semibold my-1 w-11/12 mx-auto tracking-wide hover:text-primary transition-colors"
                >
                    {item.name}
                </motion.p>
            </Link>
            <AddToContainer
                item={{
                    id: item.id,
                    dimensions: item.dimensions,
                    price: item.basePrice
                }}
            />
        </motion.li>
    )
}