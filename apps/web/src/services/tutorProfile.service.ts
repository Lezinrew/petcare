import { apiGet, apiPut } from './api';
import { TutorProfile, UpdateTutorProfileInput } from '../types/tutorProfile';

export async function fetchTutorProfile(): Promise<TutorProfile> {
  return apiGet<TutorProfile>('/tutor-profile');
}

export async function updateTutorProfile(input: UpdateTutorProfileInput): Promise<TutorProfile> {
  return apiPut<TutorProfile>('/tutor-profile', input);
}
