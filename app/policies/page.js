import { siteSettings } from '../../utils/siteSettings';

export const metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de tratamiento de datos personales y privacidad de Building Innovation en Estados Unidos y Latinoamérica.',
  alternates: {
    canonical: '/policies/',
  },
};

export default function PoliciesPage() {
  return (
    <main className="w-full min-h-screen bg-[#f4f1eb] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bi-card overflow-hidden">
        <div className="bg-[#142d3d] px-6 py-10 sm:p-12 text-center text-white">
          <p className="bi-eyebrow mb-2">{siteSettings.brand_name}</p>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="mt-2 text-sm text-[#d4dce1]">
            {siteSettings.doral_address}
          </p>
        </div>

        <div className="px-6 py-8 sm:p-10 space-y-8 text-[#3e4b54] text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-xl text-[#17242e] mb-3 border-b border-[#e5e7e5] pb-2">
              Responsable del tratamiento
            </h2>
            <p>
              <strong>{siteSettings.brand_name}</strong>, con sede en {siteSettings.doral_address}, es responsable del tratamiento responsable y seguro de los datos suministrados a través de nuestros formularios digitales, canales de atención comercial y herramientas de Building Tech.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-[#17242e] mb-3 border-b border-[#e5e7e5] pb-2">
              Finalidad del uso de información
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Responder cotizaciones de materiales arquitectónicos y solicitudes de distribución.</li>
              <li>Coordinar demostraciones y evaluaciones de herramientas tecnológicas de Building Tech.</li>
              <li>Enviar catálogos técnicos, fichas y boletines mensuales cuando el usuario se suscribe voluntariamente.</li>
              <li>Dar seguimiento comercial vía correo electrónico, llamada o WhatsApp corporativo.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-[#17242e] mb-3 border-b border-[#e5e7e5] pb-2">
              Derechos y contacto del titular
            </h2>
            <p className="mb-4">
              Puedes solicitar actualización, rectificación o eliminación de tus datos escribiendo directamente a{' '}
              <a href={`mailto:${siteSettings.public_email}`} className="text-[#245b77] underline font-semibold">
                {siteSettings.public_email}
              </a>
              .
            </p>
            <div className="bg-[#f4f1eb] p-5 rounded-2xl text-sm">
              <p><strong>Sede principal:</strong> {siteSettings.doral_address}</p>
              <p><strong>Teléfono:</strong> {siteSettings.primary_phone}</p>
              <p><strong>Correo:</strong> {siteSettings.public_email}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
