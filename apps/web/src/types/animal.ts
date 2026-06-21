export type Size = 'pequeno' | 'médio' | 'grande' | 'gigante';
export type EnergyLevel = 'baixo' | 'moderado' | 'alto' | 'muito alto';
export type Species = 'dog' | 'cat' | 'fish' | 'hamster' | 'bird' | 'rabbit';

export type CareInfo = {
  feeding: {
    dailyAmount: string;
    mealsPerDay: string;
    forbiddenFoods: string[];
    specialNeeds: string;
  };
  hydration: {
    waterAmount: string;
    dehydrationSigns: string[];
  };
  exercise: {
    dailyWalkTime: string;
    energyLevel: string;
    recommendedActivities: string[];
  };
  health: {
    idealWeight: string;
    vaccines: string[];
    commonDiseases: string[];
  };
  hygiene: {
    bathFrequency: string;
    coatCare: string;
  };
  behavior: {
    temperament: string;
    trainability: string;
    sociability: string;
    otherAnimals: string;
  };
  environment: {
    recommendedSpace: string;
    canLiveInApartment: string;
    climateSensitivity: string;
    backyardNeed: string;
  };
  growth: {
    adultSize: string;
    adultAge: string;
  };
  curiosities: string[];
};

export type AnimalBreed = {
  id?: string;
  slug: string;
  species: Species;
  name: string;
  origin: string;
  originalFunction: string;
  lifeExpectancy: string;
  size: Size;
  energyLevel: EnergyLevel;
  apartmentFriendly: boolean;
  goodWithChildren: boolean;
  shortDescription: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageSource?: string;
  placeholderUrl?: string;
  care: CareInfo;
};

export type DogFilters = {
  search?: string;
  size?: Size | '';
  energyLevel?: EnergyLevel | '';
};
