
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "Privacy Policy | Unitec USA Design",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Read Unitec USA Design’s privacy policy to understand how we collect, use, and protect your personal and business information.",
        alternates: {
            canonical: `${process.env.BASE_URL}/policies`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Unitec USA Design Privacy Policy",
            description:
                "Learn how Unitec USA Design safeguards your data and respects your privacy.",
            url: `${process.env.BASE_URL}/policies`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Unitec USA Design Privacy Policy",
            description:
                "Our commitment to protecting your data and privacy.",
        },
    };
}
export default function PageLayout({children}) {
    return children
}