import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allDogBreeds } from '../../api/src/data/dogBreeds.ts';
import { renderDogPageHtml, renderDogsIndexHtml } from './templates/dog-page-template.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../public/generated/dogs');

function cleanOutputDir(): void {
  if (fs.existsSync(OUTPUT_DIR)) {
    for (const file of fs.readdirSync(OUTPUT_DIR)) {
      if (file.endsWith('.html')) {
        fs.unlinkSync(path.join(OUTPUT_DIR, file));
      }
    }
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function main(): void {
  cleanOutputDir();

  for (const breed of allDogBreeds) {
    const html = renderDogPageHtml(breed);
    const filePath = path.join(OUTPUT_DIR, `${breed.slug}.html`);
    fs.writeFileSync(filePath, html, 'utf-8');
  }

  const indexHtml = renderDogsIndexHtml(allDogBreeds);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml, 'utf-8');

  console.log(`✅ ${allDogBreeds.length} páginas HTML geradas em apps/web/public/generated/dogs`);
}

main();
