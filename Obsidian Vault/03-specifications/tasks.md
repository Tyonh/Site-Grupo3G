# Especificação de Tarefas & Definition of Done (DoD)

Este documento centraliza as tarefas de engenharia necessárias para evoluir o Site Principal do Grupo 3G, associando-as ao `[[domain-model|Modelo de Domínio]]` e definindo os critérios de qualidade para aceitação.

---

## TASK-001: Correção e Refatoração de Estilos Globais e Layout Semântico

### Descrição
Refatorar a estrutura do layout base e os componentes de exibição (`HeroSlider`, `ProductsSection`, `GallerySection`, `Footer`) do Next.js utilizando as diretrizes de estilização do Tailwind v4 (`[[tech-stack#Organização de Estilos (Tailwind)|Padrões Globais]]`).

### Relação com o Domínio
- Vinculado ao `[[domain-model#Agregado: Catálogo de Produtos|Agregado: Catálogo]]` e `[[PRD#RF001 - Home Page e Linhas de Produto|RF001 - Home Page]]`.

### Definition of Done (DoD)
- [ ] **Semântica HTML5**: Uso correto de `<header>`, `<main>`, `<section>`, `<article>` e `<footer>`.
- [ ] **Acessibilidade (a11y)**: Todas as imagens e links possuem rótulos descritivos (`alt` ou `aria-label`).
- [ ] **Estilos Limpos**: Ausência de estilos inline arbitrários. Todas as cores são referenciadas através da paleta oficial do tema.
- [ ] **Validação de Build**: Execução sem warnings ou erros ao rodar `npm run build`.
- [ ] **Coerência Responsiva**: Sem quebras visuais em telas de 320px até 1920px de largura.

---

## TASK-002: Desenvolvimento do Core de Scrollytelling 3D

### Descrição
Implementar o motor de visualização tridimensional na página de produtos utilizando `React Three Fiber` e `@react-three/drei`. O modelo 3D deve sofrer rotação, translação de câmera e desmontagem estrutural (vista explodida) baseado na rolagem da página (`[[project-overview#3. O Golden Path (Caminho de Ouro)|Golden Path de Experiência]]`).

### Relação com o Domínio
- Vinculado à `[[domain-model#Entidade Associada: Modelo 3D Interativo|Entidade: Modelo 3D Interativo]]` e `[[PRD#RF002 - Catálogo Interativo 3D (Scrollytelling)|RF002 - Scrollytelling]]`.

### Definition of Done (DoD)
- [ ] **Otimização de Assets**: Todos os arquivos `.glb` convertidos usando compressão Draco e tamanho final $< 2\text{MB}$ (`[[decisions#ADR 003: Armazenamento e Compressão de Assets 3D (GLTF/GLB)|ADR 003]]`).
- [ ] **Performance de Renderização**: A taxa de quadros (FPS) deve se manter acima de 45 FPS em desktops comuns e 30 FPS em dispositivos mobile.
- [ ] **Sistema de Fallback**: Caso o navegador não ofereça suporte a WebGL, renderizar uma imagem estática otimizada de substituição ou renderização 2D estática sem crashar o site (`[[observability#2. Métricas Técnicas de Performance (Web Vitals)|Mapeamento de Fallback]]`).
- [ ] **Lazy Loading**: O bundle do Canvas 3D deve ser importado via `next/dynamic` com `ssr: false` para não atrasar o carregamento inicial da página.
- [ ] **TDD/Testes Unitários**: Testar a função utilitária de interpolação matemática de scroll (`calcularInterpolacaoScroll`) garantindo que retorne valores numéricos válidos (não `NaN`) para qualquer valor de entrada de offset.

---

## TASK-003: Implementação de Captura de Leads e Integração WhatsApp

### Descrição
Criar o endpoint de API interna no Next.js para sanitização e validação de leads corporativos de orçamentos, integrando-o ao formulário do frontend e gerando link dinâmico para contato direto via WhatsApp comercial (`[[project-overview#2. Objetivos de Negócio|Objetivos: Leads]]`).

### Relação com o Domínio
- Vinculado ao `[[domain-model#Agregado: Lead de Venda|Agregado: Lead de Venda]]` e `[[PRD#RF003 - Solicitação de Orçamento Integrada (Conversão)|RF003 - Leads]]`.

### Definition of Done (DoD)
- [ ] **Segurança (Sanitização e Validação)**: Implementar esquema de validação estrito com a biblioteca `Zod` na API Route (`[[security-model#2. Sanitização e Validação de Inputs|Validação com Zod]]`).
- [ ] **LGPD Compliance**: Presença do checkbox obrigatório de consentimento nos formulários e armazenamento seguro dos dados (`[[security-model#1. Proteção de Dados (LGPD)|Segurança - LGPD]]`).
- [ ] **Fluxo de Fallback de Rede**: Caso a chamada da API do formulário falhe, o frontend deve reter os dados e redirecionar o usuário para o WhatsApp comercial com uma mensagem de fallback pré-preenchida para evitar perda do lead.
- [ ] **Monitoramento**: Inclusão de disparos de rastreamento de evento no Google Analytics/Vercel Analytics ao clicar no botão "Enviar/WhatsApp" (`[[observability#1. Métricas de Negócio e Conversão|Métricas de Conversão]]`).
- [ ] **Testes de Integração**: Teste automatizado simulando requisições com dados válidos (sucesso 200) e inválidos (erro 400).

---

## TASK-004: Acessibilidade da página `/natal`

<!-- Origem: auditoria de acessibilidade feita em 2026-11 (código + navegador). -->

### Definition of Done (DoD)
- [ ] **Pausar movimento (WCAG 2.2.2)**: o `MotionToggle` também deve parar as estrelinhas e a seta "Rolar" do hero e o anel pulsante do WhatsApp flutuante (hoje só pausa vídeos).
- [ ] **Sem JavaScript**: hero e link "Pular para o conteúdo" não podem depender da hidratação para aparecer.
- [ ] **Nome dos links dos painéis**: nomear o link só pelo título da categoria, não pelo texto inteiro.
- [ ] **`prefers-reduced-motion`**: os painéis com animação por rolagem (`ScrollScrubPanel`) devem respeitar a preferência.
- [ ] **Texto pequeno**: kickers de 10 px e descrições `font-light` de 12 px devem ser aumentados.
- [ ] **Foco e menu**: botões fixos não podem cobrir o elemento focado (2.4.11); avisar links `target="_blank"`; rotular os `nav`.
- [ ] **Contraste sobre vídeo/gradiente**: medir manualmente (só o texto sobre fundo sólido foi medido: pior caso 6,45:1).

---

## TASK-005: Unificar tipografia e linguagem visual entre home e `/natal`

### Definition of Done (DoD)
- [ ] Decidir a fonte única do site (hoje: Poppins no site, Inter Tight só na home).
- [ ] Trocar o hero do `/natal` (fundo cinza-claro) por um hero escuro com vídeo (ex.: drone de Natal) e passar a barra dele para `variant="overlay"`.
- [ ] Revisar o ritmo claro/escuro das seções do `/natal` (as luzes de LED aparecem melhor no escuro).
- [ ] Remover `components/Navbar.tsx` e `components/ebron/EbronNavbar.tsx`, hoje sem uso.

---

## TASK-006: Revisão contra as Web Interface Guidelines (Vercel)

<!-- Origem: revisão de 2026-11 (buscas por regra no projeto todo + leitura dos componentes principais). Não cobriu linha a linha components/3d/* nem lib/natal/*. -->

### Feito
- [x] **Altura de viewport**: `h-screen`/`min-h-screen` → `h-svh`/`min-h-svh` (páginas de produto, `sobre`, `SolarBackground`, `Product3DScene`, `ProductFamilyHero`, `productTheme`).
- [x] **Barra**: links internos com `next/link`, `onClick` movido do `<li>` para o link, foco visível.
- [x] **Animação**: `transition-all` → lista de propriedades em `lib/productTheme.tsx`; `motion-safe:` em `animate-pulse` (`modulo`, `sobre`) e no spinner (`CanvasLoader`).
- [x] **Tipografia**: `text-balance` nos títulos da home, do hero e dos h2 do `/natal`.
- [x] **Área segura**: botões fixos (`FloatingWhatsApp`, `MotionToggle`) usam `env(safe-area-inset-*)`; `viewport` com `viewportFit: "cover"` e `themeColor`.
- [x] **Mosaico**: categoria do tile de 10,4 px/`white/70` → 11,2 px (12 px em `sm`)/`white/85`.
- [x] **Vídeo**: removido o `type="video/mp4"` incorreto do `.mov` em `VideoFeatureSection`.

### Pendente
- [ ] **Legendas** do vídeo de `VideoFeatureSection` (`<track kind="captions">`): precisa do arquivo `.vtt` com a fala real do vídeo — não inventar.
- [ ] **Poster** do mesmo vídeo usa a logo (`/3G VETOR branco.png`); trocar por um quadro do próprio vídeo, se a empresa aprovar.
- [ ] `HomologadaInstallScene.tsx:123` usa `100vh` dentro de `calc` (enquadramento da foto); testar `100svh` em aparelho real.
- [ ] `alt` das imagens do mosaico repete o título visível (`MosaicGallery.tsx`); decidir se vira `alt=""`.
- [ ] Movimento infinito que ignora o `MotionToggle` (ver TASK-004).
- [ ] Revisar `components/3d/*` e `lib/natal/*`, que não foram lidos linha a linha.
