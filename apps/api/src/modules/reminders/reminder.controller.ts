import { Request, Response, NextFunction } from 'express';
import { reminderService } from './reminder.service';

export class ReminderController {
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reminders = await reminderService.list();
      res.json(reminders);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reminder = await reminderService.getById(String(req.params.id));
      res.json(reminder);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reminder = await reminderService.create(req.body);
      res.status(201).json(reminder);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reminder = await reminderService.update(String(req.params.id), req.body);
      res.json(reminder);
    } catch (err) {
      next(err);
    }
  }

  async markDone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reminder = await reminderService.markDone(String(req.params.id));
      res.json(reminder);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await reminderService.delete(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const reminderController = new ReminderController();
