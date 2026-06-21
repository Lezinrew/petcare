import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allAnimalBreeds, SPECIES_IMAGE_FOLDER } from '../../api/src/data/allBreeds.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, '..');
const imagesRoot = path.join(webRoot, 'public/images');

const SPECIES_FOLDERS = Object.values(SPECIES_IMAGE_FOLDER);

console.log('🐾 PetCare — check:pet-images\n');

let found = 0;
let missing = 0;

for (const folder of SPECIES_FOLDERS) {
  const dir = path.join(imagesRoot, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, '.gitkeep'), '');
  }

  const breeds = allAnimalBreeds.filter((b) => SPECIES_IMAGE_FOLDER[b.species] === folder);
  const missingSlugs: string[] = [];

  for (const breed of breeds) {
    const filePath = path.join(dir, `${breed.slug}.webp`);
    if (fs.existsSync(filePath)) {
      found++;
    } else {
      missing++;
      missingSlugs.push(breed.slug);
    }
  }

  const have = breeds.length - missingSlugs.length;
  console.log(`${folder}: ${have}/${breeds.length} imagens`);
  if (missingSlugs.length > 0 && missingSlugs.length <= 5) {
    console.log(`  faltando: ${missingSlugs.join(', ')}`);
  } else if (missingSlugs.length > 5) {
    console.log(`  faltando: ${missingSlugs.length} (ex: ${missingSlugs.slice(0, 3).join(', ')}...)`);
  }
}

console.log(`\nTotal: ${found} encontradas, ${missing} faltantes (de ${allAnimalBreeds.length})`);
console.log('Padrão: /images/{speciesPlural}/{slug}.webp\n');
