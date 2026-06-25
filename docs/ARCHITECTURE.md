# Architecture — PetCareTutor.com

## Arquitetura atual do MVP

```text
Browser / Mobile / PWA
        |
        v
React + Vite + TypeScript + Tailwind
        |
        v
REST API Node.js + Express + TypeScript
        |
        v
MongoDB via Mongoose
```

O MVP é um monorepo com frontend e backend separados em `apps/web` e `apps/api`, usando comunicação REST JSON.

## Domínios atuais

- Catálogo educativo de animais
- Perfil do tutor
- Pets cadastrados
- Lembretes de cuidado
- Simulador educativo de adoção responsável
- PWA e experiência mobile-first

## Domínios estratégicos futuros

### Conteúdo e SEO

Camada responsável por blog, guias, checklists, páginas programáticas e interlinking entre artigos, fichas e ferramentas.

### Afiliados

Camada responsável por recomendações editoriais de produtos, tracking de cliques, disclosures e saída para lojas parceiras.

O PetCareTutor.com não processa pagamentos, não mantém carrinho, não controla estoque e não presta suporte de entrega.

### AI Content Intelligence Engine

Camada local de inteligência para detectar tendências e sugerir conteúdo.

```text
YouTube Data API
        |
        v
Coleta de vídeos e metadados
        |
        v
Áudio permitido pela fonte
        |
        v
Whisper
        |
        v
Transcrições
        |
        v
Pandas
        |
        v
Datasets e métricas
        |
        v
LangChain
        |
        v
Agentes e memória
        |
        v
LLM local
        |
        v
Insights, roteiros e pautas
```

## Stack futura de automação

| Tecnologia | Papel |
|------------|-------|
| YouTube Data API | Busca de vídeos, ranking e tendências |
| Whisper | Transcrição de áudio |
| Pandas | Organização, filtros e agrupamentos |
| LangChain | Orquestração de agentes, memória e decisões |
| Llama / Qwen / DeepSeek | LLM local para reduzir custo operacional |

## Decisão de infraestrutura

Na fase MVP, a automação de IA deve rodar localmente. Hardware alvo: RTX 4070 ou superior.

Sem necessidade inicial de VPS, AWS, Azure ou Google Cloud para essa camada. Escalar apenas quando houver tráfego real, necessidade operacional comprovada ou receita suficiente para justificar custo recorrente.

## Princípios arquiteturais

- Manter o MVP simples e local-first.
- Não adicionar dependências pesadas sem justificativa.
- Não transformar afiliados em marketplace.
- Separar conteúdo editorial de transação comercial.
- Preservar revisão humana em temas de saúde, legislação e bem-estar.
- Usar IA para acelerar pesquisa e produção, não para publicar sem curadoria.
