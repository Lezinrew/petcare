import { ReactNode } from 'react';
import { CareBulletList, CareBulletPoints } from '../components/animal/CareBulletList';
import { AnimalBreed, CareInfo, Species } from '../types/animal';

export type CareSectionDef = {
  key: string;
  title: string;
  icon: string;
  color: string;
  iconBg: string;
  disclaimer?: string;
  render: (care: CareInfo) => ReactNode;
};

function standardSections(): CareSectionDef[] {
  return [
    {
      key: 'feeding',
      title: 'Alimentação',
      icon: '🍖',
      color: 'text-feeding',
      iconBg: 'bg-feeding/15',
      render: (c) => (
        <CareBulletList
          items={[
            { label: 'Quantidade diária', value: c.feeding.dailyAmount },
            { label: 'Refeições', value: c.feeding.mealsPerDay },
            { label: 'Alimentos proibidos', value: c.feeding.forbiddenFoods.join(', ') },
            { label: 'Necessidades especiais', value: c.feeding.specialNeeds },
          ]}
        />
      ),
    },
    {
      key: 'hydration',
      title: 'Hidratação',
      icon: '💧',
      color: 'text-hydration',
      iconBg: 'bg-hydration/15',
      render: (c) => (
        <>
          <CareBulletList items={[{ label: 'Água', value: c.hydration.waterAmount }]} />
          <p className="mb-2 mt-3 text-sm font-semibold text-text-primary">Sinais de desidratação</p>
          <CareBulletPoints points={c.hydration.dehydrationSigns} />
        </>
      ),
    },
    {
      key: 'exercise',
      title: 'Exercícios',
      icon: '🏃',
      color: 'text-exercise',
      iconBg: 'bg-exercise/15',
      render: (c) => (
        <>
          <CareBulletList
            items={[
              { label: 'Atividade diária', value: c.exercise.dailyWalkTime },
              {
                label: 'Nível de energia',
                value: (
                  <span className="inline-flex rounded-full bg-exercise/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-exercise">
                    {c.exercise.energyLevel}
                  </span>
                ),
              },
            ]}
          />
          <p className="mb-2 mt-3 text-sm font-semibold text-text-primary">Atividades recomendadas</p>
          <CareBulletPoints points={c.exercise.recommendedActivities} />
        </>
      ),
    },
    {
      key: 'health',
      title: 'Saúde',
      icon: '❤️',
      color: 'text-health',
      iconBg: 'bg-health/15',
      disclaimer: 'Informação educativa. Não substitui orientação veterinária.',
      render: (c) => (
        <CareBulletList
          items={[
            { label: 'Peso ideal', value: c.health.idealWeight },
            { label: 'Vacinas e prevenção', value: c.health.vaccines.join(', ') },
            { label: 'Doenças comuns', value: c.health.commonDiseases.join(', ') },
          ]}
        />
      ),
    },
    {
      key: 'hygiene',
      title: 'Higiene',
      icon: '🛁',
      color: 'text-hygiene',
      iconBg: 'bg-hygiene/15',
      render: (c) => (
        <CareBulletList
          items={[
            { label: 'Banho e limpeza', value: c.hygiene.bathFrequency },
            { label: 'Pelagem e ambiente', value: c.hygiene.coatCare },
          ]}
        />
      ),
    },
    {
      key: 'behavior',
      title: 'Comportamento',
      icon: '🎾',
      color: 'text-behavior',
      iconBg: 'bg-behavior/15',
      render: (c) => (
        <CareBulletList
          items={[
            { label: 'Temperamento', value: c.behavior.temperament },
            { label: 'Treinamento', value: c.behavior.trainability },
            { label: 'Sociabilidade', value: c.behavior.sociability },
            { label: 'Outros animais', value: c.behavior.otherAnimals },
          ]}
        />
      ),
    },
    {
      key: 'environment',
      title: 'Ambiente',
      icon: '🏡',
      color: 'text-environment',
      iconBg: 'bg-environment/15',
      render: (c) => (
        <CareBulletList
          items={[
            { label: 'Espaço recomendado', value: c.environment.recommendedSpace },
            { label: 'Apartamento', value: c.environment.canLiveInApartment },
            { label: 'Clima', value: c.environment.climateSensitivity },
            { label: 'Quintal / externo', value: c.environment.backyardNeed },
          ]}
        />
      ),
    },
    {
      key: 'growth',
      title: 'Reprodução e crescimento',
      icon: '📏',
      color: 'text-hydration',
      iconBg: 'bg-hydration/15',
      render: (c) => (
        <CareBulletList
          items={[
            { label: 'Tamanho adulto', value: c.growth.adultSize },
            { label: 'Fase adulta', value: c.growth.adultAge },
          ]}
        />
      ),
    },
    {
      key: 'curiosities',
      title: 'Curiosidades',
      icon: '✨',
      color: 'text-behavior',
      iconBg: 'bg-behavior/15',
      render: (c) => <CareBulletPoints points={c.curiosities} />,
    },
  ];
}

const SPECIES_OVERRIDES: Partial<Record<Species, Partial<Record<string, Partial<CareSectionDef>>>>> = {
  fish: {
    hydration: { title: 'Qualidade da água', icon: '💧' },
    exercise: { title: 'Atividade no aquário', icon: '🐠' },
    environment: { title: 'Aquário e ambiente', icon: '🫧' },
    behavior: { title: 'Compatibilidade', icon: '🤝' },
    hygiene: { title: 'Manutenção', icon: '🧽' },
    growth: { title: 'Tamanho e maturidade', icon: '📏' },
  },
  bird: {
    exercise: { title: 'Interação e voo', icon: '🕊️' },
    environment: { title: 'Viveiro e espaço', icon: '🪺' },
    behavior: { title: 'Socialização', icon: '💬' },
    hygiene: { title: 'Limpeza do viveiro', icon: '🧹' },
    growth: { title: 'Desenvolvimento', icon: '📏' },
  },
  hamster: {
    exercise: { title: 'Atividade e roda', icon: '⚙️' },
    environment: { title: 'Gaiola e enriquecimento', icon: '🏠' },
    behavior: { title: 'Rotina e temperamento', icon: '🌙' },
  },
  rabbit: {
    exercise: { title: 'Exercício e exploração', icon: '🐇' },
    environment: { title: 'Espaço seguro', icon: '🏡' },
    behavior: { title: 'Sociabilidade', icon: '💕' },
  },
  turtle: {
    feeding: { title: 'Dieta e suplementação', icon: '🥬' },
    hydration: { title: 'Água e umidade', icon: '💧' },
    exercise: { title: 'Exploração segura', icon: '🐢' },
    environment: { title: 'Terrário e UVB', icon: '☀️' },
    behavior: { title: 'Manejo e estresse', icon: '🤲' },
    hygiene: { title: 'Casco e limpeza', icon: '🧽' },
    growth: { title: 'Longevidade', icon: '⏳' },
  },
  twister: {
    exercise: { title: 'Exploração e brincadeiras', icon: '🐀' },
    environment: { title: 'Recinto e enriquecimento', icon: '🏠' },
    behavior: { title: 'Socialização', icon: '🤝' },
  },
  guinea_pig: {
    feeding: { title: 'Feno e vitamina C', icon: '🥬' },
    exercise: { title: 'Rotina e exploração', icon: '🌿' },
    environment: { title: 'Cercado e abrigo', icon: '🏠' },
  },
  chinchilla: {
    hygiene: { title: 'Banho seco', icon: '🛁' },
    environment: { title: 'Ambiente fresco', icon: '❄️' },
    behavior: { title: 'Manejo delicado', icon: '🤲' },
  },
  gerbil: {
    exercise: { title: 'Túneis e escavação', icon: '🕳️' },
    environment: { title: 'Substrato profundo', icon: '🏜️' },
    behavior: { title: 'Pares compatíveis', icon: '🤝' },
  },
  ferret: {
    feeding: { title: 'Dieta carnívora', icon: '🍗' },
    exercise: { title: 'Brincadeiras diárias', icon: '🎾' },
    environment: { title: 'Casa segura', icon: '🔒' },
  },
  lizard: {
    feeding: { title: 'Dieta e cálcio', icon: '🦗' },
    hydration: { title: 'Umidade', icon: '💧' },
    environment: { title: 'Terrário e UVB', icon: '☀️' },
    behavior: { title: 'Manejo calmo', icon: '🦎' },
    hygiene: { title: 'Muda e limpeza', icon: '🧽' },
  },
};

export function getCareSectionsForSpecies(species: Species): CareSectionDef[] {
  const base = standardSections();
  const overrides = SPECIES_OVERRIDES[species];
  if (!overrides) return base;

  return base.map((section) => ({
    ...section,
    ...overrides[section.key],
  }));
}

export function getSpeciesLabel(species: Species): string {
  const labels: Record<Species, string> = {
    dog: 'Cão',
    cat: 'Gato',
    fish: 'Peixe',
    hamster: 'Hamster',
    bird: 'Ave',
    rabbit: 'Coelho',
    turtle: 'Tartaruga',
    twister: 'Twister',
    guinea_pig: 'Porquinho-da-índia',
    chinchilla: 'Chinchila',
    gerbil: 'Gerbil',
    ferret: 'Furão',
    lizard: 'Lagarto',
  };
  return labels[species];
}

export type BreedCardMeta = {
  primary: string;
  secondary: string;
  tertiary: string;
  beginnerFriendly: boolean;
};

export function getBreedCardMeta(breed: AnimalBreed): BreedCardMeta {
  const beginner =
    breed.energyLevel === 'baixo' || breed.energyLevel === 'moderado';

  switch (breed.species) {
    case 'fish':
      return {
        primary: `Cuidado: ${breed.energyLevel}`,
        secondary: breed.care.environment.recommendedSpace.slice(0, 40),
        tertiary: breed.care.behavior.otherAnimals.slice(0, 36),
        beginnerFriendly: beginner && breed.apartmentFriendly,
      };
    case 'bird':
      return {
        primary: `Interação: ${breed.energyLevel}`,
        secondary: breed.care.environment.recommendedSpace.slice(0, 40),
        tertiary: breed.care.behavior.sociability.slice(0, 36),
        beginnerFriendly: beginner,
      };
    case 'hamster':
      return {
        primary: `Porte: ${breed.size}`,
        secondary: `Energia: ${breed.energyLevel}`,
        tertiary: 'Rotina noturna',
        beginnerFriendly: breed.apartmentFriendly,
      };
    case 'rabbit':
      return {
        primary: `Espaço: ${breed.care.environment.recommendedSpace.slice(0, 28)}`,
        secondary: breed.care.behavior.sociability.slice(0, 36),
        tertiary: `Porte: ${breed.size}`,
        beginnerFriendly: breed.goodWithChildren && beginner,
      };
    case 'turtle':
      return {
        primary: `Ambiente: ${breed.care.environment.recommendedSpace.slice(0, 30)}`,
        secondary: breed.care.environment.climateSensitivity.slice(0, 36),
        tertiary: `Energia: ${breed.energyLevel}`,
        beginnerFriendly: false,
      };
    case 'twister':
    case 'guinea_pig':
    case 'chinchilla':
    case 'gerbil':
    case 'ferret':
      return {
        primary: `Rotina: ${breed.energyLevel}`,
        secondary: breed.care.environment.recommendedSpace.slice(0, 36),
        tertiary: breed.care.behavior.sociability.slice(0, 36),
        beginnerFriendly: breed.species === 'guinea_pig',
      };
    case 'lizard':
      return {
        primary: `Terrário: ${breed.energyLevel}`,
        secondary: breed.care.environment.climateSensitivity.slice(0, 36),
        tertiary: `Porte: ${breed.size}`,
        beginnerFriendly: false,
      };
    default:
      return {
        primary: `Porte: ${breed.size}`,
        secondary: `Energia: ${breed.energyLevel}`,
        tertiary: breed.apartmentFriendly ? 'Apartamento OK' : 'Precisa de espaço',
        beginnerFriendly: beginner && breed.goodWithChildren,
      };
  }
}
