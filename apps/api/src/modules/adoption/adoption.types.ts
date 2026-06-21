export type AdoptionMatchRequest = {
  housing: 'apartment' | 'house';
  hasBackyard: boolean;
  hasChildren: boolean;
  hasOtherPets: boolean;
  experienceLevel: 'none' | 'some' | 'experienced';
  freeTimePerDay: 'low' | 'medium' | 'high';
  canWalkDaily: boolean;
  preferredSize: 'pequeno' | 'médio' | 'grande' | 'any';
  likesActivePets: boolean;
};

export type AdoptionMatchResult = {
  profile: string;
  recommendedBreeds: {
    name: string;
    slug: string;
    reason: string;
  }[];
  responsibilityAlerts: string[];
  antiAbandonmentMessage: string;
};
