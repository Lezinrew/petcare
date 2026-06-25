# PetCareTutor.com — PetCare Responsável

> Conheça melhor. Cuide melhor. Abandone menos.

Plataforma educacional para tutores de animais conhecerem espécies, organizarem cuidados, consumirem conteúdo responsável e encontrarem produtos recomendados em lojas parceiras.

## Objetivo

Reduzir abandono causado por falta de informação, escolha inadequada do animal ou ausência de planejamento. O produto transforma informação em cuidado prático e cria um caminho de monetização por afiliados sem marketplace, venda direta ou intermediação entre pessoas.

## Pilares do produto

1. **Educação:** fichas, guias e conteúdos que ajudam futuros tutores a entender porte, comportamento, custos, necessidades e cuidados antes de adquirir um animal.
2. **Ferramentas para tutores:** cadastro de pets, perfil do tutor e lembretes de vacinação, alimentação, consultas e medicação.
3. **Monetização por afiliados:** recomendações editoriais de produtos essenciais com saída para lojas parceiras como Petz, Cobasi, Amazon, Mercado Livre e programas de afiliados pet.

Fluxo comercial oficial: **usuário → conteúdo → produto recomendado → loja parceira**. A venda acontece fora do PetCareTutor.com.

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
| `npm run reset` | Repopula **132** animais no MongoDB |
| `npm run check:api` | Valida todos os endpoints (API rodando) |
| `npm run validate` | Alias de `check:api` |
| `npm run check:pet-images` | Verifica `.webp` por espécie (não falha o build) |
| `npm run generate:pet-images` | Gera placeholders `.webp` mínimos |
| `npm run check:frontend-routes` | Smoke test das rotas SPA (Web rodando) |
| `npm run download:pet-images` | Baixa fotos CC/Wikipedia para as 132 fichas |
| `npm run generate:pet-images` | Gera placeholders `.webp` mínimos (sem internet) |
| `npm run check` | Lint + build |
| `npm run dev` | API + Web em paralelo |
| `npm run seed` | Popula banco (mesmo que reset) |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint em API e Web |
| `npm run generate:pets-html` | Gera HTML estático das **132** fichas (legado opcional) |
| `npm run generate:dogs-html` | Gera só cães em `generated/dogs/` (legado) |

## Catálogo — 132 animais

| Espécie | Qtd | Rota web | API |
|---------|-----|----------|-----|
| Cães | 30 | `/dogs` | `/api/animals/dogs` |
| Gatos | 20 | `/cats` | `/api/animals/cats` |
| Peixes | 10 | `/fish` | `/api/animals/fish` |
| Hamsters | 5 | `/hamsters` | `/api/animals/hamsters` |
| Aves | 23 | `/birds` | `/api/animals/birds` |
| Coelhos | 8 | `/rabbits` | `/api/animals/rabbits` |
| Tartarugas | 7 | `/turtles` | `/api/animals/turtles` |
| Twisters | 4 | `/twisters` | `/api/animals/twisters` |
| Porquinhos-da-índia | 6 | `/guinea-pigs` | `/api/animals/guinea-pigs` |
| Chinchilas | 4 | `/chinchillas` | `/api/animals/chinchillas` |
| Gerbis | 4 | `/gerbils` | `/api/animals/gerbils` |
| Furões | 4 | `/ferrets` | `/api/animals/ferrets` |
| Lagartos | 7 | `/lizards` | `/api/animals/lizards` |
| **Total** | **132** | `/explore` | — |

## Imagens por espécie

Coloque arquivos `.webp` em:

```txt
apps/web/public/images/dogs/labrador-retriever.webp
apps/web/public/images/cats/persa.webp
apps/web/public/images/fish/betta.webp
...
```

Padrão: `/images/{speciesPlural}/{slug}.webp` — fallback SVG/emoji se ausente.

Baixar fotos reais (Wikipedia / Wikimedia Commons, licença aberta):

```powershell
npm run download:pet-images
```

Créditos em `apps/api/src/data/imageAttributions.json`.

```powershell
npm run check:pet-images
```

## HTML estático legado

```powershell
npm run generate:pets-html
```

As fichas React são a experiência principal do piloto. O HTML estático fica como artefato opcional para distribuição offline ou compatibilidade.

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
- **Demo / pitch** (`/demo`) — apresentação do piloto
- **Explorar Pets** (`/explore`) — 13 categorias, 132 fichas
- Catálogo por espécie com busca e filtros
- Ficha educativa por raça/espécie
- Cadastro de pets (demo user)
- Lembretes de cuidado
- Simulador de adoção responsável (cães)
- PWA instalável
- Exportação HTML estática legada/opcional

## Estratégia de crescimento

- **Topo do funil:** TikTok, Instagram Reels e YouTube Shorts com erros comuns de tutores, curiosidades, produtos essenciais, mitos e comparativos.
- **Meio do funil:** artigos, guias, fichas e conteúdos educativos em PetCareTutor.com para gerar confiança.
- **Fundo do funil:** recomendações de ração, coleiras, peitorais, brinquedos, caixas de transporte e produtos veterinários por links de afiliado.

## Estratégia de IA

A arquitetura futura inclui um **AI Content Intelligence Engine** para buscar vídeos virais do nicho pet, extrair metadados, transcrever áudio com Whisper, organizar dados com Pandas, orquestrar agentes com LangChain e usar LLMs locais como Llama, Qwen ou DeepSeek em GPU local.

## Estrutura

```
petcare-responsavel/
├── apps/api/     # Backend Express
├── apps/web/     # Frontend React
├── docs/         # Documentação
└── docker-compose.yml
```

## Roadmap

Ver `docs/ROADMAP.md` para fases futuras: consolidação do catálogo, Blog SEO, afiliados, conteúdo TikTok, inteligência de conteúdo por IA, SEO programático e escala nacional.

## Aviso educativo

Este app oferece informações educativas e **não substitui orientação veterinária**. Consulte sempre um profissional para decisões de saúde do seu pet.

## Documentação

Consulte a pasta `docs/` para contexto, especificação, API, modelo de dados e runbook.
