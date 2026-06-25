import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function run(label, cwd) {
  const rel = path.relative(root, cwd) || '.';
  console.log(`\n📦 ${label} (${rel})...`);
  execSync('npm install', { cwd, stdio: 'inherit' });
}

function copyEnvIfMissing(exampleRel, envRel) {
  const example = path.join(root, exampleRel);
  const env = path.join(root, envRel);

  if (!fs.existsSync(example)) {
    console.warn(`⚠️  Arquivo exemplo não encontrado: ${exampleRel}`);
    return;
  }

  if (fs.existsSync(env)) {
    console.log(`⏭️  ${envRel} já existe — mantido`);
    return;
  }

  fs.copyFileSync(example, env);
  console.log(`✅ Criado ${envRel}`);
}

console.log('🐾 PetCare Responsável — Setup\n');

run('Dependências da raiz', root);
run('Dependências da API', path.join(root, 'apps/api'));
run('Dependências do Web', path.join(root, 'apps/web'));

console.log('\n📄 Configurando variáveis de ambiente...');
copyEnvIfMissing('apps/api/.env.example', 'apps/api/.env');
copyEnvIfMissing('apps/web/.env.example', 'apps/web/.env');

console.log('\n🎭 Instalando Playwright Chromium...');
execSync('npx playwright install chromium', { cwd: root, stdio: 'inherit' });

console.log(`
✨ Setup concluído!

Próximos passos:
  1. docker compose up -d
  2. npm run reset
  3. npm run dev

Validação rápida (com API e Web rodando):
  npm run validate
  npm run check:playwright
`);
