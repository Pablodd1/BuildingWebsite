import { BASE_URL } from "lib/constants";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "Privacy Policy | Building Innovation",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Read Building Innovation’s privacy policy to understand how we collect, use, and protect your personal and business information.",
        alternates: {
            canonical: `${BASE_URL}/policies`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Building Innovation Privacy Policy",
            description:
                "Learn how Building Innovation safeguards your data and respects your privacy.",
            url: `${BASE_URL}/policies`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Building Innovation Privacy Policy",
            description:
                "Our commitment to protecting your data and privacy.",
        },
    };
}
export default function PageLayout({children}) {
    return children
}
