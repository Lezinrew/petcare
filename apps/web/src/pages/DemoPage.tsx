import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
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
    <div className="care-page px-5 pb-28 pt-6 md:px-8 md:pb-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader
          backTo="/"
          title="Apresentação do piloto"
          subtitle="Conheça melhor. Cuide melhor. Abandone menos. O app ajuda tutores a entender necessidades reais antes da escolha e a manter uma rotina de cuidado depois da decisão."
        />

        <section className="rounded-[2rem] border border-emerald-900/10 bg-white/85 p-5 shadow-card dark:border-slate-700/80 dark:bg-slate-900/90 md:p-7">
          <p className="inline-flex rounded-full border border-emerald-900/10 bg-[#edf3ec] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-emerald-900 dark:border-emerald-200/20 dark:bg-emerald-950/50 dark:text-emerald-100">
            Piloto pronto para validação
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="home-stat-tile rounded-2xl bg-[#f3f7f2] px-2 py-4 text-center dark:bg-emerald-950/50"
              >
                <p className="text-2xl font-black text-emerald-950 dark:text-emerald-50 md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[0.62rem] font-bold leading-tight text-emerald-800/75 dark:text-emerald-200/75 md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/explore"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-soft transition-all hover:bg-primary-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.98]"
            >
              Ver catálogo
            </Link>
            <Link
              to="/adoption-match"
              className="home-secondary-cta inline-flex h-11 items-center justify-center rounded-xl border border-emerald-900/10 bg-white/80 px-5 text-sm font-bold text-emerald-950 shadow-xs transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.98]"
            >
              Adoção responsável
            </Link>
            <Link
              to="/profile"
              className="home-secondary-cta inline-flex h-11 items-center justify-center rounded-xl border border-emerald-900/10 bg-white/80 px-5 text-sm font-bold text-emerald-950 shadow-xs transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.98]"
            >
              Perfil do tutor
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-900/80">
            <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">O problema</h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              <li>• Muitos tutores escolhem pets sem conhecer necessidades reais de cada espécie.</li>
              <li>• Falta de informação gera frustração, cuidado inadequado e abandono.</li>
              <li>• Cada animal exige ambiente, rotina, custos e atenção diferentes.</li>
            </ul>
          </section>

          <section className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-900/80">
            <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">A solução</h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              <li>• Catálogo educativo visual com {TOTAL_BREEDS} fichas</li>
              <li>• Fichas por espécie com cuidados práticos</li>
              <li>• Cadastro do pet e lembretes de rotina</li>
              <li>• Simulador para apoiar uma escolha mais consciente</li>
            </ul>
          </section>
        </div>

        <section className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-900/80 md:p-6">
          <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">O piloto já entrega</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {delivered.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-[#f3f7f2] px-4 py-3 text-sm font-semibold text-emerald-950 dark:bg-emerald-950/35 dark:text-emerald-50"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-900/80 md:p-6">
          <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Próximos passos</h2>
          <div className="mt-4 grid gap-3">
            {nextSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-emerald-900/10 bg-[#fbfaf7] px-4 py-3 dark:border-slate-700/80 dark:bg-slate-950/50"
              >
                <p className="text-[0.68rem] font-bold uppercase tracking-wide text-emerald-800/75 dark:text-emerald-200/75">
                  {step.phase}
                </p>
                <h3 className="mt-1 font-serif text-lg font-bold text-emerald-950 dark:text-emerald-50">{step.title}</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-relaxed text-amber-950 shadow-xs dark:border-amber-700/40 dark:bg-amber-950/35 dark:text-amber-100">
          Este app oferece informações educativas e não substitui orientação veterinária.
        </aside>
      </div>
    </div>
  );
}
