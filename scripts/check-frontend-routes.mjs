const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173';
const API_URL = process.env.API_URL ?? 'http://localhost:3333/api';

const WEB_ROUTES = [
  '/demo',
  '/explore',
  '/profile',
  '/admin',
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
  '/birds/gaviao-asa-de-telha',
  '/rabbits',
  '/rabbits/holland-lop',
  '/turtles',
  '/turtles/tartaruga-de-orelha-vermelha',
  '/twisters',
  '/twisters/twister-dumbo',
  '/guinea-pigs',
  '/guinea-pigs/porquinho-da-india-ingles',
  '/chinchillas',
  '/chinchillas/chinchila-standard',
  '/gerbils',
  '/gerbils/gerbil-mongol',
  '/ferrets',
  '/ferrets/furao-sable',
  '/lizards',
  '/lizards/gecko-leopardo',
];

const API_DETAIL_CHECKS = [
  { species: 'dogs', slug: 'labrador-retriever' },
  { species: 'cats', slug: 'persa' },
  { species: 'fish', slug: 'betta' },
  { species: 'hamsters', slug: 'sirio' },
  { species: 'birds', slug: 'calopsita' },
  { species: 'birds', slug: 'gaviao-asa-de-telha' },
  { species: 'rabbits', slug: 'holland-lop' },
  { species: 'turtles', slug: 'tartaruga-de-orelha-vermelha' },
  { species: 'twisters', slug: 'twister-dumbo' },
  { species: 'guinea-pigs', slug: 'porquinho-da-india-ingles' },
  { species: 'chinchillas', slug: 'chinchila-standard' },
  { species: 'gerbils', slug: 'gerbil-mongol' },
  { species: 'ferrets', slug: 'furao-sable' },
  { species: 'lizards', slug: 'gecko-leopardo' },
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
