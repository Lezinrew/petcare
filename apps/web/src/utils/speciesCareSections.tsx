import { ReactNode } from 'react';
import { AnimalBreed, CareInfo, Species } from '../types/animal';

export type CareSectionDef = {
  key: string;
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  disclaimer?: string;
  render: (care: CareInfo) => ReactNode;
};

const list = (items: string[]) => (
  <ul className="list-inside list-disc">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

function standardSections(): CareSectionDef[] {
  return [
    {
      key: 'feeding',
      title: 'Alimentação',
      icon: '🍖',
      color: 'text-feeding',
      borderColor: 'border-feeding',
      render: (c) => (
        <>
          <p><strong>Quantidade:</strong> {c.feeding.dailyAmount}</p>
          <p><strong>Refeições:</strong> {c.feeding.mealsPerDay}</p>
          <p><strong>Proibidos:</strong> {c.feeding.forbiddenFoods.join(', ')}</p>
          <p><strong>Necessidades:</strong> {c.feeding.specialNeeds}</p>
        </>
      ),
    },
    {
      key: 'hydration',
      title: 'Hidratação',
      icon: '💧',
      color: 'text-hydration',
      borderColor: 'border-hydration',
      render: (c) => (
        <>
          <p><strong>Água:</strong> {c.hydration.waterAmount}</p>
          <p><strong>Sinais de alerta:</strong></p>
          {list(c.hydration.dehydrationSigns)}
        </>
      ),
    },
    {
      key: 'exercise',
      title: 'Exercícios',
      icon: '🏃',
      color: 'text-exercise',
      borderColor: 'border-exercise',
      render: (c) => (
        <>
          <p><strong>Atividade:</strong> {c.exercise.dailyWalkTime}</p>
          <p><strong>Energia:</strong> {c.exercise.energyLevel}</p>
          <p><strong>Atividades:</strong></p>
          {list(c.exercise.recommendedActivities)}
        </>
      ),
    },
    {
      key: 'health',
      title: 'Saúde',
      icon: '❤️',
      color: 'text-health',
      borderColor: 'border-health',
      disclaimer: 'Informação educativa. Não substitui orientação veterinária.',
      render: (c) => (
        <>
          <p><strong>Peso ideal:</strong> {c.health.idealWeight}</p>
          <p><strong>Vacinas / prevenção:</strong> {c.health.vaccines.join(', ')}</p>
          <p><strong>Doenças comuns:</strong> {c.health.commonDiseases.join(', ')}</p>
        </>
      ),
    },
    {
      key: 'hygiene',
      title: 'Higiene',
      icon: '🛁',
      color: 'text-hygiene',
      borderColor: 'border-hygiene',
      render: (c) => (
        <>
          <p><strong>Banho / limpeza:</strong> {c.hygiene.bathFrequency}</p>
          <p><strong>Pelagem / ambiente:</strong> {c.hygiene.coatCare}</p>
        </>
      ),
    },
    {
      key: 'behavior',
      title: 'Comportamento',
      icon: '🎾',
      color: 'text-behavior',
      borderColor: 'border-behavior',
      render: (c) => (
        <>
          <p><strong>Temperamento:</strong> {c.behavior.temperament}</p>
          <p><strong>Treinamento:</strong> {c.behavior.trainability}</p>
          <p><strong>Sociabilidade:</strong> {c.behavior.sociability}</p>
          <p><strong>Outros animais:</strong> {c.behavior.otherAnimals}</p>
        </>
      ),
    },
    {
      key: 'environment',
      title: 'Ambiente',
      icon: '🏡',
      color: 'text-environment',
      borderColor: 'border-environment',
      render: (c) => (
        <>
          <p><strong>Espaço:</strong> {c.environment.recommendedSpace}</p>
          <p><strong>Apartamento:</strong> {c.environment.canLiveInApartment}</p>
          <p><strong>Clima:</strong> {c.environment.climateSensitivity}</p>
          <p><strong>Quintal / externo:</strong> {c.environment.backyardNeed}</p>
        </>
      ),
    },
    {
      key: 'growth',
      title: 'Reprodução e crescimento',
      icon: '📏',
      color: 'text-primary',
      borderColor: 'border-primary',
      render: (c) => (
        <>
          <p><strong>Tamanho adulto:</strong> {c.growth.adultSize}</p>
          <p><strong>Fase adulta:</strong> {c.growth.adultAge}</p>
        </>
      ),
    },
    {
      key: 'curiosities',
      title: 'Curiosidades',
      icon: '✨',
      color: 'text-primary',
      borderColor: 'border-primary',
      render: (c) => list(c.curiosities),
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
    default:
      return {
        primary: `Porte: ${breed.size}`,
        secondary: `Energia: ${breed.energyLevel}`,
        tertiary: breed.apartmentFriendly ? 'Apartamento OK' : 'Precisa de espaço',
        beginnerFriendly: beginner && breed.goodWithChildren,
      };
  }
}
