import { apiGet } from './api';
import { AnimalBreed, DogFilters } from '../types/animal';
import { SpeciesRouteKey } from '../config/species';

export async function fetchBreeds(routeKey: SpeciesRouteKey, filters: DogFilters = {}): Promise<AnimalBreed[]> {
  const params: Record<string, string> = {};
  if (filters.search) params.search = filters.search;
  if (filters.size) params.size = filters.size;
  if (filters.energyLevel) params.energyLevel = filters.energyLevel;
  return apiGet<AnimalBreed[]>(`/animals/${routeKey}`, params);
}

export async function fetchBreedBySlug(routeKey: SpeciesRouteKey, slug: string): Promise<AnimalBreed> {
  return apiGet<AnimalBreed>(`/animals/${routeKey}/${slug}`);
}

/** @deprecated use fetchBreeds('dogs') */
export async function fetchDogs(filters: DogFilters = {}): Promise<AnimalBreed[]> {
  return fetchBreeds('dogs', filters);
}

/** @deprecated use fetchBreedBySlug('dogs', slug) */
export async function fetchDogBySlug(slug: string): Promise<AnimalBreed> {
  return fetchBreedBySlug('dogs', slug);
}
