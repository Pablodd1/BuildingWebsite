

export default function GetFinalPrice({ basePrice, discountPercent, unit = "$", className = "" }) {
    const format = (price) => Number(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="">
            {discountPercent && discountPercent > 0 ? (
                <>
                    <span className={"line-through text-gray-500 mr-2 opacity-70 text-sm"}>
                        {unit}{format(basePrice)}
                    </span>
                    <span className={className}>
                        {unit}{format(basePrice * (1 - discountPercent))}
                    </span>
                </>
            ) : (
                <span className={className}>
                    {unit}{format(basePrice)}
                </span>
            )}
        </div>

    )
}