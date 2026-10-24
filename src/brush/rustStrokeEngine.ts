import initWasm, {
  BrushDynamicsConfig,
  StrokeEngineCore,
  init_engine_hooks,
} from '../wasm/oniri-brush-core/oniri_brush_core';

export interface StrokeDynamicsInput {
  baseSize: number;
  minSizeRatio: number;
  spacingRatio: number;
  pressureGamma: number;
  velocitySizeEnabled?: boolean;
  velocityMinRatio?: number;
}

export interface RustDabsBatch {
  dabs: Float32Array; // Stride 5: [x, y, size, opacity, angle]
  count: number;
  dirtyRect: [number, number, number, number]; // [minX, minY, maxX, maxY]
}

class RustStrokeEngineWrapper {
  private core: StrokeEngineCore | null = null;
  private wasmMemory: WebAssembly.Memory | null = null;
  private isReady = false;
  private initPromise: Promise<boolean> | null = null;

  async init(): Promise<boolean> {
    if (this.isReady) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        const wasmExports = await initWasm();
        this.wasmMemory = wasmExports.memory;
        try {
          init_engine_hooks();
        } catch {
          // Hooks already initialized or optional
        }

        const defaultConfig = new BrushDynamicsConfig(
          6.0,
          0.15,
          0.12,
          1.0,
          false,
          0.35,
        );
        this.core = new StrokeEngineCore(defaultConfig);
        this.isReady = true;
        console.log('[Oniri] Rust Stroke Engine Core initialized successfully (Wasm + SIMD).');
        return true;
      } catch (err) {
        console.warn('[Oniri] Could not initialize Rust Wasm Stroke Engine, using JS fallback:', err);
        this.isReady = false;
        return false;
      }
    })();

    return this.initPromise;
  }

  get available(): boolean {
    return this.isReady && this.core !== null && this.wasmMemory !== null;
  }

  startStroke(x: number, y: number, pressure: number, timeMs: number, config: StrokeDynamicsInput): boolean {
    if (!this.available || !this.core) return false;

    const rustConfig = new BrushDynamicsConfig(
      config.baseSize,
      config.minSizeRatio,
      config.spacingRatio,
      config.pressureGamma,
      !!config.velocitySizeEnabled,
      config.velocityMinRatio ?? 0.35,
    );
    this.core.update_config(rustConfig);
    this.core.begin_stroke(x, y, pressure, timeMs);
    return true;
  }

  addPoint(x: number, y: number, pressure: number, timeMs: number): RustDabsBatch | null {
    if (!this.available || !this.core || !this.wasmMemory) return null;

    const count = this.core.add_point(x, y, pressure, timeMs);
    if (count === 0) return null;

    const ptr = this.core.get_dabs_ptr();
    const len = this.core.get_dabs_len();
    // Zero-copy direct memory view on WebAssembly linear buffer
    const dabs = new Float32Array(this.wasmMemory.buffer, ptr, len);
    const rect = this.core.get_dirty_rect();
    const dirtyRect: [number, number, number, number] = [rect[0], rect[1], rect[2], rect[3]];

    return {
      dabs,
      count,
      dirtyRect,
    };
  }

  endStroke(): void {
    if (this.core) {
      this.core.end_stroke();
    }
  }
}

export const rustStrokeEngine = new RustStrokeEngineWrapper();
