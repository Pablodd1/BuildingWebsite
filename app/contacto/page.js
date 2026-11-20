import ContactClient from '../../components/bi/ContactClient';
import { biDictionary } from '../../utils/i18n/biDictionary';

export const metadata = {
  title: 'Contacto | Habla con un Asesor',
  description:
    'Contacta a Building Innovation por WhatsApp, llamada o formulario. Equipo comercial, showroom en Doral (Miami), preguntas frecuentes y redes oficiales.',
  alternates: {
    canonical: '/contacto/',
  },
};

export default function ContactoPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: biDictionary.es.contactPage.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactClient />
    </>
  );
}
