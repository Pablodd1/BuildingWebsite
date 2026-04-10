
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
            "Official terms and conditions for Building Innovation products and services.",
        alternates: {
            canonical: `${process.env.BASE_URL}/terms`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Building Innovation Terms & Conditions",
            description:
                "Official terms and conditions for Building Innovation products and services.",
            url: `${process.env.BASE_URL}/terms`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Building Innovation Terms & Conditions",
            description:
                "Official terms and conditions for using Building Innovation products and services.",
        },
    };
}

export default function PageLayout({children}) {
    return children
}
