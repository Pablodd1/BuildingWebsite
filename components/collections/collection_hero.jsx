import Image from "next/image";


export default function CollectionHero({ h1, description, cover }) {

    return (

        <figure className="relative aspect-square md:aspect-[2.8/1] mb-24 shadow-md shadow-gray-400 ">
            <div className=" absolute bottom-0 h-full bg-linear-35 from-black/75 via-80% md:via-50% via-black/10 to-90% md:to-55% to-transparent min-w-full z-10 " />
            <Image
                fill alt={cover.alt}
                src={cover.src}
                className="object-cover" priority
            />
            <figcaption className=" z-20 bottom-7 absolute left-5" >
                <h1 className=" text-3xl lg:text-6xl lg:leading-18 w-4/5 font-extrabold tracking-wider capitalize text-white " >
                    {h1}
                </h1>
                <p className=" text-sm md:text-md max-w-2xl text-gray-200 border-l-4 border-gray-200 pl-4 my-5 " >
                    {description}
                </p>
            </figcaption>
        </figure>
    )
}