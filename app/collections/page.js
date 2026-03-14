
import Collections_UI from "My_UI/collections/main";
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "All Product Collections | PVC & WPC Building Materials | Unitec USA Design",
        description:
            "Browse Unitec USA Design’s full collection of PVC and WPC building materials, engineered for interior and exterior applications with long-lasting performance and zero maintenance.",
        alternates: {
            canonical: `${process.env.BASE_URL}/collections`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "All Product Collections – Unitec USA Design",
            description:
                "Explore our complete range of innovative PVC and WPC building solutions for residential, commercial, and architectural projects.",
            url: `${process.env.BASE_URL}/collections`,
            images: [
                {
                    url: `/raster/interior.webp` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: "Unitec USA Design – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "All Product Collections – Unitec USA Design",
            description:
                "Discover the full range of Unitec USA Design PVC & WPC building materials.",
            images: [`/raster/interior.webp` || process.env.DEFAULT_IMAGE],
        },
    };
}


export default async function Collections({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Our Product Collections"}
            description={"Explore Unitec USA Design’s complete range of PVC and WPC building materials. From interior finishes to exterior-grade solutions, our collections are engineered for durability, zero maintenance, and modern design flexibility. Whether you’re sourcing for residential, commercial, or large-scale projects, find everything in one place."}
            cover={{
                src: '/raster/interior.webp',
                alt: 'collection banner'
            }}
            productURL="/API/collections?"
            prefilters={{
                collection: "All",
                subcategories: [],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="All"
        />
    );
}
