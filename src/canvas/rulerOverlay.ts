import { rulerManager, type RulerType } from './rulerManager';
import { DOC_W, DOC_H } from '../brush/docConstants';

export type RulerHandleKind =
  | 'none'
  | 'sym_center'
  | 'vp1'
  | 'vp2'
  | 'vp3'
  | 'horizon'
  | 'speed_center';

export class RulerOverlay {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  private docW = DOC_W;
  private docH = DOC_H;
  private dirty = true;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.docW;
    this.canvas.height = this.docH;
    const c = this.canvas.getContext('2d');
    if (!c) throw new Error('Failed to create 2d context for ruler overlay');
    this.ctx = c;

    rulerManager.subscribe(() => {
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

  public markDirty(): void {
    this.dirty = true;
  }

  /**
   * Hit tests handles on the ruler overlay to allow direct on-canvas manipulation
   */
  public hitTest(docX: number, docY: number): RulerHandleKind {
    const state = rulerManager.getState();
    if (state.type === 'none') return 'none';

    const radius = 16;

    if (state.type === 'symmetry') {
      const { centerX, centerY } = state.symmetry;
      if (Math.hypot(docX - centerX, docY - centerY) <= radius) {
        return 'sym_center';
      }
    } else if (
      state.type === 'perspective1' ||
      state.type === 'perspective2' ||
      state.type === 'perspective3'
    ) {
      const p = state.perspective;
      if (Math.hypot(docX - p.vp1.x, docY - p.vp1.y) <= radius) return 'vp1';
      if (
        (state.type === 'perspective2' || state.type === 'perspective3') &&
        Math.hypot(docX - p.vp2.x, docY - p.vp2.y) <= radius
      ) {
        return 'vp2';
      }
      if (
        state.type === 'perspective3' &&
        Math.hypot(docX - p.vp3.x, docY - p.vp3.y) <= radius
      ) {
        return 'vp3';
      }
      // Check horizon line
      if (Math.abs(docY - p.horizonY) <= 8) return 'horizon';
    } else if (state.type === 'radial') {
      const sp = state.speedline;
      if (Math.hypot(docX - sp.centerX, docY - sp.centerY) <= radius) {
        return 'speed_center';
      }
    }

    return 'none';
  }

  public moveHandle(kind: RulerHandleKind, docX: number, docY: number): void {
    const state = rulerManager.getState();
    if (kind === 'sym_center') {
      rulerManager.updateSymmetry({ centerX: Math.round(docX), centerY: Math.round(docY) });
    } else if (kind === 'vp1') {
      rulerManager.updatePerspective({
        vp1: { x: Math.round(docX), y: Math.round(docY) },
        horizonY: Math.round(docY),
      });
    } else if (kind === 'vp2') {
      rulerManager.updatePerspective({
        vp2: { x: Math.round(docX), y: Math.round(docY) },
        horizonY: Math.round(docY),
      });
    } else if (kind === 'vp3') {
      rulerManager.updatePerspective({
        vp3: { x: Math.round(docX), y: Math.round(docY) },
      });
    } else if (kind === 'horizon') {
      const p = state.perspective;
      const dy = Math.round(docY) - p.horizonY;
      rulerManager.updatePerspective({
        horizonY: Math.round(docY),
        vp1: { x: p.vp1.x, y: p.vp1.y + dy },
        vp2: { x: p.vp2.x, y: p.vp2.y + dy },
      });
    } else if (kind === 'speed_center') {
      rulerManager.updateSpeedline({ centerX: Math.round(docX), centerY: Math.round(docY) });
    }
  }

  public render(): boolean {
    if (!this.dirty) return false;
    this.dirty = false;

    this.ctx.clearRect(0, 0, this.docW, this.docH);
    const state = rulerManager.getState();
    if (state.type === 'none') return true;

    this.ctx.save();

    if (state.type === 'symmetry') {
      this.drawSymmetryRuler();
    } else if (
      state.type === 'perspective1' ||
      state.type === 'perspective2' ||
      state.type === 'perspective3'
    ) {
      this.drawPerspectiveRuler(state.type);
    } else if (state.type === 'radial') {
      this.drawRadialRuler();
    } else if (state.type === 'parallel') {
      this.drawParallelRuler();
    }

    this.ctx.restore();
    return true;
  }

  private drawSymmetryRuler(): void {
    const { centerX: cx, centerY: cy, angleDeg, axes } = rulerManager.getState().symmetry;
    const ctx = this.ctx;
    const baseRad = (angleDeg * Math.PI) / 180;
    const len = Math.hypot(this.docW, this.docH) * 1.5;

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([8, 6]);

    const step = (Math.PI * 2) / axes;
    for (let i = 0; i < axes / 2; i++) {
      const a = baseRad + i * step;
      const dx = Math.cos(a) * len;
      const dy = Math.sin(a) * len;

      ctx.beginPath();
      ctx.moveTo(cx - dx, cy - dy);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();
    }

    // Draw center handle pin
    ctx.setLineDash([]);
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  private drawPerspectiveRuler(type: RulerType): void {
    const { vp1, vp2, vp3, horizonY } = rulerManager.getState().perspective;
    const ctx = this.ctx;

    ctx.save();

    // 1. Horizon Line
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([12, 4]);
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(this.docW, horizonY);
    ctx.stroke();

    // Horizon label
    ctx.setLineDash([]);
    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('HORIZONTE (Nivel de Ojo)', 20, Math.max(16, horizonY - 6));

    // 2. Draw Vanishing Rays
    ctx.lineWidth = 0.8;
    ctx.setLineDash([4, 6]);

    // Rays for VP1 (Cyan)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
    for (let y = 0; y <= this.docH; y += this.docH / 6) {
      ctx.beginPath();
      ctx.moveTo(vp1.x, vp1.y);
      ctx.lineTo(this.docW, y);
      ctx.stroke();
    }

    // Rays for VP2 (Purple)
    if (type === 'perspective2' || type === 'perspective3') {
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.28)';
      for (let y = 0; y <= this.docH; y += this.docH / 6) {
        ctx.beginPath();
        ctx.moveTo(vp2.x, vp2.y);
        ctx.lineTo(0, y);
        ctx.stroke();
      }
    }

    // Rays for VP3 (Yellow)
    if (type === 'perspective3') {
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.28)';
      for (let x = 0; x <= this.docW; x += this.docW / 6) {
        ctx.beginPath();
        ctx.moveTo(vp3.x, vp3.y);
        ctx.lineTo(x, 0);
        ctx.stroke();
      }
    }

    // 3. Draw VP Control Pins
    this.drawHandlePin(vp1.x, vp1.y, '#38bdf8', 'VP1');
    if (type === 'perspective2' || type === 'perspective3') {
      this.drawHandlePin(vp2.x, vp2.y, '#c084fc', 'VP2');
    }
    if (type === 'perspective3') {
      this.drawHandlePin(vp3.x, vp3.y, '#facc15', 'VP3');
    }

    ctx.restore();
  }

  private drawRadialRuler(): void {
    const { centerX: cx, centerY: cy } = rulerManager.getState().speedline;
    const ctx = this.ctx;
    const len = Math.hypot(this.docW, this.docH);

    ctx.save();
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.25)';
    ctx.lineWidth = 0.9;
    ctx.setLineDash([6, 6]);

    // 16 radial rays radiating from focus center
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len);
      ctx.stroke();
    }

    // Concentric rings
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.arc(cx, cy, 140, 0, Math.PI * 2);
    ctx.stroke();

    this.drawHandlePin(cx, cy, '#f43f5e', 'FOCO');
    ctx.restore();
  }

  private drawParallelRuler(): void {
    const { angleDeg } = rulerManager.getState().speedline;
    const ctx = this.ctx;
    const rad = (angleDeg * Math.PI) / 180;
    const normalX = -Math.sin(rad);
    const normalY = Math.cos(rad);
    const len = Math.hypot(this.docW, this.docH);

    ctx.save();
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.28)';
    ctx.lineWidth = 1.0;
    ctx.setLineDash([8, 8]);

    const step = 80;
    for (let dist = -len; dist <= len; dist += step) {
      const ox = this.docW / 2 + normalX * dist;
      const oy = this.docH / 2 + normalY * dist;
      const dx = Math.cos(rad) * len;
      const dy = Math.sin(rad) * len;

      ctx.beginPath();
      ctx.moveTo(ox - dx, oy - dy);
      ctx.lineTo(ox + dx, oy + dy);
      ctx.stroke();
    }

    ctx.restore();
  }

  private drawHandlePin(x: number, y: number, color: string, label: string): void {
    const ctx = this.ctx;
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(label, x + 16, y + 4);
  }
}

export const rulerOverlay = new RulerOverlay();
