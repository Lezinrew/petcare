import { Request, Response, NextFunction } from 'express';
import { tutorProfileService } from './tutor-profile.service';

export class TutorProfileController {
  async get(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await tutorProfileService.get();
      res.json(profile);
    } catch (err) {
      next(err);
    }
  }

  async upsert(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await tutorProfileService.upsert(req.body);
      res.json(profile);
    } catch (err) {
      next(err);
    }
  }
}

export const tutorProfileController = new TutorProfileController();
