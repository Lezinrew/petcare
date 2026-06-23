import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const avatarsDir = path.resolve(__dirname, '../public/avatars/pets');

console.log('⚡ PetCare — convert-avatars (PNG -> WebP 512x512)\n');

if (!fs.existsSync(avatarsDir)) {
  console.error(`Erro: Diretório ${avatarsDir} não existe!`);
  process.exit(1);
}

const files = fs.readdirSync(avatarsDir);
const pngFiles = files.filter(file => file.endsWith('.png'));

if (pngFiles.length === 0) {
  console.log('Nenhum arquivo PNG encontrado para converter.');
  process.exit(0);
}

console.log(`Encontrados ${pngFiles.length} arquivos PNG para processamento.\n`);

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function run() {
  let successCount = 0;
  let errorCount = 0;
  let totalPngSize = 0;
  let totalWebpSize = 0;

  for (const pngFile of pngFiles) {
    const inputPath = path.join(avatarsDir, pngFile);
    const outputName = pngFile.replace(/\.png$/, '.webp');
    const outputPath = path.join(avatarsDir, outputName);

    const pngStats = fs.statSync(inputPath);
    totalPngSize += pngStats.size;

    try {
      console.log(`Redimensionando e convertendo: ${pngFile} -> ${outputName}...`);
      
      // Se existir, sharp vai sobrescrever normalmente ao salvar com toFile
      await sharp(inputPath)
        .resize(512, 512, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 82 })
        .toFile(outputPath);

      const webpStats = fs.statSync(outputPath);
      totalWebpSize += webpStats.size;

      successCount++;
    } catch (error) {
      console.error(`Erro ao converter ${pngFile}:`, error);
      errorCount++;
    }
  }

  console.log(`\nConversão concluída!`);
  console.log(`- Arquivos processados: ${successCount}`);
  console.log(`- Falhas: ${errorCount}`);
  console.log(`- Peso Total PNG: ${formatBytes(totalPngSize)} (${totalPngSize} bytes)`);
  console.log(`- Peso Total WebP: ${formatBytes(totalWebpSize)} (${totalWebpSize} bytes)`);
  console.log(`- Redução de peso acumulada: ${((1 - totalWebpSize / totalPngSize) * 100).toFixed(2)}%\n`);
}

run();
