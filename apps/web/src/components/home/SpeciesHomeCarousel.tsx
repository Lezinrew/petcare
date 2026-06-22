import { Link } from 'react-router-dom';
import { PET_CATEGORIES } from '../../config/species';

export function SpeciesHomeCarousel() {
  return (
    <div className="mt-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[0.68rem] font-bold uppercase tracking-wide text-emerald-800/80 dark:text-emerald-200/80">
          Role e escolha uma espécie
        </p>
        <Link
          to="/explore"
          className="text-[0.68rem] font-bold text-emerald-700 transition-colors hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100"
        >
          Ver todas →
        </Link>
      </div>
      <div className="home-species-carousel -mx-1 px-1">
        <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth">
          {PET_CATEGORIES.map((category) => (
            <Link
              key={category.routeKey}
              to={`/explore?species=${category.routeKey}`}
              aria-label={`Explorar ${category.labelPlural}`}
              className="home-species-carousel-item group w-[4.75rem] shrink-0 snap-start sm:w-[5.25rem]"
            >
              <span className="block overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 shadow-xs transition-all group-hover:-translate-y-0.5 group-hover:shadow-card dark:border-slate-700 dark:bg-slate-800">
                <img
                  src={category.coverImage}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = category.coverFallback;
                  }}
                />
              </span>
              <span className="mt-1.5 block truncate text-center text-[0.65rem] font-bold leading-tight text-emerald-900 dark:text-emerald-100">
                {category.label}
              </span>
              <span className="block text-center text-[0.6rem] font-semibold text-slate-500 dark:text-slate-400">
                {category.count} fichas
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
