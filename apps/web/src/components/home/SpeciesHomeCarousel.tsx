import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PET_CATEGORIES } from '../../config/species';
import { cn } from '../../utils/cn';

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Espécies anteriores' : 'Próximas espécies'}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all',
        'border-emerald-900/10 bg-white/90 text-emerald-900 shadow-xs',
        'hover:bg-emerald-900 hover:text-white disabled:pointer-events-none disabled:opacity-30',
        'dark:border-slate-600 dark:bg-slate-800 dark:text-emerald-100 dark:hover:bg-emerald-600',
      )}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}

export function SpeciesHomeCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByStep = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.72, 120);
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  return (
    <div className="mt-2.5 min-w-0">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[0.62rem] font-bold uppercase tracking-wide text-emerald-800/80 dark:text-emerald-200/80">
          Role e escolha uma espécie
        </p>
        <Link
          to="/explore"
          className="shrink-0 text-[0.62rem] font-bold text-emerald-700 transition-colors hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100"
        >
          Ver todas →
        </Link>
      </div>
      <div className="flex min-w-0 items-center gap-1.5">
        <CarouselArrow direction="left" onClick={() => scrollByStep('left')} disabled={!canScrollLeft} />
        <div className="home-species-carousel min-w-0 flex-1 overflow-hidden">
          <div
            ref={scrollerRef}
            className="flex gap-2 overflow-x-auto scroll-smooth pb-0.5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PET_CATEGORIES.map((category) => (
              <Link
                key={category.routeKey}
                to={`/explore?species=${category.routeKey}`}
                aria-label={`Explorar ${category.labelPlural}`}
                className="home-species-carousel-item group w-[3.35rem] shrink-0 snap-start sm:w-[3.65rem]"
              >
                <span className="block overflow-hidden rounded-xl border border-slate-100 bg-white p-0.5 shadow-xs transition-all group-hover:-translate-y-0.5 group-hover:shadow-card dark:border-slate-700 dark:bg-slate-800">
                  <img
                    src={category.avatarImage}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = category.coverFallback;
                    }}
                  />
                </span>
                <span className="mt-1 block truncate text-center text-[0.58rem] font-bold leading-tight text-emerald-900 dark:text-emerald-100">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <CarouselArrow direction="right" onClick={() => scrollByStep('right')} disabled={!canScrollRight} />
      </div>
    </div>
  );
}
