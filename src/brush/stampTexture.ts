import type { AntiAliasingLevel, TipShape } from '../tools/toolState';

const CACHE_LIMIT = 256;
const PADDING = 2;

// Anti-aliasing transition width in pixels (Clip Studio Paint style levels).
const AA_WIDTH: Record<AntiAliasingLevel, number> = {
  none: 0,
  weak: 0.6,
  medium: 1.1,
  strong: 1.8,
};

export interface StampTextureOptions {
  diameter: number;
  hardness: number;
  color: string;
  antiAliasing?: AntiAliasingLevel;
  tipShape?: TipShape;
  tipRoundness?: number;
}

const cache = new Map<string, HTMLCanvasElement>();

function parseHexColor(hex: string): [number, number, number] {
  const value = hex.startsWith('#') ? hex.slice(1) : hex;
  if (/^[0-9a-fA-F]{3}$/.test(value)) {
    const r = parseInt(value[0] + value[0], 16);
    const g = parseInt(value[1] + value[1], 16);
    const b = parseInt(value[2] + value[2], 16);
    return [r, g, b];
  }
  if (/^[0-9a-fA-F]{6}$/.test(value)) {
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return [r, g, b];
  }
  return [0, 0, 0];
}

/**
 * Builds a stamp by evaluating a signed distance field per pixel. This gives
 * true sub-pixel anti-aliased edges (no jagged borders) for every tip shape,
 * plus a softness band derived from hardness and the anti-aliasing level.
 */
function buildStamp(
  diameter: number,
  hardness: number,
  color: string,
  antiAliasing: AntiAliasingLevel,
  tipShape: TipShape,
  tipRoundness: number,
): HTMLCanvasElement {
  const r = diameter / 2;
  const isBox = tipShape === 'square';
  const scaleY = Math.max(0.1, tipRoundness);
  const aaWidth = AA_WIDTH[antiAliasing];
  // Same band semantics as: innerRadius = min(r * hardness, r - aaWidth)
  const band = Math.max(aaWidth, r * (1 - hardness));

  // Transparent margin so sub-pixel placement never clips the edge, and so a
  // rotated square tip (or a soft halo) still fits inside the canvas.
  const maxExtent = (isBox ? r * Math.sqrt(1 + scaleY * scaleY) : r) + band / 2;
  const pad = Math.max(PADDING, Math.ceil(maxExtent - r) + PADDING);
  const size = Math.max(2, Math.ceil(diameter)) + pad * 2;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(size, size);
  const data = image.data;

  const [cr, cg, cb] = parseHexColor(color);
  const half = size / 2;
  const binary = band <= 0.0001;
  const threshold = antiAliasing === 'none';

  let i = 0;
  for (let y = 0; y < size; y++) {
    const uy = (y + 0.5 - half) / scaleY;
    for (let x = 0; x < size; x++) {
      const ux = x + 0.5 - half;
      let sd: number;
      if (isBox) {
        const dx = Math.abs(ux) - r;
        const dy = Math.abs(uy) - r;
        const ox = dx > 0 ? dx : 0;
        const oy = dy > 0 ? dy : 0;
        sd = Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0);
      } else {
        sd = Math.hypot(ux, uy) - r;
      }

      let a: number;
      if (binary) {
        a = sd < 0 ? 1 : 0;
      } else {
        a = (band * 0.5 - sd) / band;
        if (a < 0) a = 0;
        else if (a > 1) a = 1;
      }
      if (threshold) a = a >= 0.5 ? 1 : 0;

      data[i] = cr;
      data[i + 1] = cg;
      data[i + 2] = cb;
      data[i + 3] = a * 255;
      i += 4;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}

export function getStampTexture(options: StampTextureOptions): HTMLCanvasElement {
  const diameter = Math.max(0.4, options.diameter);
  const hardness = Math.min(1, Math.max(0, options.hardness));
  const color = options.color || '#000000';
  const antiAliasing: AntiAliasingLevel = options.antiAliasing ?? 'medium';
  const tipShape: TipShape = options.tipShape ?? 'circle';
  const tipRoundness = Math.min(1, Math.max(0.1, options.tipRoundness ?? 1));

  // Quantize the size (0.25px, coarser for big brushes) to bound cache growth
  // while keeping tapered needles visually continuous.
  const step = diameter > 20 ? 0.5 : 0.25;
  const quantized = Math.max(0.4, Math.round(diameter / step) * step);
  const key = `${quantized.toFixed(2)}:${hardness.toFixed(3)}:${color}:${antiAliasing}:${tipShape}:${tipRoundness.toFixed(2)}`;

  let stamp = cache.get(key);
  if (!stamp) {
    if (cache.size >= CACHE_LIMIT) cache.clear();
    stamp = buildStamp(quantized, hardness, color, antiAliasing, tipShape, tipRoundness);
    cache.set(key, stamp);
  }
  return stamp;
}

export function clearStampCache(): void {
  cache.clear();
}
