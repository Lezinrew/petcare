# Checklist de Demo — PetCare Responsável

Roteiro rápido (~5 min) para apresentar o piloto com **88 animais** em 6 espécies.

## Antes da demo

```bash
docker compose up -d
npm run setup      # só na primeira vez
npm run reset      # garante 88 animais no banco
npm run dev
npm run check:api  # confirma API (outro terminal)
```

URLs:
- Web: http://localhost:5173
- Explorar: http://localhost:5173/explore
- API: http://localhost:3333/api/health

---

## Roteiro sugerido

### 1. Home (30 seg)

- [ ] Mostrar slogan: *Conheça melhor. Cuide melhor. Abandone menos.*
- [ ] Destacar cards de navegação
- [ ] Mencionar aviso educativo (não substitui veterinário)

### 2. Explorar Pets (45 seg)

- [ ] Abrir `/explore` — 6 categorias, total **88** fichas
- [ ] Entrar em **Cachorros** (30) e **Gatos** (20)

### 3. Catálogo por espécie (1 min)

- [ ] `/dogs` — buscar "labrador", filtrar porte "grande"
- [ ] `/cats/persa` — ficha completa
- [ ] Opcional: `/fish/betta`, `/hamsters/sirio`, `/birds/calopsita`, `/rabbits/holland-lop`

### 4. Ficha educativa (1 min)

- [ ] Abrir `/dogs/labrador-retriever`
- [ ] Percorrer cards: alimentação, exercício, saúde
- [ ] Botão **Abrir versão HTML** → `/generated/pets/dogs/labrador-retriever.html`

### 5. Adoção responsável (1 min)

- [ ] Abrir `/adoption-match`
- [ ] Preencher: apartamento, crianças, pouco tempo, porte pequeno
- [ ] Mostrar 3 raças recomendadas + alertas + mensagem anti-abandono

### 6. Meu Pet (45 seg)

- [ ] Cadastrar um pet de exemplo
- [ ] Editar nome ou peso
- [ ] Excluir (opcional)

### 7. Lembretes (45 seg)

- [ ] Criar lembrete de vacina
- [ ] Marcar como concluído
- [ ] Mostrar destaque de "próximos"

### 8. PWA (30 seg — opcional)

- [ ] DevTools → Application → Manifest
- [ ] No mobile: "Adicionar à tela inicial"

---

## Frases-chave para a apresentação

- *"O app transforma informação em cuidado prático."*
- *"Antes de adotar, o tutor entende porte, energia e rotina."*
- *"Adotar é assumir uma vida — tempo, espaço, custos e paciência."*

---

## Se algo falhar

| Problema | Ação rápida |
|----------|-------------|
| Web sem dados | `npm run reset` + recarregar |
| API offline | `npm run dev:api` |
| CORS | Conferir `CORS_ORIGIN` em `apps/api/.env` |
| Cache antigo (PWA) | DevTools → Unregister service worker |
| Imagens ausentes | `npm run generate:pet-images` (placeholders) |

---

## Validação automatizada

Com API e Web rodando (`npm run dev`):

```bash
npm run check:api
npm run check:frontend-routes
npm run check:pet-images
```

Esperado: health ✅, 6 espécies (30+20+10+5+15+8=**88**), detalhes labrador/persa, rotas SPA e slugs API.
