import { ApiError } from '../../utils/apiError';
import { env } from '../../config/env';
import { speciesFromRoute, SpeciesRouteKey } from '../../data/allBreeds';
import { animalRepository } from './animal.repository';
import { AnimalBreed, BreedFilters, Species } from './animal.types';
import { runAnimalSeed } from '../../seed/seedDogs';

export class AnimalService {
  async listBySpecies(species: Species, filters: BreedFilters): Promise<AnimalBreed[]> {
    return animalRepository.findBySpecies(species, filters);
  }

  async listByRoute(routeKey: SpeciesRouteKey, filters: BreedFilters): Promise<AnimalBreed[]> {
    const species = speciesFromRoute(routeKey);
    if (!species) {
      throw new ApiError(404, 'SPECIES_NOT_FOUND', 'Espécie não encontrada');
    }
    return this.listBySpecies(species, filters);
  }

  async listDogs(filters: BreedFilters): Promise<AnimalBreed[]> {
    return this.listBySpecies('dog', filters);
  }

  async getBySlug(species: Species, slug: string): Promise<AnimalBreed> {
    const breed = await animalRepository.findBySlug(slug, species);
    if (!breed) {
      throw new ApiError(404, 'BREED_NOT_FOUND', 'Raça não encontrada');
    }
    return breed;
  }

  async getByRoute(routeKey: SpeciesRouteKey, slug: string): Promise<AnimalBreed> {
    const species = speciesFromRoute(routeKey);
    if (!species) {
      throw new ApiError(404, 'SPECIES_NOT_FOUND', 'Espécie não encontrada');
    }
    return this.getBySlug(species, slug);
  }

  async getDogBySlug(slug: string): Promise<AnimalBreed> {
    return this.getBySlug('dog', slug);
  }

  async seedAnimals(): Promise<{ count: number }> {
    if (!env.isDevelopment) {
      throw new ApiError(403, 'SEED_NOT_ALLOWED', 'Seed permitido apenas em development');
    }
    const count = await runAnimalSeed();
    return { count };
  }

  /** @deprecated use seedAnimals */
  async seedDogs(): Promise<{ count: number }> {
    return this.seedAnimals();
  }
}

export const animalService = new AnimalService();
