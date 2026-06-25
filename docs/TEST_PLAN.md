# Plano de Testes Manual — PetCare Responsável

## Pré-condições

- MongoDB rodando (`docker compose up -d`)
- Seed executado (`npm run reset`)
- API e Web rodando (`npm run dev`)

## Testes — catálogo 132

| # | Teste | Passos | Esperado |
|---|-------|--------|----------|
| 1 | Home carrega | Acessar `/` | Hero, slogan, cards, aviso |
| 2 | Demo pitch | `/demo` | Problema, solução, 132 animais |
| 3 | Explorar | `/explore` | 13 cards visuais navegáveis |
| 4 | Cães 30 | `/dogs` | 30 cards com imagem |
| 4 | Gatos 20 | `/cats` | 20 cards |
| 5 | Peixes 10 | `/fish` | 10 cards |
| 6 | Hamsters 5 | `/hamsters` | 5 cards |
| 7 | Aves 23 | `/birds` | 23 cards, incluindo aves de rapina com aviso legal |
| 8 | Coelhos 8 | `/rabbits` | 8 cards |
| 9 | Tartarugas 7 | `/turtles` | 7 cards |
| 10 | Twisters 4 | `/twisters` | 4 cards |
| 11 | Porquinhos-da-índia 6 | `/guinea-pigs` | 6 cards |
| 12 | Chinchilas 4 | `/chinchillas` | 4 cards |
| 13 | Gerbis 4 | `/gerbils` | 4 cards |
| 14 | Furões 4 | `/ferrets` | 4 cards |
| 15 | Lagartos 7 | `/lizards` | 7 cards |
| 16 | Slugs especiais | `/cats/persa-exotico`, `/fish/peixe-palhaco`, `/birds/diamante-de-gould`, `/turtles/tartaruga-de-orelha-vermelha`, `/guinea-pigs/porquinho-da-india-ingles`, `/lizards/gecko-leopardo` | Ficha carrega |
| 11 | Busca cães | Buscar "labrador" em `/dogs` | Filtra |
| 12 | Labrador | `/dogs/labrador-retriever` | Ficha completa |
| 13 | Persa | `/cats/persa` | Ficha completa |
| 14 | Pet criar | Meu Pet → Novo | Pet na lista |
| 15 | Lembrete CRUD | Lembretes | Criar/concluir/excluir |
| 16 | Adoção | Preencher form | 3 raças + alertas |
| 17 | Admin métricas | Abrir `/dogs`, `/cats`, depois `/admin` | Ranking mostra páginas acessadas |
| 18 | Layout mobile | DevTools 375px | BottomNav visível |
| 19 | Build | `npm run build` | Sem erros |

## Rotas frontend (smoke)

```txt
/explore
/dogs/labrador-retriever
/cats/persa
/fish/betta
/hamsters/sirio
/birds/calopsita
/rabbits/holland-lop
/turtles/tartaruga-de-orelha-vermelha
/guinea-pigs/porquinho-da-india-ingles
/lizards/gecko-leopardo
```

## Checklist API automatizado

```bash
npm run check:api
```

## Checklist browser automatizado

Com a Web rodando:

```bash
npm run setup:browser-console   # primeira vez
npm run check:browser-console
```

Para manter a checagem em loop durante correções:

```bash
npm run watch:browser-console
```

Esperado: nenhuma saída de `console.error`, nenhuma exceção de página e navegação válida nas rotas representativas.

## Checklist curl manual

```bash
curl http://localhost:3333/api/health
curl http://localhost:3333/api/animals/dogs
curl http://localhost:3333/api/animals/cats
curl http://localhost:3333/api/animals/fish
curl http://localhost:3333/api/animals/hamsters
curl http://localhost:3333/api/animals/birds
curl http://localhost:3333/api/animals/rabbits
curl http://localhost:3333/api/animals/turtles
curl http://localhost:3333/api/animals/twisters
curl http://localhost:3333/api/animals/guinea-pigs
curl http://localhost:3333/api/animals/chinchillas
curl http://localhost:3333/api/animals/gerbils
curl http://localhost:3333/api/animals/ferrets
curl http://localhost:3333/api/animals/lizards
```

Total esperado somando arrays: **132**.

## Imagens

```bash
npm run check:pet-images
```

Esperado: 132 imagens encontradas, sem bloquear a demo por placeholders.

## Checklist PWA

- [ ] Manifest acessível em `/manifest.webmanifest`
- [ ] Service worker registrado (DevTools → Application)
- [ ] Ícone SVG carrega
