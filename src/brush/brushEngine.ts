import {
  type EvaluatedBoneWorld,
  type LayerMeshSkin,
  buildLayerMeshSkin,
  renderSkinnedLayerMesh,
} from '../animation/boneModel';
import type { TimelineManager } from '../animation/timelineManager';
import type { BrushSettings, TipTextureId } from '../tools/toolState';
import { getToolState, subscribeTools, hexToRgb, rgbToHex } from '../tools/toolState';
import { floodFill } from './floodFill';
import { executeSmartFill, executeEncloseAndFill, executePaintUnfilledArea } from './smartFill';
import { createHistoryManager, HistoryManager } from './history';
import { createLayerManager, getRenderOrder, LayerManager, LayerNode } from './layers';
import { drawShape } from './shapeDrawer';
import { getStampTexture } from './stampTexture';
import type { TiltFootprint } from './pressureResponse';
import { samplePaperGrain } from './brushTextureAssets';
import { DOC_H, DOC_W } from './docConstants';
import { selectionModel, SelectionModel } from '../selection/selectionModel';

export { DOC_H, DOC_W } from './docConstants';

const MIN_STAMP_DIAMETER = 0.4;
const MIN_STAMP_STEP = 0.35;
const STAMP_GUARD = 20000;

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
  compositeDirty: boolean;
  setTimelineManager(tm: TimelineManager): void;
  getTimelineManager(): TimelineManager | null;
  beginStroke(x: number, y: number, pressure: number): void;
  continueStroke(x: number, y: number, pressure: number): void;
  beginErase(x: number, y: number, pressure: number): void;
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
  fill(x: number, y: number, colorHex: string, tolerance: number): void;
  encloseAndFill(polygon: { x: number; y: number }[], colorHex: string, tolerance: number): boolean;
  paintUnfilledArea(points: { x: number; y: number }[], radius: number, colorHex: string, tolerance: number): boolean;
  fillSelection(colorHex?: string): void;
  clearActiveLayer(): boolean;
  pushUndoRecord(layerId: string, data: ImageData): void;
  undo(): boolean;
  redo(): boolean;
  canUndo(): boolean;
  canRedo(): boolean;
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
): number {
  const p = clamp01(pressure);
  const curvedP = s.pressureSize ? Math.pow(p, Math.max(0.1, s.pressureCurve)) : 1;
  let smoothStart = 1;
  if (s.taperStart > 0) {
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

  const factor = s.minSizeRatio + (1 - s.minSizeRatio) * curvedP * smoothStart * speedFactor;
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
  if (raw >= 0.88) {
    return 1.0;
  }

  // Con presión baja (veladura y acuarela suave):
  const exponent = Math.max(0.2, s.spacing * 2.5);
  const alpha = 1 - Math.pow(1 - raw, exponent);
  return Math.min(1, Math.max(0.04, alpha));
}

function tipAngleRad(s: BrushSettings, dx: number, dy: number): number {
  const isCustomTip = !!(s.tipTexture && s.tipTexture !== 'default');
  const followsStroke = (s.followDirection || isCustomTip) && s.tipShape !== 'calligraphic';
  let dirDeg = 0;
  if (followsStroke && (dx !== 0 || dy !== 0)) {
    dirDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  }
  return ((s.tipAngle + dirDeg) * Math.PI) / 180;
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
  const layerManager = createLayerManager(DOC_W, DOC_H);
  const strokeCanvas = makeCanvas(DOC_W, DOC_H);
  const compositeCanvas = makeCanvas(DOC_W, DOC_H);
  const groupCanvas = makeCanvas(DOC_W, DOC_H);
  const clipCanvas = makeCanvas(DOC_W, DOC_H);
  const onionCanvas = makeCanvas(DOC_W, DOC_H);
  const lockAlphaCanvas = makeCanvas(DOC_W, DOC_H);
  const liveMaskCanvas = makeCanvas(DOC_W, DOC_H);
  const predictedCanvas = makeCanvas(DOC_W, DOC_H);
  const layerColorCanvas = makeCanvas(DOC_W, DOC_H);

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
  let preStrokeLayerId = '';
  let strokePickedColor: [number, number, number, number] | null = null;
  let currentStrokeSpeed = 0;
  let strokeStampIndex = 0;

  function samplePreStrokeColor(x: number, y: number): [number, number, number, number] | null {
    if (!preStrokeSnapshot) return null;
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    if (ix < 0 || ix >= DOC_W || iy < 0 || iy >= DOC_H) return null;
    const idx = (iy * DOC_W + ix) * 4;
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

    // 3. Paper tooth modulation (Authentic CSP & analog paper tooth bite)
    if (!erase && s.paperTexture && s.paperTexture !== 'none' && (s.textureDensity ?? 0) > 0) {
      const density = clamp01(s.textureDensity ?? 0.85);
      const grain = samplePaperGrain(s.paperTexture, x, y, s.textureScale ?? 0.35);
      // Peaks catch ink, valleys resist ink.
      // Firm pressure pushes nib deeper into grooves, increasing tooth bite.
      const press = clamp01(pressure);
      const bite = Math.pow(grain, (1.8 - press * 1.1) * (0.5 + density * 1.5));
      const modulation = (1 - density * 0.85) + density * 0.85 * bite;
      alpha *= Math.max(0.02, Math.min(1.0, modulation));
    }

    if (alpha <= 0.005) return;

    // Pen tilt (REA study 5.1): the nib lies against the glass, so the contact
    // ellipse elongates along the lean while the nominal diameter is kept
    // across it. Spray particles keep their own random rotation instead.
    let drawDiameter = diameter;
    let roundness = s.tipRoundness;
    let stampAngle = angleRad;
    if (strokeTilt && !s.spray) {
      drawDiameter = Math.min(diameter / strokeTilt.squash, diameter * 1.75);
      roundness = Math.min(1, Math.max(0.1, s.tipRoundness * strokeTilt.squash));
      stampAngle = strokeTilt.azimuthRad + (s.tipAngle * Math.PI) / 180;
    }

    const stampCanvas = getStampTexture({
      diameter: drawDiameter,
      hardness: s.hardness,
      color: stampColor,
      antiAliasing: s.antiAliasing,
      tipShape: s.tipShape,
      tipRoundness: roundness,
      tipTexture: effectiveTip,
    });

    const w = stampCanvas.width;
    const h = stampCanvas.height;
    const symmetric = s.tipShape !== 'square' && roundness >= 0.999 && (!effectiveTip || effectiveTip === 'default');

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

    const spacing = Math.min(0.5, Math.max(0.03, s.spacing));
    const angleRad = tipAngleRad(s, dx, dy);
    lastAngleRad = angleRad;

    const tipsList: TipTextureId[] = (s.tipTextures && s.tipTextures.length > 0)
      ? s.tipTextures
      : (s.tipTexture && s.tipTexture !== 'default' ? [s.tipTexture] : []);

    let pos = 0;
    let since = distanceSinceStamp;
    let guard = 0;

    for (;;) {
      if (++guard > STAMP_GUARD) break;
      const u = pos / segment;
      const pAt = p0 + (p1 - p0) * u;
      // Adaptive step: as the tip narrows the stamps get closer together and
      // the needle stays continuous instead of turning into loose dots.
      const step = Math.max(MIN_STAMP_STEP, brushDiameterAt(s, pAt, strokeDistance + pos, currentStrokeSpeed) * spacing);
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

      let activeTip: TipTextureId | undefined = undefined;
      if (tipsList.length > 1) {
        if (s.tipCycleMode === 'sequential') {
          activeTip = tipsList[strokeStampIndex % tipsList.length];
        } else {
          activeTip = tipsList[Math.floor(Math.random() * tipsList.length)];
        }
      } else if (tipsList.length === 1) {
        activeTip = tipsList[0];
      }
      strokeStampIndex++;

      if (s.spray) {
        const count = Math.max(1, Math.round(s.sprayDensity ?? 5));
        const radius = s.sprayRadius ?? Math.max(12, brushDiameterAt(s, p2, strokeDistance + pos, currentStrokeSpeed) * 1.5);
        for (let k = 0; k < count; k++) {
          const r = radius * Math.sqrt(Math.random());
          const th = Math.random() * Math.PI * 2;
          const sx = x0 + dx * u2 + r * Math.cos(th);
          const sy = y0 + dy * u2 + r * Math.sin(th);
          const pSize = Math.max(MIN_STAMP_DIAMETER, brushDiameterAt(s, p2, strokeDistance + pos, currentStrokeSpeed) * (0.35 + Math.random() * 0.85));
          const pAngle = Math.random() * Math.PI * 2;
          stampAt(ctx, erase, sx, sy, pSize, p2, pAngle, activeTip);
        }
      } else {
        const isCustomTip = !!(activeTip && activeTip !== 'default') || !!(s.tipTexture && s.tipTexture !== 'default');
        const stampAngle = isCustomTip ? angleRad + (Math.sin(pos * 0.7 + strokeStampIndex) * 0.08) : angleRad;
        stampAt(
          ctx,
          erase,
          x0 + dx * u2,
          y0 + dy * u2,
          brushDiameterAt(s, p2, strokeDistance + pos, currentStrokeSpeed),
          p2,
          stampAngle,
          activeTip,
        );
      }
    }

    strokeDistance += segment;
    distanceSinceStamp = since;
  }

  function strokeCtxForErase(): CanvasRenderingContext2D | null {
    return layerManager.getActiveDrawableLayer().context ?? null;
  }

  function drawTail(tail: StrokeTail): void {
    const s = strokeSettings;
    // Stylus pen lifting naturally tapers pressure in strokeInput.ts.
    // drawTail is only intended for mouse strokes where there is no physical pressure sensor.
    if (!tail.isMouse || s.taperEnd <= 0 || s.spray) return;
    const speed = Math.hypot(tail.vx, tail.vy);
    if (speed <= 0.5) return;

    const erase = mode === 'erase';
    const eraseToStroke = erase && selectionModel.hasSelection();
    const ctx = erase ? (eraseToStroke ? strokeContext : strokeCtxForErase()) : strokeContext;
    if (!ctx) return;
    const isEraseOp = erase && !eraseToStroke;

    const ux = tail.vx / speed;
    const uy = tail.vy / speed;
    const tailLength = Math.max(1, Math.min(s.taperEnd, speed * 2.0));
    const spacing = Math.min(0.5, Math.max(0.03, s.spacing));
    const baseD = brushDiameterAt(s, lastPressure, strokeDistance);
    const angleRad = lastAngleRad;

    const tipsList: TipTextureId[] = (s.tipTextures && s.tipTextures.length > 0)
      ? s.tipTextures
      : (s.tipTexture && s.tipTexture !== 'default' ? [s.tipTexture] : []);
    const tailTip = tipsList.length > 0 ? tipsList[0] : undefined;

    let walked = 0;
    let guard = 0;
    while (walked <= tailLength && guard++ < 4000) {
      const f = Math.pow(1 - walked / tailLength, 1.5);
      const diameter = Math.max(MIN_STAMP_DIAMETER, baseD * f);
      stampAt(
        ctx,
        isEraseOp,
        lastX + ux * walked,
        lastY + uy * walked,
        diameter,
        lastPressure * f,
        angleRad,
        tailTip,
      );
      walked += Math.max(MIN_STAMP_STEP, diameter * spacing);
    }
    lastX += ux * walked;
    lastY += uy * walked;
    lastPressure = 0;
  }

  function renderPredictedStroke(points: { x: number; y: number; pressure: number }[]): void {
    if (!mode || mode === 'shape' || points.length === 0) return;
    predictedContext.clearRect(0, 0, DOC_W, DOC_H);
    hasPredictions = true;

    let prevX = lastX;
    let prevY = lastY;
    let prevP = lastPressure;

    const erase = mode === 'erase';
    const eraseToStroke = erase && selectionModel.hasSelection();
    const isEraseOp = erase && !eraseToStroke;

    const savedDist = strokeDistance;
    const savedSince = distanceSinceStamp;

    for (const pt of points) {
      stampAlong(predictedContext, isEraseOp, prevX, prevY, prevP, pt.x, pt.y, pt.pressure);
      prevX = pt.x;
      prevY = pt.y;
      prevP = pt.pressure;
    }

    strokeDistance = savedDist;
    distanceSinceStamp = savedSince;
    engine.compositeDirty = true;
  }

  function clearPredictedStroke(): void {
    if (hasPredictions) {
      predictedContext.clearRect(0, 0, DOC_W, DOC_H);
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
      strokeContext.clearRect(0, 0, DOC_W, DOC_H);
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
      strokeContext.clearRect(0, 0, DOC_W, DOC_H);
    }

    if (preStrokeSnapshot) {
      history.push(preStrokeLayerId, preStrokeSnapshot);
      meshCache.delete(preStrokeLayerId);
      preStrokeSnapshot = null;
    }
    engine.compositeDirty = true;
    mode = null;
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
    compositeContext.clearRect(0, 0, DOC_W, DOC_H);

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
        const cx = DOC_W / 2;
        const cy = DOC_H / 2;
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

      if (isLivePainting && layer.lockAlpha) {
        lockAlphaContext.clearRect(0, 0, DOC_W, DOC_H);
        lockAlphaContext.drawImage(layer.canvas, 0, 0);
        lockAlphaContext.save();
        lockAlphaContext.globalCompositeOperation = 'source-atop';
        lockAlphaContext.globalAlpha = getToolState().brush.opacity;
        lockAlphaContext.drawImage(strokeCanvas, 0, 0);
        if (hasPredictions) {
          lockAlphaContext.drawImage(predictedCanvas, 0, 0);
        }
        lockAlphaContext.restore();
        sourceCanvasToDraw = lockAlphaCanvas;
      }

      // CSP Layer Color Effect (Azul de boceto / Sketch cyan non-destructive tint)
      if (layer.useLayerColor && !layer.isPaper) {
        layerColorContext.clearRect(0, 0, DOC_W, DOC_H);
        layerColorContext.drawImage(sourceCanvasToDraw, 0, 0);

        if (isLivePainting && !layer.lockAlpha) {
          layerColorContext.save();
          layerColorContext.globalAlpha = getToolState().brush.opacity;
          if (strokeSettings.compositeMode === 'lighter') {
            layerColorContext.globalCompositeOperation = 'lighter';
          }
          if (selectionModel.hasSelection()) {
            liveMaskContext.clearRect(0, 0, DOC_W, DOC_H);
            liveMaskContext.drawImage(strokeCanvas, 0, 0);
            if (hasPredictions) {
              liveMaskContext.drawImage(predictedCanvas, 0, 0);
            }
            liveMaskContext.save();
            liveMaskContext.globalCompositeOperation = 'destination-in';
            liveMaskContext.drawImage(selectionModel.maskCanvas, 0, 0);
            liveMaskContext.restore();
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
        layerColorContext.fillRect(0, 0, DOC_W, DOC_H);
        layerColorContext.restore();

        sourceCanvasToDraw = layerColorCanvas;
      }

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
          targetCtx.drawImage(sourceCanvasToDraw, 0, 0);
        }
      } else if (boundBoneEval) {
        const [a, b, c, d, tx, ty] = boundBoneEval.skinMatrix;
        targetCtx.transform(a, b, c, d, tx, ty);
        targetCtx.drawImage(sourceCanvasToDraw, 0, 0);
      } else {
        targetCtx.drawImage(sourceCanvasToDraw, 0, 0);
      }

      if (isLivePainting && !layer.lockAlpha && !liveStrokeDrawnInTint) {
        targetCtx.globalAlpha = Math.max(0, Math.min(1, effectiveAlpha * getToolState().brush.opacity));
        if (strokeSettings.compositeMode === 'lighter') {
          targetCtx.globalCompositeOperation = 'lighter';
        }
        if (selectionModel.hasSelection()) {
          liveMaskContext.clearRect(0, 0, DOC_W, DOC_H);
          liveMaskContext.drawImage(strokeCanvas, 0, 0);
          if (hasPredictions) {
            liveMaskContext.drawImage(predictedCanvas, 0, 0);
          }
          liveMaskContext.save();
          liveMaskContext.globalCompositeOperation = 'destination-in';
          liveMaskContext.drawImage(selectionModel.maskCanvas, 0, 0);
          liveMaskContext.restore();
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
          onionContext.clearRect(0, 0, DOC_W, DOC_H);
          onionContext.save();

          const cx = DOC_W / 2;
          const cy = DOC_H / 2;

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
            onionContext.fillRect(0, 0, DOC_W, DOC_H);
            onionContext.restore();
          }

          compositeContext.save();
          compositeContext.globalAlpha = item.opacity * (item.transform?.opacity ?? 1);
          compositeContext.drawImage(onionCanvas, 0, 0);
          compositeContext.restore();
        }
      }
    }

    // 3. Filter visible non-paper raster layers (respecting animation timeline active cels & folder hierarchy)
    const renderOrdered = getRenderOrder(layerManager.layers);
    const visibleLayers = renderOrdered.filter((l) => {
      if (l.type !== 'raster' || !l.canvas || l.isPaper) return false;
      if (!isEffectivelyVisible(l, layerMap)) return false;
      if (timelineManager && !timelineManager.isLayerVisibleAtFrame(l, timelineManager.settings.currentFrame)) {
        return false;
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
        groupContext.clearRect(0, 0, DOC_W, DOC_H);
        renderLayerTo(groupContext, baseLayer, 1);

        for (const clipped of clippedGroup) {
          const clippedOpacity = getEffectiveOpacity(clipped, layerMap);

          clipContext.clearRect(0, 0, DOC_W, DOC_H);
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
  }

  function beginInkStroke(x: number, y: number, pressure: number, erase: boolean): void {
    const active = layerManager.getActiveDrawableLayer();
    if (!active.context || active.locked || active.isPaper) return;
    if (erase && active.lockAlpha) return;
    preStrokeSnapshot = active.context.getImageData(0, 0, DOC_W, DOC_H);
    preStrokeLayerId = active.id;

    strokeSettings = { ...getToolState().brush };
    currentColorHex = strokeSettings.color;
    mode = erase ? 'erase' : 'paint';
    lastX = x;
    lastY = y;
    lastPressure = pressure;
    lastAngleRad = tipAngleRad(strokeSettings, 0, 0);
    distanceSinceStamp = 0;
    strokeDistance = 0;
    strokeStampIndex = 0;

    strokePickedColor = null;

    const tipsList: TipTextureId[] = (strokeSettings.tipTextures && strokeSettings.tipTextures.length > 0)
      ? strokeSettings.tipTextures
      : (strokeSettings.tipTexture && strokeSettings.tipTexture !== 'default' ? [strokeSettings.tipTexture] : []);
    const firstTip = tipsList.length > 0 ? tipsList[0] : undefined;

    // First stamp sits at distance 0, so a starting taper begins as a needle.
    const eraseToStroke = erase && selectionModel.hasSelection();
    const targetCtx = erase ? (eraseToStroke ? strokeContext : active.context) : strokeContext;
    const isEraseOp = erase && !eraseToStroke;

    if (strokeSettings.spray) {
      const count = Math.max(1, Math.round(strokeSettings.sprayDensity ?? 5));
      const radius = strokeSettings.sprayRadius ?? Math.max(12, brushDiameterAt(strokeSettings, pressure, 0) * 1.5);
      for (let k = 0; k < count; k++) {
        const r = radius * Math.sqrt(Math.random());
        const th = Math.random() * Math.PI * 2;
        const sx = x + r * Math.cos(th);
        const sy = y + r * Math.sin(th);
        const pSize = Math.max(MIN_STAMP_DIAMETER, brushDiameterAt(strokeSettings, pressure, 0) * (0.35 + Math.random() * 0.85));
        const pAngle = Math.random() * Math.PI * 2;
        stampAt(targetCtx, isEraseOp, sx, sy, pSize, pressure, pAngle, firstTip);
      }
    } else {
      stampAt(
        targetCtx,
        isEraseOp,
        x,
        y,
        brushDiameterAt(strokeSettings, pressure, 0),
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

  const engine: BrushEngine = {
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
    beginStroke(x, y, pressure) {
      currentStrokeSpeed = 0;
      finishStroke();
      beginInkStroke(x, y, pressure, false);
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
    beginErase(x, y, pressure) {
      currentStrokeSpeed = 0;
      finishStroke();
      beginInkStroke(x, y, pressure, true);
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
      preStrokeSnapshot = active.context.getImageData(0, 0, DOC_W, DOC_H);
      preStrokeLayerId = active.id;
      mode = 'shape';
      lastX = x;
      lastY = y;
      strokeContext.clearRect(0, 0, DOC_W, DOC_H);
      engine.compositeDirty = true;
    },
    updateShape(currentX, currentY) {
      if (mode !== 'shape') return;
      strokeContext.clearRect(0, 0, DOC_W, DOC_H);
      const { size, color, shapeType, shapeFill } = getToolState().brush;
      drawShape(strokeContext, lastX, lastY, currentX, currentY, shapeType, shapeFill, size, color);
      engine.compositeDirty = true;
    },
    endStroke(tail) {
      if ((mode === 'paint' || mode === 'erase') && tail) {
        drawTail(tail);
      }
      finishStroke();
      strokeTilt = null;
      currentStrokeSpeed = 0;
    },
    fill(x, y, colorHex, tolerance) {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;
      if (selectionModel.hasSelection() && !selectionModel.isPixelSelected(x, y)) {
        return;
      }
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      history.push(active.id, current);

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
        docW: DOC_W,
        docH: DOC_H,
      });

      if (!handled) {
        floodFill(active.context, x, y, colorHex, tolerance);
        if (selectionModel.hasSelection()) {
          // If selection is active, restore pixels outside selection using pre-fill snapshot
          const newImg = active.context.getImageData(0, 0, DOC_W, DOC_H);
          const maskData = selectionModel.maskCtx.getImageData(0, 0, DOC_W, DOC_H).data;
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
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
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
        docW: DOC_W,
        docH: DOC_H,
      });

      if (ok) {
        history.push(active.id, current);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
      }
      return ok;
    },
    paintUnfilledArea(points, radius, colorHex, tolerance): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return false;
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
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
        docW: DOC_W,
        docH: DOC_H,
      });

      if (ok) {
        history.push(active.id, current);
        meshCache.delete(active.id);
        engine.compositeDirty = true;
      }
      return ok;
    },
    fillSelection(colorHex?: string): void {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context || active.locked || active.isPaper) return;
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      history.push(active.id, current);
      meshCache.delete(active.id);

      const color = colorHex || getToolState().brush.color;
      active.context.save();
      if (active.lockAlpha) {
        active.context.globalCompositeOperation = 'source-atop';
      }
      liveMaskContext.clearRect(0, 0, DOC_W, DOC_H);
      liveMaskContext.fillStyle = color;
      liveMaskContext.fillRect(0, 0, DOC_W, DOC_H);
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
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      history.push(active.id, current);
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
    pushUndoRecord(layerId: string, data: ImageData): void {
      history.push(layerId, data);
    },
    undo(): boolean {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return false;
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      const record = history.undo(active.id, current);
      if (!record) return false;

      const targetLayer = layerManager.layers.find((l) => l.id === record.layerId);
      if (targetLayer && targetLayer.context) {
        targetLayer.context.putImageData(record.data, 0, 0);
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
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      const record = history.redo(active.id, current);
      if (!record) return false;

      const targetLayer = layerManager.layers.find((l) => l.id === record.layerId);
      if (targetLayer && targetLayer.context) {
        targetLayer.context.putImageData(record.data, 0, 0);
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
