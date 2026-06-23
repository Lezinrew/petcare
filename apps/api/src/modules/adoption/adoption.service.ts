import { z } from 'zod';
import { ApiError } from '../../utils/apiError';
import { animalRepository } from '../animals/animal.repository';
import { AnimalBreed } from '../animals/animal.types';
import { AdoptionMatchRequest, AdoptionMatchResult } from './adoption.types';

const matchRequestSchema = z.object({
  housing: z.enum(['apartment', 'house']),
  hasBackyard: z.boolean(),
  hasChildren: z.boolean(),
  hasOtherPets: z.boolean(),
  experienceLevel: z.enum(['none', 'some', 'experienced']),
  freeTimePerDay: z.enum(['low', 'medium', 'high']),
  canWalkDaily: z.boolean(),
  preferredSize: z.enum(['pequeno', 'médio', 'grande', 'any']),
  likesActivePets: z.boolean(),
});

const ANTI_ABANDONMENT =
  'Adotar é assumir uma vida. Antes de escolher um pet, pense em tempo, espaço, custos, paciência e compromisso de longo prazo.';

function scoreBreed(breed: AnimalBreed, req: AdoptionMatchRequest): number {
  let score = 50;

  if (req.housing === 'apartment') {
    if (breed.apartmentFriendly) score += 15;
    else score -= 20;
    if (breed.size === 'pequeno' || breed.size === 'médio') score += 10;
    if (breed.size === 'gigante') score -= 25;
  } else {
    if (req.hasBackyard && (breed.size === 'grande' || breed.size === 'gigante')) score += 10;
  }

  if (req.freeTimePerDay === 'low') {
    if (breed.energyLevel === 'baixo' || breed.energyLevel === 'moderado') score += 15;
    if (breed.energyLevel === 'muito alto') score -= 25;
  } else if (req.freeTimePerDay === 'high') {
    if (breed.energyLevel === 'alto' || breed.energyLevel === 'muito alto') score += 10;
  }

  if (!req.canWalkDaily) {
    if (breed.energyLevel === 'alto' || breed.energyLevel === 'muito alto') score -= 30;
    if (breed.energyLevel === 'baixo') score += 15;
  }

  if (req.hasChildren && breed.goodWithChildren) score += 20;
  if (req.hasChildren && !breed.goodWithChildren) score -= 15;

  if (req.experienceLevel === 'none') {
    if (breed.energyLevel === 'muito alto') score -= 20;
    if (breed.energyLevel === 'baixo' || breed.energyLevel === 'moderado') score += 10;
  }

  if (req.preferredSize !== 'any' && breed.size === req.preferredSize) score += 20;

  if (req.likesActivePets && (breed.energyLevel === 'alto' || breed.energyLevel === 'muito alto')) {
    score += 10;
  }
  if (!req.likesActivePets && breed.energyLevel === 'baixo') score += 10;

  return score;
}

function normalizeScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function compatibilityLabel(score: number): string {
  if (score >= 85) return 'Alta compatibilidade';
  if (score >= 70) return 'Boa compatibilidade';
  if (score >= 55) return 'Compatível com atenção';
  return 'Exige muito cuidado';
}

function energyLabel(energy: AnimalBreed['energyLevel']): string {
  if (energy === 'baixo') return 'baixa';
  if (energy === 'moderado') return 'moderada';
  return energy;
}

function buildReason(breed: AnimalBreed, req: AdoptionMatchRequest): string {
  const parts: string[] = [];
  if (req.hasChildren && breed.goodWithChildren) parts.push('Boa convivência com crianças');
  if (req.housing === 'apartment' && breed.apartmentFriendly) parts.push('Adaptável a apartamento');
  if (req.preferredSize !== 'any' && breed.size === req.preferredSize) parts.push(`Porte ${breed.size} dentro da preferência`);
  if (breed.energyLevel === 'baixo' || breed.energyLevel === 'moderado') {
    parts.push(`Energia ${energyLabel(breed.energyLevel)}, adequada ao seu perfil`);
  } else {
    parts.push(`Porte ${breed.size}, energia ${breed.energyLevel}`);
  }
  return parts.join('. ') + '.';
}

function buildAttentionPoints(breed: AnimalBreed, req: AdoptionMatchRequest): string[] {
  const points: string[] = [];

  if (req.housing === 'apartment' && !breed.apartmentFriendly) {
    points.push('Pode exigir mais espaço ou adaptação cuidadosa em apartamento.');
  }
  if (!req.canWalkDaily && (breed.energyLevel === 'alto' || breed.energyLevel === 'muito alto')) {
    points.push('Energia alta pede passeios e estímulos diários.');
  }
  if (req.freeTimePerDay === 'low' && (breed.energyLevel === 'alto' || breed.energyLevel === 'muito alto')) {
    points.push('Pouco tempo livre pode gerar frustração e comportamento indesejado.');
  }
  if (req.hasChildren && !breed.goodWithChildren) {
    points.push('Convivência com crianças deve ser avaliada com orientação e supervisão.');
  }
  if (req.experienceLevel === 'none' && breed.energyLevel === 'muito alto') {
    points.push('Tutor iniciante pode precisar de apoio profissional para manejo e treinamento.');
  }
  if (points.length === 0) {
    points.push('Ainda assim, confirme rotina, custos e temperamento individual antes da decisão.');
  }

  return points;
}

function buildProfile(req: AdoptionMatchRequest): string {
  const housing = req.housing === 'apartment' ? 'apartamento' : 'casa';
  const exp =
    req.experienceLevel === 'none'
      ? 'iniciante'
      : req.experienceLevel === 'some'
        ? 'com alguma experiência'
        : 'experiente';
  return `Tutor ${exp} em ${housing}${req.hasChildren ? ' com crianças' : ''}`;
}

function buildAlerts(req: AdoptionMatchRequest): string[] {
  const alerts: string[] = [];

  if (req.experienceLevel === 'none') {
    alerts.push('Como tutor iniciante, invista tempo em treinamento básico e socialização.');
  }
  if (req.housing === 'apartment' && !req.canWalkDaily) {
    alerts.push('Cães precisam de passeios diários, mesmo em apartamento.');
  }
  if (req.freeTimePerDay === 'low') {
    alerts.push('Pouco tempo livre exige raças de energia moderada e rotina organizada.');
  }
  if (!req.hasBackyard && req.housing === 'house') {
    alerts.push('Sem quintal, garanta passeios e estímulos mentais diários.');
  }
  alerts.push('Considere custos com ração, veterinário, vacinas e emergências.');
  alerts.push('Visite a raça escolhida antes de decidir — cada animal é único.');

  return alerts;
}

export class AdoptionService {
  async match(input: AdoptionMatchRequest): Promise<AdoptionMatchResult> {
    const req = matchRequestSchema.parse(input);
    const breeds = await animalRepository.findDogs({});

    const scored = breeds
      .map((breed) => ({ breed, score: normalizeScore(scoreBreed(breed, req)) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (scored.length === 0) {
      throw new ApiError(404, 'NO_BREEDS', 'Nenhuma raça disponível para recomendação');
    }

    return {
      profile: buildProfile(req),
      recommendedBreeds: scored.map(({ breed, score }) => ({
        name: breed.name,
        slug: breed.slug,
        imageUrl: breed.imageUrl,
        imageAlt: breed.imageAlt,
        compatibilityScore: score,
        compatibilityLabel: compatibilityLabel(score),
        reason: buildReason(breed, req),
        attentionPoints: buildAttentionPoints(breed, req),
      })),
      responsibilityAlerts: buildAlerts(req),
      antiAbandonmentMessage: ANTI_ABANDONMENT,
    };
  }
}

export const adoptionService = new AdoptionService();
