import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { adminService } from './admin.service';

const loginSchema = z.object({
  password: z.string().min(1, 'Senha obrigatória'),
});

export class AdminController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { password } = loginSchema.parse(req.body);
      const session = adminService.login(password);
      res.json(session);
    } catch (err) {
      next(err);
    }
  }
}

export const adminController = new AdminController();
