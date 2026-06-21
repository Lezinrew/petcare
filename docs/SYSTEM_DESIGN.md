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

- Script `npm run seed` / `npm run reset` executa seed de **88** animais (6 espécies)
- Limpa coleção `animals` e reinsere 30 cães + 58 outras espécies
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

## Evolução: Capacitor

Na fase 4, o build Vite pode ser empacotado com Capacitor para Play Store e App Store, reutilizando 100% do frontend React.
