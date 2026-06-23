import { Link } from 'react-router-dom';
import { PetCategory } from '../../config/species';

type Props = {
  category: PetCategory;
};

export function SpeciesExploreCard({ category }: Props) {
  return (
    <Link
      to={`/${category.routeKey}`}
      aria-label={`Explorar fichas de ${category.labelPlural}`}
      className="group relative flex min-h-[5.75rem] items-center gap-4 rounded-[1.35rem] border border-white/80 bg-white px-3.5 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-[0_16px_36px_rgba(0,0,0,0.28)] dark:hover:border-emerald-300/25 md:min-h-[15rem] md:flex-col md:items-start md:gap-4 md:p-5"
    >
      <div className="relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-full bg-[#f4f1eb] shadow-sm ring-1 ring-black/5 dark:bg-slate-800 dark:ring-emerald-200/15 md:aspect-[16/10] md:h-auto md:w-full md:rounded-3xl md:bg-[#eef3ea] md:p-2 dark:md:bg-slate-800/80">
        <img
          src={category.avatarImage}
          alt={category.labelPlural}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 md:object-contain"
          onError={(e) => {
            e.currentTarget.src = category.coverFallback;
          }}
        />
      </div>

      <div className="min-w-0 flex-1 text-left md:w-full">
        <h2 className="truncate font-display text-[1.55rem] font-semibold leading-tight tracking-tight text-[#083f31] dark:text-emerald-50 md:text-2xl">
          {category.labelPlural}
        </h2>
      </div>

      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eff3ea] text-[#286348] transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#e4eee4] dark:bg-slate-800 dark:text-emerald-100 dark:group-hover:bg-emerald-700 md:absolute md:bottom-5 md:right-5"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.3">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
