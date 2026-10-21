import * as THREE from 'three';
import { DOC_H, DOC_W } from '../brush/docConstants';

export interface ViewportState {
  zoom: number;
  rotation: number; // in radians
  rotationDeg: number; // in degrees [-180, 180]
  panX: number;
  panY: number;
  flippedH: boolean;
  flippedV: boolean;
}

export interface ViewportInitOptions {
  camera: THREE.OrthographicCamera;
  canvas: HTMLCanvasElement;
  meshes: THREE.Mesh[];
  onUpdate?: (state: ViewportState) => void;
}

class ViewportNavigationManager {
  private camera: THREE.OrthographicCamera | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private meshes: THREE.Mesh[] = [];
  private listeners: Set<(state: ViewportState) => void> = new Set();

  private zoomVal = 1.0;
  private rotationVal = 0.0; // radians
  private flippedHVal = false;
  private flippedVVal = false;

  private hudElement: HTMLElement | null = null;
  private hudTimeout: number | null = null;

  public init(options: ViewportInitOptions): void {
    this.camera = options.camera;
    this.canvas = options.canvas;
    this.meshes = options.meshes;
    if (options.onUpdate) {
      this.listeners.add(options.onUpdate);
    }
    this.createHudElement();
  }

  public getState(): ViewportState {
    const deg = (this.rotationVal * 180) / Math.PI;
    const normalizedDeg = ((deg + 180) % 360) - 180;
    return {
      zoom: this.zoomVal,
      rotation: this.rotationVal,
      rotationDeg: Number(normalizedDeg.toFixed(1)),
      panX: this.camera ? this.camera.position.x : 0,
      panY: this.camera ? this.camera.position.y : 0,
      flippedH: this.flippedHVal,
      flippedV: this.flippedVVal,
    };
  }

  public subscribe(cb: (state: ViewportState) => void): () => void {
    this.listeners.add(cb);
    cb(this.getState());
    return () => this.listeners.delete(cb);
  }

  private notify(): void {
    const s = this.getState();
    for (const cb of this.listeners) {
      cb(s);
    }
  }

  /**
   * Sets zoom level with optional focal point in screen coordinates.
   */
  public setZoom(newZoom: number, originScreenX?: number, originScreenY?: number): void {
    if (!this.camera || !this.canvas) return;
    const clampedZoom = Math.max(0.05, Math.min(32.0, newZoom));
    if (Math.abs(clampedZoom - this.zoomVal) < 0.0001) return;

    if (originScreenX !== undefined && originScreenY !== undefined) {
      const rect = this.canvas.getBoundingClientRect();
      const ndcX = ((originScreenX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((originScreenY - rect.top) / rect.height) * 2 - 1);

      // World point under cursor before zoom
      const prevWorldX = this.ndcToWorldX(ndcX, this.zoomVal);
      const prevWorldY = this.ndcToWorldY(ndcY, this.zoomVal);

      this.zoomVal = clampedZoom;
      this.camera.zoom = clampedZoom;
      this.camera.updateProjectionMatrix();

      // World point under cursor after zoom
      const nextWorldX = this.ndcToWorldX(ndcX, this.zoomVal);
      const nextWorldY = this.ndcToWorldY(ndcY, this.zoomVal);

      // Adjust camera so world point stays under cursor
      this.camera.position.x += prevWorldX - nextWorldX;
      this.camera.position.y += prevWorldY - nextWorldY;
    } else {
      this.zoomVal = clampedZoom;
      this.camera.zoom = clampedZoom;
      this.camera.updateProjectionMatrix();
    }

    this.showHUD(`Zoom: ${Math.round(this.zoomVal * 100)}%`);
    this.notify();
  }

  public zoomIn(): void {
    this.setZoom(this.zoomVal * 1.25);
  }

  public zoomOut(): void {
    this.setZoom(this.zoomVal / 1.25);
  }

  public zoom100(): void {
    this.setZoom(1.0);
  }

  public resetView(): void {
    if (!this.camera) return;
    this.camera.position.set(0, 0, 10);
    this.zoomVal = 1.0;
    this.camera.zoom = 1.0;
    this.rotationVal = 0.0;
    this.camera.rotation.z = 0;
    this.camera.updateProjectionMatrix();
    this.showHUD('Vista restablecida (100% · 0°)');
    this.notify();
  }

  /**
   * Sets canvas rotation in radians.
   */
  public setRotation(angleRad: number, showHud = true): void {
    if (!this.camera) return;
    this.rotationVal = angleRad;
    this.camera.rotation.z = angleRad;
    this.camera.updateMatrixWorld();

    if (showHud) {
      const deg = ((angleRad * 180) / Math.PI) % 360;
      const normDeg = ((deg + 180) % 360) - 180;
      this.showHUD(`Rotación: ${normDeg.toFixed(1)}°`);
    }
    this.notify();
  }

  public rotateBy(deltaRad: number): void {
    this.setRotation(this.rotationVal + deltaRad);
  }

  public resetRotation(): void {
    this.setRotation(0);
    this.showHUD('Rotación: 0.0°');
  }

  public rotate90CCW(): void {
    this.rotateBy(-Math.PI / 2);
  }

  public rotate90CW(): void {
    this.rotateBy(Math.PI / 2);
  }

  /**
   * Toggles mirror view horizontally (display only, preserves drawing).
   */
  public toggleFlipHorizontal(): void {
    this.flippedHVal = !this.flippedHVal;
    for (const mesh of this.meshes) {
      mesh.scale.x = (this.flippedHVal ? -1 : 1) * Math.abs(mesh.scale.x || 1);
    }
    this.showHUD(this.flippedHVal ? 'Voltear horizontal: Activado' : 'Voltear horizontal: Normal');
    this.notify();
  }

  /**
   * Toggles mirror view vertically (display only).
   */
  public toggleFlipVertical(): void {
    this.flippedVVal = !this.flippedVVal;
    for (const mesh of this.meshes) {
      mesh.scale.y = (this.flippedVVal ? -1 : 1) * Math.abs(mesh.scale.y || 1);
    }
    this.showHUD(this.flippedVVal ? 'Voltear vertical: Activado' : 'Voltear vertical: Normal');
    this.notify();
  }

  /**
   * Handles smooth screen-space panning with camera rotation & flip awareness.
   */
  public panByScreenDelta(dx: number, dy: number): void {
    if (!this.camera || !this.canvas) return;

    const viewHeight = (this.camera.top - this.camera.bottom) / this.camera.zoom;
    const unitsPerPixel = viewHeight / window.innerHeight;

    const screenDx = dx * unitsPerPixel;
    const screenDy = dy * unitsPerPixel;

    const cos = Math.cos(this.rotationVal);
    const sin = Math.sin(this.rotationVal);

    // Screen displacement mapped to world camera movement
    const worldDx = -(screenDx * cos - screenDy * sin);
    const worldDy = (screenDx * sin + screenDy * cos);

    this.camera.position.x += worldDx;
    this.camera.position.y += worldDy;
    this.notify();
  }

  /**
   * Centers viewport on given document coordinates (0..DOC_W, 0..DOC_H).
   */
  public panToDoc(docX: number, docY: number): void {
    if (!this.camera) return;
    const uvX = docX / DOC_W;
    const uvY = 1 - docY / DOC_H;
    const scaleX = this.flippedHVal ? -1 : 1;
    const scaleY = this.flippedVVal ? -1 : 1;

    const targetWorldX = (uvX - 0.5) * 16 * scaleX;
    const targetWorldY = (uvY - 0.5) * 9 * scaleY;

    this.camera.position.x = targetWorldX;
    this.camera.position.y = targetWorldY;
    this.notify();
  }

  /**
   * Computes visible corners of viewport in document coordinates [TL, TR, BR, BL].
   */
  public getVisibleDocCorners(): { x: number; y: number }[] {
    if (!this.camera) {
      return [
        { x: 0, y: 0 },
        { x: DOC_W, y: 0 },
        { x: DOC_W, y: DOC_H },
        { x: 0, y: DOC_H },
      ];
    }

    const halfW = (this.camera.right - this.camera.left) / (2 * this.camera.zoom);
    const halfH = (this.camera.top - this.camera.bottom) / (2 * this.camera.zoom);
    const cx = this.camera.position.x;
    const cy = this.camera.position.y;
    const rot = this.rotationVal;
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);

    // 4 local viewport corners [-halfW, halfH], [halfW, halfH], [halfW, -halfH], [-halfW, -halfH]
    const localCorners = [
      { x: -halfW, y: halfH },
      { x: halfW, y: halfH },
      { x: halfW, y: -halfH },
      { x: -halfW, y: -halfH },
    ];

    const scaleX = this.flippedHVal ? -1 : 1;
    const scaleY = this.flippedVVal ? -1 : 1;

    return localCorners.map((lc) => {
      // Rotate by camera rotation
      const wx = cx + (lc.x * cos - lc.y * sin);
      const wy = cy + (lc.x * sin + lc.y * cos);

      // Unapply flip to find document UV
      const localMeshX = wx / scaleX;
      const localMeshY = wy / scaleY;

      const uvX = localMeshX / 16 + 0.5;
      const uvY = localMeshY / 9 + 0.5;

      return {
        x: uvX * DOC_W,
        y: (1 - uvY) * DOC_H,
      };
    });
  }

  private ndcToWorldX(ndcX: number, zoom: number): number {
    if (!this.camera) return 0;
    const viewW = (this.camera.right - this.camera.left) / zoom;
    return this.camera.position.x + (ndcX * viewW) / 2;
  }

  private ndcToWorldY(ndcY: number, zoom: number): number {
    if (!this.camera) return 0;
    const viewH = (this.camera.top - this.camera.bottom) / zoom;
    return this.camera.position.y + (ndcY * viewH) / 2;
  }

  private createHudElement(): void {
    if (this.hudElement) return;
    const el = document.createElement('div');
    el.className = 'csp-viewport-hud';
    el.style.position = 'fixed';
    el.style.top = '60px';
    el.style.left = '50%';
    el.style.transform = 'translateX(-50%)';
    el.style.background = 'rgba(20, 20, 20, 0.85)';
    el.style.color = '#ffffff';
    el.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    el.style.padding = '6px 14px';
    el.style.borderRadius = '18px';
    el.style.fontFamily = 'var(--font-family, sans-serif)';
    el.style.fontSize = '12px';
    el.style.fontWeight = '600';
    el.style.letterSpacing = '0.3px';
    el.style.pointerEvents = 'none';
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    el.style.zIndex = '500';
    el.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    el.style.backdropFilter = 'blur(6px)';
    document.body.appendChild(el);
    this.hudElement = el;
  }

  public showHUD(text: string): void {
    if (!this.hudElement) this.createHudElement();
    if (!this.hudElement) return;

    this.hudElement.textContent = text;
    this.hudElement.style.opacity = '1';
    this.hudElement.style.transform = 'translateX(-50%) translateY(0)';

    if (this.hudTimeout !== null) {
      window.clearTimeout(this.hudTimeout);
    }
    this.hudTimeout = window.setTimeout(() => {
      if (this.hudElement) {
        this.hudElement.style.opacity = '0';
        this.hudElement.style.transform = 'translateX(-50%) translateY(-6px)';
      }
      this.hudTimeout = null;
    }, 1100);
  }
}

export const viewportNav = new ViewportNavigationManager();
