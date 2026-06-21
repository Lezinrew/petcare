# Runbook — PetCare Responsável

## Windows 11 (PowerShell)

Todos os scripts do projeto (`setup`, `reset`, `validate`) são Node.js e funcionam no PowerShell sem WSL.

```powershell
# 1. Ir para a pasta do projeto
cd C:\Users\lezin\Downloads\project\petcare

# 2. Docker Desktop deve estar aberto
docker compose up -d

# 3. Primeira vez — instala deps e cria .env
npm run setup

# 4. Popular banco
npm run reset

# 5. Subir API + Web
npm run dev
```

Validação (segundo terminal):

```powershell
npm run validate
```

Health check:

```powershell
curl.exe http://localhost:3333/api/health
```

Copiar `.env` manualmente (se precisar, sem `setup`):

```powershell
Copy-Item apps\api\.env.example apps\api\.env
Copy-Item apps\web\.env.example apps\web\.env
```

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Docker Desktop (ou Docker + Docker Compose)

## Subir MongoDB

```bash
docker compose up -d
```

Verificar:
```bash
docker ps
# petcare-mongo deve estar running na porta 27017
```

## Instalar e configurar (primeira vez)

```bash
npm run setup
```

Instala dependências da raiz, `apps/api` e `apps/web`, e cria `.env` a partir dos exemplos (sem sobrescrever arquivos existentes).

## Popular banco (seed)

```bash
npm run reset
```

Esperado: `88 animais inseridos` (30 cães, 20 gatos, 10 peixes, 5 hamsters, 15 aves, 8 coelhos). Também disponível: `npm run seed` (mesmo efeito, saída mais técnica).

## Rodar API e Web juntos

```bash
npm run dev
```

## Rodar separadamente

```bash
# Terminal 1 — API
npm run dev:api

# Terminal 2 — Web
npm run dev:web
```

## Health check

```bash
curl http://localhost:3333/api/health
```

## Resetar seed

```bash
npm run reset
```

Ou diretamente: `npm run seed`. Ambos limpam a coleção `animals` e reinserem **88** animais.

## Validar API

Com a API rodando (`npm run dev:api` ou `npm run dev`):

```bash
npm run check:api
```

Valida health, 6 espécies (contagens 30/20/10/5/15/8), total 88, detalhes labrador e persa.

## Imagens

Coloque `.webp` em `apps/web/public/images/{dogs,cats,fish,hamsters,birds,rabbits}/`.

```bash
npm run check:pet-images
```

## HTML estático (todas espécies)

```bash
npm run generate:pets-html
```

Saída: `apps/web/public/generated/pets/`. Legado cães: `npm run generate:dogs-html`.

## Demo rápida

Ver `docs/DEMO.md` — roteiro de ~5 min para apresentação.

## Build de produção

```bash
npm run build
```

## URLs

| Serviço | URL |
|---------|-----|
| API | http://localhost:3333/api |
| Health | http://localhost:3333/api/health |
| Web | http://localhost:5173 |

## Troubleshooting

### Porta ocupada

```bash
# Windows — encontrar processo na porta 3333
netstat -ano | findstr :3333
# Matar processo pelo PID
taskkill /PID <pid> /F
```

### MongoDB fora

```bash
docker compose down
docker compose up -d
docker logs petcare-mongo
```

### CORS

Verifique `CORS_ORIGIN` em `apps/api/.env` — deve ser `http://localhost:5173`.

### Seed falhando

- Confirme MongoDB rodando
- Confirme `MONGODB_URI` correto
- Rode `npm run reset` novamente

### Web não conecta na API

- Confirme API rodando em 3333
- Confirme `VITE_API_URL=http://localhost:3333/api` em `apps/web/.env`
- Reinicie o dev server do Vite após alterar `.env`

### Service worker cacheando versão antiga

1. Abra DevTools → Application → Service Workers
2. Clique "Unregister"
3. Limpe cache em Application → Storage → Clear site data
4. Recarregue a página

Ou incremente `CACHE_VERSION` em `apps/web/public/service-worker.js`.

## Gerar HTML das fichas

```powershell
npm run generate:pets-html
```

Gera 88+ arquivos em `apps/web/public/generated/pets/` + índices por espécie.

Legado (só cães):

```powershell
npm run generate:dogs-html
```

Abrir com o app rodando:

- http://localhost:5173/generated/pets/index.html
- http://localhost:5173/generated/pets/cats/persa.html

Regenerar após alterar dados em `apps/api/src/data/`.
