/**
 * Capas de ajuste no destructivas: modelo de parámetros y procesado de píxeles.
 * Todos los ajustes preservan el canal alfa y se evalúan sobre el compuesto
 * inferior en tiempo de render, sin tocar los píxeles de ninguna capa.
 */

export interface CurvePoint {
  x: number; // 0..255
  y: number; // 0..255
}

export type CurveChannel = 'rgb' | 'r' | 'g' | 'b';

export interface GradientStop {
  pos: number; // 0..1
  color: string; // #rrggbb
}

export type Triple = [number, number, number]; // -100..100 (R, G, B)

export type AdjustmentParams =
  | { kind: 'brightness-contrast'; brightness: number; contrast: number }
  | { kind: 'levels'; inBlack: number; inWhite: number; gamma: number; outBlack: number; outWhite: number }
  | { kind: 'hsl'; hue: number; saturation: number; lightness: number }
  | { kind: 'color-balance'; shadows: Triple; midtones: Triple; highlights: Triple }
  | { kind: 'curves'; channels: Record<CurveChannel, CurvePoint[]> }
  | { kind: 'gradient-map'; stops: GradientStop[] }
  | { kind: 'invert' };

export type AdjustmentKind = AdjustmentParams['kind'];

export const ADJUSTMENT_LABELS: Record<AdjustmentKind, string> = {
  'brightness-contrast': 'Brillo / Contraste',
  levels: 'Niveles',
  hsl: 'Tono / Saturación / Luminosidad',
  'color-balance': 'Balance de color',
  curves: 'Curvas de tono',
  'gradient-map': 'Mapa de degradado',
  invert: 'Invertir',
};

export function defaultCurvePoints(): CurvePoint[] {
  return [
    { x: 0, y: 0 },
    { x: 255, y: 255 },
  ];
}

export function createDefaultAdjustment(kind: AdjustmentKind): AdjustmentParams {
  switch (kind) {
    case 'brightness-contrast':
      return { kind, brightness: 0, contrast: 0 };
    case 'levels':
      return { kind, inBlack: 0, inWhite: 255, gamma: 1, outBlack: 0, outWhite: 255 };
    case 'hsl':
      return { kind, hue: 0, saturation: 0, lightness: 0 };
    case 'color-balance':
      return { kind, shadows: [0, 0, 0], midtones: [0, 0, 0], highlights: [0, 0, 0] };
    case 'curves':
      return {
        kind,
        channels: {
          rgb: defaultCurvePoints(),
          r: defaultCurvePoints(),
          g: defaultCurvePoints(),
          b: defaultCurvePoints(),
        },
      };
    case 'gradient-map':
      return {
        kind,
        stops: [
          { pos: 0, color: '#000000' },
          { pos: 1, color: '#ffffff' },
        ],
      };
    case 'invert':
      return { kind };
  }
}

export function cloneAdjustment(p: AdjustmentParams): AdjustmentParams {
  return JSON.parse(JSON.stringify(p)) as AdjustmentParams;
}

/** Valida/normaliza parámetros leídos de disco; devuelve valores por defecto si son inválidos. */
export function sanitizeAdjustment(raw: unknown): AdjustmentParams | null {
  if (!raw || typeof raw !== 'object') return null;
  const kind = (raw as { kind?: string }).kind as AdjustmentKind | undefined;
  if (!kind || !(kind in ADJUSTMENT_LABELS)) return null;
  const base = createDefaultAdjustment(kind);
  return { ...base, ...(raw as object) } as AdjustmentParams;
}

const clamp255 = (v: number): number => (v < 0 ? 0 : v > 255 ? 255 : v);

function hexToRgb(hex: string): Triple {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [0, 0, 0];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Interpolación monótona cúbica (Fritsch–Carlson) de una curva de tono a una LUT de 256 entradas.
 */
export function buildCurveLut(points: CurvePoint[]): Uint8Array {
  const lut = new Uint8Array(256);
  const pts = [...points].sort((a, b) => a.x - b.x);
  // Eliminar x duplicadas
  const p: CurvePoint[] = [];
  for (const pt of pts) {
    if (p.length && p[p.length - 1].x === pt.x) p[p.length - 1] = pt;
    else p.push(pt);
  }
  if (p.length === 0) {
    for (let i = 0; i < 256; i++) lut[i] = i;
    return lut;
  }
  if (p.length === 1) {
    lut.fill(clamp255(Math.round(p[0].y)));
    return lut;
  }
  const n = p.length;
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = p[i + 1].x - p[i].x;
    slope[i] = (p[i + 1].y - p[i].y) / dx[i];
  }
  const m: number[] = new Array(n);
  m[0] = slope[0];
  m[n - 1] = slope[n - 2];
  for (let i = 1; i < n - 1; i++) {
    m[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (slope[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / slope[i];
    const b = m[i + 1] / slope[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      m[i] = t * a * slope[i];
      m[i + 1] = t * b * slope[i];
    }
  }
  let seg = 0;
  for (let x = 0; x < 256; x++) {
    if (x <= p[0].x) {
      lut[x] = clamp255(Math.round(p[0].y));
      continue;
    }
    if (x >= p[n - 1].x) {
      lut[x] = clamp255(Math.round(p[n - 1].y));
      continue;
    }
    while (seg < n - 2 && x > p[seg + 1].x) seg++;
    const h = dx[seg];
    const t = (x - p[seg].x) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    const y =
      (2 * t3 - 3 * t2 + 1) * p[seg].y +
      (t3 - 2 * t2 + t) * h * m[seg] +
      (-2 * t3 + 3 * t2) * p[seg + 1].y +
      (t3 - t2) * h * m[seg + 1];
    lut[x] = clamp255(Math.round(y));
  }
  return lut;
}

function buildBrightnessContrastLut(brightness: number, contrast: number): Uint8Array {
  const lut = new Uint8Array(256);
  const b = (brightness / 100) * 255;
  const c = Math.max(-99, Math.min(99, contrast));
  const factor = (259 * (c + 255)) / (255 * (259 - c));
  for (let i = 0; i < 256; i++) {
    lut[i] = clamp255(Math.round(factor * (i + b - 128) + 128));
  }
  return lut;
}

function buildLevelsLut(
  inBlack: number,
  inWhite: number,
  gamma: number,
  outBlack: number,
  outWhite: number,
): Uint8Array {
  const lut = new Uint8Array(256);
  const range = Math.max(1, inWhite - inBlack);
  const g = 1 / Math.max(0.01, gamma);
  for (let i = 0; i < 256; i++) {
    const t = Math.max(0, Math.min(1, (i - inBlack) / range));
    lut[i] = clamp255(Math.round(outBlack + Math.pow(t, g) * (outWhite - outBlack)));
  }
  return lut;
}

function buildGradientLut(stops: GradientStop[]): Uint8Array {
  const lut = new Uint8Array(256 * 3);
  const sorted = [...stops].sort((a, b) => a.pos - b.pos);
  if (sorted.length === 0) {
    for (let i = 0; i < 256; i++) {
      lut[i * 3] = lut[i * 3 + 1] = lut[i * 3 + 2] = i;
    }
    return lut;
  }
  const cols = sorted.map((s) => hexToRgb(s.color));
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let k = 0;
    while (k < sorted.length - 1 && t > sorted[k + 1].pos) k++;
    let rgb: Triple;
    if (t <= sorted[0].pos) rgb = cols[0];
    else if (k >= sorted.length - 1) rgb = cols[sorted.length - 1];
    else {
      const a = sorted[k];
      const b = sorted[k + 1];
      const f = b.pos === a.pos ? 0 : (t - a.pos) / (b.pos - a.pos);
      rgb = [
        cols[k][0] + (cols[k + 1][0] - cols[k][0]) * f,
        cols[k][1] + (cols[k + 1][1] - cols[k][1]) * f,
        cols[k][2] + (cols[k + 1][2] - cols[k][2]) * f,
      ];
    }
    lut[i * 3] = clamp255(Math.round(rgb[0]));
    lut[i * 3 + 1] = clamp255(Math.round(rgb[1]));
    lut[i * 3 + 2] = clamp255(Math.round(rgb[2]));
  }
  return lut;
}

function applyLutRgb(data: Uint8ClampedArray, lutR: Uint8Array, lutG: Uint8Array, lutB: Uint8Array): void {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    data[i] = lutR[data[i]];
    data[i + 1] = lutG[data[i + 1]];
    data[i + 2] = lutB[data[i + 2]];
  }
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hueToChannel(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h: number, s: number, l: number): Triple {
  if (s === 0) {
    const v = l * 255;
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hh = h / 360;
  return [
    hueToChannel(p, q, hh + 1 / 3) * 255,
    hueToChannel(p, q, hh) * 255,
    hueToChannel(p, q, hh - 1 / 3) * 255,
  ];
}

function applyHsl(data: Uint8ClampedArray, hue: number, saturation: number, lightness: number): void {
  const satF = saturation / 100;
  const lightF = lightness / 100;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    let [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    h = (((h + hue) % 360) + 360) % 360;
    s = satF >= 0 ? s + (1 - s) * satF : s * (1 + satF);
    l = lightF >= 0 ? l + (1 - l) * lightF : l * (1 + lightF);
    const [r, g, b] = hslToRgb(h, Math.max(0, Math.min(1, s)), Math.max(0, Math.min(1, l)));
    data[i] = clamp255(Math.round(r));
    data[i + 1] = clamp255(Math.round(g));
    data[i + 2] = clamp255(Math.round(b));
  }
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function applyColorBalance(data: Uint8ClampedArray, sh: Triple, mid: Triple, hi: Triple): void {
  const k = 0.5 * 2.55; // -100..100 → ±127 máx.
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const sw = 1 - smoothstep(0, 0.5, lum);
    const hw = smoothstep(0.5, 1, lum);
    const mw = Math.max(0, 1 - sw - hw);
    data[i] = clamp255(Math.round(r + (sw * sh[0] + mw * mid[0] + hw * hi[0]) * k));
    data[i + 1] = clamp255(Math.round(g + (sw * sh[1] + mw * mid[1] + hw * hi[1]) * k));
    data[i + 2] = clamp255(Math.round(b + (sw * sh[2] + mw * mid[2] + hw * hi[2]) * k));
  }
}

/** Aplica el ajuste in situ sobre un buffer RGBA no premultiplicado. */
export function applyAdjustmentToRgba(data: Uint8ClampedArray, params: AdjustmentParams): void {
  switch (params.kind) {
    case 'brightness-contrast': {
      const lut = buildBrightnessContrastLut(params.brightness, params.contrast);
      applyLutRgb(data, lut, lut, lut);
      break;
    }
    case 'levels': {
      const lut = buildLevelsLut(params.inBlack, params.inWhite, params.gamma, params.outBlack, params.outWhite);
      applyLutRgb(data, lut, lut, lut);
      break;
    }
    case 'hsl':
      if (params.hue !== 0 || params.saturation !== 0 || params.lightness !== 0) {
        applyHsl(data, params.hue, params.saturation, params.lightness);
      }
      break;
    case 'color-balance':
      applyColorBalance(data, params.shadows, params.midtones, params.highlights);
      break;
    case 'curves': {
      const master = buildCurveLut(params.channels.rgb);
      const lr = buildCurveLut(params.channels.r);
      const lg = buildCurveLut(params.channels.g);
      const lb = buildCurveLut(params.channels.b);
      const fr = new Uint8Array(256);
      const fg = new Uint8Array(256);
      const fb = new Uint8Array(256);
      for (let i = 0; i < 256; i++) {
        fr[i] = master[lr[i]];
        fg[i] = master[lg[i]];
        fb[i] = master[lb[i]];
      }
      applyLutRgb(data, fr, fg, fb);
      break;
    }
    case 'gradient-map': {
      const lut = buildGradientLut(params.stops);
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue;
        const lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
        data[i] = lut[lum * 3];
        data[i + 1] = lut[lum * 3 + 1];
        data[i + 2] = lut[lum * 3 + 2];
      }
      break;
    }
    case 'invert':
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue;
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      break;
  }
}

let scratchCanvas: HTMLCanvasElement | null = null;
let scratchCtx: CanvasRenderingContext2D | null = null;

/**
 * Aplica una capa de ajuste sobre todo el contenido actual de `target`,
 * mezclando con el original según `opacity` (0..1).
 */
export function applyAdjustmentToContext(
  target: CanvasRenderingContext2D,
  params: AdjustmentParams,
  opacity: number,
  w: number,
  h: number,
): void {
  if (opacity <= 0) return;
  if (!scratchCanvas) {
    scratchCanvas = document.createElement('canvas');
    scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
  }
  if (!scratchCtx || !scratchCanvas) return;
  if (scratchCanvas.width !== w || scratchCanvas.height !== h) {
    scratchCanvas.width = w;
    scratchCanvas.height = h;
  }
  scratchCtx.globalCompositeOperation = 'copy';
  scratchCtx.drawImage(target.canvas, 0, 0);
  scratchCtx.globalCompositeOperation = 'source-over';

  const img = scratchCtx.getImageData(0, 0, w, h);
  applyAdjustmentToRgba(img.data, params);
  scratchCtx.putImageData(img, 0, 0);

  target.save();
  target.globalAlpha = Math.min(1, opacity);
  target.globalCompositeOperation = opacity >= 1 ? 'copy' : 'source-over';
  target.drawImage(scratchCanvas, 0, 0);
  target.restore();
}
