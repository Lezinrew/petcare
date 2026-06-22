const API_URL = process.env.API_URL ?? 'http://localhost:3333/api';

const SPECIES_ENDPOINTS = [
  { path: 'dogs', count: 30 },
  { path: 'cats', count: 20 },
  { path: 'fish', count: 10 },
  { path: 'hamsters', count: 5 },
  { path: 'birds', count: 23 },
  { path: 'rabbits', count: 8 },
  { path: 'turtles', count: 7 },
  { path: 'twisters', count: 4 },
  { path: 'guinea-pigs', count: 6 },
  { path: 'chinchillas', count: 4 },
  { path: 'gerbils', count: 4 },
  { path: 'ferrets', count: 4 },
  { path: 'lizards', count: 7 },
];

const EXPECTED_TOTAL = 132;

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

console.log('🐾 PetCare Responsável — validate (legado, use check:api)\n');
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
  fail('Total geral', `esperado ${EXPECTED_TOTAL}, soma ${runningTotal}`);
}

for (const { species, slug, label } of [
  { species: 'dogs', slug: 'labrador-retriever', label: 'Labrador' },
  { species: 'cats', slug: 'persa', label: 'Persa' },
  { species: 'birds', slug: 'gaviao-asa-de-telha', label: 'Gavião' },
  { species: 'turtles', slug: 'tartaruga-de-orelha-vermelha', label: 'Tartaruga' },
  { species: 'guinea-pigs', slug: 'porquinho-da-india-ingles', label: 'Porquinho' },
  { species: 'lizards', slug: 'gecko-leopardo', label: 'Lagarto' },
]) {
  try {
    const result = await request('GET', `/animals/${species}/${slug}`);
    if (result.response.ok && result.data?.slug === slug && result.data?.care?.feeding) {
      ok(`GET /animals/${species}/${slug} (${label})`);
    } else {
      fail(`GET /animals/${species}/${slug}`, 'ficha incompleta');
    }
  } catch (err) {
    fail(`GET /animals/${species}/${slug}`, err.message);
  }
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

try {
  const createPet = await request('POST', '/pets', {
    name: 'Validação Piloto',
    species: 'dog',
    breedSlug: 'labrador-retriever',
  });
  const petId = createPet.data?.id;
  if (createPet.response.status === 201 && petId) {
    ok('POST /pets');
    const del = await request('DELETE', `/pets/${petId}`);
    if (del.response.status === 204) ok('DELETE /pets/:id');
    else fail('DELETE /pets/:id');
  } else {
    fail('POST /pets');
  }
} catch (err) {
  fail('POST /pets', err.message);
}

try {
  const profileGet = await request('GET', '/tutor-profile');
  if (profileGet.response.ok && profileGet.data?.userId) {
    ok('GET /tutor-profile');
  } else {
    fail('GET /tutor-profile');
  }

  const profilePut = await request('PUT', '/tutor-profile', {
    name: 'Tutor Validação',
    city: 'São Paulo',
    state: 'SP',
    housingType: 'apartment',
    petExperience: 'some',
    notes: 'Perfil de teste',
  });
  if (profilePut.response.ok && profilePut.data?.name === 'Tutor Validação') {
    ok('PUT /tutor-profile');
  } else {
    fail('PUT /tutor-profile');
  }
} catch (err) {
  fail('/tutor-profile', err.message);
}

console.log(`\nResultado: ${passed} ok, ${failed} falha(s)`);
if (failed > 0) process.exit(1);
console.log('\n✨ Validação concluída.\n');
