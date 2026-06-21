import mongoose from 'mongoose';
import { env } from '../config/env';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.mongodbUri);
  console.log('[db] MongoDB conectado');
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
