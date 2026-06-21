import { Request, Response, NextFunction } from 'express';
import { SpeciesRouteKey } from '../../data/allBreeds';
import { animalService } from './animal.service';
import { BreedFilters } from './animal.types';

function parseFilters(req: Request): BreedFilters {
  return {
    search: req.query.search as string | undefined,
    size: req.query.size as BreedFilters['size'],
    energyLevel: req.query.energyLevel as BreedFilters['energyLevel'],
    apartmentFriendly:
      req.query.apartmentFriendly !== undefined
        ? req.query.apartmentFriendly === 'true'
        : undefined,
  };
}

export class AnimalController {
  async listByRoute(routeKey: SpeciesRouteKey, req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const breeds = await animalService.listByRoute(routeKey, parseFilters(req));
      res.json(breeds);
    } catch (err) {
      next(err);
    }
  }

  async getByRoute(routeKey: SpeciesRouteKey, req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const breed = await animalService.getByRoute(routeKey, String(req.params.slug));
      res.json(breed);
    } catch (err) {
      next(err);
    }
  }

  async listDogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    return this.listByRoute('dogs', req, res, next);
  }

  async getDogBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    return this.getByRoute('dogs', req, res, next);
  }

  async seedAnimals(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { count } = await animalService.seedAnimals();
      res.json({ message: 'Seed concluído', count });
    } catch (err) {
      next(err);
    }
  }
}

export const animalController = new AnimalController();
