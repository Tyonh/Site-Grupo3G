export const homologadaMotion = {
  damping: 12,
  rest: 0.0005,
  turnEnd: 0.36,
  installStart: 0.48,
  installEnd: 0.82,
  nightStart: 0.79,
  nightEnd: 0.89,
  lightStart: 0.88,
  lightEnd: 0.98,
  applicationStart: 0.9,
} as const;

export function phase(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
