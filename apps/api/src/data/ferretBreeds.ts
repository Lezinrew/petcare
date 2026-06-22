import { buildBreedsFromNames } from './breedFactory';

export const allFerretBreeds = buildBreedsFromNames(
  ['Furao Sable', 'Furao Albino', 'Furao Champagne', 'Furao Cinnamon'],
  'ferret',
  {
    'Furao Sable': 'furao-sable',
    'Furao Albino': 'furao-albino',
    'Furao Champagne': 'furao-champagne',
    'Furao Cinnamon': 'furao-cinnamon',
  },
);
