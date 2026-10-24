import { DOC_H, DOC_W } from '../brush/docConstants';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';
import { selectionModel } from './selectionModel';
import { transformManager } from './transformGizmo';

export interface SelectionDragPreview {
  type: 'rect' | 'ellipse' | 'lasso' | 'poly';
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  points?: { x: number; y: number }[];
  combineMode: 'replace' | 'add' | 'subtract';
}

export class MarchingAntsRenderer {
  public readonly overlayCanvas: HTMLCanvasElement;
  public readonly overlayCtx: CanvasRenderingContext2D;

  private boundaryCanvas: HTMLCanvasElement;
  private boundaryCtx: CanvasRenderingContext2D;

  private dashOffset = 0;
  private lastTime = 0;
  private boundaryDirty = true;
  private activeDragPreview: SelectionDragPreview | null = null;

  constructor() {
    this.overlayCanvas = document.createElement('canvas');
    this.overlayCanvas.width = DOC_W;
    this.overlayCanvas.height = DOC_H;
    const octx = this.overlayCanvas.getContext('2d');
    if (!octx) throw new Error('Failed to get overlay 2d context');
    this.overlayCtx = octx;

    this.boundaryCanvas = document.createElement('canvas');
    this.boundaryCanvas.width = DOC_W;
    this.boundaryCanvas.height = DOC_H;
    const bctx = this.boundaryCanvas.getContext('2d');
    if (!bctx) throw new Error('Failed to get boundary 2d context');
    this.boundaryCtx = bctx;

    selectionModel.subscribe(() => {
      this.boundaryDirty = true;
    });
  }

  public resize(w: number, h: number): void {
    this.overlayCanvas.width = w;
    this.overlayCanvas.height = h;
    this.boundaryCanvas.width = w;
    this.boundaryCanvas.height = h;
    this.boundaryDirty = true;
  }

  public setDragPreview(preview: SelectionDragPreview | null): void {
    this.activeDragPreview = preview;
  }

  public markDirty(): void {
    this.boundaryDirty = true;
  }

  /**
   * Recalculates the 1-pixel boundary of the current selection mask.
   * Uses Rust WASM for 1-pass zero-latency perimeter extraction, with 4-way dilation fallback.
   */
  private updateBoundary(): void {
    this.boundaryDirty = false;
    const w = this.boundaryCanvas.width;
    const h = this.boundaryCanvas.height;
    this.boundaryCtx.clearRect(0, 0, w, h);

    if (!selectionModel.hasSelection()) return;

    const mask = selectionModel.maskCanvas;
    const mctx = selectionModel.maskCtx;
    const imgData = mctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const rustBoundary = rustStrokeEngine.extractBoundaryMask(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      w,
      h,
      true,
    );

    if (rustBoundary) {
      const clamped = new Uint8ClampedArray(rustBoundary.buffer as ArrayBuffer, rustBoundary.byteOffset, rustBoundary.byteLength);
      const outImg = new ImageData(clamped, w, h);
      this.boundaryCtx.putImageData(outImg, 0, 0);
      return;
    }

    // 1. Dilate mask by 1 pixel in 4 cardinal directions
    this.boundaryCtx.drawImage(mask, -1, 0);
    this.boundaryCtx.drawImage(mask, 1, 0);
    this.boundaryCtx.drawImage(mask, 0, -1);
    this.boundaryCtx.drawImage(mask, 0, 1);

    // 2. Subtract original mask leaving only the outer 1px perimeter edge
    this.boundaryCtx.save();
    this.boundaryCtx.globalCompositeOperation = 'destination-out';
    this.boundaryCtx.drawImage(mask, 0, 0);
    this.boundaryCtx.restore();
  }

  public isAnimating(): boolean {
    return selectionModel.hasSelection() || this.activeDragPreview !== null || transformManager.isTransforming();
  }

  /**
   * Advances the animation of the marching ants and repaints the overlay canvas.
   * Returns true if the overlay canvas was updated and needs a texture sync.
   */
  public render(now = performance.now()): boolean {
    const hasSelection = selectionModel.hasSelection();
    const hasPreview = this.activeDragPreview !== null;
    const isTransforming = transformManager.isTransforming();

    if (!hasSelection && !hasPreview && !isTransforming) {
      if (this.dashOffset !== 0) {
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        this.dashOffset = 0;
        return true;
      }
      return false;
    }

    // Advance dash offset roughly every ~40ms for classic smooth marching cadence
    if (this.lastTime === 0) this.lastTime = now;
    const elapsed = now - this.lastTime;
    let cadenceAdvanced = false;
    if (elapsed >= 40) {
      this.dashOffset = (this.dashOffset + 1) % 16;
      this.lastTime = now;
      cadenceAdvanced = true;
    }

    // Skip redundant repaints and GPU uploads when nothing has changed between frames
    if (!cadenceAdvanced && !this.boundaryDirty && !hasPreview && !isTransforming) {
      return false;
    }

    if (this.boundaryDirty) {
      this.updateBoundary();
    }

    this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);

    // 1. Draw marching ants boundary if selection is active (hidden while transforming)
    if (hasSelection && !isTransforming) {
      this.overlayCtx.save();

      // Mask with the 1px boundary
      this.overlayCtx.drawImage(this.boundaryCanvas, 0, 0);

      // Clip drawing to boundary pixels using source-in
      this.overlayCtx.globalCompositeOperation = 'source-in';

      // Fill with animated alternating black & white stripes at 45 degrees
      this.renderStripesPattern(this.overlayCtx, this.dashOffset);

      this.overlayCtx.restore();
    }

    // 2. Draw live drag preview if user is currently creating a selection
    if (hasPreview && this.activeDragPreview) {
      this.renderLiveDragPreview(this.activeDragPreview, this.dashOffset);
    }

    // 3. Draw Free Transform Gizmo & transformed content
    if (isTransforming) {
      transformManager.render(this.overlayCtx);
    }

    return true;
  }

  /**
   * Fills the canvas with 45-degree black-and-white marching diagonal stripes.
   */
  private renderStripesPattern(ctx: CanvasRenderingContext2D, offset: number): void {
    const bounds = selectionModel.getBounds();
    const minX = bounds ? Math.max(0, bounds.minX - 2) : 0;
    const minY = bounds ? Math.max(0, bounds.minY - 2) : 0;
    const maxX = bounds ? Math.min(this.overlayCanvas.width, bounds.maxX + 3) : this.overlayCanvas.width;
    const maxY = bounds ? Math.min(this.overlayCanvas.height, bounds.maxY + 3) : this.overlayCanvas.height;

    ctx.fillStyle = '#000000';
    ctx.fillRect(minX, minY, maxX - minX, maxY - minY);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;

    const spacing = 8;
    const startX = minX - (maxY - minY) - spacing;
    const endX = maxX + spacing;

    ctx.beginPath();
    for (let x = startX + (offset % spacing); x < endX; x += spacing) {
      ctx.moveTo(x, minY);
      ctx.lineTo(x + (maxY - minY), maxY);
    }
    ctx.stroke();
  }

  /**
   * Draws a live vector preview of the shape being dragged.
   */
  private renderLiveDragPreview(preview: SelectionDragPreview, offset: number): void {
    const ctx = this.overlayCtx;
    ctx.save();

    const { type, startX, startY, currentX, currentY, points, combineMode } = preview;

    // Draw path
    ctx.beginPath();

    if (type === 'rect') {
      const rx = Math.min(startX, currentX);
      const ry = Math.min(startY, currentY);
      const rw = Math.abs(currentX - startX);
      const rh = Math.abs(currentY - startY);
      ctx.rect(rx, ry, rw, rh);
    } else if (type === 'ellipse') {
      const cx = (startX + currentX) / 2;
      const cy = (startY + currentY) / 2;
      const rx = Math.abs(currentX - startX) / 2;
      const ry = Math.abs(currentY - startY) / 2;
      ctx.ellipse(cx, cy, Math.max(0.5, rx), Math.max(0.5, ry), 0, 0, Math.PI * 2);
    } else if ((type === 'lasso' || type === 'poly') && points && points.length > 0) {
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      if (type === 'poly') {
        ctx.lineTo(currentX, currentY);
      }
      ctx.closePath();
    }

    // Subtle fill to show the selection area preview
    ctx.fillStyle = combineMode === 'subtract' ? 'rgba(255, 60, 60, 0.15)' : 'rgba(0, 160, 255, 0.15)';
    ctx.fill();

    // Dual-stroke dashed outline (Black base + White dashes with animated offset)
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.setLineDash([4, 4]);
    ctx.lineDashOffset = -offset;
    ctx.strokeStyle = combineMode === 'subtract' ? '#ff4d4f' : '#ffffff';
    ctx.stroke();

    ctx.restore();
  }
}

export const marchingAnts = new MarchingAntsRenderer();
