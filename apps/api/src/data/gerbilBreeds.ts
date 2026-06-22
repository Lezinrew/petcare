import { buildBreedsFromNames } from './breedFactory';

export const allGerbilBreeds = buildBreedsFromNames(
  ['Gerbil Mongol', 'Gerbil Argente', 'Gerbil Burmese', 'Gerbil Siamese'],
  'gerbil',
);
