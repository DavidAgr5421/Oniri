import type { BrushEngine } from '../brush/brushEngine';
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

type HandleKind = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w' | 'rotate' | 'move';

export class TransformManager {
  private active = false;
  private engine: BrushEngine | null = null;
  private snapshotBeforeTransform: ImageData | null = null;
  private targetLayerId = '';

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
  }

  public isTransforming(): boolean {
    return this.active;
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
  public startTransform(engine: BrushEngine): boolean {
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
      let minX = curW;
      let minY = curH;
      let maxX = -1;
      let maxY = -1;
      let found = false;

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

      if (!found) {
        // Nothing to transform
        return false;
      }

      bx = minX + ox;
      by = minY + oy;
      bw = maxX - minX + 1;
      bh = maxY - minY + 1;
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

    this.active = true;
    setTransformModalLocked(true);
    engine.compositeDirty = true;
    this.notify();
    return true;
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
    if (activeLayer && activeLayer.context && this.snapshotBeforeTransform) {
      // Register the pre-transform pixels in the undo history before rasterizing
      this.engine.pushUndoRecord(this.targetLayerId, this.snapshotBeforeTransform);

      const docW = this.engine.docW;
      const docH = this.engine.docH;
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

        newCtx.save();
        newCtx.translate(cx - minX, cy - minY);
        if (this.rotation !== 0) newCtx.rotate(this.rotation);
        newCtx.scale(sx, sy);
        newCtx.drawImage(
          this.transformCanvas,
          -this.origWidth / 2,
          -this.origHeight / 2,
        );
        newCtx.restore();

        activeLayer.canvas = newCanvas;
        activeLayer.context = newCtx;
        activeLayer.offsetX = minX;
        activeLayer.offsetY = minY;
      } else {
        const ox = activeLayer.offsetX ?? 0;
        const oy = activeLayer.offsetY ?? 0;
        activeLayer.context.save();
        activeLayer.context.translate(cx - ox, cy - oy);
        if (this.rotation !== 0) activeLayer.context.rotate(this.rotation);
        activeLayer.context.scale(sx, sy);
        activeLayer.context.drawImage(
          this.transformCanvas,
          -this.origWidth / 2,
          -this.origHeight / 2,
        );
        activeLayer.context.restore();
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
    this.flipH = !this.flipH;
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  public flipVertical(): void {
    if (!this.active) return;
    this.flipV = !this.flipV;
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  public rotate90(clockwise = true): void {
    if (!this.active) return;
    this.rotation += clockwise ? Math.PI / 2 : -Math.PI / 2;
    if (this.engine) this.engine.compositeDirty = true;
    this.notify();
  }

  /**
   * Render the transformed floating buffer and interactive gizmo handles.
   */
  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;

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
  }
}

export const transformManager = new TransformManager();
