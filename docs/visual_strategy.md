# Estratégia visual

## Regra oficial

**Ilustração para navegação. Realismo para informação.**

O PetCare Responsável deve parecer acolhedor e fácil de navegar, sem perder credibilidade educativa. Para isso, os avatares ilustrados são usados como portas de entrada visuais, enquanto fotos reais continuam obrigatórias nos pontos em que o tutor precisa entender porte, aparência, necessidades e contexto real do animal.

## Tipos de imagem

### Avatares de categoria

Os avatares ficam em `apps/web/public/avatars/pets/`.

- `*.png`: arquivos fonte/originais, mantidos para edição, comparação ou uso futuro em materiais maiores.
- `*.webp`: versões otimizadas usadas diretamente na interface do app.

O campo `avatarImage` em `apps/web/src/config/species.ts` deve apontar para os arquivos `.webp`, não para os `.png`. Os PNGs não devem ser usados diretamente na interface porque são mais pesados e prejudicam carregamento, especialmente em telas com várias categorias.

Uso permitido:

- Home
- Explorar
- Seletores de categoria ou espécie
- Atalhos visuais de navegação

### Fotos reais educativas

As fotos reais ficam em `apps/web/public/images/`, organizadas por espécie.

O campo `coverImage` em `apps/web/src/config/species.ts` deve continuar apontando para fotos reais. Essas imagens representam a realidade visual do animal e sustentam a proposta educativa do produto.

Uso obrigatório:

- Catálogos específicos por espécie
- Fichas educativas
- Páginas de raça ou detalhe
- Adoção responsável
- Conteúdos de saúde, manejo, porte, comportamento e legislação

## Riscos de mistura indevida

Usar ilustrações em conteúdo educativo pode reduzir a percepção de seriedade, principalmente em temas como saúde, bem-estar, legislação, fauna silvestre e responsabilidade de adoção.

Também pode criar uma expectativa falsa sobre o animal. O tutor precisa ver imagens reais para entender porte, aparência, variação física e contexto de cuidado antes de tomar decisões.

## Diretriz de implementação

- `avatarImage`: navegação e categorias, sempre com `.webp`.
- `coverImage`: informação educativa, sempre com foto real.
- PNGs de avatar: manter como fonte, não usar diretamente na interface.
- WebPs de avatar: usar na interface por performance.

Essa separação preserva o equilíbrio do produto: entrada amigável, conteúdo confiável.
