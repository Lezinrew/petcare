import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { env } from '../config/env';

export const requestLogger = env.isDevelopment
  ? morgan('dev')
  : (_req: Request, _res: Response, next: NextFunction) => next();
