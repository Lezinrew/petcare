# Prompt Antigravity — imagens da página de cães

Use este prompt no Antigravity para gerar ou substituir as imagens reais usadas no catálogo e nas fichas de cães.

## Prompt

Você está trabalhando no repositório PetCare Responsável. Crie imagens educativas, realistas e consistentes para a página de cães do app.

Objetivo: gerar 30 imagens `.webp`, uma para cada raça, usadas em `/dogs`, `/dogs/:slug` e no simulador de adoção responsável. As imagens devem parecer fotos reais de catálogo educativo, não ilustrações, não arte 3D e não avatar.

Direção visual:
- Foto realista, clara, nítida e acolhedora.
- Animal inteiro ou busto bem reconhecível, com a raça facilmente identificável.
- Fundo simples, natural ou doméstico, sem poluição visual.
- Luz suave de dia, cores naturais, sem filtros dramáticos.
- Sem texto, logos, marcas, coleiras com marca visível, pessoas em destaque ou objetos chamativos.
- Não exagerar traços físicos da raça.
- Evitar imagens que pareçam anúncio de venda de animais.
- Manter enquadramento consistente para cards responsivos: formato quadrado 1:1, 900x900 px ou maior antes da conversão.
- Exportar em `.webp`, qualidade alta, com menos de 500 KB quando possível.

Salvar exatamente nestes caminhos:

```text
apps/web/public/images/dogs/labrador-retriever.webp
apps/web/public/images/dogs/shih-tzu.webp
apps/web/public/images/dogs/golden-retriever.webp
apps/web/public/images/dogs/pastor-alemao.webp
apps/web/public/images/dogs/pug.webp
apps/web/public/images/dogs/border-collie.webp
apps/web/public/images/dogs/pit-bull.webp
apps/web/public/images/dogs/beagle.webp
apps/web/public/images/dogs/bichon-frise.webp
apps/web/public/images/dogs/boston-terrier.webp
apps/web/public/images/dogs/boxer.webp
apps/web/public/images/dogs/bulldog.webp
apps/web/public/images/dogs/bulldog-ingles.webp
apps/web/public/images/dogs/bully.webp
apps/web/public/images/dogs/cane-corso.webp
apps/web/public/images/dogs/chihuahua.webp
apps/web/public/images/dogs/cocker-spaniel.webp
apps/web/public/images/dogs/dachshund.webp
apps/web/public/images/dogs/doberman.webp
apps/web/public/images/dogs/husky-siberiano.webp
apps/web/public/images/dogs/lhasa-apso.webp
apps/web/public/images/dogs/maltes.webp
apps/web/public/images/dogs/pinscher.webp
apps/web/public/images/dogs/poodle.webp
apps/web/public/images/dogs/rottweiler.webp
apps/web/public/images/dogs/schnauzer.webp
apps/web/public/images/dogs/spitz-alemao.webp
apps/web/public/images/dogs/vira-lata.webp
apps/web/public/images/dogs/west-highland-white-terrier.webp
apps/web/public/images/dogs/yorkshire.webp
```

Depois de salvar as imagens, atualize `apps/api/src/data/imageAttributions.json` para todos os slugs acima usando este padrão:

```json
{
  "credit": "Imagem gerada por IA para o PetCare Responsável",
  "source": "Antigravity image generation",
  "license": "Uso interno do projeto"
}
```

Remova `fileUrl` desses 30 registros se a imagem foi substituída por imagem gerada no Antigravity, porque ela não veio de Wikipedia/Wikimedia.

Valide:

```powershell
npm run check:pet-images
npm run build
```

Critério de aceite:
- `npm run check:pet-images` mostra 30 imagens encontradas em `dogs`.
- A página `/dogs` usa as novas imagens sem cair no placeholder.
- As fichas `/dogs/labrador-retriever`, `/dogs/shih-tzu` e `/dogs/golden-retriever` exibem crédito como imagem gerada no Antigravity.
- Nenhum `coverImage` de espécie em `apps/web/src/config/species.ts` deve apontar para avatar; os cães continuam usando foto real em `/images/dogs/golden-retriever.webp`.

