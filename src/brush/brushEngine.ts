import { getToolState } from '../tools/toolState';
import { floodFill } from './floodFill';
import { createHistoryManager, HistoryManager } from './history';
import { createLayerManager, LayerManager, LayerNode } from './layers';
import { drawShape } from './shapeDrawer';
import { getStampTexture } from './stampTexture';

export const DOC_W = 1600;
export const DOC_H = 900;

export interface BrushEngine {
  readonly layerManager: LayerManager;
  readonly strokeCanvas: HTMLCanvasElement;
  readonly compositeCanvas: HTMLCanvasElement;
  compositeDirty: boolean;
  beginStroke(x: number, y: number, pressure: number): void;
  continueStroke(x: number, y: number, pressure: number): void;
  beginErase(x: number, y: number, pressure: number): void;
  continueErase(x: number, y: number, pressure: number): void;
  beginShape(x: number, y: number): void;
  updateShape(currentX: number, currentY: number): void;
  endStroke(): void;
  fill(x: number, y: number, colorHex: string, tolerance: number): void;
  undo(): boolean;
  redo(): boolean;
  canUndo(): boolean;
  canRedo(): boolean;
  updateComposite(): void;
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
  let curr = node.parentId ? layerMap.get(node.parentId) : undefined;
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

  const strokeContext = strokeCanvas.getContext('2d')!;
  const compositeContext = compositeCanvas.getContext('2d')!;
  const groupContext = groupCanvas.getContext('2d')!;
  const clipContext = clipCanvas.getContext('2d')!;

  const history: HistoryManager = createHistoryManager(30);

  let mode: 'paint' | 'erase' | 'shape' | null = null;
  let lastX = 0;
  let lastY = 0;
  let distanceSinceStamp = 0;
  let preStrokeSnapshot: ImageData | null = null;
  let preStrokeLayerId = '';

  function stamp(ctx: CanvasRenderingContext2D, erase: boolean, x: number, y: number, pressure: number): void {
    const { size, flow, hardness, color } = getToolState().brush;
    const diameter = Math.max(1, Math.round(size * (0.25 + 0.75 * pressure)));
    const alpha = Math.max(0.02, flow * pressure);
    const stampCanvas = getStampTexture(diameter, hardness, erase ? '#000000' : color);
    if (erase) ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = alpha;
    ctx.drawImage(stampCanvas, x - diameter / 2, y - diameter / 2);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function stampAlong(
    ctx: CanvasRenderingContext2D,
    erase: boolean,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    pressure: number,
  ): void {
    const spacing = Math.max(1, getToolState().brush.size * 0.15);
    const dx = x1 - x0;
    const dy = y1 - y0;
    const segment = Math.hypot(dx, dy);
    if (segment === 0) return;
    const ux = dx / segment;
    const uy = dy / segment;
    let t = spacing - distanceSinceStamp;
    while (t <= segment) {
      stamp(ctx, erase, x0 + ux * t, y0 + uy * t, pressure);
      distanceSinceStamp = 0;
      t += spacing;
    }
    distanceSinceStamp += segment - (t - spacing);
  }

  function finishStroke(): void {
    if (!mode) return;
    const active = layerManager.getActiveDrawableLayer();

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
      preStrokeSnapshot = null;
    }
    engine.compositeDirty = true;
    mode = null;
  }

  function updateComposite(): void {
    compositeContext.clearRect(0, 0, DOC_W, DOC_H);

    const layerMap = new Map(layerManager.layers.map((l) => [l.id, l]));
    const activeDrawable = layerManager.getActiveDrawableLayer();

    function renderLayerTo(targetCtx: CanvasRenderingContext2D, layer: LayerNode, alpha: number): void {
      if (!layer.canvas) return;
      targetCtx.save();
      targetCtx.globalAlpha = alpha;
      targetCtx.globalCompositeOperation = layer.blendMode;
      targetCtx.drawImage(layer.canvas, 0, 0);

      if (layer.id === activeDrawable.id && (mode === 'paint' || mode === 'shape')) {
        targetCtx.globalAlpha = alpha * getToolState().brush.opacity;
        targetCtx.drawImage(strokeCanvas, 0, 0);
      }
      targetCtx.restore();
    }

    const visibleLayers = layerManager.layers.filter(
      (l) => l.type === 'raster' && l.canvas && isEffectivelyVisible(l, layerMap),
    );

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

    engine.compositeDirty = false;
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
    beginStroke(x, y, pressure) {
      finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
      preStrokeSnapshot = active.context.getImageData(0, 0, DOC_W, DOC_H);
      preStrokeLayerId = active.id;
      mode = 'paint';
      lastX = x;
      lastY = y;
      distanceSinceStamp = 0;
      stamp(strokeContext, false, x, y, pressure);
      engine.compositeDirty = true;
    },
    continueStroke(x, y, pressure) {
      if (mode !== 'paint') return;
      stampAlong(strokeContext, false, lastX, lastY, x, y, pressure);
      lastX = x;
      lastY = y;
      engine.compositeDirty = true;
    },
    beginErase(x, y, pressure) {
      finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
      preStrokeSnapshot = active.context.getImageData(0, 0, DOC_W, DOC_H);
      preStrokeLayerId = active.id;
      mode = 'erase';
      lastX = x;
      lastY = y;
      distanceSinceStamp = 0;
      stamp(active.context, true, x, y, pressure);
      engine.compositeDirty = true;
    },
    continueErase(x, y, pressure) {
      if (mode !== 'erase') return;
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
      stampAlong(active.context, true, lastX, lastY, x, y, pressure);
      lastX = x;
      lastY = y;
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
    endStroke() {
      finishStroke();
    },
    fill(x, y, colorHex, tolerance) {
      if (mode) finishStroke();
      const active = layerManager.getActiveDrawableLayer();
      if (!active.context) return;
      const current = active.context.getImageData(0, 0, DOC_W, DOC_H);
      history.push(active.id, current);
      floodFill(active.context, x, y, colorHex, tolerance);
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

  updateComposite();
  return engine;
}
