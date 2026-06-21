import cors from 'cors';
import { env } from './env';

export const corsOptions = cors({
  origin: env.corsOrigin,
  credentials: true,
});
