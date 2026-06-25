# System Design — PetCare Responsável

## Visão geral

```
[Browser Desktop / Mobile / PWA]
              |
              | HTTP REST
              v
[React + Vite + TypeScript + Tailwind]
              |
              | VITE_API_URL
              v
[Node.js + Express + TypeScript]
              |
              | Mongoose
              v
[MongoDB - Docker Compose]
```

## Visão estratégica de arquitetura

A arquitetura atual cobre o MVP operacional. A arquitetura futura adiciona três camadas estratégicas:

1. **Conteúdo e SEO:** blog, guias, páginas programáticas e interlinking com o catálogo.
2. **Afiliados:** recomendações editoriais, tracking de cliques e saída para lojas parceiras.
3. **AI Content Intelligence Engine:** pipeline local de monitoramento de tendências, transcrição, análise e geração de pautas.

Essas camadas não transformam o produto em marketplace. A plataforma educa, organiza e recomenda; transações ocorrem nas lojas parceiras.

## Decisões arquiteturais

- Monorepo com apps separados (api/web)
- REST sobre HTTP/JSON
- MongoDB document-oriented para schemas flexíveis
- DEMO_USER_ID para simular multi-tenant sem auth
- PWA para experiência mobile sem app store

## Fluxo de requisição

1. Browser faz request para React app (Vite dev server ou build estático)
2. React chama `fetch` para `VITE_API_URL`
3. Express recebe, passa por middlewares (logger, CORS, helmet)
4. Router direciona para controller do módulo
5. Controller chama service (regra de negócio)
6. Service chama repository (MongoDB)
7. Resposta JSON retorna ao frontend
8. Erros capturados por `errorHandler`

## Separação frontend/backend

- **Frontend:** UI, roteamento, chamadas HTTP, PWA
- **Backend:** Persistência, validação, regras de negócio, seed
- Comunicação exclusiva via REST JSON

## Camadas do backend

| Camada | Responsabilidade |
|--------|------------------|
| routes | Define endpoints e middlewares |
| controller | Parse request, chama service, formata response |
| service | Regra de negócio, validação Zod |
| repository | Queries MongoDB |
| model | Schema Mongoose |

## Organização do frontend

| Pasta | Responsabilidade |
|-------|------------------|
| pages | Telas completas |
| components | UI reutilizável |
| services | Cliente HTTP por domínio |
| hooks | Estado async, toast |
| types | Interfaces TypeScript |
| routes | React Router config |

## Estratégia de seed

- Script `npm run seed` / `npm run reset` executa seed de **132** animais (13 espécies)
- Limpa coleção `animals` e reinsere 30 cães + 102 outras espécies
- Garante perfil demo do tutor (`tutorprofiles`) para o `DEMO_USER_ID`
- 7 raças caninas com dados ricos; demais via `breedFactory.ts`
- Endpoint `POST /api/animals/seed` disponível só em development

## Estratégia de erro

- `ApiError` class com status e code
- `errorHandler` middleware retorna JSON padronizado
- Stack trace oculto em produção

## Segurança mínima

- Helmet para headers HTTP
- CORS restrito a `CORS_ORIGIN`
- Validação de input com Zod
- Seed bloqueado fora de development

## Observabilidade mínima

- `requestLogger` (morgan) em development
- Health check em `/api/health`

## Limitações do MVP

- Sem autenticação real
- Sem upload de arquivos
- Sem push notifications
- Service worker com cache simples
- Dados de raças estáticos (seed)
- Sem marketplace, venda direta, intermediação de adoções ou comunicação direta entre usuários

## Arquitetura futura — AI Content Intelligence Engine

Fluxo planejado:

```
[YouTube Data API]
        |
        v
[Coletor de vídeos e metadados]
        |
        v
[Download/extração de áudio quando permitido]
        |
        v
[Whisper - transcrição]
        |
        v
[Pandas - organização, filtros e agrupamentos]
        |
        v
[LangChain - agentes, memória e decisões]
        |
        v
[LLM local - Llama / Qwen / DeepSeek]
        |
        v
[Insights, pautas, roteiros e backlog editorial]
```

Responsabilidades:

| Componente | Responsabilidade |
|------------|------------------|
| YouTube Data API | Buscar vídeos, ranking, tendências e metadados públicos |
| Whisper | Transcrever áudio para análise textual |
| Pandas | Organizar datasets, filtrar, agrupar e calcular métricas |
| LangChain | Orquestrar agentes, memória, contexto e decisões |
| LLM local | Gerar insights e sugestões de conteúdo com menor custo operacional |

## Infraestrutura futura de IA

Na fase MVP, a execução da camada de IA deve ser local. Hardware alvo: RTX 4070 ou superior. Prioridade de modelos locais: Llama, Qwen e DeepSeek.

Não há necessidade inicial de VPS, AWS, Azure ou Google Cloud para o motor de inteligência de conteúdo. Cloud deve entrar apenas quando houver tráfego real, necessidade de processamento recorrente, colaboração em equipe ou retorno financeiro comprovado.

## Evolução: Capacitor

Na fase 4, o build Vite pode ser empacotado com Capacitor para Play Store e App Store, reutilizando 100% do frontend React.
