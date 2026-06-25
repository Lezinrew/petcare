import { Request, Response, NextFunction } from 'express';
import { validateAdminToken } from '../modules/admin/admin.token';
import { ApiError } from '../utils/apiError';

export function requireAdminAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new ApiError(401, 'ADMIN_UNAUTHORIZED', 'Acesso administrativo negado'));
    return;
  }

  try {
    validateAdminToken(header.slice(7));
    next();
  } catch (err) {
    next(err);
  }
}
