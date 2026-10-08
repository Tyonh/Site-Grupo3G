import report from "./data/homologada-200w-photometry.json";

export const homologadaPhotometry = report;

/** Candela interpolated from the PDF's 12 C planes and 181 gamma angles.
 * The report rounds the table to 0.1 cd; this is not the original IES file.
 */
export function candelaAt(cDegrees: number, gammaDegrees: number): number {
  const c = ((cDegrees % 360) + 360) % 360 / 30;
  const gamma = Math.max(0, Math.min(180, gammaDegrees));
  const c0 = Math.floor(c);
  const c1 = (c0 + 1) % 12;
  const g0 = Math.floor(gamma);
  const g1 = Math.min(g0 + 1, 180);
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;
  const lower = mix(report.candela[g0][c0], report.candela[g0][c1], c - c0);
  const upper = mix(report.candela[g1][c0], report.candela[g1][c1], c - c0);
  return mix(lower, upper, gamma - g0);
}

/** Horizontal illuminance with C0 along x and gamma0 pointing down.
 * Scene uses its normalized shape only: its GLB is the 50 W variant.
 */
export function horizontalIlluminance(x: number, z: number, height: number): number {
  if (height <= 0) throw new RangeError("Mounting height must be positive");
  const radius = Math.hypot(x, z);
  const gamma = Math.atan2(radius, height) * 180 / Math.PI;
  const c = Math.atan2(z, x) * 180 / Math.PI;
  const distance = Math.hypot(radius, height);
  return candelaAt(c, gamma) * height / distance ** 3;
}

export function polarCurvePath(cDegrees: number): string {
  const points: string[] = [];
  for (let angle = -180; angle <= 180; angle++) {
    const radians = angle * Math.PI / 180;
    const intensity = candelaAt(angle < 0 ? cDegrees + 180 : cDegrees, Math.abs(angle));
    const radius = intensity / report.maximumCandela * 49;
    points.push(`${(60 + Math.sin(radians) * radius).toFixed(2)},${(55 + Math.cos(radians) * radius).toFixed(2)}`);
  }
  return `M${points.join(" L")} Z`;
}
