# Contexto — PetCareTutor.com / PetCare Responsável

## Nova visão oficial

O PetCareTutor.com não é apenas uma plataforma educativa. A visão atual combina educação, ferramentas para tutores, crescimento por conteúdo e monetização por afiliados.

O produto passa a operar em três pilares:

1. **Educação:** reduzir adoções impulsivas, compra mal informada e abandono ao explicar porte, comportamento, custos, necessidades e cuidados antes da decisão.
2. **Ferramentas para tutores:** apoiar a rotina de cuidado com cadastro de pets, cadastro de tutores e lembretes de vacinação, alimentação, consultas veterinárias e medicação.
3. **Monetização por afiliados:** recomendar produtos relevantes dentro do contexto educativo e direcionar o usuário para lojas parceiras. A venda ocorre fora da plataforma.

O fluxo comercial oficial é: **usuário → conteúdo → produto recomendado → loja parceira**.

O produto não será marketplace entre pessoas, não venderá animais, não fará venda direta, não intermediará adoções e não oferecerá comunicação direta entre usuários. Essa decisão reduz exposição a fraude, golpes e responsabilidade jurídica.

## O problema do abandono

Milhões de animais são abandonados todos os anos no Brasil e no mundo. Muitos tutores adotam ou compram um pet sem entender o compromisso de longo prazo — tempo, espaço, custos financeiros e paciência necessários para cuidar bem do animal.

## Falta de informação antes da adoção

Antes de trazer um pet para casa, muitas pessoas não pesquisam:
- Porte adulto e necessidade de espaço
- Nível de energia e tempo de passeio ou enriquecimento
- Compatibilidade com apartamento, crianças ou outros animais
- Cuidados de saúde, alimentação e higiene específicos da espécie ou raça
- Custos recorrentes (ração, veterinário, acessórios, licenças quando aplicável)

Essa lacuna leva a frustração, comportamentos indesejados mal gerenciados e, infelizmente, ao abandono.

## Diferenças entre espécies e raças

Cada espécie e cada raça possui características distintas:
- **Porte:** de pequeno (hamster) a gigante (Cane Corso)
- **Energia:** de baixa (Bulldog) a muito alta (Border Collie)
- **Comportamento:** sociabilidade, treinabilidade, relação com crianças
- **Saúde:** predisposições genéticas, vacinas, peso ideal, cuidados preventivos
- **Ambiente:** aquário, gaiola, terrário, apartamento ou casa com quintal
- **Aspectos legais:** aves de rapina e fauna silvestre exigem documentação e autorização dos órgãos ambientais competentes

Ignorar essas diferenças é uma das principais causas de incompatibilidade tutor-animal.

## Falta de rotina

Sem lembretes e organização, tutores esquecem vacinas, vermífugos, consultas e cuidados diários. A rotina inconsistente prejudica a saúde e o bem-estar do pet.

## Objetivo educativo do app

O PetCare Responsável é uma ferramenta educativa que:
1. Apresenta **132 fichas** em **13 espécies** (cães, gatos, peixes, hamsters, aves, coelhos, tartarugas, twisters, porquinhos-da-índia, chinchilas, gerbis, furões e lagartos)
2. Ajuda tutores a cadastrar seus pets e organizar lembretes
3. Oferece um simulador de adoção responsável
4. Disponibiliza roteiro de demo/pitch em `/demo` para apresentações

> O app transforma informação em cuidado prático.

## Objetivo de crescimento

O crescimento deve partir de conteúdo curto e educativo em TikTok, Instagram Reels e YouTube Shorts, levando usuários para PetCareTutor.com. No site, artigos, guias e fichas aprofundam confiança; recomendações de produtos fazem a conversão por afiliados.

Temas prioritários de aquisição:
- Erros comuns de tutores
- Curiosidades sobre espécies
- Produtos essenciais por espécie e fase de vida
- Mitos e verdades
- Comparativos de raças, espécies, acessórios e rotinas
- Guias de custo e preparação antes da adoção ou compra

## Escopo do catálogo (piloto)

| Espécie | Fichas |
|---------|--------|
| Cães | 30 |
| Gatos | 20 |
| Peixes | 10 |
| Hamsters | 5 |
| Aves | 23 |
| Coelhos | 8 |
| Tartarugas | 7 |
| Twisters (ratos) | 4 |
| Porquinhos-da-índia | 6 |
| Chinchilas | 4 |
| Gerbis | 4 |
| Furões | 4 |
| Lagartos | 7 |

A navegação principal passa por **Explorar Pets** (`/explore`), com cards visuais por espécie e fichas detalhadas em React (mobile-first). O HTML estático em `public/generated/` permanece como saída legada/offline, sem CTA no app.

## Experiência visual

- Layout mobile-first com PWA básico (instalável no celular)
- Tema claro/escuro com alternância na barra superior
- Fotos ilustrativas por raça (`.webp` em `/images/{espécie}/{slug}.webp`), com fallback SVG e emoji
- Fonte das imagens: Wikipedia e Wikimedia Commons (licenças abertas); créditos em `imageAttributions.json`
- Componente `AnimalImage` com cascata de fallback até emoji

## Papel preventivo

O app atua preventivamente, antes que o tutor tome uma decisão irreversível ou negligencie cuidados essenciais. Não é marketplace, não vende animais e não conecta compradores, vendedores ou adotantes. Educa, organiza e recomenda produtos úteis com transparência editorial.

## Aviso importante

**Este app oferece informações educativas e não substitui orientação veterinária.** Para diagnósticos, tratamentos e decisões clínicas, consulte sempre um médico veterinário.

Toda seção de saúde nas fichas deve conter aviso discreto reforçando esse limite.

## Público-alvo

- Tutores iniciantes
- Famílias com crianças
- Pessoas pensando em adotar
- Protetores independentes
- ONGs como parceiras educativas (futuro, sem intermediação de adoções)
- Clínicas veterinárias (futuro)
- Pet shops (futuro)

## Stack e restrições do MVP

- Node.js + Express + MongoDB no backend; React + Vite + TypeScript + Tailwind no frontend
- Sem autenticação real (`DEMO_USER_ID` simula usuário)
- Sem APIs externas obrigatórias em runtime
- Sem Next.js nem banco relacional

## Infraestrutura estratégica

Na fase MVP, a execução estratégica de IA e automação deve permanecer local, com hardware alvo RTX 4070 ou superior. Não há necessidade inicial de VPS, AWS, Azure ou Google Cloud para o motor de inteligência de conteúdo. Escalar infraestrutura apenas quando houver tráfego real, receita validada ou gargalo comprovado.
