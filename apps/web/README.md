# PetCare Web

Frontend React + Vite para o MVP PetCare Responsável.

O produto faz parte da estratégia PetCareTutor.com: educação, ferramentas para tutores e monetização futura por afiliados, sem marketplace ou venda direta.

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview do build

## PWA

Para limpar cache do service worker durante desenvolvimento:
1. DevTools → Application → Service Workers → Unregister
2. Application → Storage → Clear site data

Ou incremente `CACHE_VERSION` em `public/service-worker.js`.
