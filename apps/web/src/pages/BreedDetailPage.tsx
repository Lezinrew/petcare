import { useParams } from 'react-router-dom';
import { BreedHero } from '../components/animal/BreedHero';
import { BreedStatsBar } from '../components/animal/BreedStatsBar';
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
      <div className="page-container">
        <ErrorState message="Categoria não encontrada" />
      </div>
    );
  }

  if (loading) return <div className="page-container"><LoadingState /></div>;
  if (error || !breed) {
    return (
      <div className="page-container">
        <ErrorState message={error ?? 'Ficha não encontrada'} onRetry={refetch} />
      </div>
    );
  }

  const sections = getCareSectionsForSpecies(breed.species);

  return (
    <div className="page-container space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <ButtonLink to={`/${speciesKey}`} variant="ghost-primary" size="sm">
          ← Voltar
        </ButtonLink>
        <ButtonLink
          href={`/generated/pets/${speciesKey}/${breed.slug}.html`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-accent"
          size="sm"
        >
          Abrir HTML deste pet
        </ButtonLink>
      </div>

      <BreedHero breed={breed} />
      <BreedStatsBar breed={breed} />

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <CareInfoCard
            key={section.key}
            title={section.title}
            icon={section.icon}
            color={section.color}
            borderColor={section.borderColor}
            disclaimer={section.disclaimer}
          >
            {section.render(breed.care)}
          </CareInfoCard>
        ))}
      </div>

      <aside className="disclaimer-banner">
        ⚕️ Informação educativa. Não substitui orientação veterinária.
      </aside>
    </div>
  );
}
