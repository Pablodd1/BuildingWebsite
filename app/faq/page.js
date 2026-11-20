import FAQ_UI from "My_UI/faq/main";
import faqData from "StaticData/faqs.json";
import { getDictionary } from "lib/i18n/getDictionary";

export const metadata = {
    title: "FAQ & Technical Resources | Building Innovation",
    description: "Frequently asked questions about ordering, shipping, installation, and technical unit conversions for our PVC and WPC products.",
    openGraph: {
        title: "Help Center – Building Innovation",
        description: "Find answers to common questions and technical reference guides.",
        type: "website",
    }
};

export default function FAQPage() {
    const dict = getDictionary('en');
    
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FAQ_UI faqs={faqData.faqs} conversions={faqData.unitConversions} />
        </>
    );
}
