"use client";
import Image from "next/image";
import { useBrand } from "lib/BrandContext";

const Logo = ({ size = 250, className }) => {
    const { brand } = useBrand();
    
    // The Unitec logo fits well at native scale. 
    // We scale down the BINW logo to match Unitec's visual weight in the UI.
    const scaleFactor = brand.id === 'binw' ? 0.6 : 1;
    const finalSize = size * scaleFactor;

    return (
        <div style={{ width: finalSize, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
            <Image
                key={brand.id}
                src={brand.logoImage}
                priority
                alt={`${brand.name} logo`}
                width={finalSize}
                height={finalSize}
                className="w-full h-auto object-contain"
                style={{ width: '100%', height: 'auto', maxHeight: finalSize }}
            />
        </div>
    );
};
export default Logo;
