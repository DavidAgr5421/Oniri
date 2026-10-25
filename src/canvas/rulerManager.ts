import { DOC_W, DOC_H } from '../brush/docConstants';

export type RulerType =
  | 'none'
  | 'symmetry'
  | 'perspective1'
  | 'perspective2'
  | 'perspective3'
  | 'radial'
  | 'parallel';

export interface SymmetryConfig {
  centerX: number;
  centerY: number;
  angleDeg: number;
  axes: number; // 2..16
  isMirror: boolean;
}

export interface PerspectiveConfig {
  vp1: { x: number; y: number };
  vp2: { x: number; y: number };
  vp3: { x: number; y: number };
  horizonY: number;
}

export interface SpeedlineConfig {
  centerX: number;
  centerY: number;
  angleDeg: number;
}

export interface RulerState {
  type: RulerType;
  snapEnabled: boolean;
  symmetry: SymmetryConfig;
  perspective: PerspectiveConfig;
  speedline: SpeedlineConfig;
}

interface SnapRay {
  ox: number;
  oy: number;
  dx: number;
  dy: number;
}

function normalize(dx: number, dy: number): [number, number] {
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return [1, 0];
  return [dx / len, dy / len];
}

function projectOnLine(
  px: number,
  py: number,
  ox: number,
  oy: number,
  dx: number,
  dy: number
): { x: number; y: number } {
  const t = (px - ox) * dx + (py - oy) * dy;
  return { x: ox + t * dx, y: oy + t * dy };
}

/**
 * Global Ruler & Perspective Manager for Oniri.
 * Provides real-time magnetic stroke snapping, 1/2/3-point perspective guides,
 * and bilateral/radial symmetry reflection matching Clip Studio Paint.
 */
class RulerManager {
  private state: RulerState = {
    type: 'none',
    snapEnabled: true,
    symmetry: {
      centerX: DOC_W / 2,
      centerY: DOC_H / 2,
      angleDeg: 0,
      axes: 2,
      isMirror: true,
    },
    perspective: {
      vp1: { x: -300, y: DOC_H / 2 },
      vp2: { x: DOC_W + 300, y: DOC_H / 2 },
      vp3: { x: DOC_W / 2, y: DOC_H + 900 },
      horizonY: DOC_H / 2,
    },
    speedline: {
      centerX: DOC_W / 2,
      centerY: DOC_H / 2,
      angleDeg: 0,
    },
  };

  private lockedRay: SnapRay | null = null;
  private listeners = new Set<() => void>();

  public getState(): Readonly<RulerState> {
    return this.state;
  }

  public setRulerType(type: RulerType): void {
    if (this.state.type === type) return;
    this.state.type = type;
    this.lockedRay = null;
    this.notify();
  }

  public setSnapEnabled(enabled: boolean): void {
    if (this.state.snapEnabled === enabled) return;
    this.state.snapEnabled = enabled;
    if (!enabled) this.lockedRay = null;
    this.notify();
  }

  public toggleSnap(): boolean {
    this.setSnapEnabled(!this.state.snapEnabled);
    return this.state.snapEnabled;
  }

  public updateSymmetry(patch: Partial<SymmetryConfig>): void {
    Object.assign(this.state.symmetry, patch);
    this.notify();
  }

  public updatePerspective(patch: Partial<PerspectiveConfig>): void {
    Object.assign(this.state.perspective, patch);
    this.notify();
  }

  public updateSpeedline(patch: Partial<SpeedlineConfig>): void {
    Object.assign(this.state.speedline, patch);
    this.notify();
  }

  public resetStrokeLock(): void {
    this.lockedRay = null;
  }

  /**
   * Snaps input point (curX, curY) to nearest perspective ray or speedline axis
   */
  public snapPoint(
    startX: number,
    startY: number,
    curX: number,
    curY: number
  ): { x: number; y: number } {
    if (!this.state.snapEnabled || this.state.type === 'none' || this.state.type === 'symmetry') {
      return { x: curX, y: curY };
    }

    if (this.lockedRay) {
      return projectOnLine(
        curX,
        curY,
        this.lockedRay.ox,
        this.lockedRay.oy,
        this.lockedRay.dx,
        this.lockedRay.dy
      );
    }

    const dx = curX - startX;
    const dy = curY - startY;
    const dist = Math.hypot(dx, dy);
    if (dist < 3.0) {
      return { x: curX, y: curY };
    }

    const [ndx, ndy] = normalize(dx, dy);

    if (this.state.type === 'perspective1') {
      const p = this.state.perspective;
      const [vp1dx, vp1dy] = normalize(p.vp1.x - startX, p.vp1.y - startY);
      const dotVp1 = Math.abs(ndx * vp1dx + ndy * vp1dy);
      const dotH = Math.abs(ndx);
      const dotV = Math.abs(ndy);

      let chosenRay: SnapRay;
      if (dotVp1 >= dotH && dotVp1 >= dotV) {
        chosenRay = { ox: startX, oy: startY, dx: vp1dx, dy: vp1dy };
      } else if (dotH >= dotV) {
        chosenRay = { ox: startX, oy: startY, dx: 1, dy: 0 };
      } else {
        chosenRay = { ox: startX, oy: startY, dx: 0, dy: 1 };
      }

      this.lockedRay = chosenRay;
      return projectOnLine(curX, curY, chosenRay.ox, chosenRay.oy, chosenRay.dx, chosenRay.dy);
    }

    if (this.state.type === 'perspective2') {
      const p = this.state.perspective;
      const [vp1dx, vp1dy] = normalize(p.vp1.x - startX, p.vp1.y - startY);
      const [vp2dx, vp2dy] = normalize(p.vp2.x - startX, p.vp2.y - startY);
      const dotVp1 = Math.abs(ndx * vp1dx + ndy * vp1dy);
      const dotVp2 = Math.abs(ndx * vp2dx + ndy * vp2dy);
      const dotV = Math.abs(ndy);

      let chosenRay: SnapRay;
      if (dotVp1 >= dotVp2 && dotVp1 >= dotV) {
        chosenRay = { ox: startX, oy: startY, dx: vp1dx, dy: vp1dy };
      } else if (dotVp2 >= dotV) {
        chosenRay = { ox: startX, oy: startY, dx: vp2dx, dy: vp2dy };
      } else {
        chosenRay = { ox: startX, oy: startY, dx: 0, dy: 1 };
      }

      this.lockedRay = chosenRay;
      return projectOnLine(curX, curY, chosenRay.ox, chosenRay.oy, chosenRay.dx, chosenRay.dy);
    }

    if (this.state.type === 'perspective3') {
      const p = this.state.perspective;
      const [vp1dx, vp1dy] = normalize(p.vp1.x - startX, p.vp1.y - startY);
      const [vp2dx, vp2dy] = normalize(p.vp2.x - startX, p.vp2.y - startY);
      const [vp3dx, vp3dy] = normalize(p.vp3.x - startX, p.vp3.y - startY);
      const dotVp1 = Math.abs(ndx * vp1dx + ndy * vp1dy);
      const dotVp2 = Math.abs(ndx * vp2dx + ndy * vp2dy);
      const dotVp3 = Math.abs(ndx * vp3dx + ndy * vp3dy);

      let chosenRay: SnapRay;
      if (dotVp1 >= dotVp2 && dotVp1 >= dotVp3) {
        chosenRay = { ox: startX, oy: startY, dx: vp1dx, dy: vp1dy };
      } else if (dotVp2 >= dotVp3) {
        chosenRay = { ox: startX, oy: startY, dx: vp2dx, dy: vp2dy };
      } else {
        chosenRay = { ox: startX, oy: startY, dx: vp3dx, dy: vp3dy };
      }

      this.lockedRay = chosenRay;
      return projectOnLine(curX, curY, chosenRay.ox, chosenRay.oy, chosenRay.dx, chosenRay.dy);
    }

    if (this.state.type === 'radial') {
      const sp = this.state.speedline;
      const [dxF, dyF] = normalize(startX - sp.centerX, startY - sp.centerY);
      const ray = { ox: sp.centerX, oy: sp.centerY, dx: dxF, dy: dyF };
      this.lockedRay = ray;
      return projectOnLine(curX, curY, ray.ox, ray.oy, ray.dx, ray.dy);
    }

    if (this.state.type === 'parallel') {
      const rad = (this.state.speedline.angleDeg * Math.PI) / 180;
      const ray = { ox: startX, oy: startY, dx: Math.cos(rad), dy: Math.sin(rad) };
      this.lockedRay = ray;
      return projectOnLine(curX, curY, ray.ox, ray.oy, ray.dx, ray.dy);
    }

    return { x: curX, y: curY };
  }

  /**
   * Generates symmetric points across active symmetry lines
   */
  public getSymmetricPoints(x: number, y: number): { x: number; y: number }[] {
    if (this.state.type !== 'symmetry') {
      return [{ x, y }];
    }

    const { centerX: cx, centerY: cy, angleDeg, axes, isMirror } = this.state.symmetry;
    const baseAngle = (angleDeg * Math.PI) / 180;
    const rx = x - cx;
    const ry = y - cy;
    const results: { x: number; y: number }[] = [];

    if (isMirror) {
      const wedge = (Math.PI * 2) / axes;
      for (let i = 0; i < axes; i++) {
        if (i === 0) {
          results.push({ x, y });
        } else if (i % 2 === 1) {
          const axisAngle = baseAngle + i * (wedge / 2);
          const cos2 = Math.cos(2 * axisAngle);
          const sin2 = Math.sin(2 * axisAngle);
          results.push({
            x: cx + rx * cos2 + ry * sin2,
            y: cy + rx * sin2 - ry * cos2,
          });
        } else {
          const rot = i * (wedge / 2);
          const cosR = Math.cos(rot);
          const sinR = Math.sin(rot);
          results.push({
            x: cx + rx * cosR - ry * sinR,
            y: cy + rx * sinR + ry * cosR,
          });
        }
      }
    } else {
      const step = (Math.PI * 2) / axes;
      for (let i = 0; i < axes; i++) {
        const rot = baseAngle + i * step;
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        results.push({
          x: cx + rx * cosR - ry * sinR,
          y: cy + rx * sinR + ry * cosR,
        });
      }
    }

    return results;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const l of this.listeners) l();
  }
}

export const rulerManager = new RulerManager();
