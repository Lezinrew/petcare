import { Request, Response, NextFunction } from 'express';
import { animalService } from './animal.service';
import { DogFilters } from './animal.types';

export class AnimalController {
  async listDogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: DogFilters = {
        search: req.query.search as string | undefined,
        size: req.query.size as DogFilters['size'],
        energyLevel: req.query.energyLevel as DogFilters['energyLevel'],
        apartmentFriendly:
          req.query.apartmentFriendly !== undefined
            ? req.query.apartmentFriendly === 'true'
            : undefined,
      };
      const breeds = await animalService.listDogs(filters);
      res.json(breeds);
    } catch (err) {
      next(err);
    }
  }

  async getDogBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const breed = await animalService.getDogBySlug(String(req.params.slug));
      res.json(breed);
    } catch (err) {
      next(err);
    }
  }

  async seedDogs(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { count } = await animalService.seedDogs();
      res.json({ message: 'Seed concluído', count });
    } catch (err) {
      next(err);
    }
  }
}

export const animalController = new AnimalController();
