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

function extractSelectionSegments(
  maskData: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): Float32Array {
  const segments: number[] = [];
  const isSelected = (x: number, y: number): boolean => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    return maskData[(y * width + x) * 4 + 3] > 128;
  };

  const x0 = Math.max(0, minX);
  const y0 = Math.max(0, minY);
  const x1 = Math.min(width - 1, maxX);
  const y1 = Math.min(height - 1, maxY);

  // 1. Bordes horizontales (Superior e Inferior) con fusión colineal
  for (let y = y0; y <= y1; y++) {
    let inTopEdge = false;
    let segStartX = 0;
    for (let x = x0; x <= x1 + 1; x++) {
      const edge = x <= x1 && isSelected(x, y) && (y === 0 || !isSelected(x, y - 1));
      if (edge && !inTopEdge) {
        inTopEdge = true;
        segStartX = x;
      } else if (!edge && inTopEdge) {
        inTopEdge = false;
        segments.push(segStartX, y, x, y);
      }
    }

    let inBottomEdge = false;
    let bStartX = 0;
    for (let x = x0; x <= x1 + 1; x++) {
      const edge = x <= x1 && isSelected(x, y) && (y === height - 1 || !isSelected(x, y + 1));
      if (edge && !inBottomEdge) {
        inBottomEdge = true;
        bStartX = x;
      } else if (!edge && inBottomEdge) {
        inBottomEdge = false;
        segments.push(bStartX, y + 1, x, y + 1);
      }
    }
  }

  // 2. Bordes verticales (Izquierdo y Derecho) con fusión colineal
  for (let x = x0; x <= x1; x++) {
    let inLeftEdge = false;
    let segStartY = 0;
    for (let y = y0; y <= y1 + 1; y++) {
      const edge = y <= y1 && isSelected(x, y) && (x === 0 || !isSelected(x - 1, y));
      if (edge && !inLeftEdge) {
        inLeftEdge = true;
        segStartY = y;
      } else if (!edge && inLeftEdge) {
        inLeftEdge = false;
        segments.push(x, segStartY, x, y);
      }
    }

    let inRightEdge = false;
    let rStartY = 0;
    for (let y = y0; y <= y1 + 1; y++) {
      const edge = y <= y1 && isSelected(x, y) && (x === width - 1 || !isSelected(x + 1, y));
      if (edge && !inRightEdge) {
        inRightEdge = true;
        rStartY = y;
      } else if (!edge && inRightEdge) {
        inRightEdge = false;
        segments.push(x + 1, rStartY, x + 1, y);
      }
    }
  }

  return new Float32Array(segments);
}

export class MarchingAntsRenderer {
  public readonly overlayCanvas: HTMLCanvasElement;
  public readonly overlayCtx: CanvasRenderingContext2D;

  private dashOffset = 0;
  private lastTime = 0;
  private boundaryDirty = true;
  private boundaryPath: Path2D | null = null;
  private activeDragPreview: SelectionDragPreview | null = null;

  constructor() {
    this.overlayCanvas = document.createElement('canvas');
    this.overlayCanvas.width = DOC_W;
    this.overlayCanvas.height = DOC_H;
    const octx = this.overlayCanvas.getContext('2d');
    if (!octx) throw new Error('Failed to get overlay 2d context');
    this.overlayCtx = octx;

    selectionModel.subscribe(() => {
      this.boundaryDirty = true;
    });
  }

  public resize(w: number, h: number): void {
    this.overlayCanvas.width = w;
    this.overlayCanvas.height = h;
    this.boundaryDirty = true;
  }

  public setDragPreview(preview: SelectionDragPreview | null): void {
    this.activeDragPreview = preview;
  }

  public markDirty(): void {
    this.boundaryDirty = true;
  }

  /**
   * Recalcula los segmentos de contorno vectoriales de la selección actual.
   * Utiliza Rust WASM o el algoritmo delimitado por caja para máxima velocidad.
   */
  private updateBoundary(): void {
    this.boundaryDirty = false;
    const bounds = selectionModel.getBounds();
    if (!selectionModel.hasSelection() || !bounds) {
      this.boundaryPath = null;
      return;
    }

    const w = this.overlayCanvas.width;
    const h = this.overlayCanvas.height;
    const mctx = selectionModel.maskCtx;

    // Acotado exacto: lee únicamente el cuadro delimitador de la selección (+1px margen)
    const bx0 = Math.max(0, bounds.minX - 1);
    const by0 = Math.max(0, bounds.minY - 1);
    const bx1 = Math.min(w - 1, bounds.maxX + 1);
    const by1 = Math.min(h - 1, bounds.maxY + 1);
    const bw = bx1 - bx0 + 1;
    const bh = by1 - by0 + 1;

    const imgData = mctx.getImageData(bx0, by0, bw, bh);
    const data = imgData.data;

    let segs = rustStrokeEngine.extractBoundarySegments(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      bw,
      bh,
      0,
      0,
      bw - 1,
      bh - 1,
      true,
    );

    if (!segs || segs.length === 0) {
      segs = extractSelectionSegments(data, bw, bh, 0, 0, bw - 1, bh - 1);
    }

    const path = new Path2D();
    for (let i = 0; i < segs.length; i += 4) {
      path.moveTo(bx0 + segs[i], by0 + segs[i + 1]);
      path.lineTo(bx0 + segs[i + 2], by0 + segs[i + 3]);
    }
    this.boundaryPath = path;
  }

  public isAnimating(): boolean {
    return selectionModel.hasSelection() || this.activeDragPreview !== null || transformManager.isTransforming();
  }

  /**
   * Renderiza las hormigas marchantes en vector puro y avanza el offset de animación.
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

    // Avanza el desplazamiento de las hormigas cada ~40ms para cadencia suave clásica
    if (this.lastTime === 0) this.lastTime = now;
    const elapsed = now - this.lastTime;
    let cadenceAdvanced = false;
    if (elapsed >= 40) {
      this.dashOffset = (this.dashOffset + 1) % 16;
      this.lastTime = now;
      cadenceAdvanced = true;
    }

    if (!cadenceAdvanced && !this.boundaryDirty && !hasPreview && !isTransforming) {
      return false;
    }

    if (this.boundaryDirty) {
      this.updateBoundary();
    }

    this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);

    // 1. Dibuja contorno vectorial nítido de hormigas marchantes en 2 pasadas (Negro + Guiones blancos)
    if (hasSelection && !isTransforming && this.boundaryPath) {
      this.overlayCtx.save();
      this.overlayCtx.lineWidth = 1;

      // Base negra continua
      this.overlayCtx.strokeStyle = '#000000';
      this.overlayCtx.setLineDash([]);
      this.overlayCtx.stroke(this.boundaryPath);

      // Guiones blancos alternados con offset dinámico (hormigas clásicas de CSP / Photoshop)
      this.overlayCtx.strokeStyle = '#ffffff';
      this.overlayCtx.setLineDash([4, 4]);
      this.overlayCtx.lineDashOffset = -this.dashOffset;
      this.overlayCtx.stroke(this.boundaryPath);

      this.overlayCtx.restore();
    }

    // 2. Previsualización de arrastre activo si el usuario está seleccionando
    if (hasPreview && this.activeDragPreview) {
      this.renderLiveDragPreview(this.activeDragPreview, this.dashOffset);
    }

    // 3. Gizmo de Transformación Libre
    if (isTransforming) {
      transformManager.render(this.overlayCtx);
    }

    return true;
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
