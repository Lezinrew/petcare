import { AnimalBreed, CareInfo } from '../modules/animals/animal.types';
import { slugify } from '../utils/slugify';

function genericCare(
  name: string,
  size: AnimalBreed['size'],
  energy: AnimalBreed['energyLevel'],
): CareInfo {
  return {
    feeding: {
      dailyAmount: '2% a 3% do peso corporal',
      mealsPerDay: '2 refeições',
      forbiddenFoods: ['chocolate', 'uvas', 'cebola', 'alho', 'abacate'],
      specialNeeds: `Dieta balanceada adequada para ${name}`,
    },
    hydration: {
      waterAmount: '40 a 80 ml por kg de peso por dia',
      dehydrationSigns: ['gengivas secas', 'apatia', 'olhos fundos'],
    },
    exercise: {
      dailyWalkTime: energy === 'baixo' ? '30 minutos' : energy === 'moderado' ? '45-60 minutos' : '1-2 horas',
      energyLevel: energy,
      recommendedActivities: ['passeios', 'brincadeiras', 'estímulos mentais'],
    },
    health: {
      idealWeight: 'Consulte veterinário para peso ideal',
      vaccines: ['V8 ou V10', 'Raiva', 'Gripe canina'],
      commonDiseases: ['Consulte veterinário para predisposições da raça'],
    },
    hygiene: {
      bathFrequency: 'A cada 30 a 45 dias ou quando necessário',
      coatCare: 'Escovação regular conforme tipo de pelagem',
    },
    behavior: {
      temperament: 'Varia conforme socialização e treinamento',
      trainability: 'Moderada a alta com consistência',
      sociability: 'Depende de socialização precoce',
      otherAnimals: 'Introdução gradual recomendada',
    },
    environment: {
      recommendedSpace: size === 'pequeno' ? 'pequeno a médio' : size === 'gigante' ? 'grande' : 'médio',
      canLiveInApartment: size === 'pequeno' || size === 'médio' ? 'sim, com exercícios' : 'preferível espaço maior',
      climateSensitivity: 'Evitar calor extremo',
      backyardNeed: size === 'grande' || size === 'gigante' ? 'desejável' : 'opcional',
    },
    growth: {
      adultSize: 'Varia conforme sexo e linhagem',
      adultAge: '12 a 18 meses',
    },
    curiosities: [`${name} é uma raça reconhecida internacionalmente`],
  };
}

const labradorRetriever: Omit<AnimalBreed, 'id'> = {
  slug: 'labrador-retriever',
  species: 'dog',
  name: 'Labrador Retriever',
  origin: 'Canadá',
  originalFunction: 'Cão de trabalho, caça e resgate',
  lifeExpectancy: '10 a 12 anos',
  size: 'grande',
  energyLevel: 'alto',
  apartmentFriendly: true,
  goodWithChildren: true,
  shortDescription:
    'Amigável, inteligente e leal, o Labrador Retriever é uma das raças mais populares do mundo. Ideal para famílias, adora companhia, brincadeiras e atividades ao ar livre.',
  care: {
    feeding: {
      dailyAmount: '2% a 3% do peso corporal',
      mealsPerDay: '2 refeições',
      forbiddenFoods: ['chocolate', 'uvas', 'cebola', 'alho', 'abacate', 'bebidas alcoólicas', 'alimentos gordurosos'],
      specialNeeds: 'dieta balanceada rica em proteínas de qualidade para manutenção da energia e massa muscular',
    },
    hydration: {
      waterAmount: '50 a 100 ml por kg de peso por dia',
      dehydrationSigns: ['gengivas secas', 'apatia', 'olhos fundos', 'perda de elasticidade da pele'],
    },
    exercise: {
      dailyWalkTime: '1 a 2 horas',
      energyLevel: 'alto',
      recommendedActivities: ['buscar objetos', 'natação', 'corridas', 'trilhas', 'jogos de agilidade'],
    },
    health: {
      idealWeight: 'machos 29 a 36 kg; fêmeas 25 a 32 kg',
      vaccines: ['V8 ou V10', 'Raiva', 'Gripe canina', 'Giárdia', 'Hepatite infecciosa e outras conforme orientação veterinária'],
      commonDiseases: ['displasia de quadril e cotovelo', 'obesidade', 'problemas oculares', 'otites'],
    },
    hygiene: {
      bathFrequency: 'a cada 30 a 45 dias ou quando necessário',
      coatCare: 'escovação semanal',
    },
    behavior: {
      temperament: 'dócil, amigável, paciente e muito afetuoso',
      trainability: 'aprende rápido e gosta de agradar',
      sociability: 'muito sociável, ótimo com crianças e visitas',
      otherAnimals: 'geralmente se dá bem com outros cães e animais',
    },
    environment: {
      recommendedSpace: 'médio a grande',
      canLiveInApartment: 'sim, se tiver exercícios diários',
      climateSensitivity: 'tolerante ao frio, mas sensível ao calor excessivo',
      backyardNeed: 'desejável, mas não obrigatório',
    },
    growth: {
      adultSize: 'machos 56 a 62 cm; fêmeas 54 a 60 cm',
      adultAge: 'entre 12 e 18 meses',
    },
    curiosities: [
      'Origem da raça ligada ao Canadá no século XIX',
      'Usado para caça, resgate e auxílio a pessoas',
      'Inteligente, leal e com grande amor por água',
    ],
  },
};

const shihTzu: Omit<AnimalBreed, 'id'> = {
  slug: 'shih-tzu',
  species: 'dog',
  name: 'Shih Tzu',
  origin: 'China',
  originalFunction: 'Cão de companhia',
  lifeExpectancy: '10 a 16 anos',
  size: 'pequeno',
  energyLevel: 'moderado',
  apartmentFriendly: true,
  goodWithChildren: true,
  shortDescription: 'Pequeno, afetuoso e adaptável, o Shih Tzu é ideal para apartamentos e famílias que buscam um companheiro carinhoso.',
  care: {
    ...genericCare('Shih Tzu', 'pequeno', 'moderado'),
    feeding: {
      dailyAmount: '2% a 3% do peso corporal',
      mealsPerDay: '2 a 3 refeições pequenas',
      forbiddenFoods: ['chocolate', 'uvas', 'cebola', 'alho', 'abacate'],
      specialNeeds: 'Ração para porte pequeno, evitar excesso de gordura',
    },
    exercise: {
      dailyWalkTime: '30 a 45 minutos',
      energyLevel: 'moderado',
      recommendedActivities: ['passeios curtos', 'brincadeiras em casa', 'socialização'],
    },
    hygiene: {
      bathFrequency: 'a cada 3 a 4 semanas',
      coatCare: 'escovação diária da pelagem longa',
    },
    behavior: {
      temperament: 'afetuoso, alerta e sociável',
      trainability: 'moderada, responde bem a reforço positivo',
      sociability: 'excelente com família e visitas',
      otherAnimals: 'geralmente compatível com socialização',
    },
    curiosities: ['Nome significa "leão" em chinês', 'Raça imperial da China', 'Excelente cão de apartamento'],
  },
};

const goldenRetriever: Omit<AnimalBreed, 'id'> = {
  slug: 'golden-retriever',
  species: 'dog',
  name: 'Golden Retriever',
  origin: 'Escócia',
  originalFunction: 'Caça e retriever',
  lifeExpectancy: '10 a 12 anos',
  size: 'grande',
  energyLevel: 'alto',
  apartmentFriendly: true,
  goodWithChildren: true,
  shortDescription: 'Dócil, inteligente e devotado, o Golden é um dos melhores cães de família, conhecido pela paciência com crianças.',
  care: {
    ...genericCare('Golden Retriever', 'grande', 'alto'),
    exercise: {
      dailyWalkTime: '1 a 2 horas',
      energyLevel: 'alto',
      recommendedActivities: ['natação', 'buscar objetos', 'corrida', 'treinamento de obediência'],
    },
    health: {
      idealWeight: 'machos 30 a 34 kg; fêmeas 25 a 29 kg',
      vaccines: ['V8 ou V10', 'Raiva', 'Gripe canina'],
      commonDiseases: ['displasia de quadril', 'câncer', 'problemas cardíacos', 'alergias de pele'],
    },
    behavior: {
      temperament: 'amigável, confiante e gentil',
      trainability: 'muito alta, usado como cão de assistência',
      sociability: 'extremamente sociável',
      otherAnimals: 'excelente com outros pets',
    },
    curiosities: ['Originário das Terras Altas da Escócia', 'Popular como cão de terapia', 'Adora água'],
  },
};

const pastorAlemao: Omit<AnimalBreed, 'id'> = {
  slug: 'pastor-alemao',
  species: 'dog',
  name: 'Pastor Alemão',
  origin: 'Alemanha',
  originalFunction: 'Pastoreio e proteção',
  lifeExpectancy: '9 a 13 anos',
  size: 'grande',
  energyLevel: 'alto',
  apartmentFriendly: false,
  goodWithChildren: true,
  shortDescription: 'Inteligente, leal e versátil, o Pastor Alemão exige tutores experientes e muito estímulo físico e mental.',
  care: {
    ...genericCare('Pastor Alemão', 'grande', 'alto'),
    exercise: {
      dailyWalkTime: '1 a 2 horas',
      energyLevel: 'alto',
      recommendedActivities: ['treinamento avançado', 'corrida', 'agilidade', 'pastoreio'],
    },
    health: {
      idealWeight: 'machos 30 a 40 kg; fêmeas 22 a 32 kg',
      vaccines: ['V8 ou V10', 'Raiva', 'Gripe canina'],
      commonDiseases: ['displasia de quadril', 'problemas de coluna', 'displasia de cotovelo'],
    },
    behavior: {
      temperament: 'confiante, corajoso e protetor',
      trainability: 'muito alta, usado em polícia e resgate',
      sociability: 'leal à família, reservado com estranhos',
      otherAnimals: 'requer socialização precoce',
    },
    environment: {
      recommendedSpace: 'grande',
      canLiveInApartment: 'não recomendado sem exercício intenso',
      climateSensitivity: 'adaptável, sensível ao calor',
      backyardNeed: 'muito desejável',
    },
    curiosities: ['Segunda raça mais popular do mundo', 'Usado em serviços militares e policiais', 'Extremamente inteligente'],
  },
};

const pug: Omit<AnimalBreed, 'id'> = {
  slug: 'pug',
  species: 'dog',
  name: 'Pug',
  origin: 'China',
  originalFunction: 'Cão de companhia',
  lifeExpectancy: '12 a 15 anos',
  size: 'pequeno',
  energyLevel: 'baixo',
  apartmentFriendly: true,
  goodWithChildren: true,
  shortDescription: 'Pequeno, charmoso e brincalhão, o Pug é perfeito para apartamentos e tutores que preferem energia moderada.',
  care: {
    ...genericCare('Pug', 'pequeno', 'baixo'),
    exercise: {
      dailyWalkTime: '30 minutos',
      energyLevel: 'baixo',
      recommendedActivities: ['passeios curtos', 'brincadeiras leves em casa'],
    },
    health: {
      idealWeight: '6 a 8 kg',
      vaccines: ['V8 ou V10', 'Raiva'],
      commonDiseases: ['problemas respiratórios', 'obesidade', 'problemas oculares', 'dermatite'],
    },
    hygiene: {
      bathFrequency: 'a cada 3 a 4 semanas',
      coatCare: 'escovação semanal, limpeza das dobras faciais',
    },
    behavior: {
      temperament: 'afetuoso, brincalhão e sociável',
      trainability: 'moderada, pode ser teimoso',
      sociability: 'adora pessoas',
      otherAnimals: 'geralmente compatível',
    },
    environment: {
      recommendedSpace: 'pequeno',
      canLiveInApartment: 'sim, ideal para apartamento',
      climateSensitivity: 'muito sensível ao calor por causa do focinho curto',
      backyardNeed: 'não necessário',
    },
    curiosities: ['Raça bracicefálica', 'Companheiro de imperadores chineses', 'Conhecido por expressão única'],
  },
};

const borderCollie: Omit<AnimalBreed, 'id'> = {
  slug: 'border-collie',
  species: 'dog',
  name: 'Border Collie',
  origin: 'Reino Unido',
  originalFunction: 'Pastoreio',
  lifeExpectancy: '12 a 15 anos',
  size: 'médio',
  energyLevel: 'muito alto',
  apartmentFriendly: false,
  goodWithChildren: true,
  shortDescription: 'Considerado o cão mais inteligente do mundo, o Border Collie precisa de tutores ativos e muito estímulo mental.',
  care: {
    ...genericCare('Border Collie', 'médio', 'muito alto'),
    exercise: {
      dailyWalkTime: '2 horas ou mais',
      energyLevel: 'muito alto',
      recommendedActivities: ['pastoreio', 'agilidade', 'frisbee', 'treinamento avançado', 'corrida'],
    },
    health: {
      idealWeight: 'machos 14 a 20 kg; fêmeas 12 a 19 kg',
      vaccines: ['V8 ou V10', 'Raiva', 'Gripe canina'],
      commonDiseases: ['displasia de quadril', 'anomalia do olho do Collie', 'epilepsia'],
    },
    behavior: {
      temperament: 'alerta, enérgico e focado',
      trainability: 'excepcional, aprende comandos complexos',
      sociability: 'afetuoso com família',
      otherAnimals: 'instinto de pastoreio pode afetar convivência',
    },
    environment: {
      recommendedSpace: 'grande com área para correr',
      canLiveInApartment: 'não recomendado',
      climateSensitivity: 'adaptável',
      backyardNeed: 'essencial',
    },
    curiosities: ['Considerado o cão mais inteligente', 'Excelente em esportes caninos', 'Precisa de "trabalho" diário'],
  },
};

const pitBull: Omit<AnimalBreed, 'id'> = {
  slug: 'pit-bull',
  species: 'dog',
  name: 'Pit Bull',
  origin: 'Estados Unidos',
  originalFunction: 'Cão de trabalho e companhia',
  lifeExpectancy: '12 a 16 anos',
  size: 'médio',
  energyLevel: 'alto',
  apartmentFriendly: true,
  goodWithChildren: true,
  shortDescription: 'Musculoso, leal e afetuoso, o Pit Bull com tutores responsáveis é um excelente companheiro familiar.',
  care: {
    ...genericCare('Pit Bull', 'médio', 'alto'),
    exercise: {
      dailyWalkTime: '1 a 1,5 horas',
      energyLevel: 'alto',
      recommendedActivities: ['corrida', 'brincadeiras de força', 'treinamento', 'socialização'],
    },
    health: {
      idealWeight: 'machos 16 a 27 kg; fêmeas 14 a 23 kg',
      vaccines: ['V8 ou V10', 'Raiva', 'Gripe canina'],
      commonDiseases: ['alergias de pele', 'displasia de quadril', 'problemas de tireoide'],
    },
    behavior: {
      temperament: 'leal, corajoso e afetuoso com a família',
      trainability: 'alta com tutores consistentes',
      sociability: 'muito afetuoso com pessoas conhecidas',
      otherAnimals: 'socialização precoce essencial',
    },
    environment: {
      recommendedSpace: 'médio',
      canLiveInApartment: 'sim, com exercícios adequados',
      climateSensitivity: 'sensível ao frio extremo',
      backyardNeed: 'desejável',
    },
    curiosities: ['Nome engloba várias raças (APBT, AmStaff)', 'Conhecido por lealdade extrema', 'Requer socialização desde filhote'],
  },
};

type BreedMeta = {
  name: string;
  origin: string;
  originalFunction: string;
  lifeExpectancy: string;
  size: AnimalBreed['size'];
  energyLevel: AnimalBreed['energyLevel'];
  apartmentFriendly: boolean;
  goodWithChildren: boolean;
  shortDescription: string;
};

const otherBreeds: BreedMeta[] = [
  { name: 'Beagle', origin: 'Inglaterra', originalFunction: 'Caça', lifeExpectancy: '12 a 15 anos', size: 'médio', energyLevel: 'alto', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Curioso, amigável e cheio de energia, o Beagle adora explorar com o faro aguçado.' },
  { name: 'Bichon Frisé', origin: 'França', originalFunction: 'Companhia', lifeExpectancy: '12 a 15 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Pequeno, alegre e hipoalergênico, ideal para apartamentos.' },
  { name: 'Boston Terrier', origin: 'Estados Unidos', originalFunction: 'Companhia', lifeExpectancy: '11 a 13 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Compacto, inteligente e amigável, conhecido como "cavalheiro americano".' },
  { name: 'Boxer', origin: 'Alemanha', originalFunction: 'Proteção', lifeExpectancy: '10 a 12 anos', size: 'grande', energyLevel: 'alto', apartmentFriendly: false, goodWithChildren: true, shortDescription: 'Brincalhão, protetor e leal, adora a família e precisa de exercício.' },
  { name: 'Bulldog', origin: 'Inglaterra', originalFunction: 'Companhia', lifeExpectancy: '8 a 10 anos', size: 'médio', energyLevel: 'baixo', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Calmo, carinhoso e de baixa energia, ideal para tutores menos ativos.' },
  { name: 'Bulldog Inglês', origin: 'Inglaterra', originalFunction: 'Companhia', lifeExpectancy: '8 a 10 anos', size: 'médio', energyLevel: 'baixo', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Tranquilo e afetuoso, precisa de cuidados com respiração e calor.' },
  { name: 'Bully', origin: 'Estados Unidos', originalFunction: 'Companhia', lifeExpectancy: '10 a 12 anos', size: 'médio', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Musculoso e amigável, variante do American Bully com boa adaptabilidade.' },
  { name: 'Cane Corso', origin: 'Itália', originalFunction: 'Guarda', lifeExpectancy: '9 a 12 anos', size: 'gigante', energyLevel: 'moderado', apartmentFriendly: false, goodWithChildren: false, shortDescription: 'Grande, imponente e protetor, requer tutor experiente e espaço amplo.' },
  { name: 'Chihuahua', origin: 'México', originalFunction: 'Companhia', lifeExpectancy: '12 a 18 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: false, shortDescription: 'O menor cão do mundo, alerta e leal ao tutor.' },
  { name: 'Cocker Spaniel', origin: 'Inglaterra', originalFunction: 'Caça', lifeExpectancy: '12 a 15 anos', size: 'médio', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Alegre, afetuoso e com belas orelhas que precisam de cuidados.' },
  { name: 'Dachshund', origin: 'Alemanha', originalFunction: 'Caça', lifeExpectancy: '12 a 16 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Corajoso e curioso, conhecido como "cachorro salsicha".' },
  { name: 'Doberman', origin: 'Alemanha', originalFunction: 'Proteção', lifeExpectancy: '10 a 13 anos', size: 'grande', energyLevel: 'alto', apartmentFriendly: false, goodWithChildren: true, shortDescription: 'Elegante, inteligente e leal, excelente cão de guarda e família.' },
  { name: 'Husky Siberiano', origin: 'Sibéria', originalFunction: 'Trenó', lifeExpectancy: '12 a 15 anos', size: 'grande', energyLevel: 'muito alto', apartmentFriendly: false, goodWithChildren: true, shortDescription: 'Resistente, independente e cheio de energia, precisa de frio e exercício intenso.' },
  { name: 'Lhasa Apso', origin: 'Tibet', originalFunction: 'Companhia', lifeExpectancy: '12 a 15 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Independente e alerta, antigo cão guardião de mosteiros.' },
  { name: 'Maltês', origin: 'Malta', originalFunction: 'Companhia', lifeExpectancy: '12 a 15 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Delicado, afetuoso e perfeito para colo e apartamentos.' },
  { name: 'Pinscher', origin: 'Alemanha', originalFunction: 'Caça de roedores', lifeExpectancy: '12 a 16 anos', size: 'pequeno', energyLevel: 'alto', apartmentFriendly: true, goodWithChildren: false, shortDescription: 'Pequeno, alerta e enérgico, excelente cão de alerta.' },
  { name: 'Poodle', origin: 'França/Alemanha', originalFunction: 'Caça aquática', lifeExpectancy: '12 a 15 anos', size: 'médio', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Inteligente, hipoalergênico e versátil em três portes.' },
  { name: 'Rottweiler', origin: 'Alemanha', originalFunction: 'Guarda e trabalho', lifeExpectancy: '8 a 10 anos', size: 'grande', energyLevel: 'moderado', apartmentFriendly: false, goodWithChildren: true, shortDescription: 'Confiante, protetor e leal, requer socialização e treinamento.' },
  { name: 'Schnauzer', origin: 'Alemanha', originalFunction: 'Caça e guarda', lifeExpectancy: '12 a 15 anos', size: 'médio', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Inteligente, barbudo e versátil, bom cão de família.' },
  { name: 'Spitz Alemão', origin: 'Alemanha', originalFunction: 'Companhia', lifeExpectancy: '13 a 15 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Pequeno, esponjoso e alerta, parente do Pomerânia.' },
  { name: 'Vira-lata', origin: 'Brasil', originalFunction: 'Companhia', lifeExpectancy: '12 a 15 anos', size: 'médio', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Resistente, adaptável e cheio de personalidade — adoção responsável salva vidas.' },
  { name: 'West Highland White Terrier', origin: 'Escócia', originalFunction: 'Caça', lifeExpectancy: '12 a 16 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: true, shortDescription: 'Pequeno, branco e cheio de personalidade, conhecido como Westie.' },
  { name: 'Yorkshire', origin: 'Inglaterra', originalFunction: 'Companhia', lifeExpectancy: '13 a 16 anos', size: 'pequeno', energyLevel: 'moderado', apartmentFriendly: true, goodWithChildren: false, shortDescription: 'Pequeno, elegante e corajoso, popular em apartamentos urbanos.' },
];

const richBreeds = [
  labradorRetriever,
  shihTzu,
  goldenRetriever,
  pastorAlemao,
  pug,
  borderCollie,
  pitBull,
];

function buildGenericBreed(meta: BreedMeta): Omit<AnimalBreed, 'id'> {
  return {
    slug: slugify(meta.name),
    species: 'dog',
    name: meta.name,
    origin: meta.origin,
    originalFunction: meta.originalFunction,
    lifeExpectancy: meta.lifeExpectancy,
    size: meta.size,
    energyLevel: meta.energyLevel,
    apartmentFriendly: meta.apartmentFriendly,
    goodWithChildren: meta.goodWithChildren,
    shortDescription: meta.shortDescription,
    care: genericCare(meta.name, meta.size, meta.energyLevel),
  };
}

export const allDogBreeds: Omit<AnimalBreed, 'id'>[] = [
  ...richBreeds,
  ...otherBreeds.map(buildGenericBreed),
];
