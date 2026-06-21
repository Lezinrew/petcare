import { z } from 'zod';
import { ApiError } from '../../utils/apiError';
import { env } from '../../config/env';
import { petRepository } from './pet.repository';
import { CreatePetInput, PetProfile, UpdatePetInput } from './pet.types';

const createPetSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  species: z.enum(['dog', 'cat', 'other']),
  breedSlug: z.string().optional(),
  ageMonths: z.number().min(0).optional(),
  weightKg: z.number().min(0).optional(),
  sex: z.enum(['male', 'female', 'unknown']).optional(),
  neutered: z.boolean().optional(),
  notes: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
});

const updatePetSchema = createPetSchema.partial();

export class PetService {
  private get userId(): string {
    return env.demoUserId;
  }

  async list(): Promise<PetProfile[]> {
    return petRepository.findByUserId(this.userId);
  }

  async getById(id: string): Promise<PetProfile> {
    const pet = await petRepository.findById(id, this.userId);
    if (!pet) throw new ApiError(404, 'PET_NOT_FOUND', 'Pet não encontrado');
    return pet;
  }

  async create(input: CreatePetInput): Promise<PetProfile> {
    const data = createPetSchema.parse(input);
    return petRepository.create({ ...data, userId: this.userId, photoUrl: data.photoUrl || undefined });
  }

  async update(id: string, input: UpdatePetInput): Promise<PetProfile> {
    const data = updatePetSchema.parse(input);
    const pet = await petRepository.update(id, this.userId, data);
    if (!pet) throw new ApiError(404, 'PET_NOT_FOUND', 'Pet não encontrado');
    return pet;
  }

  async delete(id: string): Promise<void> {
    const deleted = await petRepository.delete(id, this.userId);
    if (!deleted) throw new ApiError(404, 'PET_NOT_FOUND', 'Pet não encontrado');
  }
}

export const petService = new PetService();
