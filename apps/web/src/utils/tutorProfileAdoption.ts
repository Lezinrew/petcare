import { AdoptionMatchRequest } from '../types/adoption';
import { TutorProfile } from '../types/tutorProfile';

export function adoptionDefaultsFromTutorProfile(
  profile: TutorProfile,
  base: AdoptionMatchRequest,
): AdoptionMatchRequest {
  const next = { ...base };

  if (profile.housingType === 'apartment') {
    next.housing = 'apartment';
    next.hasBackyard = false;
  } else if (profile.housingType === 'house') {
    next.housing = 'house';
    next.hasBackyard = false;
  } else if (profile.housingType === 'house_with_yard') {
    next.housing = 'house';
    next.hasBackyard = true;
  }

  if (profile.petExperience) {
    next.experienceLevel = profile.petExperience;
  }

  return next;
}
