import { apiDelete, apiGet, apiPost, apiPut } from './api';
import { CreatePetInput, PetProfile } from '../types/pet';

export async function fetchPets(): Promise<PetProfile[]> {
  return apiGet<PetProfile[]>('/pets');
}

export async function createPet(input: CreatePetInput): Promise<PetProfile> {
  return apiPost<PetProfile>('/pets', input);
}

export async function updatePet(id: string, input: Partial<CreatePetInput>): Promise<PetProfile> {
  return apiPut<PetProfile>(`/pets/${id}`, input);
}

export async function deletePet(id: string): Promise<void> {
  return apiDelete(`/pets/${id}`);
}
