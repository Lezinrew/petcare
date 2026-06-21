const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173';
const API_URL = process.env.API_URL ?? 'http://localhost:3333/api';

const WEB_ROUTES = [
  '/demo',
  '/explore',
  '/dogs',
  '/dogs/labrador-retriever',
  '/cats',
  '/cats/persa',
  '/fish',
  '/fish/betta',
  '/hamsters',
  '/hamsters/sirio',
  '/birds',
  '/birds/calopsita',
  '/rabbits',
  '/rabbits/holland-lop',
];

const API_DETAIL_CHECKS = [
  { species: 'dogs', slug: 'labrador-retriever' },
  { species: 'cats', slug: 'persa' },
  { species: 'fish', slug: 'betta' },
  { species: 'hamsters', slug: 'sirio' },
  { species: 'birds', slug: 'calopsita' },
  { species: 'rabbits', slug: 'holland-lop' },
];

let passed = 0;
let failed = 0;

function ok(name) {
  passed++;
  console.log(`  ✅ ${name}`);
}

function fail(name, detail) {
  failed++;
  console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`);
}

console.log('🐾 PetCare — check:frontend-routes\n');

for (const route of WEB_ROUTES) {
  try {
    const res = await fetch(`${WEB_URL}${route}`);
    const html = await res.text();
    if (res.ok && html.includes('id="root"')) {
      ok(`GET ${route} (SPA)`);
    } else {
      fail(`GET ${route}`, `status ${res.status}`);
    }
  } catch (err) {
    fail(`GET ${route}`, err.message);
  }
}

for (const { species, slug } of API_DETAIL_CHECKS) {
  try {
    const res = await fetch(`${API_URL}/animals/${species}/${slug}`);
    const data = await res.json();
    if (res.ok && data?.slug === slug) {
      ok(`API ${species}/${slug}`);
    } else {
      fail(`API ${species}/${slug}`, 'não encontrado');
    }
  } catch (err) {
    fail(`API ${species}/${slug}`, err.message);
  }
}

console.log(`\nResultado: ${passed} ok, ${failed} falha(s)`);
if (failed > 0) process.exit(1);
console.log('\n✨ Rotas frontend validadas.\n');
