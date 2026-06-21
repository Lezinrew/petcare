# PetCare Responsável

> Conheça melhor. Cuide melhor. Abandone menos.

MVP educativo para tutores de pets conhecerem raças, organizarem cuidados e simularem adoção responsável.

## Objetivo

Reduzir abandono causado por falta de informação, escolha inadequada do animal ou ausência de planejamento. O app transforma informação em cuidado prático.

## Stack

- **Backend:** Node.js, Express, TypeScript, Mongoose, MongoDB
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, React Router
- **Infra:** Docker Compose (MongoDB), PWA básico

## Arquitetura

```
Browser / PWA → React (5173) → REST API (3333) → MongoDB (27017)
```

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm

## Como rodar

### Windows 11 (PowerShell)

Abra o **PowerShell** na pasta do projeto (`petcare`) e rode **um comando por linha**:

```powershell
cd C:\Users\lezin\Downloads\project\petcare
docker compose up -d
npm run setup
npm run reset
npm run dev
```

Em **outro** terminal PowerShell (com `npm run dev` rodando):

```powershell
npm run check:api
```

Testar a API:

```powershell
curl.exe http://localhost:3333/api/health
```

> **Dica:** No PowerShell, `curl` às vezes é alias de `Invoke-WebRequest`. Use `curl.exe` ou abra http://localhost:3333/api/health no navegador.

Antes de tudo: **Docker Desktop aberto** (ícone na bandeja, engine running).

### Linux / macOS

```bash
docker compose up -d
npm run setup
npm run reset
npm run dev
```

O comando `npm run setup` instala dependências (raiz, API e Web) e cria os arquivos `.env` se ainda não existirem.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run setup` | Instala tudo e configura `.env` |
| `npm run reset` | Repopula **88** animais no MongoDB |
| `npm run check:api` | Valida todos os endpoints (API rodando) |
| `npm run validate` | Alias de `check:api` |
| `npm run check:pet-images` | Lista imagens `.webp` encontradas/faltantes |
| `npm run check` | Lint + build |
| `npm run dev` | API + Web em paralelo |
| `npm run seed` | Popula banco (mesmo que reset) |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint em API e Web |
| `npm run generate:pets-html` | Gera HTML estático das **88** fichas (recomendado) |
| `npm run generate:dogs-html` | Gera só cães em `generated/dogs/` (legado) |

## Catálogo — 88 animais

| Espécie | Qtd | Rota web | API |
|---------|-----|----------|-----|
| Cães | 30 | `/dogs` | `/api/animals/dogs` |
| Gatos | 20 | `/cats` | `/api/animals/cats` |
| Peixes | 10 | `/fish` | `/api/animals/fish` |
| Hamsters | 5 | `/hamsters` | `/api/animals/hamsters` |
| Aves | 15 | `/birds` | `/api/animals/birds` |
| Coelhos | 8 | `/rabbits` | `/api/animals/rabbits` |
| **Total** | **88** | `/explore` | — |

## Imagens por espécie

Coloque arquivos `.webp` em:

```txt
apps/web/public/images/dogs/labrador-retriever.webp
apps/web/public/images/cats/persa.webp
apps/web/public/images/fish/betta.webp
...
```

Padrão: `/images/{speciesPlural}/{slug}.webp` — fallback com emoji se ausente.

```powershell
npm run check:pet-images
```

## HTML estático

```powershell
npm run generate:pets-html
```

- Índice geral: http://localhost:5173/generated/pets/index.html
- Por espécie: http://localhost:5173/generated/pets/cats/persa.html
- Legado cães: http://localhost:5173/generated/dogs/index.html

## URLs

| Serviço | URL |
|---------|-----|
| API Health | http://localhost:3333/api/health |
| Web | http://localhost:5173 |

## Funcionalidades

- Home institucional educativa
- **Explorar Pets** (`/explore`) — 6 categorias, 88 fichas
- Catálogo por espécie com busca e filtros
- Ficha educativa por raça/espécie
- Cadastro de pets (demo user)
- Lembretes de cuidado
- Simulador de adoção responsável (cães)
- Exportação HTML estática e PWA instalável

## Estrutura

```
petcare-responsavel/
├── apps/api/     # Backend Express
├── apps/web/     # Frontend React
├── docs/         # Documentação
└── docker-compose.yml
```

## Roadmap

Ver `docs/ROADMAP.md` para fases futuras (login, push, Capacitor, etc.).

## Aviso educativo

Este app oferece informações educativas e **não substitui orientação veterinária**. Consulte sempre um profissional para decisões de saúde do seu pet.

## Documentação

Consulte a pasta `docs/` para contexto, especificação, API, modelo de dados e runbook.
