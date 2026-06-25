import { chromium } from 'playwright';
import { dismissPrivacyConsentIfVisible, readAdminPassword } from './playwright-utils.mjs';

const baseUrl = (process.env.URL ?? 'http://localhost:5173').replace(/\/$/, '');
const password = readAdminPassword();

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(`${baseUrl}/admin`, { waitUntil: 'networkidle' });
  await dismissPrivacyConsentIfVisible(page);

  await page.getByRole('heading', { name: 'Acesso administrativo' }).waitFor({ timeout: 10000 });
  await page.getByLabel('Senha').fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();

  await page.getByText('Visitantes únicos').waitFor({ timeout: 10000 });
  await page.getByRole('button', { name: 'Sair' }).waitFor({ timeout: 5000 });

  console.log('✅ Admin login Playwright: formulário → métricas carregadas');
} catch (err) {
  const errorText = await page.locator('text=/inválida|não configurada|Erro/i').first().textContent().catch(() => null);
  console.error('❌ Admin login Playwright falhou');
  if (errorText) console.error(`   Mensagem na tela: ${errorText.trim()}`);
  console.error(`   ${err instanceof Error ? err.message : err}`);
  process.exit(1);
} finally {
  await browser.close();
}
