# Product Requirement Document (PRD) — Catálogo Digital Grupo 3G

Este PRD estabelece os requisitos de escopo, comportamento e desempenho para o desenvolvimento do Site Principal do **Grupo 3G**.

---

## 1. Requisitos Funcionais (User Stories)

### RF001 - Home Page e Linhas de Produto
- **Como** um visitante interessado em iluminação eficiente,
- **Quero** visualizar de forma clara e imersiva as 4 linhas principais de produtos fabricados (Solar, Homologada, Modular, Ebron) e ver exemplos reais de projetos luminotécnicos concluídos,
- **Para** entender a especialidade técnica do Grupo 3G no mercado nacional.
- **Detalhes Técnicos**: 
  - Grid interativo de produtos com navegação direta para suas páginas de detalhe.
  - Carrossel Hero animado e responsivo com autoplay, pausando no hover.
  - Galeria de projetos organizados em layout de 2 linhas horizontais com scroll snap (`[[tasks#TASK-001: Correção e Refatoração de Estilos Globais e Layout Semântico|TASK-001]]`).

### RF002 - Catálogo Interativo 3D (Scrollytelling)
- **Como** um engenheiro eletricista ou tomador de decisão (compras B2B),
- **Quero** interagir com um modelo 3D fidedigno da luminária através do scroll da página, vendo suas partes internas desmontarem ou a câmera focar em componentes específicos,
- **Para** analisar a qualidade construtiva da luminária (dissipação térmica, fixadores, painel de LEDs e drivers).
- **Detalhes Técnicos**:
  - Implementado usando `[[tech-stack#Three.js / React Three Fiber|Three.js / React Three Fiber]]`.
  - Controle de renderização baseado no offset de rolagem vertical da página, com transições matemáticas suaves (Lerp).

### RF003 - Solicitação de Orçamento Integrada (Conversão)
- **Como** um cliente corporativo (B2B),
- **Quero** enviar meus dados de contato (Nome, E-mail, Telefone) diretamente para o WhatsApp comercial da empresa já informando qual o SKU de interesse,
- **Para** receber um orçamento customizado ou agendar um estudo luminotécnico.
- **Detalhes Técnicos**:
  - Roteamento inteligente de leads gerando links pré-formatados com a mensagem correspondente ao SKU consultado (`[[domain-model#Agregado: Lead de Venda|Lead de Venda]]`).

---

## 2. Requisitos Não Funcionais (NFRs)

### Performance & Web Vitals (P0)
- **Tempo de Carregamento da Página (LCP)**: < 2.5 segundos em rede móvel 4G estável.
- **Tamanho dos Arquivos 3D**: Cada modelo 3D (.glb) não deve ultrapassar **2MB**. Modelos acima deste valor devem passar por compressão DRACO (`gltf-pipeline`).
- **Frames por Segundo (FPS)**: O canvas 3D deve rodar estável a pelo menos **45 FPS** em dispositivos intermediários Android/iOS.
- **Lazy Loading**: O carregamento do canvas 3D e seus bundles (`Three.js`) deve ser adiado até que a seção de interação se aproxime da viewport do usuário (`dynamic` import com `ssr: false` no Next.js).

### Segurança e Privacidade (P1)
- **LGPD (Lei Geral de Proteção de Dados)**: Nenhum dado pessoal inserido no formulário de leads deve ser persistido em arquivos de log sem criptografia ou hashing (`[[security-model#1. Proteção de Dados (LGPD)|Segurança - LGPD]]`).
- **Comunicação Segura**: Obrigatoriedade de HTTPS ativo em todas as chamadas de API e rotas do site.

### Acessibilidade (a11y) & SEO (P1)
- **SEO Estruturado**: Marcação JSON-LD do tipo `Product` e `LocalBusiness` em todas as páginas de produtos.
- **Alt Text nas Imagens**: Todas as imagens estáticas devem conter descrições detalhadas no atributo `alt` para leitores de tela e indexadores de busca.
- **Acessibilidade no Canvas**: Fallback textual descrevendo o modelo 3D para navegadores que não suportam WebGL.
