
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        // Branding updated: only Building Innovation is shown
        title: "Building Innovation",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Learn about Building Innovation — our innovation-driven approach to PVC and WPC building materials, sustainability commitment, and industry-leading quality standards.",
        alternates: {
            canonical: `${process.env.BASE_URL}/about`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Building Innovation",
            description:
                "Discover Building Innovation’s approach to PVC and WPC construction materials, sustainability, and quality or view our products.",
            url: `${process.env.BASE_URL}/about`,
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
            title: "Building Innovation",
            description:
                "Explore Building Innovation’s mission, sustainability focus, and leadership in modern building materials.",
            images: [`/raster/containers.png` || process.env.DEFAULT_IMAGE],
        },
    };
}
export default function PageLayout({children}) {
    return children
}
