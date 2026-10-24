import initWasm, {
  BoneSkinCore,
  BrushDynamicsConfig,
  ClipTileCore,
  ColorBlendCore,
  GifEncoderCore,
  SelectionCore,
  SmartFillCore,
  StrokeEngineCore,
  init_engine_hooks,
} from '../wasm/oniri-brush-core/oniri_brush_core';
import type { BrushSettings, TipTextureId } from '../tools/toolState';

export const DAB_STRIDE = 7;

export interface RustDabsBatch {
  /** Stride 7: [x, y, diameter, pressure, alpha, angleRad, tipIndex] */
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
    rgbaBuffer: Uint8Array,
    tintR: number,
    tintG: number,
    tintB: number,
  ): boolean {
    if (!this.available) return false;
    try {
      ColorBlendCore.apply_tint_in_place(rgbaBuffer, tintR, tintG, tintB);
      return true;
    } catch (e) {
      console.warn('WASM ColorBlendCore.apply_tint_in_place fallback:', e);
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
}

export const rustStrokeEngine = new RustStrokeEngineWrapper();
