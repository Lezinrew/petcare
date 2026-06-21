export type PetProfile = {
  id?: string;
  userId: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breedSlug?: string;
  ageMonths?: number;
  weightKg?: number;
  sex?: 'male' | 'female' | 'unknown';
  neutered?: boolean;
  notes?: string;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreatePetInput = Omit<PetProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
export type UpdatePetInput = Partial<CreatePetInput>;
