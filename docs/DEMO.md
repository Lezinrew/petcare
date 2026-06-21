# Checklist de Demo — PetCare Responsável

Roteiro rápido (~5 min) para apresentar o piloto.

## Antes da demo

```bash
docker compose up -d
npm run setup      # só na primeira vez
npm run reset      # garante 30 raças no banco
npm run dev
npm run validate   # confirma API (outro terminal)
```

URLs:
- Web: http://localhost:5173
- API: http://localhost:3333/api/health

---

## Roteiro sugerido

### 1. Home (30 seg)

- [ ] Mostrar slogan: *Conheça melhor. Cuide melhor. Abandone menos.*
- [ ] Destacar cards de navegação
- [ ] Mencionar aviso educativo (não substitui veterinário)

### 2. Catálogo de cães (1 min)

- [ ] Abrir `/dogs` — 30 raças carregadas
- [ ] Buscar "labrador"
- [ ] Filtrar por porte "grande"

### 3. Ficha educativa (1 min)

- [ ] Abrir `/dogs/labrador-retriever`
- [ ] Percorrer cards: alimentação, exercício, saúde
- [ ] Mostrar aviso no card de saúde

### 4. Adoção responsável (1 min)

- [ ] Abrir `/adoption-match`
- [ ] Preencher: apartamento, crianças, pouco tempo, porte pequeno
- [ ] Mostrar 3 raças recomendadas + alertas + mensagem anti-abandono

### 5. Meu Pet (45 seg)

- [ ] Cadastrar um pet de exemplo
- [ ] Editar nome ou peso
- [ ] Excluir (opcional)

### 6. Lembretes (45 seg)

- [ ] Criar lembrete de vacina
- [ ] Marcar como concluído
- [ ] Mostrar destaque de "próximos"

### 7. PWA (30 seg — opcional)

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

---

## Validação automatizada

Com a API rodando:

```bash
npm run validate
```

Esperado: todos os checks ✅ (health, 30 raças, labrador, busca, adoção, pets CRUD).
