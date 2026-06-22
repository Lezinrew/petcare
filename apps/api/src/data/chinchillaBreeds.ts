import { buildBreedsFromNames } from './breedFactory';

export const allChinchillaBreeds = buildBreedsFromNames(
  ['Chinchila Standard', 'Chinchila Bege', 'Chinchila Mosaico', 'Chinchila Ebony'],
  'chinchilla',
);
