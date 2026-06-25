import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  host: process.env.HOST ?? '0.0.0.0',
  port: Number(process.env.PORT ?? 3333),
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/petcare',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  demoUserId: process.env.DEMO_USER_ID ?? 'demo-user',
  adminPassword: process.env.ADMIN_PASSWORD ?? '',
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET ?? '',
  isDevelopment: (process.env.NODE_ENV ?? 'development') === 'development',
};

export function isAdminProtectionEnabled(): boolean {
  return env.adminPassword.length > 0;
}

export function getAdminSessionSecret(): string {
  if (env.adminSessionSecret) return env.adminSessionSecret;
  if (env.isDevelopment && env.adminPassword) return env.adminPassword;
  return '';
}
