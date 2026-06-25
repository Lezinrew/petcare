# Spec — AI Content Intelligence Engine

## Objetivo

Monitorar conteúdo viral do nicho pet e transformar padrões de engajamento em insights, pautas, roteiros e oportunidades de SEO.

## Fluxo funcional

1. Buscar vídeos virais.
2. Extrair metadados.
3. Baixar áudio quando permitido.
4. Transcrever.
5. Identificar padrões de engajamento.
6. Gerar insights.
7. Sugerir novos conteúdos.

## Stack planejada

| Tecnologia | Responsabilidade |
|------------|------------------|
| YouTube Data API | Busca de vídeos, ranking e tendências |
| Whisper | Transcrição |
| Pandas | Organização dos dados, filtros e agrupamentos |
| LangChain | Orquestração de agentes, memória, contexto e decisões |
| Llama / Qwen / DeepSeek | LLM local em GPU para reduzir custo operacional |

## Infraestrutura

Fase MVP:

- Execução local
- Hardware alvo: RTX 4070 ou superior
- Sem necessidade inicial de VPS, AWS, Azure ou Google Cloud

Escalar apenas quando houver tráfego real, necessidade recorrente de processamento ou receita validada.

## Saídas esperadas

- Lista de temas em alta
- Padrões de gancho
- Duração e formato com melhor desempenho
- Palavras e expressões recorrentes
- Pautas para artigos
- Roteiros para vídeos curtos
- Ideias de páginas SEO programáticas
- Oportunidades de afiliados

## Governança

- Revisão humana antes de publicação.
- Respeito a direitos autorais e termos das plataformas.
- Não copiar roteiros de criadores.
- Usar tendências como inspiração analítica, não como plágio.
- Validar conteúdo de saúde, legislação e bem-estar com cuidado editorial adicional.
