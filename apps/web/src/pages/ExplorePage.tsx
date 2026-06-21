import { ButtonLink } from '../components/ui/ButtonLink';
import { PET_CATEGORIES, TOTAL_BREEDS } from '../config/species';

const GRADIENTS: Record<string, string> = {
  dogs: 'from-primary via-[#0e4a8a] to-[#1565a8]',
  cats: 'from-teal-600 to-cyan-700',
  fish: 'from-sky-500 to-blue-700',
  hamsters: 'from-orange-500 to-amber-600',
  birds: 'from-pink-500 to-rose-600',
  rabbits: 'from-violet-500 to-purple-700',
};

export function ExplorePage() {
  return (
    <div className="page-container">
      <section className="hero-gradient mb-8 rounded-2xl p-6 text-white shadow-soft md:p-8">
        <p className="text-sm font-medium tracking-wide text-primary-light/90">Catálogo educativo</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Explore os pets</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-primary-light/95">
          Conheça espécies, raças e cuidados essenciais antes de escolher ou cuidar de um animal.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            {TOTAL_BREEDS} fichas catalogadas
          </span>
          <ButtonLink
            href="/generated/pets/index.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="glass"
            size="sm"
          >
            Abrir catálogo HTML
          </ButtonLink>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {PET_CATEGORIES.map((category) => (
          <article
            key={category.routeKey}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${GRADIENTS[category.routeKey]} p-5 text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-card`}
          >
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl backdrop-blur-sm">
                  {category.emoji}
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                  {category.count}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{category.labelPlural}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink to={`/${category.routeKey}`} variant="inverse" size="sm">
                  Explorar
                </ButtonLink>
                <ButtonLink
                  href={`/generated/pets/${category.routeKey}/index.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="glass"
                  size="sm"
                >
                  HTML
                </ButtonLink>
              </div>
            </div>
            <span className="pointer-events-none absolute -bottom-4 -right-2 text-8xl opacity-10">
              {category.emoji}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
