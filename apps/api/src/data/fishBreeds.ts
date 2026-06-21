import { buildBreedsFromNames } from './breedFactory';

const FISH_NAMES = [
  'Betta',
  'Cascudo',
  'Guppy',
  'Corydora',
  'Peixe-Palhaço',
  'Oscar',
  'Colisa',
  'Ramirezi',
  'Lagosta',
  'Camarão',
];

export const allFishBreeds = buildBreedsFromNames(FISH_NAMES, 'fish');
