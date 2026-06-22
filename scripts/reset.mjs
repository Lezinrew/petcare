import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

console.log('🐾 PetCare Responsável — Reset do banco\n');
console.log('Este comando repopula os 132 animais do catálogo (limpa e reinsere)');
console.log('e garante o perfil demo do tutor.\n');
console.log('Certifique-se de que o MongoDB está rodando:');
console.log('  docker compose up -d\n');

try {
  execSync('npm run seed', { cwd: root, stdio: 'inherit' });
  console.log('\n✅ Reset concluído — banco pronto para uso.');
} catch {
  console.error('\n❌ Reset falhou. Verifique se o MongoDB está ativo (docker compose up -d).');
  process.exit(1);
}
