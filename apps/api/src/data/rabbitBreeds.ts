import { buildBreedsFromNames } from './breedFactory';

const RABBIT_NAMES = [
  'Mini Lion Head',
  'Chinchila',
  'Holland Lop',
  'Anão Holandês',
  'Rex',
  'Angorá Inglês',
  'Califórnia',
  'Fuzzy Lop',
];

export const allRabbitBreeds = buildBreedsFromNames(RABBIT_NAMES, 'rabbit');
