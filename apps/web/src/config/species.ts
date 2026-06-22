export type Species =
  | 'dog'
  | 'cat'
  | 'fish'
  | 'hamster'
  | 'bird'
  | 'rabbit'
  | 'turtle'
  | 'twister'
  | 'guinea_pig'
  | 'chinchilla'
  | 'gerbil'
  | 'ferret'
  | 'lizard';

export type SpeciesRouteKey =
  | 'dogs'
  | 'cats'
  | 'fish'
  | 'hamsters'
  | 'birds'
  | 'rabbits'
  | 'turtles'
  | 'twisters'
  | 'guinea-pigs'
  | 'chinchillas'
  | 'gerbils'
  | 'ferrets'
  | 'lizards';

export type PetCategory = {
  routeKey: SpeciesRouteKey;
  species: Species;
  label: string;
  labelPlural: string;
  emoji: string;
  description: string;
  accentClass: string;
  coverImage: string;
  coverFallback: string;
  arrowBg: string;
  count: number;
};

export const PET_CATEGORIES: PetCategory[] = [
  {
    routeKey: 'dogs',
    species: 'dog',
    label: 'Cachorro',
    labelPlural: 'Cachorros',
    emoji: '🐕',
    description: 'Raças, rotina e cuidados',
    accentClass: 'bg-green-100 text-green-800',
    coverImage: '/images/dogs/golden-retriever.webp',
    coverFallback: '/images/placeholders/dog.svg',
    arrowBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    count: 30,
  },
  {
    routeKey: 'cats',
    species: 'cat',
    label: 'Gato',
    labelPlural: 'Gatos',
    emoji: '🐱',
    description: 'Comportamento e bem-estar',
    accentClass: 'bg-teal-100 text-teal-800',
    coverImage: '/images/cats/maine-coon.webp',
    coverFallback: '/images/placeholders/cat.svg',
    arrowBg: 'bg-teal-100 dark:bg-teal-900/40',
    count: 20,
  },
  {
    routeKey: 'rabbits',
    species: 'rabbit',
    label: 'Coelho',
    labelPlural: 'Coelhos',
    emoji: '🐰',
    description: 'Alimentação e ambiente',
    accentClass: 'bg-purple-100 text-purple-800',
    coverImage: '/images/rabbits/holland-lop.webp',
    coverFallback: '/images/placeholders/rabbit.svg',
    arrowBg: 'bg-violet-100 dark:bg-violet-900/40',
    count: 8,
  },
  {
    routeKey: 'hamsters',
    species: 'hamster',
    label: 'Hamster',
    labelPlural: 'Hamsters',
    emoji: '🐹',
    description: 'Gaiola, rotina e manejo',
    accentClass: 'bg-orange-100 text-orange-800',
    coverImage: '/images/hamsters/sirio.webp',
    coverFallback: '/images/placeholders/hamster.svg',
    arrowBg: 'bg-orange-100 dark:bg-orange-900/40',
    count: 5,
  },
  {
    routeKey: 'birds',
    species: 'bird',
    label: 'Ave',
    labelPlural: 'Aves',
    emoji: '🐦',
    description: 'Companhia, rapinantes e manejo legal',
    accentClass: 'bg-pink-100 text-pink-800',
    coverImage: '/images/birds/canario-belga.webp',
    coverFallback: '/images/placeholders/bird.svg',
    arrowBg: 'bg-amber-100 dark:bg-amber-900/40',
    count: 23,
  },
  {
    routeKey: 'turtles',
    species: 'turtle',
    label: 'Tartaruga',
    labelPlural: 'Tartarugas',
    emoji: '🐢',
    description: 'Terrário, aquaterrário e manejo',
    accentClass: 'bg-lime-100 text-lime-800',
    coverImage: '/images/turtles/tartaruga-de-orelha-vermelha.webp',
    coverFallback: '/images/placeholders/turtle.svg',
    arrowBg: 'bg-lime-100 dark:bg-lime-900/40',
    count: 7,
  },
  {
    routeKey: 'twisters',
    species: 'twister',
    label: 'Twister',
    labelPlural: 'Twisters',
    emoji: '🐀',
    description: 'Rotina, manejo e enriquecimento',
    accentClass: 'bg-slate-100 text-slate-800',
    coverImage: '/images/twisters/twister-dumbo.webp',
    coverFallback: '/images/placeholders/twister.svg',
    arrowBg: 'bg-slate-100 dark:bg-slate-900/40',
    count: 4,
  },
  {
    routeKey: 'guinea-pigs',
    species: 'guinea_pig',
    label: 'Porquinho da Índia',
    labelPlural: 'Porquinhos-da-índia',
    emoji: '🐹',
    description: 'Vitamina C, feno e rotina',
    accentClass: 'bg-amber-100 text-amber-800',
    coverImage: '/images/guinea-pigs/porquinho-da-india-ingles.webp',
    coverFallback: '/images/placeholders/guinea_pig.svg',
    arrowBg: 'bg-amber-100 dark:bg-amber-900/40',
    count: 6,
  },
  {
    routeKey: 'chinchillas',
    species: 'chinchilla',
    label: 'Chinchila',
    labelPlural: 'Chinchilas',
    emoji: '🐭',
    description: 'Banho seco e ambiente fresco',
    accentClass: 'bg-zinc-100 text-zinc-800',
    coverImage: '/images/chinchillas/chinchila-standard.webp',
    coverFallback: '/images/placeholders/chinchilla.svg',
    arrowBg: 'bg-zinc-100 dark:bg-zinc-900/40',
    count: 4,
  },
  {
    routeKey: 'gerbils',
    species: 'gerbil',
    label: 'Gerbil',
    labelPlural: 'Gerbis',
    emoji: '🐭',
    description: 'Substrato, túneis e pares',
    accentClass: 'bg-orange-100 text-orange-800',
    coverImage: '/images/gerbils/gerbil-mongol.webp',
    coverFallback: '/images/placeholders/gerbil.svg',
    arrowBg: 'bg-orange-100 dark:bg-orange-900/40',
    count: 4,
  },
  {
    routeKey: 'ferrets',
    species: 'ferret',
    label: 'Furão',
    labelPlural: 'Furões',
    emoji: '🦦',
    description: 'Energia, segurança e dieta',
    accentClass: 'bg-stone-100 text-stone-800',
    coverImage: '/images/ferrets/furao-sable.webp',
    coverFallback: '/images/placeholders/ferret.svg',
    arrowBg: 'bg-stone-100 dark:bg-stone-900/40',
    count: 4,
  },
  {
    routeKey: 'lizards',
    species: 'lizard',
    label: 'Lagarto',
    labelPlural: 'Lagartos',
    emoji: '🦎',
    description: 'Terrário, UVB e temperatura',
    accentClass: 'bg-lime-100 text-lime-800',
    coverImage: '/images/lizards/gecko-leopardo.webp',
    coverFallback: '/images/placeholders/lizard.svg',
    arrowBg: 'bg-lime-100 dark:bg-lime-900/40',
    count: 7,
  },
  {
    routeKey: 'fish',
    species: 'fish',
    label: 'Peixe',
    labelPlural: 'Peixes',
    emoji: '🐠',
    description: 'Aquário e qualidade da água',
    accentClass: 'bg-sky-100 text-sky-800',
    coverImage: '/images/fish/betta.webp',
    coverFallback: '/images/placeholders/fish.svg',
    arrowBg: 'bg-sky-100 dark:bg-sky-900/40',
    count: 10,
  },
];

export function getCategoryByRoute(routeKey: string): PetCategory | undefined {
  return PET_CATEGORIES.find((c) => c.routeKey === routeKey);
}

export const TOTAL_BREEDS = PET_CATEGORIES.reduce((sum, c) => sum + c.count, 0);
