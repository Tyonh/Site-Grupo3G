# Tech Stack & Padrões Globais

Este documento define e justifica a stack tecnológica adotada para o **Site Principal do Grupo 3G**, estabelecendo as regras de conformidade e qualidade de código exigidas no projeto.

## 1. Stack Tecnológica
A arquitetura de software é dividida nas seguintes camadas principais:

### Frontend & Core Framework
- **Next.js 14/15 (App Router)**: Adotado para permitir `[[decisions#ADR 001: Arquitetura Next.js App Router e Server Components|React Server Components (RSC)]]` nativos, garantindo que toda a página institucional e dados estruturados de SEO sejam renderizados no servidor, deixando para o cliente apenas a interatividade pesada do canvas 3D.
- **TypeScript**: Tipagem estática estrita em todo o ciclo de vida do projeto, eliminando runtime exceptions durante manipulações de matrizes WebGL e renderização de dados de produtos.
- **Tailwind CSS**: Estilização baseada em utilitários de alto desempenho, eliminando CSS extra desnecessário e permitindo a rápida replicação da identidade visual institucional.

### Renderização 3D e Gráficos
- **Three.js / React Three Fiber (R3F)**: Abstração declarativa do WebGL que permite integrar a cena 3D ao ciclo de vida do React.
- **@react-three/drei**: Biblioteca de utilitários auxiliares (ScrollControls, Stage, OrbitControls) para implementação rápida do scrollytelling do produto.

### Backend & Integrações
- **Node.js (API Routes do Next.js)**: Utilizado para rotas internas seguras de e-mail e persistência rápida de leads sem necessidade de infraestrutura de microsserviços separada.
- **Nginx & PM2 (Ambiente Linux)**: Estrutura recomendada para hospedagem em VPS (Ubuntu), onde o PM2 gerencia as instâncias Node.js rodando o Next.js em modo produção (`next start`), e o Nginx atua como proxy reverso com SSL e compressão gzip/brotli ativas.

---

## 2. Padrões de Qualidade e Código (Linting & Formatting)
Para garantir a uniformidade entre contribuições de desenvolvedores e agentes de IA, aplicamos as seguintes regras:

### TypeScript & Linting (Strict Mode)
Configurações obrigatórias no `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Regras obrigatórias do `eslint.config.mjs`:
- Proibido o uso de `any` explícito (`@typescript-eslint/no-explicit-any`: "error").
- Uso obrigatório de arrow functions para componentes React funcionais.
- Imports absolutos obrigatórios utilizando o alias `@/*` (`@/components`, `@/app`, etc.).

### Organização de Estilos (Tailwind)
- **Ordenação de classes**: Seguir o padrão oficial de agrupamento (Layout -> Display -> Box Model -> Typography -> Visuals -> Transitions).
- **Consistência de Cores**: Proibido o uso de cores hexadecimais avulsas (ad-hoc) no código. Utilizar exclusivamente a paleta registrada no `tailwind.config.ts` (ex: `text-brand-red`, `bg-brand-light`, `border-brand-dark`).

---

## 3. Rastreabilidade com Obsidian
- Qualquer alteração na stack tecnológica deve gerar um novo documento de decisão arquitetural (`[[decisions#Lista de ADRs|ADRs]]`).
- Erros de performance ou de renderização WebGL identificados em ambiente de desenvolvimento devem ser mapeados segundo o `[[observability#Mapeamento de Erros e Logs|Modelo de Observabilidade]]`.
