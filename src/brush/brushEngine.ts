import {
  type EvaluatedBoneWorld,
  type LayerMeshSkin,
  buildLayerMeshSkin,
  renderSkinnedLayerMesh,
} from '../animation/boneModel';
import type { TimelineManager } from '../animation/timelineManager';
import type { BrushSettings } from '../tools/toolState';
import { getToolState, subscribeTools } from '../tools/toolState';
import { floodFill } from './floodFill';
import { createHistoryManager, HistoryManager } from './history';
import { createLayerManager, getRenderOrder, LayerManager, LayerNode } from './layers';
import { drawShape } from './shapeDrawer';
import { getStampTexture } from './stampTexture';

export const DOC_W = 1600;
export const DOC_H = 900;

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
  compositeDirty: boolean;
  setTimelineManager(tm: TimelineManager): void;
  getTimelineManager(): TimelineManager | null;
  beginStroke(x: number, y: number, pressure: number): void;
  continueStroke(x: number, y: number, pressure: number): void;
  beginErase(x: number, y: number, pressure: number): void;
  continueErase(x: number, y: number, pressure: number): void;
  beginShape(x: number, y: number): void;
  updateShape(currentX: number, currentY: number): void;
  endStroke(tail?: StrokeTail): void;
  fill(x: number, y: number, colorHex: string, tolerance: number): void;
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
 * Diameter in px for a stamp given pressure and the distance walked along the
 * stroke. Combines the pressure curve, the minimum size ratio and the starting
 * taper (smoothstep), so strokes begin as a needle instead of a fat dot.
 */
export function brushDiameterAt(s: BrushSettings, pressure: number, distance: number): number {
  const p = clamp01(pressure);
  const curvedP = s.pressureSize ? Math.pow(p, Math.max(0.1, s.pressureCurve)) : 1;
  let smoothStart = 1;
  if (s.taperStart > 0) {
    const t = Math.min(1, distance / s.taperStart);
    smoothStart = t * t * (3 - 2 * t);
  }
  const factor = s.minSizeRatio + (1 - s.minSizeRatio) * curvedP * smoothStart;
  return Math.max(MIN_STAMP_DIAMETER, s.size * factor);
}

/**
 * Alpha for a single stamp. 'uniform' pens without pressure on density stay
 * fully solid (no overlapping-scale artifacts). Accumulated ink scales the raw
 * flow by the stamp spacing so dense spacing converges smoothly instead of
 * saturating or leaving visible steps.
 */
export function brushStampAlpha(s: BrushSettings, pressure: number): number {
  const p = clamp01(pressure);
  const flow = s.pressureFlow ? s.flow * Math.pow(p, 1.2) : s.flow;
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
  const followsStroke = s.followDirection && s.tipShape !== 'calligraphic';
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

  const strokeContext = strokeCanvas.getContext('2d')!;
  const compositeContext = compositeCanvas.getContext('2d')!;
  const groupContext = groupCanvas.getContext('2d')!;
  const clipContext = clipCanvas.getContext('2d')!;
  const onionContext = onionCanvas.getContext('2d')!;

  const history: HistoryManager = createHistoryManager(30);

  let timelineManager: TimelineManager | null = null;

  let mode: 'paint' | 'erase' | 'shape' | null = null;
  let lastX = 0;
  let lastY = 0;
  let lastPressure = 1;
  let rawLastX = 0;
  let rawLastY = 0;
  let rawLastPressure = 1;
  let lastAngleRad = 0;
  let distanceSinceStamp = 0;
  let strokeDistance = 0;
  let strokeSettings: BrushSettings = { ...getToolState().brush };
  let preStrokeSnapshot: ImageData | null = null;
  let preStrokeLayerId = '';

  function stampAt(
    ctx: CanvasRenderingContext2D,
    erase: boolean,
    x: number,
    y: number,
    diameter: number,
    pressure: number,
    angleRad: number,
  ): void {
    const s = strokeSettings;
    const stampCanvas = getStampTexture({
      diameter,
      hardness: s.hardness,
      color: erase ? '#000000' : s.color,
      antiAliasing: s.antiAliasing,
      tipShape: s.tipShape,
      tipRoundness: s.tipRoundness,
    });
    const alpha = brushStampAlpha(s, pressure);
    const w = stampCanvas.width;
    const h = stampCanvas.height;
    const symmetric = s.tipShape !== 'square' && s.tipRoundness >= 0.999;

    ctx.save();
    if (erase) ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = alpha;
    if (!symmetric && angleRad !== 0) {
      ctx.translate(x, y);
      ctx.rotate(angleRad);
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

    let pos = 0;
    let since = distanceSinceStamp;
    let guard = 0;

    for (;;) {
      if (++guard > STAMP_GUARD) break;
      const u = pos / segment;
      const pAt = p0 + (p1 - p0) * u;
      // Adaptive step: as the tip narrows the stamps get closer together and
      // the needle stays continuous instead of turning into loose dots.
      const step = Math.max(MIN_STAMP_STEP, brushDiameterAt(s, pAt, strokeDistance + pos) * spacing);
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
      stampAt(
        ctx,
        erase,
        x0 + dx * u2,
        y0 + dy * u2,
        brushDiameterAt(s, p2, strokeDistance + pos),
        p2,
        angleRad,
      );
    }

    strokeDistance += segment;
    distanceSinceStamp = since;
  }

  function strokeCtxForErase(): CanvasRenderingContext2D | null {
    return layerManager.getActiveDrawableLayer().context ?? null;
  }

  function drawTail(tail: StrokeTail): void {
    const s = strokeSettings;
    if (s.taperEnd <= 0) return;
    const speed = Math.hypot(tail.vx, tail.vy);
    if (speed <= 0.5) return;

    const erase = mode === 'erase';
    const ctx = erase ? strokeCtxForErase() : strokeContext;
    if (!ctx) return;

    const ux = tail.vx / speed;
    const uy = tail.vy / speed;
    // Mouse has no pressure: use the full configured taper. With a pen the
    // flick of the stroke decides how long the tail is.
    const tailLength = Math.max(1, tail.isMouse ? s.taperEnd : Math.min(s.taperEnd, speed * 2.5));
    const spacing = Math.min(0.5, Math.max(0.03, s.spacing));
    const baseD = brushDiameterAt(s, lastPressure, strokeDistance);
    const angleRad = lastAngleRad;

    let walked = 0;
    let guard = 0;
    while (walked <= tailLength && guard++ < 4000) {
      const f = Math.pow(1 - walked / tailLength, 1.5);
      const diameter = Math.max(MIN_STAMP_DIAMETER, baseD * f);
      stampAt(
        ctx,
        erase,
        lastX + ux * walked,
        lastY + uy * walked,
        diameter,
        lastPressure * f,
        angleRad,
      );
      walked += Math.max(MIN_STAMP_STEP, diameter * spacing);
    }
  }

  function finishStroke(): void {
    if (!mode) return;
    const active = layerManager.getActiveDrawableLayer();

    if (mode === 'paint') {
      if (Math.hypot(rawLastX - lastX, rawLastY - lastY) > 0.5) {
        stampAlong(strokeContext, false, lastX, lastY, lastPressure, rawLastX, rawLastY, rawLastPressure);
        lastX = rawLastX;
        lastY = rawLastY;
        lastPressure = rawLastPressure;
      }
    }

    if (mode === 'paint' || mode === 'shape') {
      if (active.context) {
        active.context.globalAlpha = getToolState().brush.opacity;
        active.context.drawImage(strokeCanvas, 0, 0);
        active.context.globalAlpha = 1;
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

      if (useMeshSkin && timelineManager && evaluatedBones) {
        let cached = meshCache.get(layer.id);
        if (!cached || cached.boneCount !== timelineManager.bones.length) {
          const built = buildLayerMeshSkin(layer.id, layer.canvas, timelineManager.bones, 10, 10);
          if (built) {
            cached = { boneCount: timelineManager.bones.length, mesh: built };
            meshCache.set(layer.id, cached);
          }
        }
        if (cached) {
          renderSkinnedLayerMesh(targetCtx, layer.canvas, cached.mesh, evaluatedBones);
        } else {
          targetCtx.drawImage(layer.canvas, 0, 0);
        }
      } else if (boundBoneEval) {
        const [a, b, c, d, tx, ty] = boundBoneEval.skinMatrix;
        targetCtx.transform(a, b, c, d, tx, ty);
        targetCtx.drawImage(layer.canvas, 0, 0);
      } else {
        targetCtx.drawImage(layer.canvas, 0, 0);
      }

      if (layer.id === activeDrawable.id && (mode === 'paint' || mode === 'shape')) {
        targetCtx.globalAlpha = Math.max(0, Math.min(1, effectiveAlpha * getToolState().brush.opacity));
        targetCtx.drawImage(strokeCanvas, 0, 0);
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
    if (!active.context) return;
    preStrokeSnapshot = active.context.getImageData(0, 0, DOC_W, DOC_H);
    preStrokeLayerId = active.id;

    strokeSettings = { ...getToolState().brush };
    mode = erase ? 'erase' : 'paint';
    lastX = x;
    lastY = y;
    lastPressure = pressure;
    rawLastX = x;
    rawLastY = y;
    rawLastPressure = pressure;
    lastAngleRad = tipAngleRad(strokeSettings, 0, 0);
    distanceSinceStamp = 0;
    strokeDistance = 0;

    // First stamp sits at distance 0, so a starting taper begins as a needle.
    stampAt(
      erase ? active.context : strokeContext,
      erase,
      x,
      y,
      brushDiameterAt(strokeSettings, pressure, 0),
      pressure,
      lastAngleRad,
    );
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
      finishStroke();
      beginInkStroke(x, y, pressure, false);
    },
    continueStroke(x, y, pressure) {
      if (mode !== 'paint') return;
      rawLastX = x;
      rawLastY = y;
      rawLastPressure = pressure;

      const stab = Math.min(20, Math.max(0, strokeSettings.stabilization));
      let targetX = x;
      let targetY = y;
      let targetP = pressure;
      if (stab > 0) {
        const weight = 1 / (1 + stab * 0.4);
        targetX = lastX + (x - lastX) * weight;
        targetY = lastY + (y - lastY) * weight;
        targetP = lastPressure + (pressure - lastPressure) * weight;
      }

      stampAlong(strokeContext, false, lastX, lastY, lastPressure, targetX, targetY, targetP);
      lastX = targetX;
      lastY = targetY;
      lastPressure = targetP;
      engine.compositeDirty = true;
    },
    beginErase(x, y, pressure) {
      finishStroke();
      beginInkStroke(x, y, pressure, true);
    },
    continueErase(x, y, pressure) {
      if (mode !== 'erase') return;
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
      rawLastX = x;
      rawLastY = y;
      rawLastPressure = pressure;

      const stab = Math.min(20, Math.max(0, strokeSettings.stabilization));
      let targetX = x;
      let targetY = y;
      let targetP = pressure;
      if (stab > 0) {
        const weight = 1 / (1 + stab * 0.4);
        targetX = lastX + (x - lastX) * weight;
        targetY = lastY + (y - lastY) * weight;
        targetP = lastPressure + (pressure - lastPressure) * weight;
      }

      stampAlong(active.context, true, lastX, lastY, lastPressure, targetX, targetY, targetP);
      lastX = targetX;
      lastY = targetY;
      lastPressure = targetP;
      engine.compositeDirty = true;
    },
    beginShape(x, y) {
      finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
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
    },
    fill(x, y, colorHex, tolerance) {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      history.push(active.id, current);
      floodFill(active.context, x, y, colorHex, tolerance);
      meshCache.delete(active.id);
      engine.compositeDirty = true;
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
    updateComposite,
  };

  subscribeTools(() => {
    engine.compositeDirty = true;
  });

  updateComposite();
  return engine;
}
