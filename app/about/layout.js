import { BASE_URL } from "lib/constants";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "About Building Innovation | Innovative PVC & WPC Building Materials",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Learn about Building Innovation — our innovation-driven approach to PVC and WPC building materials, sustainability commitment, and industry-leading quality standards.",
        alternates: {
            canonical: `${BASE_URL}/about`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "About Building Innovation",
            description:
                "Discover the story, values, and innovation behind Building Innovation’s advanced PVC and WPC construction solutions.",
            url: `${BASE_URL}/about`,
            images: [
                {
                    url: `/raster/containers.png` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt:
                        defaultData.title ||
                        "Building Innovation – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "About Building Innovation",
            description:
                "Explore Building Innovation’s mission, sustainability focus, and leadership in modern building materials.",
            images: [`/raster/containers.png` || process.env.DEFAULT_IMAGE],
        },
    };
}
export default function PageLayout({children}) {
    return children
}
