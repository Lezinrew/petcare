import { Request, Response } from 'express';
import { ApiError } from '../utils/apiError';

export function notFound(_req: Request, _res: Response): void {
  throw new ApiError(404, 'NOT_FOUND', 'Rota não encontrada');
}
