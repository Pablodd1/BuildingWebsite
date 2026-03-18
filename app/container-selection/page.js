"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { addContainer, addOne } from 'lib/cart/cart.core';
import { generateID } from 'lib/misc';
import { ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CONTAINERS = [
  {
    id: "20ft",
    label: "Small Container",
    image: "/assets/small_container.jpg",
    width: 2.35, height: 2.39, length: 5.9
  },
  {
    id: "40ft",
    label: "Big Container",
    image: "/assets/big_container.jpg",
    width: 2.35, height: 2.69, length: 12.03
  }
];

export default function ContainerSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  const handleSelect = (container) => {
    const containerId = generateID();
    addContainer({
      id: containerId,
      name: container.label,
      dimension: { length: container.length, width: container.width, height: container.height }
    });

    if (productId) {
      // Need product details here, simplified for now
      addOne(containerId, { id: productId, name: "New Item", price: 0 });
    }

    router.push('/cart');
  };

  return (
    <div className="w-full h-screen flex">
      {CONTAINERS.map((container) => (
        <div
          key={container.id}
          className="relative flex-1 group cursor-pointer overflow-hidden"
          onClick={() => handleSelect(container)}
        >
          <Image src={container.image} alt={container.label} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center">
            <h2 className="text-5xl font-black text-white uppercase tracking-widest mb-6">
              {container.label}
            </h2>
            <motion.button 
                className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
            >
              Select Container <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      ))}
    </div>
  );
}
