import { allDogBreeds } from './dogBreeds';
import { allCatBreeds } from './catBreeds';
import { allFishBreeds } from './fishBreeds';
import { allHamsterBreeds } from './hamsterBreeds';
import { allBirdBreeds } from './birdBreeds';
import { allRabbitBreeds } from './rabbitBreeds';
import { AnimalBreed } from '../modules/animals/animal.types';
import imageAttributions from './imageAttributions.json';

type ImageAttribution = {
  credit: string;
  source: string;
  license: string;
  fileUrl?: string;
};

const attributions = imageAttributions as Record<string, ImageAttribution>;

export const SPECIES_ROUTE_MAP = {
  dogs: 'dog',
  cats: 'cat',
  fish: 'fish',
  hamsters: 'hamster',
  birds: 'bird',
  rabbits: 'rabbit',
} as const;

export const SPECIES_IMAGE_FOLDER: Record<AnimalBreed['species'], string> = {
  dog: 'dogs',
  cat: 'cats',
  fish: 'fish',
  hamster: 'hamsters',
  bird: 'birds',
  rabbit: 'rabbits',
};

export function speciesPlural(species: AnimalBreed['species']): string {
  return SPECIES_IMAGE_FOLDER[species];
}

export function placeholderUrlForSpecies(species: AnimalBreed['species']): string {
  return `/images/placeholders/${species}.svg`;
}

export function imageUrlForBreed(species: AnimalBreed['species'], slug: string): string {
  return `/images/${SPECIES_IMAGE_FOLDER[species]}/${slug}.webp`;
}

export function withImageFields(breed: Omit<AnimalBreed, 'id'>): Omit<AnimalBreed, 'id'> {
  const attr = attributions[breed.slug];
  return {
    ...breed,
    imageUrl: imageUrlForBreed(breed.species, breed.slug),
    imageAlt: breed.name,
    imageCredit: attr?.credit ?? 'Imagem ilustrativa',
    imageSource: attr ? `${attr.source} — ${attr.license}` : 'Acervo do projeto',
    placeholderUrl: placeholderUrlForSpecies(breed.species),
  };
}

function withImageUrl(breed: Omit<AnimalBreed, 'id'>): Omit<AnimalBreed, 'id'> {
  return withImageFields(breed);
}

export const allAnimalBreeds: Omit<AnimalBreed, 'id'>[] = [
  ...allDogBreeds,
  ...allCatBreeds,
  ...allFishBreeds,
  ...allHamsterBreeds,
  ...allBirdBreeds,
  ...allRabbitBreeds,
].map(withImageUrl);

export type SpeciesRouteKey = keyof typeof SPECIES_ROUTE_MAP;

export function speciesFromRoute(routeKey: string): AnimalBreed['species'] | null {
  return SPECIES_ROUTE_MAP[routeKey as SpeciesRouteKey] ?? null;
}

export function routeFromSpecies(species: AnimalBreed['species']): SpeciesRouteKey | null {
  const entry = Object.entries(SPECIES_ROUTE_MAP).find(([, s]) => s === species);
  return (entry?.[0] as SpeciesRouteKey) ?? null;
}
