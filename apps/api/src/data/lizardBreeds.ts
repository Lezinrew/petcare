import { buildBreedsFromNames } from './breedFactory';

export const allLizardBreeds = buildBreedsFromNames(
  ['Gecko Leopardo', 'Dragao Barbudo', 'Iguana Verde', 'Teiu', 'Anolis Verde', 'Uromastyx', 'Lagarto de Lingua Azul'],
  'lizard',
  {
    'Dragao Barbudo': 'dragao-barbudo',
    Teiu: 'teiu',
    'Lagarto de Lingua Azul': 'lagarto-de-lingua-azul',
  },
);
