# Plano de Testes Manual — PetCare Responsável

## Pré-condições

- MongoDB rodando (`docker compose up -d`)
- Seed executado (`npm run reset`)
- API e Web rodando (`npm run dev`)

## Testes — catálogo 88

| # | Teste | Passos | Esperado |
|---|-------|--------|----------|
| 1 | Home carrega | Acessar `/` | Hero, slogan, cards, aviso |
| 2 | Demo pitch | `/demo` | Problema, solução, 88 animais |
| 3 | Explorar | `/explore` | 6 cards visuais + HTML |
| 4 | Cães 30 | `/dogs` | 30 cards com imagem |
| 4 | Gatos 20 | `/cats` | 20 cards |
| 5 | Peixes 10 | `/fish` | 10 cards |
| 6 | Hamsters 5 | `/hamsters` | 5 cards |
| 7 | Aves 15 | `/birds` | 15 cards |
| 8 | Coelhos 8 | `/rabbits` | 8 cards |
| 9 | Slugs especiais | `/cats/persa-exotico`, `/fish/peixe-palhaco`, `/birds/diamante-de-gould` | Ficha carrega |
| 10 | Busca cães | Buscar "labrador" em `/dogs` | Filtra |
| 11 | Labrador | `/dogs/labrador-retriever` | Ficha completa |
| 12 | Persa | `/cats/persa` | Ficha completa |
| 13 | Pet criar | Meu Pet → Novo | Pet na lista |
| 14 | Lembrete CRUD | Lembretes | Criar/concluir/excluir |
| 15 | Adoção | Preencher form | 3 raças + alertas |
| 16 | Layout mobile | DevTools 375px | BottomNav visível |
| 17 | Build | `npm run build` | Sem erros |

## Rotas frontend (smoke)

```txt
/explore
/dogs/labrador-retriever
/cats/persa
/fish/betta
/hamsters/sirio
/birds/calopsita
/rabbits/holland-lop
```

## Checklist API automatizado

```bash
npm run check:api
```

## Checklist curl manual

```bash
curl http://localhost:3333/api/health
curl http://localhost:3333/api/animals/dogs
curl http://localhost:3333/api/animals/cats
curl http://localhost:3333/api/animals/fish
curl http://localhost:3333/api/animals/hamsters
curl http://localhost:3333/api/animals/birds
curl http://localhost:3333/api/animals/rabbits
```

Total esperado somando arrays: **88**.

## Imagens e HTML

```bash
npm run check:pet-images
npm run generate:pets-html
```

Verificar `/generated/pets/index.html` e fichas por espécie.

## Checklist PWA

- [ ] Manifest acessível em `/manifest.webmanifest`
- [ ] Service worker registrado (DevTools → Application)
- [ ] Ícone SVG carrega
