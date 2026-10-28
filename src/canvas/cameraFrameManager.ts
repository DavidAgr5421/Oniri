export interface CameraFrameState {
  enabled: boolean;
  outputWidth: number;
  outputHeight: number;
  offsetX: number;
  offsetY: number;
  zoom: number; // Camera zoom factor (1.0 = 100%)
  rotation: number; // Camera rotation in degrees
  showFrame: boolean;
  showMask: boolean;
  maskOpacity: number;
  showSafeMargin: boolean;
  actionSafePercent: number;
  titleSafePercent: number;
}

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

class CameraFrameManager {
  private state: CameraFrameState = {
    enabled: false,
    outputWidth: 1920,
    outputHeight: 1080,
    offsetX: 0,
    offsetY: 0,
    zoom: 1.0,
    rotation: 0,
    showFrame: true,
    showMask: true,
    maskOpacity: 0.42,
    showSafeMargin: false,
    actionSafePercent: 90,
    titleSafePercent: 80,
  };

  private listeners = new Set<(state: CameraFrameState) => void>();

  public getState(): CameraFrameState {
    return { ...this.state };
  }

  public update(patch: Partial<CameraFrameState>): void {
    Object.assign(this.state, patch);
    this.notify();
  }

  public configure(config: {
    enabled: boolean;
    outputWidth?: number;
    outputHeight?: number;
    offsetX?: number;
    offsetY?: number;
    zoom?: number;
    rotation?: number;
    showFrame?: boolean;
    showMask?: boolean;
    showSafeMargin?: boolean;
  }): void {
    this.state.enabled = config.enabled;
    if (config.outputWidth !== undefined) this.state.outputWidth = Math.max(32, config.outputWidth);
    if (config.outputHeight !== undefined) this.state.outputHeight = Math.max(32, config.outputHeight);
    if (config.offsetX !== undefined) this.state.offsetX = config.offsetX;
    if (config.offsetY !== undefined) this.state.offsetY = config.offsetY;
    if (config.zoom !== undefined) this.state.zoom = Math.max(0.01, config.zoom);
    if (config.rotation !== undefined) this.state.rotation = config.rotation;
    if (config.showFrame !== undefined) this.state.showFrame = config.showFrame;
    if (config.showMask !== undefined) this.state.showMask = config.showMask;
    if (config.showSafeMargin !== undefined) this.state.showSafeMargin = config.showSafeMargin;
    this.notify();
  }

  public toggleFrame(force?: boolean): void {
    this.state.showFrame = force !== undefined ? force : !this.state.showFrame;
    this.notify();
  }

  public toggleMask(force?: boolean): void {
    this.state.showMask = force !== undefined ? force : !this.state.showMask;
    this.notify();
  }

  public toggleSafeMargin(force?: boolean): void {
    this.state.showSafeMargin = force !== undefined ? force : !this.state.showSafeMargin;
    this.notify();
  }

  public getEffectiveCropRect(docW: number, docH: number): CropRect {
    if (!this.state.enabled) {
      return { x: 0, y: 0, w: docW, h: docH };
    }
    const zoom = Math.max(0.01, this.state.zoom || 1.0);
    const w = Math.min(docW, Math.round(this.state.outputWidth / zoom));
    const h = Math.min(docH, Math.round(this.state.outputHeight / zoom));
    const x = Math.max(0, Math.min(docW - w, Math.round((docW - w) / 2 + this.state.offsetX)));
    const y = Math.max(0, Math.min(docH - h, Math.round((docH - h) / 2 + this.state.offsetY)));
    return { x, y, w, h };
  }

  public subscribe(cb: (state: CameraFrameState) => void): () => void {
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
}

export const cameraFrameManager = new CameraFrameManager();
