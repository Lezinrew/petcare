# Decisões Técnicas — PetCare Responsável

## Monorepo simples

**Decisão:** Estrutura monorepo com `apps/api` e `apps/web` na raiz, scripts centralizados via `npm-run-all`.

**Motivo:** Facilita desenvolvimento local com um único `npm run dev`, mantendo backend e frontend separados sem tooling pesado (sem Nx/Turborepo no MVP).

## PWA no MVP

**Decisão:** PWA básico com manifest + service worker manual (sem Workbox).

**Motivo:** Permite instalação no celular sem app nativo. Capacitor fica para fase 4.

## REST API

**Decisão:** API REST com Express, sem GraphQL ou tRPC.

**Motivo:** Simplicidade, familiaridade e documentação clara para evolução futura.

## MongoDB

**Decisão:** MongoDB via Docker Compose.

**Motivo:** Schema flexível para fichas de raças com estrutura aninhada (`care`). Adequado para MVP sem migrations complexas.

## Sem autenticação real

**Decisão:** Usar `DEMO_USER_ID` fixo no `.env` para pets e lembretes.

**Motivo:** MVP foca em provar valor educativo. Login real entra na fase 2.

## DEMO_USER_ID

**Decisão:** Variável `DEMO_USER_ID=demo-user` filtra pets/lembretes por usuário simulado.

**Motivo:** Prepara estrutura multi-usuário sem implementar auth completa.

## Perfil do tutor no MVP

**Decisão:** Coleção `tutorprofiles` com upsert por `userId`, tela `/profile` e seed no `npm run reset` — sem login real.

**Motivo:** Contextualiza pets, lembretes e adoção responsável no modo demo; a migração futura reutiliza o mesmo `userId` quando a autenticação entrar.

## Mongoose vs MongoDB Driver

**Decisão:** **Mongoose** para models, schemas e validação.

**Motivo:** Simplifica definição de schemas aninhados (ficha `care` da raça), timestamps automáticos e queries. O driver oficial seria mais verboso para o mesmo resultado no MVP.

## Seed em development only

**Decisão:** `POST /api/animals/seed` e script `npm run seed` só em `NODE_ENV=development`.

**Motivo:** Evita repopular ou limpar dados em produção acidentalmente.

## Service Worker com versão no cache

**Decisão:** Cache nomeado `petcare-v1` com lista estática de assets.

**Motivo:** Permite invalidar cache incrementando versão. Estratégia simples, sem stale-while-revalidate complexo.

## Scripts de hardening (rodada 2)

**Decisão:** Scripts Node em `scripts/` (`setup.mjs`, `reset.mjs`, `validate-api.mjs`).

**Motivo:** Reduz fricção no Windows/Linux sem depender de shell scripts separados. `setup` centraliza install + `.env`; `validate` cobre smoke test da API; `reset` encapsula seed com mensagens claras.

## Verificação automatizada do console do navegador

**Decisão:** Usar Playwright como dependência de desenvolvimento para abrir rotas representativas e capturar `console.error` e exceções de página via `scripts/check-browser-console.mjs`.

**Motivo:** Erros do console do browser não aparecem de forma confiável no build, lint ou validação da API. O script elimina o ciclo manual de copiar mensagens do DevTools e oferece modo contínuo (`npm run watch:browser-console`) durante correções locais.

## ESLint da API em CommonJS

**Decisão:** `eslint.config.cjs` em vez de `.js` ESM na API.

**Motivo:** API compila para CommonJS (`tsc`). Manter `"type": "module"` no `package.json` da API quebraria o runtime. Config CJS elimina aviso do ESLint sem alterar o build.

## Dados compartilhados das raças

**Decisão:** Fonte única em `apps/api/src/data/` — `dogBreeds.ts` (30, dados ricos) + arquivos por espécie via `breedFactory.ts` + agregador `allBreeds.ts`.

**Motivo:** Seed MongoDB e gerador de HTML legado consomem os mesmos registros. Total: **132** animais em 13 grupos.

## Imagens e placeholders

**Decisão:** `.webp` em `/images/{speciesPlural}/{slug}.webp`; fallback SVG em `/images/placeholders/{species}.svg`; componente `AnimalImage` com cascade até emoji.

**Motivo:** Piloto apresentável sem upload; `check:pet-images.js` reporta faltantes sem bloquear CI.

## Página `/demo`

**Decisão:** Roteiro de pitch integrado ao app (não slide externo).

**Motivo:** Demo em reunião abre uma URL; ver `docs/DEMO_SCRIPT.md`.

## Gerador de HTML estático legado

**Decisão:** `generate:pets-html` gera fichas para as 132 espécies/raças em `public/generated/pets/`, mas não é mais exposto como CTA no app. `generate:dogs-html` mantido para compatibilidade (`public/generated/dogs/`).

**Motivo:** Após o refinamento visual da ficha React, a experiência principal passou a ser a tela do app. O HTML fica como saída offline/legada, servida pelo Vite com CSS inline e dados importados de `apps/api/src/data/allBreeds.ts`.
