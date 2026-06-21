import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { PET_CATEGORIES, TOTAL_BREEDS } from '../config/species';

export function ExplorePage() {
  return (
    <div className="page-container">
      <PageHeader
        title="Explorar Pets"
        subtitle="Selecione um animal para conhecer suas raças, características, alimentação, cuidados e curiosidades."
      />

      <p className="-mt-4 mb-6 inline-flex rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
        {TOTAL_BREEDS} raças e espécies catalogadas
      </p>

      <ul className="flex flex-col gap-3">
        {PET_CATEGORIES.map((category) => (
          <li key={category.routeKey}>
            <Link to={`/${category.routeKey}`} className="group block">
              <Card interactive className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-xs ${category.accentClass}`}
                >
                  {category.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-primary">
                    {category.labelPlural}
                  </h2>
                  <p className="text-sm text-text-secondary">{category.description}</p>
                  <p className="mt-1 text-xs font-medium text-primary">{category.count} fichas</p>
                </div>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-lg font-semibold text-primary transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  ›
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
