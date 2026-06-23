import { Species } from '../types/animal';

const EMOJI: Record<Species, string> = {
  dog: '🐕',
  cat: '🐱',
  fish: '🐠',
  hamster: '🐹',
  bird: '🐦',
  rabbit: '🐰',
  turtle: '🐢',
  twister: '🐀',
  guinea_pig: '🐹',
  chinchilla: '🐭',
  gerbil: '🐭',
  ferret: '🦦',
  lizard: '🦎',
};

export function getSpeciesEmoji(species: Species): string {
  return EMOJI[species] ?? '🐾';
}
