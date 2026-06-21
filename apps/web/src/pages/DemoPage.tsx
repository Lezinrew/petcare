import { ButtonLink } from '../components/ui/ButtonLink';
import { Card } from '../components/ui/Card';
import { TOTAL_BREEDS } from '../config/species';

const stats = [
  { value: String(TOTAL_BREEDS), label: 'Animais catalogados' },
  { value: '6', label: 'Grupos de espécies' },
  { value: '1', label: 'Missão: menos abandono' },
];

export function DemoPage() {
  return (
    <div className="page-container space-y-8">
      <section className="hero-gradient rounded-2xl p-6 text-white shadow-soft md:p-10">
        <p className="text-sm font-medium text-primary-light/90">Apresentação do piloto</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">PetCare Responsável</h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-light/95">
          Conheça melhor. Cuide melhor. Abandone menos.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to="/explore" variant="inverse" size="lg">
            Explorar pets
          </ButtonLink>
          <ButtonLink to="/adoption-match" variant="glass" size="lg">
            Ver adoção responsável
          </ButtonLink>
          <ButtonLink
            href="/generated/pets/index.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="glass"
            size="lg"
          >
            Abrir catálogo HTML
          </ButtonLink>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="stat-tile">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-xs text-text-secondary md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-primary">O problema</h2>
        <ul className="mt-4 space-y-2 text-text-secondary">
          <li>• Muitos tutores escolhem pets sem conhecer necessidades reais de cada espécie.</li>
          <li>• Falta de informação gera frustração, cuidado inadequado e abandono.</li>
          <li>• Cada animal exige ambiente, rotina e atenção diferentes.</li>
        </ul>
      </Card>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-primary">A solução</h2>
        <ul className="mt-4 space-y-2 text-text-secondary">
          <li>• Catálogo educativo visual com 88 fichas</li>
          <li>• Fichas por espécie com cuidados práticos</li>
          <li>• Cadastro do pet e lembretes de rotina</li>
          <li>• Simulador de adoção responsável</li>
          <li>• Exportação HTML offline para compartilhar</li>
        </ul>
      </Card>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-primary">O piloto já entrega</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            '88 animais / raças catalogados',
            '6 grupos de espécies',
            'PWA instalável no celular',
            'API REST documentada',
            'HTML estático educativo',
            'Base pronta para evoluir',
          ].map((item) => (
            <div key={item} className="rounded-xl bg-primary-light/60 px-4 py-3 text-sm font-medium text-primary">
              ✓ {item}
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-primary">Próximos passos</h2>
        <ul className="mt-4 space-y-2 text-text-secondary">
          <li>• Login e perfis de tutor</li>
          <li>• Upload de fotos do pet</li>
          <li>• Notificações push</li>
          <li>• IA para identificação de raça</li>
          <li>• ONGs e adoção responsável</li>
          <li>• Dashboard de impacto social</li>
        </ul>
      </Card>

      <aside className="disclaimer-banner">
        ⚕️ Informação educativa. Não substitui orientação veterinária.
      </aside>
    </div>
  );
}
