import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  host: process.env.HOST ?? '0.0.0.0',
  port: Number(process.env.PORT ?? 3333),
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/petcare',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  demoUserId: process.env.DEMO_USER_ID ?? 'demo-user',
  isDevelopment: (process.env.NODE_ENV ?? 'development') === 'development',
};
