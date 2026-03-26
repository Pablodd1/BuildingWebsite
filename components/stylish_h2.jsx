export default function Stylish_H2({ h2, className = " tracking-widest uppercase text-sm md:text-lg mb-12" }) {
    return (
        <h2 className={` w-full flex items-center justify-between gap-2 ${className}`}>
            <span className="relative">
                {h2}
                <span className=" absolute left-0 bottom-0 min-w-2/5 rounded-full bg-current opacity-45 h-px md:h-0.5" ></span>
            </span>
            <span className=" grow bg-current h-px md:h-0.5" ></span>
        </h2>
    )
}