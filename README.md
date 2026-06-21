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
npm run validate
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
| `npm run reset` | Repopula 30 raças no MongoDB |
| `npm run validate` | Testa endpoints principais (API deve estar rodando) |
| `npm run check` | Lint + build |
| `npm run dev` | API + Web em paralelo |
| `npm run seed` | Popula 30 raças de cães |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint em API e Web |
| `npm run generate:dogs-html` | Gera 30 fichas HTML estáticas + índice |

## HTML estático das raças

Fichas educativas offline em `apps/web/public/generated/dogs/` — úteis para compartilhar, imprimir ou abrir sem depender da API.

```powershell
npm run generate:dogs-html
```

Depois de `npm run dev`:

- Catálogo: http://localhost:5173/generated/dogs/index.html
- Exemplo: http://localhost:5173/generated/dogs/labrador-retriever.html

No app React, use **Ver catálogo HTML** (`/dogs`) ou **Abrir versão HTML** (detalhe da raça).

## URLs

| Serviço | URL |
|---------|-----|
| API Health | http://localhost:3333/api/health |
| Web | http://localhost:5173 |

## Funcionalidades

- Home institucional educativa
- Catálogo de 30 raças de cães com busca e filtros
- Ficha educativa por raça
- Cadastro de pets (demo user)
- Lembretes de cuidado
- Simulador de adoção responsável
- PWA instalável

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
