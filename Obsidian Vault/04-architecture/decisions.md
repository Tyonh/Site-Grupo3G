# Architecture Decision Records (ADRs)

Este documento centraliza as decisões arquiteturais tomadas para o projeto do Site Principal do Grupo 3G, detalhando o contexto, alternativas consideradas e implicações de cada escolha.

---

## ADR 001: Arquitetura Next.js App Router e Server Components

### Contexto
O site precisa de excelente desempenho em SEO (Search Engine Optimization) e carregamento inicial extremamente rápido para atrair e qualificar clientes corporativos. No entanto, as páginas internas exibem modelos 3D complexos que requerem manipulação no lado do cliente.

### Decisão
Adotamos o **Next.js 14/15 App Router** com foco em **React Server Components (RSC)** por padrão.

```mermaid
graph TD
    A[Requisição HTTP] --> B[Navegador]
    B --> C[Next.js Server: RSC Render]
    C --> D[HTML Estático + Metadados SEO]
    D --> E[Desidratação no Cliente]
    E --> F[Lazy Loading: Hydrate Three.js Canvas - Client Side Only]
```

### Consequências
- **Positivas**:
  - SEO excelente: Toda a informação descritiva de produtos, cabeçalhos, títulos e dados estruturados (JSON-LD) é renderizada no servidor e entregue como HTML puro.
  - Redução drástica do First Contentful Paint (FCP) inicial.
- **Negativas**:
  - Aumenta a complexidade de desenvolvimento, pois exige a demarcação estrita de fronteiras de componentes cliente (`"use client"`) para os sub-componentes que renderizam as cenas 3D.

---

## ADR 002: Renderização de Modelos 3D com React Three Fiber (R3F) vs Vanilla WebGL

### Contexto
O site necessita de scrollytelling 3D interativo de alta fidelidade para demonstrar o design mecânico dos produtos (luminárias). A equipe de desenvolvimento precisa codificar essas interações de forma produtiva, testável e manutenível.

### Alternativas Consideradas
1. **Vanilla WebGL/Three.js**: Manipulação direta do DOM Canvas e loop de animação manual.
2. **React Three Fiber (R3F) + Drei**: Abstração declarativa em React que integra a cena ao ciclo de vida dos componentes.
3. **Spline Tool Web Components**: Renderização via iframe ou exportação directa de biblioteca de terceiros.

### Decisão
Decidimos por **React Three Fiber (R3F) + Drei** devido à sua modularidade e excelente integração com o ecossistema React.

### Consequências
- **Positivas**:
  - **Produtividade**: Permite declarar câmeras, luzes e malhas como tags React (`<ambientLight />`, `<mesh />`), simplificando a composição da cena.
  - **Scroll Integrado**: O uso de utilitários como `<ScrollControls>` do Drei permite amarrar a timeline de animações do modelo 3D ao scroll nativo de forma extremamente declarativa.
  - **Lazy Loading facilitado**: Componentes R3F podem ser importados dinamicamente via `next/dynamic` apenas quando entram na viewport (`[[PRD#Performance & Web Vitals (P0)|NFR - Lazy Loading]]`).
- **Negativas**:
  - Sobrecarga (overhead) no tamanho do bundle javascript (cerca de ~150KB gzip somando Three.js + R3F), exigindo uma rigorosa política de lazy loading para mitigar atrasos no LCP.

---

## ADR 003: Armazenamento e Compressão de Assets 3D (GLTF/GLB)

### Contexto
Cada arquivo 3D gerado pelo time de design em formato GLTF/GLB possui alta contagem de polígonos e materiais pesados, gerando arquivos de 10MB a 35MB. Isso viola os `[[PRD#Performance & Web Vitals (P0)|Requisitos Não Funcionais (NFRs)]]` de performance de carregamento (< 2MB).

### Decisão
Implementar um pipeline obrigatório de pré-processamento de modelos 3D usando compressão **Draco** e simplificação de malha via `gltf-pipeline` e `gltfjsx` antes de commitar no repositório.

### Consequências
- **Positivas**:
  - Redução de até 90% no peso do arquivo final.
  - Economia de banda de rede do servidor e carregamento quase instantâneo para o usuário.
- **Negativas**:
  - Exige que os desenvolvedores tenham ferramentas Node cli locais instaladas (`gltf-pipeline`) ou usem um script de conversão durante a esteira de build (`[[tasks#TASK-002: Desenvolvimento do Core de Scrollytelling 3D|TASK-002]]`).
  - Ligeira perda de detalhes microscópicos da luminária, que é imperceptível na visualização web standard.

---

## ADR 004: Engenharia e Otimização de Vídeos Web de Alta Performance

### Contexto
O site substitui e complementa malhas 3D por mídias em vídeo de alta definição para apresentação de produtos (linha Natal, Iluminação Solar, EBRON e institucional). Contudo, a reprodução de múltiplos vídeos em navegadores móveis enfrenta desafios severos: políticas rígidas de autoplay no iOS/Safari (Modo de Baixo Consumo), consumo desnecessário de CPU/GPU com múltiplos players rodando simultaneamente, fundos brancos opacos recortados e persistência de cache ao atualizar arquivos em disco.

### Decisão
Estabelecer um padrão unificado de arquitetura e aplicação de vídeos (`[[video-architecture|video-architecture.md]]`):
1. **Autoplay Resiliente**: Uso sistemático do hook `useAutoplayVideo`, que garante propriedades `muted`/`defaultMuted` nativas antes do `.play()` e ativação reativa silenciosa no primeiro gesto (`touchstart`, `pointerdown`, `scroll`).
2. **Integração Visual sem Canal Alfa**: Uso da classe CSS `mix-blend-multiply` com fundo base sincronizado e máscara de gradiente (`maskImage`) para integrar vídeos de produto com fundo branco puro diretamente na página, evitando arquivos WebM pesados e incompatíveis.
3. **Pilha de Vídeos Econômica para Configuradores**: No componente `ProductColorVideo`, empilhar vídeos de cada cor, mantendo ativos apenas `video.play()` da cor selecionada e `video.pause()` nos demais, com transições em crossfade (`transition-[opacity,transform,filter]`) e ARIA tablist acessível.
4. **Mascaramento Dinâmico em Shader/CSS**: No `SolarBackground`, alternar entre vídeos diurno e noturno via `WebkitMaskImage` controlado pelo scroll do usuário.
5. **Cache-Busting em Build Time**: Uso da função `versioned()` com base no `mtime` dos arquivos em `public/`, prevenindo entrega de mídia obsoleta.

### Consequências
- **Positivas**:
  - Autoplay infalível no ecossistema iOS e Android sem botões de play invasivos.
  - Baixíssimo consumo de memória e bateria em dispositivos móveis.
  - Fidelidade visual premium sem necessidade de renderização 3D contínua.
- **Negativas**:
  - Requer que vídeos para o modo `mix-blend-multiply` tenham fundo branco perfeitamente estourado (#FFFFFF).
  - Vídeos volumosos devem ser transferidos manualmente para a VPS em diretório ignorado pelo Git.

