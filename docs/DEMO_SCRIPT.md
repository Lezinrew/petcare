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
- HTML: http://localhost:5173/generated/pets/index.html

---

## Roteiro (ordem sugerida)

### 1. Página de pitch — `/demo` (1 min)

- [ ] Mostrar missão: *Conheça melhor. Cuide melhor. Abandone menos.*
- [ ] Problema → Solução → O que o piloto entrega
- [ ] Destacar: **88 animais**, 6 espécies, PWA, API, HTML offline

### 2. Explorar — `/explore` (1 min)

- [ ] Cards grandes por espécie (30 cães, 20 gatos, etc.)
- [ ] Botão **Abrir catálogo HTML**
- [ ] Entrar em **Gatos** ou **Cães**

### 3. Catálogo com imagem — `/cats` ou `/dogs` (1 min)

- [ ] Cards com foto ou placeholder SVG
- [ ] Badges adaptados (porte, energia, iniciantes)
- [ ] **Ver versão HTML da categoria**

### 4. Ficha educativa — `/cats/persa` ou `/dogs/labrador-retriever` (1,5 min)

- [ ] Hero visual com imagem
- [ ] Cards de cuidado (títulos adaptados por espécie)
- [ ] **Abrir HTML deste pet**
- [ ] Aviso educativo veterinário

### 5. HTML estático (30 seg)

- [ ] Abrir `/generated/pets/cats/persa.html`
- [ ] Mostrar que funciona offline, sem API

### 6. Meu Pet (45 seg)

- [ ] Cadastrar pet de exemplo
- [ ] Editar / listar

### 7. Lembretes (45 seg)

- [ ] Criar lembrete
- [ ] Marcar concluído

### 8. Adoção responsável (1 min)

- [ ] Preencher formulário
- [ ] Mostrar 3 raças + alertas + mensagem anti-abandono

---

## Validação automatizada

```bash
npm run check:api
npm run check:pet-images
npm run check:frontend-routes
npm run generate:pets-html
```

---

## Frases-chave

- *"O app transforma informação em cuidado prático."*
- *"Antes de adotar, o tutor entende porte, energia e rotina."*
- *"88 fichas educativas em 6 grupos de espécies."*

---

## Se algo falhar

| Problema | Ação |
|----------|------|
| Sem dados | `npm run reset` |
| API offline | `npm run dev:api` |
| Imagens | Placeholders SVG em `/images/placeholders/` |
| Porta Vite | Ver terminal (`5173` ou `5174`) |
