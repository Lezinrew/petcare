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
  turtle: {
    origin: 'Variada',
    originalFunction: 'Companhia e aquaterrario educativo',
    lifeExpectancy: '20 a 50 anos',
    size: 'pequeno',
    energyLevel: 'baixo',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  twister: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '2 a 3 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  guinea_pig: {
    origin: 'Variada',
    originalFunction: 'Companhia',
    lifeExpectancy: '5 a 8 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: true,
  },
  chinchilla: {
    origin: 'Andes',
    originalFunction: 'Companhia',
    lifeExpectancy: '10 a 15 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  gerbil: {
    origin: 'Mongolia e regiões áridas',
    originalFunction: 'Companhia',
    lifeExpectancy: '2 a 4 anos',
    size: 'pequeno',
    energyLevel: 'moderado',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  ferret: {
    origin: 'Europa',
    originalFunction: 'Companhia e caça controlada',
    lifeExpectancy: '6 a 10 anos',
    size: 'pequeno',
    energyLevel: 'alto',
    apartmentFriendly: true,
    goodWithChildren: false,
  },
  lizard: {
    origin: 'Variada',
    originalFunction: 'Terrario educativo',
    lifeExpectancy: '5 a 20 anos',
    size: 'pequeno',
    energyLevel: 'baixo',
    apartmentFriendly: true,
    goodWithChildren: false,
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

  if (species === 'turtle') {
    return {
      ...base,
      feeding: {
        dailyAmount: 'Porções pequenas conforme espécie, idade e temperatura',
        mealsPerDay: 'Jovens: diária; adultas: conforme orientação especializada',
        forbiddenFoods: ['pão', 'leite', 'temperos', 'alimentos processados', 'plantas tóxicas'],
        specialNeeds: 'Dieta varia entre espécies aquáticas e terrestres; pesquise antes da compra',
      },
      hydration: {
        waterAmount: 'Água limpa e filtrada no aquaterrário ou acesso constante a água',
        dehydrationSigns: ['olhos fundos', 'apatia', 'casco ressecado', 'perda de apetite'],
      },
      exercise: {
        dailyWalkTime: 'Exploração diária em ambiente seguro e enriquecido',
        energyLevel: energy,
        recommendedActivities: ['área seca para descanso', 'natação quando aquática', 'banho de sol controlado'],
      },
      health: {
        idealWeight: 'Varia muito por espécie e idade',
        vaccines: ['Não há protocolo comum; exige avaliação com veterinário de animais silvestres/exóticos'],
        commonDiseases: ['hipovitaminose A', 'fungos no casco', 'pneumonia', 'doença metabólica óssea'],
      },
      hygiene: {
        bathFrequency: 'Manter água e substrato limpos; não usar produtos químicos no animal',
        coatCare: 'Inspecionar casco e pele regularmente',
      },
      behavior: {
        temperament: 'Calma, observadora e sensível ao manejo excessivo',
        trainability: 'Baixa; responde melhor a rotina previsível',
        sociability: 'Prefere pouco manuseio e ambiente estável',
        otherAnimals: 'Não deve conviver solta com cães, gatos ou espécies incompatíveis',
      },
      environment: {
        recommendedSpace: 'aquaterrário ou terrário amplo com área seca, água e aquecimento',
        canLiveInApartment: 'sim, com estrutura adequada, filtro, UVB e controle térmico',
        climateSensitivity: 'Muito dependente de temperatura, umidade e luz UVB',
        backyardNeed: 'opcional, apenas em área segura e supervisionada',
      },
      growth: {
        adultSize: 'Varia de pequeno a grande conforme espécie',
        adultAge: 'Maturidade lenta; compromisso de décadas',
      },
      curiosities: [
        `${name} exige planejamento de longo prazo, pois muitas tartarugas vivem por décadas`,
        'A maioria precisa de luz UVB, temperatura controlada e dieta específica',
      ],
    };
  }

  if (species === 'twister' || species === 'guinea_pig' || species === 'chinchilla' || species === 'gerbil' || species === 'ferret') {
    const isFerret = species === 'ferret';
    const isGuineaPig = species === 'guinea_pig';
    return {
      ...base,
      feeding: {
        dailyAmount: isFerret ? 'Ração específica rica em proteína animal' : 'Pequenas porções diárias conforme espécie',
        mealsPerDay: isFerret ? '2 a 4 pequenas refeições' : '1 a 2 refeições + feno/volumoso quando indicado',
        forbiddenFoods: ['chocolate', 'cebola', 'alho', 'doces', 'alimentos ultraprocessados'],
        specialNeeds: isGuineaPig ? 'Vitamina C diária é essencial para porquinhos-da-índia' : 'Dieta específica e enriquecimento alimentar',
      },
      exercise: {
        dailyWalkTime: isFerret ? '2 a 4 horas de atividade supervisionada' : 'Tempo diário em área segura e enriquecida',
        energyLevel: energy,
        recommendedActivities: ['túneis', 'esconderijos', 'brinquedos seguros', 'forrageamento'],
      },
      health: {
        idealWeight: 'Varia conforme espécie, sexo e linhagem',
        vaccines: isFerret ? ['Consulte veterinário sobre vacinação e prevenção'] : ['Conforme orientação veterinária para exóticos'],
        commonDiseases: ['problemas dentários', 'estresse', 'parasitas', 'alterações respiratórias'],
      },
      hygiene: {
        bathFrequency: species === 'chinchilla' ? 'Banho seco com pó apropriado; nunca banho comum' : 'Evitar banhos desnecessários; manter recinto limpo',
        coatCare: 'Limpeza frequente do recinto e observação de pele/pelos',
      },
      behavior: {
        temperament: isFerret ? 'Curioso, ativo e brincalhão' : 'Sensível, social e dependente de rotina',
        trainability: 'Pode aprender rotina e manejo com paciência',
        sociability: 'Algumas espécies precisam viver em pares ou grupos compatíveis',
        otherAnimals: 'Contato com cães e gatos deve ser evitado ou supervisionado com muito cuidado',
      },
      environment: {
        recommendedSpace: isFerret ? 'ambiente seguro para exploração + recinto de descanso' : 'recinto amplo com substrato e esconderijos',
        canLiveInApartment: 'sim, com enriquecimento e segurança',
        climateSensitivity: 'Evitar calor excessivo, frio intenso e correntes de ar',
        backyardNeed: 'não necessário',
      },
    };
  }

  if (species === 'lizard') {
    return {
      ...base,
      feeding: {
        dailyAmount: 'Varia por espécie: insetos, vegetais ou dieta mista',
        mealsPerDay: 'Conforme idade, espécie e temperatura',
        forbiddenFoods: ['insetos capturados na rua', 'alimentos temperados', 'plantas tóxicas'],
        specialNeeds: 'Suplementação, cálcio e UVB dependem da espécie',
      },
      hydration: {
        waterAmount: 'Água limpa e umidade adequada ao bioma da espécie',
        dehydrationSigns: ['olhos fundos', 'pele enrugada', 'apatia', 'dificuldade na muda'],
      },
      exercise: {
        dailyWalkTime: 'Exploração dentro de terrário seguro',
        energyLevel: energy,
        recommendedActivities: ['galhos', 'tocas', 'pedras seguras', 'gradiente térmico'],
      },
      health: {
        idealWeight: 'Varia por espécie',
        vaccines: ['Não há protocolo comum; consultar veterinário de répteis'],
        commonDiseases: ['doença metabólica óssea', 'retenção de muda', 'parasitas', 'queimaduras por aquecimento inadequado'],
      },
      hygiene: {
        bathFrequency: 'Limpeza do terrário e troca de substrato conforme necessidade',
        coatCare: 'Acompanhar muda de pele e integridade dos dedos/cauda',
      },
      behavior: {
        temperament: 'Varia muito por espécie; muitas preferem pouco manuseio',
        trainability: 'Baixa; rotina e manejo calmo ajudam',
        sociability: 'Geralmente territorial ou solitário',
        otherAnimals: 'Não deve conviver solto com outros pets',
      },
      environment: {
        recommendedSpace: 'terrário dimensionado com aquecimento, UVB e esconderijos',
        canLiveInApartment: 'sim, com estrutura técnica adequada',
        climateSensitivity: 'Dependente de temperatura, umidade e luz UVB corretas',
        backyardNeed: 'não necessário',
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
