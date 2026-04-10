
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
            "Privacy policy for Building Innovation products and services.",
        alternates: {
            canonical: `${process.env.BASE_URL}/policies`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Building Innovation Privacy Policy",
            description:
                "How Building Innovation collects, uses, and protects your data.",
            url: `${process.env.BASE_URL}/policies`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Building Innovation Privacy Policy",
            description:
                "Official privacy policy for Building Innovation products and services.",
        },
    };
}
export default function PageLayout({children}) {
    return children
}
