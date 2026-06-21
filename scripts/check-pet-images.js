import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesRoot = path.join(root, 'apps/web/public/images');

const EMOJI = {
  dogs: '🐕',
  cats: '🐱',
  fish: '🐠',
  hamsters: '🐹',
  birds: '🐦',
  rabbits: '🐰',
};

const EXPECTED = {
  dogs: 30,
  cats: 20,
  fish: 10,
  hamsters: 5,
  birds: 15,
  rabbits: 8,
};

function loadBreeds() {
  const result = spawnSync('npx', ['tsx', 'scripts/load-breeds-json.ts'], {
    cwd: root,
    encoding: 'utf-8',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    console.error('❌ Não foi possível carregar allBreeds.ts');
    console.error(result.stderr || result.stdout);
    process.exit(1);
  }
  const line = result.stdout.trim().split('\n').pop();
  return JSON.parse(line);
}

console.log('🐾 PetCare — check:pet-images\n');

const { breeds, folders } = loadBreeds();
let totalFound = 0;
let totalMissing = 0;
const allMissing = [];

for (const [folder, expected] of Object.entries(EXPECTED)) {
  const folderBreeds = breeds.filter((b) => folders[b.species] === folder);
  const missingSlugs = [];

  for (const breed of folderBreeds) {
    const filePath = path.join(imagesRoot, folder, `${breed.slug}.webp`);
    if (fs.existsSync(filePath)) {
      totalFound++;
    } else {
      totalMissing++;
      missingSlugs.push(breed.slug);
      allMissing.push(`${folder}/${breed.slug}.webp`);
    }
  }

  const found = folderBreeds.length - missingSlugs.length;
  const emoji = EMOJI[folder] ?? '🐾';
  console.log(`${emoji} ${folder}: ${found} encontradas / ${expected} total`);

  if (missingSlugs.length > 0 && missingSlugs.length <= 8) {
    console.log(`   faltando: ${missingSlugs.join(', ')}`);
  } else if (missingSlugs.length > 8) {
    console.log(`   faltando: ${missingSlugs.length} (ex: ${missingSlugs.slice(0, 4).join(', ')}...)`);
  }
}

console.log('');
if (totalMissing === 0) {
  console.log('✅ Verificação de imagens concluída.');
  console.log(`✅ ${totalFound} imagens encontradas de ${breeds.length}.`);
} else {
  console.log('✅ Verificação de imagens concluída.');
  console.log(`⚠️  ${totalMissing} imagens ainda faltam (${totalFound} encontradas de ${breeds.length}).`);
  console.log('Use o padrão: apps/web/public/images/{speciesPlural}/{slug}.webp');
  console.log('Placeholders SVG: apps/web/public/images/placeholders/{species}.svg');
}

console.log('');
