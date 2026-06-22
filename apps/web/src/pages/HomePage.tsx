import { Link } from 'react-router-dom';
import { ButtonLink } from '../components/ui/ButtonLink';
import { TutorProfileIncompleteBanner, TutorProfileIncompleteBadge } from '../components/tutor/TutorProfileIncompleteBadge';
import { tutorDisplayName, useTutorProfile } from '../contexts/TutorProfileContext';
import { PET_CATEGORIES, TOTAL_BREEDS } from '../config/species';

const navCards = [
  { to: '/explore', title: 'Catálogo de pets', desc: 'Entenda necessidades antes da escolha', icon: '⌕', tone: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100' },
  { to: '/profile', title: 'Meu perfil', desc: 'Dados básicos do tutor no modo demo', icon: '◎', tone: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-100' },
  { to: '/my-pets', title: 'Meu Pet', desc: 'Perfil e rotina de cada companheiro', icon: '✦', tone: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-100' },
  { to: '/reminders', title: 'Lembretes', desc: 'Cuidados importantes sem depender da memória', icon: '◷', tone: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100' },
  { to: '/adoption-match', title: 'Adoção responsável', desc: 'Compatibilidade antes da decisão', icon: '♡', tone: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-100' },
];

const stats = [
  { value: String(TOTAL_BREEDS), label: 'Animais catalogados' },
  { value: String(PET_CATEGORIES.length), label: 'Grupos de espécies' },
  { value: '1', label: 'Missão: menos abandono' },
];

export function HomePage() {
  const { profile, loading } = useTutorProfile();
  const firstName = tutorDisplayName(profile);
  const featured = PET_CATEGORIES.slice(0, 5);

  return (
    <div className="care-page">
      <section className="relative overflow-hidden px-5 pb-6 pt-5 md:px-8 md:pb-8 md:pt-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="inline-flex rounded-full border border-emerald-900/10 bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-emerald-900 shadow-xs dark:border-emerald-200/20 dark:bg-white/10 dark:text-emerald-100">
                  PetCare Responsável
                </p>
                {firstName && (
                  <p className="inline-flex rounded-full bg-[#edf3ec] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
                    Olá, {firstName}
                  </p>
                )}
              </div>
              <h1 className="mt-4 max-w-xl font-serif text-[2.35rem] font-bold leading-[1.06] text-emerald-950 dark:text-emerald-50 md:text-5xl">
                {firstName ? (
                  <>
                    Cuide com consciência,
                    <span className="block text-emerald-800 dark:text-emerald-200">{firstName}.</span>
                  </>
                ) : (
                  'Conheça melhor. Cuide melhor. Abandone menos.'
                )}
              </h1>
              <p className="mt-4 max-w-xl text-[0.98rem] font-medium leading-relaxed text-slate-700 dark:text-slate-200">
                {firstName
                  ? 'Sua rotina começa com informação clara, perfil organizado e lembretes que ajudam a não esquecer o essencial.'
                  : 'Informação prática para escolher com consciência, organizar a rotina e evitar que expectativa vire abandono.'}
              </p>
              {!loading && <TutorProfileIncompleteBanner profile={profile} className="mt-4" />}
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/explore"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-soft transition-all hover:bg-primary-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.98]"
                >
                  Ver espécies
                </Link>
                <Link
                  to="/reminders"
                  className="home-secondary-cta inline-flex h-11 items-center justify-center rounded-xl border border-emerald-900/10 bg-white/80 px-5 text-sm font-bold text-emerald-950 shadow-xs transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.98]"
                >
                  Ver lembretes
                </Link>
              </div>
            </div>

              <div className="home-summary-card rounded-[1.75rem] border border-emerald-950/10 bg-white/80 p-3.5 shadow-card backdrop-blur-sm dark:border-emerald-200/10 dark:bg-slate-900/80">
                <div className="grid grid-cols-3 gap-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="home-stat-tile rounded-[1.15rem] bg-[#f3f7f2] px-2.5 py-3.5 text-center dark:bg-emerald-950/50">
                    <p className="text-2xl font-black text-emerald-950 dark:text-emerald-50">{stat.value}</p>
                    <p className="mt-1 text-[0.68rem] font-bold leading-tight text-emerald-800/75 dark:text-emerald-200/75">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {featured.map((category) => (
                  <Link
                    key={category.routeKey}
                    to={`/${category.routeKey}`}
                    className="home-feature-thumb group overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 shadow-xs dark:border-slate-700 dark:bg-slate-800"
                    aria-label={category.labelPlural}
                  >
                    <img
                      src={category.coverImage}
                      alt=""
                      className="aspect-square w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-10 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {navCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="home-nav-card group relative flex items-center gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-card dark:border-slate-700/80 dark:bg-slate-900/80"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold ${card.tone}`}>
                {card.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="home-nav-card-title flex flex-wrap items-center gap-2 font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50">
                  {card.title}
                  {card.to === '/profile' && <TutorProfileIncompleteBadge profile={profile} />}
                </span>
                <span className="home-nav-card-desc mt-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">{card.desc}</span>
              </span>
              <span className="home-nav-card-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf3ec] text-xl text-emerald-900 transition-colors group-hover:bg-emerald-900 group-hover:text-white dark:bg-slate-800 dark:text-emerald-100 dark:group-hover:bg-emerald-600">
                ›
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-36 md:px-8 md:pb-12">
        <div className="grid gap-4 md:grid-cols-[1fr_0.75fr]">
          <div className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-900/80">
            <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Por que isso importa?</h2>
            <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              Muitos abandonos começam antes da adoção, quando expectativa e rotina real não combinam.
              O PetCare transforma características, necessidades e lembretes em decisões mais conscientes.
            </p>
          </div>
          <aside className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-relaxed text-amber-950 shadow-xs dark:border-amber-700/40 dark:bg-amber-950/35 dark:text-amber-100">
            Este app oferece informações educativas e não substitui orientação veterinária.
            <p className="mt-4">
              <ButtonLink to="/demo" variant="ghost-primary" size="sm">
                Ver apresentação do piloto
              </ButtonLink>
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
