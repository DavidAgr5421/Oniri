import { DOC_H, DOC_W } from '../brush/docConstants';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';

export type SelectionCombineMode = 'replace' | 'add' | 'subtract';

export interface SelectionBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export class SelectionModel {
  public readonly maskCanvas: HTMLCanvasElement;
  public readonly maskCtx: CanvasRenderingContext2D;

  private _hasSelection = false;
  private _bounds: SelectionBounds | null = null;
  private _combineMode: SelectionCombineMode = 'replace';
  private listeners: Set<() => void> = new Set();

  // Selection-mask move state
  private moveSnapshot: ImageData | null = null;
  private moveBaseBounds: SelectionBounds | null = null;
  private moveOffsetX = 0;
  private moveOffsetY = 0;

  constructor() {
    this.maskCanvas = document.createElement('canvas');
    this.maskCanvas.width = DOC_W;
    this.maskCanvas.height = DOC_H;
    const ctx = this.maskCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Failed to get 2D context for selection mask');
    this.maskCtx = ctx;
    this.maskCtx.imageSmoothingEnabled = false;
  }

  public resize(w: number, h: number): void {
    this.maskCanvas.width = w;
    this.maskCanvas.height = h;
    this.maskCtx.imageSmoothingEnabled = false;
    this.clearSelection();
  }

  public hasSelection(): boolean {
    return this._hasSelection;
  }

  public getBounds(): SelectionBounds | null {
    return this._bounds;
  }

  public getCombineMode(): SelectionCombineMode {
    return this._combineMode;
  }

  public setCombineMode(mode: SelectionCombineMode): void {
    this._combineMode = mode;
    this.notify();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /**
   * Moves only the selection mask ("marching ants") without touching any
   * layer pixels. Used by the selection tool when dragging inside an existing
   * selection, and by the arrow-key nudge.
   */
  public isMovingMask(): boolean {
    return this.moveSnapshot !== null;
  }

  public isPointInsideSelection(x: number, y: number): boolean {
    if (!this._bounds) return false;
    if (x < this._bounds.minX || x > this._bounds.maxX + 1 || y < this._bounds.minY || y > this._bounds.maxY + 1) {
      return false;
    }
    // Pixel-accurate hit test (lasso/ellipse holes must not trap the pointer)
    const pixel = this.maskCtx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    return pixel[3] > 0;
  }

  public beginMoveMask(): boolean {
    if (!this._hasSelection || !this._bounds || this.moveSnapshot) return false;
    this.moveSnapshot = this.maskCtx.getImageData(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    this.moveBaseBounds = { ...this._bounds };
    this.moveOffsetX = 0;
    this.moveOffsetY = 0;
    return true;
  }

  public moveMaskBy(dx: number, dy: number): void {
    if (!this.moveSnapshot || !this.moveBaseBounds) return;
    this.moveOffsetX = Math.round(dx);
    this.moveOffsetY = Math.round(dy);
    this.maskCtx.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    this.maskCtx.putImageData(this.moveSnapshot, this.moveOffsetX, this.moveOffsetY);

    // Bounds are recomputed analytically: a full pixel scan per pointer move
    // on a 1600x900 mask is far too expensive.
    const b = this.moveBaseBounds;
    const minX = b.minX + this.moveOffsetX;
    const minY = b.minY + this.moveOffsetY;
    const maxX = b.maxX + this.moveOffsetX;
    const maxY = b.maxY + this.moveOffsetY;
    const cx0 = Math.max(0, minX);
    const cy0 = Math.max(0, minY);
    const cx1 = Math.min(this.maskCanvas.width - 1, maxX);
    const cy1 = Math.min(this.maskCanvas.height - 1, maxY);

    if (cx1 < cx0 || cy1 < cy0) {
      this._hasSelection = false;
      this._bounds = null;
    } else {
      this._hasSelection = true;
      this._bounds = {
        minX: cx0,
        minY: cy0,
        maxX: cx1,
        maxY: cy1,
        width: cx1 - cx0 + 1,
        height: cy1 - cy0 + 1,
      };
    }
    this.notify();
  }

  public nudgeMask(dx: number, dy: number): void {
    if (!this._hasSelection) return;
    if (!this.moveSnapshot && !this.beginMoveMask()) return;
    this.moveMaskBy(this.moveOffsetX + dx, this.moveOffsetY + dy);
  }

  public endMoveMask(): void {
    this.moveSnapshot = null;
    this.moveBaseBounds = null;
    this.moveOffsetX = 0;
    this.moveOffsetY = 0;
  }

  private notify(): void {
    for (const fn of this.listeners) {
      fn();
    }
  }

  /**
   * Recalculates bounding box and whether any pixel is selected using Rust WASM.
   */
  public updateBounds(): void {
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    const imgData = this.maskCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const rustBounds = rustStrokeEngine.computeSelectionBounds(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
      true,
    );

    if (rustBounds) {
      this._hasSelection = true;
      this._bounds = {
        minX: rustBounds[0],
        minY: rustBounds[1],
        maxX: rustBounds[2],
        maxY: rustBounds[3],
        width: rustBounds[4],
        height: rustBounds[5],
      };
      this.notify();
      return;
    }

    if (rustBounds === null && rustStrokeEngine.available) {
      // Empty selection confirmed by Rust
      this._hasSelection = false;
      this._bounds = null;
      this.notify();
      return;
    }

    // JS Fallback
    let minX = w;
    let minY = h;
    let maxX = -1;
    let maxY = -1;
    let found = false;

    for (let y = 0; y < h; y++) {
      const rowOffset = y * w * 4;
      for (let x = 0; x < w; x++) {
        const a = data[rowOffset + x * 4 + 3];
        if (a > 0) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) {
      this._hasSelection = false;
      this._bounds = null;
    } else {
      this._hasSelection = true;
      this._bounds = {
        minX,
        minY,
        maxX,
        maxY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
      };
    }
    this.notify();
  }

  /**
   * Deselect everything (Ctrl+D)
   */
  public clearSelection(): void {
    this.endMoveMask();
    this.maskCtx.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    this._hasSelection = false;
    this._bounds = null;
    this.notify();
  }

  /**
   * Select the entire document canvas (Ctrl+A)
   */
  public selectAll(): void {
    this.endMoveMask();
    this.maskCtx.fillStyle = '#ffffff';
    this.maskCtx.fillRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    this._hasSelection = true;
    this._bounds = {
      minX: 0,
      minY: 0,
      maxX: this.maskCanvas.width - 1,
      maxY: this.maskCanvas.height - 1,
      width: this.maskCanvas.width,
      height: this.maskCanvas.height,
    };
    this.notify();
  }

  /**
   * Invert the current selection (Ctrl+Shift+I) accelerated by Rust.
   */
  public invertSelection(): void {
    this.endMoveMask();
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    const imgData = this.maskCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const rustInverted = rustStrokeEngine.invertMask(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
    );

    if (rustInverted) {
      const clamped = new Uint8ClampedArray(rustInverted.buffer as ArrayBuffer, rustInverted.byteOffset, rustInverted.byteLength);
      const outImg = new ImageData(clamped, w, h);
      this.maskCtx.putImageData(outImg, 0, 0);
    } else {
      this.maskCtx.save();
      this.maskCtx.globalCompositeOperation = 'difference';
      this.maskCtx.fillStyle = '#ffffff';
      this.maskCtx.fillRect(0, 0, w, h);
      this.maskCtx.restore();
    }
    this.updateBounds();
  }

  /**
   * Expand Selection: morphological dilation by radius in pixels accelerated by Rust.
   */
  public expandSelection(radiusPx: number): void {
    if (!this._hasSelection || radiusPx <= 0) return;
    this.endMoveMask();
    const r = Math.min(64, Math.max(1, Math.round(radiusPx)));
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    const imgData = this.maskCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const rustExpanded = rustStrokeEngine.morphologyExpand(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
      r,
      true,
    );

    if (rustExpanded) {
      const clamped = new Uint8ClampedArray(rustExpanded.buffer as ArrayBuffer, rustExpanded.byteOffset, rustExpanded.byteLength);
      const outImg = new ImageData(clamped, w, h);
      this.maskCtx.putImageData(outImg, 0, 0);
    } else {
      const tmp = document.createElement('canvas');
      tmp.width = w;
      tmp.height = h;
      const tctx = tmp.getContext('2d')!;
      tctx.drawImage(this.maskCanvas, 0, 0);

      this.maskCtx.save();
      this.maskCtx.globalCompositeOperation = 'source-over';
      const step = r > 8 ? 2 : 1;
      for (let dy = -r; dy <= r; dy += step) {
        for (let dx = -r; dx <= r; dx += step) {
          if (dx * dx + dy * dy <= r * r) {
            this.maskCtx.drawImage(tmp, dx, dy);
          }
        }
      }
      this.maskCtx.restore();
    }
    this.updateBounds();
  }

  /**
   * Contract / Reduce Selection: morphological erosion by radius in pixels accelerated by Rust.
   */
  public contractSelection(radiusPx: number): void {
    if (!this._hasSelection || radiusPx <= 0) return;
    this.endMoveMask();
    const r = Math.min(64, Math.max(1, Math.round(radiusPx)));
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    const imgData = this.maskCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const rustContracted = rustStrokeEngine.morphologyContract(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
      r,
      true,
    );

    if (rustContracted) {
      const clamped = new Uint8ClampedArray(rustContracted.buffer as ArrayBuffer, rustContracted.byteOffset, rustContracted.byteLength);
      const outImg = new ImageData(clamped, w, h);
      this.maskCtx.putImageData(outImg, 0, 0);
    } else {
      this.invertSelection();
      this.expandSelection(radiusPx);
      this.invertSelection();
      return;
    }
    this.updateBounds();
  }

  /**
   * Feather Selection: Soft Gaussian blur on selection boundary accelerated by Rust.
   */
  public featherSelection(radiusPx: number): void {
    if (!this._hasSelection || radiusPx <= 0) return;
    this.endMoveMask();
    const r = Math.min(64, Math.max(0.5, radiusPx));
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    const imgData = this.maskCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const rustFeathered = rustStrokeEngine.featherSelection(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
      r,
    );

    if (rustFeathered) {
      const clamped = new Uint8ClampedArray(rustFeathered.buffer as ArrayBuffer, rustFeathered.byteOffset, rustFeathered.byteLength);
      const outImg = new ImageData(clamped, w, h);
      this.maskCtx.putImageData(outImg, 0, 0);
    } else {
      const tmp = document.createElement('canvas');
      tmp.width = w;
      tmp.height = h;
      const tctx = tmp.getContext('2d')!;
      tctx.filter = `blur(${r}px)`;
      tctx.drawImage(this.maskCanvas, 0, 0);
      this.maskCtx.clearRect(0, 0, w, h);
      this.maskCtx.drawImage(tmp, 0, 0);
    }
    this.updateBounds();
  }

  /**
   * Border Selection: Converts solid selection into a hollow contour accelerated by Rust.
   */
  public borderSelection(radiusPx: number, position: 'inside' | 'center' | 'outside' = 'center'): void {
    if (!this._hasSelection || radiusPx <= 0) return;
    this.endMoveMask();
    const r = Math.min(48, Math.max(1, Math.round(radiusPx)));
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    const imgData = this.maskCtx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const posCode = position === 'inside' ? 0 : position === 'outside' ? 2 : 1;

    const rustBorder = rustStrokeEngine.borderSelection(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
      r,
      posCode,
    );

    if (rustBorder) {
      const clamped = new Uint8ClampedArray(rustBorder.buffer as ArrayBuffer, rustBorder.byteOffset, rustBorder.byteLength);
      const outImg = new ImageData(clamped, w, h);
      this.maskCtx.putImageData(outImg, 0, 0);
    } else {
      if (posCode === 1) {
        const rHalf = Math.max(1, Math.round(r / 2));
        this.expandSelection(rHalf);
        const tmp = document.createElement('canvas');
        tmp.width = w;
        tmp.height = h;
        tmp.getContext('2d')!.drawImage(this.maskCanvas, 0, 0);
        this.contractSelection(r);
        this.maskCtx.save();
        this.maskCtx.globalCompositeOperation = 'difference';
        this.maskCtx.drawImage(tmp, 0, 0);
        this.maskCtx.restore();
      } else if (posCode === 2) {
        const tmp = document.createElement('canvas');
        tmp.width = w;
        tmp.height = h;
        tmp.getContext('2d')!.drawImage(this.maskCanvas, 0, 0);
        this.expandSelection(r);
        this.maskCtx.save();
        this.maskCtx.globalCompositeOperation = 'destination-out';
        this.maskCtx.drawImage(tmp, 0, 0);
        this.maskCtx.restore();
      } else {
        const tmp = document.createElement('canvas');
        tmp.width = w;
        tmp.height = h;
        tmp.getContext('2d')!.drawImage(this.maskCanvas, 0, 0);
        this.contractSelection(r);
        tmp.getContext('2d')!.globalCompositeOperation = 'destination-out';
        tmp.getContext('2d')!.drawImage(this.maskCanvas, 0, 0);
        this.maskCtx.clearRect(0, 0, w, h);
        this.maskCtx.drawImage(tmp, 0, 0);
      }
    }
    this.updateBounds();
  }

  /**
   * Magic Wand: Continuous or global color tolerance selection accelerated by Rust.
   */
  public selectWand(
    sourceRgba: Uint8ClampedArray,
    seedX: number,
    seedY: number,
    tolerance = 20,
    contiguous = true,
    antialias = true,
    mode: SelectionCombineMode = this._combineMode,
  ): void {
    const w = this.maskCanvas.width;
    const h = this.maskCanvas.height;
    if (seedX < 0 || seedX >= w || seedY < 0 || seedY >= h) return;

    let wandBytes = rustStrokeEngine.magicWandSelection(
      new Uint8Array(sourceRgba.buffer, sourceRgba.byteOffset, sourceRgba.byteLength),
      w,
      h,
      seedX,
      seedY,
      tolerance,
      contiguous,
      antialias,
    );

    if (!wandBytes) {
      wandBytes = this.computeJsWand(sourceRgba, w, h, seedX, seedY, tolerance, contiguous, antialias);
    }

    const temp = document.createElement('canvas');
    temp.width = w;
    temp.height = h;
    const tctx = temp.getContext('2d')!;
    const clamped = new Uint8ClampedArray(wandBytes.buffer as ArrayBuffer, wandBytes.byteOffset, wandBytes.byteLength);
    tctx.putImageData(new ImageData(clamped, w, h), 0, 0);

    this.applyShapeCanvas(temp, mode);
  }

  private computeJsWand(
    rgba: Uint8ClampedArray,
    w: number,
    h: number,
    seedX: number,
    seedY: number,
    tolerance: number,
    contiguous: boolean,
    antialias: boolean,
  ): Uint8Array {
    const total = w * h;
    const out = new Uint8Array(total * 4);
    const seedIdx = seedY * w + seedX;
    const sp = seedIdx * 4;
    const sr = rgba[sp];
    const sg = rgba[sp + 1];
    const sb = rgba[sp + 2];
    const sa = rgba[sp + 3];

    const tol = (Math.max(0, Math.min(100, tolerance)) / 100) * 255;
    const tolSq = tol * tol * 3;
    const innerTolSq = antialias ? tolSq * 0.70 : tolSq;

    const distSq = (idx: number): number => {
      const p = idx * 4;
      const dr = rgba[p] - sr;
      const dg = rgba[p + 1] - sg;
      const db = rgba[p + 2] - sb;
      const da = rgba[p + 3] - sa;
      return dr * dr + dg * dg + db * db + da * da;
    };

    if (!contiguous) {
      for (let i = 0; i < total; i++) {
        const d2 = distSq(i);
        if (d2 <= tolSq) {
          const a = antialias && d2 > innerTolSq
            ? Math.round((1 - (d2 - innerTolSq) / Math.max(1, tolSq - innerTolSq)) * 255)
            : 255;
          if (a > 0) {
            const p = i * 4;
            out[p] = 255;
            out[p + 1] = 255;
            out[p + 2] = 255;
            out[p + 3] = a;
          }
        }
      }
      return out;
    }

    const visited = new Uint8Array(total);
    const queue: number[] = [seedIdx];
    visited[seedIdx] = 1;

    while (queue.length > 0) {
      const curr = queue.pop()!;
      const cx = curr % w;
      const cy = Math.floor(curr / w);
      const lineY = cy * w;

      let left = cx;
      while (left > 0 && visited[lineY + left - 1] === 0 && distSq(lineY + left - 1) <= tolSq) {
        left--;
      }

      let right = cx;
      while (right + 1 < w && visited[lineY + right + 1] === 0 && distSq(lineY + right + 1) <= tolSq) {
        right++;
      }

      for (let x = left; x <= right; x++) {
        const idx = lineY + x;
        visited[idx] = 1;
        const d2 = distSq(idx);
        const a = antialias && d2 > innerTolSq
          ? Math.round((1 - (d2 - innerTolSq) / Math.max(1, tolSq - innerTolSq)) * 255)
          : 255;
        const p = idx * 4;
        out[p] = 255;
        out[p + 1] = 255;
        out[p + 2] = 255;
        out[p + 3] = a;
      }

      if (cy > 0) {
        const nextLine = (cy - 1) * w;
        let inSpan = false;
        for (let x = left; x <= right; x++) {
          const idx = nextLine + x;
          const matches = visited[idx] === 0 && distSq(idx) <= tolSq;
          if (!inSpan && matches) {
            queue.push(idx);
            inSpan = true;
          } else if (inSpan && !matches) {
            inSpan = false;
          }
        }
      }

      if (cy + 1 < h) {
        const nextLine = (cy + 1) * w;
        let inSpan = false;
        for (let x = left; x <= right; x++) {
          const idx = nextLine + x;
          const matches = visited[idx] === 0 && distSq(idx) <= tolSq;
          if (!inSpan && matches) {
            queue.push(idx);
            inSpan = true;
          } else if (inSpan && !matches) {
            inSpan = false;
          }
        }
      }
    }

    return out;
  }

  /**
   * Internal helper to apply a temporary shape canvas to the mask canvas using combineMode.
   */
  private applyShapeCanvas(tempCanvas: HTMLCanvasElement, mode: SelectionCombineMode): void {
    this.endMoveMask();
    this.maskCtx.save();
    if (mode === 'replace') {
      this.maskCtx.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
      this.maskCtx.drawImage(tempCanvas, 0, 0);
    } else if (mode === 'add') {
      this.maskCtx.globalCompositeOperation = 'source-over';
      this.maskCtx.drawImage(tempCanvas, 0, 0);
    } else if (mode === 'subtract') {
      this.maskCtx.globalCompositeOperation = 'destination-out';
      this.maskCtx.drawImage(tempCanvas, 0, 0);
    }
    this.maskCtx.restore();
    this.updateBounds();
  }

  /**
   * Add a rectangular selection.
   */
  public selectRect(
    x: number,
    y: number,
    w: number,
    h: number,
    mode: SelectionCombineMode = this._combineMode,
  ): void {
    const rx = w < 0 ? x + w : x;
    const ry = h < 0 ? y + h : y;
    const rw = Math.abs(w);
    const rh = Math.abs(h);

    if (rw < 1 || rh < 1) return;

    const temp = document.createElement('canvas');
    temp.width = this.maskCanvas.width;
    temp.height = this.maskCanvas.height;
    const tctx = temp.getContext('2d');
    if (!tctx) return;

    tctx.fillStyle = '#ffffff';
    tctx.fillRect(Math.round(rx), Math.round(ry), Math.round(rw), Math.round(rh));

    this.applyShapeCanvas(temp, mode);
  }

  /**
   * Add an elliptical selection.
   */
  public selectEllipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    mode: SelectionCombineMode = this._combineMode,
  ): void {
    const arx = Math.abs(rx);
    const ary = Math.abs(ry);
    if (arx < 1 || ary < 1) return;

    const temp = document.createElement('canvas');
    temp.width = this.maskCanvas.width;
    temp.height = this.maskCanvas.height;
    const tctx = temp.getContext('2d');
    if (!tctx) return;

    tctx.fillStyle = '#ffffff';
    tctx.beginPath();
    tctx.ellipse(cx, cy, arx, ary, 0, 0, Math.PI * 2);
    tctx.fill();

    this.applyShapeCanvas(temp, mode);
  }

  /**
   * Add a freehand lasso or polygon selection.
   */
  public selectPolygon(
    points: { x: number; y: number }[],
    mode: SelectionCombineMode = this._combineMode,
  ): void {
    if (points.length < 3) return;

    const temp = document.createElement('canvas');
    temp.width = this.maskCanvas.width;
    temp.height = this.maskCanvas.height;
    const tctx = temp.getContext('2d');
    if (!tctx) return;

    tctx.fillStyle = '#ffffff';
    tctx.beginPath();
    tctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      tctx.lineTo(points[i].x, points[i].y);
    }
    tctx.closePath();
    tctx.fill();

    this.applyShapeCanvas(temp, mode);
  }

  /**
   * Checks whether a document pixel (x, y) is inside the active selection.
   */
  public isPixelSelected(x: number, y: number): boolean {
    if (!this._hasSelection) return true; // If no selection, all pixels are active
    if (x < 0 || x >= this.maskCanvas.width || y < 0 || y >= this.maskCanvas.height) return false;
    const pixel = this.maskCtx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    return pixel[3] > 128;
  }
}

// Global singleton instance for selection state
export const selectionModel = new SelectionModel();
