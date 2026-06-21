import { allAnimalBreeds, SPECIES_IMAGE_FOLDER } from '../apps/api/src/data/allBreeds.ts';

console.log(JSON.stringify({ breeds: allAnimalBreeds, folders: SPECIES_IMAGE_FOLDER }));
