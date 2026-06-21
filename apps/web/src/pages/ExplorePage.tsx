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

      <p className="mb-6 text-sm text-text-secondary">
        {TOTAL_BREEDS} raças e espécies catalogadas no PetCare Responsável.
      </p>

      <ul className="flex flex-col gap-3">
        {PET_CATEGORIES.map((category) => (
          <li key={category.routeKey}>
            <Link to={`/${category.routeKey}`}>
              <Card className="flex items-center gap-4 transition-shadow hover:shadow-md">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl ${category.accentClass}`}
                >
                  {category.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-text-primary">{category.labelPlural}</h2>
                  <p className="text-sm text-text-secondary">{category.description}</p>
                  <p className="mt-1 text-xs text-primary">{category.count} fichas</p>
                </div>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${category.accentClass}`}
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
