import { env } from '../config/env';
import { tutorProfileRepository } from '../modules/tutor-profile/tutor-profile.repository';

const DEMO_TUTOR_PROFILE = {
  name: 'Tutor Demo',
  city: 'São Paulo',
  state: 'SP',
  housingType: 'apartment' as const,
  petExperience: 'some' as const,
  notes: 'Perfil inicial do piloto para demonstração.',
};

export async function runTutorProfileSeed(): Promise<void> {
  await tutorProfileRepository.upsert(env.demoUserId, DEMO_TUTOR_PROFILE);
  console.log(`[seed] Perfil demo do tutor (${env.demoUserId}) pronto`);
}
