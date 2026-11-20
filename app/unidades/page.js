import UnitsClient from '../../components/bi/UnitsClient';

export const metadata = {
  title: 'Unidades Estratégicas de Negocio',
  description:
    'Conoce las dos unidades estratégicas de Building Innovation: materiales arquitectónicos (PVC, WPC, SPC) y Building Tech (asistentes IA, apps y software).',
  alternates: {
    canonical: '/unidades/',
  },
};

export default function UnitsPage() {
  return <UnitsClient />;
}
