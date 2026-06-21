import { useCallback, useEffect, useState } from 'react';
import { BreedCard } from '../components/animal/BreedCard';
import { PageHeader } from '../components/layout/PageHeader';
import { ErrorState } from '../components/ui/ErrorState';
import { Input } from '../components/ui/Input';
import { LoadingState } from '../components/ui/LoadingState';
import { Select } from '../components/ui/Select';
import { fetchDogs } from '../services/animals.service';
import { AnimalBreed, DogFilters } from '../types/animal';
import { energyLabels, sizeLabels } from '../utils/labels';

export function DogsPage() {
  const [breeds, setBreeds] = useState<AnimalBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DogFilters>({ search: '', size: '', energyLevel: '' });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDogs(filters);
      setBreeds(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar raças');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <div className="page-container">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Catálogo de cães"
          subtitle="Explore 30 raças, entenda porte, energia e cuidados essenciais antes de decidir."
        />
        <a
          href="/generated/dogs/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl border border-primary/20 bg-primary-light px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
        >
          Ver catálogo HTML
        </a>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Input
          label="Buscar por nome"
          placeholder="Ex: Labrador"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
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
      </div>

      {loading && <LoadingState message="Carregando raças..." />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && breeds.length === 0 && (
        <p className="py-8 text-center text-text-secondary">Nenhuma raça encontrada.</p>
      )}
      {!loading && !error && breeds.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((breed) => (
            <BreedCard key={breed.slug} breed={breed} />
          ))}
        </div>
      )}
    </div>
  );
}
