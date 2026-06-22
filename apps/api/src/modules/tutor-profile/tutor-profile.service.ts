import { z } from 'zod';
import { env } from '../../config/env';
import { tutorProfileRepository } from './tutor-profile.repository';
import { TutorProfile, UpdateTutorProfileInput } from './tutor-profile.types';

const updateTutorProfileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(120).optional().or(z.literal('')),
  city: z.string().max(80).optional().or(z.literal('')),
  state: z
    .string()
    .regex(/^[A-Za-z]{2}$/, 'UF deve ter 2 letras')
    .optional()
    .or(z.literal('')),
  housingType: z.enum(['apartment', 'house', 'house_with_yard', 'other']).optional(),
  petExperience: z.enum(['none', 'some', 'experienced']).optional(),
  notes: z.string().max(1000).optional().or(z.literal('')),
});

function emptyProfile(userId: string): TutorProfile {
  return { userId };
}

function normalizeInput(data: z.infer<typeof updateTutorProfileSchema>): UpdateTutorProfileInput {
  return {
    name: data.name || undefined,
    city: data.city || undefined,
    state: data.state ? data.state.toUpperCase() : undefined,
    housingType: data.housingType,
    petExperience: data.petExperience,
    notes: data.notes || undefined,
  };
}

export class TutorProfileService {
  private get userId(): string {
    return env.demoUserId;
  }

  async get(): Promise<TutorProfile> {
    const profile = await tutorProfileRepository.findByUserId(this.userId);
    return profile ?? emptyProfile(this.userId);
  }

  async upsert(input: UpdateTutorProfileInput): Promise<TutorProfile> {
    const data = normalizeInput(updateTutorProfileSchema.parse(input));
    return tutorProfileRepository.upsert(this.userId, data);
  }
}

export const tutorProfileService = new TutorProfileService();
