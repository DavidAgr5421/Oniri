import { DOC_H, DOC_W } from '../brush/docConstants';

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

  // Selection-mask move state (CSP "move the selection tent", REA study 4.1)
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
   * Moves only the selection mask ("marching ants" tent) without touching any
   * layer pixels. Used by the selection tool when dragging inside an existing
   * selection, and by the arrow-key nudge (CSP behavior, REA study 4.1).
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
    this.moveSnapshot = this.maskCtx.getImageData(0, 0, DOC_W, DOC_H);
    this.moveBaseBounds = { ...this._bounds };
    this.moveOffsetX = 0;
    this.moveOffsetY = 0;
    return true;
  }

  public moveMaskBy(dx: number, dy: number): void {
    if (!this.moveSnapshot || !this.moveBaseBounds) return;
    this.moveOffsetX = Math.round(dx);
    this.moveOffsetY = Math.round(dy);
    this.maskCtx.clearRect(0, 0, DOC_W, DOC_H);
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
    const cx1 = Math.min(DOC_W - 1, maxX);
    const cy1 = Math.min(DOC_H - 1, maxY);

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
   * Recalculates bounding box and whether any pixel is selected.
   */
  public updateBounds(): void {
    const imgData = this.maskCtx.getImageData(0, 0, DOC_W, DOC_H);
    const data = imgData.data;
    let minX = DOC_W;
    let minY = DOC_H;
    let maxX = -1;
    let maxY = -1;
    let found = false;

    // Scan for alpha > 0
    for (let y = 0; y < DOC_H; y++) {
      const rowOffset = y * DOC_W * 4;
      for (let x = 0; x < DOC_W; x++) {
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
    this.maskCtx.clearRect(0, 0, DOC_W, DOC_H);
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
    this.maskCtx.fillRect(0, 0, DOC_W, DOC_H);
    this._hasSelection = true;
    this._bounds = {
      minX: 0,
      minY: 0,
      maxX: DOC_W - 1,
      maxY: DOC_H - 1,
      width: DOC_W,
      height: DOC_H,
    };
    this.notify();
  }

  /**
   * Invert the current selection (Ctrl+Shift+I)
   */
  public invertSelection(): void {
    this.endMoveMask();
    this.maskCtx.save();
    this.maskCtx.globalCompositeOperation = 'difference';
    this.maskCtx.fillStyle = '#ffffff';
    this.maskCtx.fillRect(0, 0, DOC_W, DOC_H);
    this.maskCtx.restore();
    this.updateBounds();
  }

  /**
   * Internal helper to apply a temporary shape canvas to the mask canvas using combineMode.
   */
  private applyShapeCanvas(tempCanvas: HTMLCanvasElement, mode: SelectionCombineMode): void {
    this.endMoveMask();
    this.maskCtx.save();
    if (mode === 'replace') {
      this.maskCtx.clearRect(0, 0, DOC_W, DOC_H);
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
    temp.width = DOC_W;
    temp.height = DOC_H;
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
    temp.width = DOC_W;
    temp.height = DOC_H;
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
    temp.width = DOC_W;
    temp.height = DOC_H;
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
    if (x < 0 || x >= DOC_W || y < 0 || y >= DOC_H) return false;
    const pixel = this.maskCtx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    return pixel[3] > 128;
  }
}

// Global singleton instance for selection state
export const selectionModel = new SelectionModel();
