# Especificação — PetCare Responsável

## Home

### Objetivo
Apresentar o app, missão e navegação principal.

### Rota
`/`

### Campos
N/A (página informativa)

### Regras
- Exibir hero com nome e slogan
- Cards de navegação para Cães, Meu Pet, Lembretes, Adoção
- Seção "Por que isso importa?"
- Aviso educativo sobre não substituir veterinário

### Estados de tela
- Carregamento: N/A (estático)
- Erro: N/A
- Vazio: N/A

### Critérios de aceite
- [ ] Hero visível com slogan
- [ ] 4 cards de navegação funcionais
- [ ] Aviso educativo presente
- [ ] Layout responsivo mobile-first

---

## Explorar Pets

### Objetivo
Hub com 6 categorias e atalho para cada catálogo.

### Rota
`/explore`

### Critérios de aceite
- [ ] 6 cards (cães, gatos, peixes, hamsters, aves, coelhos)
- [ ] Total 88 fichas indicado
- [ ] Cada card navega para `/{speciesKey}`

---

## Catálogo por espécie

### Objetivo
Listar raças/variedades com busca e filtros (cães, gatos, etc.).

### Rotas
`/dogs`, `/cats`, `/fish`, `/hamsters`, `/birds`, `/rabbits`

### Regras
- Contagens: cães 30, gatos 20, peixes 10, hamsters 5, aves 15, coelhos 8
- Botão "Ver catálogo HTML" → `/generated/pets/{speciesKey}/index.html`
- `imageUrl` opcional com fallback emoji

### Critérios de aceite
- [ ] Contagem correta por espécie após seed
- [ ] Slugs sem acento (ex: `persa`, `sirio`, `holland-lop`)

---

## Catálogo de cães (legado na SPEC)

### Objetivo
Listar 30 raças com busca e filtros.

### Rota
`/dogs`

### Campos
- Busca por nome (`search`)
- Filtro porte (`size`)
- Filtro energia (`energyLevel`)

### Regras
- Grid responsivo de cards
- Cada card: nome, porte, energia, apartamento, crianças, botão "Ver cuidados"
- Filtros disparam nova busca na API
- Botão "Ver catálogo HTML" abre `/generated/pets/dogs/index.html` em nova aba

### Estados de tela
- Loading: spinner/skeleton
- Erro: mensagem com retry
- Vazio: "Nenhuma raça encontrada"

### Critérios de aceite
- [ ] Lista 30 raças após seed
- [ ] Busca por nome funciona
- [ ] Filtro por porte funciona
- [ ] Filtro por energia funciona
- [ ] Card navega para detalhe

---

## Detalhe da raça

### Objetivo
Ficha educativa visual completa da raça.

### Rota
`/dogs/:slug`

### Campos
Todos os campos de `AnimalBreed.care`

### Regras
- Hero com nome e descrição
- Stats bar: origem, função, expectativa de vida, porte, energia
- Cards temáticos por área de cuidado
- Card Saúde com aviso educativo
- Botão "Abrir versão HTML" abre `/generated/dogs/{slug}.html` em nova aba

### Estados de tela
- Loading, erro, not found

### Critérios de aceite
- [ ] Labrador exibe dados completos
- [ ] 9 cards de cuidado visíveis
- [ ] Aviso de saúde presente
- [ ] Botão voltar funciona

---

## Meu Pet

### Objetivo
CRUD de pets do usuário demo.

### Rota
`/my-pets`

### Campos
nome, espécie, raça (slug), idade (meses), peso (kg), sexo, castrado, observações, foto URL

### Regras
- Usuário demo via API
- Modal/formulário para criar/editar
- Confirmação para excluir
- Estado vazio amigável

### Estados de tela
- Loading, erro, vazio, lista com dados

### Critérios de aceite
- [ ] Criar pet
- [ ] Editar pet
- [ ] Excluir pet
- [ ] Estado vazio quando sem pets

---

## Lembretes

### Objetivo
CRUD de lembretes de cuidado.

### Rota
`/reminders`

### Campos
tipo, título, data, recorrência, pet (opcional), status

### Regras
- Ordenar por data
- Destacar próximos pendentes
- Marcar como concluído via PATCH

### Estados de tela
- Loading, erro, vazio, lista

### Critérios de aceite
- [ ] Criar lembrete
- [ ] Editar lembrete
- [ ] Excluir lembrete
- [ ] Marcar concluído
- [ ] Próximos em destaque

---

## Adoção responsável

### Objetivo
Simular compatibilidade tutor-raça.

### Rota
`/adoption-match`

### Campos
moradia, quintal, crianças, outros pets, experiência, tempo livre, passeio diário, porte preferido, gosta de ativos

### Regras
- Formulário amigável
- API retorna perfil, 3 raças, alertas, mensagem anti-abandono
- Mensagem obrigatória sobre compromisso

### Estados de tela
- Formulário, loading, resultado

### Critérios de aceite
- [ ] Formulário completo
- [ ] 3 raças recomendadas
- [ ] Alertas de responsabilidade
- [ ] Mensagem anti-abandono

---

## PWA

### Objetivo
App instalável no celular.

### Rota
N/A (global)

### Regras
- manifest.webmanifest configurado
- service-worker.js com cache básico
- Registro em main.tsx

### Critérios de aceite
- [ ] Manifest válido
- [ ] SW registrado
- [ ] Instalável no mobile

---

## Exportação HTML estática (raças)

### Objetivo
Gerar fichas educativas offline por raça, reutilizáveis fora do app React.

### Comando
`npm run generate:dogs-html`

### Saída
`apps/web/public/generated/dogs/{slug}.html` e `index.html`

### Regras
- Dados de `apps/api/src/data/dogBreeds.ts` (mesma fonte do seed)
- CSS inline, sem CDN ou imagens externas
- Visual alinhado à ficha `/dogs/:slug`
- Catálogo e detalhe no app linkam para os HTMLs gerados

### Critérios de aceite
- [ ] 30 HTMLs + index gerados
- [ ] Labrador completo
- [ ] Abre em `/generated/dogs/` via Vite
