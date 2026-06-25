# Runbook — PetCare Responsável

## Escopo deste runbook

Este runbook cobre o MVP local e registra a estratégia futura de crescimento, afiliados e IA. A tarefa operacional atual continua sendo rodar e validar o app; a nova direção estratégica não exige cloud, marketplace, checkout ou serviços pagos obrigatórios no MVP.

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

Verificação contínua do console do navegador (com `npm run dev` rodando):

```powershell
npm run setup:browser-console   # primeira vez
npm run watch:browser-console
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

## Validar métricas e admin

Com API e Web rodando:

1. Abra `http://localhost:5173/admin` (não há link na navegação).
2. Informe a senha de `ADMIN_PASSWORD` em `apps/api/.env`.
3. Confira total de visualizações, ranking e engajamento.

**Importante:** após alterar `apps/api/.env`, reinicie a API (`npm run dev:api`). O arquivo é carregado pelo caminho fixo `apps/api/.env`, independente de onde você iniciou o comando.

### Proteção administrativa (produção)

No `apps/api/.env`:

```env
ADMIN_PASSWORD=senha-forte-aqui
ADMIN_SESSION_SECRET=chave-secreta-distinta
```

- Com `ADMIN_PASSWORD` em `apps/api/.env`, `/admin` pede senha e `GET /api/analytics/summary` exige token Bearer
- A rota `/admin` não aparece na navegação — acesse digitando a URL
- `npm run validate` lê `ADMIN_PASSWORD` de `apps/api/.env` automaticamente

Endpoints úteis:

```bash
curl -X POST http://localhost:3333/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"sua-senha"}'

curl http://localhost:3333/api/analytics/summary \
  -H "Authorization: Bearer SEU_TOKEN"
```

O tracking é local e não exige login de tutor no MVP.

## Validar console do browser (Playwright)

Com API e Web rodando (`npm run dev`):

```bash
npm run setup:browser-console   # só se Chromium ainda não instalado (também roda no npm run setup)
npm run check:browser-console   # erros de console em rotas principais
npm run check:admin-login       # login em /admin com senha do apps/api/.env
npm run check:playwright        # os dois acima em sequência
```

O `check:browser-console` abre rotas no Chromium e falha se encontrar `console.error`, exceções ou HTTP inválido. O banner LGPD é fechado automaticamente nos testes.

O `check:admin-login` valida o fluxo completo: `/admin` → senha → métricas.

Para repetir automaticamente enquanto corrige erros:

```bash
npm run watch:browser-console
```

Opções úteis:

```bash
npm run check:browser-console -- --url=http://localhost:5173
npm run check:browser-console -- --routes=/,/explore,/dogs/labrador-retriever
npm run watch:browser-console -- --interval=5000
```

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

Para substituir as imagens da página de cães por imagens geradas no Antigravity, use `docs/ANTIGRAVITY_DOG_IMAGES_PROMPT.md`. Depois da geração, confirme que os 30 registros de cães em `imageAttributions.json` usam `source: "Antigravity image generation"` e não mantêm `fileUrl` de Wikipedia/Wikimedia.

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

## Operação estratégica futura

### Blog SEO

Antes de publicar conteúdo novo:

1. Confirmar intenção de busca e espécie/tema.
2. Verificar se existe ficha relacionada no catálogo.
3. Interlinkar artigo, ficha e ferramenta útil.
4. Incluir aviso veterinário quando o tema envolver saúde.
5. Incluir disclosure quando houver recomendação afiliada.

### Afiliados

Fluxo permitido:

```text
Usuário -> Conteúdo -> Produto recomendado -> Loja parceira
```

Não criar checkout próprio, carrinho, marketplace, contato entre usuários ou venda direta. A loja parceira é responsável por preço, estoque, entrega, pagamento e suporte.

### AI Content Intelligence Engine

Execução planejada para fase futura e preferencialmente local:

1. Buscar vídeos virais com YouTube Data API.
2. Extrair metadados.
3. Baixar áudio apenas quando permitido.
4. Transcrever com Whisper.
5. Organizar dados com Pandas.
6. Orquestrar análise com LangChain.
7. Gerar insights com LLM local.
8. Revisar pautas antes de publicar.

Hardware alvo: RTX 4070 ou superior. Prioridade de modelos: Llama, Qwen e DeepSeek.

Cloud não é necessária no início. Avaliar VPS, AWS, Azure ou Google Cloud apenas quando houver tráfego real, necessidade de processamento recorrente ou receita validada.

### Deploy via GitHub Actions (VPS)

O workflow `.github/workflows/deploy.yml` roda validações em PRs e publica/deploya em `main`:

1. `ci`: instala dependências, roda `npm run lint`, `npm run build` e `npm run check:pet-images`
2. `docker`: em `push` para `main` ou execução manual, cria a imagem com `Dockerfile` e publica no GHCR
3. `deploy`: em `main`, atualiza a VPS via SSH usando `deploy/docker-compose.prod.yml`, sobe MongoDB interno, executa o seed do catálogo e publica o app em `127.0.0.1:3000`/`127.0.0.1:3333` para o Nginx

Também é possível iniciar manualmente pelo GitHub Actions (`workflow_dispatch`) e escolher se o deploy deve rodar depois da publicação da imagem.

Secret opcional no repositório: `MONGODB_URI` (padrão na VPS: `mongodb://mongo:27017/petcare`, usando o MongoDB interno do compose de produção).

Secrets obrigatórios em **Settings → Secrets and variables → Actions**:

| Secret | Conteúdo |
|--------|----------|
| `HOSTINGER_SSH_HOST` | IP ou hostname da VPS |
| `HOSTINGER_SSH_USER` | Usuário SSH (ex.: `root`) |
| `HOSTINGER_SSH_KEY` | Chave privada OpenSSH **inteira**, com `-----BEGIN ... KEY-----` e quebras de linha, ou o mesmo conteúdo em base64 |

O erro `HOSTINGER_SSH_KEY inválida` significa que o secret recebeu a chave pública `.pub`, uma senha, uma chave truncada ou perdeu as quebras de linha.

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
