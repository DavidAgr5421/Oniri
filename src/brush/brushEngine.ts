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
import { applyAdjustmentToContext } from './adjustments';
import { drawShape } from './shapeDrawer';
import { getStampTexture, getRotatedStamp } from './stampTexture';
import type { TiltFootprint } from './pressureResponse';
import { getBrushTextureAsset, getPaperGrainPattern, samplePaperGrain } from './brushTextureAssets';
import { DOC_H, DOC_W } from './docConstants';
import { selectionModel, SelectionModel } from '../selection/selectionModel';
import { brushDiagnostics } from './brushDiagnostics';
import { rustStrokeEngine, DAB_STRIDE } from './rustStrokeEngine';

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
  /** Inking Live Stroke Plane (fast scratchpad for active stroke) */
  liveStrokeCanvas: HTMLCanvasElement;
  liveStrokeDirty: boolean;
  isLivePainting: boolean;
  useOverlayPlanes: boolean;
  liveStrokeOpacity: number;
  liveStrokeBounds: { x: number; y: number; w: number; h: number } | null;
  /** Top Layers Overlay Plane (layers above active layer during painting) */
  topLayersCanvas: HTMLCanvasElement;
  hasTopLayers: boolean;
  topLayersDirty: boolean;
  setTimelineManager(tm: TimelineManager): void;
  getTimelineManager(): TimelineManager | null;
  beginStroke(x: number, y: number, pressure: number, isMouse?: boolean): void;
  continueStroke(x: number, y: number, pressure: number, deferOverlay?: boolean): void;
  beginErase(x: number, y: number, pressure: number, isMouse?: boolean): void;
  continueErase(x: number, y: number, pressure: number, deferOverlay?: boolean): void;
  flushLiveOverlay(): void;
  /** Nib footprint for the next stamps, driven by the pen tilt (null = upright). */
  setStrokeTilt(tilt: TiltFootprint | null): void;
  /** Instantaneous stroke speed in doc px per sample, drives velocity dynamics. */
  setStrokeSpeed(speed: number): void;
  /** Temporary predicted stroke points for zero-latency live drawing. */
  renderPredictedStroke(points: { x: number; y: number; pressure: number }[]): void;
  /** Native C1 continuous Bézier predicted stroke evaluation in Rust. */
  renderPredictedBezier?(
    startX: number,
    startY: number,
    startP: number,
    targetX: number,
    targetY: number,
    targetP: number,
    velX: number,
    velY: number,
  ): void;
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
  updateComposite(planesOnly?: boolean): void;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Diameter in px for a stamp given pressure, distance walked along stroke, and
 * speed. Combines the pressure curve, the minimum size ratio, the starting
 * taper (smoothstep), and the velocity dynamics (tapering when moving fast).
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

  // taperStart (simulated starting needle) is NOT applied to mouse strokes
  // because mouse clicks draw natural full-size stamps without artificial needle points.
  if (!isMouse && s.taperStart > 0) {
    const t = Math.min(1, distance / s.taperStart);
    smoothStart = t * t * (3 - 2 * t);
  }

  // Velocity dynamic factor (quick flicks taper down)
  let speedFactor = 1.0;
  if (s.velocitySize && speed > 1.0) {
    const minRatio = Math.max(0.05, Math.min(1.0, s.velocityMinRatio ?? 0.35));
    const curve = Math.max(0.2, s.velocityCurve ?? 1.0);
    const normalizedSpeed = Math.min(1.0, (speed - 1.0) / 40.0);
    const vFactor = Math.pow(normalizedSpeed, curve);
    speedFactor = 1.0 - (1.0 - minRatio) * vFactor;
  }

  // Deterministic per-dab Random Size dynamic
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
 * saturating or leaving visible steps. Also supports velocity flow dynamics.
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
 * Evaluates the 4 paper texture modes ('subtract' | 'multiply' | 'height' | 'outline')
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
  const modeCode = mode === 'subtract' ? 1 : mode === 'multiply' ? 2 : mode === 'outline' ? 3 : 0;
  if (modeCode !== 3) {
    const rustA = rustStrokeEngine.evaluatePaperTexture(
      rawGrain,
      baseAlpha255,
      pressure,
      density,
      modeCode,
      invert,
    );
    if (rustA !== null) return rustA;
  }

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

  // Default 'height' (Comparar altura / Realzar textura)
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
  const liveStrokeCanvas = makeCanvas(curDocW, curDocH);
  const topLayersCanvas = makeCanvas(curDocW, curDocH);
  const virtualCelCanvas = makeCanvas(curDocW, curDocH);

  const strokeContext = strokeCanvas.getContext('2d')!;
  const compositeContext = compositeCanvas.getContext('2d')!;
  const groupContext = groupCanvas.getContext('2d')!;
  const clipContext = clipCanvas.getContext('2d')!;
  const onionContext = onionCanvas.getContext('2d')!;
  const lockAlphaContext = lockAlphaCanvas.getContext('2d')!;
  const liveMaskContext = liveMaskCanvas.getContext('2d')!;
  const predictedContext = predictedCanvas.getContext('2d')!;
  const layerColorContext = layerColorCanvas.getContext('2d')!;
  const liveStrokeContext = liveStrokeCanvas.getContext('2d')!;
  const topLayersContext = topLayersCanvas.getContext('2d')!;
  const virtualCelContext = virtualCelCanvas.getContext('2d', { willReadFrequently: true })!;

  let isLivePainting = false;
  let useOverlayPlanes = false;
  let liveStrokeDirty = false;
  let hasTopLayers = false;
  let prefetchingFrame = false;
  let prefetchHandle: number | undefined;
  let frameCacheBudgetApplied = false;
  let virtualCelImage: ImageData | null = null;
  let frameCacheMax = rustStrokeEngine.configureFrameCacheBudget(curDocW, curDocH);
  let topLayersDirty = false;
  let liveStrokeOpacity = 1.0;
  let liveStrokeBounds: { x: number; y: number; w: number; h: number } | null = null;
  let prevLiveStrokeBounds: { x: number; y: number; w: number; h: number } | null = null;
  let hasPredictions = false;
  let strokeBoundsMinX = 0;
  let strokeBoundsMinY = 0;
  let strokeBoundsMaxX = 0;
  let strokeBoundsMaxY = 0;
  let predBoundsMinX = 0;
  let predBoundsMinY = 0;
  let predBoundsMaxX = 0;
  let predBoundsMaxY = 0;

  const history: HistoryManager = createHistoryManager(100);

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
  let preStrokeDeferred = false;
  let strokePickedColor: [number, number, number, number] | null = null;
  let currentStrokeSpeed = 0;
  let strokeStampIndex = 0;
  let isCurrentStrokeMouse = false;
  let isPredictingStroke = false;

  let preStrokeRawRgba: Uint8Array | null = null;

  function samplePreStrokeColor(x: number, y: number): [number, number, number, number] | null {
    if (isPredictingStroke || !preStrokeSnapshot) return null;
    const sw = preStrokeSnapshot.width;
    const sh = preStrokeSnapshot.height;
    if (!preStrokeRawRgba || preStrokeRawRgba.buffer !== preStrokeSnapshot.data.buffer) {
      preStrokeRawRgba = new Uint8Array(preStrokeSnapshot.data.buffer, preStrokeSnapshot.data.byteOffset, preStrokeSnapshot.data.byteLength);
    }
    const rustSampled = rustStrokeEngine.sampleRgba(preStrokeRawRgba, sw, sh, x, y);
    if (rustSampled) {
      return rustSampled;
    }
    const ix = Math.floor(x);
    const iy = Math.floor(y);
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

  const HEX_BYTE_LOOKUP: string[] = [];
  for (let i = 0; i < 256; i++) {
    HEX_BYTE_LOOKUP[i] = i.toString(16).padStart(2, '0');
  }
  let lastRgbHexR = -1;
  let lastRgbHexG = -1;
  let lastRgbHexB = -1;
  let lastCachedHexStr = '';

  function getCachedRgbHex(r: number, g: number, b: number): string {
    const ir = Math.round(r) & 255;
    const ig = Math.round(g) & 255;
    const ib = Math.round(b) & 255;
    if (ir === lastRgbHexR && ig === lastRgbHexG && ib === lastRgbHexB) {
      return lastCachedHexStr;
    }
    lastRgbHexR = ir;
    lastRgbHexG = ig;
    lastRgbHexB = ib;
    lastCachedHexStr = '#' + HEX_BYTE_LOOKUP[ir] + HEX_BYTE_LOOKUP[ig] + HEX_BYTE_LOOKUP[ib];
    return lastCachedHexStr;
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
    skipBounds = false,
    resolvedColorHex?: string,
    resolvedAlpha?: number,
  ): void {
    const s = strokeSettings;
    const effectiveTip = tipTextureOverride !== undefined ? tipTextureOverride : s.tipTexture;
    let stampColor = erase ? '#000000' : (resolvedColorHex !== undefined ? resolvedColorHex : currentColorHex);

    if (resolvedColorHex === undefined) {
      // 1. Dual Color / Sub Color Mix
      if (!erase && s.subColorMix) {
        const sec = getToolState().secondaryColor || '#ffffff';
        const { r: r2, g: g2, b: b2 } = hexToRgb(sec);
        const { r: r1, g: g1, b: b1 } = hexToRgb(s.color);
        const rustDual = rustStrokeEngine.blendDualColor(r1, g1, b1, r2, g2, b2, pressure);
        if (rustDual) {
          stampColor = rgbToHex(rustDual[0], rustDual[1], rustDual[2]);
        } else {
          const t = Math.pow(clamp01(pressure), 1.2);
          const r = Math.round(r2 * (1 - t) + r1 * t);
          const g = Math.round(g2 * (1 - t) + g1 * t);
          const b = Math.round(b2 * (1 - t) + b1 * t);
          stampColor = rgbToHex(r, g, b);
        }
        currentColorHex = stampColor;
      }

      // 2. Color Mix and Smudge handling
      if (!erase && ((s.colorMix && s.colorMix > 0) || (s.smudge && s.smudge > 0))) {
        const sampled = samplePreStrokeColor(x, y);
        const isPureSmudger = s.smudge && s.smudge > 0 && (!s.colorMix || s.colorMix >= 0.8);

        if (sampled && sampled[3] > 0.02) {
          if (s.smudge && s.smudge > 0) {
            if (!strokePickedColor) {
              strokePickedColor = [sampled[0], sampled[1], sampled[2], sampled[3]];
            } else {
              const rustSmudge = rustStrokeEngine.stepSmudge(
                strokePickedColor[0],
                strokePickedColor[1],
                strokePickedColor[2],
                strokePickedColor[3],
                sampled[0],
                sampled[1],
                sampled[2],
                sampled[3],
                0.35,
              );
              if (rustSmudge) {
                strokePickedColor[0] = Math.round(rustSmudge[0]);
                strokePickedColor[1] = Math.round(rustSmudge[1]);
                strokePickedColor[2] = Math.round(rustSmudge[2]);
                strokePickedColor[3] = rustSmudge[3];
              } else {
                const pickRate = 0.35;
                strokePickedColor[0] = Math.round(strokePickedColor[0] * (1 - pickRate) + sampled[0] * pickRate);
                strokePickedColor[1] = Math.round(strokePickedColor[1] * (1 - pickRate) + sampled[1] * pickRate);
                strokePickedColor[2] = Math.round(strokePickedColor[2] * (1 - pickRate) + sampled[2] * pickRate);
                strokePickedColor[3] = Math.max(strokePickedColor[3], sampled[3]);
              }
            }
            stampColor = rgbToHex(strokePickedColor[0], strokePickedColor[1], strokePickedColor[2]);
            currentColorHex = stampColor;
          } else {
            // Standard watercolor / oil mixing
            const [lr, lg, lb, la] = sampled;
            const { r: br, g: bg, b: bb } = hexToRgb(s.color);
            const rustMix = rustStrokeEngine.blendColorMix(
              br, bg, bb,
              lr, lg, lb,
              la,
              s.colorMix ?? 0.5,
              pressure,
            );
            if (rustMix) {
              stampColor = rgbToHex(rustMix[0], rustMix[1], rustMix[2]);
            } else {
              const baseMix = s.colorMix! * Math.max(0.05, 1.0 - Math.pow(pressure, 1.3) * 0.85);
              const mix = baseMix * la;
              const r = Math.round(br * (1 - mix) + lr * mix);
              const g = Math.round(bg * (1 - mix) + lg * mix);
              const b = Math.round(bb * (1 - mix) + lb * mix);
              stampColor = rgbToHex(r, g, b);
            }
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
    }

    let alpha = resolvedAlpha !== undefined ? resolvedAlpha : brushStampAlpha(s, pressure, currentStrokeSpeed);

    if (resolvedAlpha === undefined && strokePickedColor && s.smudge && s.smudge > 0) {
      alpha *= strokePickedColor[3];
    }

    const hasPaperTooth =
      !erase && !!(s.paperTexture && s.paperTexture !== 'none' && (s.textureDensity ?? 0) > 0);
    const isPencilMedium = hasPaperTooth && s.inkMode === 'accumulate';

    // Pen tilt: inking pens ('uniform') never distort diameter
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

    const symmetric =
      !useDual &&
      s.tipShape === 'circle' &&
      roundness >= 0.999 &&
      (!effectiveTip || effectiveTip === 'default');

    const drawStamp = (!symmetric && Math.abs(stampAngle) > 0.001)
      ? getRotatedStamp(stampCanvas, stampAngle)
      : stampCanvas;

    const rw = drawStamp.width;
    const rh = drawStamp.height;

    if (!skipBounds) {
      const padB = Math.ceil(Math.max(rw, rh) * 0.6) + 4;
      if (x - padB < strokeBoundsMinX) strokeBoundsMinX = Math.max(0, Math.floor(x - padB));
      if (y - padB < strokeBoundsMinY) strokeBoundsMinY = Math.max(0, Math.floor(y - padB));
      if (x + padB > strokeBoundsMaxX) strokeBoundsMaxX = Math.min(curDocW, Math.ceil(x + padB));
      if (y + padB > strokeBoundsMaxY) strokeBoundsMaxY = Math.min(curDocH, Math.ceil(y + padB));
    }

    const targetComp = erase
      ? 'destination-out'
      : (s.compositeMode === 'lighter' ? 'lighter' : 'source-over');
    if (ctx.globalCompositeOperation !== targetComp) {
      ctx.globalCompositeOperation = targetComp;
    }
    ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

    // Axis-aligned drawImage: browser GPU batching executes in a single draw call without context matrix switches
    ctx.drawImage(drawStamp, x - rw * 0.5, y - rh * 0.5);
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
    const targetComp = erase
      ? 'destination-out'
      : (s.compositeMode === 'lighter' ? 'lighter' : 'source-over');
    if (ctx.globalCompositeOperation !== targetComp) {
      ctx.globalCompositeOperation = targetComp;
    }

    if (rustStrokeEngine.available) {
      const batch = rustStrokeEngine.addPoint(x1, y1, p1);
      if (!batch || batch.count === 0) return;

      // Ultra-fast batch-level dirty rect update calculated natively by Rust
      if (batch.dirtyRect[0] <= batch.dirtyRect[2]) {
        const pad = Math.ceil(s.size * 0.6) + 8;
        const bMinX = Math.max(0, Math.floor(batch.dirtyRect[0] - pad));
        const bMinY = Math.max(0, Math.floor(batch.dirtyRect[1] - pad));
        const bMaxX = Math.min(curDocW, Math.ceil(batch.dirtyRect[2] + pad));
        const bMaxY = Math.min(curDocH, Math.ceil(batch.dirtyRect[3] + pad));
        if (bMinX < strokeBoundsMinX) strokeBoundsMinX = bMinX;
        if (bMinY < strokeBoundsMinY) strokeBoundsMinY = bMinY;
        if (bMaxX > strokeBoundsMaxX) strokeBoundsMaxX = bMaxX;
        if (bMaxY > strokeBoundsMaxY) strokeBoundsMaxY = bMaxY;
      }

      const dabs = batch.dabs;
      for (let i = 0; i < batch.count; i++) {
        const base = i * DAB_STRIDE;
        const flags = dabs[base + 10];
        if (flags < 0.5) continue;
        const dx = dabs[base];
        const dy = dabs[base + 1];
        const diam = dabs[base + 2];
        const press = dabs[base + 3];
        const alpha = dabs[base + 4];
        const angle = dabs[base + 5];
        const tipIdx = dabs[base + 6];
        const r = dabs[base + 7];
        const g = dabs[base + 8];
        const b = dabs[base + 9];
        lastAngleRad = angle;
        const activeTip = rustStrokeEngine.resolveTipFromIndex(tipIdx, s.tipTexture);
        const stampColor = erase ? '#000000' : getCachedRgbHex(r, g, b);
        stampAt(ctx, erase, dx, dy, diam, press, angle, activeTip, true, stampColor, alpha);
      }
      return;
    }

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
      // Minimum stroke interval: bounds minimum distance between dabs so fine needle ends don't create thousands of overlapping stamps
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
          // Spray Bucketing: discrete scale factors guarantee 100% texture cache hits
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

  function updateLiveInkingCanvas(): void {
    if (!useOverlayPlanes) return;
    const hasPaperTooth =
      mode === 'paint' &&
      !!(
        strokeSettings.paperTexture &&
        strokeSettings.paperTexture !== 'none' &&
        (strokeSettings.textureDensity ?? 0) > 0
      );

    let lmX = 0, lmY = 0, lmW = curDocW, lmH = curDocH;
    const hasBounds = strokeBoundsMaxX > strokeBoundsMinX && strokeBoundsMaxY > strokeBoundsMinY;
    if (hasBounds) {
      const pad = 12;
      const minBX = Math.min(strokeBoundsMinX, predBoundsMaxX > predBoundsMinX ? predBoundsMinX : strokeBoundsMinX);
      const minBY = Math.min(strokeBoundsMinY, predBoundsMaxY > predBoundsMinY ? predBoundsMinY : strokeBoundsMinY);
      const maxBX = Math.max(strokeBoundsMaxX, predBoundsMaxX > predBoundsMinX ? predBoundsMaxX : strokeBoundsMaxX);
      const maxBY = Math.max(strokeBoundsMaxY, predBoundsMaxY > predBoundsMinY ? predBoundsMaxY : strokeBoundsMaxY);
      lmX = Math.max(0, minBX - pad);
      lmY = Math.max(0, minBY - pad);
      lmW = Math.min(curDocW, maxBX + pad) - lmX;
      lmH = Math.min(curDocH, maxBY + pad) - lmY;
    }

    // Clear the union of current bounds and previous bounds so retreating bounds (e.g. prediction) never leave ghost artifacts
    let clrX = lmX;
    let clrY = lmY;
    let clrW = lmW;
    let clrH = lmH;
    if (prevLiveStrokeBounds) {
      clrX = Math.min(lmX, prevLiveStrokeBounds.x);
      clrY = Math.min(lmY, prevLiveStrokeBounds.y);
      const maxCX = Math.max(lmX + lmW, prevLiveStrokeBounds.x + prevLiveStrokeBounds.w);
      const maxCY = Math.max(lmY + lmH, prevLiveStrokeBounds.y + prevLiveStrokeBounds.h);
      clrW = Math.min(curDocW, maxCX) - clrX;
      clrH = Math.min(curDocH, maxCY) - clrY;
    }

    liveStrokeContext.clearRect(clrX, clrY, clrW, clrH);
    liveStrokeContext.drawImage(strokeCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
    if (hasPredictions) {
      liveStrokeContext.drawImage(predictedCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
    }
    if (hasPaperTooth) {
      const density = clamp01(strokeSettings.textureDensity ?? 0.85);
      const scale = strokeSettings.textureScale ?? 0.35;
      const texMode = strokeSettings.textureMode ?? 'height';
      const texInvert = !!strokeSettings.textureInvert;
      const pattern = getPaperGrainPattern(
        liveStrokeContext,
        strokeSettings.paperTexture!,
        scale,
        density,
        texMode,
        texInvert
      );
      if (pattern) {
        liveStrokeContext.save();
        liveStrokeContext.globalCompositeOperation = 'destination-in';
        liveStrokeContext.fillStyle = pattern;
        liveStrokeContext.fillRect(lmX, lmY, lmW, lmH);
        liveStrokeContext.restore();
      }
    }
    liveStrokeBounds = { x: clrX, y: clrY, w: clrW, h: clrH };
    prevLiveStrokeBounds = { x: lmX, y: lmY, w: lmW, h: lmH };
    liveStrokeDirty = true;
  }

  let predFlatBuffer = new Float32Array(64);

  function renderPredictedStroke(points: { x: number; y: number; pressure: number }[]): void {
    if (!mode || mode === 'shape' || points.length === 0) return;
    const t0 = performance.now();
    clearPredictedStroke(true);
    hasPredictions = true;

    // Track dirty bounding box of predicted stroke for microsecond clearRect & drawImage
    const pad = Math.ceil((strokeSettings.size || 20) * 1.5) + 8;
    let minPX = Math.max(0, Math.min(curDocW, Math.floor(lastX - pad)));
    let minPY = Math.max(0, Math.min(curDocH, Math.floor(lastY - pad)));
    let maxPX = Math.min(curDocW, Math.max(0, Math.ceil(lastX + pad)));
    let maxPY = Math.min(curDocH, Math.max(0, Math.ceil(lastY + pad)));

    for (const pt of points) {
      minPX = Math.max(0, Math.min(minPX, Math.floor(pt.x - pad)));
      minPY = Math.max(0, Math.min(minPY, Math.floor(pt.y - pad)));
      maxPX = Math.min(curDocW, Math.max(maxPX, Math.ceil(pt.x + pad)));
      maxPY = Math.min(curDocH, Math.max(maxPY, Math.ceil(pt.y + pad)));
    }

    predBoundsMinX = minPX;
    predBoundsMinY = minPY;
    predBoundsMaxX = maxPX;
    predBoundsMaxY = maxPY;

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

    if (rustStrokeEngine.available) {
      const totalFloats = points.length * 3;
      if (predFlatBuffer.length < totalFloats) {
        predFlatBuffer = new Float32Array(Math.max(totalFloats, predFlatBuffer.length * 2));
      }
      for (let i = 0; i < points.length; i++) {
        const idx = i * 3;
        predFlatBuffer[idx] = points[i].x;
        predFlatBuffer[idx + 1] = points[i].y;
        predFlatBuffer[idx + 2] = points[i].pressure;
      }
      const flatPoints = predFlatBuffer.subarray(0, totalFloats);

      brushDiagnostics.inPredictedStroke = true;
      isPredictingStroke = true;
      try {
        const batch = rustStrokeEngine.predictStrokeBatch(flatPoints);
        if (batch && batch.count > 0) {
          if (batch.dirtyRect[0] <= batch.dirtyRect[2]) {
            const padB = Math.ceil((strokeSettings.size || 20) * 0.6) + 8;
            predBoundsMinX = Math.max(0, Math.floor(batch.dirtyRect[0] - padB));
            predBoundsMinY = Math.max(0, Math.floor(batch.dirtyRect[1] - padB));
            predBoundsMaxX = Math.min(curDocW, Math.ceil(batch.dirtyRect[2] + padB));
            predBoundsMaxY = Math.min(curDocH, Math.ceil(batch.dirtyRect[3] + padB));
          }

          const targetComp = isEraseOp
            ? 'destination-out'
            : (strokeSettings.compositeMode === 'lighter' ? 'lighter' : 'source-over');
          if (predictedContext.globalCompositeOperation !== targetComp) {
            predictedContext.globalCompositeOperation = targetComp;
          }

          const dabs = batch.dabs;
          for (let i = 0; i < batch.count; i++) {
            const base = i * DAB_STRIDE;
            const flags = dabs[base + 10];
            if (flags < 0.5) continue;
            const dx = dabs[base];
            const dy = dabs[base + 1];
            const diam = dabs[base + 2];
            const press = dabs[base + 3];
            const alpha = dabs[base + 4];
            const angle = dabs[base + 5];
            const tipIdx = dabs[base + 6];
            const r = dabs[base + 7];
            const g = dabs[base + 8];
            const b = dabs[base + 9];
            const activeTip = rustStrokeEngine.resolveTipFromIndex(tipIdx, strokeSettings.tipTexture);
            const stampColor = isEraseOp ? '#000000' : getCachedRgbHex(r, g, b);
            stampAt(predictedContext, isEraseOp, dx, dy, diam, press, angle, activeTip, true, stampColor, alpha);
          }
        }
      } finally {
        brushDiagnostics.inPredictedStroke = false;
        isPredictingStroke = false;
      }
    } else {
      brushDiagnostics.inPredictedStroke = true;
      isPredictingStroke = true;
      rustStrokeEngine.saveCheckpoint();
      try {
        for (const pt of points) {
          stampAlong(predictedContext, isEraseOp, prevX, prevY, prevP, pt.x, pt.y, pt.pressure);
          prevX = pt.x;
          prevY = pt.y;
          prevP = pt.pressure;
        }
      } finally {
        rustStrokeEngine.restoreCheckpoint();
        brushDiagnostics.inPredictedStroke = false;
        isPredictingStroke = false;
      }
    }

    strokeDistance = savedDist;
    distanceSinceStamp = savedSince;
    strokeStampIndex = savedStampIdx;
    lastAngleRad = savedAngle;
    if (useOverlayPlanes) {
      updateLiveInkingCanvas();
    } else {
      engine.compositeDirty = true;
    }
    brushDiagnostics.recordPredictedStroke(performance.now() - t0);
  }

  function renderPredictedBezier(
    startX: number,
    startY: number,
    startP: number,
    targetX: number,
    targetY: number,
    targetP: number,
    velX: number,
    velY: number,
  ): void {
    if (!mode || mode === 'shape') return;
    const t0 = performance.now();
    clearPredictedStroke(true);
    hasPredictions = true;

    const pad = Math.ceil((strokeSettings.size || 20) * 1.5) + 8;
    predBoundsMinX = Math.max(0, Math.min(curDocW, Math.floor(Math.min(startX, targetX) - pad)));
    predBoundsMinY = Math.max(0, Math.min(curDocH, Math.floor(Math.min(startY, targetY) - pad)));
    predBoundsMaxX = Math.min(curDocW, Math.max(0, Math.ceil(Math.max(startX, targetX) + pad)));
    predBoundsMaxY = Math.min(curDocH, Math.max(0, Math.ceil(Math.max(startY, targetY) + pad)));

    const erase = mode === 'erase';
    const eraseToStroke = erase && selectionModel.hasSelection();
    const isEraseOp = erase && !eraseToStroke;

    brushDiagnostics.inPredictedStroke = true;
    isPredictingStroke = true;
    try {
      const batch = rustStrokeEngine.predictBezierStroke(
        startX, startY, startP, targetX, targetY, targetP, velX, velY,
      );
      if (batch && batch.count > 0) {
        if (batch.dirtyRect[0] <= batch.dirtyRect[2]) {
          const padB = Math.ceil((strokeSettings.size || 20) * 0.6) + 8;
          predBoundsMinX = Math.max(0, Math.floor(batch.dirtyRect[0] - padB));
          predBoundsMinY = Math.max(0, Math.floor(batch.dirtyRect[1] - padB));
          predBoundsMaxX = Math.min(curDocW, Math.ceil(batch.dirtyRect[2] + padB));
          predBoundsMaxY = Math.min(curDocH, Math.ceil(batch.dirtyRect[3] + padB));
        }

        const targetComp = isEraseOp
          ? 'destination-out'
          : (strokeSettings.compositeMode === 'lighter' ? 'lighter' : 'source-over');
        if (predictedContext.globalCompositeOperation !== targetComp) {
          predictedContext.globalCompositeOperation = targetComp;
        }

        const dabs = batch.dabs;
        for (let i = 0; i < batch.count; i++) {
          const base = i * DAB_STRIDE;
          const flags = dabs[base + 10];
          if (flags < 0.5) continue;
          const dx = dabs[base];
          const dy = dabs[base + 1];
          const diam = dabs[base + 2];
          const press = dabs[base + 3];
          const alpha = dabs[base + 4];
          const angle = dabs[base + 5];
          const tipIdx = dabs[base + 6];
          const r = dabs[base + 7];
          const g = dabs[base + 8];
          const b = dabs[base + 9];
          const activeTip = rustStrokeEngine.resolveTipFromIndex(tipIdx, strokeSettings.tipTexture);
          const stampColor = isEraseOp ? '#000000' : getCachedRgbHex(r, g, b);
          stampAt(predictedContext, isEraseOp, dx, dy, diam, press, angle, activeTip, true, stampColor, alpha);
        }
      }
    } finally {
      brushDiagnostics.inPredictedStroke = false;
      isPredictingStroke = false;
    }

    if (useOverlayPlanes) {
      updateLiveInkingCanvas();
    } else {
      engine.compositeDirty = true;
    }
    brushDiagnostics.recordPredictedStroke(performance.now() - t0);
  }

  function clearPredictedStroke(skipOverlay = false): void {
    if (hasPredictions) {
      if (predBoundsMaxX > predBoundsMinX && predBoundsMaxY > predBoundsMinY) {
        predictedContext.clearRect(
          predBoundsMinX,
          predBoundsMinY,
          predBoundsMaxX - predBoundsMinX,
          predBoundsMaxY - predBoundsMinY
        );
      } else {
        predictedContext.clearRect(0, 0, curDocW, curDocH);
      }
      hasPredictions = false;
      predBoundsMinX = 0;
      predBoundsMinY = 0;
      predBoundsMaxX = 0;
      predBoundsMaxY = 0;
      if (!skipOverlay) {
        if (useOverlayPlanes) {
          updateLiveInkingCanvas();
        } else {
          engine.compositeDirty = true;
        }
      }
    }
  }

  function finishStroke(): void {
    clearPredictedStroke();
    if (!mode) return;
    const active = layerManager.getActiveDrawableLayer();
    let deferredUndoData: Uint8ClampedArray | null = null;

    if (mode === 'paint' || mode === 'shape') {
      if (active.context) {
        // Apply GPU paper grain texture across stroke bounds (single-pass continuous texture)
        if (
          !rustStrokeEngine.available &&
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
        const hasBounds = strokeBoundsMaxX > strokeBoundsMinX && strokeBoundsMaxY > strokeBoundsMinY;
        const pad = 2;
        const bx = hasBounds ? Math.max(0, strokeBoundsMinX - pad) : 0;
        const by = hasBounds ? Math.max(0, strokeBoundsMinY - pad) : 0;
        const bw = hasBounds ? Math.min(curDocW, strokeBoundsMaxX + pad) - bx : curDocW;
        const bh = hasBounds ? Math.min(curDocH, strokeBoundsMaxY + pad) - by : curDocH;
        const brushOpacity = getToolState().brush.opacity;

        let mergedFast = false;
        if (bw > 0 && bh > 0 && rustStrokeEngine.available) {
          try {
            const dstImg = active.context.getImageData(bx, by, bw, bh);
            if (preStrokeDeferred) {
              deferredUndoData = new Uint8ClampedArray(dstImg.data);
            }
            const srcImg = strokeContext.getImageData(bx, by, bw, bh);

            // SIMD matricial paper grain texture in Rust (direct in-place modulation)
            if (
              mode === 'paint' &&
              strokeSettings.paperTexture &&
              strokeSettings.paperTexture !== 'none' &&
              (strokeSettings.textureDensity ?? 0) > 0
            ) {
              const asset = getBrushTextureAsset(strokeSettings.paperTexture);
              if (asset && asset.loaded && asset.toothData) {
                const density = clamp01(strokeSettings.textureDensity ?? 0.85);
                const scale = strokeSettings.textureScale ?? 0.35;
                const texMode = strokeSettings.textureMode ?? 'height';
                const texInvert = !!strokeSettings.textureInvert;
                const modeCode =
                  texMode === 'subtract' ? 1 : texMode === 'multiply' ? 2 : texMode === 'outline' ? 3 : 0;
                rustStrokeEngine.applyPaperGrainRect(
                  srcImg.data,
                  bw,
                  bw,
                  bh,
                  bx,
                  by,
                  asset.toothData,
                  asset.width,
                  asset.height,
                  scale,
                  density,
                  modeCode,
                  texInvert,
                );
              }
            }

            mergedFast = rustStrokeEngine.mergeStrokeRect(
              dstImg.data,
              srcImg.data,
              bw,
              bh,
              0,
              0,
              bw,
              bh,
              strokeSettings.compositeMode || 'source-over',
              brushOpacity,
              !!active.lockAlpha,
            );
            if (mergedFast) {
              active.context.putImageData(dstImg, bx, by);
              active._canvasDirty = true;
              if (active.tileGrid) {
                active.tileGrid.update_rect_from_buffer(
                  new Uint8Array(dstImg.data.buffer, dstImg.data.byteOffset, dstImg.data.byteLength),
                  bw,
                  bx,
                  by,
                  bx + bw,
                  by + bh,
                  bx,
                  by,
                );
              }
            }
          } catch (e) {
            console.warn('WASM mergeStrokeRect fallback:', e);
            mergedFast = false;
          }
        }

        if (!mergedFast) {
          if (preStrokeDeferred && hasBounds && bw > 0 && bh > 0) {
            try {
              deferredUndoData = new Uint8ClampedArray(active.context.getImageData(bx, by, bw, bh).data);
            } catch {
              deferredUndoData = null;
            }
          }
          active.context.save();
          if (active.lockAlpha) {
            active.context.globalCompositeOperation = 'source-atop';
          } else if (strokeSettings.compositeMode === 'lighter') {
            active.context.globalCompositeOperation = 'lighter';
          }
          active.context.globalAlpha = brushOpacity;
          if (hasBounds && bw > 0 && bh > 0) {
            active.context.drawImage(strokeCanvas, bx, by, bw, bh, bx, by, bw, bh);
          } else {
            active.context.drawImage(strokeCanvas, 0, 0);
          }
          active.context.restore();
          active._canvasDirty = true;
        }
      }
      if (strokeBoundsMaxX > strokeBoundsMinX && strokeBoundsMaxY > strokeBoundsMinY) {
        const pad = 12;
        const cx = Math.max(0, strokeBoundsMinX - pad);
        const cy = Math.max(0, strokeBoundsMinY - pad);
        const cw = Math.min(curDocW, strokeBoundsMaxX + pad) - cx;
        const ch = Math.min(curDocH, strokeBoundsMaxY + pad) - cy;
        strokeContext.clearRect(cx, cy, cw, ch);
      } else {
        strokeContext.clearRect(0, 0, curDocW, curDocH);
      }
      liveMaskContext.clearRect(0, 0, curDocW, curDocH);
      predictedContext.clearRect(0, 0, curDocW, curDocH);
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
      liveMaskContext.clearRect(0, 0, curDocW, curDocH);
      predictedContext.clearRect(0, 0, curDocW, curDocH);
    }

    if (preStrokeDeferred && deferredUndoData) {
      const hasBounds = strokeBoundsMaxX > strokeBoundsMinX && strokeBoundsMaxY > strokeBoundsMinY;
      const pad = 2;
      const bx = hasBounds ? Math.max(0, strokeBoundsMinX - pad) : 0;
      const by = hasBounds ? Math.max(0, strokeBoundsMinY - pad) : 0;
      const bw = hasBounds ? Math.min(curDocW, strokeBoundsMaxX + pad) - bx : curDocW;
      const bh = hasBounds ? Math.min(curDocH, strokeBoundsMaxY + pad) - by : curDocH;
      if (bw > 0 && bh > 0) {
        history.push(preStrokeLayerId, { x: bx, y: by, w: bw, h: bh }, deferredUndoData);
      }
      if (preStrokeLayerId) {
        const activeLayer = layerManager.layers.find((l) => l.id === preStrokeLayerId);
        if (activeLayer && (activeLayer.isVirtual || activeLayer.tileGrid) && activeLayer.canvas) {
          layerManager.syncLayerToTileGrid(activeLayer);
          layerManager.evictInactiveCelCanvases(2);
        }
      }
      meshCache.delete(preStrokeLayerId);
      preStrokeDeferred = false;
      preStrokeLayerId = '';
    } else if (preStrokeSnapshot) {
      if (
        strokeBoundsMaxX > strokeBoundsMinX &&
        strokeBoundsMaxY > strokeBoundsMinY
      ) {
        // High-efficiency bounded crop: store ONLY the modified stroke rectangle in RAM
        // saves 99% RAM per undo step (e.g. 30 KB instead of 8.3 MB on 1080p canvas)
        const pad = 6;
        const cropX = Math.max(0, strokeBoundsMinX - pad);
        const cropY = Math.max(0, strokeBoundsMinY - pad);
        const cropMaxX = Math.min(curDocW, strokeBoundsMaxX + pad);
        const cropMaxY = Math.min(curDocH, strokeBoundsMaxY + pad);
        const cropW = cropMaxX - cropX;
        const cropH = cropMaxY - cropY;

        if (cropW > 0 && cropH > 0) {
          const croppedData = new Uint8ClampedArray(cropW * cropH * 4);
          // Fast path: delegar el recorte directamente a Rust SIMD en memoria contigua
          const croppedOk = rustStrokeEngine.cropRgbaRect(
            preStrokeSnapshot.data,
            curDocW,
            curDocH,
            cropX,
            cropY,
            cropW,
            cropH,
            croppedData
          );
          if (!croppedOk) {
            for (let y = 0; y < cropH; y++) {
              const srcOffset = ((cropY + y) * curDocW + cropX) * 4;
              const dstOffset = y * cropW * 4;
              croppedData.set(
                preStrokeSnapshot.data.subarray(srcOffset, srcOffset + cropW * 4),
                dstOffset
              );
            }
          }
          history.push(preStrokeLayerId, { x: cropX, y: cropY, w: cropW, h: cropH }, croppedData);
        }
      } else if (preStrokeRect) {
        history.push(preStrokeLayerId, preStrokeRect, preStrokeSnapshot.data);
      }
      if (preStrokeLayerId) {
        const activeLayer = layerManager.layers.find((l) => l.id === preStrokeLayerId);
        if (activeLayer && (activeLayer.isVirtual || activeLayer.tileGrid) && activeLayer.canvas) {
          layerManager.syncLayerToTileGrid(activeLayer);
          layerManager.evictInactiveCelCanvases(2);
        }
      }
      meshCache.delete(preStrokeLayerId);
      preStrokeSnapshot = null;
      preStrokeRawRgba = null;
      preStrokeRect = null;
      preStrokeDeferred = false;
    }
    isLivePainting = false;
    useOverlayPlanes = false;
    hasTopLayers = false;
    prevLiveStrokeBounds = null;
    liveStrokeBounds = null;
    liveStrokeContext.clearRect(0, 0, curDocW, curDocH);
    liveStrokeDirty = true;
    engine.compositeDirty = true;
    if (timelineManager) {
      rustStrokeEngine.invalidateFrame(timelineManager.settings.currentFrame);
    }
    rustStrokeEngine.clearCanvasSnapshot();
    rustStrokeEngine.clearSelectionMask();
    updateComposite();
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

  /**
   * Precarga en segundo plano (idle) los siguientes fotogramas en el caché de Rust,
   * renderizando uno por ciclo ocioso para no competir con el trazo ni la UI.
   */
  function schedulePrefetch(): void {
    if (prefetchingFrame || prefetchHandle !== undefined) return;
    if (!frameCacheBudgetApplied && rustStrokeEngine.available) {
      frameCacheMax = rustStrokeEngine.configureFrameCacheBudget(curDocW, curDocH);
      frameCacheBudgetApplied = true;
    }
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    if (typeof ric === 'function') {
      prefetchHandle = ric(prefetchStep, { timeout: 500 });
    } else {
      prefetchHandle = window.setTimeout(prefetchStep, 60);
    }
  }

  function areFrameCelsReady(tm: TimelineManager, frame: number): boolean {
    for (const track of tm.tracks) {
      const cel = tm.getActiveCelForFrame(track.id, frame);
      if (cel && cel.isVirtual && !(cel as { _hasDecodedPixels?: boolean })._hasDecodedPixels) return false;
    }
    return true;
  }

  function prefetchStep(): void {
    prefetchHandle = undefined;
    const tm = timelineManager;
    if (!tm || prefetchingFrame || mode !== null) return;
    if (tm.onionSkin.enabled || tm.bones.length > 0 || !rustStrokeEngine.available) return;

    const { startFrame, endFrame, loop } = tm.settings;
    const span = Math.max(1, endFrame - startFrame + 1);
    const ahead = Math.min(span - 1, 24, Math.max(1, Math.floor(frameCacheMax / 2)));
    const savedFrame = tm.settings.currentFrame;

    for (let i = 1; i <= ahead; i++) {
      let f = savedFrame + i;
      if (f > endFrame) {
        if (!loop) break;
        f = startFrame + ((f - startFrame) % span);
      }
      if (rustStrokeEngine.hasCachedFrame(f) || !areFrameCelsReady(tm, f)) continue;

      prefetchingFrame = true;
      try {
        tm.settings.currentFrame = f;
        updateComposite();
      } finally {
        tm.settings.currentFrame = savedFrame;
        prefetchingFrame = false;
      }
      // Restaurar el fotograma visible (acierto de caché, coste mínimo) y encadenar el siguiente
      engine.compositeDirty = true;
      updateComposite();
      return;
    }
  }

  function updateComposite(planesOnly = false): void {
    const t0 = performance.now();

    const layerMap = new Map(layerManager.layers.map((l) => [l.id, l]));
    const activeDrawable = layerManager.getActiveDrawableLayer();

    if (planesOnly) {
      if (
        mode !== 'paint' ||
        activeDrawable.lockAlpha ||
        activeDrawable.useLayerColor ||
        selectionModel.hasSelection() ||
        layerManager.layers.some((l) => l.type === 'adjustment' && l.visible && !!l.adjustment)
      ) {
        useOverlayPlanes = false;
        isLivePainting = false;
        hasTopLayers = false;
        return;
      }
      useOverlayPlanes = true;
      isLivePainting = true;
      liveStrokeOpacity = Math.max(0, Math.min(1, activeDrawable.opacity * getToolState().brush.opacity));
      liveStrokeContext.clearRect(0, 0, curDocW, curDocH);
      liveStrokeDirty = false;
    }

    const curFrame = timelineManager ? timelineManager.settings.currentFrame : 1;
    const canUseFrameCache =
      !planesOnly &&
      mode !== 'paint' &&
      !!timelineManager &&
      !timelineManager.onionSkin.enabled &&
      timelineManager.bones.length === 0;

    if (canUseFrameCache && rustStrokeEngine.hasCachedFrame(curFrame)) {
      const imgData = compositeContext.createImageData(curDocW, curDocH);
      if (rustStrokeEngine.getCachedFrame(curFrame, imgData.data)) {
        compositeContext.putImageData(imgData, 0, 0);
        engine.compositeDirty = false;
        if (engine.onCompositeUpdated && !prefetchingFrame) engine.onCompositeUpdated();
        brushDiagnostics.recordComposite(performance.now() - t0);
        schedulePrefetch();
        return;
      }
    }

    compositeContext.clearRect(0, 0, curDocW, curDocH);
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
      if (!layer.canvas && !layer.tileGrid) return;

      let sourceCanvasToDraw: HTMLCanvasElement;

      if (!layer.canvas && layer.tileGrid) {
        // Virtual cel projection onto shared reusable scratch canvas (zero VRAM overhead)
        if (!virtualCelImage || virtualCelImage.width !== curDocW || virtualCelImage.height !== curDocH) {
          virtualCelImage = virtualCelContext.createImageData(curDocW, curDocH);
        }
        const rawRgba = new Uint8Array(
          virtualCelImage.data.buffer,
          virtualCelImage.data.byteOffset,
          virtualCelImage.data.byteLength
        );
        layer.tileGrid.render_to_full_buffer(rawRgba);

        // Accelerated bounded GPU texture upload via Rust content bounds
        const bounds = typeof (layer.tileGrid as any).get_content_bounds === 'function'
          ? (layer.tileGrid as any).get_content_bounds()
          : null;
        if (bounds && bounds.length === 4) {
          const [bx, by, mx, my] = bounds;
          const bw = mx - bx;
          const bh = my - by;
          if (bw > 0 && bh > 0) {
            virtualCelContext.putImageData(virtualCelImage, 0, 0, bx, by, bw, bh);
          } else {
            virtualCelContext.putImageData(virtualCelImage, 0, 0);
          }
        } else {
          virtualCelContext.putImageData(virtualCelImage, 0, 0);
        }
        sourceCanvasToDraw = virtualCelCanvas;
      } else if (layer.canvas) {
        // Sparse Tile Grid projection on demand
        if (layer.tileGrid && (layer as any)._tileGridNeedsProjection) {
          const ctx = layer.context || layer.canvas.getContext('2d')!;
          const imgData = ctx.createImageData(curDocW, curDocH);
          const rawRgba = new Uint8Array(imgData.data.buffer, imgData.data.byteOffset, imgData.data.byteLength);
          if (typeof (layer.tileGrid as any).render_to_full_buffer_opt === 'function') {
            (layer.tileGrid as any).render_to_full_buffer_opt(rawRgba, false);
          } else {
            layer.tileGrid.render_to_full_buffer(rawRgba);
          }

          const bounds = typeof (layer.tileGrid as any).get_content_bounds === 'function'
            ? (layer.tileGrid as any).get_content_bounds()
            : null;
          if (bounds && bounds.length === 4) {
            const [bx, by, mx, my] = bounds;
            const bw = mx - bx;
            const bh = my - by;
            if (bw > 0 && bh > 0) {
              ctx.putImageData(imgData, 0, 0, bx, by, bw, bh);
            } else {
              ctx.putImageData(imgData, 0, 0);
            }
          } else {
            ctx.putImageData(imgData, 0, 0);
          }
          (layer as any)._tileGridNeedsProjection = false;
        }
        sourceCanvasToDraw = layer.canvas;
      } else {
        return;
      }

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

      const isLivePainting =
        !useOverlayPlanes && layer.id === activeDrawable.id && (mode === 'paint' || mode === 'shape');
      let liveStrokeDrawnInTint = false;

      // Real-time GPU Paper/Canvas grain & Selection mask compositing
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
        let lmX = 0, lmY = 0, lmW = curDocW, lmH = curDocH;
        const hasBounds = strokeBoundsMaxX > strokeBoundsMinX && strokeBoundsMaxY > strokeBoundsMinY;
        if (hasBounds) {
          const pad = 12;
          const minBX = Math.min(strokeBoundsMinX, predBoundsMaxX > predBoundsMinX ? predBoundsMinX : strokeBoundsMinX);
          const minBY = Math.min(strokeBoundsMinY, predBoundsMaxY > predBoundsMinY ? predBoundsMinY : strokeBoundsMinY);
          const maxBX = Math.max(strokeBoundsMaxX, predBoundsMaxX > predBoundsMinX ? predBoundsMaxX : strokeBoundsMaxX);
          const maxBY = Math.max(strokeBoundsMaxY, predBoundsMaxY > predBoundsMinY ? predBoundsMaxY : strokeBoundsMaxY);
          lmX = Math.max(0, minBX - pad);
          lmY = Math.max(0, minBY - pad);
          lmW = Math.min(curDocW, maxBX + pad) - lmX;
          lmH = Math.min(curDocH, maxBY + pad) - lmY;
        }

        liveMaskContext.clearRect(lmX, lmY, lmW, lmH);
        liveMaskContext.drawImage(strokeCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
        if (hasPredictions) {
          liveMaskContext.drawImage(predictedCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
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
            liveMaskContext.fillRect(lmX, lmY, lmW, lmH);
            liveMaskContext.restore();
          }
        }
        if (hasSelection) {
          liveMaskContext.save();
          liveMaskContext.globalCompositeOperation = 'destination-in';
          liveMaskContext.drawImage(selectionModel.maskCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
          liveMaskContext.restore();
        }
      }

      if (isLivePainting && layer.lockAlpha) {
        lockAlphaContext.clearRect(0, 0, curDocW, curDocH);
        lockAlphaContext.drawImage(sourceCanvasToDraw, 0, 0);
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

      // Layer Color Effect (Azul de boceto / Sketch cyan non-destructive tint)
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
          let lmX = 0, lmY = 0, lmW = curDocW, lmH = curDocH;
          const hasBounds = strokeBoundsMaxX > strokeBoundsMinX && strokeBoundsMaxY > strokeBoundsMinY;
          if (hasBounds) {
            const pad = 12;
            const minBX = Math.min(strokeBoundsMinX, predBoundsMaxX > predBoundsMinX ? predBoundsMinX : strokeBoundsMinX);
            const minBY = Math.min(strokeBoundsMinY, predBoundsMaxY > predBoundsMinY ? predBoundsMinY : strokeBoundsMinY);
            const maxBX = Math.max(strokeBoundsMaxX, predBoundsMaxX > predBoundsMinX ? predBoundsMaxX : strokeBoundsMaxX);
            const maxBY = Math.max(strokeBoundsMaxY, predBoundsMaxY > predBoundsMinY ? predBoundsMaxY : strokeBoundsMaxY);
            lmX = Math.max(0, minBX - pad);
            lmY = Math.max(0, minBY - pad);
            lmW = Math.min(curDocW, maxBX + pad) - lmX;
            lmH = Math.min(curDocH, maxBY + pad) - lmY;
          }
          if (mode === 'erase') {
            targetCtx.save();
            targetCtx.globalCompositeOperation = 'destination-out';
            targetCtx.drawImage(liveMaskCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
            targetCtx.restore();
          } else {
            targetCtx.drawImage(liveMaskCanvas, lmX, lmY, lmW, lmH, lmX, lmY, lmW, lmH);
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
      const cx = curDocW / 2;
      const cy = curDocH / 2;

      function applyOnionTransforms(ctx: CanvasRenderingContext2D, item: any): void {
        if (
          item.transform &&
          (item.transform.x !== 0 ||
            item.transform.y !== 0 ||
            item.transform.scaleX !== 1 ||
            item.transform.scaleY !== 1 ||
            item.transform.rotation !== 0)
        ) {
          ctx.translate(cx + item.transform.x, cy + item.transform.y);
          ctx.rotate((item.transform.rotation * Math.PI) / 180);
          ctx.scale(item.transform.scaleX, item.transform.scaleY);
          ctx.translate(-cx, -cy);
        }

        if (item.onionTransform) {
          const ot = item.onionTransform;
          const rot = (ot.rotation * Math.PI) / 180;
          const sx = ot.scaleX * (ot.flipX ? -1 : 1);
          const sy = ot.scaleY * (ot.flipY ? -1 : 1);

          ctx.translate(cx + ot.x, cy + ot.y);
          if (rot !== 0) ctx.rotate(rot);
          if (sx !== 1 || sy !== 1) ctx.scale(sx, sy);
          ctx.translate(-cx, -cy);
        }
      }

      for (const track of timelineManager.tracks) {
        if (!track.visible) continue;
        const onionCels = timelineManager.getOnionSkinCels(track.id, timelineManager.settings.currentFrame);
        for (const item of onionCels) {
          if (!item.layer.canvas) {
            if (item.layer.tileGrid) {
              layerManager.ensureLayerCanvas(item.layer);
            } else {
              continue;
            }
          }
          const effectiveAlpha = item.opacity * (item.transform?.opacity ?? 1);
          const isTint = timelineManager.onionSkin.mode === 'tint' && !!item.tintColor;

          if (!isTint) {
            // Direct draw fast-path: avoids intermediate onionCanvas entirely!
            compositeContext.save();
            compositeContext.globalAlpha = effectiveAlpha;
            applyOnionTransforms(compositeContext, item);
            compositeContext.drawImage(item.layer.canvas!, 0, 0);
            compositeContext.restore();
          } else {
            // Fast Tint path: usar tintado in-place de Rust si no hay rotación compleja
            const hasTransforms = (item.transform && (item.transform.x !== 0 || item.transform.y !== 0 || item.transform.scaleX !== 1 || item.transform.scaleY !== 1 || item.transform.rotation !== 0)) || item.onionTransform;
            if (!hasTransforms && rustStrokeEngine.available && item.layer.canvas) {
              onionContext.clearRect(0, 0, curDocW, curDocH);
              onionContext.drawImage(item.layer.canvas!, 0, 0);
              const onionImg = onionContext.getImageData(0, 0, curDocW, curDocH);
              const { r: tr, g: tg, b: tb } = hexToRgb(item.tintColor!);
              const tintOk = rustStrokeEngine.applyTintInPlace(onionImg.data, tr, tg, tb);
              if (tintOk) {
                onionContext.putImageData(onionImg, 0, 0);
                compositeContext.save();
                compositeContext.globalAlpha = effectiveAlpha;
                compositeContext.drawImage(onionCanvas, 0, 0);
                compositeContext.restore();
                continue;
              }
            }

            // Fallback Tint path: isolated through auxiliary onion canvas
            onionContext.clearRect(0, 0, curDocW, curDocH);
            onionContext.save();
            applyOnionTransforms(onionContext, item);
            onionContext.drawImage(item.layer.canvas!, 0, 0);
            onionContext.restore();

            onionContext.save();
            onionContext.globalCompositeOperation = 'source-in';
            onionContext.fillStyle = item.tintColor!;
            onionContext.fillRect(0, 0, curDocW, curDocH);
            onionContext.restore();

            compositeContext.save();
            compositeContext.globalAlpha = effectiveAlpha;
            compositeContext.drawImage(onionCanvas, 0, 0);
            compositeContext.restore();
          }
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
      if (l.type === 'adjustment') {
        return !!l.adjustment && isEffectivelyVisible(l, layerMap);
      }
      if (l.type !== 'raster' || (!l.canvas && !l.tileGrid) || l.isPaper) return false;
      if (!isEffectivelyVisible(l, layerMap)) return false;
      if (timelineManager && l.parentId) {
        const parent = layerMap.get(l.parentId);
        if (parent && parent.isAnimationFolder) {
          return activeAnimationCelIds.has(l.id);
        }
      }
      return true;
    });

    function renderLayerListTo(targetCtx: CanvasRenderingContext2D, list: LayerNode[]): void {
      let i = 0;
      while (i < list.length) {
        const baseLayer = list[i];
        const baseOpacity = getEffectiveOpacity(baseLayer, layerMap);

        if (baseLayer.type === 'adjustment') {
          if (baseLayer.adjustment) {
            applyAdjustmentToContext(targetCtx, baseLayer.adjustment, baseOpacity, curDocW, curDocH);
          }
          i++;
          continue;
        }

        const clippedGroup: LayerNode[] = [];
        let j = i + 1;
        while (j < list.length && list[j].clipped) {
          clippedGroup.push(list[j]);
          j++;
        }

        if (clippedGroup.length === 0) {
          renderLayerTo(targetCtx, baseLayer, baseOpacity);
          i++;
        } else {
          // Fast path: Si las capas son ráster directas y Rust está disponible,
          // recortar y mezclar directamente en memoria con ColorBlendCore::merge_layers_simd
          groupContext.clearRect(0, 0, curDocW, curDocH);
          renderLayerTo(groupContext, baseLayer, 1);

          for (const clipped of clippedGroup) {
            const clippedOpacity = getEffectiveOpacity(clipped, layerMap);

            if (clipped.type === 'adjustment') {
              if (clipped.adjustment) {
                applyAdjustmentToContext(groupContext, clipped.adjustment, clippedOpacity, curDocW, curDocH);
              }
              continue;
            }

            let mergedInRust = false;
            // Si la capa base y la recortada tienen canvas estándar
            if (rustStrokeEngine.available && baseLayer.canvas && clipped.canvas && !clipped.useLayerColor) {
              const baseCtx = baseLayer.context || baseLayer.canvas.getContext('2d')!;
              const clippedCtx = clipped.context || clipped.canvas.getContext('2d')!;
              try {
                const groupImg = groupContext.getImageData(0, 0, curDocW, curDocH);
                const clippedImg = clippedCtx.getImageData(0, 0, curDocW, curDocH);
                const baseImg = baseCtx.getImageData(0, 0, curDocW, curDocH);

                mergedInRust = rustStrokeEngine.mergeLayers(
                  groupImg.data,
                  clippedImg.data,
                  curDocW,
                  curDocH,
                  clipped.blendMode,
                  clippedOpacity,
                  false,
                  baseImg.data
                );

                if (mergedInRust) {
                  groupContext.putImageData(groupImg, 0, 0);
                }
              } catch {
                mergedInRust = false;
              }
            }

            if (!mergedInRust) {
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
          }

          targetCtx.save();
          targetCtx.globalAlpha = baseOpacity;
          targetCtx.globalCompositeOperation = baseLayer.blendMode;
          targetCtx.drawImage(groupCanvas, 0, 0);
          targetCtx.restore();

          i = j;
        }
      }
    }

    if (planesOnly) {
      const activeIdx = visibleLayers.findIndex((l) => l.id === activeDrawable.id);
      const bottomLayers = activeIdx >= 0 ? visibleLayers.slice(0, activeIdx + 1) : visibleLayers;
      renderLayerListTo(compositeContext, bottomLayers);

      const topLayers =
        activeIdx >= 0 && activeIdx < visibleLayers.length - 1 ? visibleLayers.slice(activeIdx + 1) : [];
      if (topLayers.length > 0) {
        hasTopLayers = true;
        topLayersContext.clearRect(0, 0, curDocW, curDocH);
        renderLayerListTo(topLayersContext, topLayers);
        if (timelineManager && evaluatedBones && evaluatedBones.size > 0 && !timelineManager.settings.isPlaying) {
          drawBonesOverlay(topLayersContext, evaluatedBones, timelineManager.selectedBoneId);
        }
        topLayersDirty = true;
      } else {
        hasTopLayers = false;
        topLayersDirty = false;
        if (timelineManager && evaluatedBones && evaluatedBones.size > 0 && !timelineManager.settings.isPlaying) {
          drawBonesOverlay(compositeContext, evaluatedBones, timelineManager.selectedBoneId);
        }
      }
    } else {
      renderLayerListTo(compositeContext, visibleLayers);
      if (timelineManager && evaluatedBones && evaluatedBones.size > 0 && !timelineManager.settings.isPlaying) {
        drawBonesOverlay(compositeContext, evaluatedBones, timelineManager.selectedBoneId);
      }
    }

    engine.compositeDirty = false;
    if (engine.onCompositeUpdated && !prefetchingFrame) {
      engine.onCompositeUpdated();
    }
    if (canUseFrameCache) {
      try {
        const frameImg = compositeContext.getImageData(0, 0, curDocW, curDocH);
        rustStrokeEngine.storeCachedFrame(curFrame, curDocW, curDocH, frameImg.data);
      } catch {
        // ignore
      }
      if (!prefetchingFrame) schedulePrefetch();
    }
    brushDiagnostics.recordComposite(performance.now() - t0);
  }

  function beginInkStroke(x: number, y: number, pressure: number, erase: boolean, isMouse = false): void {
    const active = layerManager.getActiveDrawableLayer();
    if (!active.context || active.locked || active.isPaper) return;
    if (erase && active.lockAlpha) return;

    isCurrentStrokeMouse = isMouse;
    strokeSettings = { ...getToolState().brush };
    currentColorHex = strokeSettings.color;
    mode = erase ? 'erase' : 'paint';

    // Zero-lag stroke startup: Defer preStrokeSnapshot when possible to avoid blocking the main thread
    // with 12+ MB getImageData and Rust snapshot upload on pointerdown.
    const canDeferSnapshot =
      !erase &&
      !active.lockAlpha &&
      !selectionModel.hasSelection() &&
      (!strokeSettings.colorMix || strokeSettings.colorMix <= 0) &&
      (!strokeSettings.smudge || strokeSettings.smudge <= 0);

    if (canDeferSnapshot) {
      preStrokeDeferred = true;
      preStrokeSnapshot = null;
      preStrokeRect = null;
      preStrokeLayerId = active.id;
    } else {
      preStrokeDeferred = false;
      preStrokeRect = { x: 0, y: 0, w: curDocW, h: curDocH };
      preStrokeSnapshot = active.context.getImageData(0, 0, curDocW, curDocH);
      preStrokeLayerId = active.id;
    }
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
    prevLiveStrokeBounds = null;
    liveStrokeBounds = null;

    strokePickedColor = null;

    const firstTip = selectTipAtStamp(strokeSettings, 0);
    strokeStampIndex = 1;

    // First stamp sits at distance 0
    const eraseToStroke = erase && selectionModel.hasSelection();
    const targetCtx = erase ? (eraseToStroke ? strokeContext : active.context) : strokeContext;
    const isEraseOp = erase && !eraseToStroke;

    if (rustStrokeEngine.available) {
      if (preStrokeSnapshot) {
        rustStrokeEngine.setCanvasSnapshot(preStrokeSnapshot.data, curDocW, curDocH);
      }
      const { r: r1, g: g1, b: b1 } = hexToRgb(strokeSettings.color);
      const { r: r2, g: g2, b: b2 } = hexToRgb(getToolState().secondaryColor || '#ffffff');
      rustStrokeEngine.setStrokeColor(
        r1, g1, b1,
        r2, g2, b2,
        !erase && !!strokeSettings.subColorMix,
        !erase ? (strokeSettings.colorMix ?? 0) : 0,
        !erase ? (strokeSettings.colorMixAlpha ?? 0.55) : 0,
        !erase ? (strokeSettings.smudge ?? 0) : 0,
        erase,
      );

      if (selectionModel.hasSelection()) {
        const b = selectionModel.getBounds();
        if (b) {
          const maskData = selectionModel.maskCtx.getImageData(0, 0, curDocW, curDocH).data;
          rustStrokeEngine.setSelectionMask(
            maskData,
            curDocW,
            curDocH,
            b.minX,
            b.minY,
            b.maxX,
            b.maxY,
            true,
          );
        }
      } else {
        rustStrokeEngine.clearSelectionMask();
      }
      const batch = rustStrokeEngine.startStroke(x, y, pressure, strokeSettings, isCurrentStrokeMouse);
      if (batch && batch.count > 0) {
        if (batch.dirtyRect[0] <= batch.dirtyRect[2]) {
          const pad = Math.ceil(strokeSettings.size * 0.6) + 8;
          const bMinX = Math.max(0, Math.floor(batch.dirtyRect[0] - pad));
          const bMinY = Math.max(0, Math.floor(batch.dirtyRect[1] - pad));
          const bMaxX = Math.min(curDocW, Math.ceil(batch.dirtyRect[2] + pad));
          const bMaxY = Math.min(curDocH, Math.ceil(batch.dirtyRect[3] + pad));
          if (bMinX < strokeBoundsMinX) strokeBoundsMinX = bMinX;
          if (bMinY < strokeBoundsMinY) strokeBoundsMinY = bMinY;
          if (bMaxX > strokeBoundsMaxX) strokeBoundsMaxX = bMaxX;
          if (bMaxY > strokeBoundsMaxY) strokeBoundsMaxY = bMaxY;
        }
        const dabs = batch.dabs;
        for (let i = 0; i < batch.count; i++) {
          const base = i * DAB_STRIDE;
          const flags = dabs[base + 10];
          if (flags < 0.5) continue;
          const dx = dabs[base];
          const dy = dabs[base + 1];
          const diam = dabs[base + 2];
          const press = dabs[base + 3];
          const alpha = dabs[base + 4];
          const angle = dabs[base + 5];
          const tipIdx = dabs[base + 6];
          const r = dabs[base + 7];
          const g = dabs[base + 8];
          const b = dabs[base + 9];
          lastAngleRad = angle;
          const activeTip = rustStrokeEngine.resolveTipFromIndex(tipIdx, strokeSettings.tipTexture);
          const stampColor = isEraseOp ? '#000000' : getCachedRgbHex(r, g, b);
          stampAt(targetCtx, isEraseOp, dx, dy, diam, press, angle, activeTip, true, stampColor, alpha);
        }
      }
    } else if (strokeSettings.spray) {
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
    updateComposite(true);
    if (useOverlayPlanes) {
      updateLiveInkingCanvas();
    } else {
      engine.compositeDirty = true;
    }
  }

  // Subscribe to layer changes to trigger composite update
  layerManager.subscribe(() => {
    rustStrokeEngine.invalidateAllFrames();
    engine.compositeDirty = true;
  });

  function setDocumentSize(w: number, h: number): void {
    curDocW = w;
    curDocH = h;
    frameCacheMax = rustStrokeEngine.configureFrameCacheBudget(w, h);
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
    liveStrokeCanvas.width = w;
    liveStrokeCanvas.height = h;
    topLayersCanvas.width = w;
    topLayersCanvas.height = h;
    virtualCelCanvas.width = w;
    virtualCelCanvas.height = h;

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
    liveStrokeCanvas,
    get liveStrokeDirty() { return liveStrokeDirty; },
    set liveStrokeDirty(v: boolean) { liveStrokeDirty = v; },
    get isLivePainting() { return isLivePainting; },
    get useOverlayPlanes() { return useOverlayPlanes; },
    get liveStrokeOpacity() { return liveStrokeOpacity; },
    get liveStrokeBounds() { return liveStrokeBounds; },
    topLayersCanvas,
    get hasTopLayers() { return hasTopLayers; },
    get topLayersDirty() { return topLayersDirty; },
    set topLayersDirty(v: boolean) { topLayersDirty = v; },
    setTimelineManager(tm: TimelineManager) {
      timelineManager = tm;
      let lastStructuralVer = -1;
      tm.subscribe(() => {
        if (tm.structuralVersion !== lastStructuralVer) {
          lastStructuralVer = tm.structuralVersion;
          rustStrokeEngine.invalidateAllFrames();
        }
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
      rustStrokeEngine.setSpeed(currentStrokeSpeed);
    },
    renderPredictedStroke(points) {
      renderPredictedStroke(points);
    },
    renderPredictedBezier(startX, startY, startP, targetX, targetY, targetP, velX, velY) {
      renderPredictedBezier(startX, startY, startP, targetX, targetY, targetP, velX, velY);
    },
    clearPredictedStroke() {
      clearPredictedStroke();
    },
    continueStroke(x, y, pressure, deferOverlay = false) {
      if (mode !== 'paint') return;

      stampAlong(strokeContext, false, lastX, lastY, lastPressure, x, y, pressure);
      lastX = x;
      lastY = y;
      lastPressure = pressure;
      if (useOverlayPlanes) {
        if (!deferOverlay) updateLiveInkingCanvas();
      } else {
        engine.compositeDirty = true;
      }
    },
    beginErase(x, y, pressure, isMouse) {
      currentStrokeSpeed = 0;
      finishStroke();
      beginInkStroke(x, y, pressure, true, !!isMouse);
    },
    continueErase(x, y, pressure, deferOverlay = false) {
      if (mode !== 'erase') return;
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper || active.lockAlpha) return;

      const eraseToStroke = selectionModel.hasSelection();
      const targetCtx = eraseToStroke ? strokeContext : active.context;
      stampAlong(targetCtx, !eraseToStroke, lastX, lastY, lastPressure, x, y, pressure);
      lastX = x;
      lastY = y;
      lastPressure = pressure;
      if (useOverlayPlanes) {
        if (!deferOverlay) updateLiveInkingCanvas();
      } else {
        engine.compositeDirty = true;
      }
    },
    flushLiveOverlay() {
      if (useOverlayPlanes) {
        updateLiveInkingCanvas();
      } else {
        engine.compositeDirty = true;
      }
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
      rustStrokeEngine.endStroke();
      finishStroke();
      strokeTilt = null;
      currentStrokeSpeed = 0;
    },
    cancelStroke() {
      rustStrokeEngine.endStroke();
      clearPredictedStroke();
      strokeContext.clearRect(0, 0, curDocW, curDocH);
      if (mode === 'erase' && preStrokeSnapshot && preStrokeRect) {
        const active = layerManager.getActiveDrawableLayer();
        if (active && active.context && active.id === preStrokeLayerId) {
          active.context.putImageData(preStrokeSnapshot, preStrokeRect.x, preStrokeRect.y);
        }
      }
      preStrokeSnapshot = null;
      preStrokeRawRgba = null;
      preStrokeRect = null;
      mode = null;
      strokeTilt = null;
      currentStrokeSpeed = 0;
      isLivePainting = false;
      useOverlayPlanes = false;
      hasTopLayers = false;
      prevLiveStrokeBounds = null;
      liveStrokeBounds = null;
      liveStrokeContext.clearRect(0, 0, curDocW, curDocH);
      liveStrokeDirty = true;
      engine.compositeDirty = true;
      updateComposite();
    },
    fill(x, y, colorHex, tolerance) {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;
      if (selectionModel.hasSelection() && !selectionModel.isPixelSelected(x, y)) {
        return;
      }

      const bSettings = getToolState().brush;
      const fillRes = executeSmartFill({
        seedX: x,
        seedY: y,
        fillColorHex: colorHex,
        tolerance,
        closeGap: bSettings.closeGap ?? 0,
        areaScaling: bSettings.areaScaling ?? 1,
        referMode: bSettings.referMode ?? 'reference',
        activeLayer: active,
        allLayers: layerManager.layers,
        selectionMaskCanvas: selectionModel.hasSelection() ? selectionModel.maskCanvas : null,
        docW: curDocW,
        docH: curDocH,
      });

      if (fillRes) {
        history.push(active.id, fillRes.bounds, fillRes.prevImageData);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
      } else if (bSettings.referMode === 'editing') {
        const current = active.context.getImageData(0, 0, curDocW, curDocH);
        const maskData = selectionModel.hasSelection()
          ? selectionModel.maskCtx.getImageData(0, 0, curDocW, curDocH).data
          : undefined;
        const fillRes = floodFill(active.context, x, y, colorHex, tolerance, maskData);
        if (fillRes) {
          const dirtyRect: Rect = {
            x: fillRes.minX,
            y: fillRes.minY,
            w: fillRes.maxX - fillRes.minX + 1,
            h: fillRes.maxY - fillRes.minY + 1,
          };
          history.push(active.id, dirtyRect, current);
          meshCache.delete(active.id);
          engine.compositeDirty = true;
        }
      }
    },
    encloseAndFill(polygon, colorHex, tolerance): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return false;
      const bSettings = getToolState().brush;

      const res = executeEncloseAndFill({
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

      if (res) {
        history.push(active.id, res.bounds, res.prevImageData);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
        return true;
      }
      return false;
    },
    paintUnfilledArea(points, radius, colorHex, tolerance): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return false;
      const bSettings = getToolState().brush;

      const res = executePaintUnfilledArea({
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

      if (res) {
        history.push(active.id, res.bounds, res.prevImageData);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
        return true;
      }
      return false;
    },
    fillSelection(colorHex?: string): void {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;

      const hasSel = selectionModel.hasSelection();
      const selBounds = hasSel ? selectionModel.getBounds() : null;
      const targetRect: Rect = selBounds
        ? {
            x: Math.max(0, Math.floor(selBounds.minX)),
            y: Math.max(0, Math.floor(selBounds.minY)),
            w: Math.min(curDocW - Math.floor(selBounds.minX), Math.ceil(selBounds.width)),
            h: Math.min(curDocH - Math.floor(selBounds.minY), Math.ceil(selBounds.height)),
          }
        : { x: 0, y: 0, w: curDocW, h: curDocH };

      const current = active.context.getImageData(targetRect.x, targetRect.y, targetRect.w, targetRect.h);
      history.push(active.id, targetRect, current);
      meshCache.delete(active.id);

      const color = colorHex || getToolState().brush.color;
      active.context.save();
      if (active.lockAlpha) {
        active.context.globalCompositeOperation = 'source-atop';
      }
      liveMaskContext.clearRect(0, 0, curDocW, curDocH);
      liveMaskContext.fillStyle = color;
      liveMaskContext.fillRect(0, 0, curDocW, curDocH);
      if (hasSel) {
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

      const hasSel = selectionModel.hasSelection();
      const selBounds = hasSel ? selectionModel.getBounds() : null;
      const targetRect: Rect = selBounds
        ? {
            x: Math.max(0, Math.floor(selBounds.minX)),
            y: Math.max(0, Math.floor(selBounds.minY)),
            w: Math.min(curDocW - Math.floor(selBounds.minX), Math.ceil(selBounds.width)),
            h: Math.min(curDocH - Math.floor(selBounds.minY), Math.ceil(selBounds.height)),
          }
        : { x: 0, y: 0, w: curDocW, h: curDocH };

      const current = active.context.getImageData(targetRect.x, targetRect.y, targetRect.w, targetRect.h);
      history.push(active.id, targetRect, current);
      meshCache.delete(active.id);
      if (hasSel) {
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
    if (!selectionModel.hasSelection()) {
      rustStrokeEngine.clearSelectionMask();
    }
    engine.compositeDirty = true;
  });

  updateComposite();
  return engine;
}
