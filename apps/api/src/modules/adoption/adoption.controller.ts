import { Request, Response, NextFunction } from 'express';
import { adoptionService } from './adoption.service';

export class AdoptionController {
  async match(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await adoptionService.match(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const adoptionController = new AdoptionController();
