import { cameraFrameManager } from './cameraFrameManager';

export class CameraFrameOverlay {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  private docW = 1600;
  private docH = 900;
  private dirty = true;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.docW;
    this.canvas.height = this.docH;
    const c = this.canvas.getContext('2d');
    if (!c) throw new Error('Failed to create 2d context for camera frame overlay');
    this.ctx = c;

    cameraFrameManager.subscribe(() => {
      this.dirty = true;
    });
  }

  public resize(w: number, h: number): void {
    if (this.docW === w && this.docH === h) return;
    this.docW = w;
    this.docH = h;
    this.canvas.width = w;
    this.canvas.height = h;
    this.dirty = true;
  }

  public render(): boolean {
    if (!this.dirty) return false;
    this.dirty = false;

    this.ctx.clearRect(0, 0, this.docW, this.docH);
    const state = cameraFrameManager.getState();
    if (!state.enabled) return true;

    const crop = cameraFrameManager.getEffectiveCropRect(this.docW, this.docH);
    const { x, y, w, h } = crop;

    // 1. Darkened Overscan Mask (Vignette over drawing area outside camera view)
    if (state.showMask && (w < this.docW || h < this.docH)) {
      this.ctx.save();
      this.ctx.fillStyle = `rgba(0, 0, 0, ${state.maskOpacity})`;
      // Fill entire doc
      this.ctx.fillRect(0, 0, this.docW, this.docH);
      // Cut out camera frame
      this.ctx.clearRect(x, y, w, h);
      this.ctx.restore();
    }

    // 2. Output Camera Frame Boundary (CSP Cyan/Blue Border)
    if (state.showFrame) {
      this.ctx.save();
      this.ctx.strokeStyle = '#38bdf8';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, w, h);

      // Camera Corner L-Ticks (Japanese animation standard)
      const tickLen = Math.min(32, Math.min(w, h) * 0.1);
      this.ctx.strokeStyle = '#0284c7';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      // Top-Left
      this.ctx.moveTo(x - 2, y + tickLen);
      this.ctx.lineTo(x - 2, y - 2);
      this.ctx.lineTo(x + tickLen, y - 2);
      // Top-Right
      this.ctx.moveTo(x + w - tickLen, y - 2);
      this.ctx.lineTo(x + w + 2, y - 2);
      this.ctx.lineTo(x + w + 2, y + tickLen);
      // Bottom-Left
      this.ctx.moveTo(x - 2, y + h - tickLen);
      this.ctx.lineTo(x - 2, y + h + 2);
      this.ctx.lineTo(x + tickLen, y + h + 2);
      // Bottom-Right
      this.ctx.moveTo(x + w - tickLen, y + h + 2);
      this.ctx.lineTo(x + w + 2, y + h + 2);
      this.ctx.lineTo(x + w + 2, y + h - tickLen);
      this.ctx.stroke();

      // Pill badge with resolution
      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      const badgeText = `Cuadro de cámara: ${w} × ${h}`;
      this.ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const textMetrics = this.ctx.measureText(badgeText);
      const pad = 6;
      const bW = textMetrics.width + pad * 2;
      const bH = 20;
      const bX = x + 8;
      const bY = y + 8;

      this.ctx.beginPath();
      this.ctx.roundRect(bX, bY, bW, bH, 4);
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.fillStyle = '#38bdf8';
      this.ctx.fillText(badgeText, bX + pad, bY + 14);

      this.ctx.restore();
    }

    // 3. Safe Margins (Action Safe 90% and Title Safe 80%)
    if (state.showSafeMargin) {
      this.ctx.save();

      // Action Safe (90%)
      const asW = Math.round((w * state.actionSafePercent) / 100);
      const asH = Math.round((h * state.actionSafePercent) / 100);
      const asX = x + Math.round((w - asW) / 2);
      const asY = y + Math.round((h - asH) / 2);

      this.ctx.strokeStyle = '#facc15'; // Yellow
      this.ctx.lineWidth = 1.2;
      this.ctx.setLineDash([6, 6]);
      this.ctx.strokeRect(asX, asY, asW, asH);

      // Title Safe (80%)
      const tsW = Math.round((w * state.titleSafePercent) / 100);
      const tsH = Math.round((h * state.titleSafePercent) / 100);
      const tsX = x + Math.round((w - tsW) / 2);
      const tsY = y + Math.round((h - tsH) / 2);

      this.ctx.strokeStyle = '#fb923c'; // Orange
      this.ctx.lineWidth = 1.2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeRect(tsX, tsY, tsW, tsH);

      this.ctx.restore();
    }

    return true;
  }
}

export const cameraFrameOverlay = new CameraFrameOverlay();
