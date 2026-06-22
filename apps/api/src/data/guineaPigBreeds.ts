import { buildBreedsFromNames } from './breedFactory';

export const allGuineaPigBreeds = buildBreedsFromNames(
  ['Porquinho da India Ingles', 'Porquinho da India Abissinio', 'Porquinho da India Peruano', 'Porquinho da India Sheltie', 'Porquinho da India Skinny', 'Porquinho da India Teddy'],
  'guinea_pig',
  {
    'Porquinho da India Ingles': 'porquinho-da-india-ingles',
    'Porquinho da India Abissinio': 'porquinho-da-india-abissinio',
    'Porquinho da India Peruano': 'porquinho-da-india-peruano',
    'Porquinho da India Sheltie': 'porquinho-da-india-sheltie',
    'Porquinho da India Skinny': 'porquinho-da-india-skinny',
    'Porquinho da India Teddy': 'porquinho-da-india-teddy',
  },
);
