import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreedCard } from '../components/animal/BreedCard';
import { PageHeader } from '../components/layout/PageHeader';
import { ErrorState } from '../components/ui/ErrorState';
import { Input } from '../components/ui/Input';
import { LoadingState } from '../components/ui/LoadingState';
import { Select } from '../components/ui/Select';
import { getCategoryByRoute, SpeciesRouteKey } from '../config/species';
import { fetchBreeds } from '../services/animals.service';
import { AnimalBreed, DogFilters } from '../types/animal';
import { energyLabels, sizeLabels } from '../utils/labels';

export function BreedCatalogPage() {
  const { speciesKey } = useParams<{ speciesKey: SpeciesRouteKey }>();
  const category = speciesKey ? getCategoryByRoute(speciesKey) : undefined;

  const [breeds, setBreeds] = useState<AnimalBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DogFilters>({ search: '', size: '', energyLevel: '' });

  const load = useCallback(async () => {
    if (!speciesKey || !category) return;
    setLoading(true);
    setError(null);
    try {
      setBreeds(await fetchBreeds(speciesKey, filters));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  }, [speciesKey, category, filters]);

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [load]);

  if (!category) {
    return (
      <div className="page-container">
        <ErrorState message="Categoria não encontrada" />
      </div>
    );
  }

  const showSizeFilters = category.species === 'dog' || category.species === 'cat' || category.species === 'rabbit';

  return (
    <div className="page-container">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="/explore" className="text-sm text-primary hover:underline">← Explorar</Link>
          <PageHeader
            title={`${category.emoji} ${category.labelPlural}`}
            subtitle={`Explore ${category.count} fichas educativas de ${category.labelPlural.toLowerCase()}.`}
          />
        </div>
        <a
          href={`/generated/pets/${category.routeKey}/index.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl border border-primary/20 bg-primary-light px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
        >
          Ver catálogo HTML
        </a>
      </div>

      <div className={`mb-6 grid gap-3 ${showSizeFilters ? 'sm:grid-cols-3' : ''}`}>
        <Input
          label="Buscar por nome"
          placeholder="Ex: Persa"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        {showSizeFilters && (
          <>
            <Select
              label="Porte"
              value={filters.size ?? ''}
              onChange={(e) => setFilters({ ...filters, size: e.target.value as DogFilters['size'] })}
              options={[
                { value: '', label: 'Todos' },
                ...Object.entries(sizeLabels).map(([value, label]) => ({ value, label })),
              ]}
            />
            <Select
              label="Energia"
              value={filters.energyLevel ?? ''}
              onChange={(e) => setFilters({ ...filters, energyLevel: e.target.value as DogFilters['energyLevel'] })}
              options={[
                { value: '', label: 'Todos' },
                ...Object.entries(energyLabels).map(([value, label]) => ({ value, label })),
              ]}
            />
          </>
        )}
      </div>

      {loading && <LoadingState message="Carregando..." />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && breeds.length === 0 && (
        <p className="py-8 text-center text-text-secondary">Nenhum resultado encontrado.</p>
      )}
      {!loading && !error && breeds.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((breed) => (
            <BreedCard key={breed.slug} breed={breed} routeKey={speciesKey!} />
          ))}
        </div>
      )}
    </div>
  );
}
