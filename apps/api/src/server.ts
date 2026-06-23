import app from './app';
import { env } from './config/env';
import { connectDatabase } from './database/connection';
import { ensureIndexes } from './database/indexes';

async function bootstrap(): Promise<void> {
  await connectDatabase();
  await ensureIndexes();

  app.listen(env.port, env.host, () => {
    console.log(`[api] Rodando em http://${env.host}:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('[api] Falha ao iniciar:', err);
  process.exit(1);
});
