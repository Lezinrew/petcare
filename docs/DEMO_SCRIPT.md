# Roteiro de Demo — PetCare Responsável

Apresentação do piloto (~7 min) para reuniões e validação.

## Antes da demo

```bash
docker compose up -d
npm run reset
npm run dev
npm run check:api
```

URLs:
- Demo: http://localhost:5173/demo
- Web: http://localhost:5173

---

## Roteiro (ordem sugerida)

### 1. Página de pitch — `/demo` (1 min)

- [ ] Mostrar missão: *Conheça melhor. Cuide melhor. Abandone menos.*
- [ ] Problema → Solução → O que o piloto entrega
- [ ] Destacar: **132 animais**, 13 grupos, PWA, API e fichas responsivas

### 2. Explorar — `/explore` (1 min)

- [ ] Cards grandes por espécie/grupo (30 cães, 20 gatos, 7 tartarugas, 7 lagartos, etc.)
- [ ] Entrar em **Gatos** ou **Cães**

### 3. Catálogo com imagem — `/cats` ou `/dogs` (1 min)

- [ ] Cards com foto ou placeholder SVG
- [ ] Badges adaptados (porte, energia, iniciantes)

### 4. Ficha educativa — `/cats/persa` ou `/dogs/labrador-retriever` (1,5 min)

- [ ] Hero visual com imagem
- [ ] Cards de cuidado (títulos adaptados por espécie)
- [ ] Aviso educativo veterinário

### 5. Meu Pet (45 seg)

- [ ] Cadastrar pet de exemplo
- [ ] Editar / listar

### 6. Lembretes (45 seg)

- [ ] Criar lembrete
- [ ] Marcar concluído

### 7. Adoção responsável (1 min)

- [ ] Preencher formulário
- [ ] Mostrar 3 raças + alertas + mensagem anti-abandono

---

## Validação automatizada

```bash
npm run check:api
npm run check:pet-images
npm run check:frontend-routes
```

---

## Frases-chave

- *"O app transforma informação em cuidado prático."*
- *"Antes de adotar, o tutor entende porte, energia e rotina."*
- *"132 fichas educativas em 13 grupos de pets."*

---

## Se algo falhar

| Problema | Ação |
|----------|------|
| Sem dados | `npm run reset` |
| API offline | `npm run dev:api` |
| Imagens | Placeholders SVG em `/images/placeholders/` |
| Porta Vite | Ver terminal (`5173` ou `5174`) |
