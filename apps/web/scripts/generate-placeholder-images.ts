import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allAnimalBreeds, SPECIES_IMAGE_FOLDER } from '../../api/src/data/allBreeds.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.resolve(__dirname, '../public/images');

/** Minimal valid 1×1 WebP (placeholder until real photos are added). */
const PLACEHOLDER_WEBP = Buffer.from(
  'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
  'base64',
);

console.log('🐾 PetCare — generate:pet-images (placeholders)\n');

let created = 0;
let skipped = 0;

for (const breed of allAnimalBreeds) {
  const folder = SPECIES_IMAGE_FOLDER[breed.species];
  const dir = path.join(imagesRoot, folder);
  const filePath = path.join(dir, `${breed.slug}.webp`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    skipped++;
    continue;
  }

  fs.writeFileSync(filePath, PLACEHOLDER_WEBP);
  created++;
}

console.log(`Criadas: ${created} | já existiam: ${skipped} | total: ${allAnimalBreeds.length}`);
console.log('Substitua por fotos reais em apps/web/public/images/{species}/{slug}.webp\n');
