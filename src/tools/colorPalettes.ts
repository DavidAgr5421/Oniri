export interface ColorSet {
  id: string;
  name: string;
  colors: string[];
}

export const DEFAULT_HISTORY = [
  '#000000',
  '#ffffff',
  '#e74c3c',
  '#e67e22',
  '#f1c40f',
  '#2ecc71',
  '#1abc9c',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#7f8c8d',
  '#bdc3c7',
];

export const DEFAULT_COLOR_SETS: ColorSet[] = [
  {
    id: 'csp-standard',
    name: 'Conjunto Estándar',
    colors: [
      '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
      '#e53935', '#fb8c00', '#fdd835', '#43a047', '#00acc1', '#1e88e5',
      '#3949ab', '#8e24aa', '#d81b60', '#6d4c41', '#546e7a', '#f4511e',
      '#ffcdd2', '#ffe0b2', '#fff9c4', '#c8e6c9', '#b2ebf2', '#bbdefb',
    ],
  },
  {
    id: 'anime-skin',
    name: 'Tonos de Piel & Anime',
    colors: [
      '#fff5eb', '#ffecd9', '#ffe0c2', '#f7cba4', '#eba87c', '#d1845c',
      '#f9d5c5', '#eec0ad', '#dfa088', '#c67d63', '#9c563f', '#6e3726',
      '#ffcad4', '#f4acb7', '#9d8189', '#4a3f45', '#2b2429', '#1a1518',
    ],
  },
  {
    id: 'vibrant-cel',
    name: 'Cel Shading Vibrante',
    colors: [
      '#ff1744', '#ff9100', '#ffea00', '#00e676', '#00e5ff', '#2979ff',
      '#651fff', '#d500f9', '#ff4081', '#1de9b6', '#76ff03', '#c6ff00',
    ],
  },
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) return { r: 17, g: 17, b: 17 };
  const n = parseInt(clean, 16);
  if (Number.isNaN(n)) return { r: 17, g: 17, b: 17 };
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)].map((c) => c.toString(16).padStart(2, '0')).join('')
  );
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s, v };
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const hn = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = v - c;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hn < 60) [r1, g1, b1] = [c, x, 0];
  else if (hn < 120) [r1, g1, b1] = [x, c, 0];
  else if (hn < 180) [r1, g1, b1] = [0, c, x];
  else if (hn < 240) [r1, g1, b1] = [0, x, c];
  else if (hn < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

export interface ColorHarmonyGroup {
  label: string;
  colors: { hex: string; tag: string }[];
}

export function computeColorHarmonies(baseHex: string): ColorHarmonyGroup[] {
  const { r, g, b } = hexToRgb(baseHex);
  const { h, s, v } = rgbToHsv(r, g, b);
  // Ensure minimum saturation/value for chromatic harmonies even if base is near-black/white
  const effS = s < 0.12 ? 0.68 : s;
  const effV = v < 0.18 ? 0.78 : v;

  return [
    {
      label: 'Complementario (Contraste Directo)',
      colors: [
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 180, effS, effV), tag: '180° Opuesto' },
      ],
    },
    {
      label: 'Complementario Dividido',
      colors: [
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 150, effS, effV), tag: '+150°' },
        { hex: hsvToHex(h + 210, effS, effV), tag: '+210°' },
      ],
    },
    {
      label: 'Tríada Armónica',
      colors: [
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 120, effS, effV), tag: '+120°' },
        { hex: hsvToHex(h + 240, effS, effV), tag: '+240°' },
      ],
    },
    {
      label: 'Análogos (Cercanos)',
      colors: [
        { hex: hsvToHex(h - 30, effS, effV), tag: '-30°' },
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h + 30, effS, effV), tag: '+30°' },
      ],
    },
    {
      label: 'Escala de Luz y Sombra (Cel Shading)',
      colors: [
        { hex: hsvToHex(h + 8, Math.max(0.15, effS * 0.45), Math.min(1, effV * 1.25)), tag: 'Luz+' },
        { hex: hsvToHex(h + 4, Math.max(0.25, effS * 0.75), Math.min(1, effV * 1.12)), tag: 'Luz' },
        { hex: baseHex, tag: 'Base' },
        { hex: hsvToHex(h - 8, Math.min(1, effS * 1.1), Math.max(0.12, effV * 0.75)), tag: 'Sombra 1' },
        { hex: hsvToHex(h - 16, Math.min(1, effS * 1.2), Math.max(0.08, effV * 0.5)), tag: 'Sombra 2' },
      ],
    },
  ];
}
