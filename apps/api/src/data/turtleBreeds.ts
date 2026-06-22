import { buildBreedsFromNames } from './breedFactory';

const turtleNames = [
  'Tartaruga de Orelha Vermelha',
  'Tigre-dagua',
  'Tartaruga Russa',
  'Jabuti Piranga',
  'Jabuti Tinga',
  'Cagado de Barbicha',
  'Tartaruga da Amazonia',
];

export const allTurtleBreeds = buildBreedsFromNames(turtleNames, 'turtle', {
  'Tartaruga de Orelha Vermelha': 'tartaruga-de-orelha-vermelha',
  'Tigre-dagua': 'tigre-dagua',
  'Tartaruga Russa': 'tartaruga-russa',
  'Jabuti Piranga': 'jabuti-piranga',
  'Jabuti Tinga': 'jabuti-tinga',
  'Cagado de Barbicha': 'cagado-de-barbicha',
  'Tartaruga da Amazonia': 'tartaruga-da-amazonia',
});
