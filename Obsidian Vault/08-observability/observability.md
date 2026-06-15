# Observability & Metrics Model

Este documento especifica o padrão de logs, rastreabilidade técnica e métricas de negócio para garantir a integridade operacional do Site Principal do Grupo 3G.

---

## 1. Métricas de Negócio e Conversão

A saúde do site sob o aspecto de conversão comercial é medida pelos seguintes indicadores:

- **Taxa de Conversão de Lead (LCR)**:
  $$\text{LCR} = \frac{\text{Total de Leads Enviados}}{\text{Total de Visitantes Únicos}} \times 100$$
  - Medido através do envio bem-sucedido do formulário de contato (`[[domain-model#Agregado: Lead de Venda|Lead de Venda]]`).
  
- **Cliques no WhatsApp de Categoria**: 
  - Rastreamento de qual linha de produto (Solar, Homologada, Modular, Ebron) desperta maior interesse imediato por redirecionamento direto (`[[PRD#RF003 - Solicitação de Orçamento Integrada (Conversão)|Conversão via WhatsApp]]`).

---

## 2. Métricas Técnicas de Performance (Web Vitals)

Para garantir que o scrollytelling tridimensional não degrade a experiência do usuário, monitoramos:

- **LCP (Largest Contentful Paint)**: Medido no cliente. Alvo: $< 2.5\text{s}$.
- **FPS (Frames por Segundo) do WebGL**:
  - Medição local durante a interação com o modelo 3D. 
  - Caso o FPS caia abaixo de **15 FPS** por mais de 3 segundos consecutivos, o sistema deve acionar o pipeline de fallback (`[[decisions#ADR 002: Renderização de Modelos 3D com React Three Fiber (R3F) vs Vanilla WebGL|Fallbacks de Renderização 3D]]`), substituindo o canvas dinâmico por uma sequência de imagens estáticas ou vídeo explicativo otimizado.

---

## 3. Mapeamento de Erros e Logs

Seguimos a padronização de criticidade estruturada para logs de servidor e cliente:

| Nível (Level) | Origem | Descrição | Ação Corretiva |
| :--- | :--- | :--- | :--- |
| **FATAL** | Servidor | Falha crítica que impede a subida do servidor Next.js ou crash completo do PM2. | Alerta imediato via webhook para o canal de infraestrutura/sustentação. |
| **ERROR** | Cliente/Servidor | Erro de carregamento de modelo 3D (ex: 404 no arquivo .glb) ou falha no envio de lead pela API. | Logar no monitor de erros (ex: Sentry) capturando SKU do produto e versão do browser. |
| **WARN** | Cliente | Queda na taxa de quadros (FPS < 30) ou navegador sem suporte a WebGL. | Ativar fallback visual de forma transparente para o usuário. |
| **INFO** | Servidor/Cliente | Inicialização de cena 3D, conversão de lead realizada com sucesso. | Armazenar metadados agregados para análise de funil e uso do produto. |

---

## 4. Integração Sugerida (Sentry + Google Analytics)
- **Sentry**: Monitoramento automático de exceções Javascript no lado do cliente e rejeições de requisições na API Next.js.
- **Google Analytics / Vercel Analytics**: Coleta e consolidação de Web Vitals (LCP, FID, CLS) em produção para identificar lentidões específicas em páginas de produtos.
