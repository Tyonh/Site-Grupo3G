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
