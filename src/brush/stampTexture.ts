import type { AntiAliasingLevel, DualBlendMode, ThicknessDirection, TipShape } from '../tools/toolState';
import { getBrushTextureAsset, subscribeTextureAssets } from './brushTextureAssets';
import { brushDiagnostics } from './brushDiagnostics';
import { rustStrokeEngine } from './rustStrokeEngine';

// Room for the pressure steps and the tilt squash levels of one stroke.
const CACHE_LIMIT = 512;
const PADDING = 2;

subscribeTextureAssets(() => {
  cache.clear();
});

// Anti-aliasing transition width in pixels.
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
  thicknessDirection?: ThicknessDirection;
  tipTexture?: string;
  dualBrushEnabled?: boolean;
  dualTipShape?: TipShape;
  dualTipTexture?: string;
  dualSizeRatio?: number;
  dualBlendMode?: DualBlendMode;
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
 * Builds a stamp by evaluating a signed distance field per pixel, optionally
 * modulated by a procedural brush tip material ('gasagasa', 'brush02', 'flat-square').
 * This gives true sub-pixel anti-aliased edges for every tip shape (circle,
 * flat square chisel, or 45° calligraphic ribbon) while preserving organic
 * bristle/rough nib textures across any tip geometry.
 */
function buildStamp(
  diameter: number,
  hardness: number,
  color: string,
  antiAliasing: AntiAliasingLevel,
  tipShape: TipShape,
  tipRoundness: number,
  tipTextureId?: string,
): HTMLCanvasElement {
  const r = diameter / 2;
  const isBox = tipShape === 'square' || tipTextureId === 'flat-square';
  const isCalligraphic = tipShape === 'calligraphic';
  const scaleY = isCalligraphic
    ? Math.min(0.35, Math.max(0.08, tipRoundness))
    : Math.max(0.08, tipRoundness);
  const aaWidth = AA_WIDTH[antiAliasing];
  // Same band semantics as: innerRadius = min(r * hardness, r - aaWidth)
  const band = Math.max(aaWidth, r * (1 - hardness));

  const asset =
    tipTextureId && tipTextureId !== 'default' && tipTextureId !== 'none'
      ? getBrushTextureAsset(tipTextureId)
      : undefined;
  const hasMat = !!(asset && asset.loaded && asset.pixelData && asset.width > 0 && asset.height > 0);
  const isGasa = tipTextureId === 'gasagasa';
  const isRealG = tipTextureId === 'real-g';
  const isPencilTip =
    tipTextureId === 'pencil-01' || tipTextureId === 'pencil-02' || tipTextureId === 'pencil-03';
  const isInkOrCharcoal =
    tipTextureId === 'brush-pen-01' ||
    tipTextureId === 'brush-pen-02' ||
    tipTextureId === 'dry-ink' ||
    tipTextureId === 'charcoal-01';
  const isBristle = tipTextureId === 'brush02';

  const halfW = Math.max(0.5, r);
  const halfH = Math.max(0.5, r * scaleY);
  const extraRoughPad = isGasa || isRealG ? Math.min(4, r * 0.35) : 0;
  const maxR = Math.hypot(halfW, halfH) + band / 2 + extraRoughPad;
  const size = Math.max(2, Math.ceil(maxR * 2)) + PADDING * 2;

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

  const matData = hasMat ? asset!.pixelData! : null;
  const matW = hasMat ? asset!.width : 1;
  const matH = hasMat ? asset!.height : 1;

  if (rustStrokeEngine.available) {
    const shapeCode = isBox ? 1 : isCalligraphic ? 2 : 0;
    const matMode = !hasMat
      ? 0
      : isGasa
        ? 1
        : isRealG
          ? 2
          : isPencilTip || isInkOrCharcoal || isBristle
            ? 3
            : 4;
    const wasmBytes = rustStrokeEngine.buildSdfStamp({
      size,
      diameter,
      hardness,
      cr,
      cg,
      cb,
      aaWidth,
      threshold,
      shapeCode,
      scaleY,
      matMode,
      matW: hasMat ? matW : 0,
      matH: hasMat ? matH : 0,
      matRgba: matData
        ? new Uint8Array(matData.buffer, matData.byteOffset, matData.byteLength)
        : new Uint8Array(0),
    });
    if (wasmBytes && wasmBytes.length === data.length) {
      data.set(wasmBytes);
      ctx.putImageData(image, 0, 0);
      return canvas;
    }
  }

  let i = 0;
  for (let y = 0; y < size; y++) {
    const rawUy = y + 0.5 - half;
    for (let x = 0; x < size; x++) {
      const rawUx = x + 0.5 - half;
      let sd: number;
      let localX = rawUx;
      let localY = rawUy;

      if (isBox) {
        // Flat rectangular chisel / straight blade
        const dx = Math.abs(rawUx) - halfW;
        const dy = Math.abs(rawUy) - halfH;
        const ox = dx > 0 ? dx : 0;
        const oy = dy > 0 ? dy : 0;
        sd = Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0);
      } else if (isCalligraphic) {
        // True 45-degree calligraphy wedge chisel ribbon
        const rotX = (rawUx + rawUy) * Math.SQRT1_2;
        const rotY = (-rawUx + rawUy) * Math.SQRT1_2;
        localX = rotX;
        localY = rotY;
        const dx = Math.abs(rotX) - halfW;
        const dy = Math.abs(rotY) - halfH;
        const ox = dx > 0 ? dx : 0;
        const oy = dy > 0 ? dy : 0;
        sd = Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0);
      } else {
        // Round / Elliptic tip
        const uy = rawUy / scaleY;
        sd = Math.hypot(rawUx, uy) - r;
      }

      let matFactor = 1.0;
      if (matData) {
        const u = Math.max(0, Math.min(0.999, (localX / (halfW * 1.06)) * 0.5 + 0.5));
        const v = Math.max(0, Math.min(0.999, (localY / (halfH * 1.06)) * 0.5 + 0.5));
        const tx = Math.floor(u * matW);
        const ty = Math.floor(v * matH);
        const mIdx = (ty * matW + tx) * 4;
        const ma = matData[mIdx + 3] / 255;

        if (isGasa) {
          // Rough nib (gasagasa): organic rough nib edge perturbation + porous core
          const angleIdx = Math.floor(((Math.atan2(localY, localX) + Math.PI) / (Math.PI * 2)) * matH) % matH;
          const radIdx = Math.min(matW - 1, Math.floor(Math.min(1, Math.hypot(localX / halfW, localY / halfH)) * matW));
          const polarAlpha = matData[(angleIdx * matW + radIdx) * 4 + 3] / 255;
          const edgeJitter = (polarAlpha - 0.48) * Math.min(3.2, Math.max(0.8, r * 0.34));
          sd -= edgeJitter;
          matFactor = 0.72 + 0.28 * ma;
        } else if (isRealG) {
          // Organic G-Pen (real-g): jagged nib silhouette + subtle edge bleed
          const edgeJitter = (ma - 0.5) * Math.min(2.6, Math.max(0.6, r * 0.28));
          sd -= edgeJitter;
          matFactor = ma;
        } else if (isPencilTip || isInkOrCharcoal || isBristle) {
          // Pencil / Brush Pen / Dry Ink / Charcoal / Bristle:
          // 2D organic silhouette shaped by the SDF envelope
          const edgeSoft = Math.max(aaWidth, r * 0.16);
          sd += (1 - ma) * edgeSoft * 0.85;
          matFactor = Math.pow(ma, 0.80);
        } else {
          matFactor = 0.25 + 0.75 * ma;
        }
      }

      let a: number;
      if (binary) {
        a = sd < 0 ? 1 : 0;
      } else {
        a = (band * 0.5 - sd) / band;
        if (a < 0) a = 0;
        else if (a > 1) a = 1;
      }
      a *= matFactor;
      if (threshold) a = a >= 0.45 ? 1 : 0;

      data[i] = cr;
      data[i + 1] = cg;
      data[i + 2] = cb;
      data[i + 3] = Math.round(a * 255);
      i += 4;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}

function buildSpriteStamp(
  diameter: number,
  color: string,
  tipTextureId: string,
  tipRoundness: number,
  thicknessDirection: ThicknessDirection,
  hardness: number,
  antiAliasing: AntiAliasingLevel,
  tipShape: TipShape,
): HTMLCanvasElement {
  // If user explicitly overrides tipShape to 'square' or 'calligraphic' (except flat-square),
  // combine the geometric SDF shape with the material texture.
  if ((tipShape === 'square' && tipTextureId !== 'flat-square') || tipShape === 'calligraphic') {
    return buildStamp(diameter, hardness, color, antiAliasing, tipShape, tipRoundness, tipTextureId);
  }

  // Procedural tip sprite rendering:
  // Preserves the bitmap aspect ratio and applies tipRoundness along horizontal or vertical axis.
  const asset = getBrushTextureAsset(tipTextureId);
  if (asset && asset.loaded && asset.image && asset.width > 0 && asset.height > 0) {
    const thickness = Math.max(0.08, Math.min(1.0, tipRoundness));
    const scaleX = thicknessDirection === 'horizontal' ? thickness : 1.0;
    const scaleY = thicknessDirection === 'vertical' ? thickness : 1.0;
    const maxDim = Math.max(asset.width, asset.height) || 1;
    const w = Math.max(1, diameter * (asset.width / maxDim) * scaleX);
    const h = Math.max(1, diameter * (asset.height / maxDim) * scaleY);
    const pad = PADDING + 2;
    const maxExtent = Math.hypot(w, h);
    const size = Math.max(2, Math.ceil(maxExtent)) + pad * 2;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.imageSmoothingEnabled = antiAliasing !== 'none';
    ctx.imageSmoothingQuality = antiAliasing === 'strong' ? 'high' : 'medium';

    const x = (size - w) / 2;
    const y = (size - h) / 2;
    ctx.drawImage(asset.image, x, y, w, h);

    // Optional softness envelope if user lowers hardness below 0.85 on a sprite tip
    if (hardness < 0.85) {
      const r = Math.max(w, h) / 2;
      const innerR = Math.max(0, r * hardness);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(w / (r * 2), h / (r * 2));
      const grad = ctx.createRadialGradient(0, 0, innerR, 0, 0, r);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = grad;
      ctx.fillRect(-r, -r, r * 2, r * 2);
      ctx.restore();
    }

    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    return canvas;
  }

  return buildStamp(diameter, hardness, color, antiAliasing, tipShape, tipRoundness, tipTextureId);
}

export function getStampTexture(options: StampTextureOptions): HTMLCanvasElement {
  const diameter = Math.max(0.4, options.diameter);
  const hardness = Math.min(1, Math.max(0, options.hardness));
  const color = options.color || '#000000';
  const antiAliasing: AntiAliasingLevel = options.antiAliasing ?? 'medium';
  const tipShape: TipShape = options.tipShape ?? 'circle';
  const tipRoundness = Math.min(1, Math.max(0.08, options.tipRoundness ?? 1));
  const thicknessDirection: ThicknessDirection = options.thicknessDirection ?? 'vertical';
  const tipTexture = options.tipTexture || 'default';

  const useDual = !!(
    options.dualBrushEnabled &&
    options.dualTipTexture &&
    options.dualTipTexture !== 'none'
  );
  const dualShape = options.dualTipShape ?? 'circle';
  const dualTexture = options.dualTipTexture ?? 'none';
  const dualRatio = (options.dualSizeRatio ?? 1.0).toFixed(2);
  const dualMode = options.dualBlendMode ?? 'multiply';
  const dualKey = useDual ? `:dual:${dualShape}:${dualTexture}:${dualRatio}:${dualMode}` : '';

  // Quantize diameter adaptively to bound cache size and guarantee high hit rate
  const step =
    diameter > 80 ? 4.0 :
    diameter > 36 ? 2.0 :
    diameter > 14 ? 0.5 :
    0.25;
  const quantized = Math.max(0.4, Math.round(diameter / step) * step);
  const key = `${quantized.toFixed(2)}:${hardness.toFixed(3)}:${color}:${antiAliasing}:${tipShape}:${tipRoundness.toFixed(2)}:${thicknessDirection}:${tipTexture}${dualKey}`;

  let stamp = cache.get(key);
  if (stamp) {
    // Map iteration order is the eviction order, so touching the entry keeps
    // the stamps of the stroke being drawn away from the eviction limit.
    cache.delete(key);
    cache.set(key, stamp);
    brushDiagnostics.recordStamp(true);
    return stamp;
  }
  const t0 = performance.now();
  if (cache.size >= CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  if (tipTexture && tipTexture !== 'default' && tipTexture !== 'none') {
    stamp = buildSpriteStamp(
      quantized,
      color,
      tipTexture,
      tipRoundness,
      thicknessDirection,
      hardness,
      antiAliasing,
      tipShape
    );
  } else {
    stamp = buildStamp(quantized, hardness, color, antiAliasing, tipShape, tipRoundness);
  }

  // Pre-composite dual brush onto primary stamp once at cache construction
  if (useDual) {
    const dualDiam = Math.max(0.5, quantized * (options.dualSizeRatio ?? 1.0));
    const dualStamp = getStampTexture({
      diameter: dualDiam,
      hardness,
      color,
      antiAliasing,
      tipShape: options.dualTipShape ?? 'circle',
      tipRoundness: 1.0,
      tipTexture: options.dualTipTexture,
      dualBrushEnabled: false,
    });

    const ctx = stamp.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation =
        dualMode === 'subtract'
          ? 'destination-out'
          : dualMode === 'lighten'
            ? 'source-atop'
            : 'destination-in';

      const dw = dualStamp.width;
      const dh = dualStamp.height;
      const dx = (stamp.width - dw) / 2;
      const dy = (stamp.height - dh) / 2;
      ctx.drawImage(dualStamp, dx, dy);

      if (dualMode !== 'subtract' && dualMode !== 'lighten') {
        if (dx > 0 || dy > 0) {
          ctx.globalCompositeOperation = 'destination-out';
          if (dx > 0) {
            ctx.fillRect(0, 0, dx, stamp.height);
            ctx.fillRect(stamp.width - dx, 0, dx, stamp.height);
          }
          if (dy > 0) {
            ctx.fillRect(0, 0, stamp.width, dy);
            ctx.fillRect(0, stamp.height - dy, stamp.width, dy);
          }
        }
      }
      ctx.restore();
    }
  }
  const buildDuration = performance.now() - t0;
  brushDiagnostics.recordStamp(false, buildDuration);
  cache.set(key, stamp);
  return stamp;
}

export function clearStampCache(): void {
  cache.clear();
}
