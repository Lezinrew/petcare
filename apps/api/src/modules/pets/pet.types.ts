export type PetSpecies =
  | 'dog'
  | 'cat'
  | 'fish'
  | 'hamster'
  | 'bird'
  | 'rabbit'
  | 'turtle'
  | 'twister'
  | 'guinea_pig'
  | 'chinchilla'
  | 'gerbil'
  | 'ferret'
  | 'lizard'
  | 'other';

export type PetProfile = {
  id?: string;
  userId: string;
  name: string;
  species: PetSpecies;
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
