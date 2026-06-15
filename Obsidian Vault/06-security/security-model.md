# Security & Compliance Model

Este documento descreve as políticas de segurança da informação, conformidade legal com a **LGPD** e mitigação de vulnerabilidades tecnológicas aplicadas ao Site Principal do Grupo 3G.

---

## 1. Proteção de Dados (LGPD)

O site captura informações de contato de prospects corporativos através de formulários de orçamentos. Sob a Lei Geral de Proteção de Dados (LGPD), o Grupo 3G atua como Controlador de dados.

### Políticas de Consentimento
- **Opt-in Explícito**: O formulário de captura de leads deve apresentar um checkbox obrigatório e não pré-marcado contendo a declaração clara de consentimento de uso dos dados para fins de contato comercial (`[[domain-model#Agregado: Lead de Venda|Lead de Venda]]`).
- **Política de Privacidade**: Link direto e acessível para a declaração de privacidade da empresa no rodapé do site (`[[PRD#RF001 - Home Page e Linhas de Produto|Rodapé / Footer]]`).

### Armazenamento e Logs
- **Não-persistência local desprotegida**: Nenhum dado de lead preenchido pelo usuário (Nome, Telefone, E-mail) deve ser guardado em arquivos locais do servidor (ex: arquivos de texto `.log`) sem encriptação prévia.
- **Rastreabilidade**: Caso o formulário envie os dados para um banco de dados, o identificador do lead (`LeadId`) deve ser criptografado em repouso (AES-256).

---

## 2. Sanitização e Validação de Inputs

Para prevenir ataques clássicos de injeção de scripts (XSS) e injeção de cabeçalhos de email através de chamadas de API do Next.js:

### Regras de Sanitização de Formulários
- **Validação de Tipos (TypeScript)**: Tipar de forma estrita todos os payloads de requisição da API de contatos utilizando schemas (ex: Zod).
- **Sanitização de HTML**: Todos os caracteres inseridos no campo "Mensagem" devem passar por conversão/escape de caracteres especiais (ex: `&lt;`, `&gt;`, `&quot;`) para evitar a execução de scripts maliciosos injetados pelo cliente.
  
Exemplo prático de validação com Zod:
```typescript
import { z } from 'zod';

export const LeadSchema = z.object({
  nome: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  telefone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  mensagem: z.string().max(500).trim(),
  interesseSku: z.string().min(3).max(50)
});
```

---

## 3. Segurança de Infraestrutura (Nginx & PM2)

A hospedagem do site em ambiente de produção (Ubuntu Linux) deve seguir as seguintes diretrizes de segurança:

- **Cabeçalhos de Segurança (Security Headers)**: O Nginx deve ser configurado para enviar cabeçalhos que blindem o navegador contra ataques comuns:
  - `Content-Security-Policy (CSP)`: Restringe a origem dos scripts, estilos e conexões WebGL permitidas.
  - `X-Frame-Options: DENY`: Evita ataques de Clickjacking.
  - `X-Content-Type-Options: nosniff`: Força o navegador a respeitar o MIME type retornado.
  
- **Limitação de Taxa de Requisição (Rate Limiting)**: A rota da API que recebe os leads (`/api/contato`) deve possuir limite de requisições configurado no Nginx para evitar ataques de força bruta ou estouro de cota (ex: limite de 5 requisições por minuto por IP).

- **Execução PM2 não-privilegiada**: O gerenciador de processos PM2 que executa o Next.js deve rodar sob um usuário Linux do sistema sem privilégios administrativos (ex: usuário `deploy` ou `node`), limitando a área de atuação caso o processo Node.js seja comprometido.
