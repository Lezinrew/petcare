import { Species } from '../types/animal';

const EMOJI: Record<Species, string> = {
  dog: '🐕',
  cat: '🐱',
  fish: '🐠',
  hamster: '🐹',
  bird: '🐦',
  rabbit: '🐰',
};

export function getSpeciesEmoji(species: Species): string {
  return EMOJI[species] ?? '🐾';
}
