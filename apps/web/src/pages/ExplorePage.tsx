import { SpeciesExploreCard } from '../components/explore/SpeciesExploreCard';
import { PET_CATEGORIES, TOTAL_BREEDS } from '../config/species';

export function ExplorePage() {
  return (
    <div className="page-container explore-page">
      <header className="mx-auto mb-7 max-w-lg text-center md:mb-8 md:max-w-2xl">
        <p className="mx-auto mb-4 inline-flex rounded-full border border-[#d8d1c4] bg-white/80 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-[#0f5a45] shadow-xs dark:border-emerald-200/20 dark:bg-slate-900/80 dark:text-emerald-100">
          {TOTAL_BREEDS} fichas educativas
        </p>
        <h1 className="font-display text-[2.4rem] font-semibold leading-none tracking-tight text-[#083f31] dark:text-emerald-50 md:text-5xl">
          Explorar Pets
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#d5b978]" />
        <p className="mx-auto mt-4 max-w-[21rem] font-serif text-[1.05rem] leading-snug text-[#4a4641] dark:text-slate-200 md:max-w-xl md:text-xl">
          Selecione um animal para conhecer suas raças, características, alimentação, cuidados e curiosidades.
        </p>
      </header>

      <div className="mx-auto flex max-w-lg flex-col gap-3 md:max-w-4xl md:grid md:grid-cols-2 md:gap-4 lg:max-w-5xl lg:grid-cols-3">
        {PET_CATEGORIES.map((category) => (
          <SpeciesExploreCard key={category.routeKey} category={category} />
        ))}
      </div>
    </div>
  );
}
