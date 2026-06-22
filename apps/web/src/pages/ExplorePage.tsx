import { Link, useSearchParams } from 'react-router-dom';
import { SpeciesExploreCard } from '../components/explore/SpeciesExploreCard';
import { getCategoryByRoute, PET_CATEGORIES, TOTAL_BREEDS } from '../config/species';

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const speciesFilter = searchParams.get('species');
  const activeCategory = speciesFilter ? getCategoryByRoute(speciesFilter) : undefined;
  const visibleCategories = activeCategory ? [activeCategory] : PET_CATEGORIES;

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="page-container explore-page">
      <header className="mx-auto mb-7 max-w-lg text-center md:mb-8 md:max-w-2xl">
        <p className="mx-auto mb-4 inline-flex rounded-full border border-[#d8d1c4] bg-white/80 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-[#0f5a45] shadow-xs dark:border-emerald-200/20 dark:bg-slate-900/80 dark:text-emerald-100">
          {activeCategory ? `${activeCategory.count} fichas` : `${TOTAL_BREEDS} fichas educativas`}
        </p>
        <h1 className="font-display text-[2.4rem] font-semibold leading-none tracking-tight text-[#083f31] dark:text-emerald-50 md:text-5xl">
          {activeCategory ? activeCategory.labelPlural : 'Explorar Pets'}
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#d5b978]" />
        <p className="mx-auto mt-4 max-w-[21rem] font-serif text-[1.05rem] leading-snug text-[#4a4641] dark:text-slate-200 md:max-w-xl md:text-xl">
          {activeCategory
            ? `Fichas educativas de ${activeCategory.labelPlural.toLowerCase()}: características, cuidados e curiosidades.`
            : 'Selecione um animal para conhecer suas raças, características, alimentação, cuidados e curiosidades.'}
        </p>
        {activeCategory && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#edf3ec] px-3 py-1.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
              Filtro: {activeCategory.labelPlural}
              <button
                type="button"
                onClick={clearFilter}
                className="rounded-full bg-white/80 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-emerald-800 transition-colors hover:bg-white dark:bg-slate-800 dark:text-emerald-100 dark:hover:bg-slate-700"
                aria-label="Remover filtro de espécie"
              >
                ✕
              </button>
            </span>
            <button
              type="button"
              onClick={clearFilter}
              className="text-xs font-bold text-emerald-800 underline decoration-emerald-800/30 underline-offset-2 hover:text-emerald-950 dark:text-emerald-200 dark:hover:text-emerald-50"
            >
              Ver todas as espécies
            </button>
            <Link
              to={`/${activeCategory.routeKey}`}
              className="inline-flex h-9 items-center rounded-xl bg-[#0f5a45] px-4 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#0c4a39] dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Abrir catálogo
            </Link>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-lg flex-col gap-3 md:max-w-4xl md:grid md:grid-cols-2 md:gap-4 lg:max-w-5xl lg:grid-cols-3">
        {visibleCategories.map((category) => (
          <SpeciesExploreCard key={category.routeKey} category={category} />
        ))}
      </div>
    </div>
  );
}
