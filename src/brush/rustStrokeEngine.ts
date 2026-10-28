import initWasm, {
  BoneIKCore,
  BoneSkinCore,
  BrushDynamicsConfig,
  ClipTileCore,
  ClipTimelineParser,
  ColorBlendCore,
  ColorSamplerCore,
  FastLayerCompositor,
  FilterCore,
  FloodFillCore,
  FrameCacheCore,
  HistoryCompressorCore,
  GifEncoderCore,
  ResampleMode,
  SelectionCore,
  SmartFillCore,
  SparseTileGrid,
  StrokeEngineCore,
  StrokeStabilizerCore,
  TransformResampleCore,
  init_engine_hooks,
} from '../wasm/oniri-brush-core/oniri_brush_core';
import type { BrushSettings, TipTextureId } from '../tools/toolState';

export const DAB_STRIDE = 11;

export interface RustDabsBatch {
  /** Stride 11: [x, y, diameter, pressure, alpha, angleRad, tipIndex, r, g, b, flags] */
  dabs: Float32Array;
  count: number;
  dirtyRect: [number, number, number, number];
}

export interface RustSdfStampParams {
  size: number;
  diameter: number;
  hardness: number;
  cr: number;
  cg: number;
  cb: number;
  aaWidth: number;
  threshold: boolean;
  shapeCode: number; // 0 = circle, 1 = box, 2 = calligraphic
  scaleY: number;
  matMode: number; // 0 = none, 1 = gasa, 2 = real-g, 3 = pencil/ink/bristle, 4 = generic
  matW: number;
  matH: number;
  matRgba: Uint8Array;
}

export interface RustFillMaskResult {
  mask: Uint8Array;
  bounds: [number, number, number, number]; // [minX, minY, maxX, maxY]
}

const EMPTY_MAT = new Uint8Array(0);

export const BLEND_MODE_MAP: Record<string, number> = {
  'source-over': 0,
  'multiply': 1,
  'screen': 2,
  'overlay': 3,
  'darken': 4,
  'lighten': 5,
  'color-dodge': 6,
  'color-burn': 7,
  'hard-light': 8,
  'soft-light': 9,
  'difference': 10,
  'exclusion': 11,
  'lighter': 12,
  'linear-dodge': 12,
  'linear-burn': 13,
  'vivid-light': 14,
  'pin-light': 15,
  'hard-mix': 16,
};

function getTipsList(s: BrushSettings): TipTextureId[] {
  const mode = s.tipCycleMode ?? 'random';
  if (mode === 'single') {
    return s.tipTexture && s.tipTexture !== 'default' ? [s.tipTexture] : [];
  }
  if (s.tipTextures && s.tipTextures.length > 0) {
    return s.tipTextures;
  }
  return s.tipTexture && s.tipTexture !== 'default' ? [s.tipTexture] : [];
}

function buildRustConfig(s: BrushSettings, isMouse: boolean): BrushDynamicsConfig {
  const tipsList = getTipsList(s);
  const mode = s.tipCycleMode ?? 'random';
  const cycleCode =
    mode === 'single' ? 0 : mode === 'sequential' ? 1 : mode === 'reverse' ? 2 : 3;
  const shapeCode =
    s.tipShape === 'square' ? 1 : s.tipShape === 'calligraphic' ? 2 : 0;
  const isCustomTip = !!(s.tipTexture && s.tipTexture !== 'default');
  const isRainTip =
    s.tipTexture === 'rain-1' ||
    s.tipTexture === 'rain-2' ||
    tipsList.includes('rain-1') ||
    tipsList.includes('rain-2');

  return new BrushDynamicsConfig(
    s.size,
    s.minSizeRatio,
    s.spacing,
    !!s.pressureSize,
    s.pressureCurve,
    s.taperStart ?? 0,
    !!s.velocitySize,
    s.velocityMinRatio ?? 0.35,
    s.velocityCurve ?? 1.0,
    s.randomSizeRatio ?? 1.0,
    s.flow,
    !!s.pressureFlow,
    !!s.velocityFlow,
    s.inkMode === 'uniform',
    !!s.ribbon,
    !!s.followDirection,
    isCustomTip,
    shapeCode,
    s.tipAngle ?? 0,
    cycleCode,
    tipsList.length,
    !!s.spray,
    Math.max(1, Math.round(s.sprayDensity ?? 5)),
    s.sprayRadius ?? 0,
    isRainTip,
    isMouse,
  );
}

class RustStrokeEngineWrapper {
  private core: StrokeEngineCore | null = null;
  private fillCore: SmartFillCore | null = null;
  private boneCore: BoneSkinCore | null = null;
  private gifCore: GifEncoderCore | null = null;
  private stabilizerCore: StrokeStabilizerCore | null = null;
  private frameCache: FrameCacheCore | null = null;
  private wasmMemory: WebAssembly.Memory | null = null;
  private isReady = false;
  private initPromise: Promise<boolean> | null = null;
  private activeTipsList: TipTextureId[] = [];

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
          true,
          1.0,
          0.0,
          false,
          0.35,
          1.0,
          1.0,
          1.0,
          false,
          false,
          true,
          false,
          false,
          false,
          0,
          0.0,
          0,
          0,
          false,
          1,
          0.0,
          false,
          false,
        );
        this.core = new StrokeEngineCore(defaultConfig);
        this.fillCore = new SmartFillCore();
        this.boneCore = new BoneSkinCore();
        this.gifCore = new GifEncoderCore();
        this.stabilizerCore = new StrokeStabilizerCore();
        this.frameCache = new FrameCacheCore(64);
        this.isReady = true;
        console.log('[Oniri] Rust Stroke Engine Core initialized and active (Wasm + Zero-Copy).');
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

  private readBatch(count: number): RustDabsBatch | null {
    if (count === 0 || !this.core || !this.wasmMemory) return null;
    const ptr = this.core.get_dabs_ptr();
    const len = this.core.get_dabs_len();
    // Zero-copy Float32Array view directly over WebAssembly linear memory
    const dabs = new Float32Array(this.wasmMemory.buffer, ptr, len);
    const rect = this.core.get_dirty_rect();
    const dirtyRect: [number, number, number, number] = [rect[0], rect[1], rect[2], rect[3]];
    return { dabs, count, dirtyRect };
  }

  startStroke(
    x: number,
    y: number,
    pressure: number,
    settings: BrushSettings,
    isMouse: boolean,
  ): RustDabsBatch | null {
    if (!this.available || !this.core) return null;
    this.activeTipsList = getTipsList(settings);
    const rustConfig = buildRustConfig(settings, isMouse);
    this.core.update_config(rustConfig);
    const count = this.core.begin_stroke(x, y, pressure);
    return this.readBatch(count);
  }

  setSpeed(speed: number): void {
    if (this.core) {
      this.core.set_speed(speed);
    }
  }

  addPoint(x: number, y: number, pressure: number): RustDabsBatch | null {
    if (!this.available || !this.core) return null;
    const count = this.core.add_point(x, y, pressure);
    return this.readBatch(count);
  }

  predictStrokeBatch(pointsFlat: Float32Array): RustDabsBatch | null {
    if (!this.available || !this.core) return null;
    const coreAny = this.core as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof coreAny.predict_stroke_batch !== 'function') return null;
    try {
      const count = Number(coreAny.predict_stroke_batch(pointsFlat));
      return this.readBatch(count);
    } catch (e) {
      console.warn('WASM predictStrokeBatch fallback:', e);
      return null;
    }
  }

  predictBezierStroke(
    startX: number,
    startY: number,
    startP: number,
    targetX: number,
    targetY: number,
    targetP: number,
    velX: number,
    velY: number,
  ): RustDabsBatch | null {
    if (!this.available || !this.core) return null;
    const coreAny = this.core as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof coreAny.predict_bezier_stroke !== 'function') return null;
    try {
      const count = Number(
        coreAny.predict_bezier_stroke(startX, startY, startP, targetX, targetY, targetP, velX, velY),
      );
      return this.readBatch(count);
    } catch (e) {
      console.warn('WASM predictBezierStroke fallback:', e);
      return null;
    }
  }

  saveCheckpoint(): void {
    if (this.core) {
      this.core.save_checkpoint();
    }
  }

  restoreCheckpoint(): void {
    if (this.core) {
      this.core.restore_checkpoint();
    }
  }

  resolveTipFromIndex(tipIndex: number, fallbackTip?: TipTextureId): TipTextureId | undefined {
    const idx = Math.round(tipIndex);
    if (idx >= 0 && idx < this.activeTipsList.length) {
      return this.activeTipsList[idx];
    }
    return fallbackTip && fallbackTip !== 'default' ? fallbackTip : undefined;
  }

  buildSdfStamp(params: RustSdfStampParams): Uint8ClampedArray | null {
    if (!this.available || !this.core || !this.wasmMemory) return null;
    const len = this.core.build_sdf_stamp(
      params.size,
      params.diameter,
      params.hardness,
      params.cr,
      params.cg,
      params.cb,
      params.aaWidth,
      params.threshold,
      params.shapeCode,
      params.scaleY,
      params.matMode,
      params.matW,
      params.matH,
      params.matRgba.length > 0 ? params.matRgba : EMPTY_MAT,
    );
    if (len === 0) return null;
    const ptr = this.core.get_stamp_ptr();
    return new Uint8ClampedArray(this.wasmMemory.buffer, ptr, len);
  }

  endStroke(): void {
    if (this.core) {
      this.core.end_stroke();
    }
  }

  setSelectionMask(
    maskRgba: Uint8Array | Uint8ClampedArray,
    width: number,
    height: number,
    boundsMinX: number,
    boundsMinY: number,
    boundsMaxX: number,
    boundsMaxY: number,
    isRgba = true,
  ): void {
    if (!this.available || !this.core) return;
    const coreAny = this.core as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof coreAny.set_selection_mask !== 'function') return;
    try {
      const u8 = new Uint8Array(maskRgba.buffer, maskRgba.byteOffset, maskRgba.byteLength);
      coreAny.set_selection_mask(
        u8,
        width,
        height,
        boundsMinX,
        boundsMinY,
        boundsMaxX,
        boundsMaxY,
        isRgba,
      );
    } catch (e) {
      console.warn('WASM setSelectionMask fallback:', e);
    }
  }

  clearSelectionMask(): void {
    if (!this.available || !this.core) return;
    const coreAny = this.core as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof coreAny.clear_selection_mask === 'function') {
      try {
        coreAny.clear_selection_mask();
      } catch (e) {
        console.warn('WASM clearSelectionMask fallback:', e);
      }
    }
  }

  setStrokeColor(
    primaryR: number,
    primaryG: number,
    primaryB: number,
    secondaryR: number,
    secondaryG: number,
    secondaryB: number,
    hasSubColorMix: boolean,
    colorMix: number,
    colorMixAlpha: number,
    smudge: number,
    isErase: boolean,
  ): void {
    if (!this.available || !this.core) return;
    this.core.set_stroke_color(
      primaryR,
      primaryG,
      primaryB,
      secondaryR,
      secondaryG,
      secondaryB,
      hasSubColorMix,
      colorMix,
      colorMixAlpha,
      smudge,
      isErase,
    );
  }

  setCanvasSnapshot(
    snapshotData: Uint8Array | Uint8ClampedArray,
    width: number,
    height: number,
  ): void {
    if (!this.available || !this.core) return;
    const bytes = snapshotData instanceof Uint8Array
      ? snapshotData
      : new Uint8Array(snapshotData.buffer, snapshotData.byteOffset, snapshotData.byteLength);
    this.core.set_canvas_snapshot(bytes, width, height);
  }

  clearCanvasSnapshot(): void {
    if (!this.available || !this.core) return;
    this.core.clear_canvas_snapshot();
  }

  hasSelectionMask(): boolean {
    if (!this.available || !this.core) return false;
    const coreAny = this.core as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof coreAny.has_selection === 'function') {
      try {
        return !!coreAny.has_selection();
      } catch {
        return false;
      }
    }
    return false;
  }

  private readFillMaskResult(totalPixels: number, filledCount: number): RustFillMaskResult | null {
    if (filledCount === 0 || !this.fillCore || !this.wasmMemory) return null;
    const ptr = this.fillCore.get_mask_ptr();
    const mask = new Uint8Array(this.wasmMemory.buffer, ptr, totalPixels);
    const b = this.fillCore.get_bounds();
    return {
      mask,
      bounds: [b[0], b[1], b[2], b[3]],
    };
  }

  computeSmartFillMask(
    boundaryData: Uint8ClampedArray,
    docW: number,
    docH: number,
    seedX: number,
    seedY: number,
    tolerance: number,
    closeGap: number,
    areaScaling: number,
    isMultiLayer: boolean,
  ): RustFillMaskResult | null {
    if (!this.available || !this.fillCore) return null;
    const bytes = new Uint8Array(
      boundaryData.buffer,
      boundaryData.byteOffset,
      boundaryData.byteLength,
    );
    const count = this.fillCore.compute_smart_fill_mask(
      bytes,
      docW,
      docH,
      seedX,
      seedY,
      tolerance,
      Math.round(closeGap),
      Math.round(areaScaling),
      isMultiLayer,
    );
    return this.readFillMaskResult(docW * docH, count);
  }

  computeEncloseFillMask(
    boundaryData: Uint8ClampedArray,
    targetData: Uint8ClampedArray,
    lassoData: Uint8ClampedArray,
    rw: number,
    rh: number,
    closeGap: number,
    areaScaling: number,
  ): RustFillMaskResult | null {
    if (!this.available || !this.fillCore) return null;
    const bBytes = new Uint8Array(boundaryData.buffer, boundaryData.byteOffset, boundaryData.byteLength);
    const tBytes = new Uint8Array(targetData.buffer, targetData.byteOffset, targetData.byteLength);
    const lBytes = new Uint8Array(lassoData.buffer, lassoData.byteOffset, lassoData.byteLength);
    const count = this.fillCore.compute_enclose_fill_mask(
      bBytes,
      tBytes,
      lBytes,
      rw,
      rh,
      Math.round(closeGap),
      Math.round(areaScaling),
    );
    return this.readFillMaskResult(rw * rh, count);
  }

  computeUnfilledAreaMask(
    boundaryData: Uint8ClampedArray,
    targetData: Uint8ClampedArray,
    strokeData: Uint8ClampedArray,
    rw: number,
    rh: number,
    closeGap: number,
    areaScaling: number,
  ): RustFillMaskResult | null {
    if (!this.available || !this.fillCore) return null;
    const bBytes = new Uint8Array(boundaryData.buffer, boundaryData.byteOffset, boundaryData.byteLength);
    const tBytes = new Uint8Array(targetData.buffer, targetData.byteOffset, targetData.byteLength);
    const sBytes = new Uint8Array(strokeData.buffer, strokeData.byteOffset, strokeData.byteLength);
    const count = this.fillCore.compute_unfilled_area_mask(
      bBytes,
      tBytes,
      sBytes,
      rw,
      rh,
      Math.round(closeGap),
      Math.round(areaScaling),
    );
    return this.readFillMaskResult(rw * rh, count);
  }

  dilateBinaryMask(src: Uint8Array, w: number, h: number, radius: number): Uint8Array | null {
    if (!this.available || !this.fillCore) return null;
    const fillAny = this.fillCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof fillAny.dilate_binary_mask !== 'function') return null;
    try {
      const res = fillAny.dilate_binary_mask(src, w, h, Math.round(radius)) as Uint8Array | null;
      return res && res.length === w * h ? (res instanceof Uint8Array ? res : new Uint8Array(res)) : null;
    } catch {
      return null;
    }
  }

  erodeBinaryMask(src: Uint8Array, w: number, h: number, radius: number): Uint8Array | null {
    if (!this.available || !this.fillCore) return null;
    const fillAny = this.fillCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof fillAny.erode_binary_mask !== 'function') return null;
    try {
      const res = fillAny.erode_binary_mask(src, w, h, Math.round(radius)) as Uint8Array | null;
      return res && res.length === w * h ? (res instanceof Uint8Array ? res : new Uint8Array(res)) : null;
    } catch {
      return null;
    }
  }

  scanLayerBounds(
    rgba: Uint8ClampedArray,
    w: number,
    h: number,
    step = 4,
    pad = 24,
  ): [number, number, number, number] | null {
    if (!this.available || !this.boneCore) return null;
    const bytes = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
    const res = this.boneCore.scan_layer_bounds(bytes, w, h, step, pad);
    return [res[0], res[1], res[2], res[3]];
  }

  buildMeshVertices(
    minX: number,
    minY: number,
    bw: number,
    bh: number,
    cols: number,
    rows: number,
    boneSegments: Float32Array,
  ): Float32Array | null {
    if (!this.available || !this.boneCore || !this.wasmMemory) return null;
    const count = this.boneCore.build_mesh_vertices(
      minX,
      minY,
      bw,
      bh,
      cols,
      rows,
      boneSegments,
    );
    if (count === 0) return null;
    const ptr = this.boneCore.get_vertices_ptr();
    const len = this.boneCore.get_vertices_len();
    // Copy once so cached mesh vertices persist across frames
    return new Float32Array(new Float32Array(this.wasmMemory.buffer, ptr, len));
  }

  computeSkinnedTriangles(
    packedVertices: Float32Array,
    packedIndices: Uint32Array,
    skinMatrices: Float32Array,
    bx: number,
    by: number,
    bw: number,
    bh: number,
  ): { triangles: Float32Array; count: number } | null {
    if (!this.available || !this.boneCore || !this.wasmMemory) return null;
    const count = this.boneCore.compute_skinned_triangles(
      packedVertices,
      packedIndices,
      skinMatrices,
      bx,
      by,
      bw,
      bh,
    );
    if (count === 0) return null;
    const ptr = this.boneCore.get_triangles_ptr();
    const len = this.boneCore.get_triangles_len();
    const triangles = new Float32Array(this.wasmMemory.buffer, ptr, len);
    return { triangles, count };
  }

  quantizeRgbaFrame(
    rgba: Uint8ClampedArray,
    width: number,
    height: number,
  ): {
    palette: [number, number, number][];
    indexedPixels: Uint8Array;
    transparentIndex: number;
  } | null {
    if (!this.available || !this.gifCore || !this.wasmMemory) return null;
    const bytes = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
    const transparentIndex = this.gifCore.quantize_rgba(bytes, width, height);
    const palPtr = this.gifCore.get_palette_ptr();
    const palLen = this.gifCore.get_palette_len();
    const palBytes = new Uint8Array(this.wasmMemory.buffer, palPtr, palLen);
    const palette: [number, number, number][] = [];
    for (let i = 0; i < palLen; i += 3) {
      palette.push([palBytes[i], palBytes[i + 1], palBytes[i + 2]]);
    }
    const idxPtr = this.gifCore.get_indexed_ptr();
    const idxLen = this.gifCore.get_indexed_len();
    const indexedPixels = new Uint8Array(new Uint8Array(this.wasmMemory.buffer, idxPtr, idxLen));
    return { palette, indexedPixels, transparentIndex };
  }

  encodeLzwFrame(indexedPixels: Uint8Array, colorDepth: number): Uint8Array | null {
    if (!this.available || !this.gifCore || !this.wasmMemory) return null;
    const len = this.gifCore.encode_lzw_frame(indexedPixels, colorDepth);
    if (len === 0) return null;
    const ptr = this.gifCore.get_lzw_ptr();
    return new Uint8Array(this.wasmMemory.buffer, ptr, len);
  }

  computeSelectionBounds(
    buffer: Uint8Array,
    width: number,
    height: number,
    isRgba = true,
  ): [number, number, number, number, number, number] | null {
    if (!this.available) return null;
    try {
      const res = SelectionCore.compute_bounds(buffer, width, height, isRgba);
      if (res.length < 6) return null;
      return [res[0], res[1], res[2], res[3], res[4], res[5]];
    } catch (e) {
      console.warn('WASM SelectionCore.compute_bounds fallback:', e);
      return null;
    }
  }

  morphologyExpand(
    srcBuffer: Uint8Array,
    width: number,
    height: number,
    radius: number,
    isRgba = true,
  ): Uint8Array | null {
    if (!this.available) return null;
    try {
      return SelectionCore.morphology_expand(srcBuffer, width, height, radius, isRgba);
    } catch (e) {
      console.warn('WASM SelectionCore.morphology_expand fallback:', e);
      return null;
    }
  }

  morphologyContract(
    srcBuffer: Uint8Array,
    width: number,
    height: number,
    radius: number,
    isRgba = true,
  ): Uint8Array | null {
    if (!this.available) return null;
    try {
      return SelectionCore.morphology_contract(srcBuffer, width, height, radius, isRgba);
    } catch (e) {
      console.warn('WASM SelectionCore.morphology_contract fallback:', e);
      return null;
    }
  }

  magicWandSelection(
    rgba: Uint8Array,
    width: number,
    height: number,
    seedX: number,
    seedY: number,
    tolerance: number,
    contiguous = true,
    antialias = true,
  ): Uint8Array | null {
    if (!this.available) return null;
    const selAny = SelectionCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof selAny.magic_wand_selection !== 'function') return null;
    try {
      const res = selAny.magic_wand_selection(
        rgba,
        width,
        height,
        seedX,
        seedY,
        tolerance,
        contiguous,
        antialias,
      ) as Uint8Array | null;
      return res && res.length === width * height * 4 ? (res instanceof Uint8Array ? res : new Uint8Array(res)) : null;
    } catch {
      return null;
    }
  }

  featherSelection(
    maskRgba: Uint8Array,
    width: number,
    height: number,
    radius: number,
  ): Uint8Array | null {
    if (!this.available) return null;
    const selAny = SelectionCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof selAny.feather_selection !== 'function') return null;
    try {
      const res = selAny.feather_selection(maskRgba, width, height, radius) as Uint8Array | null;
      return res && res.length === width * height * 4 ? (res instanceof Uint8Array ? res : new Uint8Array(res)) : null;
    } catch {
      return null;
    }
  }

  borderSelection(
    maskRgba: Uint8Array,
    width: number,
    height: number,
    radius: number,
    position: number, // 0 = inside, 1 = center, 2 = outside
  ): Uint8Array | null {
    if (!this.available) return null;
    const selAny = SelectionCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof selAny.border_selection !== 'function') return null;
    try {
      const res = selAny.border_selection(maskRgba, width, height, radius, position) as Uint8Array | null;
      return res && res.length === width * height * 4 ? (res instanceof Uint8Array ? res : new Uint8Array(res)) : null;
    } catch {
      return null;
    }
  }

  extractBoundaryMask(
    srcBuffer: Uint8Array,
    width: number,
    height: number,
    isRgba = true,
  ): Uint8Array | null {
    if (!this.available) return null;
    try {
      return SelectionCore.extract_boundary_mask(srcBuffer, width, height, isRgba);
    } catch (e) {
      console.warn('WASM SelectionCore.extract_boundary_mask fallback:', e);
      return null;
    }
  }

  extractBoundarySegments(
    srcBuffer: Uint8Array,
    width: number,
    height: number,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    isRgba = true,
  ): Float32Array | null {
    if (!this.available) return null;
    try {
      const fn = (SelectionCore as any).extract_boundary_segments;
      if (typeof fn === 'function') {
        const res = fn(srcBuffer, width, height, minX, minY, maxX, maxY, isRgba);
        return new Float32Array(res);
      }
      return null;
    } catch (e) {
      console.warn('WASM SelectionCore.extract_boundary_segments fallback:', e);
      return null;
    }
  }

  invertMask(srcRgba: Uint8Array, width: number, height: number): Uint8Array | null {
    if (!this.available) return null;
    try {
      return SelectionCore.invert_mask(srcRgba, width, height);
    } catch (e) {
      console.warn('WASM SelectionCore.invert_mask fallback:', e);
      return null;
    }
  }

  blitPlanarTile(
    destRgba: Uint8Array,
    docW: number,
    docH: number,
    decompPlanes: Uint8Array,
    startX: number,
    startY: number,
    isMonochrome: boolean,
  ): boolean {
    if (!this.available) return false;
    try {
      return ClipTileCore.blit_planar_tile(
        destRgba,
        docW,
        docH,
        decompPlanes,
        startX,
        startY,
        isMonochrome,
      );
    } catch (e) {
      console.warn('WASM ClipTileCore.blit_planar_tile fallback:', e);
      return false;
    }
  }

  decompressAndBlitTile(
    destRgba: Uint8Array,
    docW: number,
    docH: number,
    compressedData: Uint8Array,
    startX: number,
    startY: number,
    isMonochrome: boolean,
  ): boolean {
    if (!this.available) return false;
    try {
      return ClipTileCore.decompress_and_blit_tile(
        destRgba,
        docW,
        docH,
        compressedData,
        startX,
        startY,
        isMonochrome,
      );
    } catch (e) {
      console.warn('WASM ClipTileCore.decompress_and_blit_tile fallback:', e);
      return false;
    }
  }

  // --- Native Clip Studio Paint Timeline & Track Parser in Rust ---
  cleanUuid(rawUuid: string): string {
    if (!rawUuid) return '';
    if (this.available) {
      try {
        return ClipTimelineParser.clean_uuid(rawUuid);
      } catch {}
    }
    return rawUuid.replace(/[^0-9a-fA-F]/g, '').toLowerCase();
  }

  parseTrackMixerExposures(chunkBytes: Uint8Array): { cel_names: string[]; exposures: Record<string, number> } | null {
    if (!this.available) return null;
    try {
      const jsonStr = ClipTimelineParser.parse_track_exposures(chunkBytes);
      if (!jsonStr || jsonStr === '{}') return null;
      return JSON.parse(jsonStr);
    } catch (e) {
      console.warn('WASM ClipTimelineParser.parse_track_exposures fallback:', e);
      return null;
    }
  }

  cropRgbaRect(
    srcRgba: Uint8Array | Uint8ClampedArray,
    docW: number,
    docH: number,
    cropX: number,
    cropY: number,
    cropW: number,
    cropH: number,
    outRgba: Uint8Array | Uint8ClampedArray,
  ): boolean {
    if (!this.available) return false;
    try {
      const src = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const out = new Uint8Array(outRgba.buffer, outRgba.byteOffset, outRgba.byteLength);
      return HistoryCompressorCore.crop_rgba_rect(
        src,
        docW,
        docH,
        cropX,
        cropY,
        cropW,
        cropH,
        out,
      );
    } catch (e) {
      console.warn('WASM HistoryCompressorCore.crop_rgba_rect fallback:', e);
      return false;
    }
  }

  private historyCodec: HistoryCompressorCore | null = null;

  /** Comprime RGBA a QOI en Rust (copia propia, segura tras crecer la memoria WASM). Retorna null si no disponible. */
  qoiEncode(rgba: Uint8Array | Uint8ClampedArray, width: number, height: number): Uint8Array | null {
    if (!this.available || !this.wasmMemory) return null;
    try {
      if (!this.historyCodec) this.historyCodec = new HistoryCompressorCore();
      const src = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      const len = this.historyCodec.compress_rgba(src, width, height);
      if (len === 0) return null;
      const ptr = this.historyCodec.get_buffer_ptr();
      return new Uint8Array(new Uint8Array(this.wasmMemory.buffer, ptr, len));
    } catch (e) {
      console.warn('WASM QOI encode fallback:', e);
      return null;
    }
  }

  /** Descomprime QOI a RGBA en Rust. Retorna null si no disponible o inválido. */
  qoiDecode(bytes: Uint8Array, width: number, height: number): Uint8ClampedArray | null {
    if (!this.available || !this.wasmMemory) return null;
    try {
      if (!this.historyCodec) this.historyCodec = new HistoryCompressorCore();
      const len = this.historyCodec.decompress_qoi(bytes, width, height);
      if (len === 0) return null;
      const ptr = this.historyCodec.get_buffer_ptr();
      return new Uint8ClampedArray(new Uint8ClampedArray(this.wasmMemory.buffer, ptr, len));
    } catch (e) {
      console.warn('WASM QOI decode fallback:', e);
      return null;
    }
  }

  sampleRgba(
    buffer: Uint8Array,
    width: number,
    height: number,
    x: number,
    y: number,
  ): [number, number, number, number] | null {
    if (!this.available) return null;
    try {
      const res = ColorSamplerCore.sample_rgba(buffer, width, height, x, y);
      if (res && res.length === 4) {
        return [res[0], res[1], res[2], res[3]];
      }
      return null;
    } catch (e) {
      console.warn('WASM ColorSamplerCore.sample_rgba fallback:', e);
      return null;
    }
  }

  blendDualColor(
    r1: number, g1: number, b1: number,
    r2: number, g2: number, b2: number,
    pressure: number,
  ): [number, number, number] | null {
    if (!this.available) return null;
    try {
      const res = ColorBlendCore.blend_dual_color(r1, g1, b1, r2, g2, b2, pressure);
      return [res[0], res[1], res[2]];
    } catch (e) {
      console.warn('WASM ColorBlendCore.blend_dual_color fallback:', e);
      return null;
    }
  }

  blendColorMix(
    brushR: number, brushG: number, brushB: number,
    sampleR: number, sampleG: number, sampleB: number,
    sampleA: number,
    colorMix: number,
    pressure: number,
  ): [number, number, number] | null {
    if (!this.available) return null;
    try {
      const res = ColorBlendCore.blend_color_mix(
        brushR, brushG, brushB,
        sampleR, sampleG, sampleB,
        sampleA,
        colorMix,
        pressure,
      );
      return [res[0], res[1], res[2]];
    } catch (e) {
      console.warn('WASM ColorBlendCore.blend_color_mix fallback:', e);
      return null;
    }
  }

  stepSmudge(
    currR: number, currG: number, currB: number, currA: number,
    sampleR: number, sampleG: number, sampleB: number, sampleA: number,
    pickRate: number,
  ): [number, number, number, number] | null {
    if (!this.available) return null;
    try {
      const res = ColorBlendCore.step_smudge(
        currR, currG, currB, currA,
        sampleR, sampleG, sampleB, sampleA,
        pickRate,
      );
      return [res[0], res[1], res[2], res[3]];
    } catch (e) {
      console.warn('WASM ColorBlendCore.step_smudge fallback:', e);
      return null;
    }
  }

  applyTintInPlace(
    rgbaBuffer: Uint8Array | Uint8ClampedArray,
    tintR: number,
    tintG: number,
    tintB: number,
  ): boolean {
    if (!this.available) return false;
    try {
      const bytes = new Uint8Array(rgbaBuffer.buffer, rgbaBuffer.byteOffset, rgbaBuffer.byteLength);
      ColorBlendCore.apply_tint_in_place(bytes, tintR, tintG, tintB);
      return true;
    } catch (e) {
      console.warn('WASM ColorBlendCore.apply_tint_in_place fallback:', e);
      return false;
    }
  }

  mergeLayers(
    dstRgba: Uint8ClampedArray,
    srcRgba: Uint8ClampedArray,
    width: number,
    height: number,
    blendMode: string,
    opacity = 1.0,
    lockAlpha = false,
    clipMask?: Uint8ClampedArray,
  ): boolean {
    if (!this.available) return false;
    const blendAny = ColorBlendCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof blendAny.merge_layers_simd !== 'function') return false;
    const modeCode = BLEND_MODE_MAP[blendMode.toLowerCase()] ?? 0;
    try {
      const dst = new Uint8Array(dstRgba.buffer, dstRgba.byteOffset, dstRgba.byteLength);
      const src = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const clip = clipMask
        ? new Uint8Array(clipMask.buffer, clipMask.byteOffset, clipMask.byteLength)
        : EMPTY_MAT;
      return !!blendAny.merge_layers_simd(dst, src, width, height, modeCode, opacity, lockAlpha, clip);
    } catch {
      return false;
    }
  }

  mergeStrokeRect(
    dstRgba: Uint8Array | Uint8ClampedArray,
    srcRgba: Uint8Array | Uint8ClampedArray,
    strideWidth: number,
    strideHeight: number,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    blendMode: string,
    opacity = 1.0,
    lockAlpha = false,
    clipMask?: Uint8Array | Uint8ClampedArray,
  ): boolean {
    if (!this.available) return false;
    const blendAny = ColorBlendCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof blendAny.merge_stroke_rect !== 'function') return false;
    const modeCode = BLEND_MODE_MAP[blendMode.toLowerCase()] ?? 0;
    try {
      const dst = new Uint8Array(dstRgba.buffer, dstRgba.byteOffset, dstRgba.byteLength);
      const src = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const clip = clipMask
        ? new Uint8Array(clipMask.buffer, clipMask.byteOffset, clipMask.byteLength)
        : EMPTY_MAT;
      return !!blendAny.merge_stroke_rect(
        dst,
        src,
        strideWidth,
        strideHeight,
        minX,
        minY,
        maxX,
        maxY,
        modeCode,
        opacity,
        lockAlpha,
        clip,
      );
    } catch {
      return false;
    }
  }

  evaluatePaperTexture(
    grainVal: number,
    baseAlpha: number,
    pressure: number,
    density: number,
    mode: number,
    invert: boolean,
  ): number | null {
    if (!this.available) return null;
    try {
      return ColorBlendCore.evaluate_paper_texture(
        grainVal,
        baseAlpha,
        pressure,
        density,
        mode,
        invert,
      );
    } catch (e) {
      console.warn('WASM ColorBlendCore.evaluate_paper_texture fallback:', e);
      return null;
    }
  }

  generatePaperPatternTile(
    outRgba: Uint8Array | Uint8ClampedArray,
    tileWidth: number,
    tileHeight: number,
    toothMatrix: Float32Array,
    toothWidth: number,
    toothHeight: number,
    density: number,
    mode: number,
    invert: boolean,
  ): boolean {
    if (!this.available) return false;
    const blendAny = ColorBlendCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof blendAny.generate_paper_pattern_tile !== 'function') return false;
    try {
      const bytes = new Uint8Array(outRgba.buffer, outRgba.byteOffset, outRgba.byteLength);
      return !!blendAny.generate_paper_pattern_tile(
        bytes,
        tileWidth,
        tileHeight,
        toothMatrix,
        toothWidth,
        toothHeight,
        density,
        mode,
        invert,
      );
    } catch (e) {
      console.warn('WASM generatePaperPatternTile fallback:', e);
      return false;
    }
  }

  applyPaperGrainRect(
    rgbaBuffer: Uint8Array | Uint8ClampedArray,
    strideWidth: number,
    rectWidth: number,
    rectHeight: number,
    docOriginX: number,
    docOriginY: number,
    toothMatrix: Float32Array,
    toothWidth: number,
    toothHeight: number,
    scale: number,
    density: number,
    mode: number,
    invert: boolean,
  ): boolean {
    if (!this.available) return false;
    const blendAny = ColorBlendCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof blendAny.apply_paper_grain_rect !== 'function') return false;
    try {
      const bytes = new Uint8Array(rgbaBuffer.buffer, rgbaBuffer.byteOffset, rgbaBuffer.byteLength);
      return !!blendAny.apply_paper_grain_rect(
        bytes,
        strideWidth,
        rectWidth,
        rectHeight,
        docOriginX,
        docOriginY,
        toothMatrix,
        toothWidth,
        toothHeight,
        scale,
        density,
        mode,
        invert,
      );
    } catch (e) {
      console.warn('WASM applyPaperGrainRect fallback:', e);
      return false;
    }
  }

  beginStabilizer(x: number, y: number, pressure: number): void {
    if (!this.available || !this.stabilizerCore) return;
    this.stabilizerCore.begin_stroke(x, y, pressure);
  }

  addStabilizerPoint(
    x: number,
    y: number,
    pressure: number,
    stabilization: number,
    isPen: boolean,
  ): { points: Float32Array; count: number; speed: number } | null {
    if (!this.available || !this.stabilizerCore || !this.wasmMemory) return null;
    const count = this.stabilizerCore.add_raw_point(x, y, pressure, stabilization, isPen);
    const speed = this.stabilizerCore.get_speed();
    if (count === 0) {
      return { points: new Float32Array(0), count: 0, speed };
    }
    const ptr = this.stabilizerCore.get_emitted_ptr();
    const len = this.stabilizerCore.get_emitted_len();
    const points = new Float32Array(this.wasmMemory.buffer, ptr, len);
    return { points, count, speed };
  }

  flushStabilizerTail(): { points: Float32Array; count: number } | null {
    if (!this.available || !this.stabilizerCore || !this.wasmMemory) return null;
    const count = this.stabilizerCore.flush_tail();
    if (count === 0) return null;
    const ptr = this.stabilizerCore.get_emitted_ptr();
    const len = this.stabilizerCore.get_emitted_len();
    const points = new Float32Array(this.wasmMemory.buffer, ptr, len);
    return { points, count };
  }

  solveTwoBoneIK(
    rootX: number,
    rootY: number,
    targetX: number,
    targetY: number,
    l1: number,
    l2: number,
    bendPositive: boolean,
    grandparentWorldAngle: number,
    parentRestRotation: number,
    childRestRotation: number,
  ): { parentDRotation: number; childDRotation: number } | null {
    if (!this.available) return null;
    try {
      const res = BoneIKCore.solve_two_bone_ik(
        rootX,
        rootY,
        targetX,
        targetY,
        l1,
        l2,
        bendPositive,
        grandparentWorldAngle,
        parentRestRotation,
        childRestRotation,
      );
      return {
        parentDRotation: res.parent_d_rotation,
        childDRotation: res.child_d_rotation,
      };
    } catch (e) {
      console.warn('WASM BoneIKCore.solve_two_bone_ik fallback:', e);
      return null;
    }
  }

  solveOneBoneAim(
    headX: number,
    headY: number,
    targetX: number,
    targetY: number,
    parentWorldAngle: number,
    restRotation: number,
  ): number | null {
    if (!this.available) return null;
    try {
      return BoneIKCore.solve_one_bone_aim(
        headX,
        headY,
        targetX,
        targetY,
        parentWorldAngle,
        restRotation,
      );
    } catch (e) {
      console.warn('WASM BoneIKCore.solve_one_bone_aim fallback:', e);
      return null;
    }
  }

  distanceToSegment(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number | null {
    if (!this.available) return null;
    try {
      return BoneIKCore.distance_to_segment(px, py, x1, y1, x2, y2);
    } catch (e) {
      console.warn('WASM BoneIKCore.distance_to_segment fallback:', e);
      return null;
    }
  }

  invertColors(rgba: Uint8ClampedArray): boolean {
    if (!this.available) return false;
    try {
      // Pass typed subarray to WASM slice
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      FilterCore.invert_colors(u8);
      return true;
    } catch (e) {
      console.warn('WASM FilterCore.invert_colors fallback:', e);
      return false;
    }
  }

  adjustBrightnessContrast(rgba: Uint8ClampedArray, brightness: number, contrast: number): boolean {
    if (!this.available) return false;
    try {
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      FilterCore.adjust_brightness_contrast(u8, brightness, contrast);
      return true;
    } catch (e) {
      console.warn('WASM FilterCore.adjust_brightness_contrast fallback:', e);
      return false;
    }
  }

  binarize(rgba: Uint8ClampedArray, threshold: number): boolean {
    if (!this.available) return false;
    try {
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      FilterCore.binarize(u8, Math.max(0, Math.min(255, Math.round(threshold))));
      return true;
    } catch (e) {
      console.warn('WASM FilterCore.binarize fallback:', e);
      return false;
    }
  }

  adjustHSV(
    rgba: Uint8ClampedArray,
    hueDeltaDeg: number,
    satScale: number,
    valScale: number,
  ): boolean {
    if (!this.available) return false;
    try {
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      FilterCore.adjust_hsv(u8, hueDeltaDeg, satScale, valScale);
      return true;
    } catch (e) {
      console.warn('WASM FilterCore.adjust_hsv fallback:', e);
      return false;
    }
  }

  gaussianBlur(
    srcRgba: Uint8ClampedArray,
    width: number,
    height: number,
    radius: number,
  ): Uint8ClampedArray | null {
    if (!this.available) return null;
    try {
      const u8 = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const res = FilterCore.gaussian_blur(u8, width, height, radius);
      return new Uint8ClampedArray(res.buffer, res.byteOffset, res.byteLength);
    } catch (e) {
      console.warn('WASM FilterCore.gaussian_blur fallback:', e);
      return null;
    }
  }

  generateScreentone(
    rgba: Uint8ClampedArray,
    width: number,
    height: number,
    frequencyLpi = 60,
    angleDeg = 45,
    dotShape = 0,
  ): boolean {
    if (!this.available) return false;
    const filterAny = FilterCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof filterAny.generate_screentone !== 'function') return false;
    try {
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      filterAny.generate_screentone(u8, width, height, frequencyLpi, angleDeg, dotShape);
      return true;
    } catch {
      return false;
    }
  }

  extractLineartTransparent(
    rgba: Uint8ClampedArray,
    darkness = 1.0,
    threshold = 240,
  ): boolean {
    if (!this.available) return false;
    const filterAny = FilterCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof filterAny.extract_lineart_transparent !== 'function') return false;
    try {
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      filterAny.extract_lineart_transparent(u8, darkness, threshold);
      return true;
    } catch {
      return false;
    }
  }

  unsharpMask(
    rgba: Uint8ClampedArray,
    width: number,
    height: number,
    radius = 2.0,
    amount = 1.5,
    threshold = 2,
  ): boolean {
    if (!this.available) return false;
    const filterAny = FilterCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof filterAny.unsharp_mask !== 'function') return false;
    try {
      const u8 = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      filterAny.unsharp_mask(u8, width, height, radius, amount, threshold);
      return true;
    } catch {
      return false;
    }
  }

  floodFillScanline(
    rgba: Uint8ClampedArray,
    width: number,
    height: number,
    startX: number,
    startY: number,
    fillR: number,
    fillG: number,
    fillB: number,
    fillA: number,
    tolerance: number,
    selectionMask?: Uint8ClampedArray | Uint8Array,
  ): { minX: number; minY: number; maxX: number; maxY: number; filledCount: number } | null {
    if (!this.available) return null;
    try {
      const u8Rgba = new Uint8Array(rgba.buffer, rgba.byteOffset, rgba.byteLength);
      const maskSlice = selectionMask
        ? new Uint8Array(selectionMask.buffer, selectionMask.byteOffset, selectionMask.byteLength)
        : new Uint8Array(0);
      const res = FloodFillCore.scanline_fill(
        u8Rgba,
        width,
        height,
        Math.floor(startX),
        Math.floor(startY),
        fillR,
        fillG,
        fillB,
        fillA,
        tolerance,
        maskSlice,
      );
      if (!res) return null;
      return {
        minX: res.min_x,
        minY: res.min_y,
        maxX: res.max_x,
        maxY: res.max_y,
        filledCount: res.filled_count,
      };
    } catch (e) {
      console.warn('WASM FloodFillCore.scanline_fill fallback:', e);
      return null;
    }
  }

  resampleScale(
    srcRgba: Uint8ClampedArray,
    srcW: number,
    srcH: number,
    dstW: number,
    dstH: number,
    mode: 'nearest' | 'bilinear' | 'bicubic' | 'lanczos' = 'bicubic',
  ): Uint8ClampedArray | null {
    if (!this.available) return null;
    try {
      const u8Src = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const resMode =
        mode === 'nearest'
          ? ResampleMode.Nearest
          : mode === 'bilinear'
            ? ResampleMode.Bilinear
            : mode === 'lanczos'
              ? ResampleMode.Lanczos
              : ResampleMode.Bicubic;
      const res = TransformResampleCore.resample_scale(u8Src, srcW, srcH, dstW, dstH, resMode);
      if (res.length === 0) return null;
      return new Uint8ClampedArray(res.buffer, res.byteOffset, res.byteLength);
    } catch (e) {
      console.warn('WASM TransformResampleCore.resample_scale fallback:', e);
      return null;
    }
  }

  resampleAffine(
    srcRgba: Uint8ClampedArray,
    srcW: number,
    srcH: number,
    dstW: number,
    dstH: number,
    matInv: Float32Array,
    mode: 'nearest' | 'bilinear' | 'bicubic' | 'lanczos' = 'bicubic',
  ): Uint8ClampedArray | null {
    if (!this.available) return null;
    try {
      const u8Src = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const resMode =
        mode === 'nearest'
          ? ResampleMode.Nearest
          : mode === 'bilinear'
            ? ResampleMode.Bilinear
            : mode === 'lanczos'
              ? ResampleMode.Lanczos
              : ResampleMode.Bicubic;
      const res = TransformResampleCore.resample_affine(u8Src, srcW, srcH, dstW, dstH, matInv, resMode);
      if (res.length === 0) return null;
      return new Uint8ClampedArray(res.buffer, res.byteOffset, res.byteLength);
    } catch (e) {
      console.warn('WASM TransformResampleCore.resample_affine fallback:', e);
      return null;
    }
  }

  meshWarpResample(
    srcRgba: Uint8ClampedArray,
    srcW: number,
    srcH: number,
    dstW: number,
    dstH: number,
    gridCols: number,
    gridRows: number,
    gridPoints: Float32Array,
    mode: 'nearest' | 'bilinear' | 'bicubic' | 'lanczos' = 'bicubic',
  ): Uint8ClampedArray | null {
    if (!this.available) return null;
    const resAny = TransformResampleCore as unknown as Record<string, (...args: unknown[]) => unknown>;
    if (typeof resAny.mesh_warp_resample !== 'function') return null;
    try {
      const u8Src = new Uint8Array(srcRgba.buffer, srcRgba.byteOffset, srcRgba.byteLength);
      const resMode =
        mode === 'nearest'
          ? ResampleMode.Nearest
          : mode === 'bilinear'
            ? ResampleMode.Bilinear
            : mode === 'lanczos'
              ? ResampleMode.Lanczos
              : ResampleMode.Bicubic;
      const res = resAny.mesh_warp_resample(
        u8Src,
        srcW,
        srcH,
        dstW,
        dstH,
        gridCols,
        gridRows,
        gridPoints,
        resMode,
      ) as Uint8Array | null;
      if (!res || res.length === 0) return null;
      return new Uint8ClampedArray(res.buffer, res.byteOffset, res.byteLength);
    } catch {
      return null;
    }
  }

  computeInverseTransformMatrix(
    centerSrcX: number,
    centerSrcY: number,
    centerDstX: number,
    centerDstY: number,
    scaleX: number,
    scaleY: number,
    rotationRad: number,
  ): Float32Array | null {
    if (!this.available) return null;
    try {
      const mat = TransformResampleCore.compute_inverse_transform_matrix(
        centerSrcX,
        centerSrcY,
        centerDstX,
        centerDstY,
        scaleX,
        scaleY,
        rotationRad,
      );
      return mat;
    } catch (e) {
      console.warn('WASM TransformResampleCore.compute_inverse_transform_matrix fallback:', e);
      return null;
    }
  }

  // --- High Performance Frame Cache in Rust ---
  /**
   * Ajusta la capacidad del caché de fotogramas a un presupuesto de memoria.
   * Retorna el número máximo de fotogramas que caben en el presupuesto.
   */
  configureFrameCacheBudget(width: number, height: number, budgetMB = 256): number {
    const frameBytes = Math.max(1, width * height * 4);
    const maxFrames = Math.max(2, Math.min(128, Math.floor((budgetMB * 1024 * 1024) / frameBytes)));
    if (this.available && this.frameCache) {
      this.frameCache.set_max_frames(maxFrames);
    }
    return maxFrames;
  }

  hasCachedFrame(frame: number): boolean {
    if (!this.available || !this.frameCache) return false;
    return this.frameCache.has_frame(frame);
  }

  getCachedFrame(frame: number, outRgba: Uint8ClampedArray): boolean {
    if (!this.available || !this.frameCache) return false;
    return this.frameCache.get_frame(frame, outRgba as any);
  }

  storeCachedFrame(frame: number, width: number, height: number, rgba: Uint8ClampedArray): void {
    if (!this.available || !this.frameCache) return;
    this.frameCache.store_frame(frame, width, height, rgba as any);
  }

  invalidateFrame(frame: number): void {
    if (!this.available || !this.frameCache) return;
    this.frameCache.invalidate_frame(frame);
  }

  invalidateAllFrames(): void {
    if (!this.available || !this.frameCache) return;
    this.frameCache.invalidate_all();
  }

  // --- SIMD Fast Layer Compositing ---
  // --- Sparse Tile Memory Grid in Rust ---
  createSparseTileGrid(docWidth: number, docHeight: number): SparseTileGrid | null {
    if (!this.available) return null;
    try {
      return new SparseTileGrid(docWidth, docHeight);
    } catch (e) {
      console.warn('WASM SparseTileGrid fallback:', e);
      return null;
    }
  }

  // --- Extended SIMD Layer Blending ---
  blendLayer(dest: Uint8Array, src: Uint8Array, opacity: number, blendMode: number): void {
    if (!this.available) return;
    try {
      FastLayerCompositor.blend_layer(dest, src, opacity, blendMode);
    } catch (e) {
      console.warn('WASM FastLayerCompositor.blend_layer fallback:', e);
    }
  }

  blendSourceOver(dest: Uint8Array, src: Uint8Array, opacity: number): void {
    if (!this.available) return;
    try {
      FastLayerCompositor.blend_source_over(dest, src, opacity);
    } catch (e) {
      console.warn('WASM FastLayerCompositor.blend_source_over fallback:', e);
    }
  }
}

export const rustStrokeEngine = new RustStrokeEngineWrapper();
