#!/usr/bin/env node
// Hook Stop: verificação rápida ao fim de cada resposta do agente.
// Roda o compilador TypeScript do site e AVISA se houver erros de tipo.
// É só informativo: sempre sai com código 0, nunca impede o agente de terminar,
// e qualquer falha do próprio hook (sem tsc, timeout, etc.) é ignorada.

const { spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const siteDir = path.join(projectDir, "next-site");
// Chama o tsc pelo próprio Node (sem shell): o caminho do projeto tem espaço
// ("Site Principal-FIEC") e a chamada via shell quebra nele no Windows.
const tscJs = path.join(siteDir, "node_modules", "typescript", "bin", "tsc");

if (fs.existsSync(path.join(siteDir, "tsconfig.json")) && fs.existsSync(tscJs)) {
  const result = spawnSync(process.execPath, [tscJs, "--noEmit", "--pretty", "false"], {
    cwd: siteDir,
    encoding: "utf8",
    timeout: 60_000,
  });
  const out = `${result.stdout || ""}${result.stderr || ""}`.trim();
  if (result.status !== 0 && /error TS\d+/.test(out)) {
    const lines = out.split("\n");
    process.stderr.write(
      `[stop-verify] O TypeScript encontrou ${lines.filter((l) => /error TS\d+/.test(l)).length} erro(s):\n${lines.slice(0, 8).join("\n")}\n`,
    );
  }
}
process.exit(0);
