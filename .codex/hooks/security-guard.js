#!/usr/bin/env node
// Hook PreToolUse (Bash): bloqueia só comandos catastróficos e irreversíveis.
// Recebe o JSON do hook por stdin; exit 2 = bloqueia (a mensagem de stderr vai
// para o agente). Qualquer erro de leitura/parse deixa o comando passar (exit 0),
// para este guarda nunca travar o trabalho normal.

const BLOCKED = [
  [/\brm\s+(-[a-zA-Z]*[rR][a-zA-Z]*[fF]|-[a-zA-Z]*[fF][a-zA-Z]*[rR])\s+(--no-preserve-root\s+)?(\/|~|\$HOME|[A-Za-z]:[\\/]?)(\s|$)/, "rm -rf na raiz, na home ou numa unidade inteira"],
  [/\brm\s+(-[a-zA-Z]*[rR][a-zA-Z]*[fF]|-[a-zA-Z]*[fF][a-zA-Z]*[rR])\s+\*(\s|$)/, "rm -rf * (apaga tudo da pasta atual)"],
  [/\bgit\s+push\b[^\n]*\s(--force|-f)(\s|$)/, "git push --force"],
  [/\bgit\s+reset\s+--hard\b/, "git reset --hard"],
  [/\bgit\s+clean\b[^\n]*\s-[a-zA-Z]*f/, "git clean -f"],
  [/\b(curl|wget)\b[^\n|]*\|\s*(sudo\s+)?(ba|z)?sh\b/, "baixar e executar script remoto (curl | sh)"],
  [/\bmkfs(\.\w+)?\b/, "formatar disco (mkfs)"],
  [/\bdd\b[^\n]*\bof=\/dev\//, "dd gravando direto em dispositivo"],
  [/\bformat\s+[A-Za-z]:/i, "format de unidade"],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, "fork bomb"],
];

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw);
    const command = String(input?.tool_input?.command ?? "");
    for (const [pattern, reason] of BLOCKED) {
      if (pattern.test(command)) {
        process.stderr.write(`[security-guard] Comando bloqueado: ${reason}. Se for realmente necessário, o usuário executa manualmente.\n`);
        process.exit(2);
      }
    }
  } catch {
    /* entrada inesperada: não bloqueia */
  }
  process.exit(0);
});
