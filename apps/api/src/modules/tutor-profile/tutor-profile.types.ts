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
