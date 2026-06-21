import { Request, Response, NextFunction } from 'express';
import { petService } from './pet.service';

export class PetController {
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pets = await petService.list();
      res.json(pets);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.getById(String(req.params.id));
      res.json(pet);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.create(req.body);
      res.status(201).json(pet);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.update(String(req.params.id), req.body);
      res.json(pet);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await petService.delete(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const petController = new PetController();
