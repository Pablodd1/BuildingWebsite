import { BASE_URL } from "lib/constants";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "Contact Building Innovation | Bulk Orders & Product Support",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Contact Building Innovation for bulk pricing, product inquiries, samples, technical support, or nationwide shipping information.",
        alternates: {
            canonical: `${BASE_URL}/contact`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Contact Building Innovation",
            description:
                "Get in touch with Building Innovation for product quotes, samples, technical guidance, and project consultation.",
            url: `${BASE_URL}/contact`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Contact Building Innovation",
            description:
                "Reach Building Innovation for pricing, samples, and expert support.",
        },
    };
}
export default function PageLayout({children}) {
    return children
}
