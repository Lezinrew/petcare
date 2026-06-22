export type HousingType = 'apartment' | 'house' | 'house_with_yard' | 'other';

export type PetExperienceLevel = 'none' | 'some' | 'experienced';

export type TutorProfile = {
  id?: string;
  userId: string;
  name?: string;
  city?: string;
  state?: string;
  housingType?: HousingType;
  petExperience?: PetExperienceLevel;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateTutorProfileInput = Omit<TutorProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

export const HOUSING_TYPE_OPTIONS: { value: HousingType; label: string }[] = [
  { value: 'apartment', label: 'Apartamento' },
  { value: 'house', label: 'Casa' },
  { value: 'house_with_yard', label: 'Casa com quintal' },
  { value: 'other', label: 'Outro' },
];

export const PET_EXPERIENCE_OPTIONS: { value: PetExperienceLevel; label: string }[] = [
  { value: 'none', label: 'Primeiro pet' },
  { value: 'some', label: 'Já tive pets antes' },
  { value: 'experienced', label: 'Experiente com vários pets' },
];

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const;
