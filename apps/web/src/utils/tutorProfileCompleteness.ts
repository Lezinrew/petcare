import { TutorProfile } from '../types/tutorProfile';

const PROFILE_CHECKLIST = [
  { key: 'name', label: 'Nome do tutor', shortLabel: 'nome', filled: (p: TutorProfile) => !!p.name?.trim() },
  { key: 'city', label: 'Cidade', shortLabel: 'cidade', filled: (p: TutorProfile) => !!p.city?.trim() },
  { key: 'state', label: 'UF', shortLabel: 'UF', filled: (p: TutorProfile) => !!p.state?.trim() },
  { key: 'housingType', label: 'Tipo de moradia', shortLabel: 'moradia', filled: (p: TutorProfile) => !!p.housingType },
  { key: 'petExperience', label: 'Experiência com pets', shortLabel: 'experiência', filled: (p: TutorProfile) => !!p.petExperience },
] as const;

export type TutorProfileChecklistItem = {
  key: string;
  label: string;
  filled: boolean;
};

export type TutorProfileCompleteness = {
  filled: number;
  total: number;
  missingLabels: string[];
  isComplete: boolean;
};

export function getTutorProfileChecklist(profile: TutorProfile | null): TutorProfileChecklistItem[] {
  return PROFILE_CHECKLIST.map((item) => ({
    key: item.key,
    label: item.label,
    filled: profile ? item.filled(profile) : false,
  }));
}

export function getTutorProfileCompleteness(profile: TutorProfile | null): TutorProfileCompleteness {
  if (!profile) {
    return {
      filled: 0,
      total: PROFILE_CHECKLIST.length,
      missingLabels: PROFILE_CHECKLIST.map((item) => item.shortLabel),
      isComplete: false,
    };
  }

  const missingLabels = PROFILE_CHECKLIST
    .filter((item) => !item.filled(profile))
    .map((item) => item.shortLabel);

  return {
    filled: PROFILE_CHECKLIST.length - missingLabels.length,
    total: PROFILE_CHECKLIST.length,
    missingLabels,
    isComplete: missingLabels.length === 0,
  };
}