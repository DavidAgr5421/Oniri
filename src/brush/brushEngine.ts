import {
  type EvaluatedBoneWorld,
  type LayerMeshSkin,
  buildLayerMeshSkin,
  renderSkinnedLayerMesh,
} from '../animation/boneModel';
import type { TimelineManager } from '../animation/timelineManager';
import type { BrushSettings, TipTextureId } from '../tools/toolState';
import { getToolState, getActiveSubTool, subscribeTools, hexToRgb, rgbToHex } from '../tools/toolState';
import { floodFill } from './floodFill';
import { executeSmartFill, executeEncloseAndFill, executePaintUnfilledArea } from './smartFill';
import { createHistoryManager, HistoryManager, type Rect } from './history';
import { createLayerManager, getRenderOrder, LayerManager, LayerNode } from './layers';
import { drawShape } from './shapeDrawer';
import { getStampTexture } from './stampTexture';
import type { TiltFootprint } from './pressureResponse';
import { getPaperGrainPattern, samplePaperGrain } from './brushTextureAssets';
import { DOC_H, DOC_W } from './docConstants';
import { selectionModel, SelectionModel } from '../selection/selectionModel';
import { brushDiagnostics } from './brushDiagnostics';

export { DOC_H, DOC_W } from './docConstants';

const MIN_STAMP_DIAMETER = 0.4;
const MIN_STAMP_STEP = 1.1;
const STAMP_GUARD = 20000;
const SPRAY_SCALE_BUCKETS = [0.45, 0.60, 0.75, 0.90, 1.05, 1.20];

export interface StrokeTail {
  vx: number;
  vy: number;
  isMouse: boolean;
}

export interface BrushEngine {
  readonly layerManager: LayerManager;
  readonly strokeCanvas: HTMLCanvasElement;
  readonly compositeCanvas: HTMLCanvasElement;
  readonly selection: SelectionModel;
  docW: number;
  docH: number;
  setDocumentSize(w: number, h: number): void;
  onDocumentResize?: (w: number, h: number) => void;
  onCompositeUpdated?: () => void;
  compositeDirty: boolean;
  setTimelineManager(tm: TimelineManager): void;
  getTimelineManager(): TimelineManager | null;
  beginStroke(x: number, y: number, pressure: number, isMouse?: boolean): void;
  continueStroke(x: number, y: number, pressure: number): void;
  beginErase(x: number, y: number, pressure: number, isMouse?: boolean): void;
  continueErase(x: number, y: number, pressure: number): void;
  /** Nib footprint for the next stamps, driven by the pen tilt (null = upright). */
  setStrokeTilt(tilt: TiltFootprint | null): void;
  /** Instantaneous stroke speed in doc px per sample, drives velocity dynamics. */
  setStrokeSpeed(speed: number): void;
  /** Temporary predicted stroke points for zero-latency live drawing. */
  renderPredictedStroke(points: { x: number; y: number; pressure: number }[]): void;
  /** Clears the live prediction overlay canvas. */
  clearPredictedStroke(): void;
  beginShape(x: number, y: number): void;
  updateShape(currentX: number, currentY: number): void;
  endStroke(tail?: StrokeTail): void;
  cancelStroke(): void;
  fill(x: number, y: number, colorHex: string, tolerance: number): void;
  encloseAndFill(polygon: { x: number; y: number }[], colorHex: string, tolerance: number): boolean;
  paintUnfilledArea(points: { x: number; y: number }[], radius: number, colorHex: string, tolerance: number): boolean;
  fillSelection(colorHex?: string): void;
  clearActiveLayer(): boolean;
  pushUndoRecord(layerId: string, rect: Rect, data: ImageData | Uint8ClampedArray): void;
  undo(): boolean;
  redo(): boolean;
  canUndo(): boolean;
  canRedo(): boolean;
  clearHistory(): void;
  updateComposite(): void;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Diameter in px for a stamp given pressure, distance walked along stroke, and
 * speed. Combines the pressure curve, the minimum size ratio, the starting
 * taper (smoothstep), and the CSP-style velocity dynamics (tapering when moving fast).
 */
export function brushDiameterAt(
  s: BrushSettings,
  pressure: number,
  distance: number,
  speed = 0,
  isMouse = false,
  stampIndex = 0,
): number {
  const p = clamp01(pressure);
  const curvedP = s.pressureSize ? Math.pow(p, Math.max(0.1, s.pressureCurve)) : 1;
  let smoothStart = 1;

  // In CSP, taperStart (simulated starting needle) is NOT applied to mouse strokes
  // because mouse clicks draw natural full-size stamps without artificial needle points.
  if (!isMouse && s.taperStart > 0) {
    const t = Math.min(1, distance / s.taperStart);
    smoothStart = t * t * (3 - 2 * t);
  }

  // Velocity dynamic factor (CSP 速度によるサイズ影響: quick flicks taper down)
  let speedFactor = 1.0;
  if (s.velocitySize && speed > 1.0) {
    const minRatio = Math.max(0.05, Math.min(1.0, s.velocityMinRatio ?? 0.35));
    const curve = Math.max(0.2, s.velocityCurve ?? 1.0);
    const normalizedSpeed = Math.min(1.0, (speed - 1.0) / 40.0);
    const vFactor = Math.pow(normalizedSpeed, curve);
    speedFactor = 1.0 - (1.0 - minRatio) * vFactor;
  }

  // Deterministic per-dab Random Size dynamic (CSP ランダムによるサイズ影響, e.g. ガサ伽サ線画ペン = 55%)
  let randomFactor = 1.0;
  const minRand = s.randomSizeRatio ?? 1.0;
  if (minRand < 0.995) {
    const clampedMin = Math.max(0.05, Math.min(1.0, minRand));
    const seed = (Math.imul(stampIndex + 1, 2654435761) ^ Math.imul(Math.floor(distance * 3.7), 2246822519)) >>> 0;
    const rand01 = (seed & 0xffff) / 0xffff;
    randomFactor = clampedMin + (1.0 - clampedMin) * rand01;
  }

  const baseFactor = s.minSizeRatio + (1 - s.minSizeRatio) * curvedP;
  // When stylus pressure unloads below 0.22 at the start/end of contact,
  // smoothly taper through minSizeRatio down to MIN_STAMP_DIAMETER so stroke endings are fine:
  const unloadScale = !isMouse && s.pressureSize && p < 0.22 ? Math.pow(p / 0.22, 0.85) : 1.0;

  const factor = isMouse
    ? (s.velocitySize ? s.minSizeRatio + (1 - s.minSizeRatio) * speedFactor : 1.0) * randomFactor
    : baseFactor * unloadScale * smoothStart * speedFactor * randomFactor;

  return Math.max(MIN_STAMP_DIAMETER, s.size * factor);
}

/**
 * Alpha for a single stamp. 'uniform' pens without pressure on density stay
 * fully solid (no overlapping-scale artifacts). Accumulated ink scales the raw
 * flow by the stamp spacing so dense spacing converges smoothly instead of
 * saturating or leaving visible steps. Also supports CSP velocity flow dynamics.
 */
export function brushStampAlpha(s: BrushSettings, pressure: number, speed = 0): number {
  const p = clamp01(pressure);
  let flow = s.pressureFlow ? s.flow * Math.pow(p, 1.2) : s.flow;

  if (s.velocityFlow && speed > 2.0) {
    const norm = Math.min(1.0, (speed - 2.0) / 45.0);
    flow *= 1.0 - norm * 0.30;
  }

  const raw = clamp01(flow);

  if (s.inkMode === 'uniform') {
    return Math.max(0.04, raw);
  }

  // En modo accumulate / watercolor:
  // Con presión alta o flujo alto (trazo decidido), satura al 100% para dar negro sólido y opaco
  if (raw >= 0.75) {
    return 1.0;
  }

  // Con presión baja (veladura y acuarela suave):
  const exponent = Math.max(0.35, s.spacing * 4.0);
  const alpha = 1 - Math.pow(1 - raw, exponent);
  return Math.min(1, Math.max(0.04, alpha));
}

export function selectTipAtStamp(s: BrushSettings, stampIndex: number): TipTextureId | undefined {
  const mode = s.tipCycleMode ?? 'random';
  if (mode === 'single') {
    return s.tipTexture && s.tipTexture !== 'default' ? s.tipTexture : undefined;
  }
  const tipsList: TipTextureId[] =
    s.tipTextures && s.tipTextures.length > 0
      ? s.tipTextures
      : s.tipTexture && s.tipTexture !== 'default'
        ? [s.tipTexture]
        : [];
  if (tipsList.length === 0) return undefined;
  if (tipsList.length === 1) return tipsList[0];

  if (mode === 'sequential') {
    return tipsList[stampIndex % tipsList.length];
  }
  if (mode === 'reverse') {
    const cycleLen = tipsList.length * 2 - 2;
    const posInCycle = stampIndex % cycleLen;
    const idx = posInCycle < tipsList.length ? posInCycle : cycleLen - posInCycle;
    return tipsList[idx];
  }
  // Deterministic pseudo-random per dab index so live prediction never flickers
  const hash = Math.abs(Math.imul(stampIndex + 1, 2654435761)) >>> 0;
  return tipsList[hash % tipsList.length];
}

/**
 * Evaluates CSP's 4 paper texture modes ('subtract' | 'multiply' | 'height' | 'outline')
 * with optional texture inversion at document coordinate (docX, docY).
 */
export function evaluatePaperTextureAtPixel(
  paperTexture: string,
  docX: number,
  docY: number,
  baseAlpha255: number,
  pressure: number,
  density: number,
  scale: number,
  mode: 'subtract' | 'multiply' | 'height' | 'outline' = 'height',
  invert = false,
): number {
  if (baseAlpha255 <= 0 || density <= 0) return baseAlpha255;
  const rawGrain = samplePaperGrain(paperTexture, docX, docY, scale);
  // valley = 0 at paper peak, 1 at deep paper pore
  const valley = invert ? rawGrain : 1.0 - rawGrain;
  const dabA = baseAlpha255 / 255;

  if (mode === 'subtract') {
    const outA = Math.max(0, dabA - valley * density);
    return Math.round(outA * 255);
  }
  if (mode === 'multiply') {
    const outA = dabA * (1.0 - valley * density);
    return Math.round(Math.max(0, Math.min(1, outA)) * 255);
  }
  if (mode === 'outline') {
    const gx =
      samplePaperGrain(paperTexture, docX + 1.5, docY, scale) -
      samplePaperGrain(paperTexture, docX - 1.5, docY, scale);
    const gy =
      samplePaperGrain(paperTexture, docX, docY + 1.5, scale) -
      samplePaperGrain(paperTexture, docX, docY - 1.5, scale);
    let edge = clamp01(Math.hypot(gx, gy) * 2.4);
    if (invert) edge = 1.0 - edge;
    const mod = (1.0 - density) + density * edge;
    return Math.round(baseAlpha255 * mod);
  }

  // Default 'height' (Comparar altura / Realzar textura de CSP)
  const press = clamp01(pressure);
  const effDrive = dabA * (0.62 + 0.38 * press);
  const denom = Math.max(0.12, 1.0 - density * 0.78);
  const hFactor = clamp01((effDrive - valley * density * 0.85) / denom);
  return Math.round(baseAlpha255 * hFactor);
}

function tipAngleRad(s: BrushSettings, dx: number, dy: number): number {
  const isCustomTip = !!(s.tipTexture && s.tipTexture !== 'default');
  const followsStroke =
    (s.ribbon || s.followDirection || isCustomTip || (s.tipShape === 'square' && s.followDirection)) &&
    s.tipShape !== 'calligraphic';
  let dirDeg = 0;
  if (followsStroke && (dx !== 0 || dy !== 0)) {
    dirDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  }
  return ((s.tipAngle + dirDeg) * Math.PI) / 180;
}

function getSprayParticleAngle(s: BrushSettings, activeTip?: TipTextureId, angleRad = 0): number {
  const isRain =
    activeTip === 'rain-1' ||
    activeTip === 'rain-2' ||
    s.tipTexture === 'rain-1' ||
    s.tipTexture === 'rain-2';
  if (isRain) {
    const baseAngle = s.followDirection ? angleRad : (s.tipAngle * Math.PI) / 180;
    // Natural subtle directional jitter of +/- 7 degrees (approx 0.12 rad)
    return baseAngle + (Math.random() - 0.5) * 0.24;
  }
  return Math.random() * Math.PI * 2;
}

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function isEffectivelyVisible(node: LayerNode, layerMap: Map<string, LayerNode>): boolean {
  let curr: LayerNode | undefined = node;
  while (curr) {
    if (!curr.visible) return false;
    curr = curr.parentId ? layerMap.get(curr.parentId) : undefined;
  }
  return true;
}

function getEffectiveOpacity(node: LayerNode, layerMap: Map<string, LayerNode>): number {
  let opacity = node.opacity;
  let curr: LayerNode | undefined = node.parentId ? layerMap.get(node.parentId) : undefined;
  while (curr) {
    opacity *= curr.opacity;
    curr = curr.parentId ? layerMap.get(curr.parentId) : undefined;
  }
  return opacity;
}

export function createBrushEngine(): BrushEngine {
  let curDocW = DOC_W;
  let curDocH = DOC_H;
  const layerManager = createLayerManager(curDocW, curDocH);
  const strokeCanvas = makeCanvas(curDocW, curDocH);
  const compositeCanvas = makeCanvas(curDocW, curDocH);
  const groupCanvas = makeCanvas(curDocW, curDocH);
  const clipCanvas = makeCanvas(curDocW, curDocH);
  const onionCanvas = makeCanvas(curDocW, curDocH);
  const lockAlphaCanvas = makeCanvas(curDocW, curDocH);
  const liveMaskCanvas = makeCanvas(curDocW, curDocH);
  const predictedCanvas = makeCanvas(curDocW, curDocH);
  const layerColorCanvas = makeCanvas(curDocW, curDocH);

  const strokeContext = strokeCanvas.getContext('2d')!;
  const compositeContext = compositeCanvas.getContext('2d')!;
  const groupContext = groupCanvas.getContext('2d')!;
  const clipContext = clipCanvas.getContext('2d')!;
  const onionContext = onionCanvas.getContext('2d')!;
  const lockAlphaContext = lockAlphaCanvas.getContext('2d')!;
  const liveMaskContext = liveMaskCanvas.getContext('2d')!;
  const predictedContext = predictedCanvas.getContext('2d')!;
  const layerColorContext = layerColorCanvas.getContext('2d')!;
  let hasPredictions = false;
  let strokeBoundsMinX = 0;
  let strokeBoundsMinY = 0;
  let strokeBoundsMaxX = 0;
  let strokeBoundsMaxY = 0;

  const history: HistoryManager = createHistoryManager(30);

  let timelineManager: TimelineManager | null = null;

  let mode: 'paint' | 'erase' | 'shape' | null = null;
  let lastX = 0;
  let lastY = 0;
  let lastPressure = 1;
  let lastAngleRad = 0;
  let strokeTilt: TiltFootprint | null = null;
  let distanceSinceStamp = 0;
  let strokeDistance = 0;
  let strokeSettings: BrushSettings = { ...getToolState().brush };
  let currentColorHex = strokeSettings.color;
  let preStrokeSnapshot: ImageData | null = null;
  let preStrokeRect: Rect | null = null;
  let preStrokeLayerId = '';
  let strokePickedColor: [number, number, number, number] | null = null;
  let currentStrokeSpeed = 0;
  let strokeStampIndex = 0;
  let isCurrentStrokeMouse = false;
  let isPredictingStroke = false;

  function samplePreStrokeColor(x: number, y: number): [number, number, number, number] | null {
    if (isPredictingStroke || !preStrokeSnapshot) return null;
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const sw = preStrokeSnapshot.width;
    const sh = preStrokeSnapshot.height;
    if (ix < 0 || ix >= sw || iy < 0 || iy >= sh) return null;
    const idx = (iy * sw + ix) * 4;
    const a = preStrokeSnapshot.data[idx + 3];
    if (a < 5) return null;
    return [
      preStrokeSnapshot.data[idx],
      preStrokeSnapshot.data[idx + 1],
      preStrokeSnapshot.data[idx + 2],
      a / 255,
    ];
  }

  function stampAt(
    ctx: CanvasRenderingContext2D,
    erase: boolean,
    x: number,
    y: number,
    diameter: number,
    pressure: number,
    angleRad: number,
    tipTextureOverride?: TipTextureId,
  ): void {
    const s = strokeSettings;
    const effectiveTip = tipTextureOverride !== undefined ? tipTextureOverride : s.tipTexture;
    let stampColor = erase ? '#000000' : currentColorHex;

    // 1. Dual Color / Sub Color Mix (CSP サブカラーの混合)
    if (!erase && s.subColorMix) {
      const sec = getToolState().secondaryColor || '#ffffff';
      const { r: r2, g: g2, b: b2 } = hexToRgb(sec);
      const { r: r1, g: g1, b: b1 } = hexToRgb(s.color);
      const t = Math.pow(clamp01(pressure), 1.2);
      const r = Math.round(r2 * (1 - t) + r1 * t);
      const g = Math.round(g2 * (1 - t) + g1 * t);
      const b = Math.round(b2 * (1 - t) + b1 * t);
      stampColor = rgbToHex(r, g, b);
      currentColorHex = stampColor;
    }

    // 2. Color Mix and Smudge handling (CSP 色混ぜ / 重ね / なじませ)
    if (!erase && ((s.colorMix && s.colorMix > 0) || (s.smudge && s.smudge > 0))) {
      const sampled = samplePreStrokeColor(x, y);
      const isPureSmudger = s.smudge && s.smudge > 0 && (!s.colorMix || s.colorMix >= 0.8);

      if (sampled && sampled[3] > 0.02) {
        if (s.smudge && s.smudge > 0) {
          if (!strokePickedColor) {
            strokePickedColor = [sampled[0], sampled[1], sampled[2], sampled[3]];
          } else {
            const pickRate = 0.35;
            strokePickedColor[0] = Math.round(strokePickedColor[0] * (1 - pickRate) + sampled[0] * pickRate);
            strokePickedColor[1] = Math.round(strokePickedColor[1] * (1 - pickRate) + sampled[1] * pickRate);
            strokePickedColor[2] = Math.round(strokePickedColor[2] * (1 - pickRate) + sampled[2] * pickRate);
            strokePickedColor[3] = Math.max(strokePickedColor[3], sampled[3]);
          }
          stampColor = rgbToHex(strokePickedColor[0], strokePickedColor[1], strokePickedColor[2]);
          currentColorHex = stampColor;
        } else {
          // Standard watercolor / oil mixing (e.g. lazy-brush 怠けものブラシ)
          const [lr, lg, lb, la] = sampled;
          const { r: br, g: bg, b: bb } = hexToRgb(s.color);
          const baseMix = s.colorMix! * Math.max(0.05, 1.0 - Math.pow(pressure, 1.3) * 0.85);
          const mix = baseMix * la;
          const r = Math.round(br * (1 - mix) + lr * mix);
          const g = Math.round(bg * (1 - mix) + lg * mix);
          const b = Math.round(bb * (1 - mix) + lb * mix);
          stampColor = rgbToHex(r, g, b);
          currentColorHex = stampColor;
        }
      } else {
        // Blank or transparent canvas under cursor
        if (isPureSmudger) {
          if (!strokePickedColor) {
            // Blender on empty canvas: do NOT paint black! Skip stamping completely.
            return;
          }
          strokePickedColor[3] *= 0.96;
          if (strokePickedColor[3] < 0.01) {
            strokePickedColor = null;
            return;
          }
          stampColor = rgbToHex(strokePickedColor[0], strokePickedColor[1], strokePickedColor[2]);
        }
      }
    }

    let alpha = brushStampAlpha(s, pressure, currentStrokeSpeed);

    if (strokePickedColor && s.smudge && s.smudge > 0) {
      alpha *= strokePickedColor[3];
    }

    const hasPaperTooth =
      !erase && !!(s.paperTexture && s.paperTexture !== 'none' && (s.textureDensity ?? 0) > 0);
    const isPencilMedium = hasPaperTooth && s.inkMode === 'accumulate';

    // Pen tilt (REA study 5.1): inking pens ('uniform') never distort diameter
    // or squash circular nibs into directional ribbons. Pencil/pastel brushes
    // ('accumulate' + paperTexture) shade with the side of the lead when tilted!
    let drawDiameter = diameter;
    let roundness = s.tipRoundness;
    let stampAngle = angleRad;
    if (strokeTilt && !s.spray) {
      if (isPencilMedium && strokeTilt.squash < 0.94) {
        const tiltDelta = (1.0 - strokeTilt.squash) / 0.45;
        drawDiameter = diameter * (1.0 + Math.min(0.65, tiltDelta * 0.45));
        roundness = Math.max(0.22, s.tipRoundness * strokeTilt.squash);
        alpha *= 1.0 / (1.0 + Math.min(0.35, tiltDelta * 0.25));
        if (!s.followDirection && s.tipShape !== 'calligraphic') {
          stampAngle = strokeTilt.azimuthRad + (s.tipAngle * Math.PI) / 180;
        }
      } else if (s.tipRoundness < 0.95 && !s.followDirection && s.tipShape !== 'calligraphic') {
        stampAngle = strokeTilt.azimuthRad + (s.tipAngle * Math.PI) / 180;
      }
    }

    if (alpha <= 0.005) return;

    const useDual = !erase && !!s.dualBrushEnabled && !!s.dualTipTexture && s.dualTipTexture !== 'default';

    const stampCanvas = getStampTexture({
      diameter: drawDiameter,
      hardness: s.hardness,
      color: stampColor,
      antiAliasing: s.antiAliasing,
      tipShape: s.tipShape,
      tipRoundness: roundness,
      thicknessDirection: s.thicknessDirection,
      tipTexture: effectiveTip,
      dualBrushEnabled: useDual,
      dualTipShape: s.dualTipShape,
      dualTipTexture: s.dualTipTexture,
      dualSizeRatio: s.dualSizeRatio,
      dualBlendMode: s.dualBlendMode,
    });

    const w = stampCanvas.width;
    const h = stampCanvas.height;
    const symmetric =
      !useDual &&
      s.tipShape === 'circle' &&
      roundness >= 0.999 &&
      (!effectiveTip || effectiveTip === 'default');

    const padB = Math.ceil(Math.max(w, h) * 0.6) + 4;
    if (x - padB < strokeBoundsMinX) strokeBoundsMinX = Math.max(0, Math.floor(x - padB));
    if (y - padB < strokeBoundsMinY) strokeBoundsMinY = Math.max(0, Math.floor(y - padB));
    if (x + padB > strokeBoundsMaxX) strokeBoundsMaxX = Math.min(curDocW, Math.ceil(x + padB));
    if (y + padB > strokeBoundsMaxY) strokeBoundsMaxY = Math.min(curDocH, Math.ceil(y + padB));

    ctx.save();
    if (erase) {
      ctx.globalCompositeOperation = 'destination-out';
    } else if (s.compositeMode === 'lighter') {
      ctx.globalCompositeOperation = 'lighter';
    }
    ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
    if (!symmetric && stampAngle !== 0) {
      ctx.translate(x, y);
      ctx.rotate(stampAngle);
      ctx.drawImage(stampCanvas, -w / 2, -h / 2);
    } else {
      // Padded texture drawn from its center: true sub-pixel positioning.
      ctx.drawImage(stampCanvas, x - w / 2, y - h / 2);
    }
    ctx.restore();
  }

  function stampAlong(
    ctx: CanvasRenderingContext2D,
    erase: boolean,
    x0: number,
    y0: number,
    p0: number,
    x1: number,
    y1: number,
    p1: number,
  ): void {
    const s = strokeSettings;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const segment = Math.hypot(dx, dy);
    if (segment === 0) return;

    const spacing = s.ribbon
      ? Math.min(0.85, Math.max(0.20, s.spacing))
      : Math.min(0.75, Math.max(0.06, s.spacing));
    const angleRad = tipAngleRad(s, dx, dy);
    lastAngleRad = angleRad;

    let pos = 0;
    let since = distanceSinceStamp;
    let guard = 0;

    for (;;) {
      if (++guard > STAMP_GUARD) break;
      const u = pos / segment;
      const pAt = p0 + (p1 - p0) * u;
      const diam = brushDiameterAt(s, pAt, strokeDistance + pos, currentStrokeSpeed, isCurrentStrokeMouse);
      // CSP-style StrokeIntervalMinimum: bounds minimum distance between dabs so fine needle ends don't create thousands of overlapping stamps
      const minStep = Math.max(MIN_STAMP_STEP, Math.min(3.0, diam * 0.16));
      const effectiveSpacing = Math.max(0.09, spacing);
      const step = Math.max(minStep, diam * effectiveSpacing);
      let need = step - since;
      if (need < 0) need = 0;
      if (pos + need > segment) {
        since += segment - pos;
        break;
      }
      pos += need;
      since = 0;
      const u2 = pos / segment;
      const p2 = p0 + (p1 - p0) * u2;

      const activeTip = selectTipAtStamp(s, strokeStampIndex);
      strokeStampIndex++;

      if (s.spray) {
        const count = Math.max(1, Math.round(s.sprayDensity ?? 5));
        const baseDiam = brushDiameterAt(s, p2, strokeDistance + pos, currentStrokeSpeed, isCurrentStrokeMouse);
        const radius = s.sprayRadius ?? Math.max(12, baseDiam * 1.5);
        for (let k = 0; k < count; k++) {
          const r = radius * Math.sqrt(Math.random());
          const th = Math.random() * Math.PI * 2;
          const sx = x0 + dx * u2 + r * Math.cos(th);
          const sy = y0 + dy * u2 + r * Math.sin(th);
          // CSP Spray Bucketing: discrete scale factors guarantee 100% texture cache hits
          const bucket = SPRAY_SCALE_BUCKETS[Math.floor(Math.random() * SPRAY_SCALE_BUCKETS.length)];
          const pSize = Math.max(MIN_STAMP_DIAMETER, Math.round(baseDiam * bucket));
          const pAngle = getSprayParticleAngle(s, activeTip, angleRad);
          stampAt(ctx, erase, sx, sy, pSize, p2, pAngle, activeTip);
        }
      } else {
        const isCustomTip = !!(activeTip && activeTip !== 'default') || !!(s.tipTexture && s.tipTexture !== 'default');
        const stampAngle =
          isCustomTip && !s.ribbon
            ? angleRad + Math.sin(pos * 0.7 + strokeStampIndex) * 0.08
            : angleRad;
        stampAt(
          ctx,
          erase,
          x0 + dx * u2,
          y0 + dy * u2,
          brushDiameterAt(s, p2, strokeDistance + pos, currentStrokeSpeed, isCurrentStrokeMouse, strokeStampIndex),
          p2,
          stampAngle,
          activeTip,
        );
      }
    }

    strokeDistance += segment;
    distanceSinceStamp = since;
  }

  function renderPredictedStroke(points: { x: number; y: number; pressure: number }[]): void {
    if (!mode || mode === 'shape' || points.length === 0) return;
    const t0 = performance.now();
    predictedContext.clearRect(0, 0, curDocW, curDocH);
    hasPredictions = true;

    let prevX = lastX;
    let prevY = lastY;
    let prevP = lastPressure;

    const erase = mode === 'erase';
    const eraseToStroke = erase && selectionModel.hasSelection();
    const isEraseOp = erase && !eraseToStroke;

    const savedDist = strokeDistance;
    const savedSince = distanceSinceStamp;
    const savedStampIdx = strokeStampIndex;
    const savedAngle = lastAngleRad;

    brushDiagnostics.inPredictedStroke = true;
    isPredictingStroke = true;
    try {
      for (const pt of points) {
        stampAlong(predictedContext, isEraseOp, prevX, prevY, prevP, pt.x, pt.y, pt.pressure);
        prevX = pt.x;
        prevY = pt.y;
        prevP = pt.pressure;
      }
    } finally {
      brushDiagnostics.inPredictedStroke = false;
      isPredictingStroke = false;
    }

    strokeDistance = savedDist;
    distanceSinceStamp = savedSince;
    strokeStampIndex = savedStampIdx;
    lastAngleRad = savedAngle;
    engine.compositeDirty = true;
    brushDiagnostics.recordPredictedStroke(performance.now() - t0);
  }

  function clearPredictedStroke(): void {
    if (hasPredictions) {
      predictedContext.clearRect(0, 0, curDocW, curDocH);
      hasPredictions = false;
      engine.compositeDirty = true;
    }
  }

  function finishStroke(): void {
    clearPredictedStroke();
    if (!mode) return;
    const active = layerManager.getActiveDrawableLayer();

    if (mode === 'paint' || mode === 'shape') {
      if (active.context) {
        // Apply GPU paper grain texture across stroke bounds (CSP style single-pass continuous texture)
        if (
          mode === 'paint' &&
          strokeSettings.paperTexture &&
          strokeSettings.paperTexture !== 'none' &&
          (strokeSettings.textureDensity ?? 0) > 0 &&
          strokeBoundsMaxX > strokeBoundsMinX &&
          strokeBoundsMaxY > strokeBoundsMinY
        ) {
          const bx = strokeBoundsMinX;
          const by = strokeBoundsMinY;
          const bw = strokeBoundsMaxX - strokeBoundsMinX;
          const bh = strokeBoundsMaxY - strokeBoundsMinY;
          const density = clamp01(strokeSettings.textureDensity ?? 0.85);
          const scale = strokeSettings.textureScale ?? 0.35;
          const texMode = strokeSettings.textureMode ?? 'height';
          const texInvert = !!strokeSettings.textureInvert;
          const pattern = getPaperGrainPattern(
            strokeContext,
            strokeSettings.paperTexture,
            scale,
            density,
            texMode,
            texInvert,
          );
          if (pattern) {
            strokeContext.save();
            strokeContext.globalCompositeOperation = 'destination-in';
            strokeContext.fillStyle = pattern;
            strokeContext.fillRect(bx, by, bw, bh);
            strokeContext.restore();
          }
        }

        if (selectionModel.hasSelection()) {
          strokeContext.save();
          strokeContext.globalCompositeOperation = 'destination-in';
          strokeContext.drawImage(selectionModel.maskCanvas, 0, 0);
          strokeContext.restore();
        }
        active.context.save();
        if (active.lockAlpha) {
          active.context.globalCompositeOperation = 'source-atop';
        } else if (strokeSettings.compositeMode === 'lighter') {
          active.context.globalCompositeOperation = 'lighter';
        }
        active.context.globalAlpha = getToolState().brush.opacity;
        active.context.drawImage(strokeCanvas, 0, 0);
        active.context.restore();
      }
      strokeContext.clearRect(0, 0, curDocW, curDocH);
    } else if (mode === 'erase' && selectionModel.hasSelection()) {
      if (active.context) {
        strokeContext.save();
        strokeContext.globalCompositeOperation = 'destination-in';
        strokeContext.drawImage(selectionModel.maskCanvas, 0, 0);
        strokeContext.restore();

        active.context.save();
        active.context.globalCompositeOperation = 'destination-out';
        active.context.drawImage(strokeCanvas, 0, 0);
        active.context.restore();
      }
      strokeContext.clearRect(0, 0, curDocW, curDocH);
    }

    if (preStrokeSnapshot && preStrokeRect) {
      history.push(preStrokeLayerId, preStrokeRect, preStrokeSnapshot.data);
      meshCache.delete(preStrokeLayerId);
      preStrokeSnapshot = null;
      preStrokeRect = null;
    }
    engine.compositeDirty = true;
    mode = null;
    brushDiagnostics.endStroke();
  }

  const meshCache = new Map<string, { boneCount: number; mesh: LayerMeshSkin }>();

  function drawBonesOverlay(
    ctx: CanvasRenderingContext2D,
    evaluatedBones: Map<string, EvaluatedBoneWorld>,
    selectedBoneId: string | null
  ): void {
    const toolState = getToolState();
    const isBoneTool = toolState.tool === 'bone';
    if (!toolState.showBonesOverlay && !isBoneTool) return;
    if (evaluatedBones.size === 0) return;

    ctx.save();

    // 1. Dashed parent-child hierarchy connectors (when child head is detached from parent tail)
    for (const b of evaluatedBones.values()) {
      if (!b.parentId) continue;
      const parent = evaluatedBones.get(b.parentId);
      if (!parent) continue;
      const gap = Math.hypot(b.headX - parent.tailX, b.headY - parent.tailY);
      if (gap > 2) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(parent.tailX, parent.tailY);
        ctx.lineTo(b.headX, b.headY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // 2. Draw each bone kite/diamond and joints
    for (const b of evaluatedBones.values()) {
      const isSelected = b.id === selectedBoneId;
      const dx = b.tailX - b.headX;
      const dy = b.tailY - b.headY;
      const len = Math.max(1, Math.hypot(dx, dy));
      const ux = dx / len;
      const uy = dy / len;
      const px = -uy;
      const py = ux;

      // Kite width at 22% along the bone
      const shoulderDist = Math.min(len * 0.22, 24);
      const halfWidth = Math.max(5, Math.min(14, len * 0.1));
      const sx = b.headX + ux * shoulderDist;
      const sy = b.headY + uy * shoulderDist;

      ctx.beginPath();
      ctx.moveTo(b.headX, b.headY);
      ctx.lineTo(sx + px * halfWidth, sy + py * halfWidth);
      ctx.lineTo(b.tailX, b.tailY);
      ctx.lineTo(sx - px * halfWidth, sy - py * halfWidth);
      ctx.closePath();

      ctx.fillStyle = isSelected ? 'rgba(255, 212, 59, 0.48)' : `${b.color}44`;
      ctx.fill();
      ctx.lineWidth = isSelected ? 2.4 : 1.6;
      ctx.strokeStyle = isSelected ? '#ffd43b' : b.color;
      ctx.stroke();

      // Head Joint Circle
      ctx.beginPath();
      ctx.arc(b.headX, b.headY, isSelected ? 6.5 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? '#ffd43b' : '#161616';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isSelected ? '#ffffff' : b.color;
      ctx.stroke();

      // Tail Joint (End / IK Handle) Circle
      ctx.beginPath();
      ctx.arc(b.tailX, b.tailY, isSelected ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = toolState.boneMode === 'pose_ik' ? '#ff6b6b' : b.color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#111111';
      ctx.stroke();

      // Label when bone tool is active or bone is selected
      if (isBoneTool || isSelected) {
        ctx.font = '600 11px sans-serif';
        const midX = (b.headX + b.tailX) / 2;
        const midY = (b.headY + b.tailY) / 2 - 8;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillText(b.name, midX + 1, midY + 1);
        ctx.fillStyle = isSelected ? '#ffd43b' : '#ffffff';
        ctx.fillText(b.name, midX, midY);
      }
    }

    ctx.restore();
  }

  function updateComposite(): void {
    const t0 = performance.now();
    compositeContext.clearRect(0, 0, curDocW, curDocH);

    const layerMap = new Map(layerManager.layers.map((l) => [l.id, l]));
    const activeDrawable = layerManager.getActiveDrawableLayer();
    const evaluatedBones =
      timelineManager && timelineManager.bones.length > 0
        ? timelineManager.getEvaluatedBones(timelineManager.settings.currentFrame)
        : null;

    function getEffectiveBoundBoneId(layer: LayerNode): string | null {
      let curr: LayerNode | undefined = layer;
      while (curr) {
        if (curr.boundBoneId) return curr.boundBoneId;
        curr = curr.parentId ? layerMap.get(curr.parentId) : undefined;
      }
      return null;
    }

    function isLayerMeshSkinned(layer: LayerNode): boolean {
      let curr: LayerNode | undefined = layer;
      while (curr) {
        if (curr.meshSkinningEnabled) return true;
        curr = curr.parentId ? layerMap.get(curr.parentId) : undefined;
      }
      return false;
    }

    function renderLayerTo(targetCtx: CanvasRenderingContext2D, layer: LayerNode, alpha: number): void {
      if (!layer.canvas) return;
      const kfTransform =
        timelineManager && !layer.isPaper
          ? timelineManager.getLayerTransformAtFrame(layer, timelineManager.settings.currentFrame)
          : null;

      targetCtx.save();
      const effectiveAlpha = kfTransform ? alpha * kfTransform.opacity : alpha;
      targetCtx.globalAlpha = Math.max(0, Math.min(1, effectiveAlpha));
      targetCtx.globalCompositeOperation = layer.blendMode;

      // 1. Track Keyframe Transform (Position, Rotation, Scale)
      if (
        kfTransform &&
        (kfTransform.x !== 0 ||
          kfTransform.y !== 0 ||
          kfTransform.scaleX !== 1 ||
          kfTransform.scaleY !== 1 ||
          kfTransform.rotation !== 0)
      ) {
        const cx = curDocW / 2;
        const cy = curDocH / 2;
        targetCtx.translate(cx + kfTransform.x, cy + kfTransform.y);
        if (kfTransform.rotation !== 0) {
          targetCtx.rotate((kfTransform.rotation * Math.PI) / 180);
        }
        if (kfTransform.scaleX !== 1 || kfTransform.scaleY !== 1) {
          targetCtx.scale(kfTransform.scaleX, kfTransform.scaleY);
        }
        targetCtx.translate(-cx, -cy);
      }

      // 2. Bone Deformation: Either Automatic Multi-Bone Mesh Skinning (LBS) or Rigid Bone Binding
      const useMeshSkin =
        !layer.isPaper && evaluatedBones && evaluatedBones.size > 0 && isLayerMeshSkinned(layer);
      const boundBoneId = !layer.isPaper && evaluatedBones ? getEffectiveBoundBoneId(layer) : null;
      const boundBoneEval = boundBoneId && evaluatedBones ? evaluatedBones.get(boundBoneId) : undefined;

      const isLivePainting = layer.id === activeDrawable.id && (mode === 'paint' || mode === 'shape');
      let sourceCanvasToDraw = layer.canvas;
      let liveStrokeDrawnInTint = false;

      // Real-time GPU Paper/Canvas grain & Selection mask compositing (Clip Studio Paint style live texture)
      const hasPaperTooth =
        mode === 'paint' &&
        !!(
          strokeSettings.paperTexture &&
          strokeSettings.paperTexture !== 'none' &&
          (strokeSettings.textureDensity ?? 0) > 0
        );
      const hasSelection = selectionModel.hasSelection();
      const needsLiveMask = isLivePainting && (hasPaperTooth || hasSelection);

      if (needsLiveMask) {
        liveMaskContext.clearRect(0, 0, curDocW, curDocH);
        liveMaskContext.drawImage(strokeCanvas, 0, 0);
        if (hasPredictions) {
          liveMaskContext.drawImage(predictedCanvas, 0, 0);
        }
        if (hasPaperTooth) {
          const density = clamp01(strokeSettings.textureDensity ?? 0.85);
          const scale = strokeSettings.textureScale ?? 0.35;
          const texMode = strokeSettings.textureMode ?? 'height';
          const texInvert = !!strokeSettings.textureInvert;
          const pattern = getPaperGrainPattern(
            liveMaskContext,
            strokeSettings.paperTexture!,
            scale,
            density,
            texMode,
            texInvert
          );
          if (pattern) {
            liveMaskContext.save();
            liveMaskContext.globalCompositeOperation = 'destination-in';
            liveMaskContext.fillStyle = pattern;
            liveMaskContext.fillRect(0, 0, curDocW, curDocH);
            liveMaskContext.restore();
          }
        }
        if (hasSelection) {
          liveMaskContext.save();
          liveMaskContext.globalCompositeOperation = 'destination-in';
          liveMaskContext.drawImage(selectionModel.maskCanvas, 0, 0);
          liveMaskContext.restore();
        }
      }

      if (isLivePainting && layer.lockAlpha) {
        lockAlphaContext.clearRect(0, 0, curDocW, curDocH);
        lockAlphaContext.drawImage(layer.canvas, 0, 0);
        lockAlphaContext.save();
        lockAlphaContext.globalCompositeOperation = 'source-atop';
        lockAlphaContext.globalAlpha = getToolState().brush.opacity;
        if (needsLiveMask) {
          lockAlphaContext.drawImage(liveMaskCanvas, 0, 0);
        } else {
          lockAlphaContext.drawImage(strokeCanvas, 0, 0);
          if (hasPredictions) {
            lockAlphaContext.drawImage(predictedCanvas, 0, 0);
          }
        }
        lockAlphaContext.restore();
        sourceCanvasToDraw = lockAlphaCanvas;
      }

      // CSP Layer Color Effect (Azul de boceto / Sketch cyan non-destructive tint)
      if (layer.useLayerColor && !layer.isPaper) {
        layerColorContext.clearRect(0, 0, curDocW, curDocH);
        layerColorContext.drawImage(sourceCanvasToDraw, 0, 0);

        if (isLivePainting && !layer.lockAlpha) {
          layerColorContext.save();
          layerColorContext.globalAlpha = getToolState().brush.opacity;
          if (strokeSettings.compositeMode === 'lighter') {
            layerColorContext.globalCompositeOperation = 'lighter';
          }
          if (needsLiveMask) {
            layerColorContext.drawImage(liveMaskCanvas, 0, 0);
          } else {
            layerColorContext.drawImage(strokeCanvas, 0, 0);
            if (hasPredictions) {
              layerColorContext.drawImage(predictedCanvas, 0, 0);
            }
          }
          layerColorContext.restore();
          liveStrokeDrawnInTint = true;
        }

        layerColorContext.save();
        layerColorContext.globalCompositeOperation = 'source-in';
        layerColorContext.fillStyle = layer.layerColor || '#00a0e9';
        layerColorContext.fillRect(0, 0, curDocW, curDocH);
        layerColorContext.restore();

        sourceCanvasToDraw = layerColorCanvas;
      }

      const ox = layer.offsetX ?? 0;
      const oy = layer.offsetY ?? 0;

      if (useMeshSkin && timelineManager && evaluatedBones) {
        let cached = meshCache.get(layer.id);
        if (!cached || cached.boneCount !== timelineManager.bones.length) {
          const built = buildLayerMeshSkin(layer.id, sourceCanvasToDraw, timelineManager.bones, 10, 10);
          if (built) {
            cached = { boneCount: timelineManager.bones.length, mesh: built };
            meshCache.set(layer.id, cached);
          }
        }
        if (cached) {
          renderSkinnedLayerMesh(targetCtx, sourceCanvasToDraw, cached.mesh, evaluatedBones);
        } else {
          targetCtx.drawImage(sourceCanvasToDraw, ox, oy);
        }
      } else if (boundBoneEval) {
        const [a, b, c, d, tx, ty] = boundBoneEval.skinMatrix;
        targetCtx.transform(a, b, c, d, tx, ty);
        targetCtx.drawImage(sourceCanvasToDraw, ox, oy);
      } else {
        targetCtx.drawImage(sourceCanvasToDraw, ox, oy);
      }

      if (isLivePainting && !layer.lockAlpha && !liveStrokeDrawnInTint) {
        targetCtx.globalAlpha = Math.max(0, Math.min(1, effectiveAlpha * getToolState().brush.opacity));
        if (strokeSettings.compositeMode === 'lighter') {
          targetCtx.globalCompositeOperation = 'lighter';
        }
        if (needsLiveMask) {
          if (mode === 'erase') {
            targetCtx.save();
            targetCtx.globalCompositeOperation = 'destination-out';
            targetCtx.drawImage(liveMaskCanvas, 0, 0);
            targetCtx.restore();
          } else {
            targetCtx.drawImage(liveMaskCanvas, 0, 0);
          }
        } else {
          targetCtx.drawImage(strokeCanvas, 0, 0);
          if (hasPredictions) {
            targetCtx.drawImage(predictedCanvas, 0, 0);
          }
        }
      }
      targetCtx.restore();
    }

    // 1. Render Paper layer first if present
    const paperLayer = layerManager.layers.find((l) => l.isPaper && l.visible);
    if (paperLayer && paperLayer.canvas) {
      renderLayerTo(compositeContext, paperLayer, paperLayer.opacity);
    }

    // 2. Render Onion Skinning if enabled (Papel Cebolla con mesa de luz integrada)
    if (timelineManager && timelineManager.onionSkin.enabled && timelineManager.tracks.length > 0) {
      for (const track of timelineManager.tracks) {
        if (!track.visible) continue;
        const onionCels = timelineManager.getOnionSkinCels(track.id, timelineManager.settings.currentFrame);
        for (const item of onionCels) {
          if (!item.layer.canvas) continue;
          onionContext.clearRect(0, 0, curDocW, curDocH);
          onionContext.save();

          const cx = curDocW / 2;
          const cy = curDocH / 2;

          // Track animated keyframe transform
          if (
            item.transform &&
            (item.transform.x !== 0 ||
              item.transform.y !== 0 ||
              item.transform.scaleX !== 1 ||
              item.transform.scaleY !== 1 ||
              item.transform.rotation !== 0)
          ) {
            onionContext.translate(cx + item.transform.x, cy + item.transform.y);
            onionContext.rotate((item.transform.rotation * Math.PI) / 180);
            onionContext.scale(item.transform.scaleX, item.transform.scaleY);
            onionContext.translate(-cx, -cy);
          }

          // Onion skin manual calibration transform (Light Table alignment: offset, rotate, scale, flip)
          if (item.onionTransform) {
            const ot = item.onionTransform;
            const rot = (ot.rotation * Math.PI) / 180;
            const sx = ot.scaleX * (ot.flipX ? -1 : 1);
            const sy = ot.scaleY * (ot.flipY ? -1 : 1);

            onionContext.translate(cx + ot.x, cy + ot.y);
            if (rot !== 0) onionContext.rotate(rot);
            if (sx !== 1 || sy !== 1) onionContext.scale(sx, sy);
            onionContext.translate(-cx, -cy);
          }

          onionContext.drawImage(item.layer.canvas, 0, 0);
          onionContext.restore();

          // Apply tint color if monochrome tint mode is active
          if (timelineManager.onionSkin.mode === 'tint' && item.tintColor) {
            onionContext.save();
            onionContext.globalCompositeOperation = 'source-in';
            onionContext.fillStyle = item.tintColor;
            onionContext.fillRect(0, 0, curDocW, curDocH);
            onionContext.restore();
          }

          compositeContext.save();
          compositeContext.globalAlpha = item.opacity * (item.transform?.opacity ?? 1);
          compositeContext.drawImage(onionCanvas, 0, 0);
          compositeContext.restore();
        }
      }
    }

    // Pre-calculate active cel IDs across all animation tracks for O(1) visibility checking
    const activeAnimationCelIds = new Set<string>();
    if (timelineManager) {
      const curFrame = timelineManager.settings.currentFrame;
      for (const t of timelineManager.tracks) {
        const cel = timelineManager.getActiveCelForFrame(t.id, curFrame);
        if (cel) activeAnimationCelIds.add(cel.id);
      }
    }

    // 3. Filter visible non-paper raster layers (respecting animation timeline active cels & folder hierarchy)
    const renderOrdered = getRenderOrder(layerManager.layers);
    const visibleLayers = renderOrdered.filter((l) => {
      if (l.type !== 'raster' || !l.canvas || l.isPaper) return false;
      if (!isEffectivelyVisible(l, layerMap)) return false;
      if (timelineManager && l.parentId) {
        const parent = layerMap.get(l.parentId);
        if (parent && parent.isAnimationFolder) {
          return activeAnimationCelIds.has(l.id);
        }
      }
      return true;
    });

    let i = 0;
    while (i < visibleLayers.length) {
      const baseLayer = visibleLayers[i];
      const baseOpacity = getEffectiveOpacity(baseLayer, layerMap);

      // Check for consecutive clipped layers above baseLayer
      const clippedGroup: LayerNode[] = [];
      let j = i + 1;
      while (j < visibleLayers.length && visibleLayers[j].clipped) {
        clippedGroup.push(visibleLayers[j]);
        j++;
      }

      if (clippedGroup.length === 0) {
        renderLayerTo(compositeContext, baseLayer, baseOpacity);
        i++;
      } else {
        // Clipping Mask Cluster: Mask each clipped layer with baseLayer's alpha
        groupContext.clearRect(0, 0, curDocW, curDocH);
        renderLayerTo(groupContext, baseLayer, 1);

        for (const clipped of clippedGroup) {
          const clippedOpacity = getEffectiveOpacity(clipped, layerMap);

          clipContext.clearRect(0, 0, curDocW, curDocH);
          renderLayerTo(clipContext, clipped, clippedOpacity);

          clipContext.save();
          clipContext.globalCompositeOperation = 'destination-in';
          clipContext.drawImage(baseLayer.canvas!, 0, 0);
          clipContext.restore();

          groupContext.save();
          groupContext.globalCompositeOperation = clipped.blendMode;
          groupContext.drawImage(clipCanvas, 0, 0);
          groupContext.restore();
        }

        compositeContext.save();
        compositeContext.globalAlpha = baseOpacity;
        compositeContext.globalCompositeOperation = baseLayer.blendMode;
        compositeContext.drawImage(groupCanvas, 0, 0);
        compositeContext.restore();

        i = j;
      }
    }

    // 4. Render 2D Bone Armature Gizmo Overlay (when enabled or when Bone Tool is active)
    if (timelineManager && evaluatedBones && evaluatedBones.size > 0 && !timelineManager.settings.isPlaying) {
      drawBonesOverlay(compositeContext, evaluatedBones, timelineManager.selectedBoneId);
    }

    engine.compositeDirty = false;
    if (engine.onCompositeUpdated) {
      engine.onCompositeUpdated();
    }
    brushDiagnostics.recordComposite(performance.now() - t0);
  }

  function beginInkStroke(x: number, y: number, pressure: number, erase: boolean, isMouse = false): void {
    const active = layerManager.getActiveDrawableLayer();
    if (!active.context || active.locked || active.isPaper) return;
    if (erase && active.lockAlpha) return;

    // Snapshot pre-stroke state for undo. To prevent gigabytes of RAM usage,
    // we capture the full document if small, or start with full and crop to bounding box on finish.
    preStrokeRect = { x: 0, y: 0, w: curDocW, h: curDocH };
    preStrokeSnapshot = active.context.getImageData(0, 0, curDocW, curDocH);
    preStrokeLayerId = active.id;

    isCurrentStrokeMouse = isMouse;
    strokeSettings = { ...getToolState().brush };
    currentColorHex = strokeSettings.color;
    mode = erase ? 'erase' : 'paint';
    const activeSub = getActiveSubTool();
    brushDiagnostics.startStroke(activeSub?.name || (erase ? 'Borrador' : 'Pincel'), getToolState().activeSubToolId);
    lastX = x;
    lastY = y;
    lastPressure = pressure;
    lastAngleRad = tipAngleRad(strokeSettings, 0, 0);
    distanceSinceStamp = 0;
    strokeDistance = 0;
    strokeStampIndex = 0;
    strokeBoundsMinX = curDocW;
    strokeBoundsMinY = curDocH;
    strokeBoundsMaxX = 0;
    strokeBoundsMaxY = 0;

    strokePickedColor = null;

    const firstTip = selectTipAtStamp(strokeSettings, 0);
    strokeStampIndex = 1;

    // First stamp sits at distance 0
    const eraseToStroke = erase && selectionModel.hasSelection();
    const targetCtx = erase ? (eraseToStroke ? strokeContext : active.context) : strokeContext;
    const isEraseOp = erase && !eraseToStroke;

    if (strokeSettings.spray) {
      const count = Math.max(1, Math.round(strokeSettings.sprayDensity ?? 5));
      const baseDiam = brushDiameterAt(strokeSettings, pressure, 0, 0, isCurrentStrokeMouse);
      const radius = strokeSettings.sprayRadius ?? Math.max(12, baseDiam * 1.5);
      for (let k = 0; k < count; k++) {
        const r = radius * Math.sqrt(Math.random());
        const th = Math.random() * Math.PI * 2;
        const sx = x + r * Math.cos(th);
        const sy = y + r * Math.sin(th);
        const bucket = SPRAY_SCALE_BUCKETS[Math.floor(Math.random() * SPRAY_SCALE_BUCKETS.length)];
        const pSize = Math.max(MIN_STAMP_DIAMETER, Math.round(baseDiam * bucket));
        const pAngle = getSprayParticleAngle(strokeSettings, firstTip, lastAngleRad);
        stampAt(targetCtx, isEraseOp, sx, sy, pSize, pressure, pAngle, firstTip);
      }
    } else {
      stampAt(
        targetCtx,
        isEraseOp,
        x,
        y,
        brushDiameterAt(strokeSettings, pressure, 0, 0, isCurrentStrokeMouse),
        pressure,
        lastAngleRad,
        firstTip,
      );
    }
    engine.compositeDirty = true;
  }

  // Subscribe to layer changes to trigger composite update
  layerManager.subscribe(() => {
    engine.compositeDirty = true;
  });

  function setDocumentSize(w: number, h: number): void {
    curDocW = w;
    curDocH = h;
    engine.docW = w;
    engine.docH = h;
    layerManager.resize(w, h);

    strokeCanvas.width = w;
    strokeCanvas.height = h;
    compositeCanvas.width = w;
    compositeCanvas.height = h;
    groupCanvas.width = w;
    groupCanvas.height = h;
    clipCanvas.width = w;
    clipCanvas.height = h;
    onionCanvas.width = w;
    onionCanvas.height = h;
    lockAlphaCanvas.width = w;
    lockAlphaCanvas.height = h;
    liveMaskCanvas.width = w;
    liveMaskCanvas.height = h;
    predictedCanvas.width = w;
    predictedCanvas.height = h;
    layerColorCanvas.width = w;
    layerColorCanvas.height = h;

    selectionModel.resize(w, h);

    if (engine.onDocumentResize) {
      engine.onDocumentResize(w, h);
    }

    engine.compositeDirty = true;
    engine.updateComposite();
  }

  const engine: BrushEngine = {
    docW: curDocW,
    docH: curDocH,
    setDocumentSize,
    layerManager,
    strokeCanvas,
    compositeCanvas,
    compositeDirty: true,
    setTimelineManager(tm: TimelineManager) {
      timelineManager = tm;
      tm.subscribe(() => {
        if (getToolState().boneMode === 'rig') {
          meshCache.clear();
        }
        engine.compositeDirty = true;
      });
      engine.compositeDirty = true;
    },
    getTimelineManager() {
      return timelineManager;
    },
    beginStroke(x, y, pressure, isMouse) {
      currentStrokeSpeed = 0;
      finishStroke();
      beginInkStroke(x, y, pressure, false, !!isMouse);
    },
    setStrokeTilt(tilt) {
      strokeTilt = tilt;
    },
    setStrokeSpeed(speed) {
      currentStrokeSpeed = Math.max(0, speed);
    },
    renderPredictedStroke(points) {
      renderPredictedStroke(points);
    },
    clearPredictedStroke() {
      clearPredictedStroke();
    },
    continueStroke(x, y, pressure) {
      if (mode !== 'paint') return;

      stampAlong(strokeContext, false, lastX, lastY, lastPressure, x, y, pressure);
      lastX = x;
      lastY = y;
      lastPressure = pressure;
      engine.compositeDirty = true;
    },
    beginErase(x, y, pressure, isMouse) {
      currentStrokeSpeed = 0;
      finishStroke();
      beginInkStroke(x, y, pressure, true, !!isMouse);
    },
    continueErase(x, y, pressure) {
      if (mode !== 'erase') return;
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper || active.lockAlpha) return;

      const eraseToStroke = selectionModel.hasSelection();
      const targetCtx = eraseToStroke ? strokeContext : active.context;
      stampAlong(targetCtx, !eraseToStroke, lastX, lastY, lastPressure, x, y, pressure);
      lastX = x;
      lastY = y;
      lastPressure = pressure;
      engine.compositeDirty = true;
    },
    beginShape(x, y) {
      finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;
      preStrokeRect = { x: 0, y: 0, w: curDocW, h: curDocH };
      preStrokeSnapshot = active.context.getImageData(0, 0, curDocW, curDocH);
      preStrokeLayerId = active.id;
      mode = 'shape';
      lastX = x;
      lastY = y;
      strokeContext.clearRect(0, 0, curDocW, curDocH);
      engine.compositeDirty = true;
    },
    updateShape(currentX, currentY) {
      if (mode !== 'shape') return;
      strokeContext.clearRect(0, 0, curDocW, curDocH);
      const { size, color, shapeType, shapeFill } = getToolState().brush;
      drawShape(strokeContext, lastX, lastY, currentX, currentY, shapeType, shapeFill, size, color);
      engine.compositeDirty = true;
    },
    endStroke(_tail) {
      finishStroke();
      strokeTilt = null;
      currentStrokeSpeed = 0;
    },
    cancelStroke() {
      clearPredictedStroke();
      strokeContext.clearRect(0, 0, curDocW, curDocH);
      if (mode === 'erase' && preStrokeSnapshot && preStrokeRect) {
        const active = layerManager.getActiveDrawableLayer();
        if (active && active.context && active.id === preStrokeLayerId) {
          active.context.putImageData(preStrokeSnapshot, preStrokeRect.x, preStrokeRect.y);
        }
      }
      preStrokeSnapshot = null;
      preStrokeRect = null;
      mode = null;
      strokeTilt = null;
      currentStrokeSpeed = 0;
      engine.compositeDirty = true;
    },
    fill(x, y, colorHex, tolerance) {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;
      if (selectionModel.hasSelection() && !selectionModel.isPixelSelected(x, y)) {
        return;
      }
      const fullRect: Rect = { x: 0, y: 0, w: curDocW, h: curDocH };
      const current = active.context.getImageData(0, 0, curDocW, curDocH);
      history.push(active.id, fullRect, current);

      const bSettings = getToolState().brush;
      const handled = executeSmartFill({
        seedX: x,
        seedY: y,
        fillColorHex: colorHex,
        tolerance,
        closeGap: bSettings.closeGap ?? 0,
        areaScaling: bSettings.areaScaling ?? 1,
        referMode: bSettings.referMode ?? 'all',
        activeLayer: active,
        allLayers: layerManager.layers,
        selectionMaskCanvas: selectionModel.hasSelection() ? selectionModel.maskCanvas : null,
        docW: curDocW,
        docH: curDocH,
      });

      if (!handled) {
        floodFill(active.context, x, y, colorHex, tolerance);
        if (selectionModel.hasSelection()) {
          // If selection is active, restore pixels outside selection using pre-fill snapshot
          const newImg = active.context.getImageData(0, 0, curDocW, curDocH);
          const maskData = selectionModel.maskCtx.getImageData(0, 0, curDocW, curDocH).data;
          for (let i = 0; i < current.data.length; i += 4) {
            if (maskData[i + 3] === 0) {
              newImg.data[i] = current.data[i];
              newImg.data[i + 1] = current.data[i + 1];
              newImg.data[i + 2] = current.data[i + 2];
              newImg.data[i + 3] = current.data[i + 3];
            }
          }
          active.context.putImageData(newImg, 0, 0);
        }
      }
      meshCache.delete(active.id);
      engine.compositeDirty = true;
    },
    encloseAndFill(polygon, colorHex, tolerance): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return false;
      const fullRect: Rect = { x: 0, y: 0, w: curDocW, h: curDocH };
      const current = active.context.getImageData(0, 0, curDocW, curDocH);
      const bSettings = getToolState().brush;

      const ok = executeEncloseAndFill({
        polygon,
        fillColorHex: colorHex,
        tolerance,
        closeGap: bSettings.closeGap ?? 2,
        areaScaling: bSettings.areaScaling ?? 1,
        referMode: bSettings.referMode ?? 'reference',
        activeLayer: active,
        allLayers: layerManager.layers,
        selectionMaskCanvas: selectionModel.hasSelection() ? selectionModel.maskCanvas : null,
        docW: curDocW,
        docH: curDocH,
      });

      if (ok) {
        history.push(active.id, fullRect, current);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
      }
      return ok;
    },
    paintUnfilledArea(points, radius, colorHex, tolerance): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return false;
      const fullRect: Rect = { x: 0, y: 0, w: curDocW, h: curDocH };
      const current = active.context.getImageData(0, 0, curDocW, curDocH);
      const bSettings = getToolState().brush;

      const ok = executePaintUnfilledArea({
        points,
        radius,
        fillColorHex: colorHex,
        tolerance,
        closeGap: bSettings.closeGap ?? 1,
        areaScaling: bSettings.areaScaling ?? 1,
        referMode: bSettings.referMode ?? 'reference',
        activeLayer: active,
        allLayers: layerManager.layers,
        selectionMaskCanvas: selectionModel.hasSelection() ? selectionModel.maskCanvas : null,
        docW: curDocW,
        docH: curDocH,
      });

      if (ok) {
        history.push(active.id, fullRect, current);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
      }
      return ok;
    },
    fillSelection(colorHex?: string): void {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;
      const fullRect: Rect = { x: 0, y: 0, w: curDocW, h: curDocH };
      const current = active.context.getImageData(0, 0, curDocW, curDocH);
      history.push(active.id, fullRect, current);
      meshCache.delete(active.id);

      const color = colorHex || getToolState().brush.color;
      active.context.save();
      if (active.lockAlpha) {
        active.context.globalCompositeOperation = 'source-atop';
      }
      liveMaskContext.clearRect(0, 0, curDocW, curDocH);
      liveMaskContext.fillStyle = color;
      liveMaskContext.fillRect(0, 0, curDocW, curDocH);
      if (selectionModel.hasSelection()) {
        liveMaskContext.save();
        liveMaskContext.globalCompositeOperation = 'destination-in';
        liveMaskContext.drawImage(selectionModel.maskCanvas, 0, 0);
        liveMaskContext.restore();
      }
      active.context.drawImage(liveMaskCanvas, 0, 0);
      active.context.restore();
      engine.compositeDirty = true;
    },
    clearActiveLayer(): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return false;
      const fullRect: Rect = { x: 0, y: 0, w: curDocW, h: curDocH };
      const current = active.context.getImageData(0, 0, curDocW, curDocH);
      history.push(active.id, fullRect, current);
      meshCache.delete(active.id);
      if (selectionModel.hasSelection()) {
        active.context.save();
        active.context.globalCompositeOperation = 'destination-out';
        active.context.drawImage(selectionModel.maskCanvas, 0, 0);
        active.context.restore();
      } else {
        layerManager.clearLayer(active.id);
      }
      engine.compositeDirty = true;
      return true;
    },
    pushUndoRecord(layerId: string, rect: Rect, data: ImageData | Uint8ClampedArray): void {
      history.push(layerId, rect, data);
    },
    undo(): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return false;

      const record = history.undo(active.id, (r) => {
        const targetL = layerManager.layers.find((l) => l.id === active.id) ?? active;
        return targetL.context!.getImageData(r.x, r.y, r.w, r.h);
      });
      if (!record) return false;

      const targetLayer = layerManager.layers.find((l) => l.id === record.layerId);
      if (targetLayer && targetLayer.context) {
        const imgData = targetLayer.context.createImageData(record.rect.w, record.rect.h);
        imgData.data.set(record.data);
        targetLayer.context.putImageData(imgData, record.rect.x, record.rect.y);
        meshCache.delete(targetLayer.id);
        if (layerManager.activeLayerId !== targetLayer.id) {
          layerManager.setActiveLayer(targetLayer.id);
        }
        engine.compositeDirty = true;
        return true;
      }
      return false;
    },
    redo(): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return false;

      const record = history.redo(active.id, (r) => {
        const targetL = layerManager.layers.find((l) => l.id === active.id) ?? active;
        return targetL.context!.getImageData(r.x, r.y, r.w, r.h);
      });
      if (!record) return false;

      const targetLayer = layerManager.layers.find((l) => l.id === record.layerId);
      if (targetLayer && targetLayer.context) {
        const imgData = targetLayer.context.createImageData(record.rect.w, record.rect.h);
        imgData.data.set(record.data);
        targetLayer.context.putImageData(imgData, record.rect.x, record.rect.y);
        meshCache.delete(targetLayer.id);
        if (layerManager.activeLayerId !== targetLayer.id) {
          layerManager.setActiveLayer(targetLayer.id);
        }
        engine.compositeDirty = true;
        return true;
      }
      return false;
    },
    canUndo(): boolean {
      return history.canUndo();
    },
    canRedo(): boolean {
      return history.canRedo();
    },
    clearHistory(): void {
      history.clear();
    },
    selection: selectionModel,
    updateComposite,
  };

  subscribeTools(() => {
    engine.compositeDirty = true;
  });

  selectionModel.subscribe(() => {
    engine.compositeDirty = true;
  });

  updateComposite();
  return engine;
}
