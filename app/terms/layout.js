
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "Terms & Conditions | Unitec USA Design",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Review Unitec USA Design’s terms and conditions covering product use, warranties, ordering, intellectual property, and service limitations.",
        alternates: {
            canonical: `${process.env.BASE_URL}/terms`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Unitec USA Design Terms & Conditions",
            description:
                "Understand the terms governing the use of Unitec USA Design products, services, and website.",
            url: `${process.env.BASE_URL}/terms`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Unitec USA Design Terms & Conditions",
            description:
                "Official terms and conditions for using Unitec USA Design products and services.",
        },
    };
}

export default function PageLayout({children}) {
    return children
}