import { useParams } from 'react-router-dom';
import { BreedHero } from '../components/animal/BreedHero';
import { CareInfoCard } from '../components/animal/CareInfoCard';
import { ButtonLink } from '../components/ui/ButtonLink';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { getCategoryByRoute, SpeciesRouteKey } from '../config/species';
import { useAsync } from '../hooks/useAsync';
import { fetchBreedBySlug } from '../services/animals.service';
import { getCareSectionsForSpecies } from '../utils/speciesCareSections';

export function BreedDetailPage() {
  const { speciesKey, slug } = useParams<{ speciesKey: SpeciesRouteKey; slug: string }>();
  const category = speciesKey ? getCategoryByRoute(speciesKey) : undefined;

  const { data: breed, loading, error, refetch } = useAsync(
    () => fetchBreedBySlug(speciesKey!, slug!),
    [speciesKey, slug],
  );

  if (!category) {
    return (
      <div className="page-container-wide">
        <ErrorState message="Categoria não encontrada" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container-wide">
        <LoadingState />
      </div>
    );
  }

  if (error || !breed) {
    return (
      <div className="page-container-wide">
        <ErrorState message={error ?? 'Ficha não encontrada'} onRetry={refetch} />
      </div>
    );
  }

  const sections = getCareSectionsForSpecies(breed.species);

  return (
    <div className="page-container-wide space-y-6">
      <ButtonLink to={`/${speciesKey}`} variant="outline-accent" size="sm" className="font-semibold">
        ← Voltar
      </ButtonLink>

      <BreedHero breed={breed} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <CareInfoCard
            key={section.key}
            sectionKey={section.key}
            title={section.title}
            icon={section.icon}
            color={section.color}
            iconBg={section.iconBg}
            disclaimer={section.disclaimer}
          >
            {section.render(breed.care)}
          </CareInfoCard>
        ))}
      </div>

      <footer className="border-t border-border pt-6">
        <p className="text-center text-sm font-medium leading-relaxed text-text-secondary">
          <span aria-hidden>🐾 </span>
          Lembre-se: cada animal é único! As informações são educativas e não substituem orientação
          veterinária profissional.
          <span aria-hidden> 🐾</span>
        </p>
      </footer>
    </div>
  );
}
