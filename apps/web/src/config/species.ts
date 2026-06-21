export type Species =
  | 'dog'
  | 'cat'
  | 'fish'
  | 'hamster'
  | 'bird'
  | 'rabbit';

export type SpeciesRouteKey = 'dogs' | 'cats' | 'fish' | 'hamsters' | 'birds' | 'rabbits';

export type PetCategory = {
  routeKey: SpeciesRouteKey;
  species: Species;
  label: string;
  labelPlural: string;
  emoji: string;
  description: string;
  accentClass: string;
  count: number;
};

export const PET_CATEGORIES: PetCategory[] = [
  {
    routeKey: 'dogs',
    species: 'dog',
    label: 'Cachorro',
    labelPlural: 'Cachorros',
    emoji: '🐕',
    description: 'Raças, características, alimentação e cuidados',
    accentClass: 'bg-green-100 text-green-800',
    count: 30,
  },
  {
    routeKey: 'cats',
    species: 'cat',
    label: 'Gato',
    labelPlural: 'Gatos',
    emoji: '🐱',
    description: 'Raças, comportamento e bem-estar felino',
    accentClass: 'bg-teal-100 text-teal-800',
    count: 20,
  },
  {
    routeKey: 'rabbits',
    species: 'rabbit',
    label: 'Coelho',
    labelPlural: 'Coelhos',
    emoji: '🐰',
    description: 'Raças, alimentação e ambiente seguro',
    accentClass: 'bg-purple-100 text-purple-800',
    count: 8,
  },
  {
    routeKey: 'hamsters',
    species: 'hamster',
    label: 'Hamster',
    labelPlural: 'Hamsters',
    emoji: '🐹',
    description: 'Espécies, gaiola e rotina de cuidados',
    accentClass: 'bg-orange-100 text-orange-800',
    count: 5,
  },
  {
    routeKey: 'birds',
    species: 'bird',
    label: 'Ave',
    labelPlural: 'Aves',
    emoji: '🐦',
    description: 'Espécies, alimentação e enriquecimento',
    accentClass: 'bg-pink-100 text-pink-800',
    count: 15,
  },
  {
    routeKey: 'fish',
    species: 'fish',
    label: 'Peixe',
    labelPlural: 'Peixes',
    emoji: '🐠',
    description: 'Espécies, aquário e qualidade da água',
    accentClass: 'bg-sky-100 text-sky-800',
    count: 10,
  },
];

export function getCategoryByRoute(routeKey: string): PetCategory | undefined {
  return PET_CATEGORIES.find((c) => c.routeKey === routeKey);
}

export const TOTAL_BREEDS = PET_CATEGORIES.reduce((sum, c) => sum + c.count, 0);
