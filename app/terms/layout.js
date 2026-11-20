import { BASE_URL } from "lib/constants";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "Terms & Conditions | Building Innovation",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Review Building Innovation’s terms and conditions covering product use, warranties, ordering, intellectual property, and service limitations.",
        alternates: {
            canonical: `${BASE_URL}/terms`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Building Innovation Terms & Conditions",
            description:
                "Understand the terms governing the use of Building Innovation products, services, and website.",
            url: `${BASE_URL}/terms`,
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
