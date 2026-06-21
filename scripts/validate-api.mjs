const API_URL = process.env.API_URL ?? 'http://localhost:3333/api';

const tests = [];
let passed = 0;
let failed = 0;

function ok(name) {
  passed++;
  tests.push({ name, status: 'ok' });
  console.log(`  ✅ ${name}`);
}

function fail(name, detail) {
  failed++;
  tests.push({ name, status: 'fail', detail });
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

console.log(`🐾 PetCare Responsável — Validação da API\n`);
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

try {
  const dogs = await request('GET', '/animals/dogs');
  if (dogs.response.ok && Array.isArray(dogs.data) && dogs.data.length === 30) {
    ok('GET /animals/dogs (30 raças)');
  } else {
    fail('GET /animals/dogs', `esperado 30, recebido ${dogs.data?.length ?? '?'}`);
  }
} catch (err) {
  fail('GET /animals/dogs', err.message);
}

try {
  const cats = await request('GET', '/animals/cats');
  if (cats.response.ok && Array.isArray(cats.data) && cats.data.length === 20) {
    ok('GET /animals/cats (20 raças)');
  } else {
    fail('GET /animals/cats', `esperado 20, recebido ${cats.data?.length ?? '?'}`);
  }
} catch (err) {
  fail('GET /animals/cats', err.message);
}

try {
  const lab = await request('GET', '/animals/dogs/labrador-retriever');
  if (lab.response.ok && lab.data?.slug === 'labrador-retriever' && lab.data?.care?.feeding) {
    ok('GET /animals/dogs/labrador-retriever');
  } else {
    fail('GET /animals/dogs/labrador-retriever', 'ficha incompleta');
  }
} catch (err) {
  fail('GET /animals/dogs/labrador-retriever', err.message);
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
  if (
    match.response.ok &&
    match.data?.recommendedBreeds?.length === 3 &&
    match.data?.antiAbandonmentMessage
  ) {
    ok('POST /adoption/match (3 raças)');
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

    const list = await request('GET', '/pets');
    if (list.response.ok && list.data.some((p) => p.id === petId)) {
      ok('GET /pets');
    } else {
      fail('GET /pets');
    }

    const del = await request('DELETE', `/pets/${petId}`);
    if (del.response.status === 204) {
      ok('DELETE /pets/:id');
    } else {
      fail('DELETE /pets/:id');
    }
  } else {
    fail('POST /pets');
  }
} catch (err) {
  fail('POST /pets', err.message);
}

console.log(`\nResultado: ${passed} ok, ${failed} falha(s)`);

if (failed > 0) {
  process.exit(1);
}

console.log('\n✨ Validação concluída com sucesso.\n');
