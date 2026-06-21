import { ApiError } from '../../utils/apiError';
import { env } from '../../config/env';
import { animalRepository } from './animal.repository';
import { AnimalBreed, DogFilters } from './animal.types';
import { runDogSeed } from '../../seed/seedDogs';

export class AnimalService {
  async listDogs(filters: DogFilters): Promise<AnimalBreed[]> {
    return animalRepository.findDogs(filters);
  }

  async getDogBySlug(slug: string): Promise<AnimalBreed> {
    const breed = await animalRepository.findBySlug(slug);
    if (!breed) {
      throw new ApiError(404, 'BREED_NOT_FOUND', 'Raça não encontrada');
    }
    return breed;
  }

  async seedDogs(): Promise<{ count: number }> {
    if (!env.isDevelopment) {
      throw new ApiError(403, 'SEED_NOT_ALLOWED', 'Seed permitido apenas em development');
    }
    const count = await runDogSeed();
    return { count };
  }
}

export const animalService = new AnimalService();
