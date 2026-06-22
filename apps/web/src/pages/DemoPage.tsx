import { ButtonLink } from '../components/ui/ButtonLink';
import { Card } from '../components/ui/Card';
import { PET_CATEGORIES, TOTAL_BREEDS } from '../config/species';

const stats = [
  { value: String(TOTAL_BREEDS), label: 'Animais catalogados' },
  { value: String(PET_CATEGORIES.length), label: 'Grupos de espécies' },
  { value: '1', label: 'Missão: menos abandono' },
];

const delivered = [
  `${TOTAL_BREEDS} fichas educativas por espécie e raça`,
  `${PET_CATEGORIES.length} grupos de pets organizados`,
  'Cadastro de pets e lembretes de rotina',
  'Perfil do tutor demo com vínculo a pets e lembretes',
  'Simulador de adoção responsável',
  'Tema claro e escuro no fluxo principal',
  'Base pronta para evoluir com usuários reais',
];

const nextSteps = [
  { phase: 'Agora', title: 'QA final do piloto', desc: 'Revisar rotas, textos, imagens, tema claro/escuro e experiência mobile.' },
  { phase: 'Próxima frente', title: 'Login real', desc: 'Substituir DEMO_USER_ID por autenticação e manter perfis, pets e lembretes por conta.' },
  { phase: 'Depois', title: 'Fotos e notificações', desc: 'Upload de fotos do pet e alertas reais para vacinas, consultas e rotina.' },
  { phase: 'Evolução', title: 'Impacto e parceiros', desc: 'ONGs, adoção responsável ampliada e dashboard de impacto social.' },
];

export function DemoPage() {
  return (
    <div className="page-container space-y-8">
      <section className="hero-gradient rounded-2xl p-6 text-white shadow-soft md:p-10">
        <p className="hero-kicker">Piloto pronto para validação</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">PetCare Responsável</h1>
        <p className="hero-body mt-4 max-w-2xl text-lg">
          Conheça melhor. Cuide melhor. Abandone menos.
        </p>
        <p className="hero-caption mt-3 max-w-2xl text-sm">
          O app ajuda tutores a entender necessidades reais antes da escolha e a manter uma rotina de cuidado depois da decisão.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to="/explore" variant="inverse" size="lg">
            Ver catálogo
          </ButtonLink>
          <ButtonLink to="/adoption-match" variant="glass" size="lg">
            Ver adoção responsável
          </ButtonLink>
          <ButtonLink to="/profile" variant="glass" size="lg">
            Ver perfil do tutor
          </ButtonLink>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="stat-tile">
            <p className="text-2xl font-bold text-brand">{s.value}</p>
            <p className="stat-tile-label">{s.label}</p>
          </div>
        ))}
      </div>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-brand">O problema</h2>
        <ul className="mt-4 space-y-2 font-medium text-text-secondary">
          <li>• Muitos tutores escolhem pets sem conhecer necessidades reais de cada espécie.</li>
          <li>• Falta de informação gera frustração, cuidado inadequado e abandono.</li>
          <li>• Cada animal exige ambiente, rotina, custos e atenção diferentes.</li>
        </ul>
      </Card>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-brand">A solução</h2>
        <ul className="mt-4 space-y-2 font-medium text-text-secondary">
          <li>• Catálogo educativo visual com {TOTAL_BREEDS} fichas</li>
          <li>• Fichas por espécie com cuidados práticos</li>
          <li>• Cadastro do pet e lembretes de rotina</li>
          <li>• Simulador para apoiar uma escolha mais consciente</li>
        </ul>
      </Card>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-brand">O piloto já entrega</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {delivered.map((item) => (
            <div key={item} className="rounded-xl bg-primary-light/60 px-4 py-3 text-sm font-semibold text-brand">
              ✓ {item}
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg">
        <h2 className="text-xl font-bold text-brand">Próximos passos</h2>
        <div className="mt-4 grid gap-3">
          {nextSteps.map((step) => (
            <div key={step.title} className="rounded-xl border border-border bg-muted/40 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">{step.phase}</p>
              <h3 className="mt-1 font-semibold text-text-primary">{step.title}</h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <aside className="disclaimer-banner">
        ⚕️ Informação educativa. Não substitui orientação veterinária.
      </aside>
    </div>
  );
}
