import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Fecha o banner LGPD quando visível, para não bloquear cliques nos testes E2E. */
export async function dismissPrivacyConsentIfVisible(page) {
  const consentBanner = page.getByRole('dialog', { name: /Privacidade e métricas/i });
  if (await consentBanner.isVisible().catch(() => false)) {
    await page.getByRole('button', { name: 'Recusar' }).click();
  }
}

export function readAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;

  const envPath = resolve(process.cwd(), 'apps/api/.env');
  if (!existsSync(envPath)) {
    throw new Error('ADMIN_PASSWORD não encontrada (defina env ou apps/api/.env)');
  }

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.trim().match(/^ADMIN_PASSWORD=(.*)$/);
    if (match) {
      const value = match[1].trim().replace(/^['"]|['"]$/g, '');
      if (value) return value;
    }
  }

  throw new Error('ADMIN_PASSWORD vazia em apps/api/.env');
}
