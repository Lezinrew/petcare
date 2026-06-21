import { AnimalBreed, CareInfo, EnergyLevel, Size } from '../modules/animals/animal.types';
import { slugify } from '../utils/slugify';

export type Species = AnimalBreed['species'];

export type BreedSeedInput = {
  name: string;
  species: Species;
  slug?: string;
  origin?: string;
  originalFunction?: string;
  lifeExpectancy?: string;
  size?: Size;
  energyLevel?: EnergyLevel;
  apartmentFriendly?: boolean;
  goodWithChildren?: boolean;
  shortDescription?: string;
};

const SPECIES_DEFAULTS: Record<
  Species,
  Pick<BreedSeedInput, 'origin' | 'originalFunction' | 'lifeExpectancy' | 'size' | 'energyLevel' | 'apartmentFriendly' | 'goodWithChildren'>
> = {
  dog: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '10 a 14 anos',
    size: 'médio',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: true,
  },
  cat: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '12 a 16 anos',
    size: 'médio',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: true,
  },
  fish: {
    origin: 'Variada',
    originalFunction: 'Aquário ornamental',
    lifeExpectancy: '2 a 8 anos',
    size: 'pequeno',
    energyLevel: 'baixo',
    apartmentFriendly: true,
    goodWithChildren: true,
  },
  hamster: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '2 a 3 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  bird: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '5 a 15 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  rabbit: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '8 a 12 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: true,
  },
};

function careForSpecies(species: Species, name: string, size: Size, energy: EnergyLevel): CareInfo {
  const base = {
    feeding: {
      dailyAmount: 'Consulte veterinário ou especialista',
      mealsPerDay: 'Conforme espécie',
      forbiddenFoods: ['alimentos humanos sem orientação', 'produtos tóxicos para a espécie'],
      specialNeeds: `Dieta específica para ${name}`,
    },
    hydration: {
      waterAmount: 'Água limpa sempre disponível',
      dehydrationSigns: ['apatia', 'perda de apetite', 'mudança de comportamento'],
    },
    exercise: {
      dailyWalkTime: 'Conforme necessidade da espécie',
      energyLevel: energy,
      recommendedActivities: ['estímulos adequados à espécie'],
    },
    health: {
      idealWeight: 'Consulte veterinário',
      vaccines: ['Conforme orientação veterinária'],
      commonDiseases: ['Consulte veterinário para predisposições'],
    },
    hygiene: {
      bathFrequency: 'Conforme espécie e orientação profissional',
      coatCare: 'Limpeza regular do ambiente e do animal',
    },
    behavior: {
      temperament: 'Varia conforme linhagem e socialização',
      trainability: 'Depende da espécie e do tutor',
      sociability: 'Introdução gradual recomendada',
      otherAnimals: 'Compatibilidade varia — pesquise antes',
    },
    environment: {
      recommendedSpace: size === 'pequeno' ? 'ambiente controlado' : 'espaço amplo',
      canLiveInApartment: 'depende da espécie e do setup',
      climateSensitivity: 'Manter temperatura e umidade adequadas',
      backyardNeed: 'não aplicável ou opcional',
    },
    growth: {
      adultSize: 'Varia conforme sexo e linhagem',
      adultAge: 'Conforme espécie',
    },
    curiosities: [`${name} é uma opção popular entre tutores responsáveis`],
  };

  if (species === 'cat') {
    return {
      ...base,
      feeding: {
        dailyAmount: '2% a 3% do peso corporal em ração para gatos',
        mealsPerDay: '2 a 3 refeições',
        forbiddenFoods: ['cebola', 'alho', 'chocolate', 'uvas', 'passas', 'leite de vaca'],
        specialNeeds: 'Ração completa para gatos, rica em proteína animal',
      },
      exercise: {
        dailyWalkTime: '15 a 30 minutos de brincadeira ativa',
        energyLevel: energy,
        recommendedActivities: ['arranhador', 'brinquedos interativos', 'caixa de papelão'],
      },
      hygiene: {
        bathFrequency: 'Gatos se limpam — banho raramente necessário',
        coatCare: 'Escovação regular, especialmente em pelos longos',
      },
      environment: {
        recommendedSpace: 'vertical (prateleiras) + horizontal',
        canLiveInApartment: 'sim, com enriquecimento ambiental',
        climateSensitivity: 'Evitar correntes de ar e calor excessivo',
        backyardNeed: 'não necessário',
      },
    };
  }

  if (species === 'fish') {
    return {
      ...base,
      feeding: {
        dailyAmount: 'Pequenas porções 1 a 2 vezes ao dia',
        mealsPerDay: '1 a 2 vezes',
        forbiddenFoods: ['excesso de ração', 'alimentos inadequados'],
        specialNeeds: 'Ração específica para a espécie; não superalimentar',
      },
      hydration: {
        waterAmount: 'Qualidade da água do aquário (não bebem como mamíferos)',
        dehydrationSigns: ['não aplicável — observe qualidade da água e oxigenação'],
      },
      exercise: {
        dailyWalkTime: 'N/A — nadam livremente no aquário',
        energyLevel: energy,
        recommendedActivities: ['aquário dimensionado', 'plantas e esconderijos'],
      },
      health: {
        idealWeight: 'Conforme espécie',
        vaccines: ['N/A para peixes ornamentais'],
        commonDiseases: ['ich (ponto branco)', 'fungos', 'estresse por água inadequada'],
      },
      environment: {
        recommendedSpace: 'aquário filtrado e ciclado',
        canLiveInApartment: 'sim, com manutenção regular',
        climateSensitivity: 'Temperatura e pH estáveis conforme espécie',
        backyardNeed: 'não aplicável',
      },
    };
  }

  if (species === 'hamster') {
    return {
      ...base,
      feeding: {
        dailyAmount: '1 colher de sopa de mix para hamster por dia + petiscos',
        mealsPerDay: '1 refeição principal + petiscos',
        forbiddenFoods: ['cítricos', 'alimentos pegajosos', 'chocolate', 'alho', 'cebola'],
        specialNeeds: 'Mix comercial + vegetais frescos com moderação',
      },
      exercise: {
        dailyWalkTime: '30 min+ na rodinha ou área segura',
        energyLevel: energy,
        recommendedActivities: ['rodinha', 'túneis', 'labirintos'],
      },
      environment: {
        recommendedSpace: 'gaiola ampla com substrato',
        canLiveInApartment: 'sim',
        climateSensitivity: 'Evitar sol direto e correntes de ar',
        backyardNeed: 'não aplicável',
      },
    };
  }

  if (species === 'bird') {
    return {
      ...base,
      feeding: {
        dailyAmount: 'Mix de sementes ou ração extrusada conforme espécie',
        mealsPerDay: '2 refeições',
        forbiddenFoods: ['abacate (tóxico)', 'chocolate', 'sal em excesso', 'sementes de maçã'],
        specialNeeds: 'Variedade controlada — consulte especialista em aves',
      },
      exercise: {
        dailyWalkTime: 'Tempo fora da gaiola em ambiente seguro',
        energyLevel: energy,
        recommendedActivities: ['poleiros', 'brinquedos', 'socialização'],
      },
      environment: {
        recommendedSpace: 'gaiola/viveiro proporcional ao porte',
        canLiveInApartment: 'sim, com cuidado com barulho',
        climateSensitivity: 'Sem fumaça, spray ou Teflon aquecido',
        backyardNeed: 'viveiro externo apenas se seguro',
      },
    };
  }

  if (species === 'rabbit') {
    return {
      ...base,
      feeding: {
        dailyAmount: 'Feno à vontade + vegetais + ração limitada',
        mealsPerDay: 'Feno contínuo + 2 porções de vegetais',
        forbiddenFoods: ['alimentos ricos em amido', 'chocolate', 'algumas plantas tóxicas'],
        specialNeeds: 'Feno de gramínea é a base da alimentação',
      },
      exercise: {
        dailyWalkTime: '2 a 4 horas fora da gaiola em área segura',
        energyLevel: energy,
        recommendedActivities: ['saltos', 'túneis', 'brinquedos de madeira'],
      },
      environment: {
        recommendedSpace: 'gaiola + área de exercício',
        canLiveInApartment: 'sim, com dedicação',
        climateSensitivity: 'Evitar calor — coelhos sofrem com temperaturas altas',
        backyardNeed: 'opcional com proteção',
      },
    };
  }

  return base;
}

export function buildBreed(input: BreedSeedInput): Omit<AnimalBreed, 'id'> {
  const defaults = SPECIES_DEFAULTS[input.species];
  const size = input.size ?? defaults.size!;
  const energy = input.energyLevel ?? defaults.energyLevel!;

  return {
    slug: input.slug ?? slugify(input.name),
    species: input.species,
    name: input.name,
    origin: input.origin ?? defaults.origin!,
    originalFunction: input.originalFunction ?? defaults.originalFunction!,
    lifeExpectancy: input.lifeExpectancy ?? defaults.lifeExpectancy!,
    size,
    energyLevel: energy,
    apartmentFriendly: input.apartmentFriendly ?? defaults.apartmentFriendly!,
    goodWithChildren: input.goodWithChildren ?? defaults.goodWithChildren!,
    shortDescription:
      input.shortDescription ??
      `${input.name} — guia educativo de cuidados essenciais para tutores responsáveis.`,
    care: careForSpecies(input.species, input.name, size, energy),
  };
}

export function buildBreedsFromNames(names: string[], species: Species, slugOverrides?: Record<string, string>): Omit<AnimalBreed, 'id'>[] {
  return names.map((name) =>
    buildBreed({
      name,
      species,
      slug: slugOverrides?.[name],
    }),
  );
}
