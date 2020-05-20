import { timeSelectUnit } from "../../..";

// @ts-ignore // TODO
const rtf = Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat() : null;

export function formatRelativeDates(
  from: Date | number,
  to: Date | number = Date.now()
): string {
  if (!from) {
    console.warn("formatRelativeDates requires a 'from' parameter");
    return "-";
  }

  if (!rtf) {
    return Math.round(Math.abs(from.valueOf() - to.valueOf()) / 1000) + "s";
  }

  return rtf.format(...timeSelectUnit(from, to));
}
