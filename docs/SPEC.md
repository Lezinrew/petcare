# Especificação — PetCareTutor.com / PetCare Responsável

## Escopo estratégico oficial

O produto combina três pilares: educação, ferramentas para tutores e monetização por afiliados.

Fora de escopo: marketplace entre pessoas, venda direta, intermediação de adoções, comunicação direta entre usuários, chat comprador/vendedor ou responsabilidade sobre transações de terceiros.

O fluxo comercial futuro deve seguir: **usuário → conteúdo → produto recomendado → loja parceira**.

## Home

### Objetivo
Apresentar o app, missão e navegação principal.

### Rota
`/`

### Campos
N/A (página informativa)

### Regras
- Exibir hero com nome e slogan
- Saudação personalizada quando o perfil demo tiver nome
- Comunicar a proposta de educação, ferramentas e recomendações responsáveis sem parecer marketplace
- Banner e badge de perfil incompleto (5 campos essenciais) com link para `/profile`
- Carrossel horizontal com as 13 espécies; clique leva a `/explore?species={routeKey}`
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
- [ ] Nenhum texto sugere venda direta, marketplace ou intermediação de adoções
- [ ] Layout responsivo mobile-first

---

## Explorar Pets

### Objetivo
Hub visual mobile-first com cards grandes por espécie.

### Rota
`/explore`

### Regras
- Tela com linguagem editorial clara, fundo claro e navegação mobile no topo
- Query opcional `?species={routeKey}` filtra a grade para uma espécie (ex: `?species=dogs`)
- Com filtro ativo: chip removível, link para ver todas e CTA para o catálogo da espécie
- Cabeçalho: "Explorar Pets", chip com total de fichas, divisor sutil e subtítulo educativo
- 13 cards visuais limpos com imagem, nome da espécie e seta de navegação
- A experiência principal é a ficha React responsiva; HTML estático não aparece como CTA no app
- Futuramente, cards podem apontar para guias SEO relacionados, desde que preservem foco educativo

### Critérios de aceite
- [ ] 13 categorias com contagem correta
- [ ] Cards responsivos (mobile + desktop)
- [ ] Cada card navega para `/{speciesKey}`

---

## Demo / pitch

### Rota
`/demo`

### Conteúdo
Problema, solução, entregas do piloto, próximos passos, CTAs para explorar pets e adoção responsável.

---

## Explorar Pets (legado título)

### Rota
`/explore`

### Critérios de aceite
- [ ] 13 cards (cães, gatos, peixes, hamsters, aves, coelhos, tartarugas, twisters, porquinhos-da-índia, chinchilas, gerbis, furões, lagartos)
- [ ] Total 132 fichas indicado
- [ ] Cada card navega para `/{speciesKey}`

---

## Catálogo por espécie

### Objetivo
Listar raças/variedades com busca e filtros (cães, gatos, etc.).

### Rotas
`/dogs`, `/cats`, `/fish`, `/hamsters`, `/birds`, `/rabbits`, `/turtles`, `/twisters`, `/guinea-pigs`, `/chinchillas`, `/gerbils`, `/ferrets`, `/lizards`

### Regras
- Contagens: cães 30, gatos 20, peixes 10, hamsters 5, aves 23, coelhos 8, tartarugas 7, twisters 4, porquinhos-da-índia 6, chinchilas 4, gerbis 4, furões 4, lagartos 7
- Aves de rapina devem ser apresentadas como fauna silvestre sob cuidados humanos, nunca como fauna doméstica; as fichas devem orientar origem legal, marcação/anilha, documentação e autorização do órgão ambiental competente.
- `imageUrl` opcional com fallback emoji
- Recomendações comerciais futuras devem ser contextuais, editoriais e ligadas a cuidado responsável, nunca a compra do animal

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
- Blocos futuros de produtos recomendados devem informar que a compra acontece em loja parceira e podem usar links de afiliado

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
nome, espécie (seleção visual com os 13 avatares de categoria em WebP + outro), raça/variedade (slug), idade (meses), peso (kg), sexo, castrado, observações, foto URL

### Regras
- Usuário demo via API
- Banner com resumo do tutor vinculado e link para `/profile`
- Formulário para criar/editar com a mesma linguagem visual do app
- Confirmação para excluir
- Estado vazio amigável e resumo visual dos perfis cadastrados

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
- Banner com resumo do tutor vinculado e link para `/profile`
- Formulário permite vincular lembrete a pet cadastrado (opcional)
- Cards exibem nome do pet quando `petId` estiver definido
- Destacar próximos pendentes
- Marcar como concluído via PATCH
- Exibir resumo visual de total, próximos e concluídos

### Estados de tela
- Loading, erro, vazio, lista

### Critérios de aceite
- [ ] Criar lembrete
- [ ] Editar lembrete
- [ ] Excluir lembrete
- [ ] Marcar concluído
- [ ] Próximos em destaque

---

## Perfil do tutor

### Objetivo
Permitir que o tutor demo edite dados básicos pessoais, contextualizando pets e lembretes sem autenticação real.

### Rota
`/profile`

### Campos
nome, cidade, UF, tipo de moradia, experiência com pets, observações gerais

### Regras
- Usuário demo via `DEMO_USER_ID` (mesmo vínculo de pets/lembretes)
- GET retorna perfil vazio se ainda não salvo
- PUT faz upsert do documento único por usuário
- `npm run reset` recria perfil demo padrão junto com o catálogo
- Formulário com feedback de salvamento
- Links para Meu Pet e Lembretes

### Estados de tela
- Loading, erro, formulário com dados (vazios ou preenchidos)

### Critérios de aceite
- [ ] Carregar perfil demo
- [ ] Salvar e persistir dados
- [ ] Checklist visual de campos essenciais e barra de progresso
- [ ] Dark mode e layout alinhados às telas de cuidado
- [ ] Navegação acessível (TopBar, Home e BottomNav mobile)

---

## Admin — Métricas

### Objetivo
Permitir que o operador acompanhe visualizações, engajamento, origem de tráfego, interesse por espécie e padrões de uso (horário e dia da semana).

### Rota
`/admin`

### Regras
- Registrar visualização a cada navegação interna do app
- Métricas agregadas por `path`, região, dispositivo, SO, espécie, UTM e referrer externo
- Exibir visitantes únicos, sessões estimadas (janela de 30 min por `ipHash`) e média de páginas por sessão
- Exibir distribuição por hora e dia da semana (fuso `America/Sao_Paulo`)
- Não armazenar user-agent completo — apenas campos derivados (`browser`, `os`, `deviceType`)
- Analytics não deve bloquear navegação nem exibir erro ao usuário final
- A tela `/admin` só é acessível digitando a URL; exige senha operacional (`ADMIN_PASSWORD`) — não é login de tutor
- `GET /api/analytics/summary` sempre exige token Bearer válido

### Estados de tela
- Não autenticado: formulário de senha administrativa
- Loading: carregando métricas
- Erro: mensagem com retry
- Vazio: nenhuma visualização registrada ainda

### Critérios de aceite
- [ ] Navegar pelo app registra page views
- [ ] `/admin` exibe visitantes únicos, sessões, horários de pico e espécies mais acessadas
- [ ] `/admin` permite abrir uma página ranqueada
- [ ] Falha no tracking não quebra a navegação

---

## Adoção responsável

### Objetivo
Simular compatibilidade tutor-raça.

### Rota
`/adoption-match`

### Campos
moradia, quintal, crianças, outros pets, experiência, tempo livre, passeio diário, porte preferido, gosta de ativos

### Regras
- Formulário amigável, agrupado por casa, rotina e preferência
- Pré-preenche moradia e experiência a partir do perfil do tutor demo, quando disponível
- API retorna perfil, 3 raças, percentual/rótulo de compatibilidade, imagem, motivo, pontos de atenção, alertas e mensagem anti-abandono
- Resultado deve destacar que a recomendação é educativa e exige validação de rotina, custos e temperamento individual
- Cada recomendação deve linkar para a ficha da raça
- Mensagem obrigatória sobre compromisso
- Não deve oferecer cadastro de animal para adoção, contato entre usuários ou intermediação de adoções

### Estados de tela
- Formulário, loading, resultado

### Critérios de aceite
- [ ] Formulário completo
- [ ] 3 raças recomendadas com score de compatibilidade
- [ ] Alertas de responsabilidade e pontos de atenção por raça
- [ ] Links para fichas recomendadas
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

## Exportação HTML estática (legado opcional)

### Objetivo
Gerar fichas educativas offline por raça quando houver necessidade técnica de distribuição fora do app React.

### Comando
`npm run generate:pets-html`

### Saída
`apps/web/public/generated/pets/{speciesKey}/{slug}.html` e índices por espécie.

### Regras
- Dados de `apps/api/src/data/allBreeds.ts` (mesma fonte do seed)
- CSS inline, sem CDN ou imagens externas
- Não é CTA principal no app; a ficha React é a experiência oficial do piloto
- `generate:dogs-html` permanece apenas para compatibilidade legada

### Critérios de aceite
- [ ] HTMLs gerados quando o comando for executado
- [ ] Labrador completo
- [ ] Abre em `/generated/pets/` via Vite quando acessado diretamente

---

## Blog SEO (futuro)

### Objetivo
Atrair tráfego orgânico qualificado com artigos, guias e checklists educativos.

### Conteúdos
- Erros comuns de tutores
- Curiosidades por espécie
- Guias de produtos essenciais
- Mitos e verdades
- Comparativos
- Guias de custo e rotina

### Regras
- Interlinkar artigos com fichas do catálogo
- Priorizar conteúdo útil e revisável por humanos
- Manter avisos veterinários em temas de saúde
- Não publicar conteúdo que incentive compra impulsiva de animais

---

## Afiliados (futuro)

### Objetivo
Monetizar recomendações de produtos sem assumir venda, logística ou atendimento de terceiros.

### Regras
- A venda ocorre em loja parceira
- Usar disclosure de afiliados
- Recomendações devem ser editoriais e contextualizadas
- Não recomendar produtos incompatíveis com a espécie, porte, idade ou necessidade apresentada
- Não criar marketplace, carrinho próprio ou negociação entre usuários

---

## AI Content Intelligence Engine (futuro)

### Objetivo
Monitorar conteúdo viral do nicho pet e transformar padrões de engajamento em pautas, roteiros e oportunidades SEO.

### Fluxo
1. Buscar vídeos virais
2. Extrair metadados
3. Baixar áudio quando permitido
4. Transcrever
5. Identificar padrões de engajamento
6. Gerar insights
7. Sugerir novos conteúdos

### Regras
- Priorizar execução local na fase MVP
- Usar LLM local para reduzir custo operacional
- Manter revisão humana antes de publicar conteúdo sensível
- Respeitar direitos autorais e termos das plataformas
