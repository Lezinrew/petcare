import { apiPost } from './api';
import { AdoptionMatchRequest, AdoptionMatchResult } from '../types/adoption';

export async function matchAdoption(input: AdoptionMatchRequest): Promise<AdoptionMatchResult> {
  return apiPost<AdoptionMatchResult>('/adoption/match', input);
}
