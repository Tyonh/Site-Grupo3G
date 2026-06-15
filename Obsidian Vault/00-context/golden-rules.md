# Regras de Ouro (Golden Rules)

Este documento estabelece as regras fundamentais de desenvolvimento e manutenção do projeto, que devem ser seguidas rigorosamente por todos os engenheiros e agentes de IA.

---

## 1. A Regra da Preservação (Não Modificar o que Está Funcional)

> [!IMPORTANT]
> **DIRETRIZ CRÍTICA:** É terminantemente proibido alterar, refatorar ou remover qualquer trecho de código, componente, lógica de negócio ou arquivo CSS que esteja funcionando perfeitamente, a menos que haja uma solicitação explícita de alteração.

### Diretrizes de Execução
- **Escopo Estrito**: Limitar todas as modificações estritamente ao escopo da tarefa solicitada.
- **Isolamento de Impacto**: Ao implementar novas funcionalidades ou corrigir bugs, utilize os princípios de modularização para garantir que o novo código não interfira nas funcionalidades existentes.
- **Refatorações Oportunistas**: Refatorações que não estejam diretamente associadas ao objetivo da tarefa atual devem ser documentadas em `[[tasks#Especificação de Tarefas & Definition of Done (DoD)|Especificação de Tarefas]]` para futura aprovação, e **não** executadas de imediato.
- **Preservação de Layout e Estilos**: Não altere classes do Tailwind CSS de componentes que não fazem parte do escopo da solicitação de mudança.

---

## 2. Rastreabilidade e Documentação

- **Integração com o Vault**: Qualquer nova funcionalidade adicionada deve ser precedida por sua definição no `[[PRD|PRD]]`, mapeamento de entidades no `[[domain-model|Modelo de Domínio]]` e registro de decisões em `[[decisions|decisions.md]]`.
- **Definition of Done (DoD)**: Nenhuma tarefa é considerada concluída sem passar por todos os critérios de aceitação descritos na sua respectiva `TASK` em `[[tasks|tasks.md]]`.
