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

Esperado: `132 animais inseridos`. Também disponível: `npm run seed` (mesmo efeito, saída mais técnica).

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

Ou diretamente: `npm run seed`. Ambos limpam a coleção `animals` e reinserem **132** animais.

## Validar API

Com a API rodando (`npm run dev:api` ou `npm run dev`):

```bash
npm run check:api
```

Valida health, 13 grupos, total 132 e detalhes representativos por espécie.

Placeholders SVG: `apps/web/public/images/placeholders/{dog,cat,fish,hamster,bird,rabbit,turtle,twister,guinea_pig,chinchilla,gerbil,ferret,lizard}.svg`

Fotos reais (Wikipedia / Wikimedia Commons):

```bash
npm run download:pet-images
npm run download:pet-images -- --retry-failed   # só faltantes
```

Créditos: `apps/api/src/data/imageAttributions.json`

```bash
npm run check:pet-images
```

Avatares de navegação:

```bash
npm --prefix apps/web run convert:avatars
```

Converte os PNGs fonte em `apps/web/public/avatars/pets/` para WebP 512x512. Use os `.webp` na interface; mantenha os `.png` como fonte/original.

## Demo / pitch

http://localhost:5173/demo — roteiro em `docs/DEMO_SCRIPT.md`

## HTML estático legado (todas espécies)

```bash
npm run generate:pets-html
```

Saída: `apps/web/public/generated/pets/`. As fichas React são a experiência principal; use esta saída apenas para distribuição offline ou compatibilidade. Legado cães: `npm run generate:dogs-html`.

## Demo rápida

Ver `docs/DEMO.md` — roteiro de ~5 min para apresentação.

## Build de produção

```bash
npm run build
```

### Deploy via GitHub Actions (VPS)

Push na branch `main` dispara `.github/workflows/deploy.yml`:

1. Build da imagem com `Dockerfile` (API + frontend estático na porta `3000`)
2. Push para `ghcr.io/lezinrew/petcare:latest`
3. Deploy na VPS via SSH com `deploy/docker-compose.prod.yml`

Secret opcional no repositório: `MONGODB_URI` (padrão na VPS: `mongodb://172.17.0.1:27017/petcare`).

Secrets obrigatórios em **Settings → Secrets and variables → Actions**:

| Secret | Conteúdo |
|--------|----------|
| `HOSTINGER_SSH_HOST` | IP ou hostname da VPS |
| `HOSTINGER_SSH_USER` | Usuário SSH (ex.: `root`) |
| `HOSTINGER_SSH_KEY` | Chave privada OpenSSH **inteira**, com `-----BEGIN ... KEY-----` e quebras de linha |

A chave pública correspondente deve estar em `~/.ssh/authorized_keys` na VPS.

Para gerar um par dedicado ao CI:

```bash
ssh-keygen -t ed25519 -C "github-actions-petcare" -f petcare-deploy -N ""
cat petcare-deploy.pub >> ~/.ssh/authorized_keys   # na VPS
# Cole o conteúdo de petcare-deploy (privada) em HOSTINGER_SSH_KEY
```

Se o GitHub remover quebras de linha ao colar, salve a chave em base64 e use esse valor no secret (o workflow tenta decodificar automaticamente).

Em produção atrás de proxy reverso local (desenvolvimento na VPS), configure a API para escutar apenas no loopback:

```env
NODE_ENV=production
HOST=127.0.0.1
PORT=3333
MONGODB_URI=mongodb://127.0.0.1:27017/petcare
CORS_ORIGIN=https://petcaretutor.com
```

Assim apenas o Nginx acessa a API localmente; a porta da aplicação não precisa ficar exposta na internet.

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

## Gerar HTML legado das fichas

```powershell
npm run generate:pets-html
```

Gera 132+ arquivos em `apps/web/public/generated/pets/` + índices por espécie. Esse fluxo é opcional e não aparece como CTA no app.

Legado (só cães):

```powershell
npm run generate:dogs-html
```

Abrir com o app rodando:

- http://localhost:5173/generated/pets/index.html
- http://localhost:5173/generated/pets/cats/persa.html

Regenerar após alterar dados em `apps/api/src/data/`.
