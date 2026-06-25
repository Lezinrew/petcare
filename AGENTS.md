# AGENTS.md — PetCare Responsável

Este repositório contém um MVP full stack para cuidado responsável de pets.

## Direção estratégica atual

O PetCareTutor.com / PetCare Responsável deve ser tratado como uma plataforma educacional para tutores de animais, com três pilares oficiais:

1. Educação para reduzir adoção impulsiva, compra mal informada e abandono.
2. Ferramentas para tutores organizarem pets, perfis e lembretes de cuidado.
3. Monetização por afiliados, levando o usuário de conteúdo educativo para produtos recomendados em lojas parceiras.

Não implementar marketplace entre pessoas, venda direta de animais, intermediação de adoções, chat entre usuários ou comunicação direta entre comprador/vendedor. Essas frentes aumentam fraude, golpes e responsabilidade jurídica e não fazem parte da estratégia oficial.

O funil oficial é:
- Topo: TikTok, Instagram Reels e YouTube Shorts.
- Meio: artigos, guias, fichas e conteúdos educativos no PetCareTutor.com.
- Fundo: recomendações de produtos com links de afiliado para lojas parceiras.

A arquitetura futura inclui um AI Content Intelligence Engine para monitorar conteúdo viral pet, transcrever áudio, identificar padrões de engajamento e sugerir novos conteúdos.

Antes de alterar código:
1. Leia `docs/CONTEXT.md`.
2. Leia `docs/SYSTEM_DESIGN.md`.
3. Leia `docs/SPEC.md`.
4. Confira `docs/DECISIONS.md`.

Validação mínima:
- `npm run setup` (primeira vez)
- `npm run build`
- `npm run lint`
- `npm run reset`
- `npm run dev`
- `npm run validate` (com API rodando)

Demo: consulte `docs/DEMO.md`.

Não adicionar:
- Next.js
- Banco relacional
- Autenticação real no MVP
- Serviços pagos externos obrigatórios
- Dependências pesadas sem justificativa
- Marketplace entre pessoas
- Venda direta ou intermediação de adoções
- Comunicação direta entre usuários

Ao alterar estratégia de produto, growth, monetização, SEO, conteúdo ou IA, atualizar os documentos estratégicos em `docs/`, especialmente `docs/PRODUCT_VISION.md`, `docs/ROADMAP.md` e os specs em `docs/SPECS/`.

Ao alterar endpoints, atualizar `docs/API.md`.
Ao alterar modelos, atualizar `docs/DATA_MODEL.md`.
Ao alterar funcionamento, atualizar `docs/SPEC.md`.
Ao alterar execução, atualizar `docs/RUNBOOK.md`.
