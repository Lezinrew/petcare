import { apiGet } from './api';
import { AnimalBreed, DogFilters } from '../types/animal';

export async function fetchDogs(filters: DogFilters = {}): Promise<AnimalBreed[]> {
  const params: Record<string, string> = {};
  if (filters.search) params.search = filters.search;
  if (filters.size) params.size = filters.size;
  if (filters.energyLevel) params.energyLevel = filters.energyLevel;
  return apiGet<AnimalBreed[]>('/animals/dogs', params);
}

export async function fetchDogBySlug(slug: string): Promise<AnimalBreed> {
  return apiGet<AnimalBreed>(`/animals/dogs/${slug}`);
}
