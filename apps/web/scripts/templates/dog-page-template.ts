type BreedData = {
  slug: string;
  species?: string;
  name: string;
  origin: string;
  originalFunction: string;
  lifeExpectancy: string;
  size: string;
  energyLevel: string;
  apartmentFriendly: boolean;
  goodWithChildren: boolean;
  shortDescription: string;
  imageUrl?: string;
  imageAlt?: string;
  placeholderUrl?: string;
  care: {
    feeding: {
      dailyAmount: string;
      mealsPerDay: string;
      forbiddenFoods: string[];
      specialNeeds: string;
    };
    hydration: { waterAmount: string; dehydrationSigns: string[] };
    exercise: { dailyWalkTime: string; energyLevel: string; recommendedActivities: string[] };
    health: { idealWeight: string; vaccines: string[]; commonDiseases: string[] };
    hygiene: { bathFrequency: string; coatCare: string };
    behavior: { temperament: string; trainability: string; sociability: string; otherAnimals: string };
    environment: {
      recommendedSpace: string;
      canLiveInApartment: string;
      climateSensitivity: string;
      backyardNeed: string;
    };
    growth: { adultSize: string; adultAge: string };
    curiosities: string[];
  };
};

const SIZE_LABELS: Record<string, string> = {
  pequeno: 'Pequeno',
  médio: 'Médio',
  grande: 'Grande',
  gigante: 'Gigante',
};

const ENERGY_LABELS: Record<string, string> = {
  baixo: 'Baixo',
  moderado: 'Moderado',
  alto: 'Alto',
  'muito alto': 'Muito alto',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function listItems(items: string[]): string {
  return `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

function card(title: string, icon: string, color: string, content: string, disclaimer?: string): string {
  const disclaimerHtml = disclaimer
    ? `<p class="disclaimer">${escapeHtml(disclaimer)}</p>`
    : '';
  return `
    <section class="card" style="border-left-color: ${color}">
      <h2 class="card-title" style="color: ${color}"><span class="card-icon">${icon}</span> ${escapeHtml(title)}</h2>
      <div class="card-body">${content}</div>
      ${disclaimerHtml}
    </section>`;
}

const BASE_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: #F8FAFC;
    color: #0F172A;
    line-height: 1.6;
    min-height: 100vh;
  }
  .container { max-width: 960px; margin: 0 auto; padding: 1rem 1.25rem 3rem; }
  .site-header {
    background: #0B3A6E;
    color: #fff;
    padding: 1.25rem 1.5rem;
    text-align: center;
  }
  .site-header h1 { font-size: 1.25rem; font-weight: 700; }
  .site-header p { font-size: 0.875rem; color: #EAF4FF; margin-top: 0.25rem; }
  .hero {
    background: linear-gradient(135deg, #0B3A6E 0%, #1565a8 100%);
    color: #fff;
    border-radius: 1rem;
    padding: 1.75rem;
    margin: 1.5rem 0;
    position: relative;
    overflow: hidden;
  }
  .hero-emoji { position: absolute; right: 1rem; top: 0.5rem; font-size: 4rem; opacity: 0.15; }
  .hero-img-wrap {
    margin: 1rem 0 0;
    border-radius: 1rem;
    overflow: hidden;
    max-width: 320px;
    background: rgba(255,255,255,0.1);
  }
  .hero-img-wrap img { width: 100%; height: auto; display: block; min-height: 120px; object-fit: cover; }
  .hero h2 { font-size: 1.75rem; margin-bottom: 0.75rem; }
  .hero p { color: #EAF4FF; max-width: 36rem; }
  .badges { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
  .badge {
    background: rgba(255,255,255,0.2);
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.8125rem;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .stat {
    background: #EAF4FF;
    border-radius: 0.75rem;
    padding: 0.875rem;
    text-align: center;
  }
  .stat-label { font-size: 0.75rem; color: #475569; font-weight: 500; }
  .stat-value { font-size: 0.875rem; font-weight: 600; color: #0B3A6E; margin-top: 0.25rem; }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 640px) {
    .grid { grid-template-columns: 1fr 1fr; }
  }
  .card {
    background: #fff;
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    border-left: 4px solid;
  }
  .card-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
  .card-icon { font-size: 1.25rem; }
  .card-body p { font-size: 0.9375rem; color: #475569; margin-bottom: 0.5rem; }
  .card-body ul { font-size: 0.9375rem; color: #475569; padding-left: 1.25rem; margin-top: 0.25rem; }
  .card-body li { margin-bottom: 0.25rem; }
  .disclaimer {
    margin-top: 0.75rem;
    padding: 0.625rem;
    background: #FEF2F2;
    color: #DC2626;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
  }
  .site-footer {
    margin-top: 2rem;
    padding: 1.25rem;
    text-align: center;
    font-size: 0.8125rem;
    color: #475569;
    border-top: 1px solid #E2E8F0;
  }
  .site-footer strong { color: #0B3A6E; }
  .index-list { list-style: none; padding: 0; }
  .index-list li {
    background: #fff;
    border-radius: 0.75rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  }
  .index-list a {
    display: block;
    padding: 1rem 1.25rem;
    color: #0B3A6E;
    text-decoration: none;
    font-weight: 500;
  }
  .index-list a:hover { background: #EAF4FF; border-radius: 0.75rem; }
  .index-meta { font-size: 0.8125rem; color: #475569; font-weight: 400; }
`;

const SPECIES_EMOJI: Record<string, string> = {
  dog: '🐕', cat: '🐱', fish: '🐠', hamster: '🐹', bird: '🐦', rabbit: '🐰',
};

function heroImageHtml(breed: BreedData): string {
  const emoji = SPECIES_EMOJI[breed.species ?? 'dog'] ?? '🐾';
  const alt = escapeHtml(breed.imageAlt ?? breed.name);
  const src = escapeHtml(breed.imageUrl ?? '');
  const fallback = escapeHtml(breed.placeholderUrl ?? `/images/placeholders/${breed.species ?? 'dog'}.svg`);
  if (!src && !fallback) {
    return `<span class="hero-emoji">${emoji}</span>`;
  }
  return `<div class="hero-img-wrap">
    <img src="${src || fallback}" alt="${alt}"
      onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.dataset.fallback='';}else{this.style.display='none';}"
      data-fallback="${src ? fallback : ''}" />
  </div>`;
}

export function renderDogPageHtml(breed: BreedData): string {
  const { care } = breed;
  const sizeLabel = SIZE_LABELS[breed.size] ?? breed.size;
  const energyLabel = ENERGY_LABELS[breed.energyLevel] ?? breed.energyLevel;
  const emoji = SPECIES_EMOJI[breed.species ?? 'dog'] ?? '🐾';

  const cards = [
    card('Alimentação', '🍖', '#15803D', `
      <p><strong>Quantidade:</strong> ${escapeHtml(care.feeding.dailyAmount)}</p>
      <p><strong>Refeições:</strong> ${escapeHtml(care.feeding.mealsPerDay)}</p>
      <p><strong>Proibidos:</strong> ${escapeHtml(care.feeding.forbiddenFoods.join(', '))}</p>
      <p><strong>Necessidades:</strong> ${escapeHtml(care.feeding.specialNeeds)}</p>`),
    card('Hidratação', '💧', '#0284C7', `
      <p><strong>Água:</strong> ${escapeHtml(care.hydration.waterAmount)}</p>
      <p><strong>Sinais de desidratação:</strong></p>
      ${listItems(care.hydration.dehydrationSigns)}`),
    card('Exercícios', '🏃', '#EA580C', `
      <p><strong>Passeio:</strong> ${escapeHtml(care.exercise.dailyWalkTime)}</p>
      <p><strong>Energia:</strong> ${escapeHtml(care.exercise.energyLevel)}</p>
      <p><strong>Atividades:</strong></p>
      ${listItems(care.exercise.recommendedActivities)}`),
    card('Saúde', '❤️', '#DC2626', `
      <p><strong>Peso ideal:</strong> ${escapeHtml(care.health.idealWeight)}</p>
      <p><strong>Vacinas:</strong> ${escapeHtml(care.health.vaccines.join(', '))}</p>
      <p><strong>Doenças comuns:</strong> ${escapeHtml(care.health.commonDiseases.join(', '))}</p>`,
      'Informação educativa. Não substitui orientação veterinária.'),
    card('Higiene', '🛁', '#7C3AED', `
      <p><strong>Banho:</strong> ${escapeHtml(care.hygiene.bathFrequency)}</p>
      <p><strong>Pelagem:</strong> ${escapeHtml(care.hygiene.coatCare)}</p>`),
    card('Comportamento', '🎾', '#D97706', `
      <p><strong>Temperamento:</strong> ${escapeHtml(care.behavior.temperament)}</p>
      <p><strong>Treinamento:</strong> ${escapeHtml(care.behavior.trainability)}</p>
      <p><strong>Sociabilidade:</strong> ${escapeHtml(care.behavior.sociability)}</p>
      <p><strong>Outros animais:</strong> ${escapeHtml(care.behavior.otherAnimals)}</p>`),
    card('Ambiente', '🏡', '#166534', `
      <p><strong>Espaço:</strong> ${escapeHtml(care.environment.recommendedSpace)}</p>
      <p><strong>Apartamento:</strong> ${escapeHtml(care.environment.canLiveInApartment)}</p>
      <p><strong>Clima:</strong> ${escapeHtml(care.environment.climateSensitivity)}</p>
      <p><strong>Quintal:</strong> ${escapeHtml(care.environment.backyardNeed)}</p>`),
    card('Reprodução e crescimento', '📏', '#0B3A6E', `
      <p><strong>Tamanho adulto:</strong> ${escapeHtml(care.growth.adultSize)}</p>
      <p><strong>Fase adulta:</strong> ${escapeHtml(care.growth.adultAge)}</p>`),
    card('Curiosidades', '✨', '#9333EA', listItems(care.curiosities)),
  ].join('\n');

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(breed.name)} | PetCare Responsável</title>
  <meta name="description" content="Guia educativo de cuidados para ${escapeHtml(breed.name)}." />
  <style>${BASE_STYLES}</style>
</head>
<body>
  <header class="site-header">
    <h1>🐾 PetCare Responsável</h1>
    <p>Conheça melhor. Cuide melhor. Abandone menos.</p>
  </header>

  <main class="container">
    <section class="hero">
      <span class="hero-emoji">${emoji}</span>
      <h2>${escapeHtml(breed.name)}</h2>
      <p>${escapeHtml(breed.shortDescription)}</p>
      ${heroImageHtml(breed)}
      <div class="badges">
        <span class="badge">Porte: ${escapeHtml(sizeLabel)}</span>
        <span class="badge">Energia: ${escapeHtml(energyLabel)}</span>
        <span class="badge">Apartamento: ${breed.apartmentFriendly ? 'Sim' : 'Não'}</span>
        <span class="badge">Crianças: ${breed.goodWithChildren ? 'Sim' : 'Não'}</span>
      </div>
    </section>

    <div class="stats">
      <div class="stat"><div class="stat-label">Origem</div><div class="stat-value">${escapeHtml(breed.origin)}</div></div>
      <div class="stat"><div class="stat-label">Função original</div><div class="stat-value">${escapeHtml(breed.originalFunction)}</div></div>
      <div class="stat"><div class="stat-label">Expectativa de vida</div><div class="stat-value">${escapeHtml(breed.lifeExpectancy)}</div></div>
    </div>

    <div class="grid">${cards}</div>
  </main>

  <footer class="site-footer">
    <p>Este conteúdo é educativo e não substitui orientação veterinária.</p>
    <p><strong>PetCare Responsável</strong></p>
  </footer>
</body>
</html>`;
}

export function renderDogsIndexHtml(breeds: BreedData[]): string {
  const sorted = [...breeds].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  const items = sorted
    .map(
      (b) => `<li><a href="${escapeHtml(b.slug)}.html">${escapeHtml(b.name)} <span class="index-meta">— ${escapeHtml(SIZE_LABELS[b.size] ?? b.size)}, ${escapeHtml(ENERGY_LABELS[b.energyLevel] ?? b.energyLevel)}</span></a></li>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Catálogo de Raças | PetCare Responsável</title>
  <meta name="description" content="Catálogo HTML com 30 raças de cães e guias educativos de cuidado." />
  <style>${BASE_STYLES}</style>
</head>
<body>
  <header class="site-header">
    <h1>🐾 PetCare Responsável</h1>
    <p>Conheça melhor. Cuide melhor. Abandone menos.</p>
  </header>

  <main class="container">
    <section class="hero">
      <span class="hero-emoji">🐕</span>
      <h2>Catálogo de raças</h2>
      <p>${sorted.length} fichas educativas em HTML estático — offline, prontas para compartilhar ou imprimir.</p>
    </section>

    <ul class="index-list">${items}</ul>
  </main>

  <footer class="site-footer">
    <p>Este conteúdo é educativo e não substitui orientação veterinária.</p>
    <p><strong>PetCare Responsável</strong></p>
  </footer>
</body>
</html>`;
}
