import { buildBreedsFromNames } from './breedFactory';

const BIRD_NAMES = [
  'Calopsita',
  'Periquito-australiano',
  'Agapornis',
  'Papagaio',
  'Ring Neck',
  'Lóris',
  'Arara',
  'Canário Belga',
  'Diamante-de-Gould',
  'Diamante-mandarim',
  'Marreco',
  'Coleiro',
  'Trinca-ferro',
  'Codorna-chinesa',
  'Ganso',
];

export const allBirdBreeds = buildBreedsFromNames(BIRD_NAMES, 'bird');
