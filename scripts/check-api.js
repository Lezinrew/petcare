const API_URL = process.env.API_URL ?? 'http://localhost:3333/api';

const SPECIES_ENDPOINTS = [
  { path: 'dogs', count: 30 },
  { path: 'cats', count: 20 },
  { path: 'fish', count: 10 },
  { path: 'hamsters', count: 5 },
  { path: 'birds', count: 15 },
  { path: 'rabbits', count: 8 },
];

const EXPECTED_TOTAL = 88;

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

async function request(method, path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return { response, data };
}

console.log('🐾 PetCare Responsável — check:api\n');
console.log(`Base: ${API_URL}\n`);

try {
  const health = await request('GET', '/health');
  if (health.response.ok && health.data?.status === 'ok') {
    ok('GET /health');
  } else {
    fail('GET /health', `status ${health.response.status}`);
  }
} catch (err) {
  fail('GET /health', err.message);
  console.error('\n💡 A API está rodando? Execute: npm run dev:api\n');
  process.exit(1);
}

let runningTotal = 0;

for (const { path, count } of SPECIES_ENDPOINTS) {
  try {
    const result = await request('GET', `/animals/${path}`);
    if (result.response.ok && Array.isArray(result.data) && result.data.length === count) {
      ok(`GET /animals/${path} (${count})`);
      runningTotal += result.data.length;
    } else {
      fail(`GET /animals/${path}`, `esperado ${count}, recebido ${result.data?.length ?? '?'}`);
    }
  } catch (err) {
    fail(`GET /animals/${path}`, err.message);
  }
}

if (runningTotal === EXPECTED_TOTAL) {
  ok(`Total geral: ${EXPECTED_TOTAL} animais`);
} else {
  fail(`Total geral`, `esperado ${EXPECTED_TOTAL}, soma ${runningTotal}`);
}

const detailChecks = [
  { species: 'dogs', slug: 'labrador-retriever', label: 'Labrador Retriever' },
  { species: 'cats', slug: 'persa', label: 'Persa' },
];

for (const { species, slug, label } of detailChecks) {
  try {
    const result = await request('GET', `/animals/${species}/${slug}`);
    if (result.response.ok && result.data?.slug === slug && result.data?.care?.feeding) {
      ok(`GET /animals/${species}/${slug} (${label})`);
    } else {
      fail(`GET /animals/${species}/${slug}`, 'ficha incompleta ou não encontrada');
    }
  } catch (err) {
    fail(`GET /animals/${species}/${slug}`, err.message);
  }
}

try {
  const search = await request('GET', '/animals/dogs?search=labrador');
  if (search.response.ok && Array.isArray(search.data) && search.data.length >= 1) {
    ok('GET /animals/dogs?search=labrador');
  } else {
    fail('GET /animals/dogs?search=labrador');
  }
} catch (err) {
  fail('GET /animals/dogs?search=labrador', err.message);
}

try {
  const match = await request('POST', '/adoption/match', {
    housing: 'apartment',
    hasBackyard: false,
    hasChildren: true,
    hasOtherPets: false,
    experienceLevel: 'none',
    freeTimePerDay: 'low',
    canWalkDaily: true,
    preferredSize: 'pequeno',
    likesActivePets: false,
  });
  if (match.response.ok && match.data?.recommendedBreeds?.length === 3) {
    ok('POST /adoption/match');
  } else {
    fail('POST /adoption/match', 'resposta inválida');
  }
} catch (err) {
  fail('POST /adoption/match', err.message);
}

console.log(`\nResultado: ${passed} ok, ${failed} falha(s)`);

if (failed > 0) {
  process.exit(1);
}

console.log('\n✨ check:api concluído com sucesso.\n');
