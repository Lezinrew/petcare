import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allAnimalBreeds, SPECIES_ROUTE_MAP, SpeciesRouteKey } from '../../api/src/data/allBreeds.ts';
import { renderDogPageHtml, renderDogsIndexHtml } from './templates/dog-page-template.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PETS_ROOT = path.resolve(__dirname, '../public/generated/pets');
const LEGACY_DOGS = path.resolve(__dirname, '../public/generated/dogs');

const ROUTE_KEYS = Object.keys(SPECIES_ROUTE_MAP) as SpeciesRouteKey[];

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanHtmlFiles(dir: string): void {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanHtmlFiles(full);
    } else if (entry.name.endsWith('.html')) {
      fs.unlinkSync(full);
    }
  }
}

function writeSpeciesCatalog(routeKey: SpeciesRouteKey): number {
  const species = SPECIES_ROUTE_MAP[routeKey];
  const breeds = allAnimalBreeds.filter((b) => b.species === species);
  const outDir = path.join(PETS_ROOT, routeKey);
  ensureDir(outDir);

  for (const breed of breeds) {
    fs.writeFileSync(path.join(outDir, `${breed.slug}.html`), renderDogPageHtml(breed), 'utf-8');
  }

  fs.writeFileSync(path.join(outDir, 'index.html'), renderDogsIndexHtml(breeds), 'utf-8');
  return breeds.length;
}

function writeMasterIndex(): void {
  const links = ROUTE_KEYS.map((routeKey) => {
    const species = SPECIES_ROUTE_MAP[routeKey];
    const count = allAnimalBreeds.filter((b) => b.species === species).length;
    const label = routeKey.charAt(0).toUpperCase() + routeKey.slice(1);
    return `<li><a href="${routeKey}/index.html">${label} (${count})</a></li>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Catálogo PetCare | ${allAnimalBreeds.length} animais</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; color: #0F172A; padding: 2rem; max-width: 640px; margin: 0 auto; }
    h1 { color: #0B3A6E; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; background: #fff; border-radius: 0.75rem; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
    a { display: block; padding: 1rem; color: #0B3A6E; text-decoration: none; font-weight: 500; }
    a:hover { background: #EAF4FF; border-radius: 0.75rem; }
  </style>
</head>
<body>
  <h1>🐾 PetCare Responsável</h1>
  <p>Catálogo HTML estático — ${allAnimalBreeds.length} fichas educativas</p>
  <ul>${links}</ul>
</body>
</html>`;

  fs.writeFileSync(path.join(PETS_ROOT, 'index.html'), html, 'utf-8');
}

function writeLegacyDogs(): void {
  const dogs = allAnimalBreeds.filter((b) => b.species === 'dog');
  ensureDir(LEGACY_DOGS);
  cleanHtmlFiles(LEGACY_DOGS);
  for (const breed of dogs) {
    fs.writeFileSync(path.join(LEGACY_DOGS, `${breed.slug}.html`), renderDogPageHtml(breed), 'utf-8');
  }
  fs.writeFileSync(path.join(LEGACY_DOGS, 'index.html'), renderDogsIndexHtml(dogs), 'utf-8');
}

function main(): void {
  ensureDir(PETS_ROOT);
  cleanHtmlFiles(PETS_ROOT);

  let total = 0;
  for (const routeKey of ROUTE_KEYS) {
    total += writeSpeciesCatalog(routeKey);
  }

  writeMasterIndex();
  writeLegacyDogs();

  console.log(`✅ ${total} páginas HTML geradas em apps/web/public/generated/pets`);
  console.log(`✅ Índice mestre: apps/web/public/generated/pets/index.html`);
  console.log(`✅ Compatibilidade: apps/web/public/generated/dogs/ (${allAnimalBreeds.filter((b) => b.species === 'dog').length} cães)`);
}

main();
