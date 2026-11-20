import { siteSettings } from '../../utils/siteSettings';

export const metadata = {
  title: 'Términos de Uso',
  description:
    'Términos y condiciones de uso del sitio web, catálogo digital, herramientas de IA y procesos de cotización de Building Innovation.',
  alternates: {
    canonical: '/terms/',
  },
};

export default function TermsPage() {
  return (
    <main className="w-full min-h-screen bg-[#f4f1eb] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bi-card overflow-hidden">
        <div className="bg-[#142d3d] px-6 py-10 sm:p-12 text-center text-white">
          <p className="bi-eyebrow mb-2">{siteSettings.brand_name}</p>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Términos y Condiciones de Uso
          </h1>
          <p className="mt-2 text-sm text-[#d4dce1]">{siteSettings.tagline}</p>
        </div>

        <div className="px-6 py-8 sm:p-10 space-y-8 text-[#3e4b54] text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-xl text-[#17242e] mb-2">
              1. Naturaleza informativa del catálogo
            </h2>
            <p>
              Las fichas técnicas, dimensiones, imágenes referenciales y descripciones publicadas en {siteSettings.domain} tienen propósito informativo y comercial. Toda cotización formal se emite directamente con nuestro equipo asesor según disponibilidad de lote, volumen y términos FOB o CIF.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-[#17242e] mb-2">
              2. Herramientas de IA y visualizaciones (Building Tech)
            </h2>
            <p>
              Las proyecciones visuales generadas por Building IA App y las orientaciones del asistente virtual con IA ofrecen estimaciones de apoyo para planeación y diseño. Las medidas finales en obra deben verificarse antes de confirmar un pedido.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-[#17242e] mb-2">
              3. Propiedad intelectual y contacto
            </h2>
            <p>
              Las marcas Building Innovation, Building Tech y materiales gráficos asociados pertenecen a sus respectivos titulares. Para consultas legales o comerciales escríbenos a{' '}
              <a href={`mailto:${siteSettings.public_email}`} className="text-[#245b77] underline font-semibold">
                {siteSettings.public_email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
