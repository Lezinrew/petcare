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
    imageUrl?: string;
    imageAlt?: string;
    compatibilityScore: number;
    compatibilityLabel: string;
    reason: string;
    attentionPoints: string[];
  }[];
  responsibilityAlerts: string[];
  antiAbandonmentMessage: string;
};
