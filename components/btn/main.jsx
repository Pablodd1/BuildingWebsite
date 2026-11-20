import { ChevronsRight } from 'lucide-react'
import style from './main.module.css'
import Link from 'next/link'

export default function MyButton({ href = '/', label = "My Button", icon, noIcon = false, className, fullWidth = false, isPrimary, reverse = false }) {

    return (
        <Link
            href={href} aria-label={`Go To ${href}`}
            className={` 
                flex items-center justify-center relative overflow-hidden cursor-pointer
                rounded-full group gap-2 
                shadow-md shadow-accent2 border border-accent2
                hover:scale-x-105 hover:scale-y-90
                transition-all ease-in duration-300 
                ${fullWidth ? "w-full" : "w-fit"}
                ${reverse ? 'flex-row-reverse' : ''}
                ${className.btn}
                ${style.button}`
            }
        >
            <span className={` group-hover:text-white ${className.label} ${style.button_content}`}>{label} </span>
            {
                noIcon
                    ? null
                    : icon || <ChevronsRight className={` 
                        h-4/5 my-auto group-hover:text-white group-hover:scale-x-130 group-hover:scale-y-90
                        ${style.button_content}`
                    } />
            }
        </Link>

    )
}