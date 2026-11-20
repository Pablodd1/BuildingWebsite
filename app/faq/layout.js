import { BASE_URL } from "lib/constants";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "FAQs | PVC & WPC Products, Installation & Warranty | Building Innovation",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Find answers to common questions about Building Innovation’s PVC and WPC products, installation methods, warranties, fire ratings, and sustainability.",
        alternates: {
            canonical: `${BASE_URL}/faq`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Building Innovation FAQs",
            description:
                "Get clear answers about PVC & WPC materials, product performance, installation, warranties, and ordering from Building Innovation.",
            url: `${BASE_URL}/faq`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Building Innovation FAQs",
            description:
                "Everything you need to know about Unitec’s PVC and WPC construction products."
        },
    };
}
export default function PageLayout({children}) {
    return children
}
