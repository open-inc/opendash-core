export function formatDistance(mm: number): string {
  if (Math.abs(mm) < 10) {
    return Math.round(mm) + "mm";
  }

  const cm = mm / 10;

  if (Math.abs(cm) < 10) {
    return Math.round(cm) + "cm";
  }

  const m = cm / 100;

  if (Math.abs(m) < 100) {
    return Math.round(m) + "m";
  }

  const km = m / 1000;

  return Math.round(km) + "km";
}
