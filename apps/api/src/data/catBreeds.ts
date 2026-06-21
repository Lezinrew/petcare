import { buildBreedsFromNames } from './breedFactory';

const CAT_NAMES = [
  'Persa',
  'Maine Coon',
  'Siamês',
  'Ragdoll',
  'Sphynx',
  'Bengala',
  'Vira-lata',
  'Angorá',
  'Siberiano',
  'Azul Russo',
  'Persa Exótico',
  'British Shorthair',
  'Burmês',
  'Abissínio',
  'Munchkin',
  'Scottish Fold',
  'Norueguês da Floresta',
  'Savannah',
  'Himalaio',
  'Chartreux',
];

export const allCatBreeds = buildBreedsFromNames(CAT_NAMES, 'cat', {
  'Vira-lata': 'vira-lata-gato',
});
