# Plano de Testes Manual — PetCare Responsável

## Pré-condições

- MongoDB rodando (`docker compose up -d`)
- Seed executado (`npm run seed`)
- API e Web rodando (`npm run dev`)

## Testes

| # | Teste | Passos | Esperado |
|---|-------|--------|----------|
| 1 | Home carrega | Acessar `/` | Hero, slogan, cards, aviso |
| 2 | Catálogo 30 raças | Acessar `/dogs` | 30 cards visíveis |
| 3 | Busca funciona | Buscar "labrador" | Filtra para Labrador |
| 4 | Filtro porte | Filtrar "grande" | Só raças grandes |
| 5 | Labrador abre | Clicar Labrador | Ficha completa |
| 6 | Cards cuidado | Ver detalhe | 9 cards temáticos |
| 7 | Pet criar | Meu Pet → Novo | Pet na lista |
| 8 | Pet editar | Editar pet | Dados atualizados |
| 9 | Pet excluir | Excluir pet | Removido da lista |
| 10 | Lembrete criar | Lembretes → Novo | Lembrete na lista |
| 11 | Lembrete concluir | Marcar done | Status "done" |
| 12 | Lembrete excluir | Excluir | Removido |
| 13 | Adoção | Preencher form | 3 raças + alertas |
| 14 | Layout mobile | DevTools 375px | BottomNav visível |
| 15 | API health | `curl /api/health` | status ok |
| 16 | Build | `npm run build` | Sem erros |

## Checklist PWA

- [ ] Manifest acessível em `/manifest.webmanifest`
- [ ] Service worker registrado (DevTools → Application)
- [ ] Ícone SVG carrega

## Checklist API

```bash
curl http://localhost:3333/api/health
curl http://localhost:3333/api/animals/dogs
curl http://localhost:3333/api/animals/dogs/labrador-retriever
```

Todos devem retornar 200 com JSON válido.
