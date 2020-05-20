const DISALLOED_HUE_RANGES = [
  [20, 210],
  [240, 340],
];

const NUMBER_RANGE =
  360 -
  DISALLOED_HUE_RANGES.reduce(
    (previous, [start, end]) => previous + (end - start),
    0
  );

export function stringToColor(str: string): string {
  const hash = stringToHash(str);
  const color = numberToColor(hash);

  return color;
}

function stringToHash(str: string): number {
  let hash = 0;

  str = btoa(str);

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  hash = hash * 9301 + 49297;

  return hash;
}

function numberToColor(hash: number): string {
  hash = Math.abs(hash);

  const saturation = 70;
  const lightness = 40;

  const hue = DISALLOED_HUE_RANGES.reduce(
    (acc, [start, end]) => (acc >= start ? acc + (end - start) : acc),
    hash % NUMBER_RANGE
  );

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return HSLToHex(hue, saturation, lightness);
}

function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  let rString = Math.round((r + m) * 255).toString(16);
  let gString = Math.round((g + m) * 255).toString(16);
  let bString = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (rString.length == 1) rString = "0" + rString;
  if (gString.length == 1) gString = "0" + gString;
  if (bString.length == 1) bString = "0" + bString;

  return "#" + rString + gString + bString;
}

// test:
// new Array(1000).fill(0).forEach((_, i) => console.info(numberToColor(i)));
