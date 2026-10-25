import type { BrushEngine } from '../brush/brushEngine';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';
import { selectionModel } from './selectionModel';
import { setTransformModalLocked } from './transformModal';

export interface TransformState {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // in radians
  scaleX: number;
  scaleY: number;
}

export type TransformMode = 'affine' | 'mesh';

type HandleKind = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w' | 'rotate' | 'move' | string;

function drawWarpedTriangle(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  u0: number, v0: number,
  u1: number, v1: number,
  u2: number, v2: number,
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
): void {
  const du1 = u1 - u0;
  const dv1 = v1 - v0;
  const du2 = u2 - u0;
  const dv2 = v2 - v0;
  const denom = du1 * dv2 - du2 * dv1;
  if (Math.abs(denom) < 1e-6) return;

  const invDenom = 1 / denom;
  const dx1 = x1 - x0;
  const dy1 = y1 - y0;
  const dx2 = x2 - x0;
  const dy2 = y2 - y0;

  const a = (dx1 * dv2 - dx2 * dv1) * invDenom;
  const b = (dy1 * dv2 - dy2 * dv1) * invDenom;
  const c = (dx2 * du1 - dx1 * du2) * invDenom;
  const d = (dy2 * du1 - dy1 * du2) * invDenom;
  const e = x0 - a * u0 - c * v0;
  const f = y0 - b * u0 - d * v0;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

export function renderMeshWarpTriangles(
  ctx: CanvasRenderingContext2D,
  srcCanvas: CanvasImageSource,
  srcW: number,
  srcH: number,
  gridCols: number,
  gridRows: number,
  gridPoints: Float32Array,
): void {
  const stride = gridCols + 1;

  for (let r = 0; r < gridRows; r++) {
    const v0 = (r / gridRows) * srcH;
    const v1 = ((r + 1) / gridRows) * srcH;

    for (let c = 0; c < gridCols; c++) {
      const u0 = (c / gridCols) * srcW;
      const u1 = ((c + 1) / gridCols) * srcW;

      const idx00 = (r * stride + c) * 2;
      const idx10 = (r * stride + c + 1) * 2;
      const idx01 = ((r + 1) * stride + c) * 2;
      const idx11 = ((r + 1) * stride + c + 1) * 2;

      const x00 = gridPoints[idx00];
      const y00 = gridPoints[idx00 + 1];
      const x10 = gridPoints[idx10];
      const y10 = gridPoints[idx10 + 1];
      const x01 = gridPoints[idx01];
      const y01 = gridPoints[idx01 + 1];
      const x11 = gridPoints[idx11];
      const y11 = gridPoints[idx11 + 1];

      // Upper triangle
      drawWarpedTriangle(ctx, srcCanvas, u0, v0, u1, v0, u0, v1, x00, y00, x10, y10, x01, y01);
      // Lower triangle
      drawWarpedTriangle(ctx, srcCanvas, u1, v0, u1, v1, u0, v1, x10, y10, x11, y11, x01, y01);
    }
  }
}

export class TransformManager {
  private active = false;
  private engine: BrushEngine | null = null;
  private snapshotBeforeTransform: ImageData | null = null;
  private targetLayerId = '';
  private transformMode: TransformMode = 'affine';

  // Mesh deformation (Lattice / Mesh Warp) state
  private meshCols = 4;
  private meshRows = 4;
  private meshPoints: Float32Array = new Float32Array(0);
  private dragStartMeshPoints: Float32Array = new Float32Array(0);
  private activeMeshNodeIndex = -1;
  private meshPreviewCanvas: HTMLCanvasElement;
  private meshPreviewCtx: CanvasRenderingContext2D;
  private meshPreviewOffset = { x: 0, y: 0 };

  // Floating buffer holding the pixels being transformed
  private transformCanvas: HTMLCanvasElement;
  private transformCtx: CanvasRenderingContext2D;

  // Floating buffer holding the selection mask being transformed
  private transformMaskCanvas: HTMLCanvasElement;
  private transformMaskCtx: CanvasRenderingContext2D;
  private hadSelection = false;

  // Origin bounding box in doc coordinates
  private origWidth = 0;
  private origHeight = 0;

  // Current transform parameters
  private currentX = 0;
  private currentY = 0;
  private currentWidth = 0;
  private currentHeight = 0;
  private rotation = 0; // radians
  private flipH = false;
  private flipV = false;

  // Interaction dragging state
  private dragHandle: HandleKind | null = null;
  private dragStartDocX = 0;
  private dragStartDocY = 0;
  private dragStartParams = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    rot: 0,
  };

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.transformCanvas = document.createElement('canvas');
    this.transformCtx = this.transformCanvas.getContext('2d')!;

    this.transformMaskCanvas = document.createElement('canvas');
    this.transformMaskCtx = this.transformMaskCanvas.getContext('2d')!;

    this.meshPreviewCanvas = document.createElement('canvas');
    this.meshPreviewCtx = this.meshPreviewCanvas.getContext('2d', { willReadFrequently: true })!;
  }

  public isTransforming(): boolean {
    return this.active;
  }

  public getMode(): TransformMode {
    return this.transformMode;
  }

  public setMode(mode: TransformMode): void {
    if (this.transformMode === mode) return;
    this.transformMode = mode;
    if (mode === 'mesh') {
      this.initMeshPoints();
    }
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  public getMeshCols(): number {
    return this.meshCols;
  }

  public getMeshRows(): number {
    return this.meshRows;
  }

  public setMeshGrid(cols: number, rows: number): void {
    this.meshCols = Math.max(2, Math.min(16, Math.round(cols)));
    this.meshRows = Math.max(2, Math.min(16, Math.round(rows)));
    if (this.transformMode === 'mesh') {
      this.initMeshPoints();
    }
    this.notify();
  }

  public resetMesh(): void {
    if (this.transformMode !== 'mesh') return;
    this.initMeshPoints();
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  public initMeshPoints(): void {
    const cols = this.meshCols;
    const rows = this.meshRows;
    const count = (cols + 1) * (rows + 1);
    this.meshPoints = new Float32Array(count * 2);

    const cx = this.currentX + this.currentWidth / 2;
    const cy = this.currentY + this.currentHeight / 2;
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);
    const hw = this.currentWidth / 2;
    const hh = this.currentHeight / 2;

    let idx = 0;
    for (let r = 0; r <= rows; r++) {
      const v = r / rows;
      const localY = -hh + v * this.currentHeight;
      for (let c = 0; c <= cols; c++) {
        const u = c / cols;
        const localX = -hw + u * this.currentWidth;

        const rx = localX * cos - localY * sin;
        const ry = localX * sin + localY * cos;

        this.meshPoints[idx++] = cx + rx;
        this.meshPoints[idx++] = cy + ry;
      }
    }
    this.activeMeshNodeIndex = -1;
    this.updateMeshPreview();
  }

  public updateMeshPreview(): void {
    if (this.transformMode !== 'mesh' || this.meshPoints.length === 0) return;
    const totalPts = (this.meshCols + 1) * (this.meshRows + 1);

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < totalPts; i++) {
      const px = this.meshPoints[i * 2];
      const py = this.meshPoints[i * 2 + 1];
      if (px < minX) minX = px;
      if (px > maxX) maxX = px;
      if (py < minY) minY = py;
      if (py > maxY) maxY = py;
    }

    const pad = 4;
    const bbMinX = Math.floor(minX) - pad;
    const bbMinY = Math.floor(minY) - pad;
    const bbMaxX = Math.ceil(maxX) + pad;
    const bbMaxY = Math.ceil(maxY) + pad;
    const dstW = Math.max(4, bbMaxX - bbMinX);
    const dstH = Math.max(4, bbMaxY - bbMinY);

    this.meshPreviewOffset.x = bbMinX;
    this.meshPreviewOffset.y = bbMinY;

    this.meshPreviewCanvas.width = dstW;
    this.meshPreviewCanvas.height = dstH;
    this.meshPreviewCtx.clearRect(0, 0, dstW, dstH);

    const localPoints = new Float32Array(totalPts * 2);
    for (let i = 0; i < totalPts; i++) {
      localPoints[i * 2] = this.meshPoints[i * 2] - bbMinX;
      localPoints[i * 2 + 1] = this.meshPoints[i * 2 + 1] - bbMinY;
    }

    let usedWasm = false;
    if (rustStrokeEngine.available && this.origWidth > 0 && this.origHeight > 0) {
      const srcImg = this.transformCtx.getImageData(0, 0, this.origWidth, this.origHeight);
      const resampled = rustStrokeEngine.meshWarpResample(
        srcImg.data,
        this.origWidth,
        this.origHeight,
        dstW,
        dstH,
        this.meshCols,
        this.meshRows,
        localPoints,
        'bicubic',
      );
      if (resampled) {
        const clamped = new Uint8ClampedArray(
          resampled.buffer as ArrayBuffer,
          resampled.byteOffset,
          resampled.byteLength,
        );
        this.meshPreviewCtx.putImageData(new ImageData(clamped, dstW, dstH), 0, 0);
        usedWasm = true;
      }
    }

    if (!usedWasm) {
      renderMeshWarpTriangles(
        this.meshPreviewCtx,
        this.transformCanvas,
        this.origWidth,
        this.origHeight,
        this.meshCols,
        this.meshRows,
        localPoints,
      );
    }

    if (this.engine) this.engine.compositeDirty = true;
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(): void {
    for (const fn of this.listeners) fn();
  }

  /**
   * Activates Free Transform on active layer / selection (Ctrl+T)
   */
  public startTransform(engine: BrushEngine, mode: TransformMode = 'affine'): boolean {
    if (this.active) return false;
    const activeLayer = engine.layerManager.getActiveDrawableLayer();
    if (!activeLayer || !activeLayer.context || activeLayer.locked || activeLayer.isPaper) {
      return false;
    }

    this.engine = engine;
    this.targetLayerId = activeLayer.id;
    const docW = engine.docW;
    const docH = engine.docH;
    const curW = activeLayer.canvas?.width || docW;
    const curH = activeLayer.canvas?.height || docH;
    const ox = activeLayer.offsetX ?? 0;
    const oy = activeLayer.offsetY ?? 0;

    // Save full pre-transform layer snapshot for undo or cancel
    this.snapshotBeforeTransform = activeLayer.context.getImageData(0, 0, curW, curH);

    let bx = 0;
    let by = 0;
    let bw = docW;
    let bh = docH;

    if (selectionModel.hasSelection()) {
      const bounds = selectionModel.getBounds();
      if (!bounds || bounds.width <= 0 || bounds.height <= 0) return false;
      bx = bounds.minX;
      by = bounds.minY;
      bw = bounds.width;
      bh = bounds.height;
    } else {
      // Find non-empty bounding box of active layer
      const data = this.snapshotBeforeTransform.data;
      const rustBounds = rustStrokeEngine.scanLayerBounds(data, curW, curH, 1, 0);
      let minX = curW;
      let minY = curH;
      let maxX = -1;
      let maxY = -1;
      let found = false;

      if (rustBounds) {
        [minX, minY, bw, bh] = rustBounds;
        found = bw > 0 && bh > 0;
        bx = minX + ox;
        by = minY + oy;
      } else {
        for (let y = 0; y < curH; y++) {
          const row = y * curW * 4;
          for (let x = 0; x < curW; x++) {
            if (data[row + x * 4 + 3] > 0) {
              found = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (found) {
          bx = minX + ox;
          by = minY + oy;
          bw = maxX - minX + 1;
          bh = maxY - minY + 1;
        }
      }

      if (!found) {
        // Nothing to transform
        return false;
      }
    }

    // Prepare transform buffer
    this.origWidth = bw;
    this.origHeight = bh;

    this.currentX = bx;
    this.currentY = by;
    this.currentWidth = bw;
    this.currentHeight = bh;
    this.rotation = 0;
    this.flipH = false;
    this.flipV = false;

    this.transformCanvas.width = Math.max(1, bw);
    this.transformCanvas.height = Math.max(1, bh);
    this.transformCtx.clearRect(0, 0, bw, bh);

    // Copy selected pixels into transformCanvas
    this.transformCtx.drawImage(
      activeLayer.canvas!,
      bx,
      by,
      bw,
      bh,
      0,
      0,
      bw,
      bh,
    );

    this.hadSelection = selectionModel.hasSelection();
    if (this.hadSelection) {
      this.transformMaskCanvas.width = Math.max(1, bw);
      this.transformMaskCanvas.height = Math.max(1, bh);
      this.transformMaskCtx.clearRect(0, 0, bw, bh);
      this.transformMaskCtx.drawImage(selectionModel.maskCanvas, bx, by, bw, bh, 0, 0, bw, bh);

      // Mask transformCanvas with selection mask
      this.transformCtx.save();
      this.transformCtx.globalCompositeOperation = 'destination-in';
      this.transformCtx.drawImage(selectionModel.maskCanvas, -bx, -by);
      this.transformCtx.restore();

      // Erase original pixels from active layer
      activeLayer.context.save();
      activeLayer.context.globalCompositeOperation = 'destination-out';
      activeLayer.context.drawImage(selectionModel.maskCanvas, 0, 0);
      activeLayer.context.restore();
    } else {
      // Erase content from active layer inside bounds
      activeLayer.context.clearRect(bx, by, bw, bh);
    }

    this.transformMode = mode;
    this.activeMeshNodeIndex = -1;
    if (mode === 'mesh') {
      this.initMeshPoints();
    }

    this.active = true;
    setTransformModalLocked(true);
    engine.compositeDirty = true;
    this.notify();
    return true;
  }

  public startMeshTransform(engine: BrushEngine): boolean {
    return this.startTransform(engine, 'mesh');
  }

  /**
   * Commits the transform into the layer (Enter)
   */
  /**
   * Activates Free Transform on a newly pasted image, wrapping it in the transform gizmo
   * without destructive canvas clipping so it can be moved, scaled, and rotated immediately.
   */
  public startTransformWithPastedImage(
    engine: BrushEngine,
    img: CanvasImageSource,
    width: number,
    height: number,
    layerName = 'Capa pegada'
  ): boolean {
    if (this.active) {
      this.commitTransform();
    }

    // 1. Create a root raster layer (parentId: null) above active layer so it's never hidden in animation folder
    const newLayer = engine.layerManager.createLayer(layerName, null);
    if (!newLayer.context) return false;

    // 2. Center coordinates
    const docW = engine.docW;
    const docH = engine.docH;

    let initX = Math.round((docW - width) / 2);
    let initY = Math.round((docH - height) / 2);

    if (selectionModel.hasSelection()) {
      const bounds = selectionModel.getBounds();
      if (bounds && bounds.width > 0 && bounds.height > 0) {
        initX = Math.round(bounds.minX + (bounds.width - width) / 2);
        initY = Math.round(bounds.minY + (bounds.height - height) / 2);
      }
    }

    this.engine = engine;
    this.targetLayerId = newLayer.id;
    this.active = true;
    this.hadSelection = false;

    // 3. Store full unclipped image in transformCanvas (never clipped!)
    this.transformCanvas.width = width;
    this.transformCanvas.height = height;
    this.transformCtx.clearRect(0, 0, width, height);
    this.transformCtx.drawImage(img, 0, 0, width, height);

    this.origWidth = width;
    this.origHeight = height;
    this.currentX = initX;
    this.currentY = initY;
    this.currentWidth = width;
    this.currentHeight = height;
    this.rotation = 0;
    this.flipH = false;
    this.flipV = false;
    this.dragHandle = null;

    // Blank snapshot before transform
    this.snapshotBeforeTransform = newLayer.context.getImageData(0, 0, docW, docH);

    engine.layerManager.setActiveLayer(newLayer.id);
    engine.compositeDirty = true;
    engine.updateComposite();
    setTransformModalLocked(true);
    this.notify();

    return true;
  }

  public commitTransform(): void {
    if (!this.active || !this.engine) return;
    const activeLayer = this.engine.layerManager.layers.find((l) => l.id === this.targetLayerId);

    if (this.transformMode === 'mesh' && activeLayer && activeLayer.context && this.snapshotBeforeTransform) {
      const docW = this.engine.docW;
      const docH = this.engine.docH;
      this.engine.pushUndoRecord(this.targetLayerId, { x: 0, y: 0, w: docW, h: docH }, this.snapshotBeforeTransform);

      const minX = this.meshPreviewOffset.x;
      const minY = this.meshPreviewOffset.y;
      const maxX = minX + this.meshPreviewCanvas.width;
      const maxY = minY + this.meshPreviewCanvas.height;

      if (minX < 0 || minY < 0 || maxX > docW || maxY > docH) {
        const newW = maxX - minX;
        const newH = maxY - minY;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newW;
        newCanvas.height = newH;
        const newCtx = newCanvas.getContext('2d', { willReadFrequently: true })!;

        const oldOx = activeLayer.offsetX ?? 0;
        const oldOy = activeLayer.offsetY ?? 0;
        if (activeLayer.canvas) {
          newCtx.drawImage(activeLayer.canvas, oldOx - minX, oldOy - minY);
        }
        newCtx.drawImage(this.meshPreviewCanvas, 0, 0);

        activeLayer.canvas = newCanvas;
        activeLayer.context = newCtx;
        activeLayer.offsetX = minX;
        activeLayer.offsetY = minY;
      } else {
        const ox = activeLayer.offsetX ?? 0;
        const oy = activeLayer.offsetY ?? 0;
        activeLayer.context.drawImage(this.meshPreviewCanvas, minX - ox, minY - oy);
      }

      if (this.hadSelection) {
        const dstW = this.meshPreviewCanvas.width;
        const dstH = this.meshPreviewCanvas.height;
        const totalPts = (this.meshCols + 1) * (this.meshRows + 1);
        const localPoints = new Float32Array(totalPts * 2);
        for (let i = 0; i < totalPts; i++) {
          localPoints[i * 2] = this.meshPoints[i * 2] - minX;
          localPoints[i * 2 + 1] = this.meshPoints[i * 2 + 1] - minY;
        }

        selectionModel.maskCtx.clearRect(0, 0, docW, docH);
        const tempMaskCanvas = document.createElement('canvas');
        tempMaskCanvas.width = dstW;
        tempMaskCanvas.height = dstH;
        const tCtx = tempMaskCanvas.getContext('2d')!;

        let resMask: Uint8ClampedArray | null = null;
        if (rustStrokeEngine.available && this.origWidth > 0 && this.origHeight > 0) {
          const maskImg = this.transformMaskCtx.getImageData(0, 0, this.origWidth, this.origHeight);
          resMask = rustStrokeEngine.meshWarpResample(
            maskImg.data,
            this.origWidth,
            this.origHeight,
            dstW,
            dstH,
            this.meshCols,
            this.meshRows,
            localPoints,
            'bilinear',
          );
        }

        if (resMask) {
          const clamped = new Uint8ClampedArray(
            resMask.buffer as ArrayBuffer,
            resMask.byteOffset,
            resMask.byteLength,
          );
          tCtx.putImageData(new ImageData(clamped, dstW, dstH), 0, 0);
        } else {
          renderMeshWarpTriangles(
            tCtx,
            this.transformMaskCanvas,
            this.origWidth,
            this.origHeight,
            this.meshCols,
            this.meshRows,
            localPoints,
          );
        }

        selectionModel.maskCtx.drawImage(tempMaskCanvas, minX, minY);
        selectionModel.updateBounds();
      }

      this.active = false;
      this.hadSelection = false;
      this.snapshotBeforeTransform = null;
      this.dragHandle = null;
      this.activeMeshNodeIndex = -1;
      this.meshPoints = new Float32Array(0);
      if (this.engine) this.engine.compositeDirty = true;
      setTransformModalLocked(false);
      this.notify();
      return;
    }

    if (activeLayer && activeLayer.context && this.snapshotBeforeTransform) {
      // Register the pre-transform pixels in the undo history before rasterizing
      const docW = this.engine.docW;
      const docH = this.engine.docH;
      this.engine.pushUndoRecord(this.targetLayerId, { x: 0, y: 0, w: docW, h: docH }, this.snapshotBeforeTransform);
      const cx = this.currentX + this.currentWidth / 2;
      const cy = this.currentY + this.currentHeight / 2;
      const sx = (this.flipH ? -1 : 1) * (this.currentWidth / Math.max(1, this.origWidth));
      const sy = (this.flipV ? -1 : 1) * (this.currentHeight / Math.max(1, this.origHeight));

      const hw = this.currentWidth / 2;
      const hh = this.currentHeight / 2;
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      const corners = [
        { x: -hw, y: -hh },
        { x: hw, y: -hh },
        { x: hw, y: hh },
        { x: -hw, y: hh },
      ];
      let minX = 0;
      let minY = 0;
      let maxX = docW;
      let maxY = docH;
      for (const pt of corners) {
        const rx = cx + (pt.x * cos - pt.y * sin);
        const ry = cy + (pt.x * sin + pt.y * cos);
        if (rx < minX) minX = Math.floor(rx);
        if (rx > maxX) maxX = Math.ceil(rx);
        if (ry < minY) minY = Math.floor(ry);
        if (ry > maxY) maxY = Math.ceil(ry);
      }

      if (minX < 0 || minY < 0 || maxX > docW || maxY > docH) {
        // Expand activeLayer canvas so off-canvas pixels are preserved without clipping
        const newW = maxX - minX;
        const newH = maxY - minY;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newW;
        newCanvas.height = newH;
        const newCtx = newCanvas.getContext('2d', { willReadFrequently: true })!;

        const oldOx = activeLayer.offsetX ?? 0;
        const oldOy = activeLayer.offsetY ?? 0;
        if (activeLayer.canvas) {
          newCtx.drawImage(activeLayer.canvas, oldOx - minX, oldOy - minY);
        }

        this.rasterizeTransformedPatch(newCtx, cx - minX, cy - minY, sx, sy, this.rotation);

        activeLayer.canvas = newCanvas;
        activeLayer.context = newCtx;
        activeLayer.offsetX = minX;
        activeLayer.offsetY = minY;
      } else {
        const ox = activeLayer.offsetX ?? 0;
        const oy = activeLayer.offsetY ?? 0;
        this.rasterizeTransformedPatch(activeLayer.context, cx - ox, cy - oy, sx, sy, this.rotation);
      }

      // If a selection was active, transform the selection mask along with the pixels
      if (this.hadSelection) {
        selectionModel.maskCtx.clearRect(0, 0, docW, docH);
        selectionModel.maskCtx.save();
        selectionModel.maskCtx.translate(cx, cy);
        if (this.rotation !== 0) selectionModel.maskCtx.rotate(this.rotation);
        selectionModel.maskCtx.scale(sx, sy);
        selectionModel.maskCtx.drawImage(
          this.transformMaskCanvas,
          -this.origWidth / 2,
          -this.origHeight / 2,
        );
        selectionModel.maskCtx.restore();
        selectionModel.updateBounds();
      }
    }

    this.active = false;
    this.hadSelection = false;
    this.snapshotBeforeTransform = null;
    this.dragHandle = null;
    if (this.engine) this.engine.compositeDirty = true;
    setTransformModalLocked(false);
    this.notify();
  }

  private rasterizeTransformedPatch(
    targetCtx: CanvasRenderingContext2D,
    destCenterX: number,
    destCenterY: number,
    scaleX: number,
    scaleY: number,
    rotationRad: number,
  ): void {
    const srcW = this.origWidth;
    const srcH = this.origHeight;
    const absW = Math.max(1, Math.round(srcW * Math.abs(scaleX)));
    const absH = Math.max(1, Math.round(srcH * Math.abs(scaleY)));

    // When scaling without rotation, use high quality bicubic resampling via WASM
    if (
      rotationRad === 0 &&
      rustStrokeEngine.available &&
      srcW > 0 &&
      srcH > 0 &&
      (absW !== srcW || absH !== srcH)
    ) {
      const srcImg = this.transformCtx.getImageData(0, 0, srcW, srcH);
      const resampled = rustStrokeEngine.resampleScale(srcImg.data, srcW, srcH, absW, absH, 'bicubic');
      if (resampled) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = absW;
        tempCanvas.height = absH;
        const tCtx = tempCanvas.getContext('2d')!;
        const clamped = new Uint8ClampedArray(
          resampled.buffer as ArrayBuffer,
          resampled.byteOffset,
          resampled.byteLength,
        );
        tCtx.putImageData(new ImageData(clamped, absW, absH), 0, 0);

        targetCtx.save();
        targetCtx.translate(destCenterX, destCenterY);
        targetCtx.scale(scaleX < 0 ? -1 : 1, scaleY < 0 ? -1 : 1);
        targetCtx.drawImage(tempCanvas, -absW / 2, -absH / 2);
        targetCtx.restore();
        return;
      }
    }

    // High quality bicubic affine resampling via WASM when rotated
    if (rotationRad !== 0 && rustStrokeEngine.available && srcW > 0 && srcH > 0) {
      const srcImg = this.transformCtx.getImageData(0, 0, srcW, srcH);
      const cos = Math.cos(rotationRad);
      const sin = Math.sin(rotationRad);
      const hw = (srcW * Math.abs(scaleX)) / 2;
      const hh = (srcH * Math.abs(scaleY)) / 2;
      const x1 = -hw * cos - -hh * sin;
      const y1 = -hw * sin + -hh * cos;
      const x2 = hw * cos - -hh * sin;
      const y2 = hw * sin + -hh * cos;
      const spanX = Math.max(Math.abs(x1), Math.abs(x2)) * 2;
      const spanY = Math.max(Math.abs(y1), Math.abs(y2)) * 2;
      const dstW = Math.max(2, Math.ceil(spanX));
      const dstH = Math.max(2, Math.ceil(spanY));

      const invMat = rustStrokeEngine.computeInverseTransformMatrix(
        srcW / 2,
        srcH / 2,
        dstW / 2,
        dstH / 2,
        scaleX,
        scaleY,
        rotationRad,
      );
      if (invMat) {
        const affResampled = rustStrokeEngine.resampleAffine(srcImg.data, srcW, srcH, dstW, dstH, invMat, 'bicubic');
        if (affResampled) {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = dstW;
          tempCanvas.height = dstH;
          const clamped = new Uint8ClampedArray(
            affResampled.buffer as ArrayBuffer,
            affResampled.byteOffset,
            affResampled.byteLength,
          );
          tempCanvas.getContext('2d')!.putImageData(new ImageData(clamped, dstW, dstH), 0, 0);
          targetCtx.drawImage(tempCanvas, destCenterX - dstW / 2, destCenterY - dstH / 2);
          return;
        }
      }
    }

    // Default Canvas2D affine draw
    targetCtx.save();
    targetCtx.translate(destCenterX, destCenterY);
    if (rotationRad !== 0) targetCtx.rotate(rotationRad);
    targetCtx.scale(scaleX, scaleY);
    targetCtx.drawImage(this.transformCanvas, -srcW / 2, -srcH / 2);
    targetCtx.restore();
  }

  /**
   * Cancels the transform and restores layer (Escape)
   */
  public cancelTransform(): void {
    if (!this.active || !this.engine) return;
    const activeLayer = this.engine.layerManager.layers.find((l) => l.id === this.targetLayerId);
    if (activeLayer && activeLayer.context && this.snapshotBeforeTransform) {
      activeLayer.context.putImageData(this.snapshotBeforeTransform, 0, 0);
    }

    this.active = false;
    this.snapshotBeforeTransform = null;
    this.dragHandle = null;
    this.activeMeshNodeIndex = -1;
    this.meshPoints = new Float32Array(0);
    if (this.engine) this.engine.compositeDirty = true;
    setTransformModalLocked(false);
    this.notify();
  }

  /**
   * Axis-aligned bounds of the (possibly rotated) gizmo in doc coordinates.
   * Used to anchor the floating transform launcher at Y_max.
   */
  public getGizmoBoundsDoc(): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } {
    if (this.transformMode === 'mesh' && this.meshPoints.length > 0) {
      return {
        minX: this.meshPreviewOffset.x,
        minY: this.meshPreviewOffset.y,
        maxX: this.meshPreviewOffset.x + this.meshPreviewCanvas.width,
        maxY: this.meshPreviewOffset.y + this.meshPreviewCanvas.height,
      };
    }

    const cx = this.currentX + this.currentWidth / 2;
    const cy = this.currentY + this.currentHeight / 2;
    const hw = this.currentWidth / 2;
    const hh = this.currentHeight / 2;
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);

    const corners = [
      { x: cx + (-hw * cos - -hh * sin), y: cy + (-hw * sin + -hh * cos) },
      { x: cx + (hw * cos - -hh * sin), y: cy + (hw * sin + -hh * cos) },
      { x: cx + (hw * cos - hh * sin), y: cy + (hw * sin + hh * cos) },
      { x: cx + (-hw * cos - hh * sin), y: cy + (-hw * sin + hh * cos) },
    ];

    let minX = corners[0].x;
    let minY = corners[0].y;
    let maxX = corners[0].x;
    let maxY = corners[0].y;
    for (let i = 1; i < 4; i++) {
      if (corners[i].x < minX) minX = corners[i].x;
      if (corners[i].x > maxX) maxX = corners[i].x;
      if (corners[i].y < minY) minY = corners[i].y;
      if (corners[i].y > maxY) maxY = corners[i].y;
    }
    return { minX, minY, maxX, maxY };
  }

  public flipHorizontal(): void {
    if (!this.active) return;
    if (this.transformMode === 'mesh' && this.meshPoints.length > 0) {
      const stride = this.meshCols + 1;
      const bb = this.getGizmoBoundsDoc();
      const cx = (bb.minX + bb.maxX) / 2;
      for (let r = 0; r <= this.meshRows; r++) {
        for (let c = 0; c <= this.meshCols; c++) {
          const idx = (r * stride + c) * 2;
          this.meshPoints[idx] = cx - (this.meshPoints[idx] - cx);
        }
      }
      this.updateMeshPreview();
    } else {
      this.flipH = !this.flipH;
    }
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  public flipVertical(): void {
    if (!this.active) return;
    if (this.transformMode === 'mesh' && this.meshPoints.length > 0) {
      const stride = this.meshCols + 1;
      const bb = this.getGizmoBoundsDoc();
      const cy = (bb.minY + bb.maxY) / 2;
      for (let r = 0; r <= this.meshRows; r++) {
        for (let c = 0; c <= this.meshCols; c++) {
          const idx = (r * stride + c) * 2 + 1;
          this.meshPoints[idx] = cy - (this.meshPoints[idx] - cy);
        }
      }
      this.updateMeshPreview();
    } else {
      this.flipV = !this.flipV;
    }
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  public rotate90(clockwise = true): void {
    if (!this.active) return;
    if (this.transformMode === 'mesh' && this.meshPoints.length > 0) {
      const bb = this.getGizmoBoundsDoc();
      const cx = (bb.minX + bb.maxX) / 2;
      const cy = (bb.minY + bb.maxY) / 2;
      const angle = clockwise ? Math.PI / 2 : -Math.PI / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const total = (this.meshCols + 1) * (this.meshRows + 1);
      for (let i = 0; i < total; i++) {
        const px = this.meshPoints[i * 2] - cx;
        const py = this.meshPoints[i * 2 + 1] - cy;
        this.meshPoints[i * 2] = cx + (px * cos - py * sin);
        this.meshPoints[i * 2 + 1] = cy + (px * sin + py * cos);
      }
      this.updateMeshPreview();
    } else {
      this.rotation += clockwise ? Math.PI / 2 : -Math.PI / 2;
    }
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  /**
   * Render the transformed floating buffer and interactive gizmo handles.
   */
  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;

    if (this.transformMode === 'mesh') {
      // 1. Draw warped preview canvas
      ctx.drawImage(this.meshPreviewCanvas, this.meshPreviewOffset.x, this.meshPreviewOffset.y);

      // 2. Draw mesh lattice lines
      const stride = this.meshCols + 1;
      ctx.save();
      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 1.2;

      // Rows
      for (let r = 0; r <= this.meshRows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= this.meshCols; c++) {
          const idx = (r * stride + c) * 2;
          const px = this.meshPoints[idx];
          const py = this.meshPoints[idx + 1];
          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Columns
      for (let c = 0; c <= this.meshCols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= this.meshRows; r++) {
          const idx = (r * stride + c) * 2;
          const px = this.meshPoints[idx];
          const py = this.meshPoints[idx + 1];
          if (r === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // 3. Draw nodes
      for (let r = 0; r <= this.meshRows; r++) {
        for (let c = 0; c <= this.meshCols; c++) {
          const i = r * stride + c;
          const px = this.meshPoints[i * 2];
          const py = this.meshPoints[i * 2 + 1];
          const isSelected = this.activeMeshNodeIndex === i;
          const isCorner = (r === 0 || r === this.meshRows) && (c === 0 || c === this.meshCols);

          ctx.beginPath();
          ctx.arc(px, py, isSelected ? 6.5 : isCorner ? 5 : 4, 0, Math.PI * 2);

          if (isSelected) {
            ctx.fillStyle = '#ffaa00';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
          } else {
            ctx.fillStyle = isCorner ? '#ffffff' : '#e0f2fe';
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#0284c7';
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      return;
    }

    ctx.save();

    const cx = this.currentX + this.currentWidth / 2;
    const cy = this.currentY + this.currentHeight / 2;

    // 1. Draw transformed content
    ctx.save();
    ctx.translate(cx, cy);
    if (this.rotation !== 0) ctx.rotate(this.rotation);
    const sx = (this.flipH ? -1 : 1) * (this.currentWidth / Math.max(1, this.origWidth));
    const sy = (this.flipV ? -1 : 1) * (this.currentHeight / Math.max(1, this.origHeight));
    ctx.scale(sx, sy);
    ctx.drawImage(this.transformCanvas, -this.origWidth / 2, -this.origHeight / 2);
    ctx.restore();

    // 2. Draw Gizmo bounding box & handles
    ctx.save();
    ctx.translate(cx, cy);
    if (this.rotation !== 0) ctx.rotate(this.rotation);

    const hw = this.currentWidth / 2;
    const hh = this.currentHeight / 2;

    // Bounding Box
    ctx.strokeStyle = '#0088ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-hw, -hh, this.currentWidth, this.currentHeight);

    // Rotation stem & top handle
    const stemLength = 26;
    ctx.beginPath();
    ctx.moveTo(0, -hh);
    ctx.lineTo(0, -hh - stemLength);
    ctx.strokeStyle = '#0088ff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Rotation Handle (Circle)
    ctx.beginPath();
    ctx.arc(0, -hh - stemLength, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#0088ff';
    ctx.stroke();

    // 8 Scale Handles (Squares)
    const handlePositions = [
      { x: -hw, y: -hh }, // nw
      { x: 0, y: -hh }, // n
      { x: hw, y: -hh }, // ne
      { x: hw, y: 0 }, // e
      { x: hw, y: hh }, // se
      { x: 0, y: hh }, // s
      { x: -hw, y: hh }, // sw
      { x: -hw, y: 0 }, // w
    ];

    const hSize = 8;
    for (const h of handlePositions) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(h.x - hSize / 2, h.y - hSize / 2, hSize, hSize);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#0088ff';
      ctx.strokeRect(h.x - hSize / 2, h.y - hSize / 2, hSize, hSize);
    }

    // Pivot center dot
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#0088ff';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  }

  /**
   * Hit tests handles in doc coordinates.
   */
  public hitTest(docX: number, docY: number): HandleKind | null {
    if (!this.active) return null;

    if (this.transformMode === 'mesh' && this.meshPoints.length > 0) {
      const totalPts = (this.meshCols + 1) * (this.meshRows + 1);
      const hitRadius = 12;
      for (let i = 0; i < totalPts; i++) {
        const px = this.meshPoints[i * 2];
        const py = this.meshPoints[i * 2 + 1];
        if (Math.hypot(docX - px, docY - py) <= hitRadius) {
          return `mesh_node_${i}`;
        }
      }

      const bb = this.getGizmoBoundsDoc();
      if (docX >= bb.minX && docX <= bb.maxX && docY >= bb.minY && docY <= bb.maxY) {
        return 'move';
      }
      return null;
    }

    const cx = this.currentX + this.currentWidth / 2;
    const cy = this.currentY + this.currentHeight / 2;

    // Un-rotate doc point into gizmo local space
    const cos = Math.cos(-this.rotation);
    const sin = Math.sin(-this.rotation);
    const dx = docX - cx;
    const dy = docY - cy;
    const lx = cos * dx - sin * dy;
    const ly = sin * dx + cos * dy;

    const hw = this.currentWidth / 2;
    const hh = this.currentHeight / 2;
    const stemLength = 26;
    const hitRadius = 10;

    // 1. Rotation handle
    if (Math.hypot(lx, ly - (-hh - stemLength)) <= hitRadius) {
      return 'rotate';
    }

    // 2. Corner & Edge handles
    if (Math.hypot(lx - -hw, ly - -hh) <= hitRadius) return 'nw';
    if (Math.hypot(lx - hw, ly - -hh) <= hitRadius) return 'ne';
    if (Math.hypot(lx - hw, ly - hh) <= hitRadius) return 'se';
    if (Math.hypot(lx - -hw, ly - hh) <= hitRadius) return 'sw';

    if (Math.hypot(lx, ly - -hh) <= hitRadius) return 'n';
    if (Math.hypot(lx - hw, ly) <= hitRadius) return 'e';
    if (Math.hypot(lx, ly - hh) <= hitRadius) return 's';
    if (Math.hypot(lx - -hw, ly) <= hitRadius) return 'w';

    // 3. Move inside bounding box
    if (lx >= -hw && lx <= hw && ly >= -hh && ly <= hh) {
      return 'move';
    }

    // 4. Outside bounding box near perimeter: rotate
    if (Math.hypot(lx, ly) <= Math.hypot(hw, hh) + 40) {
      return 'rotate';
    }

    return null;
  }

  public handlePointerDown(docX: number, docY: number, _event: PointerEvent): boolean {
    if (!this.active) return false;
    const handle = this.hitTest(docX, docY);
    if (!handle) return false;

    if (this.transformMode === 'mesh') {
      if (handle.startsWith('mesh_node_')) {
        this.activeMeshNodeIndex = parseInt(handle.slice(10), 10);
        this.dragHandle = handle;
        this.dragStartDocX = docX;
        this.dragStartDocY = docY;
        this.dragStartMeshPoints = new Float32Array(this.meshPoints);
        return true;
      }
      if (handle === 'move') {
        this.activeMeshNodeIndex = -1;
        this.dragHandle = 'move';
        this.dragStartDocX = docX;
        this.dragStartDocY = docY;
        this.dragStartMeshPoints = new Float32Array(this.meshPoints);
        return true;
      }
      return false;
    }

    this.dragHandle = handle;
    this.dragStartDocX = docX;
    this.dragStartDocY = docY;
    this.dragStartParams = {
      x: this.currentX,
      y: this.currentY,
      w: this.currentWidth,
      h: this.currentHeight,
      rot: this.rotation,
    };
    return true;
  }

  public handlePointerMove(docX: number, docY: number, event: PointerEvent): boolean {
    if (!this.active || !this.dragHandle) return false;

    if (this.transformMode === 'mesh') {
      if (this.dragHandle === 'move') {
        const dx = docX - this.dragStartDocX;
        const dy = docY - this.dragStartDocY;
        const total = (this.meshCols + 1) * (this.meshRows + 1);
        for (let i = 0; i < total; i++) {
          this.meshPoints[i * 2] = this.dragStartMeshPoints[i * 2] + dx;
          this.meshPoints[i * 2 + 1] = this.dragStartMeshPoints[i * 2 + 1] + dy;
        }
        this.updateMeshPreview();
        this.notify();
        return true;
      }

      if (this.dragHandle.startsWith('mesh_node_')) {
        const idx = this.activeMeshNodeIndex;
        if (idx >= 0 && idx < (this.meshCols + 1) * (this.meshRows + 1)) {
          const dx = docX - this.dragStartDocX;
          const dy = docY - this.dragStartDocY;
          this.meshPoints[idx * 2] = this.dragStartMeshPoints[idx * 2] + dx;
          this.meshPoints[idx * 2 + 1] = this.dragStartMeshPoints[idx * 2 + 1] + dy;
          this.updateMeshPreview();
          this.notify();
          return true;
        }
      }
      return false;
    }

    const cx = this.dragStartParams.x + this.dragStartParams.w / 2;
    const cy = this.dragStartParams.y + this.dragStartParams.h / 2;

    if (this.dragHandle === 'move') {
      const dx = docX - this.dragStartDocX;
      const dy = docY - this.dragStartDocY;
      this.currentX = this.dragStartParams.x + dx;
      this.currentY = this.dragStartParams.y + dy;
    } else if (this.dragHandle === 'rotate') {
      const startAngle = Math.atan2(this.dragStartDocY - cy, this.dragStartDocX - cx);
      const currentAngle = Math.atan2(docY - cy, docX - cx);
      let angleDiff = currentAngle - startAngle;

      // Snap to 15 degrees if Shift is held
      let nextRot = this.dragStartParams.rot + angleDiff;
      if (event.shiftKey) {
        const step = Math.PI / 12; // 15 degrees
        nextRot = Math.round(nextRot / step) * step;
      }
      this.rotation = nextRot;
    } else {
      // Scale handles in local coordinates
      const cos = Math.cos(-this.dragStartParams.rot);
      const sin = Math.sin(-this.dragStartParams.rot);

      const startLx = cos * (this.dragStartDocX - cx) - sin * (this.dragStartDocY - cy);
      const startLy = sin * (this.dragStartDocX - cx) + cos * (this.dragStartDocY - cy);

      const curLx = cos * (docX - cx) - sin * (docY - cy);
      const curLy = sin * (docX - cx) + cos * (docY - cy);

      const dLx = curLx - startLx;
      const dLy = curLy - startLy;

      let nw = this.dragStartParams.w;
      let nh = this.dragStartParams.h;

      if (this.dragHandle === 'e') nw += dLx * 2;
      else if (this.dragHandle === 'w') nw -= dLx * 2;
      else if (this.dragHandle === 's') nh += dLy * 2;
      else if (this.dragHandle === 'n') nh -= dLy * 2;
      else if (this.dragHandle === 'se') {
        nw += dLx * 2;
        nh += dLy * 2;
      } else if (this.dragHandle === 'nw') {
        nw -= dLx * 2;
        nh -= dLy * 2;
      } else if (this.dragHandle === 'ne') {
        nw += dLx * 2;
        nh -= dLy * 2;
      } else if (this.dragHandle === 'sw') {
        nw -= dLx * 2;
        nh += dLy * 2;
      }

      // Keep aspect ratio if Shift is held
      if (event.shiftKey && (this.dragHandle === 'se' || this.dragHandle === 'nw' || this.dragHandle === 'ne' || this.dragHandle === 'sw')) {
        const aspect = this.origWidth / Math.max(1, this.origHeight);
        if (Math.abs(nw) > Math.abs(nh) * aspect) {
          nh = nw / aspect;
        } else {
          nw = nh * aspect;
        }
      }

      nw = Math.max(8, nw);
      nh = Math.max(8, nh);

      this.currentWidth = nw;
      this.currentHeight = nh;
      this.currentX = cx - nw / 2;
      this.currentY = cy - nh / 2;
    }

    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
    return true;
  }

  public handlePointerUp(): void {
    if (this.dragHandle) {
      this.dragHandle = null;
    }
    this.activeMeshNodeIndex = -1;
  }
}

export const transformManager = new TransformManager();
