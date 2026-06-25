# Project Context — PetCareTutor.com

## Resumo executivo

PetCareTutor.com é uma plataforma educacional para tutores de animais. O projeto nasceu como PetCare Responsável, um MVP full stack com catálogo de espécies, fichas educativas, cadastro de pets, perfil do tutor, lembretes e simulação de adoção responsável.

A nova direção estratégica expande o produto para uma plataforma de crescimento e monetização com três pilares:

1. Educação
2. Ferramentas para tutores
3. Monetização por afiliados

## Produto atual

O MVP já possui:

- Catálogo de 13 grupos de animais
- 132 fichas completas de espécies, raças ou variedades
- Cadastro de pets
- Cadastro de tutores
- Lembretes de vacinação
- Lembretes de alimentação
- Lembretes de consultas veterinárias
- Lembretes de medicação
- Conteúdo educativo sobre posse responsável
- Simulador educativo de adoção responsável
- PWA básico

## Tese de mercado

O nicho pet combina alta recorrência, forte componente emocional, grande volume de busca orgânica e demanda constante por produtos. Tutores pesquisam antes e depois da aquisição do animal: escolha da espécie, custos, alimentação, comportamento, saúde preventiva, acessórios e rotina.

O PetCareTutor.com captura essa jornada com conteúdo confiável e ferramentas práticas, monetizando a intenção de compra por afiliados sem assumir operação de marketplace.

## O que o produto não é

O projeto não deve virar:

- Marketplace entre pessoas
- Plataforma de venda direta de animais
- Intermediador de adoções
- Chat entre compradores, vendedores, adotantes ou doadores
- Operação de checkout, entrega, pagamento ou garantia

Essa restrição reduz fraude, golpes, moderação e responsabilidade jurídica.

## Modelo de negócio

O modelo principal é afiliado editorial.

Fluxo:

```text
Usuário -> Conteúdo educativo -> Produto recomendado -> Loja parceira
```

Exemplos de parceiros:

- Petz
- Cobasi
- Amazon
- Mercado Livre
- Programas de afiliados pet

Categorias comerciais:

- Ração
- Coleiras
- Peitorais
- Brinquedos
- Caixas de transporte
- Produtos veterinários e preventivos
- Itens de higiene
- Enriquecimento ambiental
- Produtos para aquários, gaiolas e terrários

## Estratégia de aquisição

Topo do funil:

- TikTok
- Instagram Reels
- YouTube Shorts

Temas:

- Erros comuns de tutores
- Curiosidades sobre espécies
- Produtos essenciais
- Mitos e verdades
- Comparativos
- Custos reais de cada animal
- Alertas de compra ou adoção impulsiva

Meio do funil:

- Artigos
- Guias
- Fichas
- Conteúdos educativos
- Ferramentas de perfil e lembretes

Fundo do funil:

- Produtos recomendados
- Comparativos comerciais responsáveis
- Checklists de compra
- Links de afiliado para lojas parceiras

## Estratégia de IA

O AI Content Intelligence Engine deve monitorar conteúdo viral do nicho pet e transformar sinais de engajamento em pautas, roteiros, artigos e páginas programáticas.

Fluxo:

1. Buscar vídeos virais
2. Extrair metadados
3. Baixar áudio quando permitido
4. Transcrever
5. Identificar padrões de engajamento
6. Gerar insights
7. Sugerir novos conteúdos

Stack planejada:

- YouTube Data API para busca, ranking e tendências
- Whisper para transcrição
- Pandas para organização de dados
- LangChain para agentes, memória, contexto e decisões
- LLM local com Llama, Qwen ou DeepSeek

## Infraestrutura

Na fase MVP, a execução deve ser local. Hardware alvo: RTX 4070 ou superior.

Não há necessidade inicial de VPS, AWS, Azure ou Google Cloud para a camada de inteligência. Escalar infraestrutura apenas quando houver tráfego real, receita validada ou gargalo operacional.

## Indicadores estratégicos

- Tráfego orgânico
- Cliques em afiliados
- Receita por mil visitas
- CTR de recomendações
- Pets cadastrados
- Lembretes criados
- Simulações feitas
- Retenção semanal
- Conteúdos publicados
- Vídeos com alto engajamento
- Pautas geradas por IA convertidas em conteúdo
